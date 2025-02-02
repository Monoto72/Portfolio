document.addEventListener("DOMContentLoaded", () => {
    const generateBar = (level, language) => {
        const levels = ['Novice', 'Intermediate', 'Advanced', 'Expert', 'Master'];

        let barWrapper = document.createElement('div');
        barWrapper.className = 'bar-wrapper flex flex-row items-center space-x-2';

        let title = document.createElement('pre');
        title.textContent = language;
        title.className = 'text-lg w-full';

        let levelText = document.createElement('span');
        levelText.textContent = `${levels[level - 1]}`;
        levelText.className = 'level-text text-sm flex md:hidden';

        let levelsDiv = document.createElement('div');
        levelsDiv.className = 'levels-bar flex space-x-1 hidden md:flex flex-grow';

        for (let i = 0; i < levels.length; i++) {
            let segment = document.createElement('div');
            segment.className = `segment flex-grow h-4 text-xs text-center rounded shadow-2xl ${i < level ? 'bg-green-400 text-white' : 'bg-gray-200 text-black'}`;
            levelsDiv.appendChild(segment);
        }

        barWrapper.appendChild(title);
        barWrapper.appendChild(levelText);
        barWrapper.appendChild(levelsDiv);

        return barWrapper;
    };

    const categories = {
        'Web Languages': [
            { language: 'HTML', level: 5 },
            { language: 'JS', level: 4 },
            { language: 'CSS', level: 4 },
        ],
        'Application Languages': [
            { language: 'Java', level: 3 },
            { language: 'Python', level: 4 },
            { language: 'C', level: 3 },
            { language: 'C++', level: 3 },
            { language: 'C#', level: 2 },
        ],
        'Mobile Languages': [
            { language: 'React-Native', level: 4 },
            { language: 'Kotlin', level: 2 },
        ],
        'Utils': [
            { language: 'SQL', level: 4 },
            { language: 'PHP', level: 3 },
        ]
    };

    const parentDiv = document.getElementById('bars');
    const fragment = document.createDocumentFragment();

    Object.keys(categories).forEach(categoryName => {
        let categoryDiv = document.createElement('div');
        categoryDiv.className = 'my-4';

        let title = document.createElement('h2');
        title.textContent = categoryName;
        title.className = 'text-xl font-bold';
        categoryDiv.appendChild(title);

        categories[categoryName].sort((a, b) => b.level - a.level).forEach(item => {
            let bar = generateBar(item.level, item.language);
            categoryDiv.appendChild(bar);
        });

        fragment.appendChild(categoryDiv);
    });

    parentDiv.appendChild(fragment);
});
