const part1Data = {
    sample: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
    answer: 36,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 81,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input
        .split("\n")
        .map((row) =>
            row.split("").map((point) => (point !== "." ? Number(point) : "."))
        );
};

const getNextMoves = (matrix, row, col) => {
    const currentValue = matrix[row][col];
    const nextMoves = [];

    // up, right, down, left
    const positions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];

    positions.forEach(([r, c]) => {
        const nextRow = row + r;
        const nextCol = col + c;
        const nextValue = matrix[nextRow]?.[nextCol];

        // only get valid next point of the hike
        // not out of bounds && next position should be just current + 1
        if (nextValue && nextValue !== "." && currentValue + 1 === nextValue) {
            nextMoves.push([nextRow, nextCol]);
        }
    });

    return nextMoves;
};

const hike = (matrix, row, col, trails) => {
    if (matrix[row][col] === 9) {
        // we are at the end
        trails.push(`${row},${col}`);
    } else {
        const nextMoves = getNextMoves(matrix, row, col);

        nextMoves.forEach((move) => {
            hike(matrix, move[0], move[1], trails);
        });
    }
};

const part1 = () => {
    const data = getData(1);
    let score = 0;
    data.forEach((row, rIdx) => {
        row.forEach((col, cIdx) => {
            if (col === 0) {
                // if trail head
                const trails = [];
                hike(data, rIdx, cIdx, trails);
                score += new Set(trails).size;
            }
        });
    });

    return score;
};

const part2 = () => {
    const data = getData(2);
    let score = 0;
    data.forEach((row, rIdx) => {
        row.forEach((col, cIdx) => {
            if (col === 0) {
                // if trail head
                const trails = [];
                hike(data, rIdx, cIdx, trails);
                score += trails.length;
            }
        });
    });

    return score;
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
