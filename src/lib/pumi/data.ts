export type ContentStatus =
  "Rascunho" | "Aguardando Marketing" | "Ajustes solicitados" | "Publicado";
export type InterestStatus = "Recebida" | "Em orientação" | "Concluída" | "Cancelada";
export interface Content {
  id: string;
  title: string;
  body: string;
  english: string;
  language: string;
  status: ContentStatus;
  comment: string;
}
export interface Interest {
  id: string;
  title: string;
  status: InterestStatus;
  note: string;
}
export interface Opportunity {
  id: string;
  tag: string;
  title: string;
  description: string;
  country: string;
  city: string;
  audience: string;
  mode: string;
  status: string;
  deadline: string;
  date: string;
  institution: string;
  institutionId: string;
  agreementType: string;
  institutionSummary: string;
  institutionWebsite: string;
  academicAreas: string;
  languages: string;
  housingAndCosts: string;
}
export type CefrLevel = "Nenhum" | "B1" | "B2" | "C1" | "C2";
export type PartnerLanguageName = "Português" | "Inglês" | "Espanhol" | "Francês" | "Alemão";
export const uniforCourses = [
  "Engenharia da Computação / Ciência da Computação / IA",
  "Engenharia Civil, Mecânica ou de Produção",
  "Direito",
  "Administração, Economia ou Negócios",
  "Arquitetura e Urbanismo",
  "Comunicação, Design ou Artes",
  "Ciências da Saúde (Medicina, Nutrição, Fisioterapia, Enfermagem)",
  "Relações Internacionais / Ciências Políticas / Humanidades",
  "Pós-graduação e Pesquisa Docente",
] as const;
export interface PartnerInstitution {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  audience: string;
  mode: string;
  agreementType: string;
  languages: string;
  areas: string;
  acceptedCourses: string[];
  acceptedLanguages: Array<{ lang: PartnerLanguageName; minCefr: Exclude<CefrLevel, "Nenhum"> }>;
  attentionNote: string;
  summary: string;
  housingNote: string;
  documentationNote: string;
  website: string;
  opportunityId?: string;
}
export const partnerInstitutions: PartnerInstitution[] = [
  {
    id: "uporto",
    name: "Universidade do Porto",
    city: "Porto",
    country: "Portugal",
    lat: 41.1579,
    lng: -8.6291,
    audience: "Estudante Unifor",
    mode: "Presencial",
    agreementType: "Convênio bilateral de mobilidade acadêmica (graduação e pós-graduação)",
    languages: "Português",
    areas: "Engenharia, Direito, Saúde, Arquitetura, Economia e Humanidades",
    acceptedCourses: [...uniforCourses],
    acceptedLanguages: [{ lang: "Português", minCefr: "B1" }],
    attentionNote:
      "Alta procura por residências universitárias; visto de estudo consular exige carta de aceite prévia.",
    summary:
      "Principal instituição pública do norte de Portugal, com polos universitários integrados à cidade do Porto e forte reconhecimento em pesquisa e mobilidade lusófona.",
    housingNote:
      "Residências universitárias com alta procura e quartos compartilhados entre € 350 e € 550/mês; manutenção total estimada entre € 750 e € 1.000/mês.",
    documentationNote:
      "Exige carta de aceite oficial, seguro-saúde internacional (ou PB4 quando aplicável) e visto de estudo emitido pelo consulado antes do embarque.",
    website: "https://www.up.pt",
    opportunityId: "portugal",
  },
  {
    id: "valencia",
    name: "Universitat de València",
    city: "Valência",
    country: "Espanha",
    lat: 39.4699,
    lng: -0.3763,
    audience: "Estudante Unifor",
    mode: "Presencial",
    agreementType: "Convênio acadêmico bilateral · Intercâmbio semestral",
    languages: "Espanhol (B1/B2) e disciplinas selecionadas em Inglês",
    areas: "Ciências Sociais, Comunicação, Direito, Economia e Saúde",
    acceptedCourses: [
      "Direito",
      "Administração, Economia ou Negócios",
      "Comunicação, Design ou Artes",
      "Ciências da Saúde (Medicina, Nutrição, Fisioterapia, Enfermagem)",
      "Relações Internacionais / Ciências Políticas / Humanidades",
    ],
    acceptedLanguages: [
      { lang: "Espanhol", minCefr: "B1" },
      { lang: "Inglês", minCefr: "B2" },
    ],
    attentionNote:
      "Disciplinas em inglês são limitadas por centro; estadias superiores a 90 dias exigem visto consular espanhol.",
    summary:
      "Instituição centenária no litoral mediterrâneo da Espanha, com ampla oferta de disciplinas semestrais e programas de acolhimento para estudantes latino-americanos.",
    housingNote:
      "Moradia estudantil concentrada nos bairros de Blasco Ibáñez e Benimaclet; custo mensal estimado entre € 800 e € 1.100.",
    documentationNote:
      "Necessário visto de estudante de longa duração para estadias superiores a 90 dias, além de comprovação de seguro médico e carta de aceitação.",
    website: "https://www.uv.es",
  },
  {
    id: "santander",
    name: "Santander Open Academy",
    city: "Madri",
    country: "Espanha",
    lat: 40.4168,
    lng: -3.7038,
    audience: "Estudante Unifor",
    mode: "Virtual",
    agreementType: "Programa de bolsas e capacitação em rede internacional",
    languages: "Espanhol, Inglês e Português",
    areas: "Liderança, Tecnologia, Negócios, Idiomas e Empregabilidade",
    acceptedCourses: [...uniforCourses],
    acceptedLanguages: [
      { lang: "Português", minCefr: "B1" },
      { lang: "Espanhol", minCefr: "B1" },
      { lang: "Inglês", minCefr: "B1" },
    ],
    attentionNote:
      "Modalidade virtual sem custo de moradia; chamadas presenciais têm critérios específicos no portal do parceiro.",
    summary:
      "Plataforma global de bolsas, cursos curtos e trilhas internacionais em parceria com universidades da Europa e das Américas, coordenada a partir da Espanha.",
    housingNote:
      "Na modalidade virtual não há custo de moradia; editais presenciais vinculados divulgam ajuda de custo específica em cada chamada.",
    documentationNote:
      "Inscrição realizada diretamente no portal do parceiro com validação acadêmica junto à DRI quando exigido pelo edital.",
    website: "https://www.santanderopenacademy.com/",
    opportunityId: "santander",
  },
  {
    id: "lyon1",
    name: "Université Claude Bernard Lyon 1",
    city: "Lyon",
    country: "França",
    lat: 45.764,
    lng: 4.8357,
    audience: "Docente",
    mode: "Híbrida",
    agreementType: "Cooperação científica, mobilidade docente e coorientação de pesquisa",
    languages: "Francês e Inglês",
    areas: "Ciências da Saúde, Engenharia, Tecnologia e Ciências Exatas",
    acceptedCourses: [
      "Engenharia da Computação / Ciência da Computação / IA",
      "Engenharia Civil, Mecânica ou de Produção",
      "Ciências da Saúde (Medicina, Nutrição, Fisioterapia, Enfermagem)",
      "Pós-graduação e Pesquisa Docente",
    ],
    acceptedLanguages: [
      { lang: "Francês", minCefr: "B1" },
      { lang: "Inglês", minCefr: "B2" },
    ],
    attentionNote:
      "Convênio voltado a cooperação científica, pós-graduação e missões docentes com carta-convite do laboratório.",
    summary:
      "Polo francês de referência em pesquisa científica e inovação tecnológica, com atuação ativa em redes acadêmicas internacionais e missões docentes.",
    housingNote:
      "Hospedagem acadêmica no campus La Doua ou região metropolitana de Lyon; estimativa entre € 900 e € 1.200/mês para estadias presenciais.",
    documentationNote:
      "Missões docentes e pesquisas conjuntas demandam carta-convite do laboratório anfitrião, plano de trabalho e seguro viagem.",
    website: "https://www.univ-lyon1.fr",
    opportunityId: "pesquisa",
  },
  {
    id: "fuberlin",
    name: "Freie Universität Berlin",
    city: "Berlim",
    country: "Alemanha",
    lat: 52.453,
    lng: 13.2905,
    audience: "Estudante Unifor",
    mode: "Presencial",
    agreementType: "Convênio de mobilidade acadêmica e cooperação em pesquisa",
    languages: "Alemão e Inglês (B2)",
    areas: "Relações Internacionais, Humanidades, Ciências Políticas e Direito",
    acceptedCourses: [
      "Direito",
      "Comunicação, Design ou Artes",
      "Relações Internacionais / Ciências Políticas / Humanidades",
      "Pós-graduação e Pesquisa Docente",
    ],
    acceptedLanguages: [
      { lang: "Alemão", minCefr: "B2" },
      { lang: "Inglês", minCefr: "B2" },
    ],
    attentionNote:
      "Exige comprovação financeira (conta bloqueada ou bolsa), seguro-saúde alemão e visto nacional de estudo.",
    summary:
      "Universidade alemã reconhecida pelo perfil cosmopolita e pela forte integração em redes de pesquisa e programas internacionais ministrados em inglês.",
    housingNote:
      "Custo mensal estimado entre € 1.000 e € 1.400; recomenda-se candidatura antecipada para moradia estudantil via studentenWERK BERLIN.",
    documentationNote:
      "Exige comprovação financeira (conta bloqueada ou bolsa), seguro de saúde alemão válido e visto nacional para fins de estudo.",
    website: "https://www.fu-berlin.de",
  },
  {
    id: "ucf",
    name: "University of Central Florida (UCF)",
    city: "Orlando",
    country: "EUA",
    lat: 28.6024,
    lng: -81.2001,
    audience: "Estudante Unifor",
    mode: "Presencial",
    agreementType: "Parceria para missões acadêmicas, imersão em inovação e intercâmbio",
    languages: "Inglês (B2)",
    areas: "Inovação, Liderança, Inteligência Artificial, Negócios e Engenharia",
    acceptedCourses: [
      "Engenharia da Computação / Ciência da Computação / IA",
      "Engenharia Civil, Mecânica ou de Produção",
      "Administração, Economia ou Negócios",
    ],
    acceptedLanguages: [{ lang: "Inglês", minCefr: "B2" }],
    attentionNote:
      "Missões de imersão e intercâmbios nos EUA exigem passaporte válido e visto americano adequado ao programa.",
    summary:
      "Instituição parceira em Orlando (Flórida), referência nas missões de imersão internacional da Unifor com foco em tecnologia, gestão e empreendedorismo.",
    housingNote:
      "Programas de curta duração incluem orientação específica de hospedagem; intercâmbios semestrais exigem planejamento financeiro em dólar.",
    documentationNote:
      "Requer passaporte válido, documentação acadêmica e visto americano adequado à categoria do programa (F-1/J-1 ou conforme orientação oficial).",
    website: "https://www.ucf.edu",
  },
];
export const initialOpportunities: Opportunity[] = [
  {
    id: "portugal",
    tag: "MOBILIDADE ACADÊMICA · EXEMPLO",
    title: "Um semestre em Portugal",
    description: "Graduação e pós-graduação · Universidade do Porto · Portugal · Presencial",
    country: "Portugal",
    city: "Porto",
    audience: "Estudante Unifor",
    mode: "Presencial",
    status: "Inscrições abertas",
    deadline: "Até 30 nov. 2026 · Prazo ilustrativo",
    date: "2026-11-30",
    institution: "Universidade do Porto",
    institutionId: "uporto",
    agreementType: "Convênio bilateral de mobilidade acadêmica",
    institutionSummary:
      "A Universidade do Porto é a instituição conveniada responsável por receber os estudantes da Unifor nesta chamada demonstrativa, com oferta de disciplinas em português.",
    institutionWebsite: "https://www.up.pt",
    academicAreas: "Engenharia, Direito, Saúde, Arquitetura, Economia e Humanidades",
    languages: "Português",
    housingAndCosts:
      "Residência ou quarto compartilhado; manutenção estimada entre € 750 e € 1.000/mês.",
  },
  {
    id: "santander",
    tag: "PARCEIROS · EXEMPLO",
    title: "Oportunidades Santander",
    description:
      "Bolsas e experiências internacionais · Santander Open Academy · Múltiplos destinos",
    country: "Espanha",
    city: "Madri",
    audience: "Estudante Unifor",
    mode: "Virtual",
    status: "Inscrições abertas",
    deadline: "Prazos no canal oficial do parceiro",
    date: "",
    institution: "Santander Open Academy",
    institutionId: "santander",
    agreementType: "Programa global de bolsas e capacitação com sede na Espanha",
    institutionSummary:
      "Edital vinculado ao Santander Open Academy (Madri, Espanha), oferecendo trilhas de idiomas, tecnologia e experiências acadêmicas em rede com universidades parceiras.",
    institutionWebsite: "https://www.santanderopenacademy.com/",
    academicAreas: "Liderança, Tecnologia, Negócios e Idiomas",
    languages: "Espanhol, Inglês e Português",
    housingAndCosts:
      "Modalidade virtual sem custo de deslocamento; chamadas presenciais informam auxílio no edital.",
  },
  {
    id: "pesquisa",
    tag: "DOCENTES · EXEMPLO",
    title: "Cooperação em pesquisa",
    description: "Mobilidade docente · Université Claude Bernard Lyon 1 · França · Híbrida",
    country: "França",
    city: "Lyon",
    audience: "Docente",
    mode: "Híbrida",
    status: "Em breve",
    deadline: "Consulte as condições da chamada",
    date: "",
    institution: "Université Claude Bernard Lyon 1",
    institutionId: "lyon1",
    agreementType: "Cooperação científica e mobilidade docente em rede",
    institutionSummary:
      "Chamada demonstrativa vinculada à Université Claude Bernard Lyon 1 (Lyon, França) e redes acadêmicas parceiras para visitas técnicas, pesquisa conjunta e coorientação.",
    institutionWebsite: "https://www.univ-lyon1.fr",
    academicAreas: "Saúde, Engenharia, Tecnologia e Ciências Exatas",
    languages: "Francês e Inglês",
    housingAndCosts: "Etapas remotas + missões presenciais com estimativa de € 900 a € 1.200/mês.",
  },
];
export const opportunities: Opportunity[] = initialOpportunities;
export const driContacts = {
  office: "Diretoria de Relações Internacionais (DRI)",
  university: "Universidade de Fortaleza (Unifor)",
  address: "Av. Washington Soares, 1321 · Edson Queiroz",
  cityStateZip: "Fortaleza / CE · Brasil · CEP 60811-905",
  location: "Reitoria da Unifor, 1º andar",
  hours: "Segunda a sexta-feira, das 08h às 12h e das 13h30 às 18h",
  phones: ["(85) 3477-3834", "(85) 3477-3127"],
  emails: [
    { label: "Atendimento geral e mobilidade de saída", address: "dri@unifor.br" },
    { label: "Estudantes internacionais (Incoming)", address: "international@unifor.br" },
  ],
  sectors: [
    {
      name: "Apoio ao Intercâmbio Discente (Outbound)",
      detail: "Editais, convênios, planos de estudo e manifestações de interesse.",
      contact: "dri@unifor.br · (85) 3477-3834",
    },
    {
      name: "Acolhimento Internacional (Incoming / Arrival)",
      detail: "Orientation, visa guidance, courses in English and arrival in Fortaleza.",
      contact: "international@unifor.br · (85) 3477-3127",
    },
    {
      name: "Escritório EducationUSA Unifor",
      detail: "Orientação sobre estudos e oportunidades acadêmicas nos Estados Unidos.",
      contact: "educationusa@unifor.br · (85) 3477-3481",
    },
    {
      name: "Coordenação de Relações Internacionais (Graduação)",
      detail: "Atendimento acadêmico do curso de graduação em Relações Internacionais.",
      contact: "cursorelacoesinternacionais@unifor.br · (85) 3477-3314 · Bloco Q, Sala 03",
    },
  ],
};
export const arrivalText =
  "A valid student visa is required for enrolment. A passport or tourist visa alone is not sufficient.\n\nPassing a course requires the required grades and at least 75% attendance. This rule is not negotiable.";
