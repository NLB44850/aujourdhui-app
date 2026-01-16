// État de l'application
let state = {
  weather: null,
  weatherCode: "ensoleille",
  answers: {
    energy: null,
    duration: null,
    location: null,
  },
  activities: [],
  selectedActivities: [],
};

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  init();
});

async function init() {
  console.log("🚀 Initialisation de l'app...");
  
  // Charger les activités
  await loadActivities();

  // Récupérer la météo
  await fetchWeather();

  // Afficher un message aléatoire
  randomizeMessage("introMessage", MESSAGES.intro);

  // Setup des event listeners
  setupEventListeners();

  // Afficher l'écran principal après chargement
  setTimeout(() => {
    showScreen("questionScreen");
  }, 1500);
}

// Charger les activités depuis le JSON
async function loadActivities() {
  try {
    const response = await fetch("./activities.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    state.activities = data.activities;
    console.log(`✅ ${state.activities.length} activités chargées`);
  } catch (error) {
    console.error("❌ Erreur chargement activités:", error);
    // Fallback avec quelques activités si le JSON ne charge pas
    state.activities = getFallbackActivities();
    console.log("📦 Utilisation des activités de fallback");
  }
}

// Activités de secours si le JSON ne charge pas
function getFallbackActivities() {
  return [
    {
      id: "lecture",
      title: "Temps lecture ensemble",
      description: "Un livre, un câlin, ta voix",
      duration: ["30min"],
      energy: ["basse"],
      location: "interieur",
      weather: ["all"],
      safe: true,
      materials: "Quelques livres"
    },
    {
      id: "pate",
      title: "Pâte à modeler",
      description: "Malaxer, rouler, créer",
      duration: ["30min", "1h"],
      energy: ["basse", "moyenne"],
      location: "interieur",
      weather: ["all"],
      safe: true,
      materials: "Pâte à modeler"
    },
    {
      id: "promenade",
      title: "Balade dans le quartier",
      description: "Juste marcher, observer, discuter",
      duration: ["30min", "1h"],
      energy: ["basse", "moyenne"],
      location: "exterieur",
      weather: ["ensoleille", "nuageux"],
      safe: true,
      materials: "Poussette ou chaussures"
    }
  ];
}

// Récupérer la météo
async function fetchWeather() {
  try {
    const response = await fetch("https://wttr.in/?format=j1", {
      signal: AbortSignal.timeout(5000)
    });
    const data = await response.json();

    const currentCondition = data.current_condition[0];
    const temp = Math.round(currentCondition.temp_C);
    const weatherCode = currentCondition.weatherCode;

    state.weather = {
      temp,
      code: weatherCode,
    };

    state.weatherCode = getWeatherType(weatherCode);
    updateWeatherUI(temp, state.weatherCode);
    console.log(`🌤️ Météo: ${state.weatherCode}, ${temp}°C`);
  } catch (error) {
    console.error("⚠️ Erreur météo:", error);
    state.weatherCode = "nuageux";
    updateWeatherUI(15, "nuageux");
  }
}

// Convertir le code météo en type
function getWeatherType(code) {
  const weatherCode = parseInt(code);

  if (weatherCode === 113) return "ensoleille";
  if ([116, 119, 122].includes(weatherCode)) return "nuageux";
  if ([176, 185, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314,
       317, 320, 353, 356, 359, 362, 365].includes(weatherCode)) return "pluie";
  if ([179, 182, 227, 230, 323, 326, 329, 332, 335, 338, 350, 368, 371, 374, 
       377, 392, 395].includes(weatherCode)) return "neige";

  return "nuageux";
}

// Mettre à jour l'UI météo
function updateWeatherUI(temp, weatherType) {
  const emoji = getWeatherEmoji(weatherType);

  document.getElementById("weatherEmoji").textContent = emoji;
  document.getElementById("weatherTemp").textContent = `${temp}°C`;
  document.getElementById("weatherEmojiResults").textContent = emoji;
  document.getElementById("weatherTempResults").textContent = `${temp}°C`;
}

// Obtenir l'emoji météo
function getWeatherEmoji(weatherType) {
  const emojis = {
    ensoleille: "☀️",
    nuageux: "⛅",
    pluie: "🌧️",
    neige: "❄️",
  };
  return emojis[weatherType] || "🌤️";
}

// Setup des event listeners
function setupEventListeners() {
  const optionBtns = document.querySelectorAll(".option-btn");
  optionBtns.forEach((btn) => {
    btn.addEventListener("click", handleOptionClick);
  });

  document.getElementById("getActivitiesBtn").addEventListener("click", handleGetActivities);
  document.getElementById("backBtn").addEventListener("click", () => showScreen("questionScreen"));
  document.getElementById("tryAgainBtn").addEventListener("click", handleTryAgain);
}

// Gérer le clic sur une option
function handleOptionClick(e) {
  const btn = e.currentTarget;
  const question = btn.dataset.question;
  const value = btn.dataset.value;

  const siblings = document.querySelectorAll(`.option-btn[data-question="${question}"]`);
  siblings.forEach((sibling) => sibling.classList.remove("selected"));

  btn.classList.add("selected");
  state.answers[question] = value;

  console.log(`📝 ${question}: ${value}`);
  checkAllAnswered();
}

// Vérifier si toutes les questions ont une réponse
function checkAllAnswered() {
  const allAnswered = state.answers.energy && state.answers.duration && state.answers.location;

  const btn = document.getElementById("getActivitiesBtn");
  if (allAnswered) {
    btn.disabled = false;
    btn.classList.remove("disabled");
  } else {
    btn.disabled = true;
    btn.classList.add("disabled");
  }
}

// Gérer le clic sur "Voir les idées"
function handleGetActivities() {
  console.log("🔍 Recherche d'activités...");
  console.log("Critères:", state.answers);
  selectActivities();
  showActivities();
  showScreen("activitiesScreen");
}

// Sélectionner les activités (LOGIQUE SIMPLIFIÉE ET CORRIGÉE)
function selectActivities() {
  const { energy, duration, location } = state.answers;
  const { weatherCode } = state;

  console.log(`🎯 Filtrage: énergie=${energy}, durée=${duration}, lieu=${location}, météo=${weatherCode}`);

  // Étape 1: Filtrage strict
  let filtered = state.activities.filter((activity) => {
    // Vérifier l'énergie
    if (!activity.energy.includes(energy)) {
      return false;
    }

    // Vérifier la durée
    if (!activity.duration.includes(duration)) {
      return false;
    }

    // Vérifier le lieu
    if (location !== "peu-importe") {
      if (location === "interieur") {
        if (activity.location !== "interieur" && activity.location !== "both") {
          return false;
        }
      } else if (location === "exterieur") {
        if (activity.location !== "exterieur" && activity.location !== "both") {
          return false;
        }
      }
    }

    // Vérifier la météo pour les activités extérieures
    if (activity.location === "exterieur" || 
        (activity.location === "both" && location === "exterieur")) {
      if (!activity.weather.includes("all") && !activity.weather.includes(weatherCode)) {
        return false;
      }
    }

    return true;
  });

  console.log(`✅ ${filtered.length} activités après filtrage strict`);

  // Étape 2: Si pas assez, assouplir les critères
  if (filtered.length < 3) {
    console.log("⚠️ Pas assez d'activités, assouplissement des critères...");
    filtered = state.activities.filter((activity) => {
      return activity.energy.includes(energy) && activity.duration.includes(duration);
    });
    console.log(`✅ ${filtered.length} activités après assouplissement`);
  }

  // Étape 3: Dernier recours
  if (filtered.length === 0) {
    console.log("❌ Aucune activité trouvée, utilisation de toutes les activités");
    filtered = state.activities;
  }

  // Étape 4: Séparer safe et non-safe
  const safeActivities = filtered.filter((a) => a.safe);
  const otherActivities = filtered.filter((a) => !a.safe);

  console.log(`🛡️ ${safeActivities.length} activités safe, ${otherActivities.length} autres`);

  // Étape 5: Sélectionner 3 activités avec au moins 1 safe
  let selected = [];

  if (safeActivities.length > 0) {
    selected.push(safeActivities[Math.floor(Math.random() * safeActivities.length)]);
  }

  const remaining = [...safeActivities, ...otherActivities].filter(
    (a) => !selected.includes(a)
  );

  while (selected.length < 3 && remaining.length > 0) {
    const randomIndex = Math.floor(Math.random() * remaining.length);
    selected.push(remaining[randomIndex]);
    remaining.splice(randomIndex, 1);
  }

  selected = shuffleArray(selected);
  state.selectedActivities = selected;

  console.log(`🎉 ${selected.length} activités sélectionnées:`, selected.map(a => a.title));
}

// Mélanger un tableau
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Afficher les activités
function showActivities() {
  const container = document.getElementById("activitiesContainer");
  container.innerHTML = "";

  randomizeMessage("resultsIntro", MESSAGES.results);

  const footerMessage = document.querySelector(".footer-message");
  if (footerMessage) {
    footerMessage.textContent = MESSAGES.footer[Math.floor(Math.random() * MESSAGES.footer.length)];
  }

  if (state.selectedActivities.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <div class="emoji">😅</div>
        <p>${MESSAGES.noResults[0]}</p>
      </div>
    `;
    return;
  }

  state.selectedActivities.forEach((activity) => {
    const card = createActivityCard(activity);
    container.appendChild(card);
  });
}

// Créer une carte d'activité
function createActivityCard(activity) {
  const card = document.createElement("div");
  card.className = "activity-card";

  const safeBadge = activity.safe
    ? `<div class="safe-badge">${SAFE_BADGE.emoji} ${SAFE_BADGE.text}</div>`
    : "";

  card.innerHTML = `
    ${safeBadge}
    <h3 class="activity-title">${activity.title}</h3>
    <p class="activity-description">${activity.description}</p>
    <div class="activity-meta">
      <span class="meta-item">📦 ${activity.materials}</span>
    </div>
  `;

  return card;
}

// Gérer "Proposer autre chose"
function handleTryAgain() {
  selectActivities();
  showActivities();
}

// Afficher un écran
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");
  console.log(`📺 Affichage écran: ${screenId}`);
}

// Message aléatoire
function randomizeMessage(elementId, messages) {
  const element = document.getElementById(elementId);
  if (element && messages && messages.length > 0) {
    element.textContent = messages[Math.floor(Math.random() * messages.length)];
  }
}

// Enregistrer le Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("✅ Service Worker enregistré:", registration);
      })
      .catch((error) => {
        console.log("❌ Erreur Service Worker:", error);
      });
  });
}
