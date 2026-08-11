const projectsData = {
    'web-1': {
        type: 'Web App',
        name: 'Splitsound',
        description: 'Webová aplikace s umělou inteligencí, která převádí zvukové soubory (MP3) do notového zápisu. Automaticky rozděluje skladby na jednotlivé nástrojové stopy a generuje interaktivní notový zápis.<br><br><strong>Technologie:</strong> Figma, React, JavaScript, Demucs, Music21, OSMD',
        image: 'icons/projects/splitsound-project.png', 
        link: 'https://github.com/Smelda07/Splitsound'
    },
    'web-2': {
        type: 'Mobile App',
        name: 'Musicom',
        description: 'Moderní mobilní aplikace jako sociální síť pro hudebníky postavená v React Native, Expo a Appwrite backendu. <br><br><strong>Technologie:</strong> Figma, Tailwind, React native, Expo, JavaScript',
        image: 'icons/projects/musicom-project.png',
        link: 'https://github.com/Smelda07/Musicom-V2'
    },
    'app-1': {
        type: 'Web',
        name: 'A1-Makers',
        description: 'Prezentační a firemní webové stránky pro A1-MAKERS s.r.o. s podporou 3 jazyků a Google Maps API. <br><br><strong>Technologie:</strong> HTML, Tailwind, JavaScript, Google Maps API',
        image: 'icons/projects/a1-makers-project.png',
        link: 'https://github.com/Smelda07/A1-Makers'
    },
    'app-2': {
        type: 'Web',
        name: 'Restaurant',
        description: 'Moderní, plně responsivní a dvoujazyčný (CZ/DE) web pro penzion a restauraci Zátiší v Rumburku. Vytvořeno pomocí HTML5, Tailwind CSS a JavaScriptu. (doplň vlastní popis).<br><br><strong>Technologie:</strong> HTML, Tailwind, JavaScript',
        image: 'icons/projects/restaurant-project.png',
        link: 'https://github.com/Smelda07/restaurant'
    }
};

function openModal(projectId) {
    const project = projectsData[projectId];
    
    if (!project) return;
    
    document.getElementById('modalTitle').innerText = project.type;
    document.getElementById('modalProjectName').innerText = project.name;
    document.getElementById('modalDescription').innerHTML = project.description;
    document.getElementById('modalImg').src = project.image;
    document.getElementById('modalLink').href = project.link;
    
    const modal = document.getElementById('projectModal');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    
    const modalWindow = modal.querySelector('.scale-95');
    if (modalWindow) {
        modalWindow.classList.remove('scale-95');
        modalWindow.classList.add('scale-100');
    }
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.add('opacity-0', 'pointer-events-none');
    
    const modalWindow = modal.querySelector('.scale-100');
    if (modalWindow) {
        modalWindow.classList.remove('scale-100');
        modalWindow.classList.add('scale-95');
    }
}