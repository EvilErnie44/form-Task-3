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
 races:{
   //The favourite races belong inside of me.
 }
}

//Prevent default once its on click.
function storeInLocal(event) {

//event.preventDefault();

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


runnerData.traNum = (generateTRA()+ rGender.slice(0,1));

sessionStorage.setItem("runnerData", JSON.stringify(runnerData));

sessionStorage.getItem("runnerData");

}


function generateTRA() {

return Math.floor(Math.random() * 9999) + 1000;

//Need to stick last first charecter from gender and plus this to TRA num, then Alert USer to
//TRA Num
}
