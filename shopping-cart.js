if (!localStorage.getItem("user")) {
    window.location.replace("login.html");
}

// Get user from localStorage
const user = localStorage.getItem("user");
const parsedUser = JSON.parse(user);

// Get bag from user
let cart = parsedUser.bag;

let tableHeaders = ["", "Product Image", "Product name", "Price per unit", "Quantity", "Price"]; 
let allProductsPrices = [];

let cartProductsContainer = document.getElementById("shopping-cart");

function displayProductsInCart() {

    // If there are no items in cart display nothing
    if (cart.length === 0) {
        let message = document.createElement("h1");
        message.innerText = "Nothing to display! No items in cart!"
        cartProductsContainer.appendChild(message);
    } 
    // If there is one or more items in cart display them in a table
    else {
        // create a table to display each product in cart
        let cartProductsTable = document.createElement("table");
        cartProductsTable.cellSpacing = 0;
        cartProductsTable.cellPadding = 10;

        // create header for table
        let headerRow = createHeaderRow();
        cartProductsTable.appendChild(headerRow);

        // display each product's data 
        for (let i = 0; i < cart.length; i++) {
            cartProductsTable.appendChild(createProductDataRow(i));
        }

        // calculate total price in cart
        cartProductsTable.appendChild(createTotalPriceRow());

        cartProductsContainer.appendChild(cartProductsTable);

        // checkout button
        let checkoutSection = document.createElement("div");
        checkoutSection.appendChild(createCheckoutButton());

        cartProductsContainer.appendChild(checkoutSection);
    }
}

function createHeaderRow() {
    let headerRow = document.createElement("tr");
        for (let i = 0; i < tableHeaders.length; i++) {
            let header = document.createElement("th");
            header.innerText = tableHeaders[i];
            headerRow.appendChild(header);
        }
    return headerRow;
}

function createProductDataRow(j) {
    let tableRow = document.createElement("tr");
            
    // Ordering Number
    let orderingNumber = tableRow.insertCell(0);
    orderingNumber.innerText = j + 1;

    // Product image
    let productImage = tableRow.insertCell(1);
    let image = document.createElement("img");
    image.src = cart[j].drone.filename;
    productImage.append(image);

    // Product name
    let productName = tableRow.insertCell(2);
    productName.innerText = cart[j].drone.productname;

    // Price per unit
    let productPrice = tableRow.insertCell(3);
    productPrice.innerText = "$" + cart[j].drone.price;

    // Product quantity
    let quantity = tableRow.insertCell(4);
    quantity.innerText = cart[j].prodQuantity;

    // Price for all units
    let price = tableRow.insertCell(5);
    allProductsPrices[j] = calculatePricePerProduct(cart[j].drone.price, cart[j].prodQuantity);
    price.innerText = "$" + allProductsPrices[j] ;

    // Option to remove item from cart
    let trash = tableRow.insertCell(6);
    trash.id = j;
    let trashIcon = document.createElement("i");
    trashIcon.className = "fa fa-trash";
    trashIcon.onclick = removeItemFromCart;
    trash.appendChild(trashIcon);

    return tableRow;
}

function createTotalPriceRow() {
    let totalTableRow = document.createElement("tr");
    totalTableRow.insertCell(0);
    totalTableRow.insertCell(1);
    totalTableRow.insertCell(2);
    totalTableRow.insertCell(3);
    let total = totalTableRow.insertCell(4);
    total.innerText = "Total"; 

    let totalPrice = totalTableRow.insertCell(5);
    // totalPrice.id = "total-price";
    totalPrice.innerText = "$" + calculateTotalPrice(allProductsPrices);

    return totalTableRow;
}

function createCheckoutButton() {
    let checkoutButton = document.createElement("button");
    checkoutButton.innerText = "Checkout";
    checkoutButton.onclick = checkout;
    return checkoutButton;
}

// Calculate price for each row
function calculatePricePerProduct(price, quantity) {
    return price * quantity;
}

// Calculate total price of all items in cart
function calculateTotalPrice(productsPrices) {
    let total = 0;
    for (let i = 0; i < productsPrices.length; i++) {
        total += productsPrices[i];
    }
    return total;
}

// remove an item from cart
function removeItemFromCart(clickEvent) {
    let rowToBeRemoved = parseInt(clickEvent.currentTarget.parentElement.id);
    
    cart.splice(rowToBeRemoved, 1);

    allProductsPrices.splice(rowToBeRemoved, 1);
    
    parsedUser.cart = cart;

    cartProductsContainer.innerHTML = "";

    localStorage.setItem("user", JSON.stringify(parsedUser));

    displayProductsInCart();
}

// function setProductToLoadInSessionStorage(clickEvent) {
//     let productId = parseInt(clickEvent.currentTarget.parentElement.dataset.productId);
//     sessionStorage.setItem("loadedProductPage", productId);
// }

function checkout() {
    // window.location.replace("checkout-form.html");
}

displayProductsInCart();