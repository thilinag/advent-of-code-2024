const part1Data = {
    sample: `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`,
    answer: 7036,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 45,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    const matrix = input.split("\n").map((line) => line.split(""));
    let start, end;
    matrix.forEach((row, rowIdx) =>
        row.forEach((col, colIdx) => {
            if (col === "S") {
                start = [rowIdx, colIdx];
                matrix[rowIdx][colIdx] = ".";
            }
            if (col === "E") {
                end = [rowIdx, colIdx];
                matrix[rowIdx][colIdx] = ".";
            }
        })
    );
    return {
        matrix,
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

let currentDirection = [0, 1];
let visited = new Map();
let lowestPoints = Infinity;

/* 
  https://en.wikipedia.org/wiki/Breadth-first_search
   1  procedure BFS(G, root) is
   2      let Q be a queue
   3      label root as explored
   4      Q.enqueue(root)
   5      while Q is not empty do
   6          v := Q.dequeue()
   7          if v is the goal then
   8              return v
   9          for all edges from v to w in G.adjacentEdges(v) do
  10              if w is not labeled as explored then
  11                  label w as explored
  12                  w.parent := v
  13                  Q.enqueue(w)
  */
const findPath = (matrix, start, end, currentDir) => {
    const queue = [];

    queue.push({
        pos: start,
        points: 0,
        currentDir,
    });

    while (queue.length) {
        const {
            pos: [row, col],
            points,
            currentDir,
        } = queue.shift();

        const cacheKey = `${row},${col}`;

        if (!visited.get(cacheKey)) {
            visited.set(cacheKey, {
                lowest: Infinity,
            });
        }

        // skip if points is already too high
        if (points >= visited.get(cacheKey).lowest || points >= lowestPoints) {
            continue;
        }

        // continue if we are at the end
        if (col === end[1] && row === end[0]) {
            lowestPoints = points;
            continue;
        }

        const savedData = visited.get(cacheKey);

        // update points
        visited.set(cacheKey, {
            ...savedData,
            [currentDir.toString()]: points,
            lowest: Math.min(...Object.values(savedData)),
        });

        // check next pos
        directions.forEach(([dirX, dirY]) => {
            const [nextRow, nextCol] = [row + dirX, col + dirY];

            // should be a path tile
            if (matrix?.[nextRow]?.[nextCol] !== ".") {
                return;
            }

            // otherwise add to queue for checking next position
            // if we are turning score should be 1000 more
            queue.push({
                pos: [nextRow, nextCol],
                points:
                    points +
                    (currentDir[0] === dirX && currentDir[1] === dirY
                        ? 1
                        : 1001),
                currentDir: [dirX, dirY],
            });
        });
    }

    return lowestPoints;
};
const part1 = () => {
    const { matrix, start, end } = getData(1);
    return findPath(matrix, start, end, currentDirection);
};

const part2 = () => {
    const { end } = getData(2);
    const bestSpots = new Set();

    const queue = [];
    // start from the end
    queue.push({ pos: end, points: lowestPoints });

    while (queue.length) {
        const {
            pos: [row, col],
            points,
        } = queue.shift();

        bestSpots.add(`${row},${col}`);

        // for each direction check if there is a tile which has the lowest score
        // that means its also an alternative path to end
        directions.forEach(([dirX, dirY]) => {
            const [nextRow, nextCol] = [row + dirX, col + dirY];

            const savedNeighborData = visited.get(`${nextRow},${nextCol}`);

            if (savedNeighborData) {
                if (Object.values(savedNeighborData).includes(points - 1)) {
                    queue.push({
                        pos: [nextRow, nextCol],
                        points: points - 1,
                    });
                }

                if (Object.values(savedNeighborData).includes(points - 1001)) {
                    queue.push({
                        pos: [nextRow, nextCol],
                        points: points - 1001,
                    });
                }
            }
        });
    }

    return bestSpots.size;
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
