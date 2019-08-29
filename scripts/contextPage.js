console.log("Info Page Scripts Have Been Loaded");
$('#queryText').text(localStorage.queryBox);

const searchUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=5&srsearch=";

var searchTerm = localStorage.queryBox;

searchTerm = searchTerm.split(' ').join("%20");
searchTerm = searchTerm.split('&').join("%26");
searchTerm = searchTerm.split('-').join("%2D");
searchTerm = searchTerm.split('!').join("%21");
searchTerm = searchTerm.split('\'').join("%27");

let url = searchUrl + searchTerm;

const endpoint = url;

console.log(endpoint);

var results;

fetch(endpoint)
.then(response => response.json())
.then(data => {
//console.log(data);
results = data.query.search;
//console.log(results);
//localStorage.snippetText = results[0].snippet;

//print titles to the console
for(i = 0 ; i < results.length; i++){
  console.log(results[i].title);
};
//only fill the conatiners for which there exists a search result
if(results.length > 0 ){
  $('#block1').text(results[0].title);
} else {
  $("#contextBlock1").text("No results Found, Please Change You Search Term");
}
if(results.length > 1){
  $('#block2').text(results[1].title);
} else {
  $("#contextBlock2").remove();
}
if(results.length > 2){
  $('#block3').text(results[2].title);
} else {
  $("#contextBlock3").remove();
}
if(results.length > 3){
  $('#block4').text(results[3].title);
} else {
  $("#contextBlock4").remove();
}
if(results.length > 4){
  $('#block5').text(results[4].title);
} else {
  $("#contextBlock5").remove();
}
//
})
.catch(() => console.log('An error occurred'));

window.onload=function(){
  document.addEventListener('click', function(event) {handler(event)});
}

function handler(event) {
		
  if (!event.target.id.startsWith("block")) {
    return;
  }
  
  console.log("title = " + event.target.textContent);
  localStorage.title = event.target.textContent;
  window.location.href = "detailsPage.html";
}

console.log("The last line has been run");
