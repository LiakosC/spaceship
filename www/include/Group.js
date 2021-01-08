GroupChild = function() {
	this.group = null;
	this.group_id = -1;
	this.group_remove = function() {
		if (this.group_id > -1 && this.group != null) {
			this.group.remove(this);
		}
	}
	this.group_add = function(group) {
		if (this.group != null)
			this.group_remove();
		group.add(this);
	};
};
Group = function() {
	var nextIndex = 0;
	var last = null;
	this.count = 0; // RO
	this.children = {};
	this.add = function(groupChild) {
		this.children[nextIndex] = groupChild;
		groupChild.group_id = nextIndex;
		groupChild.group = this;
		nextIndex++;
		this.count++;
		last = groupChild;
	}
	this.remove = function(groupChild) {
		if (this.hasChild(groupChild)) {
			delete this.children[groupChild.group_id];
			groupChild.group_id = -1;
			groupChild.group = null;
			this.count--;
	}
	}
	this.hasChild = function(groupChild) {
		if (this.children[groupChild.group_id] != null) {
			if (this.children[groupChild.group_id] == groupChild) {
				return true;
			}
		}
		return false;
	}
	this.clear = function() {
		for (var key in this.children) {
			this.children[key].group_id = -1;
			this.children[key].group = null;
		}
		nextIndex = 0;
		this.count = 0;
		last = null;
		this.children = {};
	}
};