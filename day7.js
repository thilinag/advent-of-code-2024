const part1Data = {
    sample: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
    answer: 3749,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 11387,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split("\n").map((line) => {
        const [value, numbers] = line.split(": ");
        return [Number(value), numbers.split(" ").map(Number)];
    });
};

const calcCombos = (number, value) => {
    return (sum) => {
        // stop caring if sum is already more than test value
        // otherwise create possible combos
        if (sum > value) {
            return [];
        }
        return [sum * number, sum + number];
    };
};

const calcCombos2 = (number, value) => {
    return (sum) => {
        // stop caring if sum is already more than test value
        // otherwise create possible combos
        if (sum > value) {
            return [];
        }
        return [sum * number, sum + number, Number(`${sum}${number}`)];
    };
};

const part1 = () => {
    const data = getData(1);

    const correctEquations = data.filter((line) => {
        const [value, numbers] = line;

        return numbers
            .reduce(
                (acc, cur) => {
                    return acc.flatMap(calcCombos(cur, value));
                },
                [numbers.shift()]
            )
            .includes(value);
    });

    return correctEquations.reduce((acc, [cur]) => acc + cur, 0);
};

const part2 = () => {
    const data = getData(2);

    const correctEquations = data.filter((line) => {
        const [value, numbers] = line;

        return numbers
            .reduce(
                (acc, cur) => {
                    return acc.flatMap(calcCombos2(cur, value));
                },
                [numbers.shift()]
            )
            .includes(value);
    });

    return correctEquations.reduce((acc, [cur]) => acc + cur, 0);
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
