const part1Data = {
    sample: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
    answer: 14,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 34,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split("\n").map((line) => line.split(""));
};

const part1 = () => {
    const data = getData(1);

    const height = data.length;
    const width = data[0].length;

    // save all unique antennas as Map of antennaFrequency: positions[]
    const antennas = new Map();
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (data[row][col] === ".") {
                continue;
            }

            antennas.set(data[row][col], [
                ...(antennas.get(data[row][col]) ?? []),
                [row, col],
            ]);
        }
    }

    const antiNodePositions = new Set();

    antennas.forEach((positions) => {
        // for each antenna position,
        positions.forEach(([pRow, pCol], idx) => {
            if (idx < positions.length - 1) {
                // loop through rest of the positions
                positions.forEach(([rpRow, rpCol], restIdx) => {
                    if (restIdx <= idx) {
                        return;
                    }

                    const delta = [rpRow - pRow, rpCol - pCol];
                    const antiNodes = [
                        [pRow - delta[0], pCol - delta[1]],
                        [rpRow + delta[0], rpCol + delta[1]],
                    ];

                    // check if antinode is within the map
                    antiNodes.forEach(([nodeRow, nodeCol]) => {
                        if (
                            nodeRow < 0 ||
                            nodeRow >= height ||
                            nodeCol < 0 ||
                            nodeCol >= width
                        ) {
                            return;
                        }

                        // store in a set so its easier to get unique positions
                        antiNodePositions.add(`${nodeRow},${nodeCol}}`);
                    });
                });
            }
        });
    });

    return antiNodePositions.size;
};

const part2 = () => {
    const data = getData(2);

    const height = data.length;
    const width = data[0].length;

    // save all unique antennas as Map of antennaFrequency: positions[]
    const antennas = new Map();
    const antennaPositions = new Set();
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (data[row][col] === ".") {
                continue;
            }

            antennas.set(data[row][col], [
                ...(antennas.get(data[row][col]) ?? []),
                [row, col],
            ]);

            antennaPositions.add(`${row},${col}`);
        }
    }

    const antiNodePositions = new Set();

    antennas.forEach((positions) => {
        // for each antenna position,
        positions.forEach(([pRow, pCol], idx) => {
            if (idx < positions.length - 1) {
                // loop through rest of the positions
                positions.forEach(([rpRow, rpCol], restIdx) => {
                    if (restIdx <= idx) {
                        return;
                    }

                    const delta = [rpRow - pRow, rpCol - pCol];

                    // find antiNodes towards both sides
                    for (let i = 0; i < 2; i++) {
                        let count = 1;

                        // keep finding antiNodes
                        while (true) {
                            const nextRow =
                                i == 0
                                    ? pRow - delta[0] * count
                                    : rpRow + delta[0] * count;

                            const nextCol =
                                i == 0
                                    ? pCol - delta[1] * count
                                    : rpCol + delta[1] * count;

                            // stop while loop when antinode is outside of the map
                            if (
                                nextRow < 0 ||
                                nextRow >= height ||
                                nextCol < 0 ||
                                nextCol >= width
                            ) {
                                break;
                            }

                            antiNodePositions.add(`${nextRow},${nextCol}`);
                            count++;
                        }
                    }
                });
            }
        });
    });

    return new Set([...antiNodePositions, ...antennaPositions]).size;
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
