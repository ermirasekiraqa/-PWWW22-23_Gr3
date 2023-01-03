if (!localStorage.getItem("user")) {
    window.location.replace("login.html");
}

const user = localStorage.getItem("user");
const parsedUser = JSON.parse(user);

let cart = parsedUser.bag;

let tableHeaders = ["", "Product Image", "Product name", "Price per unit", "Quantity", "Price"]; 
let allProductsPrices = [];

function displayProductsInCart() {
    let cartProductsContainer = document.getElementById("shopping-cart");

    if (cart.length === 0) {
        let message = document.createElement("h1");
        message.innerText = "Nothing to display! No items in cart!"
        cartProductsContainer.appendChild(message);
    } 
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
    totalPrice.innerText = "$" + calculateTotalPrice(allProductsPrices);

    return totalTableRow;
}

function createCheckoutButton() {
    let checkoutButton = document.createElement("button");
    checkoutButton.innerText = "Checkout";
    checkoutButton.onclick = checkout;
    return checkoutButton;
}

function calculatePricePerProduct(price, quantity) {
    return price * quantity;
}

function calculateTotalPrice(productsPrices) {
    let total = 0;
    for (let i = 0; i < productsPrices.length; i++) {
        total += productsPrices[i];
    }
    return total;
}

function checkout() {
    // window.location.replace("checkout-form.html");
}

displayProductsInCart();