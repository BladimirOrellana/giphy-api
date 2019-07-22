/// <reference path="../typings/globals/jquery/index.d.ts" />

var randon = ['funny','scary','cry','latino','llorar'];

var getRandonGif = randon[Math.floor(Math.random() * randon.length)];


var apiUrlOnLoad = "https://api.giphy.com/v1/gifs/search?api_key=jYRhAl1SwRvfrdlGJ11eGLpZGFmHKOS8&q="+getRandonGif+"&limit=1&offset=0&rating=G&lang=en";
$.ajax({
url: apiUrlOnLoad,
method: "GET"

}).then(function(response){
    console.log(response)
    $(".header")
    .css( 
        "background-image", " url("+ response.data[0].images.downsized_large.url +")");

})

var names = ["funny","scary", "surprice"];
var userInput;
var template ;

// SEARCH FOR GIF FUNCTION
function showGifInfo(){
    
    var gifName = $(this).attr("data-name");
    
  
    var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=jYRhAl1SwRvfrdlGJ11eGLpZGFmHKOS8&q="+ gifName +"&limit=10&offset=0&rating=G&lang=en";
$.ajax({
url: apiUrl,
method: "GET"

}).then(function(response){
    console.log(response);
  
for (var a = 0; a < response.data.length; a++){
   
var newContainer = $("<div >");
newContainer.addClass("newDiv");
newContainer.attr("data-id", response.data[a].title );


newContainer.html(`

<p>` + response.data[a].title + `</p>
<video class="gifImage" id=` +response.data[a].id + ` autoplay>
   <source src="`+ response.data[a].images.original.mp4 +`" type="video/mp4">
  
   Your browser does not support the video tag.
</video>

`);

$(".git-and-add-container").prepend(newContainer);



}
//GET SINGLE GIF
getSingleGif()
})


}

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
