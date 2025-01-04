const part1Data = {
    sample: `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`,
    answer: 44,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 285,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    const track = input.split("\n").map((line) => line.split(""));
    let start, end;
    track.forEach((row, rowIdx) =>
        row.forEach((col, colIdx) => {
            if (col === "S") {
                start = [rowIdx, colIdx];
            }
            if (col === "E") {
                end = [rowIdx, colIdx];
            }
        })
    );
    return {
        track,
        start,
        end,
    };
};

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const race = (matrix, start, end, raceTrackInfo) => {
    let row = start[0];
    let col = start[1];
    let picoseconds = 1;

    raceTrackInfo.set(`${row},${col}`, {
        row,
        col,
        picoseconds,
    });
    let currentDirection = [0, 0];

    while (true) {
        directions.forEach(([dirX, dirY]) => {
            const [nextRow, nextCol] = [row + dirX, col + dirY];

            // check if wall
            if (matrix[nextRow][nextCol] === "#") {
                return;
            }

            // don't turn back
            if (
                currentDirection[0] * dirX + currentDirection[1] * dirY ===
                -1
            ) {
                return;
            }

            // move to the next track position
            row = nextRow;
            col = nextCol;
            currentDirection = [dirX, dirY];
            raceTrackInfo.set(`${row},${col}`, {
                row,
                col,
                picoseconds,
            });
            picoseconds++;
        });

        // check if its end
        if (row === end[0] && col === end[1]) {
            break;
        }
    }
};

const raceTrackInfo = new Map();
const part1 = () => {
    const { track, start, end } = getData(1);
    race(track, start, end, raceTrackInfo);

    let savesTime = 0;
    // apply cheat
    raceTrackInfo.forEach(({ row, col, picoseconds }) => {
        directions.forEach(([dirX, dirY]) => {
            // skip a wall
            const [nextRow, nextCol] = [row + dirX * 2, col + dirY * 2];
            // picoseconds after cheating
            const positionWithCheat = raceTrackInfo.get(
                `${nextRow},${nextCol}`
            );
            // 100 + disable collision time
            if (
                positionWithCheat &&
                positionWithCheat.picoseconds - picoseconds >= 100 + 2
            ) {
                savesTime++;
            }
        });
    });

    return savesTime;
};

const part2 = () => {
    let chatsBetterThan100 = 0;
    // go through every track position with the other positions if disntace is less than 20
    // also check if it saves more than 100 picoseconds with the difference
    raceTrackInfo.forEach(({ row, col, picoseconds }) => {
        raceTrackInfo.forEach(
            ({ row: row2, col: col2, picoseconds: picoseconds2 }) => {
                // https://en.wikipedia.org/wiki/Taxicab_geometry
                const manhattanDiff =
                    Math.abs(row - row2) + Math.abs(col - col2);

                if (
                    manhattanDiff <= 20 &&
                    picoseconds2 - picoseconds >= 100 + manhattanDiff
                ) {
                    chatsBetterThan100++;
                }
            }
        );
    });

    return chatsBetterThan100;
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
