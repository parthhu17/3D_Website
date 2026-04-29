// --- DATA ---
const products = [
    { id: 1, name: 'Nike Air Max 270', category: 'Running', price: 12999, rating: 4.8, img: 'https://images.nike.com/is/image/DotCom/AH8050_002_A_PREM?wid=400', color: '#FF2D20' },
    { id: 2, name: 'Nike Jordan 1 Retro', category: 'Jordan', price: 18499, rating: 4.9, img: 'https://images.nike.com/is/image/DotCom/555088_063_A_PREM?wid=400', color: '#000000' },
    { id: 3, name: 'Nike React Infinity', category: 'Running', price: 14299, rating: 4.7, img: 'https://images.nike.com/is/image/DotCom/CD4371_002_A_PREM?wid=400', color: '#00FF00' },
    { id: 4, name: 'Nike Air Force 1', category: 'Lifestyle', price: 9999, rating: 4.6, img: 'https://images.nike.com/is/image/DotCom/315122_111_A_PREM?wid=400', color: '#FFFFFF' },
    { id: 5, name: 'Nike Pegasus 40', category: 'Running', price: 11499, rating: 4.5, img: 'https://images.nike.com/is/image/DotCom/DV3853_001_A_PREM?wid=400', color: '#FFD700' },
    { id: 6, name: 'Nike Dunk Low', category: 'Lifestyle', price: 10799, rating: 4.8, img: 'https://images.nike.com/is/image/DotCom/DD1391_100_A_PREM?wid=400', color: '#0000FF', soldOut: true }
];

let cart = JSON.parse(localStorage.getItem('nike_cart')) || [];

// --- THEME ---
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('nike_theme', nextTheme);
    
    
    const btn = document.getElementById('theme-btn');
    btn.innerHTML = nextTheme === 'dark' 
        ? '<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z"></path></svg>'
        : '<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>';
    
    updateBackgroundTheme(nextTheme);
}

function updateBackgroundTheme(theme) {
    if (!bgMesh) return;
    if (theme === 'dark') {
        bgMesh.material.color.setHex(0xFF7700); // Vibrant orange for dark mode
        bgMesh.material.opacity = 0.5; // Higher opacity for dark
    } else {
        bgMesh.material.color.setHex(0xCC5500); // Darker shade for light mode
        bgMesh.material.opacity = 0.2; // Lower opacity for light
    }
}

// Initialize theme
if (localStorage.getItem('nike_theme') === 'light') toggleTheme();

// --- CUSTOM CURSOR ---
const cursorDot = document.getElementById('cursor-dot');
const cursorCircle = document.getElementById('cursor-circle');

window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    // Lag effect for circle
    setTimeout(() => {
        cursorCircle.style.left = e.clientX + 'px';
        cursorCircle.style.top = e.clientY + 'px';
    }, 50);
});

document.querySelectorAll('a, button, .filter-pill, .cart-icon, .social-icon').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorCircle.style.width = '60px';
        cursorCircle.style.height = '60px';
        cursorCircle.style.opacity = '0.8';
    });
    el.addEventListener('mouseleave', () => {
        cursorCircle.style.width = '40px';
        cursorCircle.style.height = '40px';
        cursorCircle.style.opacity = '0.5';
    });
});

// --- SCROLL EFFECTS ---
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const progress = document.getElementById('scroll-progress');
    
    // Navbar shrink
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progress.style.width = scrolled + "%";
});

// Intersection Observer for animations
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Counter animation
            if (entry.target.classList.contains('about-text')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const update = () => {
            const count = +counter.innerText;
            const speed = target / 100;
            if (count < target) {
                counter.innerText = Math.ceil(count + speed);
                setTimeout(update, 20);
            } else {
                counter.innerText = target;
            }
        };
        update();
    });
}

// --- THREE.JS HERO ---
let scene, camera, renderer, shoe;

