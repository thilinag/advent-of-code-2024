const part1Data = {
    sample: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
    answer: 161,
};

const part2Data = {
    sample: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
    answer: 48,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input;
};

const part1 = () => {
    const data = getData(1);
    const real = [...data.matchAll(/mul\((\d+),(\d+)\)/g)].map(
        ([_, first, second]) => [Number(first), Number(second)]
    );
    return real.reduce((acc, cur) => acc + cur[0] * cur[1], 0);
};

const part2 = () => {
    const data = getData(2);
    const real = data
        .split("do()") // get all instructions staring with do()
        .map((a) => a.split(`don't()`)[0]) // remove instructions preceding don't()
        .flatMap(
            (a) =>
                [...a.matchAll(/(mul\((\d+),(\d+)\))/g)].map((a) => [
                    Number(a[2]),
                    Number(a[3]),
                ]) // get all valid mul pairs
        );
    return real.reduce((acc, cur) => acc + cur[0] * cur[1], 0);
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
