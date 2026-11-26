import { useState } from "react";
import { Button } from "@/components/ui/button";
import students from "@/assets/students.asset.json";
import { MIN_ATTENDANCE } from "@/lib/pumi/data";
import { External, Go, Intro, Notice, SelectField, TextLink, official } from "./shared";
const courseData = [
  { title: "International Business", area: "Business", language: "English", semester: "2027.1" },
  {
    title: "Brazilian Culture and Society",
    area: "Humanities",
    language: "English",
    semester: "2027.1",
  },
  {
    title: "Portuguese as a Foreign Language",
    area: "Languages",
    language: "Portuguese",
    semester: "2027.1",
  },
  { title: "Global Health", area: "Health", language: "English", semester: "2027.2" },
];
export function Arrival() {
  const [language, setLanguage] = useState("All languages");
  const [area, setArea] = useState("All subject areas");
  const [semester, setSemester] = useState("All semesters");
  const [showCourses, setShowCourses] = useState(false);
  const [living, setLiving] = useState("");
  const filtered = courseData.filter(
    (c) =>
      (language === "All languages" || c.language === language) &&
      (area === "All subject areas" || c.area === area) &&
      (semester === "All semesters" || c.semester === semester),
  );
  return (
    <>
      <div className="breadcrumb">UNIFOR / DRI / INTERNATIONAL STUDENTS / YOUR ARRIVAL GUIDE</div>
      <section className="hero">
        <div>
          <p className="eyebrow">YOUR ARRIVAL GUIDE</p>
          <h1>
            Your world.
            <br />
            Your Unifor.
          </h1>
          <p>Everything you need to begin your academic experience in Fortaleza, Brazil.</p>
          <External href={official}>Application instructions</External>
        </div>
        <figure>
          <img src={students.url} alt="International university students on a tropical campus" />
        </figure>
      </section>
      <div className="sidebar-layout home-section">
        <aside className="panel">
          <h3>Plan your arrival</h3>
          {[
            ["01 Visa & attendance", "rules"],
            ["02 Application steps", "application"],
            ["03 Courses & languages", "courses"],
            ["04 Living in Fortaleza", "living"],
            ["05 Contact DRI", "contact"],
          ].map(([label, id]) => (
            <a className="text-link mb-5" key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </aside>
        <div>
          <section id="rules" className="notice warning">
            <h3>Before you travel: two essential rules</h3>
            <div className="grid-two">
              <div>
                <h4>Student visa required</h4>
                <p>
                  A valid student visa is required for enrolment. A passport or tourist visa alone
                  does not allow you to enrol.
                </p>
              </div>
              <div>
                <h4>At least {MIN_ATTENDANCE}% attendance</h4>
                <p>
                  Passing a course requires both the required grades and a minimum of{" "}
                  {MIN_ATTENDANCE}% attendance. This rule is not negotiable.
                </p>
              </div>
            </div>
          </section>
          <section id="application" className="panel">
            <h2>Your arrival, step by step</h2>
            <ol className="steps">
              <li>Check the agreement with your home institution</li>
              <li>Follow the official application and nomination process</li>
              <li>Obtain acceptance and a valid student visa</li>
              <li>Arrange insurance, housing and your arrival</li>
            </ol>
            <div className="actions">
              <External href={official}>See application instructions</External>
            </div>
          </section>
          <section id="courses" className="panel">
            <p className="eyebrow">ACADEMIC LIFE</p>
            <h2>Find your courses</h2>
            <p>
              Explore courses taught in English and other languages. Confirm the current semester
              offer, timetable and prerequisites with DRI.
            </p>
            <div className="grid-three">
              <SelectField
                label="Language"
                value={language}
                onChange={(v) => {
                  setLanguage(v);
                  setShowCourses(true);
                }}
                options={["All languages", "English", "Portuguese"]}
              />
              <SelectField
                label="Subject area"
                value={area}
                onChange={(v) => {
                  setArea(v);
                  setShowCourses(true);
                }}
                options={["All subject areas", "Business", "Humanities", "Health", "Languages"]}
              />
              <SelectField
                label="Semester"
                value={semester}
                onChange={(v) => {
                  setSemester(v);
                  setShowCourses(true);
                }}
                options={["All semesters", "2027.1", "2027.2"]}
              />
            </div>
            <Button variant="secondary" onClick={() => setShowCourses(!showCourses)}>
              Browse the course catalogue →
            </Button>
            {showCourses && (
              <div className="mt-5">
                <p className="fine-print">
                  Illustrative catalogue · Titles and availability require confirmation with DRI.
                </p>
                {filtered.length ? (
                  filtered.map((c) => (
                    <div className="course-row" key={c.title}>
                      <strong>{c.title}</strong>
                      <small>
                        {c.language} · {c.area} · {c.semester}
                      </small>
                    </div>
                  ))
                ) : (
                  <Notice>
                    <p>
                      No courses match these filters. Try another language, subject or semester.
                    </p>
                  </Notice>
                )}
              </div>
            )}
          </section>
          <section id="living" className="panel">
            <p className="eyebrow">LIVING IN FORTALEZA</p>
            <h2>Feel at home beyond the classroom.</h2>
            <div className="grid-two">
              <div>
                <h3>Housing & neighbourhoods</h3>
                <p>
                  Start with Edson Queiroz, where Unifor is located. Compare housing, transport,
                  contracts and safety before making a decision.
                </p>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => setLiving(living === "housing" ? "" : "housing")}
                >
                  Explore housing guidance →
                </Button>
              </div>
              <div>
                <h3>Build your monthly budget</h3>
                <p>
                  Plan for rent, utilities, food, local transport and health insurance. Request
                  updated estimates before you travel.
                </p>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => setLiving(living === "budget" ? "" : "budget")}
                >
                  Living-cost checklist →
                </Button>
              </div>
            </div>
            {living && (
              <Notice
                title={
                  living === "housing"
                    ? "Compare before choosing"
                    : "Your monthly planning checklist"
                }
              >
                {living === "housing" ? (
                  <p>
                    Edson Queiroz: close to campus and Iguatemi Bosque. Aldeota and Meireles:
                    compare commute times and rent. Beira Mar and Praia do Futuro: check transport
                    before booking. Visit housing, review the contract and avoid advance transfers
                    to unverified hosts.
                  </p>
                ) : (
                  <div>
                    <p>
                      Illustrative monthly ranges, not quotations: shared housing R$ 1,000–2,000;
                      food R$ 600–1,000; transport R$ 200–400. Utilities and health insurance are
                      additional. Confirm current prices before travelling.
                    </p>
                    {[
                      "Rent & utilities",
                      "Food",
                      "Local transport",
                      "Health insurance",
                      "Emergency reserve",
                    ].map((x) => (
                      <label key={x} className="editor-check">
                        <input type="checkbox" />
                        {x}
                      </label>
                    ))}
                  </div>
                )}
              </Notice>
            )}
            <div className="mt-5">
              <Notice title="Your starting point in Fortaleza">
                <p>
                  Av. Washington Soares, 1321 · Edson Queiroz
                  <br />
                  Explore routes to beaches, shopping centres, banks and local shops. Confirm travel
                  times before choosing housing.
                </p>
              </Notice>
            </div>
          </section>
          <Notice title="Some academic choices may be flexible">
            <p>
              Courses outside your programme may be assessed individually. Visa and attendance
              requirements remain mandatory.
            </p>
          </Notice>
          <div id="contact">
            <Go to="/contatos" secondary>
              Contact the international office
            </Go>
            <p className="fine-print">
              Essential arrival information is prioritised in English. Extensive internal documents
              may remain in Portuguese.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
const outboundChapters = [
  [
    "01 · ESCOLHA E EDITAL",
    "Confira o convênio e as condições",
    "Confirme instituições parceiras, cursos ou linhas de pesquisa compatíveis, proficiência e prazos no edital oficial. Afinidade com um destino não garante vaga ou bolsa.",
  ],
  [
    "02 · VIDA ACADÊMICA",
    "Organize seu plano de estudos ou missão",
    "Estudantes devem alinhar disciplinas e aproveitamento com a coordenação; docentes definem plano de trabalho e pesquisa antes de solicitar a carta de aceite.",
  ],
  [
    "03 · DOCUMENTAÇÃO",
    "Reserve tempo para os trâmites consulares",
    "Verifique passaporte válido, visto de estudante ou pesquisador, traduções, comprovantes financeiros e seguro. Consulte os prazos diretamente no consulado.",
  ],
  [
    "04 · ANTES DA VIAGEM",
    "Confira cada etapa antes de embarcar",
    "Confirme carta de aceite, visto, seguro e moradia antes de comprar passagens. Guarde os contatos institucionais e cópias seguras dos documentos.",
  ],
];

const incomingChapters = [
  [
    "01 · CONVÊNIO E NOMEAÇÃO",
    "Confirme a parceria e a candidatura",
    "Verifique se sua universidade de origem possui convênio ativo com a Unifor e siga o processo oficial de indicação e candidatura junto à DRI.",
  ],
  [
    "02 · VISTO E FREQUÊNCIA",
    "Regras obrigatórias de matrícula",
    `O visto de estudante válido é obrigatório para efetivar a matrícula (passaporte ou visto de turista não permitem vínculo). A aprovação exige no mínimo ${MIN_ATTENDANCE}% de frequência.`,
  ],
  [
    "03 · VIDA ACADÊMICA",
    "Disciplinas em inglês e português",
    "Explore disciplinas ofertadas em inglês, Português como Língua Estrangeira e demais áreas da Unifor, confirmando horários e pré-requisitos com a DRI.",
  ],
  [
    "04 · CHEGADA EM FORTALEZA",
    "Seguro-saúde, moradia e acolhimento",
    "Providencie seguro internacional válido, planeje seu orçamento mensal e compare opções de moradia próximas ao campus (Edson Queiroz, Aldeota ou Meireles) antes do embarque.",
  ],
];

export function Outbound() {
  return (
    <>
      <Intro
        crumb="GUIAS DE MOBILIDADE"
        title="Guias de mobilidade internacional."
        description="Orientações organizadas para alunos e docentes da Unifor que vão ao exterior e para estudantes estrangeiros que chegam à Universidade de Fortaleza."
      />
      <div className="grid-two guides-columns">
        <section className="guide-column" aria-labelledby="guide-outbound-title">
          <div className="panel guide-sheet">
            <div className="guide-sheet-header">
              <p className="eyebrow">COLUNA 1 · ALUNOS UNIFOR E DOCENTES (OUTGOING)</p>
              <h2 id="guide-outbound-title">1. Guia de Mobilidade de Saída</h2>
              <p>
                Para estudantes de graduação, pós-graduação e docentes da Unifor que desejam
                realizar intercâmbio, dupla titulação, pesquisa ou missão acadêmica no exterior.
              </p>
            </div>
            <div className="guide-steps-list">
              {outboundChapters.map(([tag, title, body]) => (
                <div className="guide-step" key={tag}>
                  <p className="eyebrow">{tag}</p>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
          <Notice title="Atenção ao visto de estudante (RN05)" tone="warning">
            <p>
              Passaporte não substitui o visto. Considere os prazos para carta de aceite e envio de
              documentos ao consulado antes de comprar passagens.
            </p>
          </Notice>
          <Notice title="Acompanhe sua preparação na Unifor">
            <p>
              Simule sua elegibilidade preliminar, organize seu checklist em{" "}
              <strong>Minha DRI</strong> ou consulte as chamadas voltadas a docentes e pesquisa.
            </p>
            <div className="actions">
              <Go to="/oportunidades?tab=elegibilidade">Simular elegibilidade</Go>
              <Go to="/minha-dri" secondary>
                Abrir Minha DRI
              </Go>
              <Go to="/docentes" secondary>
                Docentes e pesquisa
              </Go>
            </div>
          </Notice>
        </section>

        <section className="guide-column" aria-labelledby="guide-incoming-title">
          <div className="panel guide-sheet guide-sheet-incoming">
            <div className="guide-sheet-header">
              <p className="eyebrow">COLUNA 2 · ALUNOS ESTRANGEIROS (INCOMING)</p>
              <h2 id="guide-incoming-title">2. Guia de Mobilidade de Entrada</h2>
              <p>
                Para estudantes internacionais de instituições parceiras que desejam vir estudar na
                Unifor ou estão preparando sua chegada em Fortaleza.
              </p>
            </div>
            <div className="guide-steps-list">
              {incomingChapters.map(([tag, title, body]) => (
                <div className="guide-step" key={tag}>
                  <p className="eyebrow">{tag}</p>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
          <Notice title={`Visto e ${MIN_ATTENDANCE}% de frequência obrigatórios`} tone="warning">
            <p>
              Visto de estudante válido para matrícula e frequência mínima de {MIN_ATTENDANCE}% nas
              disciplinas são requisitos institucionais obrigatórios na Unifor.
            </p>
          </Notice>
          <Notice title="Guia completo de chegada em inglês">
            <p>
              Acesse o <strong>Arrival Guide</strong> em inglês para consultar disciplinas,
              orientações de bairros em Fortaleza, checklist de orçamento mensal e contato com a
              DRI.
            </p>
            <div className="actions">
              <Go to="/arrival-guide">Abrir Arrival Guide (EN)</Go>
              <Go to="/oportunidades?audience=Estudante+Estrangeiro" secondary>
                Oportunidades de entrada
              </Go>
              <Go to="/contatos" secondary>
                Fale com a DRI
              </Go>
            </div>
          </Notice>
        </section>
      </div>
    </>
  );
}
