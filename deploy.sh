#!/bin/bash

# Script de déploiement FTP pour Hostinger
# Ce script utilise lftp pour synchroniser le dossier out/ avec le serveur Hostinger

echo "🚀 Starting deployment to Hostinger..."

# Vérification des variables d'environnement requises
if [ -z "$HOSTINGER_FTP_SERVER" ] || [ -z "$HOSTINGER_FTP_USERNAME" ] || [ -z "$HOSTINGER_FTP_PASSWORD" ]; then
    echo "❌ Error: Missing required environment variables"
    echo "Please set HOSTINGER_FTP_SERVER, HOSTINGER_FTP_USERNAME, and HOSTINGER_FTP_PASSWORD"
    exit 1
fi

# Vérification que le dossier out/ existe
if [ ! -d "out" ]; then
    echo "❌ Error: out/ directory not found. Did you run 'npm run build'?"
    exit 1
fi

echo "📂 Found out/ directory with build files"
echo "🌐 Connecting to $HOSTINGER_FTP_SERVER..."

# Déploiement via lftp avec synchronisation miroir
lftp -c "
set ftp:ssl-allow no;
set net:timeout 10;
set net:max-retries 3;
set net:reconnect-interval-base 5;
open -u $HOSTINGER_FTP_USERNAME,$HOSTINGER_FTP_PASSWORD $HOSTINGER_FTP_SERVER;
lcd out;
cd public_html;
mirror --reverse --delete --verbose --parallel=4 --exclude-glob .git* --exclude-glob .DS_Store;
bye;
"

# Vérification du code de sortie
if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🎉 Your site should now be live at https://jsonresume.guajava.site"
else
    echo "❌ Deployment failed!"
    exit 1
fi
