const part1Data = {
    sample: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
    answer: 2,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 4,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split("\n").map((line) => line.split(" ").map(Number));
};

const checkIsSafe = (report) => {
    const isSequence =
        report.every((level, idx) => idx === 0 || level < report[idx - 1]) ||
        report.every((level, idx) => idx === 0 || level > report[idx - 1]);

    return (
        isSequence &&
        report.every((level, idx) => {
            if (idx === 0) return true;
            const diff = Math.abs(level - report[idx - 1]);

            return diff >= 1 && diff <= 3;
        })
    );
};

const part1 = () => {
    const data = getData(1);
    return data.filter(checkIsSafe).length;
};

const checkIsSafe2 = (report) => {
    const isSafe = checkIsSafe(report);

    if (isSafe) return true;

    return report.some((_, idx) => {
        return checkIsSafe(report.toSpliced(idx, 1));
    });
};

const part2 = () => {
    const data = getData(2);

    return data.filter(checkIsSafe2).length;
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
