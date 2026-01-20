# Déploiement Vercel - ATT Manageo

## Configuration des domaines

### Frontend
- **URL**: https://att-manageo.vercel.app
- **Projet Vercel**: att-manageo

### Backend
- **URL**: https://att-manageo-backend.vercel.app
- **Projet Vercel**: att-manageo-backend

## Étapes de déploiement

### 1. Déployer le Backend

```bash
cd backend
vercel --prod
```

**Configuration Vercel pour le backend:**
- Project Name: `att-manageo-backend`
- Framework Preset: Other
- Build Command: `npm run vercel-build`
- Output Directory: (leave empty)
- Install Command: `npm install`

**Variables d'environnement à configurer:**
```
DATABASE_URL=postgresql://neondb_owner:npg_dRteKqDZ9k8u@ep-green-queen-agb1x5ja-pooler.c-2.eu-central-1.aws.neon.tech/att_forms?sslmode=require&channel_binding=require
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024
NODE_ENV=production
ALLOWED_ORIGINS=https://att-manageo.vercel.app
```

### 2. Déployer le Frontend

```bash
cd frontend
vercel --prod
```

**Configuration Vercel pour le frontend:**
- Project Name: `att-manageo`
- Framework Preset: Angular
- Build Command: `npm run vercel-build`
- Output Directory: `dist/forms-management`
- Install Command: `npm install`

**Variables d'environnement (optionnel):**
Aucune variable d'environnement n'est nécessaire car l'API URL est définie dans `environment.prod.ts`

### 3. Vérification

Après le déploiement:

1. **Backend**: Testez https://att-manageo-backend.vercel.app/api/health
2. **Frontend**: Accédez à https://att-manageo.vercel.app
3. **Login**: Utilisez les comptes de test:
   - Admin: admin@att-forms.com / admin123
   - User: user@att-forms.com / user123

## Configuration DNS (Optionnel)

Si vous voulez utiliser un domaine personnalisé:

### Pour le frontend (att-manageo.com)
1. Allez dans Vercel Dashboard > att-manageo > Settings > Domains
2. Ajoutez votre domaine personnalisé
3. Configurez les DNS selon les instructions Vercel

### Pour le backend (api.att-manageo.com)
1. Allez dans Vercel Dashboard > att-manageo-backend > Settings > Domains
2. Ajoutez votre sous-domaine API
3. Mettez à jour `frontend/src/environments/environment.prod.ts` avec la nouvelle URL

## Commandes utiles

```bash
# Déployer en preview (test)
vercel

# Déployer en production
vercel --prod

# Voir les logs
vercel logs

# Lister les déploiements
vercel ls

# Supprimer un déploiement
vercel rm [deployment-url]
```

## Résolution de problèmes

### Erreur CORS
- Vérifiez que `ALLOWED_ORIGINS` dans le backend inclut l'URL du frontend
- Vérifiez la configuration CORS dans `backend/src/server.ts`

### Erreur de connexion à la base de données
- Vérifiez que `DATABASE_URL` est correctement configurée dans Vercel
- Assurez-vous que Neon PostgreSQL autorise les connexions depuis Vercel

### Erreur 404 sur les routes Angular
- Vérifiez que `frontend/vercel.json` redirige toutes les routes vers `index.html`

### Fichiers Excel ne se téléchargent pas
- C'est normal sur Vercel (pas de système de fichiers persistant)
- Les fichiers sont générés à la volée lors du téléchargement
- Les métadonnées sont stockées dans la base de données

## Notes importantes

1. **Base de données**: Utilisez Neon PostgreSQL (déjà configuré)
2. **Fichiers Excel**: Générés dynamiquement (pas de stockage de fichiers)
3. **Environnement**: Les variables d'environnement doivent être configurées dans Vercel Dashboard
4. **CORS**: Le backend autorise uniquement `att-manageo.vercel.app` en production

## Mise à jour du déploiement

Pour mettre à jour l'application:

```bash
# Backend
cd backend
git add .
git commit -m "Update backend"
git push
vercel --prod

# Frontend
cd frontend
git add .
git commit -m "Update frontend"
git push
vercel --prod
```

Ou configurez le déploiement automatique via Git dans Vercel Dashboard.
