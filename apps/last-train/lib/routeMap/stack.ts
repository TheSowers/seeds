import type { route } from './route';

export class Stack {
	arr: route[];

	constructor() {
		this.arr = [];
	}

	pop() {
		this.arr.pop();
	}

	push(route: route) {
		this.arr.push(route);
	}

	peek() {
		return this.arr.length == 0 ? undefined : this.arr[this.arr.length - 1];
	}

	last() {
		return this.arr.length < 2 ? undefined : this.arr[this.arr.length - 2];
	}

	size() {
		return this.arr.length;
	}

	print() {
		for (const r of this.arr) {
			console.log(r);
		}
	}

	log() {
		console.log(this.arr);
	}
}
