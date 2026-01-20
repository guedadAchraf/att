# Déploiement Monorepo sur Vercel - ATT Manageo

## Structure du projet
```
att-forms/
├── backend/          # Express.js API
├── frontend/         # Angular App
├── shared/           # Types partagés
└── vercel.json       # Configuration racine
```

## Déploiement sur Vercel (Monorepo)

### Étape 1: Préparer le repository GitHub

1. **Créer un repository GitHub** (ex: `att-manageo`)
2. **Pousser le code:**
```bash
git init
git add .
git commit -m "Initial commit - ATT Manageo"
git remote add origin https://github.com/YOUR_USERNAME/att-manageo.git
git push -u origin main
```

### Étape 2: Déployer le Backend

1. **Aller sur vercel.com** et cliquer "New Project"
2. **Importer le repository** `att-manageo`
3. **Configurer le projet backend:**
   - **Project Name:** `att-manageo-backend`
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** `npm run vercel-build`
   - **Output Directory:** (laisser vide)
   - **Install Command:** `npm install`

4. **Variables d'environnement:**
```
DATABASE_URL=postgresql://neondb_owner:npg_dRteKqDZ9k8u@ep-green-queen-agb1x5ja-pooler.c-2.eu-central-1.aws.neon.tech/att_forms?sslmode=require&channel_binding=require
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
NODE_ENV=production
ALLOWED_ORIGINS=https://att-manageo.vercel.app
```

5. **Déployer** → URL: `https://att-manageo-backend.vercel.app`

### Étape 3: Déployer le Frontend

1. **Créer un nouveau projet** sur Vercel
2. **Importer le même repository** `att-manageo`
3. **Configurer le projet frontend:**
   - **Project Name:** `att-manageo`
   - **Framework Preset:** Angular
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run vercel-build`
   - **Output Directory:** `dist/forms-management`
   - **Install Command:** `npm install`

4. **Déployer** → URL: `https://att-manageo.vercel.app`

### Étape 4: Configuration des domaines personnalisés (Optionnel)

Si vous avez un domaine personnalisé:

**Frontend (att-manageo.com):**
1. Vercel Dashboard → att-manageo → Settings → Domains
2. Ajouter `att-manageo.com` et `www.att-manageo.com`

**Backend (api.att-manageo.com):**
1. Vercel Dashboard → att-manageo-backend → Settings → Domains  
2. Ajouter `api.att-manageo.com`
3. Mettre à jour `frontend/src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.att-manageo.com/api'
};
```

## Structure des URLs

### Développement
- Frontend: http://localhost:4200
- Backend: http://localhost:3001

### Production (Vercel)
- Frontend: https://att-manageo.vercel.app
- Backend: https://att-manageo-backend.vercel.app

### Production (Domaine personnalisé)
- Frontend: https://att-manageo.com
- Backend: https://api.att-manageo.com

## Commandes de déploiement

```bash
# Déployer le backend
cd backend
vercel --prod

# Déployer le frontend  
cd frontend
vercel --prod

# Ou déployer automatiquement via Git push
git add .
git commit -m "Update application"
git push origin main
```

## Configuration automatique

Pour activer le déploiement automatique:

1. **Vercel Dashboard** → Project → Settings → Git
2. **Activer "Auto-deploy"** pour la branche `main`
3. Chaque `git push` déclenchera un déploiement automatique

## Variables d'environnement par projet

### Backend (att-manageo-backend)
```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
NODE_ENV=production
ALLOWED_ORIGINS=https://att-manageo.vercel.app
```

### Frontend (att-manageo)
Aucune variable nécessaire (configuration dans `environment.prod.ts`)

## Test de déploiement

### Backend
```bash
curl https://att-manageo-backend.vercel.app/api/health
# Réponse: {"status":"OK","timestamp":"..."}
```

### Frontend
Ouvrir https://att-manageo.vercel.app dans le navigateur

### Login de test
- **Admin:** admin@att-forms.com / admin123
- **User:** user@att-forms.com / user123

## Résolution de problèmes

### Erreur de build Angular
```bash
# Vérifier la configuration dans frontend/vercel.json
{
  "version": 2,
  "builds": [
    { 
      "src": "package.json", 
      "use": "@vercel/static-build", 
      "config": { 
        "distDir": "dist/forms-management" 
      } 
    }
  ]
}
```

### Erreur CORS
Vérifier que `ALLOWED_ORIGINS` dans le backend correspond à l'URL du frontend.

### Erreur de base de données
1. Vérifier `DATABASE_URL` dans les variables d'environnement Vercel
2. S'assurer que Neon PostgreSQL autorise les connexions depuis Vercel

### Erreur 404 sur les routes Angular
Vérifier que `frontend/vercel.json` redirige toutes les routes vers `index.html`

## Monitoring

### Logs Vercel
```bash
vercel logs att-manageo-backend
vercel logs att-manageo
```

### Métriques
- Vercel Dashboard → Analytics
- Temps de réponse, erreurs, trafic

## Mise à jour

Pour mettre à jour l'application:

```bash
# Faire les modifications
git add .
git commit -m "Feature: nouvelle fonctionnalité"
git push origin main

# Les deux projets se déploieront automatiquement
```

## Sécurité

1. **Variables d'environnement:** Toujours utiliser les variables Vercel, jamais de secrets dans le code
2. **CORS:** Limiter les origines autorisées en production
3. **JWT:** Utiliser un secret fort et unique
4. **Base de données:** Utiliser SSL (déjà configuré avec Neon)

## Coûts Vercel

- **Hobby Plan:** Gratuit (limites: 100GB bandwidth, 100 deployments/month)
- **Pro Plan:** $20/mois (plus de ressources)
- **Monitoring:** Inclus dans tous les plans

Votre application est maintenant prête pour le déploiement sur Vercel! 🚀