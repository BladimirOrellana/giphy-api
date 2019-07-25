/// <reference path="../typings/globals/jquery/index.d.ts" />

var randon = ['funny','scary','cry','latino','llorar','yes','No','latinos','mexicanos','never'];

var getRandonGif = randon[Math.floor(Math.random() * randon.length)];


var apiUrlOnLoad = "https://api.giphy.com/v1/gifs/search?api_key=jYRhAl1SwRvfrdlGJ11eGLpZGFmHKOS8&q="+getRandonGif+"&limit=1&offset=0&rating=G&lang=en";
$.ajax({
url: apiUrlOnLoad,
method: "GET"

}).then(function(response){
    console.log(response)
    $(".header")
    .css( 
        "background-image", " url("+ response.data[0].images.original.url +")");

})

var names = ["funny","scary", "yes"];
var userInput;
var template ;

// SEARCH FOR GIF FUNCTION
function showGifInfo(){
    $(".git-and-add-container").empty();
    var gifName = $(this).attr("data-name");
    
  
    var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=jYRhAl1SwRvfrdlGJ11eGLpZGFmHKOS8&q="+ gifName +"&limit=10&offset=0&rating=G&lang=en";
$.ajax({
url: apiUrl,
method: "GET"

}).then(function(response){
    console.log(response);
    var gif = response.data;
  
for (var a = 0; a < gif.length; a++){
var newContainer = $("<div >");
newContainer.addClass("newDiv");
var image = $("<img>");
image.attr('src', gif[a].images.original_still.url);
image.attr('src', gif[a].images.original_still.url);
 image.attr('data-still', gif[a].images.original_still.url);
 image.attr('data-animate', gif[a].images.original.url);
 image.attr('data-state', 'still');
 image.attr('data-alt', gif[a].title  );
image.addClass("gif");

newContainer.append(image);






$(".git-container").prepend(newContainer);



}
$(".gif").on('click', function(){

    var state = $(this).attr('data-state');
    var still = $(this).attr('data-still');
    var animate = $(this).attr('data-animate');

    if(state === "still"){
       $(this).attr('src', animate);
       $(this).attr('data-state', 'animate');

    }else{
        $(this).attr('src', still);
        $(this).attr('data-state', 'still'); 
    }
})
//GET SINGLE GIF
getSingleGif()
})


}
//CHECK IF STATE IS STILL OR ANIMATE


   

//GET USER INPUT FUNCTION
function renderButtons(){

    $(".buttons-container").empty();

for (var i = 0; i < names.length; i++){
  var newButton = $("<button>");
  newButton.addClass("btn btn-small btn-gainsboro get-gif");
  newButton.attr("data-name", names[i]);
  newButton.html(names[i])
  $(".buttons-container").append(newButton);

 }

 

    
}

function addNewButton(){
   

$("#button").on('click', function(event){
    event.preventDefault();
    var gifName = $("#addNewGif").val().trim();
   
    if(gifName === ""){
        $("#addNewGif").css("border", "1px solid red");
        $(".page-title").html("Input is Empty!");
    }else{
        names.push(gifName);
        renderButtons();
        $("#addNewGif").css("border", "none");
        $(".page-title").html("Add Another Gif");
        $('#addNewGif').val('');
        $('#addNewGif').attr('placeholder', "Add Another Gif");
       
    }
    
    
    
    

})

}

//GET SINGLE GIF FUNTION
function getSingleGif(){
    $(".newDiv").on('click', function(){
        var gifName = $(this).attr("data-id");
        
      
        var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=jYRhAl1SwRvfrdlGJ11eGLpZGFmHKOS8&q="+ gifName +"&limit=1&offset=0&rating=G&lang=en";
    $.ajax({
    url: apiUrl,
    method: "GET"
    
    }).then(function(response){
        console.log(response)
    
    })
        
    })  
}
addNewButton()

//DOCUMENT ON CLICK 
$(document).on('click',".get-gif", showGifInfo);


renderButtons();
