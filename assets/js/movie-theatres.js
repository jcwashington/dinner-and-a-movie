var auth = 'FLMPSIT7JM3ehGI0y5MWDZ46eeg00v29';
var theaterName;
var theaterAddress;
var movieCard = $('#movie-API-output');
var theater;



function getNearbyTheater() {
    
    let callURL = "https://api-gate2.movieglu.com/cinemasNearby/?n=24";
    let deviceDt = moment().format();
    var settings = {
        "url": `${callURL}`,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "api-version": "v200",
          "Authorization": "	Basic RkZCVjpFTHlTZHp4dnkzSWI=",
          "Geolocation": `${lat};${lon}`,
          "client": "FFBV",
          "x-api-key": "rRpHd0FSlb1Zy8qwyoJL3WkkBkpAt3i737vbvK0e",
          "device-datetime": `${deviceDt}`,
          "territory": "US",
          "app_version": "V200"
        },
      };

    $.ajax(settings).done(function (response) {
        collectNearbyTheaters(response);
        console.log(response);
      });
    movieCard.text('');//to clear between reshuffles

}

function buildTheaterAddress (theaterInfo){
    var addressPt1 = theaterInfo.address;
    var addressPt2 = theaterInfo.address2;
    var cinemaCity = theaterInfo.city;
    var cinemaState = theaterInfo.state;
    var cinemaZip = theaterInfo.postcode;

    return cinemaAddress = `${addressPt1} ${addressPt2}, ${cinemaCity}, ${cinemaState} ${cinemaZip}`
}

function collectNearbyTheaters (result) {
    console.log(result);
    var randResult = Math.floor(Math.random() * result.cinemas.length);
    theaterInfo = result.cinemas[randResult];

    theaterName = theaterInfo.cinema_name;
    theaterAddress = buildTheaterAddress(theaterInfo);
    renderNearbyTheaters();
    saveRecentCinema(theaterInfo);
}

function renderNearbyTheaters() {

    $('<div id= "nearbyTheater"> </div>').appendTo("#movie-API-output");
    $(`<p id="theaterName"> ${theaterName} </p>`).appendTo("#nearbyTheater");
    $(`<p id="theaterAdd"> ${theaterAddress} </p>`).appendTo("#nearbyTheater");

}

function saveRecentCinema () {
    theater = [{
        "Name": theaterName,
        "Address": theaterAddress
    }];
    localStorage.setItem("theater", JSON.stringify(theater));
}
getNowPlaying();

function getNowPlaying () {
  var settings = {
    "url": "https://api.themoviedb.org/3/movie/now_playing?api_key=e747c9d40c6c39d7c1be526131c0fe31&language=en-US&region=US",
    "method": "GET",
    "timeout": 0,
  };
  $.ajax(settings).done(function (response) {
    collectNowShowing(response);
    console.log(response);
  });
}

function collectNowShowing (showing) {
  var nowShowing = showing.results;
  var randomSelects = [];

  for (let i = 0; i < 5; i++) {
    do {
      n = Math.floor(Math.random() * ((nowShowing.length - 1) + 1)) + 1;
      p = randomSelects.includes(n);
      if(!p){
        randomSelects.push(n);
      }
    }
    while(p);
  }
  console.log(randomSelects);
  var currentlyShowingInTheaters = [];
  randomSelects.forEach(selection => currentlyShowingInTheaters.push(nowShowing[selection]));
  console.log(currentlyShowingInTheaters);
}
