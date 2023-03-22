async function main() {
    const shiftChecker = require('./shift-checker.js');

    console.log(await shiftChecker.getShift('now'));
    console.log(await shiftChecker.getShift('next'));
    console.log(await shiftChecker.getEndingTime());
}

main();