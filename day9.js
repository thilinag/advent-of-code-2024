const part1Data = {
    sample: `2333133121414131402`,
    // sample: `12345`,
    answer: 1928,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 2858,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== "undefined";

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split("").map(Number);
};

const part1 = () => {
    const data = getData(1);

    const fileSystem = new Map();
    // filesystem data saved as a Map<position, [file, fileLength]>
    data.forEach((fileLength, idx) => {
        fileSystem.set(idx, [idx % 2 === 0 ? idx / 2 : ".", fileLength]);
    });

    let checksumParts = [];
    let moveIndex = fileSystem.size - 1;

    fileSystem.forEach((file, idx) => {
        // if its a gap
        if (idx % 2 === 1) {
            let toMoveLength = file[1];

            while (true) {
                if (moveIndex <= idx) {
                    break;
                }

                const [moveFile, fileLength] = fileSystem.get(moveIndex);

                if (fileLength >= toMoveLength) {
                    // fits the gap
                    checksumParts.push([moveFile, toMoveLength]);
                    fileSystem.set(moveIndex, [
                        moveFile,
                        fileLength - toMoveLength,
                    ]);
                    break;
                } else {
                    // fits the gap partially, keep getting the next file from the back
                    checksumParts.push([moveFile, fileLength]);
                    toMoveLength -= fileLength; // still some space left in the gap
                    fileSystem.delete(moveIndex); // remove the moved file from back
                    moveIndex -= 2; // skip the gap
                }
            }
        } else {
            checksumParts.push(file);
        }
    });

    let checksum = 0;
    let checksumId = 0;
    checksumParts.forEach((item) => {
        for (let i = 0; i < item[1]; i++) {
            checksum += checksumId * item[0];
            checksumId++;
        }
    });

    return checksum;
};

const part2 = () => {
    const data = getData(2);
    let fileSystem = [];
    // filesystem data saved as a {file, length}[]
    data.forEach((length, idx) => {
        fileSystem.push({
            file: idx % 2 === 0 ? idx / 2 : ".",
            length,
        });
    });

    while (true) {
        const fileToMoveIdx = fileSystem.findLastIndex(
            ({ file, checked = false }) => !checked && file !== "."
        );

        // we have no files to check means we are done
        if (fileToMoveIdx < 0) {
            break;
        }

        const { file: moveFile, length: moveLength } =
            fileSystem[fileToMoveIdx];

        const firstGapIdx = fileSystem.findIndex(
            ({ file, length }, idx) =>
                file === "." && moveLength <= length && idx < fileToMoveIdx
        );

        // if there is no suitable gap, skip to the next file
        if (firstGapIdx < 0) {
            fileSystem[fileToMoveIdx].checked = true;
            continue;
        }

        // update gap
        fileSystem[firstGapIdx].length =
            fileSystem[firstGapIdx].length - moveLength;

        // make original location empty
        fileSystem[fileToMoveIdx].file = ".";

        // move to gap
        fileSystem.splice(firstGapIdx, 0, {
            file: moveFile,
            length: moveLength,
            checked: true,
        });

        // draw fileSystem
        // console.log(
        //     fileSystem
        //         .flatMap(({ file, length }) => Array(length).fill(file))
        //         .join("")
        // );
    }

    let checksum = 0;
    let checksumId = 0;
    fileSystem.forEach((item) => {
        for (let i = 0; i < item.length; i++) {
            if (item.file !== ".") {
                checksum += checksumId * item.file;
            }
            checksumId++;
        }
    });

    return checksum;
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
