const part1Data = {
    sample: `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`,
    answer: 6,
};

const part2Data = {
    sample: ``,
    answer: 16,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;

    const [towels, designs] = input.split("\n\n");
    return {
        towels: towels.split(", "),
        designs: designs.split("\n"),
    };
};

const possibleDesigns = new Set();

const findDesign = (design, leftDesign, towels) => {
    if (leftDesign === "") {
        possibleDesigns.add(design);
    }

    if (possibleDesigns.has(design)) {
        return;
    }

    towels.forEach((towel) => {
        if (leftDesign.startsWith(towel)) {
            return findDesign(design, leftDesign.substr(towel.length), towels);
        }
    });
};

const part1 = () => {
    const { towels, designs } = getData(1);
    designs.forEach((design) => {
        findDesign(design, design, towels);
    });

    return possibleDesigns.size;
};

const part2 = () => {
    //
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
