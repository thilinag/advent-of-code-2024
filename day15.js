const part1Data = {
    sample: `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`,
    answer: 10092,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 9021,
};

const directions = [
    [-1, 0], // top
    [0, 1], // right
    [1, 0], // bottom
    [0, -1], // left
];

const moveOrder = ["^", ">", "v", "<"];

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    const [warehouse, moves] = input.split("\n\n");
    return {
        warehouse: warehouse.split("\n").map((line) => line.split("")),
        moves: moves.split("\n").join("").split(""),
    };
};

const move = (row, col, warehouse, moves) => {
    let currentRow = row;
    let currentCol = col;

    while (moves.length) {
        // warehouse.forEach((row, rowIdx) => {
        //     console.log(row.join(""));
        // });
        // console.log("");
        const move = moves.shift();
        const moveIdx = moveOrder.indexOf(move);
        const [nextRow, nextCol] = [
            currentRow + directions[moveIdx][0],
            currentCol + directions[moveIdx][1],
        ];
        const nextTile = warehouse?.[nextRow]?.[nextCol];

        if (nextTile === "#") {
            continue;
        }

        if (nextTile === ".") {
            // update robot pos
            warehouse[currentRow][currentCol] = ".";
            warehouse[nextRow][nextCol] = "@";
            currentRow = nextRow;
            currentCol = nextCol;
            continue;
        }

        if (nextTile === "O") {
            // check if theres space for boxes to be pushed
            let movableBoxes = [];

            while (true) {
                const [nextBoxRow, nextBoxCol] = [
                    currentRow +
                        (movableBoxes.length + 1) * directions[moveIdx][0],
                    currentCol +
                        (movableBoxes.length + 1) * directions[moveIdx][1],
                ];
                const nextBoxTile = warehouse?.[nextBoxRow]?.[nextBoxCol];

                // met a wall or out of bounds
                if (nextBoxTile === "#" || nextBoxTile === undefined) {
                    movableBoxes = [];
                    break;
                }

                // keep searching for an empty space
                if (nextBoxTile === "O") {
                    movableBoxes.push([nextBoxRow, nextBoxCol]);
                    continue;
                }

                // found an empty space, break out and do the moves
                if (nextBoxTile === ".") {
                    break;
                }
            }

            if (movableBoxes.length) {
                // move boxes
                movableBoxes.forEach(([boxX, boxY]) => {
                    warehouse[boxX + directions[moveIdx][0]][
                        boxY + directions[moveIdx][1]
                    ] = "O";
                });
                // update robot pos
                warehouse[currentRow][currentCol] = ".";
                warehouse[nextRow][nextCol] = "@";
                currentRow = nextRow;
                currentCol = nextCol;
            }
            continue;
        }
    }
};

const part1 = () => {
    const { warehouse, moves } = getData(1);

    warehouse.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
            if (col === "@") {
                move(rowIdx, colIdx, warehouse, moves);
            }
        });
    });

    let gpsSum = 0;

    warehouse.forEach((row, rowIdx) => {
        console.log(row.join(""));
        row.forEach((col, colIdx) => {
            if (col === "O") {
                gpsSum += 100 * rowIdx + colIdx;
            }
        });
    });
    return gpsSum;
};

