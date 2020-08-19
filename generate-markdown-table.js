const _ = require('lodash');

/**
 * Generates a markdown ready table.
 * 
 * @param {data[]} rows array of data rows.
 *
 * EXAMPLE: 
 * 
 * [
 * 		{ headerOne: 'value', headerTwo: 'value2', headerThree: 'someMore-data', ...},
 * 		{ headerOne: 'value', headerTwo: 'value2', headerThree: 'someMore-data', ...},
 * ]
 */
module.exports = function generateMarkdownTable(rows, padding = 1) {
	const maxLengthCols = longestLengthInCols(rows);
	const colLengths = Object.values(maxLengthCols);

	const headerRow = buildRow(buildHeaders(rows[0], maxLengthCols), padding);
	const dividerRow = buildRow(buildDividers(colLengths), padding);
	
	const dataRows = rows.reduce((all, row) => {
		const cells = Object.entries(row).map(([key, data]) => (
			buildCell(data, maxLengthCols[key])
		));
		
		all.push(buildRow(cells, padding));
		
		return all;
	}, []);

	return [headerRow, dividerRow, ...dataRows].join('\n');
};

const humanize = str => {
	return _.snakeCase(str).replace('_', ' ');
};

const longest = strings => {
	return [...strings].sort((a, b) => b.length - a.length)[0].length;
};

const longestLengthInCols = rows => {
	// transpose the rows to columns.
	const cols = rows.reduce((all, row) => {
		for (const [key, val] of Object.entries(row)) {
			if (!all[key]) all[key] = [humanize(key)];
			all[key].push(val);
		}
		return all;
	}, {});

	return Object.entries(cols).reduce((all, [key, col]) => {
		if (!all[key]) all[key] = 0;
		
		const colLength = longest(col);
		if (colLength > all[key]) all[key] = colLength;
		
		return all;
	}, {});
};

const buildCell = (data, colLength) => {
	if (!colLength) colLength = data.length;
	return ('' + data).padEnd(colLength, ' ');
};

const buildHeaders = (row, colLengthsByHeader) => {
	const keys = Object.keys(row);
	return keys.map(key => {
		const colLength = colLengthsByHeader[key];
		return buildCell(humanize(key), colLength);
	});
};

const buildDivider = length => {
	const dashes = [];
	for (let i = 0; i < length; i++) dashes.push('-');
	return dashes.join('');
};

const buildDividers = colLengths => {
	const dividerRow = [];
	for (let i = 0; i < colLengths.length; i++) {
		const length = colLengths[i];
		dividerRow.push(buildCell(buildDivider(length)));
	}
	return dividerRow;
};

const buildRow = (cells, padding) => {
	return cells.join('|'.padStart(padding + 1).padEnd(padding + padding + 1));
};
