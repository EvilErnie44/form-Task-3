window.onload = function() {
    //Check user exists in local
    //If no user exists Capture user store to session.
    //If user exists, check favourites.   
    //SO form captures data on click. 
    //generates str for TRA
    generateTRA;
    //Check if items exist in session already. 
    //Assign items if them do. 
    document.getElementById("30Races").onclick = start;
    document.getElementById("returnFavs").onclick = passFavsIntoList;
    parseFile();
    addToFavourites;
    document.getElementById("myForm").submitToLocal.onclick = storeInLocal;

}