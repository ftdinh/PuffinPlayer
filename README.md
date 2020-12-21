# PuffinPlayer

PuffinPlayer is an alternate client for twitch.

## Installation

Assuming that the user has navigated to the project folder on disk, install dependences.

```bash
npm install
```

## Usage

Once dependencies have been installed, the development server can be started.

```bash
npm run dev
```

The npm production script is configured to run on heroku, and so if desired, use the heroku cli to create a new app

```bash
heroku apps:create
```

and push the main git branch to heroku

```bash
git push heroku
```

See heroku documentation for greater detail and most recent information.

## Live Server

A live example of the website is hosted at https://puffinplayer.herokuapp.com/