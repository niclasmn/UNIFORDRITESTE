import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { Building2, MapPin, SearchX, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { partnerInstitutions, type PartnerInstitution } from "@/lib/pumi/data";
import { usePumi } from "@/lib/pumi/store";
import { EligibilitySimulator } from "./eligibility-simulator";
import { WorldMap } from "./world-map";
import { Modal } from "./modal";
import { External, Go, Intro, Notice, SelectField } from "./shared";
type CatalogTab = "oportunidades" | "instituicoes" | "elegibilidade";
function resolveCatalogTab(tab?: string): CatalogTab {
  if (tab === "instituicoes") return "instituicoes";
  if (tab === "elegibilidade") return "elegibilidade";
  return "oportunidades";
}
const empty = {
  audience: "Todos os públicos",
  country: "Todos os países",
  mode: "Todas",
  status: "Todas",
  date: "",
};
export function Catalog() {
  const search = useSearch({ strict: false }) as {
    tab?: string;
    country?: string;
    audience?: string;
  };
  const [tab, setTab] = useState<CatalogTab>(() => resolveCatalogTab(search.tab));
  const [view, setView] = useState("Lista");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Prazo mais próximo");
  const [filters, setFilters] = useState({
    ...empty,
    country: search.country ?? empty.country,
    audience: search.audience ?? empty.audience,
  });
  const [applied, setApplied] = useState(filters);
  const [guideInstitution, setGuideInstitution] = useState<PartnerInstitution | null>(null);
  const { state, update } = usePumi();

  useEffect(() => {
    if (search.tab) setTab(resolveCatalogTab(search.tab));
  }, [search.tab]);

  const countryOptions = [
    empty.country,
    ...Array.from(
      new Set([
        ...partnerInstitutions.map((i) => i.country),
        ...state.opportunities.map((o) => o.country),
      ]),
    ),
  ];

  const visibleOpportunities = state.opportunities
    .filter(
      (o) =>
        (applied.country === empty.country || o.country === applied.country) &&
        (applied.audience === empty.audience || o.audience === applied.audience) &&
        (applied.mode === "Todas" || o.mode === applied.mode) &&
        (applied.status === "Todas" || o.status === applied.status) &&
        (!applied.date || (!!o.date && o.date <= applied.date)) &&
        `${o.title} ${o.country} ${o.city} ${o.institution}`
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()),
    )
    .sort((a, b) =>
      sort === "Ordem alfabética"
        ? a.title.localeCompare(b.title)
        : (a.date || "9999").localeCompare(b.date || "9999"),
    );

  const visibleInstitutions = partnerInstitutions
    .filter(
      (inst) =>
        (applied.country === empty.country || inst.country === applied.country) &&
        (applied.audience === empty.audience || inst.audience === applied.audience) &&
        (applied.mode === "Todas" || inst.mode === applied.mode) &&
        `${inst.name} ${inst.city} ${inst.country} ${inst.areas} ${inst.languages}`
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()),
    )
    .sort((a, b) =>
      sort === "Ordem alfabética"
        ? a.name.localeCompare(b.name)
        : a.country.localeCompare(b.country),
    );

  const activeCount =
    tab === "instituicoes" ? visibleInstitutions.length : visibleOpportunities.length;

  function clear() {
    setFilters(empty);
    setApplied(empty);
    setQuery("");
  }

  return (
    <>
      <Intro
        crumb="OPORTUNIDADES"
        title="Seu próximo destino começa com uma escolha."
        description="Encontre editais, programas e instituições conveniadas para a sua jornada internacional."
      />
      <div className="tabs-bar">
        <div role="tablist" aria-label="Modos do catálogo" className="tabs-group">
          <Button
            role="tab"
            variant="ghost"
            aria-selected={tab === "oportunidades"}
            onClick={() => setTab("oportunidades")}
          >
            Oportunidades
          </Button>
          <Button
            role="tab"
            variant="ghost"
            aria-selected={tab === "instituicoes"}
            onClick={() => setTab("instituicoes")}
          >
            Instituições conveniadas
          </Button>
          <Button
            role="tab"
            variant="ghost"
            aria-selected={tab === "elegibilidade"}
            onClick={() => setTab("elegibilidade")}
          >
            Simulador de elegibilidade
          </Button>
        </div>
        {tab !== "elegibilidade" && (
          <div>
            {["Lista", "Mapa"].map((v) => (
              <Button key={v} variant="ghost" aria-pressed={view === v} onClick={() => setView(v)}>
                {v === "Mapa" && <MapPin size={14} />} {v}
              </Button>
            ))}
          </div>
        )}
      </div>
      {tab === "elegibilidade" ? (
        <EligibilitySimulator onOpenGuide={setGuideInstitution} />
      ) : (
        <>
          <div className="sidebar-layout">
            <aside className="panel">
              <h3>Refine sua busca</h3>
              <SelectField
                label="Público"
                value={filters.audience}
                onChange={(v) => setFilters({ ...filters, audience: v })}
                options={[empty.audience, "Estudante Unifor", "Estudante Estrangeiro", "Docente"]}
              />
              <SelectField
                label="País"
                value={filters.country}
                onChange={(v) => setFilters({ ...filters, country: v })}
                options={countryOptions}
              />
              <SelectField
                label="Modalidade"
                value={filters.mode}
                onChange={(v) => setFilters({ ...filters, mode: v })}
                options={["Todas", "Presencial", "Virtual", "Híbrida"]}
              />
              <SelectField
                label="Situação"
                value={filters.status}
                onChange={(v) => setFilters({ ...filters, status: v })}
                options={["Todas", "Inscrições abertas", "Em breve", "Encerrado"]}
              />
              <label className="field">
                <span>Prazo de inscrição até</span>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                />
              </label>
              <Button className="full-width" onClick={() => setApplied(filters)}>
                Aplicar filtros
              </Button>
              <Button variant="link" onClick={clear} className="mt-3">
                Limpar filtros
              </Button>
            </aside>
            <div>
              <div className="search-row">
                <input
                  aria-label="Buscar país, instituição ou programa"
                  placeholder="Buscar país, instituição ou programa"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <select
                  aria-label="Ordenar resultados"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option>Prazo mais próximo</option>
                  <option>Ordem alfabética</option>
                </select>
              </div>
              <p className="results-count" aria-live="polite">
                {activeCount}{" "}
                {tab === "instituicoes" ? "instituições conveniadas" : "oportunidades"} · Conteúdo
                demonstrativo
              </p>
              {view === "Mapa" && (
                <WorldMap
                  institutions={
                    visibleInstitutions.length ? visibleInstitutions : partnerInstitutions
                  }
                  openInstitutionIds={partnerInstitutions
                    .filter((inst) =>
                      state.opportunities.some(
                        (o) =>
                          o.status === "Inscrições abertas" &&
                          (o.institutionId === inst.id || o.id === inst.opportunityId),
                      ),
                    )
                    .map((inst) => inst.id)}
                  onOpenGuide={setGuideInstitution}
                />
              )}
              {activeCount === 0 && (
                <div className="empty-state">
                  <SearchX size={36} />
                  <h3>Nenhum resultado encontrado</h3>
                  <p>Tente outro país, instituição, programa ou combinação de filtros.</p>
                  <Button onClick={clear} variant="secondary">
                    Limpar filtros
                  </Button>
                </div>
              )}
              {tab === "oportunidades" &&
                visibleOpportunities.map((o) => {
                  const linkedInstitution = partnerInstitutions.find(
                    (i) => i.id === o.institutionId,
                  );
                  return (
                    <article className="item-card catalog-card" key={o.id}>
                      <div>
                        <p className="eyebrow">{o.tag}</p>
                        <h3>{o.title}</h3>
                        <p className="institution-line">
                          <Building2 size={14} aria-hidden="true" />
                          <strong>Instituição do edital:</strong> {o.institution} ({o.city},{" "}
                          {o.country})
                        </p>
                        <p>{o.description}</p>
                        <p className="deadline">{o.deadline}</p>
                      </div>
                      <div className="catalog-card-actions">
                        <Go opportunityId={o.id}>Ver oportunidade</Go>
                        {linkedInstitution && (
                          <Button
                            variant="secondary"
                            onClick={() => setGuideInstitution(linkedInstitution)}
                          >
                            Guia da instituição
                          </Button>
                        )}
                        <label className="compare-check">
                          <input
                            type="checkbox"
                            checked={state.selected.includes(o.id)}
                            onChange={(e) =>
                              update((s) => ({
                                ...s,
                                selected: e.target.checked
                                  ? [...s.selected, o.id]
                                  : s.selected.filter((x) => x !== o.id),
                              }))
                            }
                          />
                          Comparar destinos
                        </label>
                      </div>
                    </article>
                  );
                })}
              {tab === "instituicoes" &&
                visibleInstitutions.map((inst) => {
                  const linkedOpp = state.opportunities.find(
                    (o) => o.institutionId === inst.id || o.id === inst.opportunityId,
                  );
                  return (
                    <article className="item-card catalog-card" key={inst.id}>
                      <div>
                        <p className="eyebrow">
                          INSTITUIÇÃO CONVENIADA · {inst.country.toUpperCase()}
                        </p>
                        <h3>{inst.name}</h3>
                        <p className="institution-line">
                          <MapPin size={14} aria-hidden="true" />
                          <strong>
                            {inst.city}, {inst.country}
                          </strong>{" "}
                          · {inst.mode} · {inst.languages}
                        </p>
                        <p>{inst.summary}</p>
                        <p className="fine-print">
                          <strong>Áreas:</strong> {inst.areas}
                        </p>
                      </div>
                      <div className="catalog-card-actions">
                        <Button onClick={() => setGuideInstitution(inst)}>
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
                })}
              {state.selected.length > 0 && (
                <Notice>
                  <div className="selected-profile">
                    <span>{state.selected.length} destino(s) selecionado(s)</span>
                    <Go to="/comparador">Comparar destinos</Go>
                  </div>
                </Notice>
              )}
              <Notice title="Planeje antes do edital">
                <p>
                  Visto, documentos e proficiência exigem antecedência. Consulte os passos do guia
                  de saída.
                </p>
                <div className="actions">
                  <Go to="/guias" secondary>
                    Consultar guia
                  </Go>
                </div>
              </Notice>
              <p className="text-link">1 Página 1 de 1</p>
            </div>
          </div>
          <p className="fine-print">
            Conteúdo demonstrativo: programas, instituições, prazos e disponibilidade estão sujeitos
            à validação da DRI.
          </p>
        </>
      )}
      {guideInstitution && (
        <Modal labelledBy="institution-guide-title" onClose={() => setGuideInstitution(null)}>
          <div className="modal-heading">
            <div>
              <p className="eyebrow">
                GUIA DA INSTITUIÇÃO CONVENIADA · {guideInstitution.country.toUpperCase()}
              </p>
              <h2 id="institution-guide-title">{guideInstitution.name}</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setGuideInstitution(null)}
              aria-label="Fechar guia da instituição"
            >
              <X />
            </Button>
          </div>
          <p>{guideInstitution.summary}</p>
          <div className="institution-meta">
            <div>
              <strong>Cidade e país</strong>
              <span>
                {guideInstitution.city}, {guideInstitution.country}
              </span>
            </div>
            <div>
              <strong>Tipo de convênio</strong>
              <span>{guideInstitution.agreementType}</span>
            </div>
            <div>
              <strong>Idiomas de ensino</strong>
              <span>{guideInstitution.languages}</span>
            </div>
            <div>
              <strong>Áreas acadêmicas</strong>
              <span>{guideInstitution.areas}</span>
            </div>
          </div>
          <Notice title="Moradia e custo de vida">
            <p>{guideInstitution.housingNote}</p>
          </Notice>
          <Notice tone="warning" title="Documentação e visto">
            <p>{guideInstitution.documentationNote}</p>
          </Notice>
          <div className="actions">
            {guideInstitution.opportunityId && (
              <Go opportunityId={guideInstitution.opportunityId}>Ver oportunidade vinculada</Go>
            )}
            <External href={guideInstitution.website} secondary>
              Site oficial da instituição
            </External>
            <Button variant="ghost" onClick={() => setGuideInstitution(null)}>
              Fechar
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
