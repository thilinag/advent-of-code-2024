const part1Data = {
    sample: `1
10
100
2024`,
    answer: 37327623,
};

const part2Data = {
    sample: ``,
    answer: 0,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split("\n").map(Number);
};

const getSecret = (n) => {
    //https://stackoverflow.com/questions/59255596/negative-values-after-bitwise-or-operation-between-two-int-values
    // All bitwise operators in JavaScript, when used on numbers, treat their operands as/produce results of 32-bit signed integers
    // except for the >>> operator.
    for (let i = 0; i < 2000; i++) {
        const step1 = (((n * 64) ^ n) >>> 0) % 16777216;
        const step2 = ((Math.floor(step1 / 32) ^ step1) >>> 0) % 16777216;
        n = (((step2 * 2048) ^ step2) >>> 0) % 16777216;
    }
    return n;
};

const part1 = () => {
    const data = getData(1);
    return data.reduce((acc, cur) => acc + getSecret(cur), 0);
};

const part2 = () => {
    const data = getData(2);
    // part 2 code
    // return ;
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
