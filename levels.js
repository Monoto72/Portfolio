document.addEventListener("DOMContentLoaded", () => {
    const generateBar = (level, language) => {
        const levels = ['Novice', 'Intermediate', 'Advanced', 'Expert', 'Master'];

        let bar = document.createElement('div');
        bar.classList.add('flex', 'flex-row', 'items-center', 'space-x-2');

        let title = document.createElement('pre');
        title.textContent = language;
        title.classList.add('text-lg', 'w-full');

        bar.appendChild(title);

        let levelsDiv = document.createElement('div');
        levelsDiv.classList.add('flex', 'space-x-1');

        for (let i = 0; i < levels.length; i++) {
            let segment = document.createElement('div');
            segment.classList.add('sm:w-2','md:w-20', 'h-4', 'text-xs', 'text-center', 'rounded', 'shadow-2xl');

            if (i < level) {
                segment.classList.add('bg-green-400', 'text-white');
            } else {
                segment.classList.add('bg-gray-200', 'text-black');
            }

            levelsDiv.appendChild(segment);
        }

        bar.appendChild(levelsDiv);

        return bar;
    }

    const categories = {
        'Web Languages': [
            {language: 'HTML', level: 5},
            {language: 'JS', level: 4},
            {language: 'CSS', level: 4},
        ],
        'Application Languages': [
            {language: 'Java', level: 3},
            {language: 'Python', level: 4},
            {language: 'C', level: 3},
            {language: 'C++', level: 3},
            {language: 'C#', level: 2},
        ],
        'Mobile Languages': [
            {language: 'React-Native', level: 4},
            {language: 'Kotlin', level: 2},
        ],
        'Utils': [
            {language: 'SQL', level: 4},
            {language: 'PHP', level: 3},
        ]
    };

    const parentDiv = document.getElementById('bars');

    for (let categoryName in categories) {
        let categoryDiv = document.createElement('div');
        categoryDiv.classList.add('my-4');

        let title = document.createElement('h2');
        title.textContent = categoryName;
        title.classList.add('text-xl', 'font-bold');
        categoryDiv.appendChild(title);

        categories[categoryName].sort((a, b) => b.level - a.level);

        for (let item of categories[categoryName]) {
            let bar = generateBar(item.level, item.language);
            categoryDiv.appendChild(bar);
        }

        parentDiv.appendChild(categoryDiv);
    }
});
