const fs = require("fs");
const readline = require("readline");

const filepath = "./1.txt";
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    crlfDelay: Infinity
});

function parseCalibration(input) {
    const nums = [...input.matchAll(/\d/g)];
    return Number(nums[0]) * 10 + Number(nums[nums.length - 1]);
};

function parseCalibration2(input) {
    const nums = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const numsIndex = [...input.matchAll(/(?=one|two|three|four|five|six|seven|eight|nine|\d)/g)];

    const firstNumber = input.slice(numsIndex[0].index).match(/one|two|three|four|five|six|seven|eight|nine|\d/g)[0];
    const secondNumber = input.slice(numsIndex[numsIndex.length - 1].index).match(/one|two|three|four|five|six|seven|eight|nine|\d/g)[0];

    const firstNumberAsNumber = nums.indexOf(firstNumber) + 1 > 0 ? nums.indexOf(firstNumber) + 1 : Number(firstNumber);
    const secondNumberAsNumber = nums.indexOf(secondNumber) + 1 > 0 ? nums.indexOf(secondNumber) + 1 : Number(secondNumber);

    return firstNumberAsNumber * 10 + secondNumberAsNumber;
}

let counter = 0;
let counter2 = 0;

rl.on("line", (line) => {
    counter += parseCalibration(line);
    counter2 += parseCalibration2(line);
});

rl.on("close", () => {
    console.log("part 1: " + counter);
    console.log("part 2: " + counter2);
});


// `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`.split("\n").forEach((x) => {
//     counter2 += parseCalibration2(x)
// })

// console.log(counter2);