export const initialContents: Content[] = [
  "Guia de chegada internacional",
  "Mobilidade acadêmica em Portugal",
  "Orientações de mobilidade docente",
  "Ficha de destino: Portugal",
  "Guia de vida em Fortaleza",
  "Metas institucionais agregadas",
  "FAQ de documentação e visto",
].map((title, i) => ({
  id: `content-${i}`,
  title,
  body:
    i === 0
      ? "Your arrival at Unifor\n\nA practical guide for international students in Fortaleza, Brazil."
      : `${title}\n\nConsulte as orientações da DRI e os canais oficiais antes de planejar sua jornada.`,
  english: i === 0 ? arrivalText : "",
  language: [0, 4, 6].includes(i) ? "PT / EN" : "PT",
  status: i < 2 ? "Aguardando Marketing" : i === 6 ? "Ajustes solicitados" : "Rascunho",
  comment: i === 6 ? "Reforçar o alerta sobre visto de estudante." : "",
}));
export const metrics = [
  { value: 120, label: "Estudantes enviados" },
  { value: 60, label: "Estudantes recebidos" },
  { value: 120, label: "Serviços de tradução" },
  { value: 50, label: "Disciplinas em língua estrangeira" },
  { value: 600, label: "Exames de proficiência" },
  { value: 15, label: "Programas de dupla titulação" },
];
export const quizSteps = [
  {
    name: "Idioma",
    question: "Em qual idioma você quer viver essa experiência?",
    description: "Escolha os idiomas com os quais você se sente mais à vontade.",
    options: ["Português ou espanhol", "Inglês", "Francês", "Alemão"],
  },
  {
    name: "Orçamento",
    question: "Quanto você pretende investir por mês?",
    description:
      "Considere moradia, alimentação e transporte. Não inclua passagens, visto e seguro.",
    options: ["Até € 700", "De € 700 a € 1.000", "Acima de € 1.000", "Ainda estou planejando"],
  },
  {
    name: "Cultura",
    question: "Qual estilo de vida combina com você?",
    description: "Pense nos lugares e experiências que você gostaria de descobrir.",
    options: ["Cultura urbana", "Patrimônio histórico", "Vida praiana", "Ambiente cosmopolita"],
  },
  {
    name: "Objetivo",
    question: "O que você quer viver nessa jornada?",
    description: "Escolha seu principal objetivo para esta experiência internacional.",
    options: [
      "Experiência acadêmica",
      "Pesquisa e cooperação",
      "Vivência cultural",
      "Aperfeiçoamento de idioma",
    ],
  },
];
export const destinations = [
  {
    city: "Porto",
    country: "Portugal",
    language: "Português",
    cost: "€ 750–1.000",
    culture: "Vida universitária e patrimônio cultural",
    positive: "Familiaridade com o idioma português",
    attention: "Alta procura por moradia",
  },
  {
    city: "Valência",
    country: "Espanha",
    language: "Espanhol",
    cost: "€ 800–1.100",
    culture: "Vida urbana e cultura mediterrânea",
    positive: "Experiência em espanhol e mobilidade urbana",
    attention: "Exigências de idioma e variação de custos",
  },
  {
    city: "Lyon",
    country: "França",
    language: "Francês",
    cost: "€ 900–1.200",
    culture: "Patrimônio histórico e pesquisa",
    positive: "Redes de pesquisa e intercâmbio cultural",
    attention: "Proficiência e custos de moradia",
  },
  {
    city: "Berlim",
    country: "Alemanha",
    language: "Alemão / Inglês",
    cost: "€ 1.000–1.400",
    culture: "Ambiente cosmopolita",
    positive: "Diversidade e cooperação acadêmica",
    attention: "Planejamento financeiro e visto",
  },
];
export const MIN_ATTENDANCE = 75;
export const studentChecklistItems = [
  "Ler o edital oficial",
  "Confirmar proficiência",
  "Solicitar carta de aceite",
  "Verificar visto e seguro",
  "Planejar moradia",
  "Revisar prazos consulares",
] as const;
export function canPublish(status: ContentStatus, checks: boolean[]) {
  return status === "Aguardando Marketing" && checks.length === 7 && checks.every(Boolean);
}
export function eligibility(enrollment: string, pmg: number, proficiency: string) {
  if (!Number.isFinite(pmg) || pmg < 0 || pmg > 10) return "Informe um PMG válido entre 0 e 10.";
  if (enrollment !== "Regularmente matriculado" || !["B2", "C1", "C2"].includes(proficiency))
    return "Atenção aos requisitos: confira matrícula e proficiência com a DRI. B2 é a referência ilustrativa desta simulação.";
  return "Perfil preliminar compatível com matrícula e proficiência. A avaliação do PMG depende da nota mínima do edital, ainda sujeita à validação da DRI.";
}
export function recommend(answers: string[]) {
  const [language, budget, culture, objective] = answers;
  const scores = destinations.map((d, i) => {
    let score = 0;
    if (language === "Português ou espanhol" && i < 2) score += 12;
    if (language === "Francês" && i === 2) score += 15;
    if ((language === "Alemão" || language === "Inglês") && i === 3) score += 15;
    if (budget === "Até € 700") score += [6, 3, 1, 0][i] ?? 0;
    if (budget === "De € 700 a € 1.000") score += [4, 4, 2, 0][i] ?? 0;
    if (budget === "Acima de € 1.000" && i === 3) score += 2;
    if (culture === "Vida praiana" && i === 1) score += 5;
    if (culture === "Patrimônio histórico" && (i === 0 || i === 2)) score += 4;
    if (culture === "Ambiente cosmopolita" && i === 3) score += 4;
    if (culture === "Cultura urbana" && (i === 0 || i === 1)) score += 2;
    if (objective === "Pesquisa e cooperação" && (i === 2 || i === 3)) score += 5;
    if (objective === "Experiência acadêmica" && (i === 0 || i === 1)) score += 2;
    if (objective === "Vivência cultural" && (i === 1 || i === 2)) score += 3;
    if (objective === "Aperfeiçoamento de idioma" && i !== 0) score += 2;
    return { index: i, score };
  });
  return scores
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 2)
    .map((s) => s.index);
}

