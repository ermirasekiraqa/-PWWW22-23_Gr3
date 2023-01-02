function outputProduct(item) {
    let productDiv = document.createElement("div");
    productDiv.className = "product";  
    productDiv.appendChild(createProductImg(item));
    productDiv.appendChild(createProductDescription(item));
    return productDiv;
}

function createProductImg(item) {
    let productAnchor = document.createElement("a");
    productAnchor.href = "product" + item.product.id + ".html";
    let productImg = document.createElement("img");
    productImg.src = "shop_images" + item.product.filename;
    productAnchor.appendChild(productImg);
    return productAnchor;
}

function createProductDescription(item) {
    let productDescription = document.createElement("div");
    productDescription.className = "product-description";
    productDescription.appendChild(createProductBrand(item));
    productDescription.appendChild(createProductName(item));
    productDescription.appendChild(createProductRatings(item));
    productDescription.appendChild(createProductPrice(item));
    productDescription.appendChild(createShoppingCartIcon(item));
    return productDescription;
}

function createProductBrand(item) {
    let brand = document.createElement("span");
    brand.innerText = item.product.brand;
    return brand;
}

function createProductName(item) {
    let productName = document.createElement("h5");
    productName.innerText = item.product.productname;
    return productName;
}

function createProductRatings(item) {
    let productRatings = document.createElement("div");
    productRatings.className = "ratings";
    for(let i = 0; i < item.product.rates; i++) {
        let star = document.createElement("i");
        star.className = "fa fa-star";
        productRatings.appendChild(star);
    }
    return productRatings;
}

function createProductPrice(item) {
    let productPrice = document.createElement("h4");
    productPrice.innerText = "$" + item.product.price;
    return  productPrice;
}

function createShoppingCartIcon(item) {
    let cartAnchor = document.createElement("a");
    cartAnchor.href = "product" + item.product.id + ".html";
    let cartIcon = document.createElement("i");
    cartIcon.className = "fa fa-shopping-cart cart";
    cartAnchor.appendChild(cartIcon);
    return cartAnchor;
}

let productSection = document.getElementById("product-container");

// View multi-color products 
let mainImg = document.getElementById("main");
let smallImg = document.getElementsByClassName("small");

for (let i = 0; i < smallImg.length; i++) {
    smallImg[i].onclick = function() {
        const temp = mainImg.src;
        mainImg.src = smallImg[i].src;
        smallImg[i].src = temp;
    }
}

// Pagination
let rows = 3;
let currentPage = 1;  // Current page
let pageSize = Math.ceil(products.length/(rows*3));

function displayProducts(products) {
    productSection.innerHTML = "";
    for (let i = (currentPage - 1) * (rows * 3); i < currentPage * rows * 3; i++) {
        productSection.appendChild(outputProduct(products[i]));
    }
}

function displayPaginationButtons(num) {
    let paginationSection = document.getElementsByClassName("pages").item(0);
    if (num > 1) {
        let prevButton = document.createElement("button");
        prevButton.onclick = prevPage;
        let leftArrowIcon = document.createElement("i");
        leftArrowIcon.className = "fa fa-long-arrow-left";
        prevButton.appendChild(leftArrowIcon);
        paginationSection.appendChild(prevButton);
    }

    for(let i = 0; i < num; i++) {
        let numButton = document.createElement("button");
        numButton.onclick = loadPage;
        numButton.innerText = i + 1;
        paginationSection.appendChild(numButton);
    }

    if (num > 1) {
        let nextButton = document.createElement("button");
        nextButton.onclick = nextPage;
        let rightArrowIcon = document.createElement("i");
        rightArrowIcon.className = "fa fa-long-arrow-right";
        nextButton.appendChild(rightArrowIcon);
        paginationSection.appendChild(nextButton);
    }
}

function nextPage() {
    if(currentPage === pageSize)
        return; 
    currentPage += 1;
    displayProducts(products);
}

function prevPage() {
    if(currentPage === 1)
        return; 
    currentPage -= 1;
    displayProducts(products);
}

function loadPage(clickevent) {
    let pageNumber = parseInt(clickevent.target.innerText);
    currentPage = pageNumber;
    displayProducts(products);
}

displayProducts(products);
displayPaginationButtons(pageSize);
