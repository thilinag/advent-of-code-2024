const part1Data = {
    sample: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
    answer: 41,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 6,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    const grid = input.split("\n").map((line) => line.split(""));
    const startRow = grid.findIndex((row) => row.includes("^"));

    return {
        grid,
        startRow,
        startCol: grid[startRow].findIndex((col) => col === "^"),
    };
};

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const path = new Set();

const patrol = (grid, row, col) => {
    let nextPosition = [row, col];
    let direction = 0;

    while (grid?.[nextPosition[0]]?.[nextPosition[1]] !== undefined) {
        const prevPosition = nextPosition;
        path.add(`${nextPosition[0]}-${nextPosition[1]}`);

        nextPosition = [
            nextPosition[0] + directions[direction][0],
            nextPosition[1] + directions[direction][1],
        ];

        const nextValue = grid?.[nextPosition[0]]?.[nextPosition[1]];

        if (nextValue === "#") {
            direction = (direction + 1) % 4;
            nextPosition = prevPosition;
        }
    }

    return path.size;
};

const patrol2 = (grid, row, col) => {
    let loops = 0;
    // check for all positions we found in part 1
    // if they are an empty tile
    path.forEach((position) => {
        const [posX, posY] = position.split("-");
        const visited = new Set();
        let nextPosition = [row, col];
        let direction = 0;

        if (grid[posX][posY] === ".") {
            // add a temporary obstacle
            grid[posX][posY] = "#";

            // patrol
            while (grid?.[nextPosition[0]]?.[nextPosition[1]] !== undefined) {
                const prevPosition = nextPosition;
                const visitedKey = `${nextPosition[0]}-${nextPosition[1]}-${direction}`;

                // if we have seen this be fore that means we are in a loop
                if (visited.has(visitedKey)) {
                    loops++;
                    break;
                }
                visited.add(visitedKey);

                nextPosition = [
                    nextPosition[0] + directions[direction][0],
                    nextPosition[1] + directions[direction][1],
                ];

                const nextValue = grid?.[nextPosition[0]]?.[nextPosition[1]];

                if (nextValue === "#") {
                    direction = (direction + 1) % 4;
                    nextPosition = prevPosition;
                }
            }

            // reset grid
            grid[posX][posY] = ".";
        }
    });

    return loops;
};

const part1 = () => {
    const { grid, startRow, startCol } = getData(1);

    return patrol(grid, startRow, startCol);
};

const part2 = () => {
    const { grid, startRow, startCol } = getData(2);

    return patrol2(grid, startRow, startCol);
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
