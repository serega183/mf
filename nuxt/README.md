docker-compose --file docker-compose-dev.yml up --build

npm i
npm run build
COPY .output/ .output/
docker-compose --file docker-compose-prod.yml up --build

INSERT INTO `users`(`id`, `login`, `password`) VALUES ('1','aaa','sss')

docker-compose exec mf_mysql_01 bash

MYSQL_ROOT_PASSWORD - эта переменная является обязательной и указывает пароль, который будет установлен для учетной записи суперпользователя root.
MYSQL_USER, MYSQL_PASSWORD - эти переменные необязательны, используются совместно для создания нового пользователя и установки пароля этого пользователя.

PMA_ARBITRARY - при значении 1 будет разрешено подключение к произвольному серверу
PMA_HOST - определяет адрес/имя хоста сервера MySQL
PMA_VERBOSE - определяет подробное имя сервера MySQL
PMA_PORT - определяет порт сервера MySQL
PMA_HOSTS - определяет разделенный запятыми список адресов/имен хостов серверов MySQL
PMA_VERBOSES - определяет разделенный запятыми список подробных имен серверов MySQL
PMA_PORTS - определяет разделенный запятыми список портов серверов MySQL
PMA_USER и PMA_PASSWORD - определяют имя пользователя и пароль для использования только с методом аутентификации config.
PMA_ABSOLUTE_URI - полный URL-адрес phpMyAdmin. Иногда требуется при использовании в конфигурации обратного прокси-сервера. Не устанавливайте это без необходимости. Смотрите документацию.
PMA_CONFIG_BASE64 - если задан, этот параметр переопределит значение по умолчанию config.inc.php с декодированным содержимым переменной base64
PMA_USER_CONFIG_BASE64 - если задан, этот параметр переопределит значение по умолчанию config.user.inc.php с декодированным содержимым переменной base64
PMA_CONTROLHOST - если задано, это указывает на альтернативный узел базы данных, используемый для хранения базы данных хранилища конфигурации phpMyAdmin
PMA_CONTROLPORT - если задан, переопределит порт по умолчанию (3306) для подключения к управляющему хосту для хранения базы данных хранилища конфигурации phpMyAdmin.
PMA_PMADB - определяет имя базы данных, которая будет использоваться для базы данных хранилища конфигурации phpMyAdmin. Если этот параметр не задан, расширенные функции по умолчанию не включены (потенциально они все еще могут быть включены пользователем при входе в систему с помощью функции zero conf (нулевая конфигурация). Рекомендуемые значения: phpmyadmin или pmadb
PMA_CONTROLUSER - определяет имя пользователя для phpMyAdmin, которое будет использоваться для расширенных функций (controluser)
PMA_CONTROLPASS - определяет пароль для phpMyAdmin для использования с controluser
PMA_QUERYHISTORYDB - при значении true позволяет сохранять историю SQL в базе данных хранилища конфигурации phpMyAdmin. Если значение равно false, история сохраняется в браузере и очищается при выходе из системы
PMA_QUERYHISTORYMAX - если задано целое число, управляет количеством элементов истории. Смотрите документацию. Значение по умолчанию равно 25.
MAX_EXECUTION_TIME - если задано, переопределит максимальное время выполнения в секундах (по умолчанию 600) для phpMyAdmin ($cfg['ExecTimeLimit']) и PHP max_execution_time (формат как [0-9+])
MEMORY_LIMIT - если задано, переопределит ограничение памяти (по умолчанию 512M) для phpMyAdmin ($cfg['MemoryLimit']) и PHP memory_limit (формат как [0-9+](K,M,G))
UPLOAD_LIMIT - если задан, этот параметр переопределит значение по умолчанию для apache и php-fpm (формат как [0-9+](K,M,G) значение по умолчанию 2048K, это изменит значения upload_max_filesize и post_max_size)
HIDE_PHP_VERSION - если задан, этот параметр скроет версию PHP (expose_php = Выкл.). Установите любое значение (например, HIDE_PHP_VERSION=true).

https://habr.com/ru/post/501652/

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

---

Это в /server/middlewere
import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
event.context.db_mf_mysql_01 = await mysql.createConnection({
host: process.env.MYSQLHOST,
port: 3306,
user: "mf_user",
password: "mf_user_pass",
database: "mf_mysql_01",
});
});

так читаем в /api
event.context.db_mf_mysql_01

- ***

при регистрации пользователя проверить на свободное поле email
добавить правило валидации unique и только русские буквы в поле name
