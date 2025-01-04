const part1Data = {
    sample: `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`,
    answer: 2024,
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
    const [values, gates] = input.split("\n\n");
    return {
        values: values
            .split("\n")
            .map((line) => line.split(": "))
            .reduce(
                (acc, [k, v]) =>
                    Object.assign(acc, {
                        [k]: Number(v),
                    }),
                {}
            ),
        gates: gates.split("\n").map((line) => {
            const [input1, gate, input2, _, outputKey] = line.split(" ");
            return { input1, gate, input2, outputKey };
        }),
    };
};

const part1 = () => {
    const { values, gates } = getData(1);

    while (gates.length) {
        const { input1, gate, input2, outputKey } = gates.shift();

        if (values?.[input1] === undefined || values?.[input2] === undefined) {
            // if we still haven't got inputs, push it to the end of gates
            // so we can evaluate later
            gates.push({ input1, gate, input2, outputKey });
        } else {
            // otherwise do the gate operation
            const v1 = values[input1];
            const v2 = values[input2];
            if (gate === "AND") {
                values[outputKey] = v1 & v2;
            }
            if (gate === "XOR") {
                values[outputKey] = v1 ^ v2;
            }
            if (gate === "OR") {
                values[outputKey] = v1 | v2;
            }
        }
    }

    // get all entries starting with z,
    // sort them z00 is the least significant bit
    // convert binary to decimal
    return parseInt(
        Object.entries(values)
            .filter(([k, v]) => k.startsWith("z"))
            .toSorted((a, b) => b[0].localeCompare(a[0]))
            .map((entry) => entry[1])
            .join(""),
        2
    );
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
