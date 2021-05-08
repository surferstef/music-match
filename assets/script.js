// start here

var artDiv = $("#artDiv");
var displayRandomArt = $("#displayRandomArt");
var defaultImg = $("#defaultImg");
var errorImg = $("#errorImg");
var infoDiv = $("#infoDiv");
var appTitle = $("#appTitle");
var musicDiv = $("#musicDiv");
var searchForSongDiv = $("#searchForSong");
var displaySongDiv = $("#displaySongDiv");
var randomArtBtn = $("#randomArtBtn");
var artSearchBar = $("#artSearchBar");
var searchArtBtn = $("#searchArtBtn");
var searchMusicBtn = $("#searchMusicBtn");

// functions to hide/unhide content divs.

function hideInfo() {
    $(infoDiv).html("");
};

function displayInfo() {
    $(infoDiv).removeClass("hidden");
};

function displayMusic() {
    $(musicDiv).removeClass("hidden");
    $(searchForSongDiv).removeClass("hidden");
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
    displayMusic();
    getRandomArt();
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
                    displayError();
                    console.log("Error: Issue fetching images from Met API.")
                    inputRandomNum++;
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

const music_api_url = "https://api.mixcloud.com/search/?q=";

function getMusic() {

    var musicSearchTerm = $("#musicSearchTerm");

    $(musicSearchBtn).on("click", function (event) {
        event.preventDefault();
        var userInput = $(musicSearchTerm).val().trim().toLowerCase();
        console.log(userInput);
                //reveal the iframe where the music will play.
        $("#displaySongEl").removeClass("hidden");
        $("#addMusicMsg").text("Currently listening to:");
        $("#changeMusicBtn").removeClass("hidden");
        $(musicSearchBar).addClass("hidden");

        // var music_query = music_api_url + userInput + "&type=cloudcast";

    //     fetch(music_query)

    //         .then(response => {
    //             console.log(response);

    //             if (response.ok) {
    //                 response.json().then(function (data) {

    //                     if (!(data.url)) {
    //                         console.log("No response from music API for this genre.")
    //                         displayMusicError();
    //                     }

    //                     else {

    //                         console.log(data.url)

    //                         //clear previous music
    //                         $("iframe").attr("src", "");

    //                         var embedMusic = data.url + "embed-html/"
    //                         $("iframe").attr("src", embedMusic);
    //                     }
    //                 });
    //             } else {
    //                 displayMusicError();
    //                 console.log("Error fetching from MixCloud API.")
    //             }
    //         });
    // })
        // .catch(err => {
        //     console.error(err);
        //     console.log("No response from music API for this genre.")
        //     displayMusicError();
        // });
});
};

//click listener for change music button
$("#changeMusicBtn").on("click", function (event) {
    event.preventDefault();
    $("#displaySongEl").addClass("hidden");
        $("#addMusicMsg").text("Add music!");
        $("#changeMusicBtn").addClass("hidden");
        $(musicSearchBar).removeClass("hidden");
});

// clear function to remove all data and reset to the title page. Still need to add "trash" section to html
// function clear() {
// $("#trash").on("click", function () {
//     $(musicDiv).addClass("hidden");
//     $(infoDiv).removeClass("hidden");
//     $(artDiv) - CALL RANDOM ART AND APPEND TO PAGE.
// });
// }

getSearchedArt()
getMusic()