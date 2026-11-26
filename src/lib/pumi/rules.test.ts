import { describe, it, expect } from "vitest";
import {
  MIN_ATTENDANCE,
  approvePendingContent,
  canPublish,
  createOpportunityFromInput,
  cycleOpportunityStatus,
  defaultSimulatorProfile,
  eligibility,
  evaluateEligibility,
  initialContents,
  initialOpportunities,
  metrics,
  nextInterestStatus,
  presetOpportunityTemplates,
  recommend,
  runDevDiagnosticSuite,
} from "./data";
describe("Institutional rules", () => {
  it("requires minimum attendance of 75 percent", () => expect(MIN_ATTENDANCE).toBe(75));
  it("prevents publication of a DRI draft", () =>
    expect(canPublish("Rascunho", Array(7).fill(true))).toBe(false));
  it("requires every editorial check before Marketing publication", () => {
    expect(canPublish("Aguardando Marketing", [true, true, true, true, true, true, false])).toBe(
      false,
    );
    expect(canPublish("Aguardando Marketing", Array(7).fill(true))).toBe(true);
  });
  it("does not invent an official PMG approval threshold", () =>
    expect(eligibility("Regularmente matriculado", 8, "B2")).toContain(
      "depende da nota mínima do edital",
    ));
  it("flags a suspended enrolment", () =>
    expect(eligibility("Trancado", 9, "B2")).toContain("Atenção aos requisitos"));
  it("rejects an invalid PMG", () =>
    expect(eligibility("Regularmente matriculado", 11, "B2")).toContain("entre 0 e 10"));
  it("uses language preferences in destination recommendations", () => {
    expect(recommend(["Francês"])).toEqual([2, 0]);
    expect(recommend(["Português ou espanhol"])).toEqual([0, 1]);
  });
});

describe("Eligibility simulator", () => {
  it("never invents an official PMG threshold and keeps RN06 advisory", () => {
    const lowPmg = evaluateEligibility({ ...defaultSimulatorProfile, pmg: 5.5 });
    expect(lowPmg.matches.length).toBeGreaterThan(0);
    expect(lowPmg.advisories.join(" ")).toContain("nota mínima varia conforme cada edital");
  });

  it("matches partners by course area and language proficiency", () => {
    const compWithB2English = evaluateEligibility({
      ...defaultSimulatorProfile,
      course: "Engenharia da Computação / Ciência da Computação / IA",
      english: "B2",
      spanish: "Nenhum",
    });
    const ids = compWithB2English.matches.map((m) => m.institution.id);
    expect(ids).toContain("uporto");
    expect(ids).toContain("santander");
    expect(ids).toContain("ucf");
    expect(ids).not.toContain("valencia");
    expect(ids).not.toContain("lyon1");
  });

  it("excludes faculty-only partners for undergraduate students but includes them for faculty", () => {
    const grad = evaluateEligibility({
      ...defaultSimulatorProfile,
      degree: "Graduação",
      course: "Ciências da Saúde (Medicina, Nutrição, Fisioterapia, Enfermagem)",
      otherLanguage: "Francês (B1+)",
    });
    expect(grad.matches.map((m) => m.institution.id)).not.toContain("lyon1");

    const faculty = evaluateEligibility({
      ...defaultSimulatorProfile,
      degree: "Docente",
      course: "Ciências da Saúde (Medicina, Nutrição, Fisioterapia, Enfermagem)",
      otherLanguage: "Francês (B1+)",
    });
    expect(faculty.matches.map((m) => m.institution.id)).toContain("lyon1");
  });

  it("surfaces RN05 consular warning and attention status when passport is missing", () => {
    const noPassport = evaluateEligibility({ ...defaultSimulatorProfile, hasPassport: false });
    expect(noPassport.status).toBe("attention");
    expect(noPassport.advisories.join(" ")).toContain(
      "passaporte não substitui visto de estudante",
    );
  });

  it("blocks partner matching when enrollment is suspended", () => {
    const suspended = evaluateEligibility({ ...defaultSimulatorProfile, enrollment: "Trancado" });
    expect(suspended.status).toBe("attention");
    expect(suspended.matches).toEqual([]);
  });
});

describe("Dev test workflow helpers", () => {
  it("cycles interest status across the institutional orientation workflow", () => {
    expect(nextInterestStatus("Recebida")).toBe("Em orientação");
    expect(nextInterestStatus("Em orientação")).toBe("Concluída");
    expect(nextInterestStatus("Concluída")).toBe("Recebida");
  });

  it("enforces RN01 when approving pending content from the dev helper", () => {
    const incomplete = approvePendingContent(initialContents, [
      true,
      true,
      true,
      true,
      true,
      true,
      false,
    ]);
    expect(incomplete.approvedTitle).toBeUndefined();
    expect(incomplete.contents.some((c) => c.status === "Publicado")).toBe(false);

    const complete = approvePendingContent(initialContents, Array(7).fill(true));
    expect(complete.approvedTitle).toBe(initialContents[0]?.title);
    expect(complete.contents[0]?.status).toBe("Publicado");
  });

  it("creates unique opportunities from partner templates and cycles status", () => {
    const existingIds = initialOpportunities.map((o) => o.id);
    const created = createOpportunityFromInput(presetOpportunityTemplates[0]!, existingIds);
    expect(created.institution).toBe("Freie Universität Berlin");
    expect(created.country).toBe("Alemanha");
    expect(existingIds).not.toContain(created.id);

    const duplicate = createOpportunityFromInput(presetOpportunityTemplates[0]!, [
      ...existingIds,
      created.id,
    ]);
    expect(duplicate.id).not.toBe(created.id);

    expect(cycleOpportunityStatus("Inscrições abertas")).toBe("Em breve");
    expect(cycleOpportunityStatus("Em breve")).toBe("Encerrado");
    expect(cycleOpportunityStatus("Encerrado")).toBe("Inscrições abertas");
  });

  it("passes all diagnostic checks on clean initial state and detects sensitive keys", () => {
    const clean = runDevDiagnosticSuite({
      contents: initialContents,
      interests: [],
      opportunities: initialOpportunities,
      answers: [],
      selected: [],
      checklist: [],
      metrics,
    });
    expect(clean.length).toBe(10);
    expect(clean.every((item) => item.passed)).toBe(true);
  });
});
