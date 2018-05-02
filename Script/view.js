//All function which effect the users view of the page or the page destination is located here.

//This function populates the login screen with runner data if it exists.
function populatelogin() {
    //assigning object values to target elements inner HTML.
    document.getElementById("name").innerHTML = runnerData.firstName + " " + runnerData.surName;
    //assigning object values to target elements inner HTML.
    document.getElementById("TRANUM").innerHTML = runnerData.traNum;
}

//this function is responsible for obtained the race ID of select race from the race model data.
//This function will impacts the view as part of its parent function behaviour.
function getRaceById(id) {
    //for loop which tierates over the model in an attempt to load the same model ID with the race ID.
    for (var i = 0; i < model.length; i++) {
        //assignin variable to models iteration.
        var thisRace = model[i];
        //conditonal check to ensure model and target ID are the same.
        if (thisRace.id == id) {
          //returns the data to the function.
            return thisRace;
        }
    }
}

//Function is responsible for the buidlinnf of the race list inthe HTML.
function displayItemsInRaceList(arr, startloop, numberofel) {
    //Grabs target ID and assigns to variable.
    var table = document.getElementById("raceList");
    //sets inner HTML of target to be blank.
    table.innerHTML = "";
    //loops over maximum value of the array.
    for (var i = startloop; i < startloop + numberofel; i++) {
        //creates elements to populate on each iteration.
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        //Setting cell 1 values.
        cell1.innerHTML = arr[i].race_name;
        var id = arr[i].id;
        //Setting cell 2 values.
        cell2.innerHTML = "&nbsp&nbsp&nbsp&nbsp<a href='#'     id='" + id + "' " + " >Race Detail</a>";
        //identifies which ID has been clicked.
        document.getElementById(id).onclick = getRaceDetail;
    }
}

//Function is responsible for displaying the favourites in the view, it a repurposes version of the above function.
//It just uses a different object and loop scope when it is called.
function displayFavouritesList(arr, startloop, numberofel) {
    //grabs target ID
    var table = document.getElementById("showFavList");
    //sets inner to be blank.
    table.innerHTML = "";
    //loops over maximum value of the array.
    for (var i = startloop; i < startloop + numberofel; i++) {
        //creates elements to populate on each iteration.
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        //Setting cell 1 values.
        cell1.innerHTML = arr[i].race_name;
        var id = arr[i].id;
        //Setting cell 2 values.
        cell2.innerHTML = "Race ID" + id;
        //identifies which ID has been clicked.
    }
}

//This function display the details of the select race.
function displayDetail(race) {
    //grabbing element to populate the output with.
    var element = document.getElementById("detail");
    //setting CSS style on the element.
    element.style.visibility = "visible";
    //Assigning the property value to an elements inner HTML.
    document.getElementById("raceId").innerHTML = race.id;
    //Assigning the property value to an elements inner HTML.
    document.getElementById("raceName").innerHTML = race.race_name;
    //Assigning the property value to an elements inner HTML.
    document.getElementById("raceName").innerHTML = race.date;
    //Assigning the property value to an elements inner HTML.
    document.getElementById("raceDistance").innerHTML = race.racedistance + " yards";
    //Assigning the property value to an elements inner HTML.
    document.getElementById("raceVenueName").innerHTML = race.venue_name;
    //Assigning the property value to an elements inner HTML.
    document.getElementById("raceStart").innerHTML = race.geoloc_start;
    //Assigning the property value to an elements inner HTML.
    document.getElementById("raceEnd").innerHTML = race.geoloc_end;
    //anonymouse function wrapper required here otherwise the add to favourties function is always called.
    document.getElementById("addtofavs").onclick = function(e) {
        //passing in target race into addToFavourites function.
        addToFavourites(race);
    }

}

//Thic function checks to see if the storage of runner data is not undefined.
//It then controls what the user sees on login.
function checkSessionStorage() {
    //obtain variable data for the conditional check below.
    var data = sessionStorage.getItem("runnerData");
    //If runner data is is undefined.
    if (data == undefined) {
        //Remove the next button.
        document.getElementById("next").style.visibility = "hidden";
        //hide the welcome back message.
        document.getElementById("welcomemsg").style.visibility = "hidden";
        //If data is not undefined.
    } else if (data != undefined) {
        //Hide registration Button.
        document.getElementById("register").style.visibility = "hidden";
        //set element height to 0.
        document.getElementById("registermsg").style.height = 0;
        //remove content from the inner node.
        document.getElementById("registermsg").innerHTML = "";
        //calls function to object session storage.
        parseFile();
        //calls function to then populate the correct data on login screen.
        populatelogin();

    }

}
//This function checks the runner data to see if races collection is undefined.
function checkFavourites() {
    //Informing user that races collection is being checked.
    alert("I am checking for favorites");
    //conditional check race collection status.
    if (runnerData.races != "undefined") {
        //assigning the frst name to a variable.
        let name = runnerData.firstName;
        //Alerts user as to wether favourites have been found.
        alert("Welcome Back " + name + " races have been found in your favourites");
        //if favourites have been found found then run this function is ran to take user to race screen.
        loadFavourites();
    }

}

//function controls destination.
function loadRaceScreen() {
    //assigns location object to open new window with target HTML.
    location.assign("races.html");
}

//function controls destination.
function loadFavourites() {
  //assigns location object to open new window with target HTML.
    location.assign("races.html");
}
//function controls destination.
function loadRegistration() {
    //assigns location object to open new window with target HTML.
    location.assign("capturedata.html");
}

//sets detail to not be visible on load and then actions obtaining race data if clicked.
function start() {
    document.getElementById("detail").style.visibility = "hidden";
    setUpRequest();
}
//obtains the target ID of race which detail is to be displayed.
function getRaceDetail(e) {
  //assigns target ID to variable.
    var thisRace = getRaceById(e.target.id);
    //calls function including the target which will then amend the view.
    displayDetail(thisRace);
}

//Function which updates the favourites view.
function passFavsIntoList() {
    //the object which will be iterated over.
    var object = runnerData.races;
    //calling the function to display along with object, start and end.
    displayFavouritesList(object, 0, 100);
}
