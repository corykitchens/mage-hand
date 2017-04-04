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

*Also*, I started this project long ago and have grown a lot as a developer since then. I would change a lot of things if I was building this today, but incremental improvements can be made in the meantime.


## TODO
These will be moved to github projects and/or issues.
- !Campaign game type + character/campaign type validation
- Allow skills to be selectable from class chooser pane
- Add all spells
- Raw stats to bonus toggle
- Make more desktop friendly
- Have multiple social providers on one account
- Tests
- Turn vue.js debug off


### Rad possible features
These will be moved to github projects and/or issues.
- Have lock change bg color
- Private character notes
- Add NPC stats
- Join link vs. join code (or both)
- Hide nav menu when keyboard is up
- Initiative roll/track thing
- Quick build characters
- Racial name suggestions
- Accurate level up mechanism
- Alignment slider
- Adventure / dungeon / npc / loot generator
- Swipe to dismiss drawers
