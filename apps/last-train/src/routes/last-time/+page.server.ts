import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

type station = {
	name: string;
	line: string;
	info?: string;
};

type route = {
	station: station;
	time: Date;
};

type result = {
	departure: station;
	arrival: station;
	lastTime: Date;
	routes: Array<route>;
};

const test = {
	departure: {
		name: '강남역',
		line: '2',
		info: '성수행'
	},
	arrival: {
		name: '응암역',
		line: '6',
		info: '응암순환행'
	},
	lastTime: new Date(),
	routes: [
		{
			station: {
				name: '강남역',
				line: '2',
				info: '성수행'
			},
			time: new Date()
		},
		{
			station: {
				name: '역삼역',
				line: '2',
				info: '성수행'
			},
			time: new Date()
		},
		{
			station: {
				name: '합정역',
				line: '2',
				info: '성수행'
			},
			time: new Date()
		},
		{
			station: {
				name: '합정역',
				line: '6',
				info: '응암순환행'
			},
			time: new Date()
		},
		{
			station: {
				name: '응암역',
				line: '6',
				info: '응암순환행'
			},
			time: new Date()
		}
	]
};

const getResult = (departure: string, arrival: string): result => {
	return test;
};

export const load = (async ({ url: { searchParams } }) => {
	const departure = searchParams.get('departure');
	const arrival = searchParams.get('arrival');

	if (!departure || !arrival || departure == '' || arrival == '') {
		throw redirect(302, '/');
	}

	const result = getResult(departure as string, arrival as string);

	return result;
}) satisfies PageServerLoad;
