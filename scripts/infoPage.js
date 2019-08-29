$('#queryText').text(localStorage.queryBox);
console.log("Info Page Scripts Have Been Loaded");

const textSearchUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext=1&exlimit=1&exintro=1&origin=*&titles="
const imageSearchUrl = "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&origin=*&titles="

//const input = document.querySelector('placeholder').value;
//let url = searchUrl + localStorage.queryBox;

var pageTitle = localStorage.title;

$('#queryText').text(pageTitle);

pageTitle = pageTitle.split(' ').join("%20");
pageTitle = pageTitle.split('&').join("%26");
pageTitle = pageTitle.split('-').join("%2D");
pageTitle = pageTitle.split('!').join("%21");
pageTitle = pageTitle.split('\'').join("%27");

var originalArticle = "https://en.wikipedia.org/wiki/" + pageTitle;
$("#wikipediaLogoLink").attr("href", originalArticle);

let textUrl = textSearchUrl + pageTitle;
let imageUrl = imageSearchUrl + pageTitle;
const textEndpoint = textUrl;
const imageEndpoint = imageUrl;

console.log(textEndpoint);
console.log(imageEndpoint);

var infoText;
var pageImage;

fetch(textEndpoint)
.then(response => {
  if (!response.ok) {
	throw new Error(response.status);
  }
  return response.json();
})
.then(data => {
  console.log(data)
  let dat1 = data.query;
  let dat2 = dat1[Object.keys(dat1)[0]];
  let dat3 = dat2[Object.keys(dat2)[0]];
  infoText = dat3.extract;

  infoText = infoText.replace(/\r?\n/g, '<br/><br/>');
  infoText = infoText.replace("(locally  (listen)) ", "");
  infoText = infoText.replace(", listen ", "");

  console.log(infoText)

  document.getElementById('queryTextSnippet').innerHTML = infoText;

})
.catch(error => console.log(error));

fetch(imageEndpoint)
.then(response => {
  if (!response.ok) {
	throw new Error(response.status);
  }
  return response.json();
})
.then(data => {
  console.log(data)
  let dat1 = data.query;
  let dat2 = dat1[Object.keys(dat1)[0]];
  let dat3 = dat2[Object.keys(dat2)[0]];
  pageImage = dat3.original.source;
  console.log(pageImage);
  $("#image1").attr("src", pageImage);
  $('#image1').not('[src]').remove();

  document.querySelectorAll('img').forEach(function(img){
  	img.onerror = function(){this.style.display='none';};
   })
  //add image to html div, later probably

})
.catch( function () {
  error => console.log(error);
  $('#imageBox1').remove();
});


if ($("#image1").attr(src="") == "") {
  console.log("No image was present.");
  $("#image1").hide();
}
else {
  console.log("An image was found.");
  $("#image1").show();
}


console.log("The last line has been run");
