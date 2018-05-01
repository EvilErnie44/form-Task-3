//Return the race list.
//Update race details.
//allow usres to add to collection
//populate the login screen with data if availible. 
function populatelogin() {
    document.getElementById("name").innerHTML = runnerData.firstName + " " + runnerData.surName;
    document.getElementById("TRANUM").innerHTML = runnerData.traNum;
}

function getRaceById(id) {
    //
    for (var i = 0; i < model.length; i++) {
        var thisRace = model[i];
        if (thisRace.id == id) {
            //saveRunnerData();
            return thisRace;
        }
    }
}

function displayItemsInRaceList(arr, startloop, numberofel) {
    //grabs target ID
    var table = document.getElementById("raceList");
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
        cell2.innerHTML = "&nbsp&nbsp&nbsp&nbsp<a href='#'     id='" + id + "' " + " >Race Detail</a>";
        //identifies which ID has been clicked.
        document.getElementById(id).onclick = getRaceDetail;
    }
}

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

//Check if user Exists.

function displayDetail(race) {
    console.log(race);
    //grabbing element to populate the output with.
    var element = document.getElementById("detail");
    //setting CSS style on the element.
    element.style.visibility = "visible";
    //associated the elements with the race objects property values.
    document.getElementById("raceId").innerHTML = race.id;
    document.getElementById("raceName").innerHTML = race.race_name;
    document.getElementById("raceName").innerHTML = race.date;
    document.getElementById("raceDistance").innerHTML = race.racedistance + " yards";
    document.getElementById("raceVenueName").innerHTML = race.venue_name;
    document.getElementById("raceStart").innerHTML = race.geoloc_start;
    document.getElementById("raceEnd").innerHTML = race.geoloc_end;

    //anonymouse function wrapper required here!
    document.getElementById("addtofavs").onclick = function(e) {
        addToFavourites(race);
    }

}

function start() {
    document.getElementById("detail").style.visibility = "hidden";
    setUpRequest();
}

function getRaceDetail(e) {
    var thisRace = getRaceById(e.target.id);
    displayDetail(thisRace);
}

function passFavsIntoList() {
    var object = runnerData.races;
    displayFavouritesList(object, 0, 100);
}