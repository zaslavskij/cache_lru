class Node {
	constructor(data, next) {
		this.data = data;
		this.next = next;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.count = 0;
	}
	addData(data) {
		this.count += 1;
		this.head = new Node(data, this.head);
	}
	removeData(data) {
		let prev = null;
		let currNode = this.head;

		while (currNode) {
			if (currNode.data === data) {
				this.count -= 1;
				if (prev) {
					prev.next = currNode.next;
				} else {
					this.head = currNode.next;
				}
			} else {
				prev = currNode;
			}
			currNode = currNode.next;
		}

		return this.head;
	}
}

module.exports.Node = Node;
module.exports.LinkedList = LinkedList;
