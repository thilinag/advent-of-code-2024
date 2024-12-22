const part1Data = {
    sample: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
    answer: 480,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 0,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split("\n\n").map((lines) => {
        return lines.match(/\d+/g).map(Number);
    });
};

const part1 = () => {
    const data = getData(1);

    return data.reduce((acc, machine) => {
        const [ax, ay, bx, by, prizeX, prizeY] = machine;
        const bPresses = (ax * prizeY - ay * prizeX) / (ax * by - bx * ay);
        const aPresses = (by * prizeX - bx * prizeY) / (ax * by - bx * ay);

        return (
            acc +
            (aPresses % 1 === 0 && bPresses % 1 === 0
                ? aPresses * 3 + bPresses
                : 0)
        );
    }, 0);
};

const part2 = () => {
    const data = getData(2);

    return data.reduce((acc, machine) => {
        const [ax, ay, bx, by, prizeX, prizeY] = machine;
        const correctPrizeX = prizeX + 10000000000000;
        const correctPrizeY = prizeY + 10000000000000;
        const bPresses =
            (ax * correctPrizeY - ay * correctPrizeX) / (ax * by - bx * ay);
        const aPresses =
            (by * correctPrizeX - bx * correctPrizeY) / (ax * by - bx * ay);

        return (
            acc +
            (aPresses % 1 === 0 && bPresses % 1 === 0
                ? aPresses * 3 + bPresses
                : 0)
        );
    }, 0);
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
