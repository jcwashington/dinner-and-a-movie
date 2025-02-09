//zip-code api call
var zipCodeBaseURL = "https://api.openweathermap.org/geo/1.0/zip?zip=";
var zipAPIKey = "c26d4f483a9680cf07042618df1ef271";
var format = 'json';
var zipCode = '';
var units = 'degrees';
var searchInput = document.getElementById('searched-zipcode');//gets user input from html
var lat;
var lon;
var userSearchHistory = [];


// local storage
var storedUserSearchHistory = localStorage.getItem('user-search-history');
if (storedUserSearchHistory) {
    userSearchHistory = JSON.parse(storedUserSearchHistory);
}
createHistoryButtons();

function createHistoryButtons() {
    var userSearchButtons = document.getElementById("user-search-buttons");
    userSearchButtons.innerHTML = '';
    for (var i = 0; i < userSearchHistory.length; i++) {
        var historyButton = document.createElement("button");
        historyButton.classList.add('btn');
        historyButton.classList.add("history-btn");
        historyButton.textContent = userSearchHistory[i];
        historyButton.addEventListener("click", getSearchButtonZipCode);
        historyButton.setAttribute("style", "margin: 5px; padding: 3px");
        userSearchButtons.append(historyButton);
    }
}

function getSearchButtonZipCode(e) {
    e.preventDefault();
    searchInput.value = this.textContent;
    fetchZipCodeData();
}


//function fetches zip code API   

function fetchZipCodeData() {
    searchString = zipVerify(searchInput.value);
    if (searchString) {
        if (!userSearchHistory.includes(searchString)) {
            userSearchHistory.push(searchString);
            localStorage.setItem('user-search-history', JSON.stringify(userSearchHistory));
            createHistoryButtons();
        }
        zipCode = searchString;
        var url = zipCodeBaseURL + zipCode + "&appid=" + zipAPIKey;

        fetch(url).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (!data) {
                console.error("No response from server, check request.");
            } else {
                printZipApiOutput(data);
            }
        }).catch(function (err) {
            console.error(err);
        });
    } else {
        console.error("This is not valid zip-code.");
    }
}


function printZipApiOutput(data) {
    console.log(data);
    lat = data.lat;
    lon = data.lon;
    fetchRestaurantAPI();
    getNearbyTheater(); 
}



function zipVerify(zip) {
    const regex =  new RegExp('\\d{5}'); //this tests that for searchString user entered 5 digits
    if (regex.test(zip)) {
        return zip;
    } else {
        return '';
    }
}