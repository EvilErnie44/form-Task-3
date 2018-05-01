//Model manages retrieval of JSON
//Managers sessio Storage

//USER OBJECT FOR SESSION Storage

runnerData = {
 title:"",
 firstName:"",
 surName:"",
 gender:"",
 dateOfBirth:"",
 traNum:"",
 races:[]   //The favourite races belong inside of me.
}

//Prevent default once its on click.
function storeInLocal(event) {

//NEED SOME SORT OF VALIDATON BEFORE RUNNING.

event.preventDefault();

var form = document.getElementById("myForm");

var rTitle = form.title.value;
var rFirstName = form.firstName.value;
var rSurname = form.surName.value;
var rGender = form.gender.value;
var rDob = form.dateOfBirth.value;
var runnerTitle = form.title.value;

alert("storelocal has been called");

//How to target only the values in a loop?

runnerData.title = rTitle;
runnerData.firstName = rFirstName;
runnerData.surName = rSurname;
runnerData.gender = rGender;
runnerData.dateOfBirth = rDob;

//loop above somehow.

runnerData.traNum = (generateTRA()+ rGender.slice(0,1));

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
    
    alert("updating local object");
    //loop over parse indexes and update local obj
    //Nested loop maybe, using keys in object
    //but then how can I access current on inner outer loops key.
    debugger;  
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
      let hideme = document.getElementById("next").style.visibility = "hidden";
      alert("you are not registered");
  } else if (data != undefined) {
      let hideme = document.getElementById("register").style.visibility = "hidden";
      parseFile();
      populatelogin();

  }

}


function loadRaceScreen() {

    location.assign("races.html");
}

function loadRegistration() {

    location.assign("capturedata.html");
}

function checkFavourites() {


}
