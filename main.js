import './style.css'
import * as THREE from 'three'

// 3D Hero Scene
const initThreeHero = () => {
  const container = document.getElementById('three-canvas-container');
  if (!container) return;

  // Ensure container has dimensions
  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: "high-performance"
  });
  
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  
  container.appendChild(renderer.domElement);

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const count = window.innerWidth < 768 ? 1500 : 3000; // Fewer particles on mobile for performance
  const positions = new Float32Array(count * 3);

  for(let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: window.innerWidth < 768 ? 0.04 : 0.025, // Larger dots on mobile
    color: '#B0E4CC', 
    transparent: true,
    opacity: 0.7
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Center Shape
  const geometry = new THREE.IcosahedronGeometry(window.innerWidth < 768 ? 1.2 : 2, 1);
  const material = new THREE.MeshBasicMaterial({ 
    color: '#408A71', 
    wireframe: true, 
    transparent: true, 
    opacity: 0.2 
  });
  const shape = new THREE.Mesh(geometry, material);
  shape.position.y = 1.2; // Move it up
  scene.add(shape);

  camera.position.z = 5;

  let mouseX = 0;
  let mouseY = 0;

  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  };

  const onTouchMove = (e) => {
    if (e.touches.length > 0) {
      mouseX = (e.touches[0].clientX / window.innerWidth) - 0.5;
      mouseY = (e.touches[0].clientY / window.innerHeight) - 0.5;
    }
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('touchmove', onTouchMove);

  window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    
    shape.rotation.y += 0.003;
    shape.rotation.x += 0.001;
    
    particles.rotation.y += (mouseX * 0.5 - particles.rotation.y) * 0.05;
    particles.rotation.x += (-mouseY * 0.5 - particles.rotation.x) * 0.05;

    renderer.render(scene, camera);
  };

  animate();
};

// Initialize after DOM is ready
if (document.readyState === 'complete') {
  initThreeHero();
} else {
  window.addEventListener('load', initThreeHero);
}

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Select elements to animate and apply class
document.querySelectorAll('.section').forEach(section => {
  section.classList.add('fade-in-section');
  observer.observe(section);
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-list');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Disable Right-Click Context Menu
document.addEventListener('contextmenu', (e) => e.preventDefault());
