const part1Data = {
    sample: `1
10
100
2024`,
    answer: 37327623,
};

const part2Data = {
    sample: `1
2
3
2024`,
    answer: 23,
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

const getSecrets = (n, prices = []) => {
    // add last digit of initial price
    prices.push(n % 10);
    for (let i = 0; i < 2000; i++) {
        const step1 = (((n * 64) ^ n) >>> 0) % 16777216;
        const step2 = ((Math.floor(step1 / 32) ^ step1) >>> 0) % 16777216;
        n = (((step2 * 2048) ^ step2) >>> 0) % 16777216;
        // add last digit after getting secret
        prices.push(n % 10);
    }
    return prices;
};

const part2 = () => {
    const data = getData(2);
    const totalBananasPerChange = new Map();
    data.forEach((startPrice) => {
        const sellingPrices = getSecrets(startPrice);
        const changes = new Set();
        sellingPrices.forEach((price, idx) => {
            if (idx > 3) {
                // get sequence of 4 differences
                const key = `${
                    sellingPrices[idx - 3] - sellingPrices[idx - 4]
                },${sellingPrices[idx - 2] - sellingPrices[idx - 3]},${
                    sellingPrices[idx - 1] - sellingPrices[idx - 2]
                },${price - sellingPrices[idx - 1]}`;
                // if we have't seen this sequence before
                if (!changes.has(key)) {
                    changes.add(key);
                    // remember the bananas for this specific sequence
                    totalBananasPerChange.set(
                        key,
                        (totalBananasPerChange.get(key) || 0) + price
                    );
                }
            }
        });
    });

    // find most number of bananas
    return Math.max(...totalBananasPerChange.values());
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
