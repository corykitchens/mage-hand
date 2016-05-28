#Magehand
A real-time campaign and character management tool for table-top roleplaying games.

## Usage
- Install: `npm install`
- Step 1: Start server with `DEBUG=myapp:* npm start`
- Step 2: Also have `webpack --watch` running
- Step 3: Profit?


##BUGS
- Leaving a campaign doesn't update live


## TODO
- !Campaign game type + character/campaign type validation
- Tests
- User profile page
- Make /join do something
- 'Other' race and class
- Authenticate character views
- Saving throws
- Be able to delete characters
- Sort out how fb3 effects user storage for lookups on /characters
- Allow skills to be selectable from class chooser pane
- Move game rule meta to separate files
- Make campaign view
- Add character class/rules construct
- Trim/organize CSS
- Add security rules
- Add all spells
- Add facebook auth
- Add google auth
- Raw stats to bonus slider
x Allow adding of spells
x Adding of equipment


### Security rules
- Don't let id references be updated ever?


### Rad possible features
- Join link vs. join code (or both)
- Swipe to dismiss drawers
- Initiative roll/track thing
- Quick build characters
- Racial name suggestions
- Accurate level up mechanism
- Alignment slider
- Adventure / dungeon / npc / loot generator
- Random session (generates random characters for everyone (would require adventure gen?))
