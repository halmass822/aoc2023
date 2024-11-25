const fs = require("fs");
const readline = require("readline");

const filepath = "./3.txt";
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
});

var logger = fs.createWriteStream('log.txt', {})

function isAdjacent(targetStart, targetEnd, symbolPosition) {
    return (Math.abs(symbolPosition - targetStart) < 2 || Math.abs(symbolPosition - targetEnd) < 2) ? true : false;
};

function getNumPositions(line) {
    const nums = [...line.matchAll(/\d+/g)];
    return nums.map((x) => {
        return [x[0], x.index, x.index + x[0].length - 1]; //return part number, index start, index end
    });
}

function getSymbolPositions(line) {
    const symbols = [...line.matchAll(/[^\d.]/g)];
    return symbols.map((x) => {
        return x.index;
    })
}

let counter = 0;
let prevLineNumPositions;
let prevLineSymbolPositions;
let confirmedPartNumbers = [];

rl.on("line", (line) => {
    let numPositions = getNumPositions(line);
    const symbolPositions = getSymbolPositions(line);

    // console.log(symbolPositions);

    let numPositionsToProcess = numPositions;
    let symbolPositionsToProcess = symbolPositions;

    if(prevLineNumPositions) numPositionsToProcess = [...numPositionsToProcess, ...prevLineNumPositions];
    if(prevLineSymbolPositions) symbolPositionsToProcess = [...symbolPositionsToProcess, ...prevLineSymbolPositions];

    // console.log(`prevlinesymbolpos: ${prevLineSymbolPositions}\n symbolPos: ${symbolPositions}\n symbolpostoprocess: ${symbolPositionsToProcess}\n prevlinenumpos: ${prevLineNumPositions}\n numpositions: ${numPositions}\n numpositionstoprocess: ${numPositionsToProcess}\n`);

    console.log(symbolPositionsToProcess);

    
    if (symbolPositionsToProcess.length > 0) {
        for(i = 0; i < numPositionsToProcess.length; i++) {
            for(j = 0; j < symbolPositionsToProcess.length; j++) {
                const [potentialPartNumber, indexStart, indexEnd] = [numPositionsToProcess[i][0], numPositionsToProcess[i][1], numPositionsToProcess[i][2]];
                const symbolPosition = symbolPositionsToProcess[j];
                // console.log(potentialPartNumber);
                // console.log(isAdjacent(indexStart, indexEnd, symbolPosition));
                if(isAdjacent(indexStart, indexEnd, symbolPosition)) {
                    counter += Number(potentialPartNumber);
                    confirmedPartNumbers.push(potentialPartNumber); 
                    numPositions = numPositions.filter((x) => x[0] !== potentialPartNumber); //filtering out duplicates
                } 
            }
        }
    }
    
    // console.log(line);
    // console.log(numPositionsToProcess);
    // console.log(symbolPositionsToProcess);

    prevLineNumPositions = numPositions;
    prevLineSymbolPositions = symbolPositions;
});

rl.on("close", () => {
    console.log(`part 1: ${confirmedPartNumbers.reduce((x, acc) => Number(x) + Number(acc))}`);
    logger.write(String(confirmedPartNumbers.map((x) => `${x}\n`)));
});