//model
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
        displayItemsInRaceList(model, 0, 100);
    }
}

// model
//function which creates an array for each instance of race object.
function buildRacesModel(arr) {

    for (var i = 0; i < arr.length; i++) {
        var thisRace = new Race(arr[i]);
        //pushing value onto the array.
        model.push(thisRace);

        //local model needs to be update here
        //session storage needs to be updated here.
    }
}

function addToFavourites(race) {
    var id = race.id;
    alert("Race " + id + " has been added for favourites")
    runnerData.races.push(race);
    console.log(runnerData);
    sessionStorage.setItem("runnerData", JSON.stringify(runnerData));

}

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

//Model manages retrieval of JSON
//Managers sessio Storage

//USER OBJECT FOR SESSION Storage

runnerData = {
    title: "",
    firstName: "",
    surName: "",
    gender: "",
    dateOfBirth: "",
    traNum: "",
    races: [] //The favourite races belong inside of me.
}


function storeInLocal(event) {


    event.preventDefault();

    var form = document.getElementById("myForm");

    var rTitle = form.title.value;
    var rFirstName = form.firstName.value;
    var rSurname = form.surName.value;
    var rGender = form.gender.value;
    var rDob = form.dateOfBirth.value;
    // var runnerTitle = form.title.value;

    ///basic Validation of input. 

    if (rTitle == "" || rFirstName == "" || rSurname == "" || rGender == undefined || rDob == "") {

        alert("Please complete all fields");
        return;

    }

    //How to target only the values in a loop?

    runnerData.title = rTitle;
    runnerData.firstName = rFirstName;
    runnerData.surName = rSurname;
    runnerData.gender = rGender;
    runnerData.dateOfBirth = rDob;

    //loop above somehow.

    runnerData.traNum = (generateTRA() + rGender.slice(0, 1));

    sessionStorage.setItem("runnerData", JSON.stringify(runnerData));
    //assigning returned string data to a variable.
    var returnedData = sessionStorage.getItem("runnerData");
    //parsing JSON sting which was reutned into an object.
    var prsObj = JSON.parse(returnedData);

    //passing returned and parsed object into the function which updates local model for user.
    //This means which each update the global model and the session storage data return state.

    //Nothing outside of this function can access prsObj. I didnt realize when writing it but
    //I makes sense to do it this way. SOC.
    updateLocalObj(prsObj);

    loadRaceScreen();
}


//PARSE FILE FUNCTION HERE

function parseFile() {
    var returnedData = sessionStorage.getItem("runnerData");
    var prsObj = JSON.parse(returnedData);
    return updateLocalObj(prsObj);
}

function updateLocalObj(obj) {
    //loop over parse indexes and update local obj
    //Nested loop maybe, using keys in object
    //but then how can I access current on inner outer loops key.
    //assinging  the global model of the object the reutrned properties of the parsed and converted
    //JSON String.
    console.log(obj);
    runnerData.title = obj.title;
    runnerData.firstName = obj.firstName;
    runnerData.surName = obj.surName;
    runnerData.gender = obj.gender;
    runnerData.dateOfBirth = obj.dateOfBirth;
    runnerData.traNum = obj.traNum;
    runnerData.races = obj.races;
}

function saveRunnerData() {

    var returnedData = sessionStorage.getItem("runnerData");
    var prsObj = JSON.parse(returnedData);
    return updateLocalObj(prsObj);
}


function generateTRA() {

    return Math.floor(Math.random() * 9999) + 1000;

    //Need to stick last first charecter from gender and plus this to TRA num, then Alert USer to
    //TRA Num
}

function checkSessionStorage() {

    var data = sessionStorage.getItem("runnerData");


    if (data == undefined) {
        document.getElementById("next").style.visibility = "hidden";
        document.getElementById("welcomemsg").style.visibility = "hidden";
    } else if (data != undefined) {
        document.getElementById("register").style.visibility = "hidden";
        document.getElementById("registermsg").style.height = 0;
        document.getElementById("registermsg").innerHTML = "";
        parseFile();
        populatelogin();

    }

}


function loadRaceScreen() {

    location.assign("races.html");
}

function loadFavourites() {
    location.assign("races.html");
}

function loadRegistration() {

    location.assign("capturedata.html");
}

function checkFavourites() {
    alert("I am checking for favorites");
    if (runnerData.races != "undefined") {
        let name = runnerData.firstName;
        alert("Welcome Back " + name + " races have been found in your favourites");
        loadFavourites();
    }

}