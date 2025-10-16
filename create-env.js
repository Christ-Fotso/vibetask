// Script pour créer le fichier .env
const fs = require('fs');

const envContent = `# Configuration de la base de données PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=VibeTask_db
DB_USER=postgres
DB_PASSWORD=daag

# Configuration du serveur
PORT=3000
NODE_ENV=development
`;

fs.writeFileSync('.env', envContent);
console.log('✅ Fichier .env créé avec succès !');
console.log('📝 N\'oubliez pas de modifier le mot de passe PostgreSQL si nécessaire');
