# Nebbula Tree module

This is part of Nebbula project. Use it to transform nodes in tree. Similar to [visitor](https://github.com/Nebbula/nebbula-visitor), but methods can return a value to replace the node being processed.

## API

```javascript
var Tree = require('tree-transformer');
var nodes = [
	{ type: 'number', value: 1 },
	{ type: 'string', value: 'abc', quote: '"' }
];

function MyTree() {}
MyTree.prototype = new Tree();

MyTree.prototype.visit_node = function (node) {
	 return node.value;
};

new MyTree().visit(nodes); // nodes now equals to [1, 'abc']
```

Replacing only happens when visit an array of nodes.

Some returned values have special meanings:

* `null` - remove the node
* `undefined` - do nothing to the node
* an array of nodes - replace the node with the array of nodes. The result array is flattened.

	```javascript
	var Tree = require('tree-transformer');
	var nodes = [
		{ type: 'number', value: 1 }
		{ type: 'number', value: 3 }
	];

	function MyTree() {}
	MyTree.prototype = new Tree();

	MyTree.prototype.visit_number = function (number) {
	   return [number.value, number.value + 1];
	};

	new MyTree().visit(nodes); // nodes now equals to [1, 2, 3, 4]
	```
* others - replace the node with the value

When visiting a single node, `visit(node)` returns the returning value of the corresponding method, unless it's `undefined`, in which case the original node will be returned.

When visiting an array of nodes, the result array will be returned.