DEPLOYMENT_DIR="/var/www/nestjs-app"
PROJECT_NAME="myfitguide-api" # <-- Nombre actualizado
ENTRY_FILE="main.js"          # <-- Verifica si tu NestJS compilado inicia con 'main.js'

echo "Iniciando la aplicación ($PROJECT_NAME) con PM2..."
cd $DEPLOYMENT_DIR
# El flag --name asegura que PM2 lo registre con el nombre correcto.
pm2 start $ENTRY_FILE --name $PROJECT_NAME
pm2 save
echo "Aplicación iniciada. Estado de PM2:"
pm2 status