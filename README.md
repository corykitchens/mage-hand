# Magehand
A real-time campaign and character management tool for table-top roleplaying games.

## Setup
- Install: `npm install`
- Step 1: Start server with `DEBUG=myapp:* npm start`
- Step 2: Also have `webpack -w` running

When running the app locally, you are using on live Firebase data. Security rules are in place to prevent tampering with unathenticated data, but nothing is stopping you from messing up your data/schema for your campaigns & characters.

## Deployment
Deployment is done through heroku manually. Once CI is in place, this will be done automatically through their git integration.



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