export interface SimulatorProfile {
  degree: "Graduação" | "Pós-graduação" | "Docente";
  enrollment: "Regularmente matriculado" | "Trancado";
  course: string;
  semester: number;
  pmg: number;
  english: CefrLevel;
  spanish: CefrLevel;
  otherLanguage: "Nenhum" | "Francês (B1+)" | "Alemão (B2+)";
  hasPassport: boolean;
}

export interface SimulatorMatch {
  institution: PartnerInstitution;
  matchedReasons: string[];
  cautions: string[];
}

export interface EligibilityEvaluation {
  status: "compatible" | "attention";
  headline: string;
  summary: string;
  advisories: string[];
  matches: SimulatorMatch[];
}

export const defaultSimulatorProfile: SimulatorProfile = {
  degree: "Graduação",
  enrollment: "Regularmente matriculado",
  course: uniforCourses[0],
  semester: 5,
  pmg: 8.0,
  english: "B2",
  spanish: "Nenhum",
  otherLanguage: "Nenhum",
  hasPassport: true,
};

const cefrOrder: Record<CefrLevel, number> = {
  Nenhum: 0,
  B1: 1,
  B2: 2,
  C1: 3,
  C2: 4,
};

export function evaluateEligibility(
  profile: SimulatorProfile,
  institutions: PartnerInstitution[] = partnerInstitutions,
): EligibilityEvaluation {
  if (!Number.isFinite(profile.pmg) || profile.pmg < 0 || profile.pmg > 10) {
    return {
      status: "attention",
      headline: "Informe um PMG válido entre 0 e 10.",
      summary: "Corrija o valor de PMG autodeclarado para simular a compatibilidade.",
      advisories: [
        "A nota mínima de PMG varia conforme cada edital e depende de validação oficial da DRI.",
      ],
      matches: [],
    };
  }

  const advisories: string[] = [
    `PMG informado (${profile.pmg.toFixed(1)} / 10): a nota mínima varia conforme cada edital e depende de validação oficial da DRI.`,
  ];

  if (profile.degree === "Graduação") {
    if (profile.semester < 3) {
      advisories.push(
        `No ${profile.semester}º semestre, editais presenciais costumam exigir integralização mínima; considere trilhas virtuais ou planeje para a partir do 3º semestre.`,
      );
    } else if (profile.semester >= 9) {
      advisories.push(
        `No ${profile.semester}º semestre, confirme com a coordenação do curso o impacto da mobilidade na colação de grau e no aproveitamento de créditos.`,
      );
    } else {
      advisories.push(
        `Semestre em curso (${profile.semester}º) em faixa usual para planejamento; valide pré-requisitos no plano de estudos com a coordenação.`,
      );
    }
  } else if (profile.degree === "Pós-graduação") {
    advisories.push(
      "Para pós-graduação, confirme plano de pesquisa, coorientação ou créditos compatíveis com o programa stricto/lato sensu.",
    );
  } else {
    advisories.push(
      "Para atuação docente, alinhe carta-convite da instituição anfitriã, plano de trabalho e cronograma institucional com a DRI.",
    );
  }

  if (!profile.hasPassport) {
    advisories.push(
      "Sem passaporte válido ou protocolo ativo, inicie a emissão quanto antes: passaporte não substitui visto de estudante e prazos consulares exigem antecedência antes da compra de passagens.",
    );
  } else {
    advisories.push(
      "Lembrete consular: passaporte válido não substitui o visto de estudo exigido pelos países de destino antes do embarque.",
    );
  }

  advisories.push(
    `Regra acadêmica: a frequência mínima obrigatória nas disciplinas é de ${MIN_ATTENDANCE}%, sem possibilidade de flexibilização.`,
  );

  if (profile.enrollment !== "Regularmente matriculado") {
    return {
      status: "attention",
      headline: "Atenção aos requisitos: regularize sua matrícula antes de candidatar-se.",
      summary:
        "Programas de mobilidade internacional exigem vínculo ativo com a Unifor durante todo o processo.",
      advisories,
      matches: [],
    };
  }

  const matches: SimulatorMatch[] = [];

  for (const inst of institutions) {
    if (profile.degree === "Graduação" && inst.audience === "Docente") {
      continue;
    }
    if (!inst.acceptedCourses.includes(profile.course)) {
      continue;
    }

    const matchedLangs: string[] = [];
    for (const req of inst.acceptedLanguages) {
      if (req.lang === "Português") {
        matchedLangs.push("Português");
      } else if (req.lang === "Inglês" && cefrOrder[profile.english] >= cefrOrder[req.minCefr]) {
        matchedLangs.push(`Inglês (${profile.english})`);
      } else if (req.lang === "Espanhol" && cefrOrder[profile.spanish] >= cefrOrder[req.minCefr]) {
        matchedLangs.push(`Espanhol (${profile.spanish})`);
      } else if (req.lang === "Francês" && profile.otherLanguage === "Francês (B1+)") {
        matchedLangs.push("Francês (B1+)");
      } else if (req.lang === "Alemão" && profile.otherLanguage === "Alemão (B2+)") {
        matchedLangs.push("Alemão (B2+)");
      }
    }

    if (matchedLangs.length === 0) {
      continue;
    }

    const matchedReasons = [
      `Área compatível (${profile.course})`,
      `Idioma atendido: ${matchedLangs.join(" / ")}`,
      inst.opportunityId
        ? "Possui edital demonstrativo vinculado no portal"
        : `Convênio ativo · Modalidade ${inst.mode.toLowerCase()}`,
    ];

    const cautions: string[] = [inst.attentionNote];
    if (inst.audience === "Docente" && profile.degree === "Pós-graduação") {
      cautions.push(
        "Convênio focado em pesquisa e missões docentes; confirme possibilidade de cotutela.",
      );
    }
    if (inst.mode !== "Virtual" && !profile.hasPassport) {
      cautions.push("Mobilidade presencial requer passaporte válido e visto de estudante prévios.");
    }
    if (inst.mode !== "Virtual" && profile.degree === "Graduação" && profile.semester < 3) {
      cautions.push(
        "Verifique se o edital exige integralização mínima de créditos antes do embarque.",
      );
    }

    matches.push({ institution: inst, matchedReasons, cautions });
  }

  matches.sort(
    (a, b) =>
      Number(Boolean(b.institution.opportunityId)) - Number(Boolean(a.institution.opportunityId)),
  );

  if (matches.length === 0) {
    return {
      status: "attention",
      headline:
        "Nenhuma instituição desta amostra combina simultaneamente com o curso e os idiomas informados.",
      summary:
        "Amplie seu nível de idioma na simulação ou consulte a aba de Instituições conveniadas e a DRI para verificar novas chamadas.",
      advisories,
      matches: [],
    };
  }

  const hasTimingOrDocAttention =
    !profile.hasPassport || (profile.degree === "Graduação" && profile.semester < 3);

  return {
    status: hasTimingOrDocAttention ? "attention" : "compatible",
    headline: hasTimingOrDocAttention
      ? `${matches.length} ${matches.length === 1 ? "instituição compatível" : "instituições compatíveis"} por curso e idioma, com pontos de atenção para planejar.`
      : `Perfil preliminar compatível com ${matches.length} ${matches.length === 1 ? "instituição conveniada" : "instituições conveniadas"}.`,
    summary:
      "Esta triagem cruza área acadêmica, vínculo e idiomas autodeclarados. Critérios financeiros, nota de corte e documentação dependem de cada edital e da conferência pela DRI.",
    advisories,
    matches,
  };
}

