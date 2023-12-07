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

    console.log(output);
    return output;
};

function checkIfGamePossible(gameObject, maxBlue, maxRed, maxGreen) {
    const sets = gameObject.sets;
    return sets.every((x) => {
        return x.blueCubes <= maxBlue && x.redCubes <= maxRed && x.greenCubes <= maxGreen 
    });
};


parseGame("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green");
parseGame("Game 11: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green");

// /[^;]+;/
// /\d+ blue|green|red/