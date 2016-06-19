#Magehand
A real-time campaign and character management tool for table-top roleplaying games.

## Usage
- Install: `npm install`
- Step 1: Start server with `DEBUG=myapp:* npm start`
- Step 2: Also have `webpack --watch` running
- Step 3: Profit?

http://fireball-179561.nitrousapp.com/


## Bugs
- Leaving a campaign doesn't update live
- Can't update stats in Firefox

## TODO
- User profile page
- Be able to delete characters + campaigns
- !Campaign game type + character/campaign type validation
- Tests
- Make /join do something
- 'Other' race and class
- Authenticate character views
- Saving throws
- Allow skills to be selectable from class chooser pane
- Add security rules
- Add all spells
- Add facebook auth
- Add google auth
- Raw stats to bonus slider
- Desktop view
- Trim/organize CSS
- Have multiple providers on one account?
x Join campaign modal colors are weird (and probably others)
x Use indexes (not priority) for campaign code lookups
x Move game rule meta to separate files
x Make campaign view
x Sort out how fb3 effects user storage for lookups on /characters
x Allow adding of spells
x Adding of equipment


### Security rules
- Don't let id references be updated ever?


### Rad possible features
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
