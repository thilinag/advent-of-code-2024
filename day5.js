const part1Data = {
    sample: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
    answer: 143,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 123,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    const parts = input.split("\n\n");
    const rules = new Map();
    parts[0]
        .split("\n")
        .map((line) => line.split("|"))
        .forEach(([page1, page2]) => {
            rules.set(page1, [...(rules.get(page1) || []), page2]);
        });
    return {
        rules,
        updatesData: parts[1]?.split("\n").map((line) => line.split(",")),
    };
};

const part1 = () => {
    const { rules, updatesData } = getData(1);

    let sumOfMiddlePage = 0;

    updatesData.forEach((update) => {
        if (
            update.every((page, idx) => {
                if (!rules.get(page)) return true;

                const rule = rules.get(page);
                // check if all rules pages come after the current page
                return rule.every((rule) => {
                    const page2Idx = update.findIndex((page) => page === rule);
                    return idx < (page2Idx < 0 ? Infinity : page2Idx);
                });
            })
        ) {
            // add up middle page numbers
            sumOfMiddlePage += Number(update[Math.floor(update.length / 2)]);
        }
    });

    return sumOfMiddlePage;
};

const part2 = () => {
    const { rules, updatesData } = getData(2);

    let sumOfMiddlePage = 0;

    updatesData.forEach((update) => {
        if (
            // check at least one rule is broken
            update.some((page, idx) => {
                if (!rules.get(page)) return false;

                const rule = rules.get(page);
                return rule.some((rule) => {
                    const page2Idx = update.findIndex((page) => page === rule);
                    return idx > (page2Idx < 0 ? Infinity : page2Idx);
                });
            })
        ) {
            // sort compare function puts a before b if return value is negative
            const correctOrder = update.toSorted((a, b) => {
                if (rules.get(a) && rules.get(a).includes(b)) {
                    return -1;
                }
                return 0;
            });

            // add up middle page numbers
            sumOfMiddlePage += Number(
                correctOrder[Math.floor(correctOrder.length / 2)]
            );
        }
    });

    return sumOfMiddlePage;
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
