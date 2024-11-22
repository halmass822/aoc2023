function isAdjacent(targetStart, targetEnd, symbolPosition) {
    return Math.abs(symbolPosition - targetStart) < 2 || Math.abs(symbolPosition - targetEnd < 2) ? true : false;
};

function getNumPositions(line) {
    const nums = [...line.matchAll(/\d+/g)];
    return nums.map((x) => {
        return [x[0], x.index, x.index + x[0].length - 1]; //return part number, index start, index end
    });
}

function getSymbolPositions(line) {
    const symbols = [...line.matchAll(/[^\d.]/g)];
    return symbols.map((x) => {
        return x.index;
    })
}