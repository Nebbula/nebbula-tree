var t = require('nebbula-visitor');

module.exports = Tree;

function Tree() {}
Tree.prototype = new t();

Tree.replaceNode = replaceNode;

Tree.prototype._visitNodes = function (nodes) {
	for (var i = 0; i < nodes.length; i = replaceNode(ret, i, nodes)) {
		var ret = this._visitNode(nodes[i]);
	}
	return nodes;
};

var _visitNode = t.prototype._visitNode;
Tree.prototype._visitNode = function (node) {
	var ret = _visitNode.call(this, node);
	return ret === undefined ? node : ret;
};

function replaceNode(ret, i, nodes) {
	if (ret === null) {
		if (nodes[i] === null) return i + 1
		nodes.splice(i, 1);
		return i;
	}
	if (Array.isArray(ret)) {
		nodes.splice.apply(nodes, [i, 1].concat(ret));
		return i + ret.length;
	}
	if (ret !== undefined) nodes[i] = ret;
	return i + 1;
}