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
MMMISSJEEE`,
    answer: 1930,
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
    return input.split("\n").map((line) => line.split(""));
};

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const getNeighbors = (matrix, row, col, visited, plotData) => {
    const neighbors = [];
    const plant = matrix[row][col];
    for (let i = 0; i < 4; i++) {
        const newRow = row + directions[i][0];
        const newCol = col + directions[i][1];

        if (matrix?.[newRow]?.[newCol] === plant) {
            if (!visited.has(`${newRow},${newCol}`)) {
                neighbors.push([newRow, newCol]);
            }
        } else {
            plotData.edges.push(`${newRow},${newCol}`);
        }
    }

    return neighbors;
};

const findPlot = (matrix, row, col, visited, plotData) => {
    plotData.area++;
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
                    area: 0,
                    edges: [],
                };

                findPlot(data, rowIdx, colIdx, visited, plotData);
                cost += plotData.area * plotData.edges.length;
            }
        });
    });

    return cost;
};

const part2 = () => {
    const data = getData(2);
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
