//requesting to fetch the json data

//XMLhttp request object
var http = new XMLHttpRequest();
//http variable holds all methogs and properties
//open the request with the open method
http.open('get', 'products.json', true);
//first argument  sets the http method and second passes the file, third sets the request to be async
//to catch the response we check the onload event listener
http.send();

//checking the ready state and status properties
http.onload = function(){
    if(this.readyState == 4 && this.status == 200){
        //when we have a successful response then we parse the json data and convert to an array
        let products = JSON.parse(this.responseText);
        //we create an empty variable to add the data
        let output = "";
        //then we loop through the products and in every iteration we add the html template to the output variable
        for(let item of products){
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
}