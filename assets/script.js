// start here

var artDiv = $("#artDiv");
var displayRandomArt = $("#displayRandomArt");
var infoDiv = $("#infoDiv");
var musicDiv = $("#musicDiv");
var searchForSongDiv = $("#searchForSong");
var displaySongDiv = $("#displaySongDiv");
var randomArtBtn = $("#randomArtBtn");
var searchArtBtn = $("#searchArtBtn");
var searchMusicBtn = $("#searchMusicBtn");

// functions to hide/unhide content divs.

function hideInfo() {
    $(infoDiv).html("");
};

function unhideInfo() {
    $(infoDiv).removeClass("hidden");
};

function displayMusic() {
    $(musicDiv).removeClass("hidden");
    $(searchForSongDiv).removeClass("hidden");
};


// API CALL 1: fetch random Art data

// on ready (page load), generate random art and append to page.
// function displayRandomImage() {
    // document.onReady 
// }

//event listener for random art roll button click.
$(randomArtBtn).on("click", function(event) {
    event.preventDefault();
    hideInfo();
    displayMusic();
    getRandomArt();
    console.log("You clicked the button!");
    // clear previous art out of div.
// hide info section.
// API call 1.
// append Art to page.
});

// API CALL 2: fetch searched art data

// event listener for art search bar submit.
$(artSearchBar).on("submit", function(event) {
    event.preventDefault();
    hideInfo();
    console.log("You clicked the button!");
});

// API CALL 3: fetch Music data.

// submit listener for music search.
$(musicSearchBar).on("submit", function(event) {
    event.preventDefault();
    console.log("You clicked the button!");

// clear previous music out of div.
// unhide music section.
// API Call 3.
// append music to page.

});

// clear function to remove all data and reset to the title page. Still need to add "trash" section to html
// function clear() {
    // $("#trash").on("click", function () {
    //     $(musicDiv).addClass("hidden");
    //     $(infoDiv).removeClass("hidden");
    //     $(artDiv) - CALL RANDOM ART AND APPEND TO PAGE.
    // });
// }

const api_url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

var inputRandomNum = Math.floor(Math.random() * 750000) + 1;

//Button Loop for Image Capture

function getRandomArt() {

    for (var i = 0; i < 1; i++) {
    fetch(
      api_url+inputRandomNum
     )
     .then(function(response) {
         if (response.ok) {
             response.json().then(function(data) {

            if (!(data.primaryImageSmall.length)) {
               alert("Couldn't Fetch an Image! Please Retry.")
               inputRandomNum--;
               fetch(api_url+inputRandomNum)
               }

             else {
                 
                console.log(data.primaryImageSmall);

                //clear previous art
                   $(displayRandomArt).html("");

                var parsedImage = data.primaryImageSmall;
                var metImg = $('<img>');
                   $(metImg).attr('src', parsedImage);
                   $(displayRandomArt).append(metImg);  

                var artInfo = data.title + ", " + data.artistDisplayName + ", " + data.objectDate;
                var imgDescription = $("<p>").html(artInfo).addClass("description");
                $(infoDiv).append(imgDescription);

                inputRandomNum--;
                  }
              });
         } else { 
             alert("Couldn't Fetch an Image! Please Retry.")
             console.log("Error: Issue fetching images from Met API.")
             inputRandomNum++;
           }
        });    
      }
    }; 