function initHero3D() {
    const canvas = document.getElementById('hero-canvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xFF2D20, 1.5);
    pointLight.position.set(0, -2, 2);
    scene.add(pointLight);

    // Mouse-following spot light for depth
    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(5, 5, 5);
    spotLight.angle = 0.3;
    spotLight.penumbra = 0.5;
    scene.add(spotLight);

    // Particles for 3D depth
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i=0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xFF2D20,
        transparent: true,
        opacity: 0.5
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const loader = new THREE.GLTFLoader();
    loader.load('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Shoe/glTF/Shoe.gltf', 
        (gltf) => {
            shoe = gltf.scene;
            shoe.scale.set(12, 12, 12);
            shoe.rotation.y = Math.PI / 2;
            scene.add(shoe);
            // Entrance animation
            shoe.position.y = -5;
            new Promise(res => {
                let start = Date.now();
                const anim = () => {
                    let elapsed = (Date.now() - start) / 1000;
                    shoe.position.y = THREE.MathUtils.lerp(shoe.position.y, 0, 0.05);
                    if (elapsed < 2) requestAnimationFrame(anim);
                };
                anim();
            });
        },
        undefined,
        (error) => {
            console.error('Model failed', error);
            const geometry = new THREE.BoxGeometry(2, 1, 3);
            const material = new THREE.MeshStandardMaterial({ color: 0xFF2D20 });
            shoe = new THREE.Mesh(geometry, material);
            scene.add(shoe);
        }
    );

    // Optimized Parallax & Lighting
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5);
        mouseY = (e.clientY / window.innerHeight - 0.5);
        
        // Spot light follows mouse for dynamic shadows
        spotLight.position.x = mouseX * 10;
        spotLight.position.y = -mouseY * 10 + 5;
    });

    let isVisible = true;
    const heroObserver = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    heroObserver.observe(canvas);

    function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return; // Efficiency: pause when not seen

        if (shoe) {
            // Constant rotation + parallax
            shoe.rotation.y += 0.005;
            shoe.rotation.x = THREE.MathUtils.lerp(shoe.rotation.x, mouseY * 0.5, 0.05);
            shoe.rotation.z = THREE.MathUtils.lerp(shoe.rotation.z, mouseX * 0.5, 0.05);
            
            // Scroll-based rotation
            const scrollY = window.scrollY;
            shoe.rotation.y += scrollY * 0.0001;
            shoe.position.x = THREE.MathUtils.lerp(shoe.position.x, scrollY * 0.001, 0.05);
        }
        
        particlesMesh.rotation.y += 0.001;
        particlesMesh.position.y = THREE.MathUtils.lerp(particlesMesh.position.y, -mouseY * 2, 0.05);
        
        renderer.render(scene, camera);
    }
    animate();
}

// --- THREE.JS ABOUT (Sphere) ---
function initAbout3D() {
    const canvas = document.getElementById('about-canvas');
    const aScene = new THREE.Scene();
    const aCamera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    aCamera.position.z = 5;

    const aRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    aRenderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const sphereGeometry = new THREE.IcosahedronGeometry(1.5, 1);
    const sphereMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFF2D20, 
        wireframe: true,
        emissive: 0xFF2D20,
        emissiveIntensity: 0.5
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    aScene.add(sphere);

    // Add floating points around the sphere
    const pointsCount = 100;
    const pointsGeo = new THREE.BufferGeometry();
    const pointsPos = new Float32Array(pointsCount * 3);
    for(let i=0; i < pointsCount * 3; i++) pointsPos[i] = (Math.random() - 0.5) * 5;
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(pointsPos, 3));
    const pointsMat = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff });
    const points = new THREE.Points(pointsGeo, pointsMat);
    aScene.add(points);

    const light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(5, 5, 5);
    aScene.add(light);

    let isAboutVisible = false;
    const aboutObserver = new IntersectionObserver(([entry]) => {
        isAboutVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    aboutObserver.observe(canvas);

    function animate() {
        requestAnimationFrame(animate);
        if (!isAboutVisible) return;
        
        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.005;
        points.rotation.y -= 0.002;
        aRenderer.render(aScene, aCamera);
    }
    animate();
}

// --- SHOP & CART LOGIC ---
function renderProducts(filtered = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = filtered.map(p => `
        <div class="product-card" data-category="${p.category}" onmousemove="tiltCard(event, this)" onmouseleave="resetCard(this)">
            ${p.soldOut ? '<div class="sold-out"><span>SOLD OUT</span></div>' : ''}
            <button class="wishlist-btn" onclick="toggleWishlist(this)">♡</button>
            <div class="product-category">${p.category}</div>
            <div class="product-name">${p.name}</div>
            <div class="star-rating">${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 !== 0 ? '½' : ''}</div>
            <div class="product-footer">
                <div class="product-price">₹${p.price.toLocaleString()}</div>
                <button class="add-cart-btn" onclick="addToCart(${p.id})" ${p.soldOut ? 'disabled' : ''}>+</button>
            </div>
        </div>
    `).join('');
}

function filterProducts(cat, el) {
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    const filtered = cat === 'All' ? products : products.filter(p => p.category === cat);
    renderProducts(filtered);
}

function tiltCard(e, el) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 10;
    const rotateY = (x - centerX) / 10;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
}

function resetCard(el) {
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
}