export function nextInterestStatus(status: InterestStatus): InterestStatus {
  if (status === "Recebida") return "Em orientação";
  if (status === "Em orientação") return "Concluída";
  return "Recebida";
}

export function approvePendingContent(
  contents: Content[],
  checks: boolean[],
): { contents: Content[]; approvedTitle?: string } {
  const target = contents.find((c) => c.status === "Aguardando Marketing");
  if (!target || !canPublish(target.status, checks)) {
    return { contents };
  }
  return {
    approvedTitle: target.title,
    contents: contents.map((c) =>
      c.id === target.id ? { ...c, status: "Publicado" as const, comment: "" } : c,
    ),
  };
}

export const opportunityStatusCycle = ["Inscrições abertas", "Em breve", "Encerrado"] as const;

export function cycleOpportunityStatus(status: string): string {
  const idx = opportunityStatusCycle.indexOf(status as (typeof opportunityStatusCycle)[number]);
  if (idx === -1) return opportunityStatusCycle[0];
  return (
    opportunityStatusCycle[(idx + 1) % opportunityStatusCycle.length] ?? opportunityStatusCycle[0]
  );
}

export interface NewOpportunityInput {
  title: string;
  institutionId: string;
  customInstitution?: string;
  country: string;
  city: string;
  audience: string;
  mode: string;
  status: string;
  date?: string;
  summary?: string;
  languages?: string;
  academicAreas?: string;
}

