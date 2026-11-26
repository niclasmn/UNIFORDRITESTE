import { AlertTriangle, CheckCircle2, MapPin, RotateCcw, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  defaultSimulatorProfile,
  evaluateEligibility,
  uniforCourses,
  type CefrLevel,
  type PartnerInstitution,
  type SimulatorProfile,
} from "@/lib/pumi/data";
import { usePumi } from "@/lib/pumi/store";
import { Go, Notice, SelectField, legal } from "./shared";

const cefrOptions: CefrLevel[] = ["Nenhum", "B1", "B2", "C1", "C2"];

export function EligibilitySimulator({
  onOpenGuide,
}: {
  onOpenGuide: (institution: PartnerInstitution) => void;
}) {
  const { state, update } = usePumi();
  const profile = state.simulatorProfile;
  const setProfile = (updater: (p: SimulatorProfile) => SimulatorProfile) =>
    update((s) => ({ ...s, simulatorProfile: updater(s.simulatorProfile) }));
  const evaluation = evaluateEligibility(profile);

  return (
    <section aria-labelledby="sim-heading">
      <div className="simulator-layout">
        <aside className="panel simulator-controls">
          <p className="eyebrow">SIMULADOR ORIENTATIVO · SEM ENVIO DE DADOS</p>
          <h2 id="sim-heading">Seu perfil acadêmico</h2>
          <p>
            Ajuste seu curso, semestre e idiomas autodeclarados para identificar instituições
            compatíveis nesta amostra. Nenhum dado pessoal ou matrícula é gravado.
          </p>

          <SelectField
            label="Vínculo acadêmico"
            value={profile.degree}
            onChange={(v) =>
              setProfile((p) => ({
                ...p,
                degree: v as SimulatorProfile["degree"],
              }))
            }
            options={["Graduação", "Pós-graduação", "Docente"]}
          />

          <SelectField
            label="Situação de matrícula"
            value={profile.enrollment}
            onChange={(v) =>
              setProfile((p) => ({
                ...p,
                enrollment: v as SimulatorProfile["enrollment"],
              }))
            }
            options={["Regularmente matriculado", "Trancado"]}
          />

          <SelectField
            label="Curso ou área na Unifor"
            value={profile.course}
            onChange={(v) => setProfile((p) => ({ ...p, course: v }))}
            options={[...uniforCourses]}
          />

          {profile.degree === "Graduação" && (
            <label className="field slider-field">
              <div className="slider-head">
                <span>Semestre em curso</span>
                <output htmlFor="sim-semester" className="tabular-nums">
                  {profile.semester}º semestre
                </output>
              </div>
              <input
                id="sim-semester"
                type="range"
                min={1}
                max={10}
                step={1}
                value={profile.semester}
                onChange={(e) => setProfile((p) => ({ ...p, semester: Number(e.target.value) }))}
              />
            </label>
          )}

          <label className="field slider-field">
            <div className="slider-head">
              <span>PMG autodeclarado (referência)</span>
              <output htmlFor="sim-pmg" className="tabular-nums">
                {profile.pmg.toFixed(1)} / 10
              </output>
            </div>
            <input
              id="sim-pmg"
              type="range"
              min={0}
              max={10}
              step={0.1}
              value={profile.pmg}
              onChange={(e) => setProfile((p) => ({ ...p, pmg: Number(e.target.value) }))}
            />
            <small>
              Nota de referência apenas orientativa — o mínimo oficial é definido em cada edital e
              validado pela DRI.
            </small>
          </label>

          <div className="field-grid">
            <SelectField
              label="Inglês (CEFR)"
              value={profile.english}
              onChange={(v) => setProfile((p) => ({ ...p, english: v as CefrLevel }))}
              options={cefrOptions}
            />
            <SelectField
              label="Espanhol (CEFR)"
              value={profile.spanish}
              onChange={(v) => setProfile((p) => ({ ...p, spanish: v as CefrLevel }))}
              options={cefrOptions}
            />
          </div>

          <SelectField
            label="Outro idioma"
            value={profile.otherLanguage}
            onChange={(v) =>
              setProfile((p) => ({
                ...p,
                otherLanguage: v as SimulatorProfile["otherLanguage"],
              }))
            }
            options={["Nenhum", "Francês (B1+)", "Alemão (B2+)"]}
          />

          <label className="compare-check simulator-passport-check">
            <input
              type="checkbox"
              checked={profile.hasPassport}
              onChange={(e) => setProfile((p) => ({ ...p, hasPassport: e.target.checked }))}
            />
            Possuo passaporte válido ou protocolo ativo na Polícia Federal
          </label>

          <div className="actions">
            <Button
              type="button"
              variant="secondary"
              className="full-width"
              onClick={() => setProfile(() => defaultSimulatorProfile)}
            >
              <RotateCcw size={15} aria-hidden="true" />
              Restaurar perfil padrão
            </Button>
          </div>
        </aside>

        <div>
          <div aria-live="polite">
            <Notice
              tone={evaluation.status === "compatible" ? "success" : "warning"}
              title={evaluation.headline}
            >
              <p>{evaluation.summary}</p>
              <ul className="simulator-advisories">
                {evaluation.advisories.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Notice>

            <p className="results-count tabular-nums">
              {evaluation.matches.length}{" "}
              {evaluation.matches.length === 1
                ? "instituição compatível"
                : "instituições compatíveis"}{" "}
              · Resultado orientativo
            </p>
          </div>

          {evaluation.matches.length === 0 ? (
            <div className="empty-state">
              <SearchX size={36} />
              <h3>Nenhuma instituição compatível encontrada</h3>
              <p>
                Revise a situação de matrícula, o curso ou os níveis de idioma informados, ou
                restaure os valores padrão para explorar os convênios desta amostra.
              </p>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setProfile(() => defaultSimulatorProfile)}
              >
                Restaurar perfil padrão
              </Button>
            </div>
          ) : (
            evaluation.matches.map(({ institution: inst, matchedReasons, cautions }) => {
              const linkedOpp = state.opportunities.find(
                (o) => o.institutionId === inst.id || o.id === inst.opportunityId,
              );
              return (
                <article className="item-card catalog-card" key={inst.id}>
                  <div>
                    <p className="eyebrow">
                      COMPATIBILIDADE ORIENTATIVA · {inst.country.toUpperCase()}
                    </p>
                    <h3>{inst.name}</h3>
                    <p className="institution-line">
                      <MapPin size={14} aria-hidden="true" />
                      <strong>
                        {inst.city}, {inst.country}
                      </strong>{" "}
                      · {inst.mode} · {inst.languages}
                    </p>
                    <ul className="simulator-reasons">
                      {matchedReasons.map((reason) => (
                        <li key={reason}>
                          <CheckCircle2 size={14} aria-hidden="true" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                    {cautions[0] && (
                      <p className="simulator-caution">
                        <AlertTriangle size={14} aria-hidden="true" />
                        <span>
                          <strong>Ponto de atenção:</strong> {cautions.join(" ")}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="catalog-card-actions">
                    <Button type="button" onClick={() => onOpenGuide(inst)}>
                      Ver guia da instituição
                    </Button>
                    {linkedOpp && (
                      <Go opportunityId={linkedOpp.id} secondary>
                        Ver edital vinculado
                      </Go>
                    )}
                  </div>
                </article>
              );
            })
          )}

          <Notice title="Próximo passo recomendado">
            <p>
              A simulação auxilia o planejamento inicial. Antes de se inscrever, leia o edital
              vigente e confira prazos de visto e proficiência no guia de saída.
            </p>
            <div className="actions">
              <Go to="/guias" secondary>
                Consultar guia de saída
              </Go>
            </div>
          </Notice>
        </div>
      </div>
      <p className="fine-print">{legal}</p>
    </section>
  );
}