const move2 = (row, col, warehouse, moves) => {
    let currentRow = row;
    let currentCol = col;

    while (moves.length) {
        // console.log("");
        const move = moves.shift();
        const moveIdx = moveOrder.indexOf(move);
        const [nextRow, nextCol] = [
            currentRow + directions[moveIdx][0],
            currentCol + directions[moveIdx][1],
        ];
        const nextTile = warehouse?.[nextRow]?.[nextCol];

        if (nextTile === "#") {
            continue;
        }

        if (nextTile === ".") {
            // update robot pos
            warehouse[currentRow][currentCol] = ".";
            warehouse[nextRow][nextCol] = "@";
            currentRow = nextRow;
            currentCol = nextCol;
            continue;
        }

        // horizontal
        if (moveIdx === 1 || moveIdx === 3) {
            // check if theres space for boxes to be pushed
            let movableBoxes = [];

            while (true) {
                const [nextBoxRow, nextBoxCol] = [
                    currentRow +
                        (movableBoxes.length + 1) * directions[moveIdx][0],
                    currentCol +
                        (movableBoxes.length + 1) * directions[moveIdx][1],
                ];
                const nextBoxTile = warehouse?.[nextBoxRow]?.[nextBoxCol];

                // met a wall or out of bounds
                if (nextBoxTile === "#" || nextBoxTile === undefined) {
                    movableBoxes = [];
                    break;
                }

                // keep searching for an empty space it its [ or ]
                if (nextBoxTile !== ".") {
                    movableBoxes.push([
                        nextBoxRow,
                        nextBoxCol,
                        warehouse[nextBoxRow][nextBoxCol],
                    ]);
                    continue;
                }

                // found an empty space, break out and do the moves
                break;
            }

            if (movableBoxes.length) {
                // move boxes
                movableBoxes.forEach(([boxX, boxY, boxPart]) => {
                    warehouse[boxX + directions[moveIdx][0]][
                        boxY + directions[moveIdx][1]
                    ] = boxPart;
                });
                // update robot pos
                warehouse[currentRow][currentCol] = ".";
                warehouse[nextRow][nextCol] = "@";
                currentRow = nextRow;
                currentCol = nextCol;
            }
            continue;
        } else {
            // vertical
            let movableBoxes = [];
            let toCheck = [
                [nextRow, nextCol, nextTile],
                nextTile === "["
                    ? [nextRow, nextCol + 1, "]"]
                    : [nextRow, nextCol - 1, "["],
            ];
            movableBoxes = [...toCheck];

            while (true) {
                const nextTiles = toCheck.map(([x, y]) => [
                    x + directions[moveIdx][0],
                    y + directions[moveIdx][1],
                    warehouse?.[x + directions[moveIdx][0]]?.[
                        y + directions[moveIdx][1]
                    ],
                ]);

                // next spot is empty
                if (nextTiles.every(([x, y, t]) => t === ".")) {
                    break;
                }

                // next spot is blocked
                if (nextTiles.some(([x, y, t]) => t === "#")) {
                    movableBoxes = [];
                    break;
                }

                //must be boxes, keep adding to check list
                toCheck = [];
                nextTiles.forEach(([x, y, t]) => {
                    if (t === "]" || t === "[") {
                        movableBoxes.push([x, y, t]);
                    }
                    // add the complete box
                    if (t === "[") {
                        movableBoxes.push([x, y + 1, "]"]);
                        toCheck.push([x, y, t], [x, y + 1, "]"]);
                    }

                    if (t === "]") {
                        movableBoxes.push([x, y - 1, "["]);
                        toCheck.push([x, y, t], [x, y - 1, "["]);
                    }
                });
            }
            if (movableBoxes.length) {
                // move boxes
                movableBoxes
                    .toSorted((a, b) => (moveIdx ? b[0] - a[0] : a[0] - b[0]))
                    .forEach(([boxX, boxY, boxPart]) => {
                        warehouse[boxX][boxY] = ".";
                        warehouse[boxX + directions[moveIdx][0]][
                            boxY + directions[moveIdx][1]
                        ] = boxPart;
                    });
                // update robot pos
                warehouse[currentRow][currentCol] = ".";
                warehouse[nextRow][nextCol] = "@";
                currentRow = nextRow;
                currentCol = nextCol;
            }
            continue;
        }
    }
};

const part2 = () => {
    const { warehouse, moves } = getData(2);
    const newWarehouse = [];

    warehouse.forEach((row) => {
        const line = [];
        row.forEach((col) => {
            if (col === "#") {
                line.push("#", "#");
            }
            if (col === ".") {
                line.push(".", ".");
            }
            if (col === "O") {
                line.push("[", "]");
            }
            if (col === "@") {
                line.push("@", ".");
            }
        });
        newWarehouse.push(line);
    });

    newWarehouse.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
            if (col === "@") {
                move2(rowIdx, colIdx, newWarehouse, moves, true);
            }
        });
    });

    let gpsSum = 0;

    newWarehouse.forEach((row, rowIdx) => {
        console.log(row.join(""));
        row.forEach((col, colIdx) => {
            if (col === "[") {
                gpsSum += 100 * rowIdx + colIdx;
            }
        });
    });
    return gpsSum;
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
