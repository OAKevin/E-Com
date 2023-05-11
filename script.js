// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
// Event listener is for the on click effect, just toggles between css classes
// Showing the css with nav that slides from the left
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

//requesting to fetch the json data

//XMLhttp request object
var http = new XMLHttpRequest();
//http variable holds all methogs and properties
//open the request with the open method
http.open("get", "products.json", true);
//first argument  sets the http method and second passes the file, third sets the request to be async
//to catch the response we check the onload event listener
http.send();

//checking the ready state and status properties
http.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
    //when we have a successful response then we parse the json data and convert to an array
    let products = JSON.parse(this.responseText);
    //we create an empty variable to add the data
    let output = "";
    //then we loop through the products and in every iteration we add the html template to the output variable
    for (let item of products) {
      output += `
                <div class="product">
                    <img src="${item.image}" alt="${item.image}">
                    <p class="title">${item.name}</p>
                    <p class="year">${item.year}</p>
                    <p class="description">${item.description}</p>
                    <p class="price">
                        <span>${item.price}</span>
                        <span>&dollar;</span>
                    </p>
                    <p class="cart">Add to cart <i class="bx bx-cart-alt"></i> </p>
                </div>
        `;
    }
    //we target the profucts container and add the data for the output variable
    document.querySelector(".products").innerHTML = output;
  }
};
//Image slider
const buttons = document.querySelectorAll("[data-carousel-button]");
//checks if the next button or the previous button is being clicked
buttons.forEach((button) => {
//gives each button an event listener for the click
  button.addEventListener("click", () => {
  //if the click is the next button then it takes you to the next picture or else it assumes you pressed previous
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    //changes the index of the slides depending on the offset previously shown
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    //is checking if the index is less than 0 it will decrease the index by one
    if (newIndex < 0) newIndex = slides.children.length - 1;
    //if its more or equal to children length then it will give it a value of 0
    if (newIndex >= slides.children.length) newIndex = 0;
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});
