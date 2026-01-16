# 🚀 Guide de déploiement

Ce guide explique comment déployer l'application **Aujourd'hui** sur différentes plateformes.

## 📋 Prérequis

Le projet est dans le dossier `/home/user/aujourdhui-app` avec :
- ✅ Repo Git initialisé (branche `main`)
- ✅ Premier commit effectué
- ✅ Tous les fichiers nécessaires

## 🔗 Étape 1 : Créer le repo GitHub

### Option A : Via l'interface GitHub

1. Va sur https://github.com/new
2. Remplis les informations :
   - **Repository name** : `aujourdhui-app`
   - **Description** : `Application d'aide à la décision pour activités avec enfants de 1 à 5 ans`
   - **Public** ✅
   - **Ne PAS initialiser** avec README, .gitignore ou license (ils existent déjà)
3. Clique sur **Create repository**

### Option B : Via GitHub CLI (si disponible)

```bash
cd /home/user/aujourdhui-app
gh repo create aujourdhui-app --public --source=. --description="Application d'aide à la décision pour activités avec enfants" --push
