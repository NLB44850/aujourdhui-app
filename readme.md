# 🌤️ Aujourd'hui - Application d'activités pour parents

Une Progressive Web App (PWA) minimaliste pour aider les parents d'enfants de 1 à 5 ans à choisir des activités adaptées à leur situation.

## ✨ Concept

**Le problème** : En tant que parent, on fait face à une fatigue décisionnelle constante. Même choisir une activité simple peut devenir difficile quand on est fatigué.

**La solution** : Une app qui décide **à ta place**, en te proposant **3 idées maximum** d'activités adaptées à :
- Ta météo du moment
- Ton niveau d'énergie
- Le temps disponible
- Tes préférences (intérieur/extérieur)

## 🎯 Caractéristiques

- 🌤️ **Météo automatique** - Récupère ta météo locale sans rien demander
- 💭 **3 questions simples** - Énergie, durée, lieu
- 🎴 **Maximum 3 cartes** - Pas de scroll infini, pas de choix paralysant
- ✨ **Une option calme toujours proposée** - Pour les moments de fatigue
- 💚 **Ton empathique** - Messages rassurants, non culpabilisants
- 📱 **Mobile-first** - Conçu pour être utilisé sur téléphone
- 🔒 **Zéro compte utilisateur** - Aucune inscription requise
- 📴 **Fonctionne hors ligne** - PWA avec service worker

## 🚀 Démarrage rapide

### Installation locale

```bash
# Cloner le projet
git clone https://github.com/NLB44850/aujourdhui-app.git
cd aujourdhui-app

# Lancer un serveur local
python3 -m http.server 8000
# ou
npx serve .

# Ouvrir dans le navigateur
# http://localhost:8000
