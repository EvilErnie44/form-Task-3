//Race Model Data, Array returns the parsed JSON.
var model = [];
//this is my local instance of the session data, I use this to access current values and properties.
//this saves me parsing the local JSON each time I need to access it.
runnerData = {
    title: "",
    firstName: "",
    surName: "",
    gender: "",
    dateOfBirth: "",
    traNum: "",
    races: [] //The favourite races belong inside of me.
}

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

//Purpose of the function is to return  and parse all of the JSON race data.
function GetRaceList() {
    var start;
    var end;
    //Sets conditional criteria which needs to be checked before object is attempted to be returned.
    if (racehttp.readyState == 4 && racehttp.status == 200) {
        //var sets the response data string and parses.
        var races = JSON.parse(racehttp.responseText);
        //Function called with races parameter passed in.
        buildRacesModel(races);
        //Function called with the MODEL object passed in.
        //When this function is called the variable which are passed in govern the scope of the loop which
        //iterates the items into the container.
        displayItemsInRaceList(model, 0, 100);
    }
}


//function which creates an array for each instance of race object.
function buildRacesModel(arr) {
    //for LOOP initialisation and scope.
    for (var i = 0; i < arr.length; i++) {
        //Declaring the current iteration of the arrays index as the current target.
        //When assigning it creates a new entry into the array.
        //variable calls function with anticipation of returning the a singular iteration of the race data.
        var thisRace = new Race(arr[i]);
        //Pushing current thisRace value into array.
        model.push(thisRace);
    }
}

//This function adds a selected race into the favourites.
//This function has the current race target passed into it.
function addToFavourites(race) {
    //Assinging the relevant ID to a variable so I can, refer to it later in.
    var id = race.id;
    //Alerting user to the current selected race ID which is to be added into favourites.
    alert("Race " + id + " has been added for favourites");
    //adding the current value of selected race data into the local runner Data Model.
    runnerData.races.push(race);
    //Updating the session storage data to reflect the change which has just happened.
    //without this, I have no persistency of favourites in the local model or the session data.
    //This was a bug which was uncovered when trying to check the favourites on welcome screen load.
    sessionStorage.setItem("runnerData", JSON.stringify(runnerData));
}

//This functions is responsible for creating each singular instance of the race object.
//this function is called iteratively,
function Race(inObject) {
  //var which instantiates a new version of each object when it is called in the
    var race = new Object();
    //assign the race id of object to current race.
    race.id = inObject.id;
    //assign the object date to race date.
    race.date = inObject.date;
    //assign the object races distance to the races model distance.
    race.racedistance = inObject.distance;
    //assigns object race name into model race name.
    race.race_name = inObject.race_name;
    //Assigns the objects venue name to the models race data venue name.
    race.venue_name = inObject.venue_name;
    //assigns the in object start geo loc data to the race geo loc data.
    race.geoloc_start = inObject.geoloc_start;
    //assigns the in object end geo loc data to the race geo loc data.
    race.geoloc_end = inObject.geoloc_end;
    //Returns the object to the function call with each iteration of the function.
    return race;
}

//This function is responsible for the capture of the form data for registration.
function storeInLocal(event) {
    //prevent the undesirable default behaviour of the event target.
    event.preventDefault();
    //assinging the form to a variable as to shorten access to its properties.
    var form = document.getElementById("myForm");
    //assign form title value to variable.
    var rTitle = form.title.value;
    //assign form firstName value to variable.
    var rFirstName = form.firstName.value;
    //assign form title surName to variable.
    var rSurname = form.surName.value;
    //assign form title gender to variable.
    var rGender = form.gender.value;
    //assign form title dateOfBirth to variable.
    var rDob = form.dateOfBirth.value;

    //basic Validation of input, this could be expanded upon but provides basic error checking.
    //Check if any fo the above are empty strings, unable to use undefined as the object exists.
    if (rTitle == "" || rFirstName == "" || rSurname == "" || rGender == "" || rDob == "") {
        //Notify users of ERROR
        alert("Please complete all fields");
        //Stop function here, as form incomplete.
        return;
    }

    //this block assigns the values of the form data to the local model of runner data.
    //form title is assigned.
    runnerData.title = rTitle;
    //form first name is assigned.
    runnerData.firstName = rFirstName;
    //form surname is assigned.
    runnerData.surName = rSurname;
    //form gender is assigned.
    runnerData.gender = rGender;
    //form DOB is assigned.
    runnerData.dateOfBirth = rDob;

    //slicing the first character from the the gender string.
    //calls the generate TRA function and passes in the charecter which has been sliced.
    runnerData.traNum = (generateTRA() + rGender.slice(0, 1));
    //assigning all model data to the session storage as JSON string.
    sessionStorage.setItem("runnerData", JSON.stringify(runnerData));
    //assigning returned string data to a variable.
    var returnedData = sessionStorage.getItem("runnerData");
    //parsing JSON sting which was reutned into an object.
    var prsObj = JSON.parse(returnedData);
    //passing returned and parsed object into the function which updates local model for user.
    //This means which each update the global model and the session storage data return state.
    //Nothing outside of this function can access prsObj. I didnt realize when writing it but
    //It makes sense to do it this way. SOC.
    updateLocalObj(prsObj);
    //executes fucntion which takes user to the race screen.
    loadRaceScreen();
}


//PARSE FILE FUNCTION HERE
//This function is responsible for parsing the data on page load from session storage.
function parseFile() {
    //obtains the session storage data.
    var returnedData = sessionStorage.getItem("runnerData");
    //parsing the JSON string.
    var prsObj = JSON.parse(returnedData);
    //on fucntion executing the return the functon takes the parsed object and passes into the below function call.
    return updateLocalObj(prsObj);
}


//This function is responsible for updating the values of the parsed object into the local object version.
function updateLocalObj(obj) {
    //assigning the values of the object into the local version fo storage.
    //parsed runnder data updating runnerData obj.
    runnerData.title = obj.title;
    //parsed firstName data updating runnerData obj.
    runnerData.firstName = obj.firstName;
    //parsed surName data updating runnerData obj.
    runnerData.surName = obj.surName;
    //parsed gender data updating runnerData obj.
    runnerData.gender = obj.gender;
    //parsed DOB data updating runnerData obj.
    runnerData.dateOfBirth = obj.dateOfBirth;
    //parsed TRANum data updating runnerData obj.
    runnerData.traNum = obj.traNum;
    //parsed races collection data updating runnerData obj.
    runnerData.races = obj.races;
}


//This function generates the TRA number and is called when the runner data is updated.
function generateTRA() {
    //returns the random value to the function call. Due to number needing to be 4 digits the passed in values
    //give the number a relevant scope.
    return Math.floor(Math.random() * 9999) + 1000;
}
