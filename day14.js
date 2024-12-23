const part1Data = {
    sample: `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`,
    answer: 12,
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
    return input
        .split("\n")
        .map((line) =>
            line
                .split(" ")
                .map((robot) =>
                    robot.split("=")[1].split(",").map(Number).reverse()
                )
        );
};

const part1 = () => {
    const data = getData(1);

    const width = isBrowser ? 101 : 11;
    const height = isBrowser ? 103 : 7;
    const widthMiddle = Math.floor(width / 2);
    const heightMiddle = Math.floor(height / 2);
    const t = 100;
    let q1 = 0;
    let q2 = 0;
    let q3 = 0;
    let q4 = 0;

    data.forEach(([p, v]) => {
        const [movedTotalX, movedTotalY] = [p[0] + t * v[0], p[1] + t * v[1]];
        const [lastPositionX, lastPositionY] = [
            movedTotalX >= 0
                ? movedTotalX % height
                : (movedTotalX + movedTotalX * -1 * height) % height,
            movedTotalY >= 0
                ? movedTotalY % width
                : (movedTotalY + movedTotalY * -1 * width) % width,
        ];

        if (lastPositionX < heightMiddle && lastPositionY < widthMiddle) {
            q1++;
        }

        if (lastPositionX > heightMiddle && lastPositionY < widthMiddle) {
            q2++;
        }

        if (lastPositionX < heightMiddle && lastPositionY > widthMiddle) {
            q3++;
        }

        if (lastPositionX > heightMiddle && lastPositionY > widthMiddle) {
            q4++;
        }
    });

    return q1 * q2 * q3 * q4;
};

const part2 = () => {
    // const data = getData(2);
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
