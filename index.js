const xlsx = require("node-xlsx").default;
const DecisionTree = require("decision-tree");
const source = xlsx.parse("./data.xlsx");

// Read the XLSX file into memory
const keys = source[0].data[0];
const data = source[0].data.slice(1).map((row) => {
	let temp = {};
	for (let i = 0; i < keys.length; i++) {
		if (keys[i] == "gewogen_gemiddelde") {
			continue;
		}

		temp[keys[i]] = row[i];
		if (!row[i] && row[i] !== 0) {
			console.log(`Row ${i} key ${keys[i]} is ${row[i]}`);
		}
	}
	return temp;
});

const trainingData = data.slice(0, 245);
const testData = data.slice(245);

const tree = new DecisionTree(trainingData, "advies", [
	"plaats",
	"naam_vooropleiding",
	"geslacht",
	"was_aanwezig",
	"advies",
	"competenties",
	"capaciteiten",
	"intr_motivatie",
	"extr_motivatie"
]);

console.log("Accuracy: ", tree.evaluate(testData));