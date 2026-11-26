import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Contrast,
  Copy,
  Play,
  Plus,
  RotateCcw,
  Trash2,
  Type,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  approvePendingContent,
  canPublish,
  createOpportunityFromInput,
  cycleOpportunityStatus,
  defaultSimulatorProfile,
  initialContents,
  initialOpportunities,
  metrics,
  nextInterestStatus,
  partnerInstitutions,
  presetOpportunityTemplates,
  runDevDiagnosticSuite,
  studentChecklistItems,
  uniforCourses,
  type Content,
  type NewOpportunityInput,
} from "@/lib/pumi/data";
import { usePumi } from "@/lib/pumi/store";
import { Modal } from "./modal";
import { Notice, SelectField } from "./shared";

type DevTab = "fluxos" | "oportunidades" | "testes" | "rotas" | "estado";

const STATIC_DEV_ROUTES: Array<{ label: string; to: string; group: "Público" | "Perfis" }> = [
  { label: "Início", to: "/", group: "Público" },
  { label: "Oportunidades", to: "/oportunidades", group: "Público" },
  { label: "Instituições conveniadas", to: "/oportunidades?tab=instituicoes", group: "Público" },
  { label: "Simulador de elegibilidade", to: "/oportunidades?tab=elegibilidade", group: "Público" },
  { label: "Quiz de destinos", to: "/quiz", group: "Público" },
  { label: "Comparador", to: "/comparador", group: "Público" },
  { label: "Guias de mobilidade (Saída e Entrada)", to: "/guias", group: "Público" },
  { label: "Arrival guide (EN)", to: "/arrival-guide", group: "Público" },
  { label: "Docentes e pesquisa", to: "/docentes", group: "Público" },
  { label: "Sobre a DRI", to: "/sobre", group: "Público" },
  { label: "Contatos", to: "/contatos", group: "Público" },
  { label: "Privacidade", to: "/privacidade", group: "Público" },
  { label: "Acessibilidade", to: "/acessibilidade", group: "Público" },
  { label: "Minha DRI (Aluno)", to: "/minha-dri", group: "Perfis" },
  { label: "Gestão DRI", to: "/gestao", group: "Perfis" },
  { label: "Marketing (Revisão)", to: "/marketing", group: "Perfis" },
];

const emptyOppDraft: NewOpportunityInput = {
  title: "",
  institutionId: "fuberlin",
  customInstitution: "",
  country: "Alemanha",
  city: "Berlim",
  audience: "Estudante Unifor",
  mode: "Presencial",
  status: "Inscrições abertas",
  date: "2026-12-20",
  summary: "",
};

function testLocalStorageAccess(): boolean {
  try {
    const key = "pumi-dev-probe";
    localStorage.setItem(key, "ok");
    const val = localStorage.getItem(key);
    localStorage.removeItem(key);
    return val === "ok";
  } catch {
    return false;
  }
}

