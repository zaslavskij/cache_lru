const { LinkedList } = require("../linked_list");

class CacheLRU {
	constructor(limit = 10) {
		this.limit = limit;
		this.list = new LinkedList();
	}
	addValue(val) {
		const overflow = this.isOverflow();
		if (!overflow) {
			this.list.addData(val);
		}
	}
	isOverflow() {
		return this.limit <= this.list.count;
	}
}

/* ******* */
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

console.log(c.list);

module.exports.CacheLRU = CacheLRU;
