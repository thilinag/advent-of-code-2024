const part1Data = {
    sample: `3   4
4   3
2   5
1   3
3   9
3   3`,
    answer: 11,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 31,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    const left = [];
    const right = [];
    input.split("\n").forEach((a) => {
        const [l, r] = a.split("   ");
        left.push(Number(l));
        right.push(Number(r));
    });

    return {
        left,
        right,
    };
};

const sortNums = (a, b) => a - b;

const part1 = () => {
    const { left, right } = getData(1);

    const sortedLeft = left.toSorted(sortNums);
    const sortedRight = right.toSorted(sortNums);

    return sortedLeft.reduce(
        (acc, cur, idx) => acc + Math.abs(cur - sortedRight[idx]),
        0
    );
};

const part2 = () => {
    const { left, right } = getData(2);

    return left.reduce(
        (acc, cur) => acc + cur * right.filter((itm) => itm === cur).length,
        0
    );
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
