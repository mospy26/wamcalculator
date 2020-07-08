var fs = require('fs');
const { argv } = require('process');

var lineRegex = RegExp("^[a-zA-Z]{4}[1-9][0-9]{3}[ \t]*=[ \t]*0*(?:[1-9][0-9]?|100)[,]{0,1}[1-9]{0,2}$")

function readTextFile(filename) {
    const data = fs.readFileSync(filename, options={encoding:'utf8', flag:'r'})
    const lines = data.split("\n")
    const _ = {}
    lines.forEach((line, index) => {
        line = line.trim()
        if (!lineRegex.test(line)) {
            lines.splice(index, 1)
        }
        else {
            const elements = line.split("=");
            const values = elements[1].split(",")
            _[elements[0].trim()] = { "grade": parseInt(values[0].trim()), "credit": values.length === 1 ? 6 : parseInt(values[1].trim()) }
        }
    });
    return _
}

var getCourseWeight = (course) => parseInt(course.charAt(4)) >= 4 ? 4 : parseInt(course.charAt(4))

function _calculatewam(lines, eih) {
    let totalSum = 0
    let averageWeight = 0
    let currentCourseWeight = 1
    for (course in lines) {
        currentCourseWeight = eih ? getCourseWeight(course) : 1
        if (currentCourseWeight === 1 && eih) continue;
        totalSum += lines[course].credit * lines[course].grade * currentCourseWeight
        averageWeight += lines[course].credit * currentCourseWeight
    }
    return parseFloat(totalSum)/parseFloat(averageWeight)
}

function calculateEihwam(lines) {
    return _calculatewam(lines, true)
}

function calculatewam(lines) {
    return _calculatewam(lines, false)
}

if (argv.length <= 2) {
    console.log("usage: node calculate.js [<file>]\n")
    console.log("See sample_results.txt for more details about the file format")
    return 1
}

var data = readTextFile(argv[2])
console.log("EIH wam is " + calculateEihwam(data))
console.log("Normal wam is " + calculatewam(data))