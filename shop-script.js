let mainImg = document.getElementById("main");
let smallImg = document.getElementsByClassName("small");

for (let i = 0; i < smallImg.length; i++) {
    smallImg[i].onclick = function() {
        const temp = mainImg.src;
        mainImg.src = smallImg[i].src;
        smallImg[i].src = temp;
    }
}