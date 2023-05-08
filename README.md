# AgilePomodoro

The AgilePomodoro is a web-based tool that can be used to help you increase your productivity and decrease distractions. This tool:
- combines the classic pomodoro timer and Agile software development
- allows you to integrate with external issue tracking software to pull in your tasks
- logs pomodoros for specific tasks
- allows you to log distractions
- compiles statistics of your pomodoro usage that you can use to reflect and improve your time management skills

## Setup

### Prerequisites
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. [Setup WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) (and ensure git is available inside of it)
3. NodeJS w/ NPM (for frontend)
4. [Setup a Trello developer key](https://trello.com/power-ups/admin) for Trello Sync

### Backend Setup
Run the following commands:
```console
$ git clone https://github.com/tesk-group/pomodoro.git 
$ cd pomodoro/pomodoro_backend
$ docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php82-composer:latest \
    composer install --ignore-platform-reqs
$ cp .env.example .env
```

Open the `.env` file in pomodoro_backend and modify/add the following environment variables:
```
TRELLO_CLIENT_ID=<yourTrelloClientID>
TRELLO_CLIENT_SECRET=<yourTrelloClientSecret>

FRONTEND_URL=http://localhost:3000
```
Run the following commands:
```
$ ./vendor/bin/sail up -d
$ ./vendor/bin/sail artisan migrate
```

### Frontend Setup
Run the following commands:
```
$ cd ../pomodoro_prontend
$ cp .env.example .env
$ npm install
$ npm start
```

### Usage
Frontend will be available on http://localhost:3000 with the backend available on port 80.
