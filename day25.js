const part1Data = {
    sample: `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####
`,
    answer: 0,
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
    const data = input.split("\n\n").map((block) => block.split("\n"));
    const locks = [];
    const keys = [];
    data.forEach((block) => {
        if (block[0] === "#####") {
            const lock = [];
            for (let i = 1; i < 6; i++) {
                block[i].split("").forEach((s, idx) => {
                    lock[idx] =
                        s === "#" ? (lock?.[idx] || 0) + 1 : lock?.[idx] || 0;
                });
            }
            locks.push(lock);
        } else {
            const key = [];
            for (let i = 1; i < 6; i++) {
                block[i].split("").forEach((s, idx) => {
                    key[idx] =
                        s === "#" ? (key?.[idx] || 0) + 1 : key?.[idx] || 0;
                });
            }
            keys.push(key);
        }
    });
    return {
        locks,
        keys,
    };
};

const part1 = () => {
    const { locks, keys } = getData(1);

    let fits = 0;

    locks.forEach((lock) => {
        keys.forEach((key) => {
            if (key.every((col, idx) => col + lock[idx] <= 5)) {
                fits++;
            }
        });
    });

    return fits;
};

const part2 = () => {
    // const data = getData(2);
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
