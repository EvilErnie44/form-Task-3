//This is the controller for the capture runner details page.
//using windows on load event to declare the functions and flow of them on start up.
window.onload = function() {
    //declaring the generate TRA num function
    generateTRA;
    //binding the store function to the forms submit buttons on click event.
    document.getElementById("myForm").submitToLocal.onclick = storeInLocal;
    //run parse file to ensure my clients model is the same as the session storage date.
    parseFile();

}
