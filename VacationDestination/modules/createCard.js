import editCard from "./editCard.js";
import removeCard from "./removeCard.js";
import UNSPLASH_API_KEY from "../ApiKeys/unsplashKey.js";
import getDestionationPic from "./getDestinationPic.js";

// once addToList button is click it will run this function
export default function createCard(event) {
    // prevent bad stuff from happening
    event.preventDefault();

    // mainContainer & form user input constants
    const myWishListContainerDiv = document.querySelector("#destinations_container");
    const destinationName = document.querySelector("#name");
    const destinationLocation = document.querySelector("#location");
    
    // change the value of this tag
    let enterDestinationDetails = document.querySelector("#title");
    enterDestinationDetails.innerText = "My WishList";
  
    // create the main div for the dynamically create vacation div's
    let vacationDiv = document.createElement("div");
    vacationDiv.classList.add("card");
    vacationDiv.style.width = "15rem";
    vacationDiv.style.height = "fit-content";
  
    // create the img tag inside of the vacationDiv
    let endpoint = `https://api.unsplash.com/search/photos?query=${destinationName.value}&client_id=${UNSPLASH_API_KEY}`;
    let img = document.createElement("img");
    img.classList.add("card-img-top", "img-fluid");
    img.setAttribute("alt", destinationName.value);
    img.style.height = "150px";
    getDestionationPic(endpoint, img);
    vacationDiv.appendChild(img);
  
    // create the card body, then create it's child tags
    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    // h5 tag
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = destinationName.value;
    cardBodyDiv.appendChild(cardTitle);
  
    // h6 tag
    let cardSubTitle = document.createElement("h6");
    cardSubTitle.classList.add("card-subtitle", "mb-2", "text-muted");
    cardSubTitle.innerText = destinationLocation.value;
    cardBodyDiv.appendChild(cardSubTitle);
  
    // p tag
    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardBodyDiv.appendChild(cardText);
  
    // div tag
    let buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons_container");
  
    // edit the div you click "edit" on
    let editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-warning");
    editButton.innerText = "Edit";
    // this will allow you to edit the values of vacationDiv
    editButton.addEventListener("click", editCard);
    buttonsContainer.appendChild(editButton);
  
    // remove the div you click "remove" on
    let removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger");
    removeButton.innerText = "Remove";
    removeButton.addEventListener("click", removeCard);
    buttonsContainer.appendChild(removeButton);

    let seeMoreLink = document.createElement("p");
    seeMoreLink.classList.add("card-text");
    seeMoreLink.innerText = "Click Me to See More";
    seeMoreLink.addEventListener("click", (event) => {
      window.open("../layouts/cardBodyDiv.html", "_blank");
      localStorage.setItem("card", vacationDiv.outerHTML);
    });
    cardBodyDiv.appendChild(seeMoreLink);

    
    // append everything to it's rightful place
    cardBodyDiv.appendChild(buttonsContainer);
    vacationDiv.appendChild(cardBodyDiv);
    myWishListContainerDiv.appendChild(vacationDiv);
  }