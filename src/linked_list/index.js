class Node {
	constructor(data, key, prev, next) {
		this.data = data;
		this.next = next;
		this.prev = prev;
		this.key = `${key}`;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.countItems = 0;
	}
	addData(key, data) {
		this.countItems += 1;
		const node = new Node(data, key, null, this.head);

		if (!this.head) {
			this.tail = node;
		} else {
			this.head.prev = node;
		}
		this.head = node;

		return node;
	}

	deleteData(node) {
		this.countItems -= 1;

		if (this.head.key === node.key) {
			this.head = node.next;
			this.head.prev = null;
			return;
		}

		if (this.tail.key === node.key) {
			this.tail = node.prev;
			this.tail.next = null;
			return;
		}

		const prevNode = node.prev;
		const nextNode = node.next;

		prevNode.next = nextNode;
		nextNode.prev = prevNode;
	}

	changeHead(node) {
		if (this.head.key === node.key) return;

		if (this.tail.key === node.key) {
			this.tail = this.tail.prev;
			this.tail.next = null;
		}

		const prevNode = node.prev;
		const nextNode = node.next;
		if (prevNode) prevNode.next = nextNode;
		if (nextNode) nextNode.prev = prevNode;

		this.head = { ...node, prev: null, next: this.head };
	}

	trimTail() {
		this.countItems -= 1;
		this.tail = this.tail.prev;
		this.tail.next = null;
	}
}

module.exports.Node = Node;
module.exports.LinkedList = LinkedList;
