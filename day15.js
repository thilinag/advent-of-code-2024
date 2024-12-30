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
    sample: `#######
#...#.#
#.....#
#..OO@#
#..O..#
#.....#
#######

<v`,
    answer: 0,
};

// v<<^^<<^^

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

const move = (row, col, warehouse, moves, part2 = false) => {
    let currentRow = row;
    let currentCol = col;

    while (moves.length) {
        warehouse.forEach((row, rowIdx) => {
            console.log(row.join(""));
        });
        console.log("");
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
                    movableBoxes.push([nextBoxRow, nextBoxCol]);
                    break;
                }
            }

            if (movableBoxes.length) {
                // move boxes
                movableBoxes.forEach(([boxX, boxY]) => {
                    warehouse[boxX][boxY] = "O";
                });
                // update robot pos
                warehouse[currentRow][currentCol] = ".";
                warehouse[nextRow][nextCol] = "@";
                currentRow = nextRow;
                currentCol = nextCol;
            }
            continue;
        }

        if (nextTile === "[" || nextTile === "]") {
            // check if theres space for boxes to be pushed
            let movableBoxes = [];

            if (moveIdx === 1 || moveIdx === 3) {
                while (true) {
                    const next = [
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
                    if (nextBoxTile === "[" || nextBoxTile === "]") {
                        movableBoxes.push([nextBoxRow, nextBoxCol]);
                        continue;
                    }

                    // found an empty space, break out and do the moves
                    if (nextBoxTile === ".") {
                        movableBoxes.push([nextBoxRow, nextBoxCol]);
                        break;
                    }
                }

                if (movableBoxes.length) {
                    // move boxes
                    movableBoxes.forEach(([boxX, boxY]) => {
                        warehouse[boxX][boxY] = "";
                    });
                    // update robot pos
                    warehouse[currentRow][currentCol] = ".";
                    warehouse[nextRow][nextCol] = "@";
                    currentRow = nextRow;
                    currentCol = nextCol;
                }
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

const part2 = () => {
    const { warehouse, moves } = getData(2);
    const newWarehouse = [];

    warehouse.forEach((row, rowIdx) => {
        const line = [];
        row.forEach((col, colIdx) => {
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
                move(rowIdx, colIdx, newWarehouse, moves, true);
            }
        });
    });

    let gpsSum = 0;

    // newWarehouse.forEach((row, rowIdx) => {
    //     console.log(row.join(""));
    //     row.forEach((col, colIdx) => {
    //         if (col === "O") {
    //             gpsSum += 100 * rowIdx + colIdx;
    //         }
    //     });
    // });
    // return gpsSum;

    // console.log(newWarehouse);

    // part 2 code
    // return ;
};

// console.time("part1");
// const part1Answer = part1();
// console.log({ part1: part1Answer });
// console.timeEnd("part1");
// if (!isBrowser)
//     console.assert(
//         part1Answer === part1Data.answer,
//         `${part1Data.answer} expected.`
//     );

console.time("part2");
const part2Answer = part2();
console.log({ part2: part2Answer });
console.timeEnd("part2");
if (!isBrowser)
    console.assert(
        part2Answer === part2Data.answer,
        `${part2Data.answer} expected.`
    );
