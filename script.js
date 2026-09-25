        // --- 1. Project Gallery Data & Logic ---
        const projectData = {
            'field-notes': {
                title: 'BOOKIT',
                desc: 'A calm workspace for teams to turn messy research into clear decisions. Features real-time collaboration, rich text editing, and powerful tagging.',
                tags: ['React', 'SpringBoot', 'PostgreSQL', 'Node.js'],
                link: '#',
                images: [
                    'Video/Project1/Booking_system.mp4',
                    'Images/Project1/first page.png',
                    'Images/Project1/login.png',
                    'Images/Project1/Admin_Dashboard.png',
                    'Images/Project1/Manager_Dashboard.png',
                    'Images/Project1/Booking Pannel.png'
                ]
            },
            'motion-goods': {
                title: 'Motion Goods',
                desc: 'A high-performance storefront designed for independent creators to sell physical and digital goods with seamless checkout flows.',
                tags: ['Next.js', 'Shopify', 'Framer Motion', 'Tailwind'],
                link: '#',
                images: [
                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2194&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
                ]
            },
            'open-table': {
                title: 'Open Table',
                desc: 'Making local food networks easier to find, join, and care for. A community-driven map and directory application.',
                tags: ['Vue', 'Google Maps API', 'Firebase', 'UX Design'],
                link: '#',
                images: [
                    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop'
                ]
            }
        };

        const modal = document.getElementById('gallery-modal');
        const body = document.body;

        function openGallery(projectId) {
            const data = projectData[projectId];
            if (!data) return;

            // Populate Content
            document.getElementById('modal-title').innerText = data.title;
            document.getElementById('modal-desc').innerText = data.desc;

            // Populate Tags
            const tagsContainer = document.getElementById('modal-tags');
            tagsContainer.innerHTML = '';
            data.tags.forEach(tag => {
                tagsContainer.innerHTML += `<span class="text-xs border border-white/30 rounded-full px-3 py-1 text-white/80">${tag}</span>`;
            });

            // Populate Thumbnails
            const thumbContainer = document.getElementById('modal-thumbnails');
            thumbContainer.innerHTML = '';
            data.images.forEach((imgSrc, index) => {
                const isActive = index === 0;
                const isVideo = imgSrc.match(/\.(mp4|webm|ogg|mov)$/i);
                const thumbContent = isVideo ? 
                    `<div class="w-full h-full bg-black/80 flex items-center justify-center text-white"><i class="ph ph-play-circle text-3xl"></i></div>` : 
                    `<img src="${imgSrc}" class="w-full h-full object-cover">`;

                thumbContainer.innerHTML += `
                    <button onclick="setMainMedia('${imgSrc}', this)" class="h-full aspect-video rounded overflow-hidden border-2 ${isActive ? 'border-brand-accent opacity-100' : 'border-transparent opacity-50 hover:opacity-100'} transition-all shrink-0 thumb-btn relative bg-gray-900">
                        ${thumbContent}
                    </button>
                `;
            });

            // Populate Main Media
            setMainMedia(data.images[0], null);

            // Show Modal
            modal.classList.remove('hidden');
            body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        function setMainMedia(src, btnEl) {
            const mainImg = document.getElementById('modal-main-img');
            const mainVideo = document.getElementById('modal-main-video');
            const isVideo = src.match(/\.(mp4|webm|ogg|mov)$/i);

            // Fade out
            mainImg.style.opacity = 0;
            mainVideo.style.opacity = 0;

            setTimeout(() => {
                if (isVideo) {
                    mainImg.classList.add('hidden');
                    mainVideo.classList.remove('hidden');
                    mainVideo.src = src;
                    mainVideo.style.opacity = 1;
                    mainVideo.play().catch(e => console.log('Autoplay prevented'));
                } else {
                    mainVideo.classList.add('hidden');
                    mainVideo.pause();
                    mainImg.classList.remove('hidden');
                    mainImg.src = src;
                    mainImg.style.opacity = 1;
                }
            }, 150);

            // Update thumbnail active states
            if (btnEl) {
                document.querySelectorAll('.thumb-btn').forEach(btn => {
                    btn.classList.remove('border-brand-accent', 'opacity-100');
                    btn.classList.add('border-transparent', 'opacity-50');
                });
                btnEl.classList.add('border-brand-accent', 'opacity-100');
                btnEl.classList.remove('border-transparent', 'opacity-50');
            }
        }

        function closeGallery() {
            modal.classList.add('hidden');
            body.style.overflow = 'auto'; // Restore background scrolling
        }

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeGallery();
            }
        });


        // --- 2. Contact Form Handling ---
        const contactForm = document.getElementById('contact-form');
        const successMessage = document.getElementById('success-message');
        const submitBtn = document.getElementById('submit-btn');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate sending state
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="ph ph-spinner animate-spin"></i>`;
            submitBtn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                contactForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
                submitBtn.innerHTML = originalBtnHtml;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1000);
        });

        function resetForm() {
            successMessage.classList.add('hidden');
            contactForm.classList.remove('hidden');
        }


        // --- 3. Auto-resizing Textarea ---
        const textarea = document.getElementById('message');
        textarea.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });


        // --- 4. Floating Nav Styling on Scroll ---
        const nav = document.getElementById('nav-container');
        const contactSection = document.getElementById('contact');
        const footerSection = document.querySelector('footer');
        const navLinks = document.querySelectorAll('.nav-link');
        const navCta = document.getElementById('nav-cta');

        window.addEventListener('scroll', () => {
            // Change nav style based on background
            const footerTop = footerSection.getBoundingClientRect().top;

            if (footerTop < window.innerHeight - 50) {
                // We are in the dark footer area
                nav.classList.add('glass-nav-dark');
                nav.classList.remove('glass-nav');

                navLinks.forEach(link => {
                    link.classList.remove('text-brand-text');
                    link.classList.add('text-white');
                });

                navCta.classList.add('text-white', 'border-white');
                navCta.classList.remove('text-brand-text', 'border-brand-text');

            } else {
                // Normal light area
                nav.classList.remove('glass-nav-dark');
                nav.classList.add('glass-nav');

                navLinks.forEach(link => {
                    link.classList.add('text-brand-text');
                    link.classList.remove('text-white');
                });

                navCta.classList.remove('text-white', 'border-white');
                navCta.classList.add('text-brand-text', 'border-brand-text');
            }
        });

        // Initialize nav styling on load
        window.dispatchEvent(new Event('scroll'));

