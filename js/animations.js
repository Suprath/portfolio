// animations.js

// Function to animate the hero content
function animateHeroContent() {
    gsap.from(".hero-content", {
        duration: 1,
        y: 50, // Slide from below
        opacity: 0, // Start invisible
        ease: "power2.out"
    });

    gsap.from(".profile-picture", {
        duration: 1,
        scale: 0, // Scale from 0
        opacity: 0,
        ease: "back.out(1.7)",
        delay: 0.5 // Delay to create a staggered effect
    });

    gsap.from("#hero h1", {
        duration: 1,
        y: -50, // Slide from above
        opacity: 0,
        ease: "power2.out",
        delay: 1 // Delay for sequential animation
    });

    gsap.from("#hero h2", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power2.out",
        delay: 1.2 // Delay for sequential animation
    });
}

// Function to animate sections on scroll
function animateOnScroll() {
    gsap.utils.toArray(".animate-on-scroll").forEach((section) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%", // Start animation when the top of the section hits 80% of the viewport height
                toggleActions: "play none none reverse", // Play on enter, reverse on leave
            },
            y: 50, // Slide from below
            opacity: 0, // Start invisible
            duration: 1,
            ease: "power2.out"
        });
    });
}

// Function to load gallery items
async function loadGalleryItems() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (!galleryGrid) {
        console.error('Gallery grid not found');
        return;
    }
    
    try {
        const response = await fetch('gallery-items.json');
        const data = await response.json();
        const galleryItems = data.items;

        galleryItems.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';

            if (item.type === 'image') {
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = 'Gallery Image';
                img.loading = 'lazy';
                galleryItem.appendChild(img);
            } else if (item.type === 'video') {
                const video = document.createElement('video');
                video.src = item.src;
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                video.controls = false;
                video.loading = 'lazy';
                galleryItem.appendChild(video);
            }

            galleryGrid.appendChild(galleryItem);
        });

        // Initialize Masonry after all items are loaded
        initMasonryForGallery();
    } catch (error) {
        console.error('Error loading gallery items:', error);
    }
}

// Function to initialize Masonry for the gallery
function initMasonryForGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) {
        console.error('Gallery grid not found');
        return;
    }
    
    imagesLoaded(galleryGrid, function() {
        new Masonry(galleryGrid, {
            itemSelector: '.gallery-item',
            columnWidth: '.gallery-item',
            percentPosition: true,
            gutter: 10,
            transitionDuration: 0 // Disable animation for smoother layout
        });
    });
}

// Call the animation functions when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    animateHeroContent();
    animateOnScroll();
    loadGalleryItems();
});

// Reinitialize Masonry on window resize
window.addEventListener('resize', () => {
    initMasonryForGallery();
});