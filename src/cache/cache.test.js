const { CacheLRU } = require('./index');

const obj1 = { propertyAtObject1: 'some 1 value' };
const obj2 = { propertyAtObject1: 'some 2 value' };
const obj3 = { propertyAtObject1: 'some 3 value' };
const obj4 = { propertyAtObject1: 'some 4 value' };
const obj5 = { propertyAtObject1: 'some 5 value' };

test('Expect an instance  of Class', () => {
	const cache = new CacheLRU();

	expect(cache).toBeInstanceOf(CacheLRU);
});

test('Read value via key', () => {
	const cache = new CacheLRU();

	cache.write('key1', obj1);

	expect(cache.read('key1')).toEqual(obj1);
});

test('Check cache length', () => {
	const cache = new CacheLRU();

	cache.write('key1', obj1);
	cache.write('key2', obj2);
	cache.write('key3', obj3);
	cache.write('key4', obj4);
	cache.write('key5', obj5);

	expect(cache.list.count).toBe(5);
});

test('Check head of list after read cache', () => {
	const cache = new CacheLRU();

	cache.write('key2', obj2);
	cache.write('key3', obj3);
	cache.write('key4', obj4);
	cache.read('key3');

	expect(cache.list.head.key).toBe('key3');
});

test('Check head and tail of list after read cache', () => {
	const cache = new CacheLRU();

	cache.write('key1', obj1);
	cache.write('key2', obj2);
	cache.write('key3', obj3);
	cache.write('key4', obj4);
	cache.write('key5', obj5);

	cache.read('key1');

	expect(cache.list.head.key).toBe('key1');
	expect(cache.list.tail.key).toBe('key2');
});

test('Check cache limit', () => {
	const limit = 3;
	const cache = new CacheLRU(limit);

	cache.write('key1', obj1);
	cache.write('key2', obj2);
	cache.write('key3', obj3);
	cache.write('key4', obj4);
	cache.write('key5', obj5);

	cache.read('key1');

	expect(cache.list.head.key).toBe('key5');
	expect(cache.list.tail.key).toBe('key3');
	expect(cache.list.count).toBe(limit);
});
