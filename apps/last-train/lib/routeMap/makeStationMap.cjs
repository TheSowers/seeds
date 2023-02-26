const raw = require('./assets/stations.json');
const fs = require('fs');
const path = require('path');

let make = () => {
	const nodes = raw.DATA.map((s) => {
		return {
			name: s.station_nm,
			code: s.station_cd,
			line_num: s.line_num
		};
	});

	const map = new Map();

	nodes.forEach((node) => {
		map.set(node.code, node);
	});

	fs.writeFileSync(
		path.join(__dirname, './stationMap.json'),
		JSON.stringify(Object.fromEntries(map))
	);
};

make();
