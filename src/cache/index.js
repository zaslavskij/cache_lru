const { LinkedList } = require('../linked_list');

class CacheLRU {
	constructor(limit = 10) {
		this.limit = limit;
		this.list = new LinkedList();
		this.map = new Map();
	}

	write(key, data) {
		const overflow = this.isOverflow();
		const isKeyExists = this.map.has(key);

		if (overflow && !isKeyExists) {
			this.map.delete(key);
			this.list.trimTail();
		}

		if (this.map.has(key)) {
			const node = this.map.get(key);
			this.list.deleteData(node);
			this.map.delete(key);
		}

		const node = this.list.addData(key, data);
		this.map.set(key, node);
	}

	read(key) {
		if (!this.map.has(key)) {
			return null;
		}
		const node = this.map.get(key);

		this.list.changeHead(node);
		return node.data;
	}

	isOverflow() {
		return this.limit <= this.list.countItems;
	}

	clear() {
		this.map = new Map();
		this.list = new LinkedList();
	}
}

/* *******
const cache = new CacheLRU();

async function foo(key) {
  if (!cache.has(key)) {
    const result = await axios(`https://example.com?key=${key}`);
    cache.add(result);
    return result;
  }
  return cache.read(key);
}

const c = new CacheLRU();

*/
module.exports.CacheLRU = CacheLRU;
