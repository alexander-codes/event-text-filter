const fs = require('fs');
const commandLineArgs = require('command-line-args');
const lineReader = require('line-by-line');

const optionDefinitions = [
  { name: 'inputFile', alias: 'i', type: String, multiple: false },
  { name: 'outputFile', alias: 'o', type: String, multiple: false }
];
const commandLineOptions = commandLineArgs(optionDefinitions);
let rawLogFile = commandLineOptions.inputFile;
let editFile = commandLineOptions.outputFile;

const lineReadOptions = {
  encoding: 'utf8',
  skipEmptyLines: true
}
const fileStream = new lineReader(rawLogFile, lineReadOptions);

const filter = fs.readFileSync('filterwholeline.txt', 'utf-8').toString().split('\n');
const realmlist = fs.readFileSync('realmlist.txt', 'utf-8').toString().split('\n');
console.log('REALMS');
console.log(realmlist);

function removeTimestamp (text) {
  const timestampRegEx = /\d{1,2}\/\d{1,2}\s\d{1,2}:\d{2}:\d{2}.\d{3}\s\s/;
  return text.replace(timestampRegEx, '');
}

function removeRealm (text) {
  realmlist.forEach((realm) => {
    const textToRemove = `-${realm}`;
    text = text.replace(textToRemove, '');
  });

  return text;
}

function cleanLine (text) {
  let cleanedLine = removeTimestamp(text);
  cleanedLine = removeRealm(cleanedLine);
  cleanedLine += '\n';
  return cleanedLine;
}

function isLineValid (text) {
  let containsInvalidPhrase = false;
  filter.forEach((entry) => {
    if (text.includes(entry)) {
      containsInvalidPhrase = true;
    }
  });

  return !containsInvalidPhrase;
}

fileStream.on('error', (err) => {
  console.log(`FILE STREAM ERROR: ${err}`);
});

fileStream.on('line', (line) => {
  if (isLineValid(line)) {
    fs.appendFileSync(editFile, cleanLine(line));
  }
});

fileStream.on('end', () => {
	console.log(`COMPLETED PROCESSING FILE: ${rawLogFile}`);
});