function toggleWishlist(btn) {
    btn.innerHTML = btn.innerHTML === '♡' ? '❤️' : '♡';
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const exists = cart.find(item => item.id === id);
    if (exists) {
        exists.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCart();
    showToast(`Added ${product.name} to bag!`);
}

function updateCart() {
    localStorage.setItem('nike_cart', JSON.stringify(cart));
    const container = document.getElementById('cart-items-container');
    const countBadge = document.getElementById('cart-count');
    const subtotalEl = document.getElementById('cart-subtotal');
    const emptyMsg = document.getElementById('empty-cart-msg');

    countBadge.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    
    if (cart.length === 0) {
        container.innerHTML = '';
        container.appendChild(emptyMsg);
        subtotalEl.innerText = '₹0';
        return;
    }

    if (emptyMsg) emptyMsg.remove();
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.img}" class="cart-item-img">
            <div class="cart-item-details">
                <div style="font-weight: bold;">${item.name}</div>
                <div style="font-size: 0.9rem; opacity: 0.7;">₹${item.price.toLocaleString()}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    <span style="margin-left: auto; cursor: pointer; color: var(--accent-red);" onclick="removeFromCart(${item.id})">Remove</span>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    subtotalEl.innerText = `₹${total.toLocaleString()}`;
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    item.qty += delta;
    if (item.qty < 1) removeFromCart(id);
    else updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('open');
    document.getElementById('cart-overlay').style.display = 
        document.getElementById('cart-drawer').classList.contains('open') ? 'block' : 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert("Your bag is empty!");
        return;
    }
    alert("Checkout coming soon! Thank you for shopping with Nike Studio.");
}

// --- AUTH & FORMS ---
function switchAuth(type) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');

    if (type === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
    }
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast("Login success!");
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast("Account created!");
});

document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast("Message sent! We'll reply within 24 hours ✓");
});

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// --- BACKGROUND ANIMATION (AUTH) ---
function initAuthBg() {
    const bg = document.getElementById('auth-bg');
    if (!bg) return;
    for (let i = 0; i < 15; i++) {
        const swoosh = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        swoosh.setAttribute("viewBox", "0 0 24 24");
        swoosh.classList.add('floating-swoosh');
        swoosh.style.width = Math.random() * 100 + 50 + 'px';
        swoosh.style.left = Math.random() * 100 + '%';
        swoosh.style.top = Math.random() * 100 + '%';
        swoosh.style.animationDuration = Math.random() * 10 + 10 + 's';
        swoosh.style.animationDelay = Math.random() * 5 + 's';
        swoosh.innerHTML = '<path d="M22.37,5.55C21.43,5.17,17.2,5.11,13.88,8.23C11.69,10.28,7.95,14.9,3.64,18.82C2.75,19.63,1.5,18.88,1.5,17.5C1.5,16.3 3,11 11,8C15,6.5 19.5,6.5 22.37,5.55Z"></path>';
        bg.appendChild(swoosh);
    }
}

// --- AMBIENT 3D BACKGROUND ---
let bgScene, bgCamera, bgRenderer, bgMesh;

function initBackground3D() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    bgScene = new THREE.Scene();
    bgCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    bgCamera.position.z = 30;
    bgCamera.position.y = 10;
    bgCamera.lookAt(0, 0, 0);

    bgRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.PlaneGeometry(200, 100, 40, 20);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xFF7700, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.5 
    });
    bgMesh = new THREE.Mesh(geometry, material);
    bgMesh.rotation.x = -Math.PI / 2;
    bgScene.add(bgMesh);

    // Initial check for theme
    updateBackgroundTheme(document.body.getAttribute('data-theme'));

    const positionAttribute = geometry.getAttribute('position');
    const vertexData = [];
    for (let i = 0; i < positionAttribute.count; i++) {
        vertexData.push({
            ang: Math.random() * Math.PI * 2,
            amp: 1 + Math.random() * 2,
            speed: 0.01 + Math.random() * 0.02
        });
    }

    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animateBg() {
        requestAnimationFrame(animateBg);
        
        const positions = bgMesh.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const data = vertexData[i];
            data.ang += data.speed;
            positions.setZ(i, Math.sin(data.ang) * data.amp);
        }
        positions.needsUpdate = true;

        const scrollY = window.scrollY;
        bgCamera.position.x += (mouseX * 5 - bgCamera.position.x) * 0.05;
        bgCamera.position.y += (10 - scrollY * 0.01 - mouseY * 2 - bgCamera.position.y) * 0.05;
        bgCamera.lookAt(0, 0, 0);

        bgRenderer.render(bgScene, bgCamera);
    }
    animateBg();
}

// --- INIT ---
window.onload = () => {
    initHero3D();
    initAbout3D();
    initBackground3D();
    renderProducts();
    updateCart();
    initAuthBg();
    
    // Handle window resize for Three.js
    window.addEventListener('resize', () => {
        if (camera && renderer) {
            camera.aspect = window.innerWidth * 0.45 / window.innerHeight; // Approx
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth * 0.45, window.innerHeight);
        }
        if (bgCamera && bgRenderer) {
            bgCamera.aspect = window.innerWidth / window.innerHeight;
            bgCamera.updateProjectionMatrix();
            bgRenderer.setSize(window.innerWidth, window.innerHeight);
        }
    });
};
