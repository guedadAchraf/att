# 🚀 Guide de Configuration du Frontend Angular 16

Ce guide vous accompagne dans la configuration et le démarrage de l'application frontend Angular 16.

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Démarrage](#démarrage)
5. [Architecture](#architecture)
6. [Fonctionnalités](#fonctionnalités)
7. [Déploiement](#déploiement)

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir installé:

- **Node.js** version 16 ou supérieure
- **npm** (inclus avec Node.js)
- **Angular CLI** version 16

### Vérifier les versions installées

```bash
node --version    # Doit afficher v16.x.x ou supérieur
npm --version     # Doit afficher 8.x.x ou supérieur
```

### Installer Angular CLI

```bash
npm install -g @angular/cli@16
ng version
```

## 📦 Installation

### 1. Naviguer vers le dossier frontend

```bash
cd frontend
```

### 2. Installer les dépendances

```bash
npm install
```

Cette commande installera:
- Angular 16 et ses modules
- Angular Material pour l'UI
- RxJS pour la programmation réactive
- TypeScript et les outils de développement

## ⚙️ Configuration

### 1. Configuration de l'API Backend

Modifiez le fichier `src/environments/environment.ts` pour le développement:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3001/api'  // URL de votre backend local
};
```

Pour la production, modifiez `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.vercel.app/api'  // URL de votre backend en production
};
```

### 2. Configuration CORS du Backend

Assurez-vous que votre backend autorise les requêtes depuis le frontend:

**Backend Development:**
```typescript
cors({
  origin: ['http://localhost:4200'],
  credentials: true
})
```

**Backend Production:**
```typescript
cors({
  origin: ['https://your-frontend-domain.vercel.app'],
  credentials: true
})
```

## 🚀 Démarrage

### Mode Développement

```bash
npm start
# ou
ng serve
```

L'application sera accessible sur: **http://localhost:4200**

Le serveur de développement se recharge automatiquement lors des modifications de code.

### Build de Production

```bash
npm run build:prod
```

Les fichiers optimisés seront générés dans `dist/forms-management/`

## 🏗️ Architecture de l'Application

### Structure des Dossiers

```
frontend/src/app/
├── core/                           # Fonctionnalités centrales
│   ├── guards/                     # Protection des routes
│   │   ├── auth.guard.ts          # Vérifie l'authentification
│   │   └── admin.guard.ts         # Vérifie le rôle admin
│   ├── interceptors/              # Intercepteurs HTTP
│   │   └── auth.interceptor.ts    # Ajoute le token JWT
│   └── services/                  # Services métier
│       ├── auth.service.ts        # Authentification
│       ├── form.service.ts        # Gestion des formulaires
│       ├── excel.service.ts       # Gestion des fichiers Excel
│       └── user.service.ts        # Gestion des utilisateurs
│
├── features/                      # Modules fonctionnels
│   ├── auth/                      # Authentification
│   │   ├── login/                 # Page de connexion
│   │   └── register/              # Page d'inscription
│   ├── dashboard/                 # Tableau de bord
│   ├── forms/                     # Gestion des formulaires
│   │   ├── form-list/            # Liste des formulaires
│   │   ├── form-create/          # Création de formulaire
│   │   ├── form-edit/            # Modification de formulaire
│   │   └── form-submit/          # Soumission de formulaire
│   ├── excel/                     # Gestion des fichiers Excel
│   │   └── excel-list/           # Liste et téléchargement
│   └── admin/                     # Administration
│       └── user-management/       # Gestion des utilisateurs
│
└── shared/                        # Composants partagés
    └── components/
        └── navbar/                # Barre de navigation
```

## ✨ Fonctionnalités Principales

### 1. Authentification JWT

**Services:**
- `AuthService`: Gestion de l'authentification
- `AuthInterceptor`: Ajout automatique du token aux requêtes
- `AuthGuard`: Protection des routes authentifiées
- `AdminGuard`: Protection des routes admin

**Flux d'authentification:**
1. L'utilisateur se connecte via `/login`
2. Le backend retourne un token JWT
3. Le token est stocké dans `localStorage`
4. L'intercepteur ajoute le token à chaque requête
5. Le guard vérifie l'authentification avant d'accéder aux routes protégées

### 2. Formulaires Dynamiques

**Création de formulaire:**
- Nom du formulaire
- Ajout de champs (texte court, texte long)
- Réorganisation des champs (haut/bas)
- Champs requis/optionnels
- Suppression de champs

**Modification de formulaire:**
- Modification du nom
- Ajout/suppression de champs
- Réorganisation

**Soumission de formulaire:**
- Validation des champs requis
- Sauvegarde des données
- Option de génération Excel

### 3. Génération de Fichiers Excel

**Fonctionnalités:**
- Génération à la demande après soumission
- Versioning automatique (v1, v2, v3...)
- Téléchargement des fichiers générés
- Liste de tous les fichiers Excel créés
- Suppression des fichiers

**Workflow:**
1. Soumettre un formulaire
2. Choisir de générer un Excel
3. Le backend crée le fichier avec versioning
4. Télécharger depuis la page `/excel`

### 4. Administration

**Gestion des utilisateurs (ADMIN uniquement):**
- Créer de nouveaux utilisateurs
- Modifier les rôles (USER ↔ ADMIN)
- Supprimer des utilisateurs
- Voir les statistiques (formulaires créés, soumissions)

## 🎨 Interface Utilisateur

### Angular Material

L'application utilise Angular Material pour une interface moderne et responsive:

- **Toolbar**: Barre de navigation
- **Cards**: Conteneurs de contenu
- **Tables**: Affichage des données
- **Forms**: Champs de formulaire
- **Buttons**: Boutons d'action
- **Icons**: Icônes Material
- **Snackbar**: Notifications
- **Spinner**: Indicateurs de chargement
- **Dialog**: Modales (si nécessaire)

### Thème

Le thème par défaut est `indigo-pink`. Pour le changer, modifiez dans `styles.scss`:

```scss
@import '@angular/material/prebuilt-themes/purple-green.css';
```

## 🔐 Sécurité

### Protection des Routes

```typescript
// Route protégée par authentification
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }

// Route protégée par rôle admin
{ path: 'admin/users', component: UserManagementComponent, canActivate: [AuthGuard, AdminGuard] }
```

### Gestion du Token

- Token stocké dans `localStorage`
- Expiration après 7 jours (configurable côté backend)
- Déconnexion automatique si token invalide
- Intercepteur pour ajouter le token automatiquement

## 🌐 Déploiement

### Déploiement sur Vercel

1. **Installer Vercel CLI:**
```bash
npm install -g vercel
```

2. **Se connecter à Vercel:**
```bash
vercel login
```

3. **Déployer:**
```bash
cd frontend
vercel
```

4. **Configurer les variables d'environnement:**
   - Aller sur le dashboard Vercel
   - Settings → Environment Variables
   - Ajouter `API_URL` avec l'URL de votre backend

5. **Build automatique:**
   - Le fichier `vercel.json` est déjà configuré
   - Chaque push sur la branche principale déclenchera un déploiement

### Déploiement sur Netlify

1. **Build local:**
```bash
npm run build:prod
```

2. **Installer Netlify CLI:**
```bash
npm install -g netlify-cli
```

3. **Déployer:**
```bash
netlify deploy --prod --dir=dist/forms-management
```

### Déploiement sur Firebase Hosting

1. **Installer Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Initialiser Firebase:**
```bash
firebase init hosting
```

3. **Configurer:**
   - Public directory: `dist/forms-management`
   - Single-page app: Yes
   - Automatic builds: Optional

4. **Déployer:**
```bash
npm run build:prod
firebase deploy
```

## 🧪 Tests

### Lancer les tests unitaires

```bash
npm test
```

### Lancer les tests e2e (si configurés)

```bash
npm run e2e
```

## 📱 Responsive Design

L'application est responsive et s'adapte aux différentes tailles d'écran:

- **Desktop**: Affichage complet avec sidebar
- **Tablet**: Affichage adapté
- **Mobile**: Menu hamburger, colonnes empilées

## 🐛 Dépannage

### Erreur: "Cannot find module '@angular/core'"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur CORS

Vérifiez la configuration CORS du backend et l'URL de l'API dans `environment.ts`

### Port 4200 déjà utilisé

```bash
ng serve --port 4300
```

### Erreur de build

```bash
# Nettoyer le cache Angular
rm -rf .angular/cache
ng build --configuration production
```

## 📚 Ressources

- [Documentation Angular](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 🤝 Support

Pour toute question ou problème:
1. Vérifiez la documentation
2. Consultez les logs de la console
3. Vérifiez la connexion au backend
4. Vérifiez les variables d'environnement

## 📝 Checklist de Démarrage

- [ ] Node.js 16+ installé
- [ ] Angular CLI 16 installé
- [ ] Dépendances installées (`npm install`)
- [ ] Backend en cours d'exécution
- [ ] URL de l'API configurée dans `environment.ts`
- [ ] CORS configuré sur le backend
- [ ] Application démarrée (`npm start`)
- [ ] Accès à http://localhost:4200
- [ ] Compte admin créé sur le backend
- [ ] Connexion réussie

## 🎉 Prêt à Démarrer!

Votre application Angular 16 est maintenant configurée et prête à l'emploi!

```bash
cd frontend
npm install
npm start
```

Ouvrez votre navigateur sur **http://localhost:4200** et commencez à utiliser l'application! 🚀
