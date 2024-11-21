const fs = require("fs");
const readline = require("readline");

const filepath = "2.txt";
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
});

// function parseGame(inputString) {
//     const gameId = inputString.match(/\d+/)[0];
//     // console.log(gameId);

//     const sets = [...(inputString + ";").matchAll(/[^;]+;/g)];

//     // console.table(sets);
//     let output = {
//         gameId: gameId,
//         sets: []
//     }
    
//     sets.forEach((set, i) => {
//         const blueCubes = set[0].match(/\d+ blue/);
//         let blueCubesParsed = 0;
//         if(blueCubes) blueCubesParsed = Number(blueCubes[0].replaceAll(/ blue/g, ""));
        
//         const redCubes = set[0].match(/\d+ red/);
//         let redCubesParsed = 0;
//         if(redCubes) redCubesParsed = Number(redCubes[0].replaceAll(/ red/g, ""));
        
//         const greenCubes = set[0].match(/\d+ green/);
//         let greenCubesParsed = 0;
//         if(greenCubes) greenCubesParsed = Number(greenCubes[0].replaceAll(/ green/g, ""));

//         output.sets.push({
//             blueCubes: blueCubesParsed,
//             redCubes: redCubesParsed,
//             greenCubes: greenCubesParsed
//         });
//     });

//     // console.log(output);
//     return output;
// };

// function checkIfGamePossible(gameObject, maxBlue, maxRed, maxGreen) {
//     const sets = gameObject.sets;
//     return sets.every((x) => {
//         return (x.blueCubes <= maxBlue && x.redCubes <= maxRed && x.greenCubes <= maxGreen)
//     });
// };

// let counter = 0;

// rl.on('line', (line) => {
//     const game = parseGame(line)
//     if(checkIfGamePossible(
//         game,
//         14,12,13
//     )){
//         counter += Number(game.gameId); 
//     } 
// })

// rl.on('close', () => {
//     console.log(`part 1: ` + counter);
// })

// //part 2

// function getPowerOfMinimumCubes(gameObject) {
//     let blueMax = 0, redMax = 0, greenMax = 0;
//     gameObject.sets.forEach((set) => {
//         blueMax = Math.max(set.blueCubes, blueMax);
//         redMax = Math.max(set.redCubes, redMax,);
//         greenMax = Math.max(set.greenCubes, greenMax);
//     });
//     return blueMax * redMax * greenMax;
// };

// let counter2 = 0;


function parseGame(line, maxred, maxblue, maxgreen) {
    const commaIndex = line.indexOf(":");
    const gameId = Number(line.slice(5, commaIndex));
    let isPossible = true
    
    const redMatches = [...line.matchAll(/\d+ red/g)].forEach((x) => {
        if(Number(x[0].match(/\d+/g)[0]) > maxred) isPossible = false
    });
    const blueMatches = [...line.matchAll(/\d+ blue/g)].forEach((x) => {
        if(Number(x[0].match(/\d+/g)[0]) > maxblue) isPossible = false
    });
    const greenMatches = [...line.matchAll(/\d+ green/g)].forEach((x) => {
        if(Number(x[0].match(/\d+/g)[0]) > maxgreen) isPossible = false
    });

    return isPossible ? gameId : 0; 
    
}

function parseGame2(line) {
    let [minred, minblue, mingreen] = [0,0,0];

    const redMatches = [...line.matchAll(/\d+ red/g)].forEach((x) => {
        minred = Math.max(Number(x[0].match(/\d+/g)[0]), minred);
    });
    const blueMatches = [...line.matchAll(/\d+ blue/g)].forEach((x) => {
        minblue = Math.max(Number(x[0].match(/\d+/g)[0]), minblue);
    });
    const greenMatches = [...line.matchAll(/\d+ green/g)].forEach((x) => {
        mingreen = Math.max(Number(x[0].match(/\d+/g)[0]), mingreen);
    });

    return minred * minblue * mingreen;
}

parseGame2("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green");

let [counter, counter2] = [0,0];

rl.on('line', (line) => {
    counter += parseGame(line, 12, 14, 13);
    counter2 += parseGame2(line);
});

rl.on('close', () => {
    console.log('part 1: ' + counter);
    console.log('part 2: ' + counter2);
})