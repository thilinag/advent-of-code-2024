const part1Data = {
    sample: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
    answer: 18,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 9,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split("\n").map((row) => row.split(""));
};

const part1 = () => {
    const data = getData(1);

    let xmasCount = 0;
    const height = data.length;
    const width = data[0].length;
    const word = "XMAS";

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (data[row][col] !== "X") {
                continue;
            }

            for (let rotateRow = -1; rotateRow <= 1; rotateRow++) {
                for (let rotateCol = -1; rotateCol <= 1; rotateCol++) {
                    if (
                        [...word].every(
                            (char, idx) =>
                                char === "X" ||
                                char ===
                                    data?.[row + rotateRow * idx]?.[
                                        col + rotateCol * idx
                                    ]
                        )
                    ) {
                        xmasCount++;
                    }
                }
            }
        }
    }
    return xmasCount;
};

const part2 = () => {
    const data = getData(2);

    let x_masCount = 0;
    const height = data.length;
    const width = data[0].length;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (data[row][col] !== "A") {
                continue;
            }

            if (
                row < 1 ||
                col - 1 < 0 ||
                row + 1 >= height ||
                col + 1 >= width
            ) {
                continue;
            }

            if (
                data[row - 1][col - 1] === "M" &&
                data[row + 1][col + 1] === "S" &&
                data[row - 1][col + 1] === "M" &&
                data[row + 1][col - 1] === "S"
            ) {
                x_masCount++;
            }

            if (
                data[row - 1][col - 1] === "S" &&
                data[row - 1][col + 1] === "S" &&
                data[row + 1][col - 1] === "M" &&
                data[row + 1][col + 1] === "M"
            ) {
                x_masCount++;
            }

            if (
                data[row - 1][col - 1] === "S" &&
                data[row - 1][col + 1] === "M" &&
                data[row + 1][col - 1] === "S" &&
                data[row + 1][col + 1] === "M"
            ) {
                x_masCount++;
            }

            if (
                data[row - 1][col - 1] === "M" &&
                data[row - 1][col + 1] === "S" &&
                data[row + 1][col - 1] === "M" &&
                data[row + 1][col + 1] === "S"
            ) {
                x_masCount++;
            }
        }
    }
    return x_masCount;
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
