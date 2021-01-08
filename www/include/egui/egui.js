/*
16/12/2017

// include egui.js

egui.init("path/to/egui/folder");
egui.loadPlugin("Plugin1FolderName");
egui.loadPlugin("Plugin2FolderName");
*/

var egui = {
	EGUIObject: function(parentNode) {
		this.parent = parentNode;
		this.element = null;
		this.displayed = true; // RO
		this.toggle = function(flag) {
			if (flag != null) {
				if (flag) {
					this.element.classList.remove("egui-off");
					this.displayed = true;
				} else {
					this.element.classList.add("egui-off");
					this.displayed = false;
				}
			} else {this.toggle(!this.displayed);}
		};
		this.destroy = function() {
			if (this.element != null) {
				this.parent.removeChild(this.element);
			}
		};
	}
};

egui.ROOT = "egui";

egui.init = function(root) {
	egui.ROOT = root;
	$("<link>", {
		rel: "stylesheet",
		type: "text/css",
		href: egui.ROOT + "/egui.css"
	}).appendTo("head");
}

egui.loadPlugin = function(pluginName) {
	$("<link>", {
		rel: "stylesheet",
		type: "text/css",
		href: egui.ROOT + "/plugins/" + pluginName + "/style.css"
	}).appendTo("head");
	$("<script>", {
		type: "text/javascript",
		async: false,
		src: egui.ROOT + "/plugins/" + pluginName + "/script.js"
	}).appendTo("head");
};