// const fs = require("fs");
// const readline = require("readline");

// const filepath = "./2.txt";
// const rl = readline.createInterface({
//     input: fs.createReadStream(filepath),
//     crlfDelay: Infinity
// });

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

// rl.on('line', (line) => {
//     const game = parseGame(line);
//     const power = getPowerOfMinimumCubes(game);
//     counter2 += power;
// });

// rl.on('close', () => {
//     console.log('part 2: ' + counter2);
// })

function parseGame(line, maxred, maxblue, maxgreen) {
    const commaIndex = line.indexOf(":");
    const gameId = Number(line.slice(5, commaIndex));
    let isPossible = true

    const redMatches = [...line.matchAll(/\d+ red/g)].forEach((x) => {
        if(Number(x[0].match(/\d/g)) > maxred) isPossible = false
    });
    const blueMatches = [...line.matchAll(/\d+ blue/g)].forEach((x) => {
        if(Number(x[0].match(/\d/g)) > maxblue) isPossible = false
    });
    const greenMatches = [...line.matchAll(/\d+ green/g)].forEach((x) => {
        if(Number(x[0].match(/\d/g)) > maxgreen) isPossible = false
    });

    return isPossible ? gameId : 0; 

}

let counter = 0;

`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.split("\n").forEach((x) => {
    counter += parseGame(x,12,14,13);
})

console.log(counter);