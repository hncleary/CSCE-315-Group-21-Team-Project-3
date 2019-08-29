// a check to make sure that this javascript file has been loaded
//use f12 in chrome to view console
console.log("The additional script file has been loaded as tagged");
console.log("You queried for: " +  localStorage.queryBox + ".");
localStorage.setItem('buttonclicks', '0');


$("button").click(function(){
  //$("p").css("color", "red");
  localStorage.setItem('buttonclicks', parseInt( localStorage.getItem('buttonclicks') ) + 1 );
  console.log("The button has been clicked " + localStorage.getItem('buttonclicks') + " times.");

  //Get
  //localStorage.queryBox = "";
  var queryText = $('#queryBox').val();
  localStorage.queryBox = $('#queryBox').val();
  console.log(localStorage.queryBox);
  window.location.href = "contextPage.html";




});
