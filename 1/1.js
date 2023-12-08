const fs = require("fs");
const readline = require("readline");

const filepath = "./input.txt";
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
});

function getCalibrationNumber(inputString) {
    const inputArray = inputString.split("");
    const firstNumber = Number( inputArray.find(e => /\d/.test(e)) );
    const lastNumber = Number( inputArray.findLast(e => /\d/.test(e)) );
    return (firstNumber * 10) + lastNumber;
};

counter = 0;

rl.on('line', (line) => {
    counter += getCalibrationNumber(line);
});

rl.on('close', () => {
    console.log(`part 1: ` + counter);
})

//part 2 - didn't work :(


function getCalibrationNumberAdvanced(inputString) {

    const numbersArray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const numbersRegex = /one|two|three|four|five|six|seven|eight|nine|\d/g;
    
    const numbers = [ ...inputString.matchAll(numbersRegex)]; //array of all the numbers
    
    firstNumber = numbers[0][0].length > 1 ? numbersArray.indexOf(numbers[0][0]) + 1 : Number(numbers[0][0]) //if first number is a word then return the value, otherwise return the number
    lastNumber = numbers[numbers.length - 1][0].length > 1 ? numbersArray.indexOf(numbers[numbers.length - 1][0]) + 1 : Number(numbers[numbers.length -1][0]);

    return firstNumber * 10 + lastNumber;
};

let counter2 = 0;

rl.on('line', (line) => {
    counter2 += getCalibrationNumberAdvanced(line);
});

rl.on('close', () => {
    console.log(`part 2: ` + counter2);
})