# 🚀 Guide Complet d'Installation - Forms Management System

Ce guide vous accompagne pas à pas pour installer et démarrer l'application complète (Backend + Frontend).

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Installation du Backend](#installation-du-backend)
3. [Installation du Frontend](#installation-du-frontend)
4. [Premier Démarrage](#premier-démarrage)
5. [Vérification](#vérification)
6. [Utilisation](#utilisation)
7. [Déploiement](#déploiement)
8. [Dépannage](#dépannage)

## 🔧 Prérequis

### Logiciels Requis

- **Node.js** 16+ ([Télécharger](https://nodejs.org/))
- **npm** (inclus avec Node.js)
- **PostgreSQL** (local ou cloud)
- **Git** ([Télécharger](https://git-scm.com/))

### Vérifier les Installations

```bash
node --version    # v16.x.x ou supérieur
npm --version     # 8.x.x ou supérieur
git --version     # 2.x.x ou supérieur
```

### Compte PostgreSQL Cloud (Recommandé)

Créez un compte gratuit sur l'une de ces plateformes:
- [Neon](https://neon.tech/) - Recommandé
- [Supabase](https://supabase.com/)
- [ElephantSQL](https://www.elephantsql.com/)

## 📦 Installation du Backend

### 1. Naviguer vers le dossier backend

```bash
cd backend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créez le fichier `.env` à partir de l'exemple:

```bash
cp .env.example .env
```

Éditez `.env` avec vos informations:

```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Secret JWT (générez une clé aléatoire sécurisée)
JWT_SECRET="votre-cle-secrete-tres-longue-et-aleatoire"

# Environnement
NODE_ENV="development"
```

**Exemple avec Neon:**
```env
DATABASE_URL="postgresql://user:pass@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
JWT_SECRET="my-super-secret-jwt-key-change-this-in-production"
NODE_ENV="development"
```

### 4. Initialiser la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma migrate deploy

# (Optionnel) Peupler avec des données de test
npx prisma db seed
```

### 5. Créer un compte administrateur

```bash
node reset-admin-password.js
```

Cela créera un compte admin avec:
- **Email**: `admin@example.com`
- **Mot de passe**: `admin123`

### 6. Démarrer le backend

```bash
npm start
```

Le backend sera accessible sur: **http://localhost:3001**

Vérifiez: http://localhost:3001/api/health

## 🎨 Installation du Frontend

### 1. Ouvrir un nouveau terminal

Gardez le terminal du backend ouvert et ouvrez-en un nouveau.

### 2. Naviguer vers le dossier frontend

```bash
cd frontend
```

### 3. Installer Angular CLI (si pas déjà installé)

```bash
npm install -g @angular/cli@16
```

### 4. Installer les dépendances

```bash
npm install
```

### 5. Configurer l'URL du backend

Le fichier `src/environments/environment.ts` est déjà configuré pour le développement local:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3001/api'
};
```

Si votre backend utilise un port différent, modifiez cette URL.

### 6. Démarrer le frontend

```bash
npm start
```

Le frontend sera accessible sur: **http://localhost:4200**

## 🎉 Premier Démarrage

### 1. Accéder à l'application

Ouvrez votre navigateur sur: **http://localhost:4200**

### 2. Se connecter

Utilisez les identifiants admin créés précédemment:
- **Email**: `admin@example.com`
- **Mot de passe**: `admin123`

### 3. Changer le mot de passe (Recommandé)

Une fois connecté, créez un nouvel utilisateur admin avec un mot de passe sécurisé.

## ✅ Vérification

### Backend

```bash
# Terminal 1 - Backend
cd backend
npm start

# Devrait afficher:
# 🚀 Server running on port 3001
# 📊 Health check: http://localhost:3001/api/health
```

Testez: http://localhost:3001/api/health
Réponse attendue: `{"status":"OK","timestamp":"..."}`

### Frontend

```bash
# Terminal 2 - Frontend
cd frontend
npm start

# Devrait afficher:
# ** Angular Live Development Server is listening on localhost:4200 **
```

Testez: http://localhost:4200
Vous devriez voir la page de connexion.

### Base de Données

```bash
cd backend
npx prisma studio
```

Cela ouvre une interface web pour visualiser vos données sur http://localhost:5555

## 📖 Utilisation

### Créer un Formulaire

1. Connectez-vous avec le compte admin
2. Cliquez sur **"Formulaires"** dans la barre de navigation
3. Cliquez sur **"Créer un formulaire"**
4. Donnez un nom: "Suivi des interventions"
5. Ajoutez des champs:
   - Champ 1: Type "Texte court", Label "Nom du technicien", Requis ✓
   - Champ 2: Type "Texte long", Label "Description de l'intervention", Requis ✓
   - Champ 3: Type "Texte long", Label "Observations", Requis ✗
6. Cliquez sur **"Créer le formulaire"**

### Remplir le Formulaire

1. Dans la liste des formulaires, cliquez sur l'icône **"Remplir"** (crayon)
2. Remplissez les champs:
   - Nom du technicien: "Jean Dupont"
   - Description: "Réparation du système électrique"
   - Observations: "RAS"
3. Cliquez sur **"Soumettre"**
4. Choisissez **"Oui"** pour générer un fichier Excel

### Télécharger le Fichier Excel

1. Cliquez sur **"Fichiers Excel"** dans la barre de navigation
2. Vous verrez votre fichier avec la version v1
3. Cliquez sur l'icône **"Télécharger"**
4. Le fichier Excel est téléchargé sur votre ordinateur

### Ajouter des Données et Créer une Nouvelle Version

1. Retournez sur **"Formulaires"**
2. Remplissez à nouveau le formulaire avec de nouvelles données
3. Générez un nouveau fichier Excel
4. Dans **"Fichiers Excel"**, vous verrez maintenant la version v2

### Gérer les Utilisateurs (Admin)

1. Cliquez sur **"Utilisateurs"** dans la barre de navigation
2. Cliquez sur **"Créer un utilisateur"**
3. Remplissez:
   - Email: "technicien@example.com"
   - Mot de passe: "secure123"
   - Rôle: "Utilisateur"
4. Cliquez sur **"Créer"**
5. Le nouvel utilisateur peut maintenant se connecter

## 🌐 Déploiement

### Backend sur Vercel

```bash
cd backend

# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Configurer les variables d'environnement sur le dashboard Vercel:
# - DATABASE_URL
# - JWT_SECRET
# - NODE_ENV=production
# - ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

### Frontend sur Vercel

```bash
cd frontend

# Modifier src/environments/environment.prod.ts
# Remplacer apiUrl par l'URL de votre backend Vercel

# Déployer
vercel
```

### Configuration Post-Déploiement

1. **Backend**: Ajoutez l'URL du frontend dans `ALLOWED_ORIGINS`
2. **Frontend**: Vérifiez que `environment.prod.ts` pointe vers le backend
3. **Base de données**: Exécutez les migrations sur la DB de production

```bash
cd backend
DATABASE_URL="your-production-db-url" npx prisma migrate deploy
```

## 🐛 Dépannage

### Backend ne démarre pas

**Erreur: "Cannot connect to database"**
```bash
# Vérifiez votre DATABASE_URL dans .env
# Testez la connexion:
cd backend
npx prisma db pull
```

**Erreur: "Port 3001 already in use"**
```bash
# Changez le port dans backend/.env
PORT=3002
```

### Frontend ne démarre pas

**Erreur: "Cannot find module '@angular/core'"**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Erreur: "Port 4200 already in use"**
```bash
ng serve --port 4300
```

### Erreur CORS

**Symptôme**: Erreurs dans la console du navigateur

**Solution**:
1. Vérifiez que le backend autorise l'origine du frontend
2. Dans `backend/src/server.ts`, vérifiez la configuration CORS:
```typescript
cors({
  origin: ['http://localhost:4200'],
  credentials: true
})
```

### Token invalide / Déconnexion automatique

**Solution**:
1. Supprimez le token du localStorage
2. Reconnectez-vous
3. Si le problème persiste, vérifiez `JWT_SECRET` dans `.env`

### Base de données vide après migration

```bash
cd backend
npx prisma db seed
node reset-admin-password.js
```

## 📊 Architecture Résumée

```
┌─────────────────────────────────────────────────────────┐
│                     UTILISATEUR                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              FRONTEND (Angular 16)                       │
│  - Interface utilisateur                                 │
│  - Gestion des formulaires                              │
│  - Authentification JWT                                  │
│  - http://localhost:4200                                │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST API
                     ▼
┌─────────────────────────────────────────────────────────┐
│           BACKEND (Node.js + Express)                    │
│  - API REST                                              │
│  - Authentification JWT                                  │
│  - Génération Excel                                      │
│  - http://localhost:3001                                │
└────────────────────┬────────────────────────────────────┘
                     │ Prisma ORM
                     ▼
┌─────────────────────────────────────────────────────────┐
│           BASE DE DONNÉES (PostgreSQL)                   │
│  - Users, Forms, FormFields                              │
│  - FormSubmissions, ExcelFiles                           │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Checklist Complète

### Installation Backend
- [ ] Node.js 16+ installé
- [ ] PostgreSQL accessible (local ou cloud)
- [ ] Dépendances installées (`npm install`)
- [ ] Fichier `.env` configuré
- [ ] Migrations exécutées (`npx prisma migrate deploy`)
- [ ] Compte admin créé
- [ ] Backend démarré (`npm start`)
- [ ] Health check OK (http://localhost:3001/api/health)

### Installation Frontend
- [ ] Angular CLI 16 installé
- [ ] Dépendances installées (`npm install`)
- [ ] URL du backend configurée
- [ ] Frontend démarré (`npm start`)
- [ ] Page de connexion accessible (http://localhost:4200)

### Vérification Fonctionnelle
- [ ] Connexion avec compte admin réussie
- [ ] Création d'un formulaire réussie
- [ ] Soumission de données réussie
- [ ] Génération Excel réussie
- [ ] Téléchargement Excel réussi
- [ ] Création d'utilisateur réussie (admin)

## 📚 Ressources Supplémentaires

- **Documentation Backend**: `backend/README.md`
- **Documentation Frontend**: `frontend/README.md`
- **Guide Frontend Détaillé**: `FRONTEND_SETUP.md`
- **Vue d'Ensemble**: `PROJECT_OVERVIEW.md`
- **API Documentation**: `API_DOCUMENTATION.md`

## 🆘 Support

Si vous rencontrez des problèmes:

1. **Consultez les logs**:
   - Backend: Terminal où `npm start` est exécuté
   - Frontend: Console du navigateur (F12)

2. **Vérifiez les configurations**:
   - Backend: `.env`
   - Frontend: `src/environments/environment.ts`

3. **Testez les connexions**:
   - Base de données: `npx prisma studio`
   - Backend API: http://localhost:3001/api/health
   - Frontend: http://localhost:4200

4. **Réinitialisez si nécessaire**:
   ```bash
   # Backend
   cd backend
   rm -rf node_modules package-lock.json
   npm install
   
   # Frontend
   cd frontend
   rm -rf node_modules package-lock.json .angular
   npm install
   ```

## 🎉 Félicitations!

Votre application est maintenant opérationnelle! Vous pouvez:

✅ Créer des formulaires personnalisés
✅ Collecter des données
✅ Générer des fichiers Excel
✅ Gérer les utilisateurs
✅ Déployer en production

**Bon développement!** 🚀
