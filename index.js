document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.querySelector('#scroll-top');
    const showThreshold = 300;

    let images = ["SliderInterests.png", "SliderProfile.png", "SliderSwipe.png", "SliderLanding.png"];
    let currentImageIndex = 0;
    let carouselImage = document.getElementById("slider-carousel");

    let mouseDown = false;
    let spawnInterval = null;
    let mousePos = {x: 0, y: 0};

    const changeImage = () => {
        carouselImage.src = 'images/slider/' + images[currentImageIndex];
        currentImageIndex++;
        if (currentImageIndex === images.length) {
            currentImageIndex = 0;
        }
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > showThreshold) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }  
    });

    carouselImage.addEventListener('mouseover', () => {
        carouselInterval = setInterval(changeImage, 3000);
    });
    
    carouselImage.addEventListener('mouseout', () => {
        clearInterval(carouselInterval);
    });

    document.body.onmousedown = (event) => {
        let eventTarget = null ?? event.target.tagName.toLowerCase();

        if (eventTarget === 'a' || eventTarget === 'button') return;

        mouseDown = true;
        mousePos.x = event.clientX;
        mousePos.y = event.clientY;

        const spawnIcon = () => {
            const existingTags = document.getElementsByClassName('i-tag');
            if (existingTags.length > 10) return;

            const iTag = document.createElement('i');
            const icon = `${icons[Math.floor(Math.random() * icons.length)]}`

            iTag.classList.add('i-tag', icon, 'text-5xl', 'absolute');
            iTag.style.left = mousePos.x + 'px';
            iTag.style.top = mousePos.y + 'px';

            document.body.appendChild(iTag);

            setTimeout(() => {
                iTag.style.opacity = 0;
            }, 1000);

            let pos = mousePos.y;
            let initialPos = mousePos.x;

            let id;

            const frame = () => {
                if (pos === 0) {
                    clearInterval(id);
                    iTag.parentNode.removeChild(iTag);
                } else {
                    pos--;
                    iTag.style.top = pos + 'px';
                    iTag.style.left = initialPos + Math.sin(pos / 30) * 50 + 'px';
                }
            }

            id = setInterval(frame, 10);
        }

        spawnIcon();
        spawnInterval = setInterval(spawnIcon, 250);
    }

    document.body.onmouseup = () => {
        mouseDown = false;
        clearInterval(spawnInterval);
    }

    document.body.onmouseleave = (event) => {
        mouseDown = false;
        clearInterval(spawnInterval);
    }

    document.body.onmousemove = (event) => {
        if (mouseDown) {
            mousePos.x = event.clientX
            mousePos.y = event.clientY
        }
    }
});

const icons = [
    "devicon-android-plain",
    "devicon-cplusplus-plain",
    "devicon-css3-plain",
    "devicon-django-plain",
    "devicon-bootstrap-plain",
    "devicon-git-plain",
    "devicon-html5-plain",
    "devicon-javascript-plain",
    "devicon-mysql-plain",
    "devicon-nodejs-plain",
    "devicon-python-plain",
    "devicon-react-original",
    "devicon-visualstudio-plain",
    "devicon-express-original",
    "devicon-flask-original",
    "devicon-java-plain",
    "devicon-kotlin-plain",
];
