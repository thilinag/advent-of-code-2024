const part1Data = {
    sample: `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`,
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
    for (let i = 0; i < 4; i++) {
        const newRow = row + directions[i][0];
        const newCol = col + directions[i][1];

        if (matrix?.[newRow]?.[newCol] === plant) {
            if (!visited.has(`${newRow},${newCol}`)) {
                neighbors.push([newRow, newCol]);
            }
        } else {
            // part 1
            // plotData.edges.push(`${newRow},${newCol}`);
            // part 2, save direction as well
            plotData.edges.push(`${i}|${newRow},${newCol}`);
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

                // console.log(plotData.edges);
                const topEdges = new Set();
                const rightEdges = new Set();
                const bottomEdges = new Set();
                const leftEdges = new Set();

                if (col === "E") {
                    console.log(plotData.edges);
                }
                const corners = new Set();

                plotData.edges.forEach((edge) => {
                    const [edgeDirection, edgeCoords] = edge.split("|");
                    // console.log({ edgeDirection });
                    const [eR, eY] = edgeCoords.split(",");
                    // console.log({ eR, eY });
                    for (let i = 0; i < 4; i++) {
                        const newRow = Number(eR) + directions[i][0];
                        const newCol = Number(eY) + directions[i][1];

                        const key = `${newRow},${newCol}`;
                        console.log({ key });

                        if (
                            
                        ) {
                            corners.add(edgeCoords);
                        }
                    }

                    // //top
                    // if (edge.startsWith("0|")) {
                    //     topEdges.add(edge.split("|")[1].split(",")[0]);
                    // }
                    // //right
                    // if (edge.startsWith("1|")) {
                    //     if (col === "E") {
                    //         console.log(edge);
                    //     }
                    //     rightEdges.add(edge.split("|")[1].split(",")[1]);
                    // }
                    // //bottom
                    // if (edge.startsWith("2|")) {
                    //     bottomEdges.add(edge.split("|")[1].split(",")[0]);
                    // }
                    // //left
                    // if (edge.startsWith("3|")) {
                    //     leftEdges.add(edge.split("|")[1].split(",")[1]);
                    // }
                });

                console.log({ col, corners });

                // console.log({
                //     col,
                //     topEdges,
                //     rightEdges,
                //     bottomEdges,
                //     leftEdges,
                // });

                // cost +=
                //     plotData.area *
                //     (topEdges.size +
                //         rightEdges.size +
                //         bottomEdges.size +
                //         leftEdges.size);
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
