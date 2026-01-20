# 📋 Vue d'Ensemble du Projet - Forms Management System

## 🎯 Description du Projet

Application complète de gestion de formulaires dynamiques avec génération automatique de fichiers Excel. Le système permet aux utilisateurs de créer des formulaires personnalisés, de collecter des données et de générer des exports Excel versionnés.

## 🏗️ Architecture

### Stack Technique

**Backend:**
- Node.js + Express.js
- TypeScript
- PostgreSQL (via Prisma ORM)
- JWT pour l'authentification
- ExcelJS pour la génération de fichiers
- Déployé sur Vercel

**Frontend:**
- Angular 16
- Angular Material
- RxJS
- TypeScript
- SCSS
- Déployable sur Vercel/Netlify

**Base de Données:**
- PostgreSQL (Neon, Supabase, ou autre)
- Prisma ORM pour les migrations et requêtes

## 📊 Modèle de Données

### Entités Principales

```
User (Utilisateur)
├── id: number
├── email: string (unique)
├── password: string (hashé)
├── role: ADMIN | USER
├── createdAt: Date
└── updatedAt: Date

Form (Formulaire)
├── id: number
├── name: string
├── creatorId: number → User
├── fields: FormField[]
├── submissions: FormSubmission[]
├── excelFiles: ExcelFile[]
├── createdAt: Date
└── updatedAt: Date

FormField (Champ de formulaire)
├── id: number
├── formId: number → Form
├── type: text | textarea
├── label: string
├── order: number
└── required: boolean

FormSubmission (Soumission)
├── id: number
├── formId: number → Form
├── submitterId: number → User
├── data: JSON
└── createdAt: Date

ExcelFile (Fichier Excel)
├── id: number
├── fileName: string
├── filePath: string
├── ownerId: number → User
├── formId: number → Form
├── version: number
├── submissionsCount: number
└── createdAt: Date
```

## 🔐 Système d'Authentification

### JWT (JSON Web Tokens)

**Flux d'authentification:**
1. L'utilisateur envoie email + mot de passe
2. Le backend vérifie les credentials
3. Si valide, génère un token JWT (expire après 7 jours)
4. Le frontend stocke le token dans localStorage
5. Chaque requête inclut le token dans l'en-tête Authorization
6. Le backend vérifie le token à chaque requête

**Rôles:**
- **USER**: Peut créer des formulaires, soumettre des données, générer des Excel
- **ADMIN**: Toutes les permissions USER + gestion des utilisateurs

## 🎨 Fonctionnalités Principales

### 1. Gestion des Utilisateurs

**Inscription / Connexion:**
- Inscription avec email + mot de passe (min 6 caractères)
- Connexion avec JWT
- Déconnexion automatique si token expiré

**Administration (ADMIN):**
- Créer des utilisateurs avec rôle spécifique
- Modifier les rôles
- Supprimer des utilisateurs
- Voir les statistiques (formulaires, soumissions)

### 2. Formulaires Dynamiques

**Création:**
- Nom du formulaire
- Ajout de champs personnalisés:
  - Texte court (input)
  - Texte long (textarea)
- Champs requis/optionnels
- Réorganisation des champs (ordre)

**Modification:**
- Modifier le nom
- Ajouter/supprimer des champs
- Réorganiser les champs
- Seul le créateur peut modifier

**Soumission:**
- Remplir les champs du formulaire
- Validation des champs requis
- Sauvegarde dans la base de données
- Option de génération Excel

**Suppression:**
- Seul le créateur peut supprimer
- Suppression en cascade (champs, soumissions, fichiers Excel)

### 3. Génération de Fichiers Excel

**Caractéristiques:**
- Génération à la demande (pas automatique)
- Versioning automatique (v1, v2, v3...)
- Colonnes basées sur les champs du formulaire
- Styling professionnel (en-têtes colorés, bordures)
- Nouvelles données en vert clair

**Workflow:**
1. Soumettre un formulaire
2. Choisir de générer un Excel
3. Le système crée/met à jour le fichier avec versioning
4. Téléchargement depuis la page "Fichiers Excel"

**Versioning:**
- Première génération: v1
- Ajout de nouvelles données: v2, v3, etc.
- Chaque version contient toutes les données précédentes + nouvelles

**Stockage (Vercel):**
- Pas de stockage permanent sur disque
- Génération à la volée lors du téléchargement
- Métadonnées stockées en base de données

## 🔄 Flux de Travail Typique

### Scénario 1: Créer et Utiliser un Formulaire