export function DevTestModal({
  onClose,
  contrast = false,
  font = 0,
  onToggleContrast,
  onCycleFont,
}: {
  onClose: () => void;
  contrast?: boolean;
  font?: number;
  onToggleContrast?: () => void;
  onCycleFont?: () => void;
}) {
  const [tab, setTab] = useState<DevTab>("fluxos");
  const [feedback, setFeedback] = useState("");
  const [oppForm, setOppForm] = useState<NewOpportunityInput>(emptyOppDraft);
  const [testRunCount, setTestRunCount] = useState(1);
  const { state, update } = usePumi();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const draftCount = state.contents.filter((c) => c.status === "Rascunho").length;
  const pendingCount = state.contents.filter((c) => c.status === "Aguardando Marketing").length;
  const adjustmentCount = state.contents.filter((c) => c.status === "Ajustes solicitados").length;
  const publishedCount = state.contents.filter((c) => c.status === "Publicado").length;
  const activeInterest = state.interests.find((i) => i.status !== "Cancelada");

  const dynamicOppRoutes = state.opportunities.map((o) => ({
    label: `Edital · ${o.title}`,
    to: `/oportunidades/${o.id}`,
    group: "Público" as const,
  }));
  const allRoutes = [
    ...STATIC_DEV_ROUTES.slice(0, 4),
    ...dynamicOppRoutes,
    ...STATIC_DEV_ROUTES.slice(4),
  ];

  const diagnostics = runDevDiagnosticSuite(state, {
    storageOk: testLocalStorageAccess(),
    hasMainLandmark:
      typeof document !== "undefined" ? Boolean(document.querySelector("main")) : true,
    fontScale: String(font),
    highContrast: contrast,
  });
  const passedCount = diagnostics.filter((d) => d.passed).length;

  function goTo(target: string) {
    const [path, query] = target.split("?");
    navigate({
      to: (path || "/") as string,
      search: query ? Object.fromEntries(new URLSearchParams(query)) : undefined,
    });
    onClose();
  }

  function simulateQuizAndCompare() {
    update((s) => ({
      ...s,
      answers: [
        "Português ou espanhol",
        "De € 700 a € 1.000",
        "Cultura urbana",
        "Experiência acadêmica",
      ],
      selected: s.opportunities.slice(0, 2).map((o) => o.id),
    }));
    setFeedback("Respostas do quiz e comparação preenchidas. Abrindo o comparador.");
    goTo("/comparador");
  }

  function simulateEligibilityPreset(preset: "compatible" | "no-passport" | "suspended") {
    const nextProfile =
      preset === "compatible"
        ? { ...defaultSimulatorProfile, english: "B2" as const, hasPassport: true }
        : preset === "no-passport"
          ? { ...defaultSimulatorProfile, hasPassport: false, semester: 2 }
          : { ...defaultSimulatorProfile, enrollment: "Trancado" as const };
    update((s) => ({ ...s, simulatorProfile: nextProfile }));
    goTo("/oportunidades?tab=elegibilidade");
  }

  function simulateRegisterInterest() {
    const targetOpp =
      state.opportunities.find((o) => o.status === "Inscrições abertas") ?? state.opportunities[0];
    if (!targetOpp) {
      setFeedback("Nenhuma oportunidade cadastrada. Adicione uma na aba Oportunidades primeiro.");
      return;
    }
    let created = false;
    update((s) => {
      const existing = s.interests.find(
        (i) => i.title === targetOpp.title && i.status !== "Cancelada",
      );
      if (existing) return s;
      created = true;
      return {
        ...s,
        interests: [
          ...s.interests,
          {
            id: `DRI-2026-${String(s.interests.length + 1).padStart(4, "0")}`,
            title: targetOpp.title,
            status: "Recebida",
            note: `Protocolo de teste (${targetOpp.institution}) criado via Painel Teste Dev.`,
          },
        ],
        checklist: s.checklist.length ? s.checklist : [...studentChecklistItems.slice(0, 2)],
      };
    });
    setFeedback(
      created
        ? `Manifestação registrada para "${targetOpp.title}" (Recebida) com checklist inicial.`
        : `Já existe uma manifestação ativa para "${targetOpp.title}".`,
    );
  }

  function simulateAdvanceInterest() {
    if (!activeInterest) {
      setFeedback("Nenhuma manifestação ativa encontrada. Registre uma manifestação primeiro.");
      return;
    }
    const next = nextInterestStatus(activeInterest.status);
    update((s) => ({
      ...s,
      interests: s.interests.map((item) =>
        item.id === activeInterest.id
          ? {
              ...item,
              status: next,
              note:
                next === "Em orientação"
                  ? "Plano de estudos em análise com a coordenação. Confirme os prazos consulares."
                  : next === "Concluída"
                    ? "Orientação concluída. Candidatura segue exclusivamente pelo edital oficial."
                    : "Protocolo reaberto em modo de demonstração.",
            }
          : item,
      ),
    }));
    setFeedback(`Protocolo ${activeInterest.id} atualizado para "${next}".`);
  }

  function simulateCancelInterest() {
    if (!activeInterest) {
      setFeedback("Não há manifestação ativa para cancelar.");
      return;
    }
    update((s) => ({
      ...s,
      interests: s.interests.map((item) =>
        item.id === activeInterest.id ? { ...item, status: "Cancelada" as const } : item,
      ),
    }));
    setFeedback(`Protocolo ${activeInterest.id} cancelado para teste de encerramento.`);
  }

  function simulateCompleteChecklist() {
    const allCompleted = state.checklist.length === studentChecklistItems.length;
    update((s) => ({
      ...s,
      checklist: allCompleted ? [] : [...studentChecklistItems],
    }));
    setFeedback(
      allCompleted
        ? "Checklist de planejamento do aluno limpa (0/6)."
        : "Todos os 6 itens de planejamento marcados em Minha DRI.",
    );
  }

  function simulateCreateAndSubmitDraft() {
    const newId = `dev-draft-${Date.now()}`;
    const draft: Content = {
      id: newId,
      title: "Comunicado Teste Dev · Mobilidade 2026.2",
      body: "Conteúdo de teste gerado para validar o fluxo Gestão DRI → Revisão Marketing → Histórico de publicações.",
      english:
        "Test notice generated to validate the DRI Management → Marketing Review → Publication History flow.",
      language: "PT / EN",
      status: "Aguardando Marketing",
      comment: "",
    };
    update((s) => ({
      ...s,
      contents: [...s.contents, draft],
    }));
    setFeedback("Rascunho PT/EN criado e enviado para a fila do Marketing (Aguardando Marketing).");
  }

  function simulateMarketingApprove() {
    let approved: string | undefined;
    update((s) => {
      const result = approvePendingContent(s.contents, Array(7).fill(true));
      approved = result.approvedTitle;
      return { ...s, contents: result.contents };
    });
    setFeedback(
      approved
        ? `Conteúdo "${approved}" aprovado nos 7 critérios do Marketing (RN01).`
        : "Não há itens com status Aguardando Marketing na fila.",
    );
  }

  function simulateBlockedRn01() {
    const blocked = canPublish("Aguardando Marketing", [true, true, true, true, true, true, false]);
    setFeedback(
      blocked
        ? "Atenção: publicação parcial não foi bloqueada."
        : "Bloqueio RN01 confirmado: aprovação com 6 de 7 critérios impediu a publicação.",
    );
  }

  function simulateMarketingRequestAdjustments() {
    const pending = state.contents.find((c) => c.status === "Aguardando Marketing");
    if (!pending) {
      setFeedback("Não há itens aguardando revisão do Marketing.");
      return;
    }
    update((s) => ({
      ...s,
      contents: s.contents.map((c) =>
        c.id === pending.id
          ? {
              ...c,
              status: "Ajustes solicitados",
              comment: "Ajuste simulado via Teste Dev: revisar link oficial e aviso de visto.",
            }
          : c,
      ),
    }));
    setFeedback(`Ajustes solicitados para "${pending.title}" e devolvido para a Gestão DRI.`);
  }

  function handleInstitutionSelect(institutionId: string) {
    const partner = partnerInstitutions.find((p) => p.id === institutionId);
    if (!partner) {
      setOppForm((f) => ({ ...f, institutionId: "" }));
      return;
    }
    setOppForm((f) => ({
      ...f,
      institutionId: partner.id,
      country: partner.country,
      city: partner.city,
      audience: partner.audience,
      mode: partner.mode,
    }));
  }

  function addOpportunity(input: NewOpportunityInput, openCatalog = false) {
    let createdTitle = "";
    update((s) => {
      const opp = createOpportunityFromInput(
        input,
        s.opportunities.map((o) => o.id),
      );
      createdTitle = opp.title;
      return {
        ...s,
        opportunities: [opp, ...s.opportunities],
      };
    });
    setFeedback(
      `Oportunidade "${createdTitle}" adicionada e visível imediatamente na guia Oportunidades.`,
    );
    if (openCatalog) {
      goTo("/oportunidades");
    }
  }

  function handleCreateOpportunitySubmit(e: FormEvent) {
    e.preventDefault();
    if (!oppForm.title.trim()) return;
    addOpportunity(oppForm);
    setOppForm((f) => ({ ...f, title: "", summary: "" }));
  }

  function toggleOpportunityStatus(id: string) {
    let nextLabel = "";
    update((s) => ({
      ...s,
      opportunities: s.opportunities.map((o) => {
        if (o.id !== id) return o;
        nextLabel = cycleOpportunityStatus(o.status);
        return { ...o, status: nextLabel };
      }),
    }));
    setFeedback(`Situação da oportunidade atualizada para "${nextLabel}".`);
  }

  function removeOpportunity(id: string) {
    const target = state.opportunities.find((o) => o.id === id);
    update((s) => ({
      ...s,
      opportunities: s.opportunities.filter((o) => o.id !== id),
      selected: s.selected.filter((sel) => sel !== id),
    }));
    if (target) {
      setFeedback(`Oportunidade "${target.title}" removida do catálogo.`);
    }
  }

  function restoreDefaultOpportunities() {
    update((s) => ({
      ...s,
      opportunities: initialOpportunities.map((o) => ({ ...o })),
    }));
    setFeedback("As 3 oportunidades demonstrativas padrão foram restauradas.");
  }

  function clearAllOpportunities() {
    update((s) => ({
      ...s,
      opportunities: [],
      selected: [],
    }));
    setFeedback("Lista de oportunidades esvaziada para testar o estado vazio do catálogo.");
  }

  function seedFullDemoScenario() {
    update(() => {
      const seededContents = approvePendingContent(initialContents, Array(7).fill(true)).contents;
      const baseOpps = initialOpportunities.map((o) => ({ ...o }));
      const berlimOpp = createOpportunityFromInput(
        presetOpportunityTemplates[0]!,
        baseOpps.map((o) => o.id),
      );
      const ucfOpp = createOpportunityFromInput(presetOpportunityTemplates[1]!, [
        ...baseOpps.map((o) => o.id),
        berlimOpp.id,
      ]);
      return {
        contents: seededContents,
        opportunities: [berlimOpp, ucfOpp, ...baseOpps],
        interests: [
          {
            id: "DRI-2026-0001",
            title: "Um semestre em Portugal",
            status: "Em orientação",
            note: "Documentação preliminar conferida. Lembrete: visto consular exige carta de aceite.",
          },
        ],
        answers: [
          "Português ou espanhol",
          "De € 700 a € 1.000",
          "Cultura urbana",
          "Experiência acadêmica",
        ],
        selected: ["portugal", berlimOpp.id],
        checklist: [...studentChecklistItems.slice(0, 3)],
        metrics: metrics.map((m) => ({ ...m })),
        simulatorProfile: {
          ...defaultSimulatorProfile,
          course: uniforCourses[0],
          english: "B2",
          hasPassport: true,
        },
      };
    });
    setFeedback(
      "Cenário completo populado (5 oportunidades, comunicado aprovado, interesse em orientação, quiz e checklist).",
    );
  }

  function resetAllDemoState() {
    try {
      localStorage.removeItem("pumi-demo-v1");
    } catch {
      /* Keep functioning even if browser storage is restricted. */
    }
    update(() => ({
      contents: initialContents.map((c) => ({ ...c })),
      interests: [],
      opportunities: initialOpportunities.map((o) => ({ ...o })),
      answers: [],
      selected: [],
      checklist: [],
      metrics: metrics.map((m) => ({ ...m })),
      simulatorProfile: defaultSimulatorProfile,
    }));
    setFeedback("Estado local (pumi-demo-v1) restaurado para o padrão inicial.");
  }

  async function copyStateSnapshot() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(state, null, 2));
      setFeedback("Snapshot JSON copiado para a área de transferência.");
    } catch {
      setFeedback("Não foi possível copiar automaticamente neste navegador.");
    }
  }

  return (
    <Modal labelledBy="dev-panel-title" onClose={onClose} className="modal-wide">
      <div className="modal-heading">
        <div>
          <p className="eyebrow">MODO DESENVOLVEDOR · ACESSO VIA PERFIS</p>
          <h2 id="dev-panel-title">Teste Dev · Simulador e Verificações</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar painel Teste Dev">
          <X />
        </Button>
      </div>

      <p className="dev-intro">
        Adicione oportunidades em tempo real, simule fluxos completos e execute verificações de
        regras institucionais. Rota atual: <strong className="tabular-nums">{pathname}</strong>
      </p>

      <div className="tabs-group dev-tabs" role="tablist" aria-label="Seções do Teste Dev">
        <Button
          role="tab"
          variant="ghost"
          aria-selected={tab === "fluxos"}
          onClick={() => setTab("fluxos")}
        >
          Fluxos
        </Button>
        <Button
          role="tab"
          variant="ghost"
          aria-selected={tab === "oportunidades"}
          onClick={() => setTab("oportunidades")}
        >
          Oportunidades ({state.opportunities.length})
        </Button>
        <Button
          role="tab"
          variant="ghost"
          aria-selected={tab === "testes"}
          onClick={() => setTab("testes")}
        >
          Testes ({passedCount}/{diagnostics.length})
        </Button>
        <Button
          role="tab"
          variant="ghost"
          aria-selected={tab === "rotas"}
          onClick={() => setTab("rotas")}
        >
          Rotas ({allRoutes.length})
        </Button>
        <Button
          role="tab"
          variant="ghost"
          aria-selected={tab === "estado"}
          onClick={() => setTab("estado")}
        >
          Estado local
        </Button>
      </div>

      {feedback && (
        <div role="status" className="mt-3">
          <Notice tone="success">
            <div className="dev-feedback-row">
              <CheckCircle2 size={16} aria-hidden="true" />
              <span>{feedback}</span>
            </div>
          </Notice>
        </div>
      )}

      {tab === "fluxos" && (
        <div className="dev-sections">
          <section className="dev-block">
            <p className="eyebrow">JORNADA DO ESTUDANTE E ELEGIBILIDADE</p>
            <h3>Descoberta, simulador e acompanhamento em Minha DRI</h3>
            <p>
              Preenche preferências, testa cenários extremos do simulador de elegibilidade e cria ou
              evolui protocolos de interesse sem dados pessoais.
            </p>
            <div className="dev-actions-grid">
              <Button type="button" variant="secondary" onClick={simulateQuizAndCompare}>
                1. Preencher quiz e abrir comparador
                <ArrowRight size={15} />
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => simulateEligibilityPreset("compatible")}
              >
                Simular elegibilidade: Compatível
                <ArrowRight size={15} />
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => simulateEligibilityPreset("no-passport")}
              >
                Simular elegibilidade: Sem passaporte (RN05)
                <ArrowRight size={15} />
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => simulateEligibilityPreset("suspended")}
              >
                Simular elegibilidade: Matrícula trancada
                <ArrowRight size={15} />
              </Button>
              <Button type="button" onClick={simulateRegisterInterest}>
                Registrar interesse na 1ª oportunidade
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={simulateAdvanceInterest}
                disabled={!activeInterest}
              >
                Avançar status ({activeInterest ? activeInterest.status : "sem ativo"})
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={simulateCancelInterest}
                disabled={!activeInterest}
              >
                Cancelar interesse ativo
              </Button>
              <Button type="button" variant="secondary" onClick={simulateCompleteChecklist}>
                {state.checklist.length === studentChecklistItems.length
                  ? "Limpar checklist Minha DRI (6/6)"
                  : "Completar checklist Minha DRI (6/6)"}
              </Button>
              <Button type="button" variant="outline" onClick={() => goTo("/minha-dri")}>
                Abrir Minha DRI
                <ArrowRight size={15} />
              </Button>
            </div>
          </section>

          <section className="dev-block">
            <p className="eyebrow">GOVERNANÇA EDITORIAL · RN01</p>
            <h3>Fluxo Gestão DRI → Revisão Marketing</h3>
            <p>
              Rascunhos da DRI exigem confirmação dos 7 critérios do Marketing (
              <code>canPublish</code>) antes de serem aprovados no histórico.
            </p>
            <div className="dev-actions-grid">
              <Button type="button" onClick={simulateCreateAndSubmitDraft}>
                1. Criar e enviar rascunho PT/EN ao Marketing
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={simulateMarketingApprove}
                disabled={pendingCount === 0}
              >
                2. Aprovar 7 itens ({pendingCount} na fila)
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={simulateMarketingRequestAdjustments}
                disabled={pendingCount === 0}
              >
                Solicitar ajustes no pendente
              </Button>
              <Button type="button" variant="secondary" onClick={simulateBlockedRn01}>
                Testar bloqueio RN01 (6 de 7 critérios)
              </Button>
              <Button type="button" variant="outline" onClick={() => goTo("/gestao")}>
                Abrir Gestão DRI
                <ArrowRight size={15} />
              </Button>
              <Button type="button" variant="outline" onClick={() => goTo("/marketing")}>
                Abrir Marketing
                <ArrowRight size={15} />
              </Button>
            </div>
          </section>

          <section className="dev-block">
            <p className="eyebrow">ATALHOS DE CENÁRIO</p>
            <div className="actions">
              <Button type="button" onClick={seedFullDemoScenario}>
                Popular cenário completo (5 oportunidades + fluxo)
              </Button>
              <Button type="button" variant="secondary" onClick={resetAllDemoState}>
                <RotateCcw size={15} aria-hidden="true" />
                Resetar estado inicial
              </Button>
            </div>
          </section>
        </div>
      )}

      {tab === "oportunidades" && (
        <div className="dev-sections">
          <section className="dev-block">
            <p className="eyebrow">ATALHOS RÁPIDOS (1 CLIQUE)</p>
            <h3>Adicionar oportunidades pré-configuradas ao catálogo</h3>
            <p>
              Insere imediatamente na guia Oportunidades, na página inicial e nas rotas individuais{" "}
              <code>/oportunidades/:id</code>.
            </p>
            <div className="dev-actions-grid">
              {presetOpportunityTemplates.map((tpl) => (
                <Button
                  key={tpl.title}
                  type="button"
                  variant="secondary"
                  onClick={() => addOpportunity(tpl)}
                >
                  <span>
                    + {tpl.title} ({tpl.country})
                  </span>
                  <Plus size={14} />
                </Button>
              ))}
            </div>
          </section>

          <section className="dev-block">
            <p className="eyebrow">CADASTRO PERSONALIZADO</p>
            <h3>Adicionar nova oportunidade</h3>
            <form onSubmit={handleCreateOpportunitySubmit}>
              <div className="field-grid">
                <label className="field">
                  <span>Título da oportunidade / edital</span>
                  <input
                    required
                    placeholder="Ex.: Intercâmbio em Berlim 2027.1"
                    value={oppForm.title}
                    onChange={(e) => setOppForm((f) => ({ ...f, title: e.target.value }))}
                  />
                </label>
                <label className="field">
                  <span>Instituição conveniada</span>
                  <select
                    value={oppForm.institutionId}
                    onChange={(e) => handleInstitutionSelect(e.target.value)}
                  >
                    {partnerInstitutions.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.name} ({inst.country})
                      </option>
                    ))}
                    <option value="">Outra instituição personalizada</option>
                  </select>
                </label>
                {!oppForm.institutionId && (
                  <label className="field">
                    <span>Nome da instituição personalizada</span>
                    <input
                      required
                      placeholder="Ex.: Universidade de Coimbra"
                      value={oppForm.customInstitution}
                      onChange={(e) =>
                        setOppForm((f) => ({ ...f, customInstitution: e.target.value }))
                      }
                    />
                  </label>
                )}
                <label className="field">
                  <span>País</span>
                  <input
                    required
                    value={oppForm.country}
                    onChange={(e) => setOppForm((f) => ({ ...f, country: e.target.value }))}
                  />
                </label>
                <label className="field">
                  <span>Cidade</span>
                  <input
                    required
                    value={oppForm.city}
                    onChange={(e) => setOppForm((f) => ({ ...f, city: e.target.value }))}
                  />
                </label>
                <SelectField
                  label="Público"
                  value={oppForm.audience}
                  onChange={(v) => setOppForm((f) => ({ ...f, audience: v }))}
                  options={["Estudante Unifor", "Estudante Estrangeiro", "Docente"]}
                />
                <SelectField
                  label="Modalidade"
                  value={oppForm.mode}
                  onChange={(v) => setOppForm((f) => ({ ...f, mode: v }))}
                  options={["Presencial", "Virtual", "Híbrida"]}
                />
                <SelectField
                  label="Situação"
                  value={oppForm.status}
                  onChange={(v) => setOppForm((f) => ({ ...f, status: v }))}
                  options={["Inscrições abertas", "Em breve", "Encerrado"]}
                />
                <label className="field">
                  <span>Prazo limite (opcional)</span>
                  <input
                    type="date"
                    value={oppForm.date}
                    onChange={(e) => setOppForm((f) => ({ ...f, date: e.target.value }))}
                  />
                </label>
              </div>
              <label className="field mt-4">
                <span>Resumo da chamada (opcional)</span>
                <textarea
                  className="dev-textarea"
                  placeholder="Descreva bolsas, requisitos ou áreas contempladas."
                  value={oppForm.summary}
                  onChange={(e) => setOppForm((f) => ({ ...f, summary: e.target.value }))}
                />
              </label>
              <div className="actions">
                <Button type="submit" disabled={!oppForm.title.trim()}>
                  <Plus size={15} aria-hidden="true" />
                  Adicionar oportunidade
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={!oppForm.title.trim()}
                  onClick={() => {
                    addOpportunity(oppForm, true);
                    setOppForm((f) => ({ ...f, title: "", summary: "" }));
                  }}
                >
                  Adicionar e abrir guia Oportunidades
                  <ArrowRight size={15} />
                </Button>
              </div>
            </form>
          </section>

          <section className="dev-block">
            <div className="section-heading">
              <div>
                <p className="eyebrow">CATÁLOGO ATIVO ({state.opportunities.length})</p>
                <h3>Gerenciar oportunidades exibidas no portal</h3>
              </div>
              <div className="actions mt-0">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={restoreDefaultOpportunities}
                >
                  Restaurar 3 padrão
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearAllOpportunities}
                  disabled={state.opportunities.length === 0}
                >
                  Testar lista vazia
                </Button>
              </div>
            </div>
            {state.opportunities.length === 0 ? (
              <Notice title="Catálogo vazio para testes">
                <p>
                  Nenhuma oportunidade ativa. Use os atalhos acima ou clique em Restaurar 3 padrão.
                </p>
              </Notice>
            ) : (
              <div className="dev-opp-list">
                {state.opportunities.map((o) => (
                  <div className="dev-opp-row" key={o.id}>
                    <div>
                      <strong>{o.title}</strong>
                      <span>
                        {o.institution} · {o.city}, {o.country} · {o.mode} · {o.status}
                      </span>
                    </div>
                    <div className="dev-opp-actions">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => goTo(`/oportunidades/${o.id}`)}
                      >
                        Abrir
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => toggleOpportunityStatus(o.id)}
                      >
                        Alternar situação
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        aria-label={`Remover ${o.title}`}
                        onClick={() => removeOpportunity(o.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {tab === "testes" && (
        <div className="dev-sections">
          <section className="dev-block">
            <div className="section-heading">
              <div>
                <p className="eyebrow">VERIFICAÇÕES AUTOMATIZADAS · EXECUÇÃO #{testRunCount}</p>
                <h3>Bateria de testes de regras e integridade</h3>
              </div>
              <Button
                type="button"
                onClick={() => {
                  setTestRunCount((c) => c + 1);
                  setFeedback(
                    `Bateria executada: ${passedCount} de ${diagnostics.length} verificações aprovadas.`,
                  );
                }}
              >
                <Play size={14} aria-hidden="true" />
                Executar bateria completa
              </Button>
            </div>
            <div className="dev-test-summary tabular-nums">
              <span>
                Resultado: <strong>{passedCount}</strong> de <strong>{diagnostics.length}</strong>{" "}
                aprovadas
              </span>
              <span>
                Status geral:{" "}
                <strong>{passedCount === diagnostics.length ? "APROVADO" : "COM FALHAS"}</strong>
              </span>
            </div>
            <div className="table-scroll">
              <table className="dev-test-table">
                <thead>
                  <tr>
                    <th>Módulo</th>
                    <th>Verificação</th>
                    <th>Resultado</th>
                    <th>Detalhe</th>
                  </tr>
                </thead>
                <tbody>
                  {diagnostics.map((item) => (
                    <tr key={item.id}>
                      <td>{item.category}</td>
                      <td>
                        <strong>{item.name}</strong>
                      </td>
                      <td className={item.passed ? "dev-pass" : "dev-fail"}>
                        {item.passed ? "PASSOU" : "FALHOU"}
                      </td>
                      <td>{item.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="dev-block">
            <p className="eyebrow">TESTES DE ACESSIBILIDADE E ARMAZENAMENTO</p>
            <h3>Controles rápidos de interface no navegador</h3>
            <div className="dev-actions-grid">
              {onToggleContrast && (
                <Button type="button" variant="secondary" onClick={onToggleContrast}>
                  <span>{contrast ? "Desativar alto contraste" : "Ativar alto contraste"}</span>
                  <Contrast size={15} />
                </Button>
              )}
              {onCycleFont && (
                <Button type="button" variant="secondary" onClick={onCycleFont}>
                  <span>Escala de fonte atual: {font} (Alternar)</span>
                  <Type size={15} />
                </Button>
              )}
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  const ok = testLocalStorageAccess();
                  setFeedback(
                    ok
                      ? "Leitura e gravação em localStorage (pumi-demo-v1) funcionando."
                      : "localStorage bloqueado neste contexto de navegador.",
                  );
                }}
              >
                Testar leitura/gravação localStorage
              </Button>
            </div>
          </section>
        </div>
      )}

      {tab === "rotas" && (
        <div className="dev-sections">
          {(["Público", "Perfis"] as const).map((group) => (
            <section className="dev-block" key={group}>
              <p className="eyebrow">
                {group === "Público"
                  ? "ROTAS PÚBLICAS, EDITAIS E SIMULADORES"
                  : "PERFIS DEMONSTRATIVOS"}
              </p>
              <div className="dev-routes-grid">
                {allRoutes
                  .filter((r) => r.group === group)
                  .map((route) => (
                    <Button
                      key={route.to}
                      type="button"
                      variant={pathname === route.to.split("?")[0] ? "default" : "secondary"}
                      onClick={() => goTo(route.to)}
                    >
                      <span>{route.label}</span>
                      <ArrowRight size={14} />
                    </Button>
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {tab === "estado" && (
        <div className="dev-sections">
          <div className="institution-meta tabular-nums">
            <div>
              <strong>Oportunidades ({state.opportunities.length})</strong>
              <span>
                {state.opportunities.filter((o) => o.status === "Inscrições abertas").length}{" "}
                abertas · {state.opportunities.filter((o) => o.status === "Em breve").length} em
                breve · {state.opportunities.filter((o) => o.status === "Encerrado").length}{" "}
                encerrada(s)
              </span>
            </div>
            <div>
              <strong>Conteúdos ({state.contents.length})</strong>
              <span>
                {publishedCount} publicado(s) · {pendingCount} aguardando · {adjustmentCount}{" "}
                ajuste(s) · {draftCount} rascunho(s)
              </span>
            </div>
            <div>
              <strong>Manifestações de interesse</strong>
              <span>
                {state.interests.length} registro(s) ·{" "}
                {activeInterest ? `Ativo: ${activeInterest.status}` : "Nenhum ativo"}
              </span>
            </div>
            <div>
              <strong>Checklist e Quiz</strong>
              <span>
                {state.checklist.length}/{studentChecklistItems.length} checklist ·{" "}
                {state.answers.length}/4 quiz · {state.selected.length} comparação
              </span>
            </div>
          </div>

          <div className="actions">
            <Button type="button" variant="secondary" onClick={copyStateSnapshot}>
              <Copy size={15} aria-hidden="true" />
              Copiar JSON (pumi-demo-v1)
            </Button>
            <Button type="button" variant="secondary" onClick={resetAllDemoState}>
              <Trash2 size={15} aria-hidden="true" />
              Limpar dados locais
            </Button>
          </div>

          <pre className="dev-json" aria-label="Estado atual em JSON">
            {JSON.stringify(state, null, 2)}
          </pre>
        </div>
      )}
    </Modal>
  );
}
