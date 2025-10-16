# 🎯 VibeTask - To-Do List Avancée

Une application web moderne de gestion de tâches développée avec **PostgreSQL**, **TypeScript** et **Singleton Pattern** pour démontrer une approche technique claire et méthodique.

## ✨ Fonctionnalités

### 🎨 Interface Utilisateur Moderne
- **Design élégant** avec Tailwind CSS
- **Interface responsive** (desktop, tablet, mobile)
- **Formulaire de création** avec sélecteurs de statut et priorité
- **Boutons de statut interactifs** avec icônes intégrées
- **Points de priorité colorés** cliquables
- **Menus déroulants élégants** pour les modifications
- **Mises à jour instantanées** sans rechargement
- **Animations fluides** et transitions

### 🔧 API REST Complète
- **CRUD complet** pour les tâches
- **Codes de statut HTTP corrects** (200, 201, 400, 404, 500)
- **Validation des données** côté serveur
- **Gestion d'erreurs robuste**
- **Support des statuts avancés** et priorités

### 📊 Statuts des Tâches Avancés
- **📋 To Do** - À faire (gris)
- **🔄 In Progress** - En cours (bleu)
- **⏸️ On Hold** - En attente (jaune)
- **✅ Done** - Terminée (vert)
- **❌ Canceled** - Annulée (rouge)

### 🎯 Priorités des Tâches
- **🟢 Low** - Priorité faible (vert)
- **🟠 Medium** - Priorité moyenne (orange)
- **🔴 High** - Priorité élevée (rouge)

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

-- Créer les types ENUM
CREATE TYPE task_status_enum AS ENUM (
  'To Do', 'In Progress', 'On Hold', 'Done', 'Canceled'
);

CREATE TYPE task_priority_enum AS ENUM (
  'Low', 'Medium', 'High'
);

-- Créer la table avec les nouveaux champs
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status task_status_enum DEFAULT 'To Do',
    priority task_priority_enum DEFAULT 'Medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Configuration de la base de données
Créez un fichier `.env` à la racine du projet :
```env
# Configuration de la base de données PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=VibeTask_db
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe

# Configuration du serveur
PORT=3000
NODE_ENV=development
```

### Migration de la base de données
Si vous avez déjà une base de données existante, exécutez la migration :
```bash
node migrate-database.js
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
2. Sélectionnez le **statut** (To Do, In Progress, On Hold, Done, Canceled)
3. Choisissez la **priorité** (Low, Medium, High)
4. Cliquez sur **"Ajouter"** ou appuyez sur Entrée
5. La tâche apparaît immédiatement dans la liste

### Gérer les Tâches
- **Changer le statut** : Cliquez sur le bouton avec l'icône du statut
- **Modifier la priorité** : Cliquez sur le point coloré de priorité
- **Supprimer** : Cliquez sur l'icône poubelle (confirmation requise)
- **Visualiser** : Les tâches sont triées par priorité puis par date

### Interface Moderne
- **Boutons interactifs** avec icônes intégrées
- **Menus déroulants élégants** pour les modifications
- **Points colorés** pour identification rapide
- **Mises à jour instantanées** sans rechargement
- **Design responsive** : Fonctionne sur tous les appareils
- **Animations fluides** et transitions professionnelles

## 🔗 API Endpoints

### Tâches
```
GET    /api/tasks              - Récupérer toutes les tâches (triées par priorité)
GET    /api/tasks/:id          - Récupérer une tâche par ID
POST   /api/tasks              - Créer une nouvelle tâche (avec statut et priorité)
PUT    /api/tasks/:id          - Mettre à jour une tâche (titre, statut, priorité)
DELETE /api/tasks/:id          - Supprimer une tâche
PATCH  /api/tasks/:id/toggle   - Basculer entre To Do et Done
```

### Santé du Serveur
```
GET    /api/health             - Vérifier l'état du serveur
```

### Exemples de Requêtes

#### Créer une tâche avec statut et priorité
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Réviser le code TypeScript",
    "status": "In Progress",
    "priority": "High"
  }'
```

#### Mettre à jour le statut d'une tâche
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Done",
    "priority": "Medium"
  }'
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

### Créer une Tâche avec Statut et Priorité
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Préparer la présentation",
    "status": "In Progress",
    "priority": "High"
  }'
```

### Récupérer Toutes les Tâches (Triées par Priorité)
```bash
curl http://localhost:3000/api/tasks
```

### Mettre à Jour le Statut d'une Tâche
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "Done"}'
```

### Basculer le Statut d'une Tâche (To Do ↔ Done)
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
- **Support des ENUMs** PostgreSQL

### Interface Moderne et Interactive
- **Boutons de statut** avec icônes intégrées
- **Points de priorité** colorés et cliquables
- **Menus déroulants** élégants et intuitifs
- **Mises à jour instantanées** sans rechargement
- **Design responsive** avec Tailwind CSS
- **Animations fluides** et transitions
- **Tri intelligent** par priorité puis par date

### Base de Données Avancée
- **Types ENUM** PostgreSQL pour les statuts et priorités
- **Index optimisés** pour les performances
- **Migration automatique** des données existantes
- **Configuration externalisée** via variables d'environnement

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
- ✅ **PostgreSQL** avec types ENUM et connexion réelle
- ✅ **TypeScript** strict et professionnel avec types avancés
- ✅ **Singleton Pattern** pour la base de données
- ✅ **API REST** complète avec statuts et priorités
- ✅ **Interface moderne** avec boutons interactifs et menus élégants
- ✅ **Mises à jour instantanées** sans rechargement
- ✅ **Code maintenable** et bien documenté
- ✅ **Migration de base de données** automatisée
- ✅ **Configuration externalisée** avec variables d'environnement

**VibeTask** - To-Do List avancée et élégante ! 🚀