const part1Data = {
    sample: `125 17`,
    answer: 55312,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 0,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split(" ").map(Number);
};

const part1 = () => {
    const data = getData(1);
    let blink = 0;
    let stones = data;
    while (blink < 25) {
        const newStones = [];
        stones.forEach((stone) => {
            if (stone === 0) {
                newStones.push(1);
            } else if (stone.toString().length % 2 === 0) {
                const stoneString = stone.toString();
                const partOne = stoneString.slice(0, stoneString.length / 2);
                const partTwo = stoneString.slice(
                    stoneString.length / 2,
                    stoneString.length
                );
                newStones.push(Number(partOne), Number(partTwo));
            } else {
                newStones.push(stone * 2024);
            }

            stones = newStones;
        });

        blink++;
    }

    return stones.length;
};

const updateSameStones = (currentStone, stones) => {
    const sameStone = stones.find(
        (stone) => stone.number === currentStone.number
    );
    if (sameStone) {
        sameStone.qty += currentStone.qty;
    } else {
        stones.push(currentStone);
    }
};

const part2 = () => {
    const data = getData(2);

    let blink = 0;
    let stones = data.map((stone) => ({
        number: stone,
        qty: 1,
    }));

    while (blink < 75) {
        const newStones = [];
        stones.forEach((stone) => {
            if (stone.number === 0) {
                updateSameStones({ number: 1, qty: stone.qty }, newStones);
            } else if (stone.number.toString().length % 2 === 0) {
                const stoneString = stone.number.toString();
                const partOne = stoneString.slice(0, stoneString.length / 2);
                const partTwo = stoneString.slice(
                    stoneString.length / 2,
                    stoneString.length
                );
                updateSameStones(
                    { number: Number(partOne), qty: stone.qty },
                    newStones
                );
                updateSameStones(
                    { number: Number(partTwo), qty: stone.qty },
                    newStones
                );
            } else {
                updateSameStones(
                    { number: stone.number * 2024, qty: stone.qty },
                    newStones
                );
            }

            stones = newStones;
        });

        blink++;
    }

    return stones.reduce((acc, cur) => acc + cur.qty, 0);
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
