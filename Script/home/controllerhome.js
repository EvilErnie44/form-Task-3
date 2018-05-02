//This is the controller for the home page.
//using windows on load event to bind the functions and flow of them on start up.
window.onload = function() {
    //first function which the page runs, this checks the session storage data to
    //see if anything is current stored in it.
    checkSessionStorage();
    //binding the function which changes the view if data exists already.
    document.getElementById("register").onclick = loadRegistration;
    //binding the function which checks favourites when a user clicks next. 
    document.getElementById("next").onclick = checkFavourites;

}
