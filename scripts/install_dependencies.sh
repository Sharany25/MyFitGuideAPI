#!/bin/bash
DEPLOYMENT_DIR="/var/www/nestjs-app"

echo "Instalando dependencias de producción en el directorio de despliegue..."
cd $DEPLOYMENT_DIR
# Instala solo las dependencias listadas en 'package.json' sin las 'devDependencies'
/usr/bin/pnpm install --prod