function slugifyId(text: string): string {
  const clean = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 36);
  return clean || "oportunidade";
}

export function createOpportunityFromInput(
  input: NewOpportunityInput,
  existingIds: string[],
): Opportunity {
  const partner = partnerInstitutions.find((p) => p.id === input.institutionId);
  const title = input.title.trim() || "Nova oportunidade internacional";
  const institutionName =
    partner?.name || input.customInstitution?.trim() || "Instituição conveniada DRI";
  const country = (input.country.trim() || partner?.country || "Portugal").trim();
  const city = (input.city.trim() || partner?.city || "Porto").trim();
  const audience = input.audience || partner?.audience || "Estudante Unifor";
  const mode = input.mode || partner?.mode || "Presencial";
  const status = input.status || "Inscrições abertas";
  const date = input.date?.trim() || "";
  const languages = input.languages?.trim() || partner?.languages || "Inglês e idioma local";
  const academicAreas =
    input.academicAreas?.trim() || partner?.areas || "Todas as áreas compatíveis";

  const baseId = slugifyId(title);
  let uniqueId = baseId;
  let suffix = 2;
  while (existingIds.includes(uniqueId)) {
    uniqueId = `${baseId}-${suffix}`;
    suffix += 1;
  }

  return {
    id: uniqueId,
    tag: `${audience.toUpperCase()} · TESTE DEV`,
    title,
    description: `${audience} · ${institutionName} · ${country} · ${mode}`,
    country,
    city,
    audience,
    mode,
    status,
    deadline: date ? `Até ${date} · Prazo ilustrativo` : "Consulte as condições da chamada",
    date,
    institution: institutionName,
    institutionId: partner?.id || "",
    agreementType: partner?.agreementType || "Convênio acadêmico internacional · Teste Dev",
    institutionSummary:
      input.summary?.trim() ||
      partner?.summary ||
      `Chamada demonstrativa vinculada a ${institutionName} (${city}, ${country}).`,
    institutionWebsite: partner?.website || "https://unifor.br/dri/inicial",
    academicAreas,
    languages,
    housingAndCosts:
      partner?.housingNote ||
      "Consulte as condições de hospedagem, seguro e manutenção no edital oficial.",
  };
}

