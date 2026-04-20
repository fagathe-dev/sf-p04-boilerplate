#!/usr/bin/env bash
api_dir='/Users/fagathe/workspace/sf-p02-todo-app'
app_host='dev.sf-p04-boilerplate.fagathe-dev.fr'
port='9600'
db_driver='mysql'

# enregistrer le nouveau nom de domaine dans le host de la machine
# echo "127.0.0.1\t${app_host}" | sudo tee -a /etc/hosts

echo "lance le service ${db_driver}"
brew services start $db_driver
cd $api_dir
echo 'cd api dir'
echo 'ouvrir le projet sur vscode'
code .
bin/console c:c -n
echo "open http://${app_host}:${port} in browser"
# open http://$app_host:$port
            
# lance le serveur interne de php
php -S $app_host:$port -t public

# stop le service mysql lorsqu'on stop le script
trap "brew services stop ${db_driver}" EXIT