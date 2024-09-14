document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    let mouseDown = false;
    let spawnInterval = null;
    let mousePos = { x: 0, y: 0 };

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const updateActiveNavLink = () => {
        const hash = window.location.hash || '#main';
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === hash);
        });
    };

    const updateActiveSection = () => {
        let currentSection = sections[0];
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section;
            }
        });

        const hash = `#${currentSection.getAttribute('id')}`;
        if (window.location.hash !== hash) {
            history.replaceState(null, null, hash);
        }
        updateActiveNavLink();
    };

    window.addEventListener('scroll', debounce(updateActiveSection, 100));

    document.body.onmousedown = (event) => {
        if (event.button === 2 || event.button === 1 || event.target.tagName.toLowerCase() === 'a' || event.target.tagName.toLowerCase() === 'img' || event.target.tagName.toLowerCase() === 'button') return;

        mouseDown = true;
        mousePos.x = event.pageX;
        mousePos.y = event.pageY;

        const spawnIcon = () => {
            const existingTags = document.getElementsByClassName('i-tag');
            if (existingTags.length > 10) return;

            const iTag = document.createElement('i');
            const icon = icons[Math.floor(Math.random() * icons.length)];

            iTag.classList.add('i-tag', icon, 'text-5xl', 'absolute');
            iTag.style.left = mousePos.x + 'px';
            iTag.style.top = mousePos.y + 'px';

            document.body.appendChild(iTag);

            setTimeout(() => {
                iTag.style.opacity = 0;
                setTimeout(() => {
                    if (iTag.parentNode) {
                        iTag.parentNode.removeChild(iTag);
                    }
                }, 1000);
            }, 1000);

            let pos = mousePos.y;
            const initialPos = { x: mousePos.x, y: mousePos.y };

            const frame = () => {
                if (pos === 0) {
                    clearInterval(id);
                    if (iTag.parentNode) {
                        iTag.parentNode.removeChild(iTag);
                    }
                } else {
                    pos--;
                    iTag.style.top = pos + 'px';
                    iTag.style.left = initialPos.x + Math.sin(pos / 30) * 50 + 'px';

                    const scale = pos / initialPos.y;
                    iTag.style.transform = `scale(${scale})`;
                }
            };

            const id = setInterval(frame, 10);
        };

        spawnIcon();
        spawnInterval = setInterval(spawnIcon, 250);
    };

    document.body.onmouseup = (event) => {
        if (event.button === 0) {
            mouseDown = false;
            clearInterval(spawnInterval);
        }
    };

    document.body.onmouseleave = () => {
        mouseDown = false;
        clearInterval(spawnInterval);
    };

    document.body.onmousemove = (event) => {
        if (mouseDown) {
            mousePos.x = event.pageX;
            mousePos.y = event.pageY;
        }
    };

    window.addEventListener('hashchange', updateActiveNavLink);
    updateActiveNavLink();
    updateActiveSection();
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
