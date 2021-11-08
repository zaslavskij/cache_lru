const { LinkedList } = require('../linked_list');

class CacheLRU {
	constructor(limit = 10) {
		this.limit = limit;
		this.list = new LinkedList();
		this.map = new Map();
	}

	write(key, data) {
		const overflow = this.isOverflow();
		if (overflow) {
			this.map.delete(this.list.tail.key);
			this.list.trimTail();
		}

		const obj = this.list.addData(key, data);

		this.map.set(key, obj);
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
		return this.limit <= this.list.count;
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