```
1. Admin crée un compte utilisateur
   ↓
2. Utilisateur se connecte
   ↓
3. Utilisateur crée un formulaire "Suivi des interventions"
   - Champ: "Nom du technicien" (texte court, requis)
   - Champ: "Description" (texte long, requis)
   - Champ: "Observations" (texte long, optionnel)
   ↓
4. Utilisateur remplit le formulaire plusieurs fois
   ↓
5. Utilisateur génère un fichier Excel
   ↓
6. Utilisateur télécharge le fichier Excel (v1)
   ↓
7. Utilisateur ajoute de nouvelles soumissions
   ↓
8. Utilisateur génère un nouveau fichier Excel (v2)
```

### Scénario 2: Administration

```
1. Admin se connecte
   ↓
2. Admin accède à "Gestion des utilisateurs"
   ↓
3. Admin crée un nouvel utilisateur
   - Email: technicien@example.com
   - Mot de passe: secure123
   - Rôle: USER
   ↓
4. Admin peut modifier le rôle si nécessaire
   ↓
5. Admin peut supprimer l'utilisateur
```

## 📡 API Endpoints

### Authentification
```
POST   /api/auth/register      - Inscription
POST   /api/auth/login         - Connexion
GET    /api/auth/me            - Vérifier le token
```

### Formulaires
```
GET    /api/forms              - Liste des formulaires
GET    /api/forms/:id          - Détails d'un formulaire
POST   /api/forms              - Créer un formulaire
PUT    /api/forms/:id          - Modifier un formulaire
DELETE /api/forms/:id          - Supprimer un formulaire
POST   /api/forms/:id/submit   - Soumettre des données
POST   /api/forms/:id/generate-excel - Générer Excel
GET    /api/forms/:id/submissions - Liste des soumissions
```

### Fichiers Excel
```
GET    /api/excel              - Liste des fichiers Excel
GET    /api/excel/:id/download - Télécharger un fichier
DELETE /api/excel/:id          - Supprimer un fichier
```

### Utilisateurs (ADMIN)
```
GET    /api/users              - Liste des utilisateurs
POST   /api/users              - Créer un utilisateur
PUT    /api/users/:id          - Modifier un utilisateur
DELETE /api/users/:id          - Supprimer un utilisateur
```

## 🚀 Déploiement

### Backend (Vercel)

**Prérequis:**
- Compte Vercel
- Base de données PostgreSQL (Neon, Supabase)

**Variables d'environnement:**
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

**Commandes:**
```bash
cd backend
vercel
```

### Frontend (Vercel/Netlify)

**Configuration:**
- Modifier `environment.prod.ts` avec l'URL du backend
- Build: `npm run build:prod`
- Deploy: `vercel` ou `netlify deploy`

## 🔒 Sécurité

### Mesures Implémentées

1. **Authentification:**
   - Mots de passe hashés avec bcrypt (12 rounds)
   - Tokens JWT avec expiration
   - Vérification du token à chaque requête

2. **Autorisation:**
   - Guards pour protéger les routes
   - Vérification des permissions côté backend
   - Utilisateur ne peut modifier que ses propres ressources

3. **Validation:**
   - Validation des données côté frontend (Angular Forms)
   - Validation des données côté backend
   - Protection contre les injections SQL (Prisma)

4. **CORS:**
   - Configuration stricte des origines autorisées
   - Credentials autorisés pour les cookies

5. **Headers de Sécurité:**
   - Helmet.js pour les headers HTTP sécurisés

## 📈 Évolutions Possibles

### Court Terme
- [ ] Ajout de types de champs (date, nombre, select)
- [ ] Prévisualisation du formulaire avant création
- [ ] Duplication de formulaires
- [ ] Recherche et filtres dans les listes

### Moyen Terme
- [ ] Partage de formulaires entre utilisateurs
- [ ] Notifications par email
- [ ] Export en PDF
- [ ] Statistiques et graphiques

### Long Terme
- [ ] API publique pour intégrations
- [ ] Webhooks
- [ ] Templates de formulaires
- [ ] Multi-langue

## 🧪 Tests

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## 📚 Documentation

- `README.md` - Vue d'ensemble générale
- `QUICK_START.md` - Démarrage rapide
- `FRONTEND_SETUP.md` - Configuration détaillée du frontend
- `backend/DEPLOYMENT.md` - Déploiement du backend
- `API_DOCUMENTATION.md` - Documentation de l'API

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT.

## 👥 Équipe

- Backend: Node.js + Express + Prisma
- Frontend: Angular 16 + Material
- Base de données: PostgreSQL

---

**Projet créé avec ❤️ pour simplifier la gestion de formulaires et la génération d'Excel**
