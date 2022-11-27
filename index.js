// File System Built-in Package
const fs = require('fs');

// Variable to Store the File Contents
let rawFounderList;

// Read Contents from the Given File
const readFile = (filepath) => {
	try {
		rawFounderList = fs.readFileSync(filepath, 'utf8');
	} catch (exception) {
		throw new Error(`Unable to Read from ${filepath}: ${exception}`);
	}
};

// List the Contents if Available
const listFounders = () => {
	if (!rawFounderList || rawFounderList !== undefined) {
		console.log(rawFounderList);
	} else {
		throw new Error('There is no list of founders provided.');
	}
};

// Search by the Name in the List
const searchFounder = (founder) => {
	if (!rawFounderList || rawFounderList !== undefined) {
		if (rawFounderList.includes(founder)) {
			console.log(`"${founder}" exists in the list of founders provided.`);
		} else {
			console.log(`"${founder}" doesn't exist in the list of founders provided.`);
		}
	} else {
		throw new Error('There is no list of founders provided.');
	}
}

// Parse CLI Arguments
let tempCommand;
process.argv.slice(2).forEach((argument, index) => {
	switch(argument) {
	case '--filepath':
	case '-f':
		tempCommand = 'read';
		break;
	case '--list':
	case '-l':
		listFounders();
		break;
	case '--search':
	case '-s':
		tempCommand = 'search';
		break;
	default:
		if (tempCommand) {
			if (tempCommand === 'read') {
				readFile(argument);
			} else {
				searchFounder(argument);
			}
		} else {
			throw new Error(`Unknown Command-Line Argument: ${argument}`);
		}
	}
});
