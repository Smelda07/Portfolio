const projectsData = {
    'web-1': {
        type: 'Web App',
        name: 'Splitsound',
        description: 'An AI-powered web application that converts audio files (MP3) into sheet music. It automatically splits songs into individual instrumental tracks and generates interactive sheet music. <br><br><strong>Technology:</strong> Figma, React, JavaScript, Demucs, Music21, OSMD',
        image: 'icons/projects/splitsound-project.png', 
        link: 'https://github.com/Smelda07/Splitsound'
    },
    'web-2': {
        type: 'Mobile App',
        name: 'Musicom',
        description: 'A modern mobile app serving as a social network for musicians, built using React Native, Expo, and the Appwrite backend. <br><br><strong>Technology:</strong> Figma, Tailwind, React native, Expo, JavaScript',
        image: 'icons/projects/musicom-project.png',
        link: 'https://github.com/Smelda07/Musicom-V2'
    },
    'app-1': {
        type: 'Web',
        name: 'A1-Makers',
        description: 'A corporate and promotional website for A1-MAKERS s.r.o. with support for three languages and the Google Maps API. <br><br><strong>Technology:</strong> HTML, Tailwind, JavaScript, Google Maps API',
        image: 'icons/projects/a1-makers-project.png',
        link: 'https://github.com/Smelda07/A1-Makers'
    },
    'app-2': {
        type: 'Web',
        name: 'Restaurant',
        description: 'A modern, fully responsive, and bilingual (CZ/DE) website for the Zátiší guesthouse and restaurant in Rumburk. Built using HTML5, Tailwind CSS, and JavaScript. <br><br><strong>Technology:</strong> HTML, Tailwind, JavaScript',
        image: 'icons/projects/restaurant-project.png',
        link: 'https://github.com/Smelda07/Restaurant-Zatisi'
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


// --- AUTO-PONG ANIMACE ---
function initPong() {
    const canvas = document.getElementById('pongCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Funkce pro responzivní velikost canvasu
    function resize() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Nastavení hry
    const ball = { 
        x: canvas.width / 2, 
        y: canvas.height / 2, 
        vx: 2.5,
        vy: 2,
        radius: 4 
    };
    
    const paddle = { w: 4, h: 30, speed: 2.2 };
    let leftY = canvas.height / 2 - paddle.h / 2;
    let rightY = canvas.height / 2 - paddle.h / 2;

    function update() {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
            ball.vy *= -1;
        }

        if (leftY + paddle.h / 2 < ball.y - 5) leftY += paddle.speed;
        if (leftY + paddle.h / 2 > ball.y + 5) leftY -= paddle.speed;

        if (rightY + paddle.h / 2 < ball.y - 5) rightY += paddle.speed;
        if (rightY + paddle.h / 2 > ball.y + 5) rightY -= paddle.speed;

        leftY = Math.max(0, Math.min(canvas.height - paddle.h, leftY));
        rightY = Math.max(0, Math.min(canvas.height - paddle.h, rightY));

        if (ball.x - ball.radius <= paddle.w && ball.y >= leftY && ball.y <= leftY + paddle.h) {
            ball.vx = Math.abs(ball.vx);
        }

        if (ball.x + ball.radius >= canvas.width - paddle.w && ball.y >= rightY && ball.y <= rightY + paddle.h) {
            ball.vx = -Math.abs(ball.vx);
        }

        if (ball.x < -10 || ball.x > canvas.width + 10) {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Vykreslení středové čáry
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.stroke();
        ctx.setLineDash([]);

        // Vykreslení pálek
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, leftY, paddle.w, paddle.h);
        ctx.fillRect(canvas.width - paddle.w, rightY, paddle.w, paddle.h);

        // Vykreslení míčku
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#E51700'; 
        ctx.fill();
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }
    
    loop();
}

document.addEventListener('DOMContentLoaded', initPong);


// --- AUTO-SNAKE ANIMACE ---
function initSnake() {
    const canvas = document.getElementById('snakeCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const gridSize = 8; // Velikost jedné kostičky hada
    let snake = [{x: 5, y: 5}]; // Startovní pozice
    let food = {x: 10, y: 10};
    let dx = 1; // Směr X
    let dy = 0; // Směr Y
    let lastTime = 0;
    const speed = 70; // Rychlost hada v milisekundách (nižší = rychlejší)

    function placeFood() {
        const cols = Math.floor(canvas.width / gridSize);
        const rows = Math.floor(canvas.height / gridSize);
        food = {
            x: Math.floor(Math.random() * (cols - 2)) + 1,
            y: Math.floor(Math.random() * (rows - 2)) + 1
        };
    }
    placeFood();

    function update() {
        let head = {x: snake[0].x, y: snake[0].y};
        
        // Jednoduchá AI: Had se snaží najít cestu k jídlu
        let nextDx = dx;
        let nextDy = dy;
        
        if (head.x !== food.x) {
            let wantDx = food.x > head.x ? 1 : -1;
            // Ochrana: nemůže se otočit o 180 stupňů do vlastního těla
            if (dx !== -wantDx) { 
                nextDx = wantDx; nextDy = 0;
            } else {
                nextDx = 0; nextDy = 1; // vyhne se do strany
            }
        } else if (head.y !== food.y) {
            let wantDy = food.y > head.y ? 1 : -1;
            if (dy !== -wantDy) {
                nextDx = 0; nextDy = wantDy;
            } else {
                nextDx = 1; nextDy = 0; // vyhne se do strany
            }
        }
        
        dx = nextDx;
        dy = nextDy;
        head.x += dx;
        head.y += dy;
        
        // Detekce nárazu do stěny nebo do sebe -> Reset hry
        const cols = Math.floor(canvas.width / gridSize);
        const rows = Math.floor(canvas.height / gridSize);
        
        let crashed = false;
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) crashed = true;
        for (let i = 0; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) crashed = true;
        }

        if (crashed) {
            snake = [{x: Math.floor(cols/2), y: Math.floor(rows/2)}];
            dx = 1; dy = 0;
            placeFood();
            return; // Konec tohoto kroku
        }

        // Posun hada dopředu
        snake.unshift(head);
        
        // Jídlo
        if (head.x === food.x && head.y === food.y) {
            placeFood(); // Vygeneruje nové jídlo (a nezkrátí ocas, takže vyroste)
        } else {
            snake.pop(); // Pokud nejedl, zkrátíme ocas (pohyb)
        }
    }

    function draw() {
        // ZMĚNA: Vyčištění plátna na ZCELA TRANSPARENTNÍ
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Nakreslení jídla (tvoje oranžovo/červená značková barva)
        ctx.fillStyle = '#E51700';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);
        
        // Nakreslení hada (bílý s jemnými mezerami)
        for (let i = 0; i < snake.length; i++) {
            // Hlava je lehce průhledná/odlišná pro lepší efekt
            ctx.fillStyle = i === 0 ? '#ffffff' : 'rgba(255, 255, 255, 0.7)';
            ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 1, gridSize - 1);
        }
    }

    // Herní smyčka pro Hada s časovačem
    function loop(time) {
        requestAnimationFrame(loop);
        if (time - lastTime > speed) {
            update();
            draw();
            lastTime = time;
        }
    }
    
    requestAnimationFrame(loop);
}

// Společný spouštěč pro obě hry při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initPong === 'function') initPong();
    initSnake();
});