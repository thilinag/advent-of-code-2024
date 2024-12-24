const part1Data = {
    sample: `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`,
    answer: 22,
};

const part2Data = {
    sample: part1Data.sample,
    answer: "6,1",
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split("\n").map((line) => line.split(",").map(Number));
};

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const size = isBrowser ? 71 : 7;
const kilobytesLimit = isBrowser ? 1024 : 12;

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
const findPath = (matrix, start, end) => {
    const queue = [];
    const visited = new Map();
    let lowestScore = Infinity;

    queue.push({
        pos: start,
        score: 0,
    });

    while (queue.length) {
        const {
            pos: [col, row],
            score,
        } = queue.shift();
        if (!visited.get(`${col},${row}`)) {
            visited.set(`${col},${row}`, Infinity);
        }

        // skip if score is already too high
        if (score >= visited.get(`${col},${row}`) || score >= lowestScore) {
            continue;
        }

        // continue if we are at the end
        if (col === end[0] && row === end[1]) {
            lowestScore = score;
            continue;
        }

        // update score
        visited.set(`${col},${row}`, score);

        // check next pos
        directions.forEach(([dirY, dirX]) => {
            const [nextCol, nextRow] = [col + dirY, row + dirX];

            // corrupt or out of bounds
            if (matrix?.[nextCol]?.[nextRow] !== ".") {
                return;
            }

            // next score is too high
            if (visited.get(`${nextCol},${nextRow}`) <= score + 1) {
                return;
            }

            // check next position otherwise
            queue.push({
                pos: [nextCol, nextRow],
                score: score + 1,
            });
        });
    }

    return lowestScore;
};

const part1 = () => {
    const data = getData(1);

    // generate memory space
    const memorySpace = Array.from({ length: size }, () =>
        Array(size).fill(".")
    );

    // drop bytes with the mentioned limit
    for (let i = 0; i < kilobytesLimit; i++) {
        memorySpace[data[i][1]][data[i][0]] = "#";
    }

    return findPath(memorySpace, [0, 0], [size - 1, size - 1]);
};

const part2 = () => {
    const data = getData(2);

    // generate memory space
    const memorySpace = Array.from({ length: size }, () =>
        Array(size).fill(".")
    );

    // drop all bytes
    for (let i = 0; i < data.length; i++) {
        memorySpace[data[i][1]][data[i][0]] = "#";
    }

    let firstBadByte;

    // try removing bytes from end till we find a path
    for (let i = data.length - 1; i >= kilobytesLimit; i--) {
        memorySpace[data[i][1]][data[i][0]] = ".";

        const lowestScore = findPath(memorySpace, [0, 0], [size - 1, size - 1]);

        if (lowestScore !== Infinity) {
            firstBadByte = data[i];
            break;
        }
    }

    return firstBadByte;
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
