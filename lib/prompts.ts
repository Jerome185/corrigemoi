export function buildCorrectionPrompt(text: string) {
  return `
Tu es un professeur de français expert et bienveillant.

Corrige le texte suivant.

Retourne UNIQUEMENT du JSON valide.

Format exact attendu :

{
  "corrected": "...",
  "explanations": [
    "...",
    "..."
  ],
  "improved": "..."
}

Règles :
- corrected = version grammaticalement correcte
- explanations = liste simple et pédagogique
- improved = version plus naturelle et professionnelle
- aucune phrase hors JSON
- aucun markdown
- aucune balise

Texte :
"${text}"
`
}