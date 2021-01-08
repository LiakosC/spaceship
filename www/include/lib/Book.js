

/*

2/12/2017

4/12/2017

nice class to switch between app 'pages' or menu 'pages'.
better than phaser state ;)

var menuBook = new Book();
// set your pages
menuBook.pageStart("main", function() {
	var button = ...
	menuBook.pageEnd("main", function() {
		button.destroy();
	});
});
menuBook.pageStart("options", function() {
	var bar = ...
	menuBook.pageEnd("options", function() {
		bar.destroy();
	});
});

// now switch between pages ;)
menuBook.start("main");
menuBook.start("options");
*/

var Book = function() {
	var _pagesStartCallbacks = {};
	var _pagesEndCallbacks = {};
	
	// SET PAGE FUNCTIONS INSIDE CODE
	this.pageStart = function(pageKey, callback) {
		_pagesStartCallbacks[pageKey] = callback;
	};
	this.pageEnd = function(pageKey, callback) {
		_pagesEndCallbacks[pageKey] = callback;
	};
	
	// USE START TO SWITCH PAGES
	this.start = function(pageKey) {
		//console.log(pageKey);
		if (_pagesStartCallbacks[pageKey] != null) {
			if (this.page != null) {
				_pagesEndCallbacks[this.page]();
			}
			_pagesStartCallbacks[pageKey]();
			this.page = pageKey;
		}
	};
	this.end = function(pageKey) {
		_pagesEndCallbacks[pageKey]();
		this.page = null;
	}
	this.page = null;
};

