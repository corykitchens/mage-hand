# Magehand
A real-time campaign and character management tool for table-top roleplaying games.

## Setup
- Install: `npm install`
- Step 1: Start server with `DEBUG=myapp:* npm start`
- Step 2: Also have `webpack -w` running

When running the app locally, you are using on live Firebase data. Security rules are in place to prevent tampering with unathenticated data, but nothing is stopping you from messing up your data/schema for your campaigns & characters.

## Deployment
Deployment is done through heroku manually. Once CI is in place, this will be done automatically through their git integration.

## Architecture
Magehand is a Node app running on heroku, using Firebase 🔥 as the data store and validation mechanism. The [routes](https://github.com/bananatron/mage-hand/blob/master/routes.js) server the main pages, where it then acts like a SPA, using a combination of Vue and jQuery for page manipulation. Each page is listening to Firebase data nodes, and writing directly to the server for a unidirectional source of truth. The app uses some janky [router logic](https://github.com/bananatron/mage-hand/blob/master/frontend/router.js) to manage authentication state changes and validation.

[Game types](https://github.com/bananatron/mage-hand/tree/master/frontend/game_meta) have been abstracted to more easily add additional game types (beyond DND 5E), and augment existing game types (add spells, abilities, etc.).

*Also*, I started this project long ago and have grown a lot as a developer since then. I would change a lot of things if I was building this today, but incremental improvements can be made in the meantime.


## Contribution

There's a list of new features and fixes in [github projects](https://github.com/bananatron/mage-hand/projects/1). Feel free to make a PR and we'll test it and get it up and running. 👍