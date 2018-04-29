var model = [];

//requested data object from server.
var racehttp = new XMLHttpRequest();
//Server address to review JSON object.
var raceurl = "https://u0012604.scm.tees.ac.uk/CIS1003/TRARaces/api/races/upcoming.json";
//Function to obtain the race details.
function setUpRequest() {
    racehttp.onreadystatechange = GetRaceList;
    //browser is iopening a web connection with server.
    //initialisation of "lane" to request data.
    racehttp.open("GET", raceurl);
    //sending the request.
    racehttp.send();
}

//Model

function GetRaceList() {
    var start;
    var end;
  //sets conditional criteria which needs to be checked before object is attempted to be returned.
    if (racehttp.readyState == 4 && racehttp.status == 200) {
      //var sets the response data string and parses
        var races = JSON.parse(racehttp.responseText);
        //function called with races parameter passed in.
        buildRacesModel(races);
        //Function called with the MODEL object passed in.
        //When this function is called, the variable which are passed in govern the scope of the loop which
        //iterates the items into the containers.
        displayItemsInRaceList(model, 0,10);
    }
}

// The App Model Region
//function which creates an array for each instance of race object.
function buildRacesModel(arr) {

    for (var i = 0; i < arr.length; i++) {
        var thisRace = new Race(arr[i]);
        //pushing value onto the array.
        model.push(thisRace);
    }
}
//Function which is bound to the race details element.
//grabs race ID and then returns the properties of that race.
function getRaceById(id)
{
  //
    for (var i = 0; i < model.length; i++) {
        var thisRace = model[i];
        if (thisRace.id == id) {
            return thisRace;
        }
    }
}
//This is the instance of the race which is inside each index value of the array.
//Building the object to populate the HTML with.
function Race(inObject) {
    var race = new Object();
    race.id = inObject.id;
    race.date = inObject.date;
    race.racedistance = inObject.distance;
    race.race_name = inObject.race_name;
    race.venue_name = inObject.venue_name;
    race.geoloc_start = inObject.geoloc_start;
    race.geoloc_end = inObject.geoloc_end;
    return race;
}

/// Display Results Region
//THis functions will create the race list fvrom the above instance of the object,
//Barry suggested attempting to return results in sets of 10, this could take place here.
function displayItemsInRaceList(arr, startloop, numberofel) {
  //grabs target ID
    var table = document.getElementById("raceList");
    //sets inner to be blank.
    table.innerHTML = "";
    //loops over maximum value of the array.
    for (var i = startloop; i < startloop + numberofel ; i++) {
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
//function populate the output WITH SPECIFIC RACE DETAILS. In
//container underneath the list of races.
//When this is ran can I also update the runnner OBJ instance to contained the clicked CELL.
function displayDetail(race) {
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
}


// The Control Region
// Ensuring the element is not visible until setuprequest is called.
function start() {
    document.getElementById("detail").style.visibility = "hidden";
    setUpRequest();
}

//refers to the event object itself and
function getRaceDetail(e) {
    var thisRace = getRaceById(e.target.id);
    displayDetail(thisRace); 
}



////////////////////////////////////////ALLL MY STUFFF HERE
////////////Controller
window.onload = function() {
    document.getElementById("30Races").onclick = start; 
    parseFile(); 
}
