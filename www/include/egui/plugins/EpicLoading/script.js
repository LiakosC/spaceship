/*
var loading = new egui.EpicLoading($("#window")[0]);
loading.setProgress(0.5);
loading.setProgress(loading.progress + 0.1);
if (loading.progress == 1) {
	
}
*/



egui.EpicLoading = function(container) {
	egui.EGUIObject.call(this, container);
	var THIS = this;
	
	this.element = $("<div>", {
		html: '\
			<div class="title">title</div>\
			<div class="subtitle">subtitle</div>\
			<div class="overbar">overbar</div>\
			<div class="bar">\
				<div style="width:0%;"></div>\
			</div>\
			<div class="underbar">underbar</div>\
		', class: "EpicLoading"
	}).appendTo(container)[0];
	
	this.title = this.element.querySelector(".title");
	this.subtitle = this.element.querySelector(".subtitle");
	this.overbar = this.element.querySelector(".overbar");
	this.bar = this.element.querySelector(".bar");
	this.progressBar = this.element.querySelector(".bar > div");
	this.underbar = this.element.querySelector(".underbar");
	
	this.progress = 0;
	this.setProgress = function(coef /*0-1*/) {
		if (coef < 0) {coef = 0;} else if (coef > 1) {coef = 1;}
		this.progress = coef;
		this.progressBar.style.width = (coef * 100) + "%";
	};
};
egui.EpicLoading.prototype = Object.create(egui.EGUIObject.prototype);
egui.EpicLoading.prototype.constructor = egui.EpicLoading;
egui.EpicLoading.ROOT = egui.ROOT + "/EpicLoading";