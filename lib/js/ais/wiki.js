var wikipedia = require("node-wikipedia");
var _ = require('lomath');
var Promise = require('bluebird');

/*
wikipedia.page.data("Clifford_Brown", { content: true }, function(response) {
	// structured information on the page for Clifford Brown (wikilinks, references, categories, etc.)
});

wikipedia.revisions.all("Miles_Davis", { comment: true }, function(response) {
	// info on each revision made to Miles Davis' page
});

wikipedia.categories.tree(
	"Philadelphia_Phillies",
	function(tree) {
		//nested data on the category page for all Phillies players
	}
);*/

var wikipedia_page = wikipedia.page;
Promise.promisifyAll(wikipedia_page);

var wikipedia_revisions = wikipedia.revisions;
Promise.promisifyAll(wikipedia_revisions);

var wikipedia_categories = wikipedia.categories;
Promise.promisifyAll(wikipedia_categories);

var wiki = {
	page: wikipedia_page,
	revision: wikipedia_revisions,
	categoryTree: wikipedia_categories 
}

module.exports = wiki;