export const presetOpportunityTemplates: NewOpportunityInput[] = [
  {
    title: "Semestre acadêmico em Berlim",
    institutionId: "fuberlin",
    country: "Alemanha",
    city: "Berlim",
    audience: "Estudante Unifor",
    mode: "Presencial",
    status: "Inscrições abertas",
    date: "2026-12-15",
    summary:
      "Intercâmbio semestral na Freie Universität Berlin com disciplinas em inglês e alemão nas áreas de Humanidades, Direito e Relações Internacionais.",
  },
  {
    title: "Missão de Inovação em Orlando",
    institutionId: "ucf",
    country: "EUA",
    city: "Orlando",
    audience: "Estudante Unifor",
    mode: "Presencial",
    status: "Inscrições abertas",
    date: "2027-01-20",
    summary:
      "Imersão acadêmica na University of Central Florida (UCF) voltada a tecnologia, engenharia, inteligência artificial e negócios.",
  },
  {
    title: "Intercâmbio em Valência",
    institutionId: "valencia",
    country: "Espanha",
    city: "Valência",
    audience: "Estudante Unifor",
    mode: "Presencial",
    status: "Em breve",
    date: "2027-02-10",
    summary:
      "Mobilidade bilateral na Universitat de València com oferta semestral em espanhol e disciplinas selecionadas em inglês.",
  },
  {
    title: "Chamada encerrada (teste de filtro)",
    institutionId: "uporto",
    country: "Portugal",
    city: "Porto",
    audience: "Estudante Estrangeiro",
    mode: "Híbrida",
    status: "Encerrado",
    date: "2025-10-01",
    summary:
      "Registro demonstrativo com situação Encerrado para validar filtros por situação, público e prazo limite no catálogo.",
  },
];

