const images = [
    'Slider.png',
    'Portfolio.png',

];

let currentIndex = 0;
const projectContainer = document.getElementById('projectContainer');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

function loadProjects() {
    projectContainer.innerHTML = '';
    const imagesToShow = Math.min(images.length, 3);
    
    for (let i = 0; i < imagesToShow; i++) {
        const projectIndex = (currentIndex + i) % images.length;
        const image = images[projectIndex];
        const projectName = image.split('.')[0].toLowerCase();
        const aTag = document.createElement('a');

        if (projectName === 'portfolio') aTag.href = `https://github.com/Monoto72/Portfolio`;
        else aTag.href = `projects/${projectName}.html`;

        aTag.className = 'h-72 w-72 md:h-96 md:w-96 rounded-lg shadow shadow-2xl transform transition-transform duration-200 hover:scale-105';
        aTag.innerHTML = `<img src="images/carousel/${image}" alt="${projectName} Project" class="object-cover h-full w-full rounded-md shadow-2xl">`;

        projectContainer.appendChild(aTag);
    }

    if (images.length <= 3) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
    }
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    loadProjects();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    loadProjects();
});

loadProjects();
