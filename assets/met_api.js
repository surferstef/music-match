const api_url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
var imageGenerator = document.querySelector("#randomArtBtn")
var inputRandomNum = Math.floor(Math.random() * 750000) + 1;



//Button Loop for Image Capture
imageGenerator.addEventListener("click", function() {
  for (var i = 0; i < 1; i++) {
    fetch(
      api_url+inputRandomNum
     )
     .then(function(response) {
         if (response.ok) {
             response.json().then(function(data) {
            if (!(data.primaryImage.length)) {
               alert("Couldn't Fetch an Image! Please Retry.")
               inputRandomNum--;
               fetch(api_url+inputRandomNum)
               }
             else {console.log(data.primaryImage)
                var parsedImage = data.primaryImage
                var displayArtEl = document.querySelector("#displayArt");
                   displayArtEl.innerHTML = "";
                var metImg = document.createElement('img');
                   metImg.setAttribute('src', parsedImage);
                   displayArtEl.appendChild(metImg);  
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
    });  


//if response is empty then iterate


  //inputRandomNum++;

//   var fetchMetImage = fetch(
      
//     api_url+inputRandomNum
  
// )

    // imageGenerator.addEventListener("click", function() {
     
    //          fetchMetImage 
    //         .then(function(response) {
    //           //return response.json();
    //           if (response.ok)
    //        // (response.data.length === 0)
    //           {
    //             response.json().then(function(data) {
    //                console.log(data.primaryImage);
    //             //  displayImage(data.items, primaryImage);
    //            //   console.log(data)
    //             });
    //              //console.log(response.json().primaryImage);
    //             //  var responseString = response.json().toString();
    //             //   var obj = JSON.parse(responseString);
    //             //   console.log(obj.primaryImage);
    //             //  response.json().then(function(data) {
    //             //    // console.log(response.headers.get("primaryImage"));
                    
    //             //     displayImage(data);

    //             //     })
    //               } else { 
    //                   alert("Couldn't Fetch an Image! Please Retry.")
    //                   console.log("Error: Issue fetching images from Met API.")
    //               }
    //         });
    //       });
           
          
    

 
    

            //  displayImage(data.items, primaryImage);
        //   console.log(data)

             //console.log(response.json().primaryImage);
         //  var responseString = response.json().toString();
         //   var obj = JSON.parse(responseString);
         //   console.log(obj.primaryImage);
         //  response.json().then(function(data) {
         //    // console.log(response.headers.get("primaryImage"));
             
         //     displayImage(data);

         //     })


//    imageGenerator.addEventListener("click", function() {
//     for (var i = 0; i < 1; i++) {
//     fetchMetImage 
//    .then(function(response) {
//      //return response.json();
//      if (response.ok)
//   // (response.data.length === 0)
//      {
//        response.json().then(function(data) {
//          if (!(data.primaryImage.length)) {
//            console.log("Ain't Nuthin!")
//            inputRandomNum--;
//          }
//          else {console.log(data.primaryImage)}
//          inputRandomNum--;
//        //  displayImage(data.items, primaryImage);
//       //   console.log(data)
//        });
//          } else { 
//              alert("Couldn't Fetch an Image! Please Retry.")
//              console.log("Error: Issue fetching images from Met API.")
//              inputRandomNum++;
//          }
//    });
//   }
//  });   


          // for (var i = 0; i < 1; i++) {
          //   var inputRandomNum = Math.floor(Math.random() * 750000) + 1;
          //   var fetchImg = fetch(api_url+inputRandomNum);
          //   var displayImg = 
          //       fetchImg
          //       .then(function(response) {
          //         if (response.ok)
          //         // (response.data.length === 0)
          //            {
          //              response.json().then(function(data) {
          //                if (!(data.primaryImage.length)) {
          //                  console.log("Ain't Nuthin!")
          //                  inputRandomNum--;
          //                }
          //                else {console.log(data.primaryImage)}
          //                inputRandomNum--;
  
          //              });

          //                } else { 
          //                    alert("Couldn't Fetch an Image! Please Retry.")
          //                    console.log("Error: Issue fetching images from Met API.")
          //                    inputRandomNum++;
          //                }
          //          });
              
          //     }
          //     console.log(displayImg);