export interface DevCheckResult {
  id: string;
  category: string;
  name: string;
  passed: boolean;
  detail: string;
}

export function runDevDiagnosticSuite(
  state: {
    contents: Content[];
    interests: Interest[];
    opportunities: Opportunity[];
    answers: string[];
    selected: string[];
    checklist: string[];
    metrics: Array<{ value: number; label: string }>;
    simulatorProfile?: SimulatorProfile;
  },
  env?: {
    storageOk?: boolean;
    hasMainLandmark?: boolean;
    fontScale?: string;
    highContrast?: boolean;
  },
): DevCheckResult[] {
  const results: DevCheckResult[] = [];

  const draftBlocked = !canPublish("Rascunho", Array(7).fill(true));
  const partialBlocked = !canPublish("Aguardando Marketing", [
    true,
    true,
    true,
    true,
    true,
    true,
    false,
  ]);
  const fullAllowed = canPublish("Aguardando Marketing", Array(7).fill(true));
  results.push({
    id: "rn01-guard",
    category: "Governança",
    name: "RN01 · Bloqueio sem 7 critérios do Marketing",
    passed: draftBlocked && partialBlocked && fullAllowed,
    detail:
      draftBlocked && partialBlocked && fullAllowed
        ? "Rascunhos e aprovações parciais (6/7) bloqueados; publicação exige 7/7."
        : "Falha na validação de transição editorial.",
  });

  const serialized = JSON.stringify(state).toLowerCase();
  const forbiddenPattern = /"(cpf|rg|matricula|senha|password|email_pessoal)"\s*:/;
  const piiFree = !forbiddenPattern.test(serialized);
  results.push({
    id: "rn02-privacy",
    category: "Privacidade",
    name: "RN02 · Ausência de dados pessoais no estado local",
    passed: piiFree,
    detail: piiFree
      ? "Nenhuma chave sensível de identificação pessoal detectada em pumi-demo-v1."
      : "Chave pessoal detectada no armazenamento local.",
  });

  const attendanceOk = MIN_ATTENDANCE === 75 && arrivalText.includes("75%");
  results.push({
    id: "rn03-attendance",
    category: "Regras",
    name: "RN03 · Frequência mínima obrigatória (75%)",
    passed: attendanceOk,
    detail: attendanceOk
      ? "Constante MIN_ATTENDANCE=75 e texto em inglês do Arrival Guide alinhados."
      : "Divergência na regra de frequência mínima.",
  });

  const noPassportEval = evaluateEligibility({
    ...defaultSimulatorProfile,
    hasPassport: false,
  });
  const visaOk =
    noPassportEval.status === "attention" &&
    noPassportEval.advisories.join(" ").includes("passaporte não substitui visto de estudante");
  results.push({
    id: "rn05-visa",
    category: "Consular",
    name: "RN05 · Alerta de visto de estudante sem passaporte",
    passed: visaOk,
    detail: visaOk
      ? "Simulador sinaliza status de atenção e alerta consular obrigatório."
      : "Alerta de visto não acionado corretamente.",
  });

  const pmgLegacy = eligibility("Regularmente matriculado", 5.5, "B2");
  const pmgSim = evaluateEligibility({ ...defaultSimulatorProfile, pmg: 5.5 });
  const noThresholdInvented =
    pmgLegacy.includes("depende da nota mínima do edital") &&
    pmgSim.matches.length > 0 &&
    pmgSim.advisories.join(" ").includes("nota mínima varia conforme cada edital");
  results.push({
    id: "rn06-pmg",
    category: "Regras",
    name: "RN06 · Sem nota de corte inventada para PMG",
    passed: noThresholdInvented,
    detail: noThresholdInvented
      ? "Verificador e simulador delegam a nota mínima ao edital e validação da DRI."
      : "Regra de PMG divergiu do esperado.",
  });

  const gradHealth = evaluateEligibility({
    ...defaultSimulatorProfile,
    degree: "Graduação",
    course: "Ciências da Saúde (Medicina, Nutrição, Fisioterapia, Enfermagem)",
    otherLanguage: "Francês (B1+)",
  });
  const facultyHealth = evaluateEligibility({
    ...defaultSimulatorProfile,
    degree: "Docente",
    course: "Ciências da Saúde (Medicina, Nutrição, Fisioterapia, Enfermagem)",
    otherLanguage: "Francês (B1+)",
  });
  const suspended = evaluateEligibility({
    ...defaultSimulatorProfile,
    enrollment: "Trancado",
  });
  const simMatrixOk =
    !gradHealth.matches.some((m) => m.institution.id === "lyon1") &&
    facultyHealth.matches.some((m) => m.institution.id === "lyon1") &&
    suspended.matches.length === 0;
  results.push({
    id: "sim-matrix",
    category: "Simulador",
    name: "Elegibilidade · Cruzamento público/curso/matrícula",
    passed: simMatrixOk,
    detail: simMatrixOk
      ? "Filtros de graduação vs docente e bloqueio por matrícula trancada validados."
      : "Divergência na matriz de elegibilidade.",
  });

  const recFr = recommend(["Francês"]);
  const recPt = recommend(["Português ou espanhol"]);
  const quizOk = recFr[0] === 2 && recPt[0] === 0;
  results.push({
    id: "quiz-rec",
    category: "Quiz",
    name: "Recomendador de destinos e comparador",
    passed: quizOk,
    detail: quizOk
      ? "Preferências de idioma mapeadas corretamente para Lyon e Porto."
      : "Resultado inesperado no recomendador.",
  });

  const ids = state.opportunities.map((o) => o.id);
  const uniqueIds = new Set(ids).size === ids.length;
  const fieldsOk = state.opportunities.every((o) =>
    Boolean(o.id && o.title && o.institution && o.country),
  );
  results.push({
    id: "catalog-opps",
    category: "Catálogo",
    name: "Oportunidades dinâmicas e integridade de IDs",
    passed: uniqueIds && fieldsOk,
    detail:
      uniqueIds && fieldsOk
        ? `${state.opportunities.length} oportunidade(s) válida(s) e pronta(s) na guia Oportunidades.`
        : "Existem IDs duplicados ou campos obrigatórios vazios.",
  });

  const metricsOk =
    state.metrics.length === 6 && state.metrics.every((m) => Number.isFinite(m.value));
  results.push({
    id: "metrics-agg",
    category: "Indicadores",
    name: "Indicadores agregados (6 métricas 2026)",
    passed: metricsOk,
    detail: metricsOk
      ? "Todas as 6 métricas institucionais estão íntegras e numéricas."
      : "Estrutura de métricas incompleta.",
  });

  const domOk = (env?.storageOk ?? true) && (env?.hasMainLandmark ?? true);
  results.push({
    id: "ui-env",
    category: "Ambiente",
    name: "Persistência localStorage e landmark principal",
    passed: domOk,
    detail: `Storage: ${env?.storageOk === false ? "indisponível" : "ativo"} · Fonte: ${env?.fontScale ?? "0"} · Contraste: ${env?.highContrast ? "alto" : "padrão"}.`,
  });

  return results;
}
