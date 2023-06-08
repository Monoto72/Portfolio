document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.querySelector('#scroll-top');
    const showThreshold = 300;

    window.addEventListener('scroll', () => {
        if (window.scrollY > showThreshold) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }  
    });

    let images = ["SliderInterests.png", "SliderProfile.png", "SliderSwipe.png", "SliderLanding.png"];
    let currentImageIndex = 0;
    let carouselImage = document.getElementById("slider-carousel");

    const changeImage = () => {
        carouselImage.src = 'images/slider/' + images[currentImageIndex];
        currentImageIndex++;
        if (currentImageIndex === images.length) {
            currentImageIndex = 0;
        }
    }

    console.log("test")

    carouselImage.addEventListener('mouseover', () => {
        carouselInterval = setInterval(changeImage, 3000);
    });
    
    carouselImage.addEventListener('mouseout', () => {
        clearInterval(carouselInterval);
    });
});