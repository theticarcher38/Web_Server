var petitionPostOption = document.getElementsByTagName('option');

if (petitionPostOption.value == "Petition Post") {
    document.getElementsByTagName('option')[2].setAttribute("class", "post-link-visible");
} else {
    console.log("no change");
}