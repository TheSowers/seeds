import edgeJSON from './edges.json';
import stationJSON from './stationMap.json';
import { Stack } from './stack';

type stationsData = typeof stationJSON;
export type stationKey = keyof stationsData;
export type station = {
	name: string;
	code: stationKey;
	line_num: string;
};

export type edge = {
	connect: [stationKey, stationKey];
	distance: number;
	leadTime: number;
};

export type route = {
	station?: station;
	leadTime: number;
	edge?: edge;
};

const stationMap = new Map(Object.entries(stationJSON)) as Map<stationKey, station>;
const stations = Object.entries(stationJSON).map((s) => s[1]) as station[];
const edges = edgeJSON.edges as edge[];

export const Station = {
	getByCode(code: stationKey) {
		return stationMap.get(code);
	},

	getByName(name: string, lineNum: string) {
		return stations.find((v) => v.name == name && v.line_num == lineNum);
	}
};

export const Edge = {
	getByCode(code: stationKey, except?: stationKey) {
		const links = edges.filter(({ connect }) => connect.includes(code));

		if (except) {
			return links.filter(({ connect }) => !connect.includes(except));
		} else {
			return links;
		}
	},

	getCounter(departure: stationKey, edge: edge) {
		return edge.connect.find((s) => s != departure);
	}
};

export const toRoute = (departure: stationKey, edge: edge): route => {
	const counterCode = Edge.getCounter(departure, edge);

	return {
		station: counterCode ? Station.getByCode(counterCode) : undefined,
		leadTime: edge.leadTime,
		edge: edge
	};
};

export const getRoutes = (
	stack: Stack,
	departure: stationKey,
	arrival: stationKey,
	selection: Array<number>
) => {
	stack.push({ station: Station.getByCode(departure), leadTime: 0, edge: undefined });

	while (stack.peek()?.station?.code !== arrival) {
		const dep = stack.peek()?.station?.code;
		const last = stack.last()?.station?.code;

		if ((stack.size() > 1 && dep == departure) || !dep) {
			return new Stack();
		} else {
			let edges = Edge.getByCode(dep);

			if (last) {
				edges = edges.filter(({ connect }) => !connect.includes(last));
			}

			if (edges.length == 0) return new Stack();
			else if (edges.length == 1) stack.push(toRoute(dep, edges[0]));
			else {
				const idx = selection.shift();
				if (idx == undefined) throw Error('selection index error');
				if (idx > edges.length - 1) return new Stack();
				const edge = edges[idx];
				stack.push(toRoute(dep, edge));
			}
		}
	}

	return stack;
};

const cases = [
	[0, 0, 0],
	[0, 1, 0],
	[0, 0, 1],
	[0, 1, 1],
	[0, 2, 0],
	[0, 2, 1],
	[0, 2, 2],
	[0, 0, 2],
	[0, 2, 1],
	[1, 0, 0],
	[1, 1, 0],
	[1, 0, 1],
	[1, 1, 1],
	[1, 2, 0],
	[1, 2, 1],
	[1, 2, 2],
	[1, 0, 2],
	[1, 2, 1],
	[2, 0, 0],
	[2, 1, 0],
	[2, 0, 1],
	[2, 1, 1],
	[2, 2, 0],
	[2, 2, 1],
	[2, 2, 2],
	[2, 0, 2],
	[2, 2, 1]
];

const getOptimizeRoute = (departure: stationKey, transfer: stationKey) => {
	return cases
		.map((c) => getRoutes(new Stack(), departure, transfer, c))
		.filter((s) => s.size())
		.reduce((acc, routes) => {
			if (!acc.size()) return routes;
			else {
				return acc.size() > routes.size() ? routes : acc;
			}
		}, new Stack());
};

export default getOptimizeRoute;
