// Messages empathiques et rassurants
const MESSAGES = {
  intro: [
    "Tu as du temps avec les petits ? Je t'aide à choisir une activité.",
    "Besoin d'une idée pour les enfants ? Je m'en occupe.",
    "Je te trouve une activité adaptée à maintenant.",
  ],

  loading: [
    "Je regarde la météo...",
    "Je prépare quelques idées...",
    "Un instant, je réfléchis...",
  ],

  results: [
    "Voilà 3 idées pour toi :",
    "J'ai pensé à ça :",
    "Que dirais-tu de ça ?",
  ],

  noResults: [
    "Hmm, je n'ai pas trouvé d'activité parfaite. Essaie de changer un critère ?",
    "Rien de super adapté pour l'instant. On essaie avec d'autres choix ?",
  ],

  reassurance: [
    "Pas d'inquiétude, je te propose juste 3 idées simples.",
    "Aucune pression. Juste quelques suggestions.",
    "Tu choisis ce qui te parle. Ou pas.",
  ],

  footer: [
    "Tu fais de ton mieux. C'est déjà beaucoup. 💚",
    "Chaque moment compte, même imparfait. 💚",
    "Pas besoin d'être parfait·e. Tu es là. 💚",
    "L'important c'est d'être ensemble. 💚",
  ],

  weatherDescriptions: {
    ensoleille: "Beau temps",
    nuageux: "Nuageux",
    pluie: "Pluvieux",
    neige: "Neige",
  },
};

// Badge "safe" pour l'option safe
const SAFE_BADGE = {
  text: "Option calme",
  emoji: "✨",
};

// Export pour utilisation dans app.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = { MESSAGES, SAFE_BADGE };
}
