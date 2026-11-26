import { createFileRoute } from "@tanstack/react-router";
import { Outbound } from "@/components/pumi/guides";
export const Route = createFileRoute("/guias")({
  head: () => ({
    meta: [
      { title: "DRI Unifor | Guias de mobilidade (Saída e Entrada)" },
      {
        name: "description",
        content:
          "Guias de mobilidade de saída para alunos e docentes da Unifor e de entrada para estudantes estrangeiros.",
      },
      { property: "og:title", content: "DRI Unifor | Guias de mobilidade (Saída e Entrada)" },
      {
        property: "og:description",
        content:
          "Guias de mobilidade de saída para alunos e docentes da Unifor e de entrada para estudantes estrangeiros.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Outbound,
});
