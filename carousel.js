const images = [
    'slider.png',
    'portfolio.png',
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

        aTag.href = `${projectName}.html`;
        aTag.className = 'h-96 w-96 rounded-lg shadow shadow-2xl transform transition-transform duration-200 hover:scale-105';
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
