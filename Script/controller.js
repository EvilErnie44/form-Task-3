//This is the controller for the remaining page which returns the race results and stores the
//favourites.
//using windows on load event to declare the functions and flow of them on start up.
window.onload = function() {
    //function bound to target element event, function returns races.
    document.getElementById("30Races").onclick = start;
    //function bound on target element event. function updates view with favourites.
    document.getElementById("returnFavs").onclick = passFavsIntoList;
    //run parse file to ensure my clients model is the same as the session storage date.
    parseFile();
    //function declaration,responsibile for updating the local model of favourites to reflect session storage data.
    addToFavourites;
    //binding function to forms on click event.
    //document.getElementById("myForm").submitToLocal.onclick = storeInLocal;

}
