export function buildCorrectionPrompt(
  text: string,
  mode: string
) {

  let instruction = ""

  switch (mode) {

    case "whatsapp":
      instruction = `
Améliore ce message WhatsApp pour qu'il soit naturel,
fluide et sympathique.
`
      break

    case "email_pro":
      instruction = `
Transforme ce texte en email professionnel clair,
élégant et professionnel.
`
      break

    case "francais_naturel":
      instruction = `
Réécris ce texte dans un français naturel,
moderne et impeccable.
`
      break

    default:
      instruction = `
Corrige ce texte en français impeccable.
`
  }

  return `
${instruction}

Réponds UNIQUEMENT au format JSON suivant :

{
  "corrected": "texte corrigé",
  "explanations": [
    "explication 1",
    "explication 2"
  ],
  "improved": "version améliorée"
}

Texte :
"${text}"
`
}