// start here

var artDiv = $("#artDiv");
var displayRandomArt = $("#displayRandomArt");
var defaultImg = $("#defaultImg");
var errorImg = $("#errorImg");
var infoDiv = $("#infoDiv");
var appTitle = $("#appTitle");
var musicDiv = $("#musicDiv");
var addMusicMsg = $("#addMusicMsg");
var searchForSongDiv = $("#searchForSong");
var displaySongDiv = $("#displaySongDiv");
var randomArtBtn = $("#randomArtBtn");
var artSearchBar = $("#artSearchBar");
var searchArtBtn = $("#searchArtBtn");
var searchMusicBtn = $("#searchMusicBtn");
var button = $("#button");

// functions to hide/unhide content divs.

function hideInfo() {
    $(infoDiv).html("");
};

function displayInfo() {
    $(infoDiv).removeClass("hidden");
};

function displayMusic() {
    $(musicDiv).removeClass("hidden");
    $(musicSearchBar).removeClass("hidden");
    $(musicDiv).addClass("card-panel hoverable");
    $(addMusicMsg).text("Now add music!");
};

function displayError() {
    $(defaultImg).addClass("hidden");
    $(errorImg).removeClass("hidden");
    var errorMsg = $("<p>").text("Oops! Fetch failed. Roll again!").addClass("description");
    $(infoDiv).append(errorMsg);
};

function displayMusicError() {
    $("#addMusicMsg").html("");
    var errorMsg = $("<p>").text("Oops! Try a different music genre!").addClass("description");
    $("#addMusicMsg").append(errorMsg);
};

//event listener for random art roll button click.
$(randomArtBtn).on("click", function (event) {
    event.preventDefault();
    hideInfo();
    getRandomArt();
    displayMusic();
    console.log("You clicked the button!");
});

// event listener for art search bar submit.
$(artSearchBar).on("submit", function (event) {
    event.preventDefault();
    hideInfo();
    console.log("You clicked the button!");
});

const api_search_url = "https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&q=";

function getSearchedArt() {

    var artSearchTerm = $("#artSearchTerm");

    $(artSearchBtn).on("click", function (event) {
        event.preventDefault();
        hideInfo();
        var userInput = $(artSearchTerm).val().trim();
        localStorage.setItem('Art Selection', userInput);
        $(artSearchTerm).val(localStorage.getItem("artSearchBar"));

        fetch(
            api_search_url + userInput
        )
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data.objectIDs);
                        var objectIdArray = data.objectIDs;
                        var objectID = data.objectIDs[Math.floor(Math.random() * objectIdArray.length)];
                        console.log(objectID);

                        //Call objects endpoint with new unique ID
                        fetch(
                            api_url + objectID
                        )
                            .then(function (response) {
                                if (response.ok) {
                                    response.json().then(function (data) {
                                        if (!(data.primaryImageSmall.length)) {
                                            // $(artSearchBtn).text("Roll again");
                                            displayError();
                                            inputRandomNum--;
                                            fetch(api_url + inputRandomNum)
                                        }
                                        else {
                                            console.log(data.primaryImageSmall);
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
                                    displayError();
                                    console.log("Error: Issue fetching images from Met API.");
                                    inputRandomNum++;
                                }
                            })
                    })
                } // else
            });
        displayMusic();

    });
};

// API call to fetch random Art data and append to page.


const api_url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

var inputRandomNum = Math.floor(Math.random() * 750000) + 1;

function getRandomArt() {

    for (var i = 0; i < 1; i++) {
        fetch(
            api_url + inputRandomNum
        )
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {

                        if (!(data.primaryImageSmall.length)) {
                            // $(randomArtBtn).text("Roll again");
                            displayError();
                            inputRandomNum--;
                            fetch(api_url + inputRandomNum)
                        }
                        else {
                            console.log(data.primaryImageSmall);
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
                    //If there are no images available in the API, randomize from this list of known objects that work
                    console.log("Error: Issue fetching images from Met API; Fetching from Array Instead.")
                    var metObjArray = [200, 201, 202,
                        203, 400, 401, 560, 561,
                        550, 1000, 1001, 1002, 1003,
                        1004, 1005, 1006, 1007,
                        1008, 1009, 1010, 70000,
                        70001, 70002, 70003, 70004,
                        70005, 4000, 4001, 4002, 4003,
                        400000, 400001, 400002, 400003,
                        436952, 436951, 436945, 333813, 436961,
                        436534, 436536];
    
                    var randomArray = metObjArray[Math.floor(Math.random() * metObjArray.length)];
                    fetch(
                        api_url + randomArray
                    )
                      .then(function (response) {
                            response.json().then(function (data) {
                                $(displayRandomArt).html("");

                                var parsedImage = data.primaryImageSmall;
                                var metImg = $('<img>');
                                $(metImg).attr('src', parsedImage);
                                $(displayRandomArt).append(metImg);
                            
                                var artInfo = data.title + ", " + data.artistDisplayName + ", " + data.objectDate;
                                var imgDescription = $("<p>").html(artInfo).addClass("description");
                                $(infoDiv).append(imgDescription);
                              
                })
            })
      
        }
      });
    }
};

// Click listener for music search bar.

$(musicSearchBar).on("submit", function (event) {
    event.preventDefault();
    console.log("You clicked the music button!");
});

// API call to fetch music data.

const musicSearch_api_url = "https://api.mixcloud.com/search/?q=";

function getMusic() {

    var musicSearchTerm = $("#musicSearchTerm");

    $(musicSearchBtn).on("click", function (event) {
        event.preventDefault();
        $(addMusicMsg).text("Search again to change the music!");
      
        var userInput = $(musicSearchTerm).val().trim().toLowerCase();
        console.log(userInput);

        var music_query = musicSearch_api_url + userInput + "&type=cloudcast";
        fetch(music_query)
            .then(function (response) {

               //console.log(response.json.parse);
               if (response.ok) {
                response.json().then(function (data) {
                    // Only pulls the first response
                    var responseKey = data.data[0].key;
                    console.log(data.data[0].key);
                    const musicWidget_api_url = "https://api.mixcloud.com"+responseKey+"embed-json/";
                    console.log(musicWidget_api_url);

                    fetch(musicWidget_api_url)
                    .then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log(data);
                          var songEmbed = (data["html"]);
                          console.log(songEmbed);

                          $(displaySongDiv).html("");
                          $(displaySongDiv).append(songEmbed).append(button);

                       
                        })
                    } else {"Error getting Widg"}

                })    
        
                })
            }
                else {
                    console.log("Error Fetching Music");
                }
            
            })

});
  
   $(addMusicMsg).removeClass("hidden");
};

getSearchedArt()
getMusic()
