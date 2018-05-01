window.onload = function() {
    //Check user exists in local
    //If no user exists Capture user store to session.
    //If user exists, check favourites.

    //Check if items exist in session already.

    ///These needs to be passed in once check complete and positive.  

    checkSessionStorage();
    //Assign items if them do. 
    document.getElementById("register").onclick = loadRegistration;
    document.getElementById("next").onclick = checkFavourites;;

}