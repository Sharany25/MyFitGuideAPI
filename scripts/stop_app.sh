PROJECT_NAME="myfitguide-api"

echo "Deteniendo la aplicación actual ($PROJECT_NAME) con pm2..."
# Detener y eliminar por el nombre real para una limpieza completa
pm2 stop $PROJECT_NAME || true
pm2 delete $PROJECT_NAME || true