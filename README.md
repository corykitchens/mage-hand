#Magehand
A real-time campaign and character management tool for table-top roleplaying games.

## Usage
- Install: `npm install`
- Step 1: Start server with `DEBUG=myapp:* npm start`
- Step 2: Also have `webpack -w` running
- Step 3: Profit?

http://fireball-179561.nitrousapp.com/


## Bugs
- Leaving a campaign doesn't update live
- Can't update stats in Firefox
- Deleting user account has weird session error
- Manifest may not be working?

## TODO
- Be able to delete characters + campaigns
- !Campaign game type + character/campaign type validation
- Authenticate character views
- Add security rules
- Saving throws
- Allow skills to be selectable from class chooser pane
- Add all spells
- Raw stats to bonus slider
- Desktop view
- Have multiple providers on one account?
- Tests
- Turn vue.js debug off

### Security rules
- Don't let id references be updated ever?


### Rad possible features
- Private character notes
- Add NPC stats
- Join link vs. join code (or both)
- Hide nav menu when keyboard is up
- Swipe to dismiss drawers
- Initiative roll/track thing
- Quick build characters
- Racial name suggestions
- Accurate level up mechanism
- Alignment slider
- Adventure / dungeon / npc / loot generator
- Random session (generates random characters for everyone (would require adventure gen?))
