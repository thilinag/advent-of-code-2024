const part1Data = {
    sample: `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`,
    answer: 7,
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
    return input.split("\n").map((line) => line.split("-").sort());
};

const part1 = () => {
    const data = getData(1);

    const looped = new Set();

    data.forEach(([c1, c2]) => {
        if (c1.startsWith("t") || c2.startsWith("t")) {
            const leftConnected = data.filter(([c3, c4]) => {
                return c3 !== c1 && c4 !== c1 && c2 === c3;
            });

            const rightConnected = data.filter(([c3, c4]) => {
                return c3 !== c1 && c4 !== c1 && c2 === c4;
            });

            leftConnected.forEach(([_, c6]) => {
                const looping = data.filter(([c7, c8]) => {
                    return (c6 === c7 && c8 === c1) || (c6 == c8 && c1 == c7);
                });

                looping.forEach(([a, b]) => {
                    looped.add([c2, a, b].toSorted().join(","));
                });
            });

            rightConnected.forEach(([c5, _]) => {
                const looping = data.filter(([c7, c8]) => {
                    return (c5 === c7 && c8 === c1) || (c5 == c8 && c1 == c7);
                });

                looping.forEach(([a, b]) => {
                    looped.add([c2, a, b].toSorted().join(","));
                });
            });
        }
    });

    return looped.size;

    // part 1 code
    // return ;
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
