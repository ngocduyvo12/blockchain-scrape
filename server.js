// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var axios = require("axios");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing the latest height and hash ID entry\n" +
            "from blockchain.com/explorer:" +
            "\n***********************************\n");

// Making a request via axios for the blockchain webpage. The page's HTML is passed as the callback's third argument
axios.get("https://www.blockchain.com/explorer").then(function(response) {
  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // With cheerio, find each div-tag with the cpHaON class
  $("div.cpHaON").each(function(i, element) {

    // Save the text of height into the "height" variable
    var height = $(element).find("div.eeHhDu").find("div.gGKOwO").find("a").text();

    // save the text of hash ID into the hash variable
    var hash = $(element).find("div.eeHVwJ").find("div.gGKOwO").find("a").text();

    // Save these results in an object that will be pushed into the results array we defined earlier
    results.push({
      height: height,
      hash: hash
    });
  });

  // Log the first index in result. This correspond to the latest entry.
  console.log(results[0]);
});
