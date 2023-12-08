const fs = require("fs");
const readline = require("readline");

const filepath = "./2.txt";
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
});

function parseGame(inputString) {
    const gameId = inputString.match(/\d+/)[0];
    // console.log(gameId);

    const sets = [...(inputString + ";").matchAll(/[^;]+;/g)];

    // console.table(sets);
    let output = {
        gameId: gameId,
        sets: []
    }
    
    sets.forEach((set, i) => {
        const blueCubes = set[0].match(/\d+ blue/);
        let blueCubesParsed = 0;
        if(blueCubes) blueCubesParsed = Number(blueCubes[0].replaceAll(/ blue/g, ""));
        
        const redCubes = set[0].match(/\d+ red/);
        let redCubesParsed = 0;
        if(redCubes) redCubesParsed = Number(redCubes[0].replaceAll(/ red/g, ""));
        
        const greenCubes = set[0].match(/\d+ green/);
        let greenCubesParsed = 0;
        if(greenCubes) greenCubesParsed = Number(greenCubes[0].replaceAll(/ green/g, ""));

        output.sets.push({
            blueCubes: blueCubesParsed,
            redCubes: redCubesParsed,
            greenCubes: greenCubesParsed
        });
    });

    // console.log(output);
    return output;
};

function checkIfGamePossible(gameObject, maxBlue, maxRed, maxGreen) {
    const sets = gameObject.sets;
    return sets.every((x) => {
        return (x.blueCubes <= maxBlue && x.redCubes <= maxRed && x.greenCubes <= maxGreen)
    });
};

let counter = 0;

rl.on('line', (line) => {
    const game = parseGame(line)
    if(checkIfGamePossible(
        game,
        14,12,13
    )){
        counter += Number(game.gameId); 
    } 
})

rl.on('close', () => {
    console.log(`part 1: ` + counter);
})

//part 2

function getPowerOfMinimumCubes(gameObject) {
    let blueMax = 0, redMax = 0, greenMax = 0;
    gameObject.sets.forEach((set) => {
        blueMax = Math.max(set.blueCubes, blueMax);
        redMax = Math.max(set.redCubes, redMax,);
        greenMax = Math.max(set.greenCubes, greenMax);
    });
    return blueMax * redMax * greenMax;
};

let counter2 = 0;

rl.on('line', (line) => {
    const game = parseGame(line);
    const power = getPowerOfMinimumCubes(game);
    counter2 += power;
});

rl.on('close', () => {
    console.log('part 2: ' + counter2);
})