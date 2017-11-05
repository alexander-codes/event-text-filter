# Event Text Filter

I made this tool because my role-playing guild wanted to keep event logs so that anyone unable to make it to a particular event could still stay up to date on our campaigns, but cleaning up the default chat logs by hand was tedious. This tool will remove timestamps, realm names, and chatter from various other channels (General, Trade, LocalDefense, xtensionxtooltip2), as well as a handful of various other information lines of text (friends and guildies logging on and off, achievements, etc).

It does not filter for all potential chat log spam, such as receiving loot or gold because those lines were too close to what someone might reasonable say in RP, so manual cleanup of those types of lines will still be necessary.

## Use

After cloning the repo, run `npm install`

After installing the npm modules, drop the source chatlog in the project's root folder and run the app.

The run command accepts two parameters, the filenames for the input and output files:

`node app.js --inputFile <rawlogfile.txt> --outputFile <cleanedlogfile.txt>`
`node app.js -i <rawlogfile.txt> -o <cleanedlogfile.txt>`

## Customization

Currently, the `realmlist.txt` file contains only my own server, Wrymrest Accord. To add more servers, simply add the server name to the text file. Remember, if the server name is more than one word, spaces will need to be removed.

If you want to add more conditions to remove entire lines from the input chatlog (for instance, if you're in any global chat channels), enter the desired comparison in the `filterwholeline.txt` file.
