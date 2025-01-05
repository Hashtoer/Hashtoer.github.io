const noButton = document.getElementById("noButton");

noButton.addEventListener("mouseover", event => {
    noButton.style.top = '150px';
    noButton.style.bottom = '150px';
    console.log("Hovered over No button");
});

noButton.addEventListener("mouseout", event => {
    // Reset position when not hovered
    noButton.style.top = '0px';
    noButton.style.left = '0px';
    console.log("Mouse left No button");
});