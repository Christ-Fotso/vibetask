# 🎯 VibeTask - To-Do List Minimaliste

Une application web moderne de gestion de tâches développée avec **PostgreSQL**, **TypeScript** et **Singleton Pattern** pour démontrer une approche technique claire et méthodique.

## ✨ Fonctionnalités

### 🎨 Interface Utilisateur
- **Design moderne** avec Tailwind CSS
- **Interface responsive** (desktop, tablet, mobile)
- **Formulaire de création** avec validation en temps réel
- **Cartes de tâches** avec actions contextuelles
- **Basculement de statut** (complété/non complété)
- **Suppression avec confirmation**
- **Notifications** de succès/erreur
- **Animations fluides**

### 🔧 API REST
- **CRUD complet** pour les tâches
- **Codes de statut HTTP corrects** (200, 201, 400, 404, 500)
- **Validation des données**
- **Gestion d'erreurs robuste**

### 📊 Statuts des Tâches
- **false** - Non complétée
- **true** - Complétée

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (version 16 ou supérieure)
- PostgreSQL (version 12 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone https://github.com/Christ-Fotso/vibetask.git
cd vibetask

# Installer les dépendances
npm install
```

### Configuration PostgreSQL
```sql
-- Se connecter à PostgreSQL
psql -U postgres

-- Créer la base de données
CREATE DATABASE "VibeTask_db";

-- Se connecter à la base
\c "VibeTask_db";

-- Créer la table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Configuration de la base de données
Modifiez le fichier `src/database-simple.ts` avec vos paramètres PostgreSQL :
```typescript
const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'VibeTask_db',
  user: 'postgres',
  password: 'votre_mot_de_passe'
};
```

### Démarrage
```bash
# Démarrer le serveur de développement
npm run server

# L'application sera accessible sur :
# http://localhost:3000
```

## 🏗️ Architecture Technique

### **Design Patterns Utilisés**
- **Singleton Pattern** : Une seule instance de connexion à la base de données
- **Repository Pattern** : Abstraction de l'accès aux données
- **MVC Pattern** : Séparation claire des responsabilités

### **Technologies**
- **Backend** : Node.js + Express.js + TypeScript
- **Base de données** : PostgreSQL avec requêtes SQL natives
- **Frontend** : HTML5 + CSS3 (Tailwind) + JavaScript vanilla
- **API** : REST avec codes de statut HTTP appropriés

## 📱 Utilisation

### Créer une Tâche
1. Saisissez le **titre** de la tâche dans le champ de texte
2. Cliquez sur **"Ajouter"** ou appuyez sur Entrée
3. La tâche apparaît immédiatement dans la liste

### Gérer les Tâches
- **Compléter** : Cliquez sur la case à cocher pour marquer comme terminée
- **Supprimer** : Cliquez sur l'icône poubelle (confirmation requise)
- **Visualiser** : Les tâches terminées sont barrées et atténuées

### Interface
- **Design moderne** avec Tailwind CSS
- **Responsive** : Fonctionne sur tous les appareils
- **Notifications** : Feedback visuel pour toutes les actions
- **Animations** : Transitions fluides et professionnelles

## 🔗 API Endpoints

### Tâches
```
GET    /api/tasks              - Récupérer toutes les tâches
GET    /api/tasks/:id          - Récupérer une tâche par ID
POST   /api/tasks              - Créer une nouvelle tâche
PUT    /api/tasks/:id          - Mettre à jour une tâche
DELETE /api/tasks/:id          - Supprimer une tâche
PATCH  /api/tasks/:id/toggle   - Basculer le statut d'une tâche
```

### Santé du Serveur
```
GET    /api/health             - Vérifier l'état du serveur
```

## 📋 Codes de Statut HTTP

### Succès
- **200 OK** - Requête traitée avec succès
- **201 CREATED** - Ressource créée avec succès

### Erreurs Client
- **400 BAD REQUEST** - Requête mal formée
- **404 NOT FOUND** - Ressource non trouvée

### Erreurs Serveur
- **500 INTERNAL SERVER ERROR** - Erreur interne du serveur

## 🏗️ Structure du Projet

```
vibetask/
├── src/
│   ├── app.ts              # Serveur Express + API REST
│   ├── database-simple.ts  # Singleton PostgreSQL
│   └── types.ts            # Types TypeScript
├── public/
│   └── index.html          # Interface utilisateur élégante
├── setup-db.sql            # Script de configuration PostgreSQL
├── package.json            # Configuration npm
└── README.md              # Documentation
```

### **Fichiers Principaux**
- **`src/app.ts`** : Serveur Express avec routes API
- **`src/database-simple.ts`** : Singleton pour la connexion PostgreSQL
- **`src/types.ts`** : Interfaces TypeScript pour les tâches
- **`public/index.html`** : Interface utilisateur avec Tailwind CSS

## 🛠️ Scripts Disponibles

```bash
# Développement
npm run server              # Démarrer le serveur de développement

# Production
npm run build              # Compiler TypeScript
npm start                  # Démarrer en production
```

## 🎯 Exemples d'Utilisation

### Créer une Tâche via API
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Ma nouvelle tâche"}'
```

### Récupérer Toutes les Tâches
```bash
curl http://localhost:3000/api/tasks
```

### Basculer le Statut d'une Tâche
```bash
curl -X PATCH http://localhost:3000/api/tasks/1/toggle
```

### Supprimer une Tâche
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

## 🔧 Dépannage

### Problèmes Courants

1. **Erreur de connexion PostgreSQL**
   - Vérifiez que PostgreSQL est démarré
   - Vérifiez les paramètres dans `src/database-simple.ts`
   - Créez la base de données avec le script SQL fourni

2. **Serveur ne démarre pas**
   - Vérifiez que le port 3000 est libre
   - Vérifiez les dépendances : `npm install`

3. **Interface ne se charge pas**
   - Vérifiez que vous accédez à `http://localhost:3000`
   - Vérifiez la console du navigateur pour les erreurs

### Logs et Debug
- Les logs du serveur s'affichent dans le terminal
- Les erreurs de base de données sont visibles dans la console
- Utilisez les outils de développement du navigateur pour déboguer

## 🎉 Fonctionnalités Avancées

### Singleton Pattern
- **Une seule instance** de connexion à la base de données
- **Gestion optimisée** des ressources
- **Thread-safe** pour les applications concurrentes

### TypeScript Strict
- **Types stricts** pour toutes les interfaces
- **Validation à la compilation** des erreurs
- **IntelliSense** complet pour le développement

### Interface Moderne
- **Design responsive** avec Tailwind CSS
- **Animations fluides** et transitions
- **Feedback visuel** pour toutes les actions
- **Gestion d'erreurs** élégante

## 📄 Licence

Ce projet est sous licence ISC.

## 👨‍💻 Auteur

Développé avec ❤️ par [Christ-Fotso](https://github.com/Christ-Fotso)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Si vous rencontrez des problèmes ou avez des questions :
- Ouvrez une issue sur GitHub
- Consultez la documentation
- Vérifiez les logs du serveur

---

## 🎯 **Pour l'Entretien**

Ce projet démontre :
- ✅ **PostgreSQL** avec connexion réelle
- ✅ **TypeScript** strict et professionnel  
- ✅ **Singleton Pattern** pour la base de données
- ✅ **API REST** complète et bien structurée
- ✅ **Interface élégante** et responsive
- ✅ **Code maintenable** et bien documenté

**VibeTask** - To-Do List minimaliste et élégante ! 🚀