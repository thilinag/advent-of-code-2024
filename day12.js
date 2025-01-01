const part1Data = {
    sample: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`,
    answer: 1930,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 1206,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split("\n").map((line) => line.split(""));
};

const directions = [
    [-1, 0], // top
    [0, 1], // right
    [1, 0], // bottom
    [0, -1], // left
];

const getNeighbors = (matrix, row, col, visited, plotData) => {
    const neighbors = [];
    const plant = matrix[row][col];
    directions.forEach(([dirX, dirY]) => {
        const newRow = row + dirX;
        const newCol = col + dirY;

        if (matrix?.[newRow]?.[newCol] === plant) {
            if (!visited.has(`${newRow},${newCol}`)) {
                neighbors.push([newRow, newCol]);
            }
        } else {
            plotData.edges.push([newRow, newCol]);
        }
    });

    return neighbors;
};

const findPlot = (matrix, row, col, visited, plotData) => {
    plotData.area.push([row, col]);
    visited.add(`${row},${col}`);

    const neighbors = getNeighbors(matrix, row, col, visited, plotData);
    neighbors.forEach(([newRow, newCol]) => {
        if (!visited.has(`${newRow},${newCol}`)) {
            findPlot(matrix, newRow, newCol, visited, plotData);
        }
    });
};

const part1 = () => {
    const data = getData(1);
    const visited = new Set();
    let cost = 0;

    data.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
            // skip plant if we already checked it
            if (!visited.has(`${rowIdx},${colIdx}`)) {
                const plotData = {
                    plant: `${col}|${rowIdx},${colIdx}`,
                    area: [],
                    edges: [],
                };

                findPlot(data, rowIdx, colIdx, visited, plotData);
                cost += plotData.area.length * plotData.edges.length;
            }
        });
    });

    return cost;
};

const getStraightSide = (
    matrix,
    plant,
    [x, y],
    [dX, dY],
    [dX1, dY1],
    visited
) => {
    let nextX = x;
    let nextY = y;

    if (visited.has(`${nextX},${nextY}|${dX},${dY}`)) {
        return null;
    }
    while (true) {
        const tempNextX = nextX + dX;
        const tempNextY = nextY + dY;
        if (
            matrix?.[tempNextX]?.[tempNextY] === plant &&
            matrix?.[tempNextX + dX1]?.[tempNextY + dY1] !== plant
        ) {
            nextX = tempNextX;
            nextY = tempNextY;
            visited.add(`${nextX},${nextY}|${dX},${dY}`);
        } else {
            break;
        }
    }
    return `${nextX},${nextY}|${dX},${dY}`;
};

const part2 = () => {
    const data = getData(2);
    const visited = new Set();
    let cost = 0;

    data.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
            // skip plant if we already checked it
            if (!visited.has(`${rowIdx},${colIdx}`)) {
                const plotData = {
                    plant: `${col}|${rowIdx},${colIdx}`,
                    area: [],
                    edges: [],
                };

                findPlot(data, rowIdx, colIdx, visited, plotData);

                const sides = new Set();
                const visitedPos = new Set();
                plotData.area.forEach((pos) => {
                    // check for straight sections
                    // keep checking a specific direction till we run out of the edge
                    // and save only the last pos as that edge
                    directions.forEach((dir, dirIdx) => {
                        const [dx, dy] = dir;
                        if (data?.[pos[0] + dx]?.[pos[1] + dy] !== col) {
                            const straightSide = getStraightSide(
                                data,
                                col,
                                pos,
                                directions[(dirIdx + 1) % 4],
                                dir,
                                visitedPos
                            );
                            if (straightSide) sides.add(straightSide);
                        }
                    });
                });

                cost += plotData.area.length * sides.size;
            }
        });
    });

    return cost;
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
