const part1Data = {
    sample: `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
    answer: "4,6,3,5,6,3,5,2,1,0",
};

const part2Data = {
    sample: `Register A: 117440
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`,
    answer: 0,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.match(/\d+/g).map(Number);
};

let [A, B, C, ...program] = getData(2);
let pointer = 0;
let isJumpInstruction = false;
const outputs = [];
const getCombo = (combo) => [0, 1, 2, 3, A, B, C, undefined][combo];

const instructions = {
    0: (i) => {
        A = Math.floor(A / Math.pow(2, getCombo(i)));
    },
    1: (i) => {
        B = (B ^ i) >>> 0;
    },
    2: (i) => {
        B = getCombo(i) % 8;
    },
    3: (i) => {
        if (A !== 0) {
            pointer = i;
            isJumpInstruction = true;
        }
    },
    4: () => {
        B = (B ^ C) >>> 0;
    },
    5: (i) => {
        outputs.push(getCombo(i) % 8);
    },
    6: (i) => {
        B = Math.floor(A / Math.pow(2, getCombo(i)));
    },
    7: (i) => {
        C = Math.floor(A / Math.pow(2, getCombo(i)));
    },
};

const part1 = () => {
    // while (pointer < program.length) {
    //     isJumpInstruction = false;
    //     instructions[program[pointer]](program[pointer + 1]);
    //     if (!isJumpInstruction) {
    //         pointer += 2;
    //     }
    // }

    return outputs.join(",");
};

const part2 = () => {
    while (pointer < program.length) {
        isJumpInstruction = false;
        instructions[program[pointer]](program[pointer + 1]);
        if (!isJumpInstruction) {
            pointer += 2;
        }
    }

    return outputs.join(",");
};

console.time("part1");
const part1Answer = part1();
console.log({ part1: part1Answer });
console.timeEnd("part1");
if (!isBrowser)
    console.assert(
        part1Answer === part1Data.answer,
        `${part1Data.answer} expected.`
    );

console.time("part2");
const part2Answer = part2();
console.log({ part2: part2Answer });
console.timeEnd("part2");
if (!isBrowser)
    console.assert(
        part2Answer === part2Data.answer,
        `${part2Data.answer} expected.`
    );
