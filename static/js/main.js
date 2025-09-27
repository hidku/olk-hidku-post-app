// JavaScript para funcionalidad del sitio
document.addEventListener('DOMContentLoaded', function() {
    
    // Funcionalidad del modal para imágenes
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.close');
    
    // Abrir modal cuando se hace clic en una imagen de la galería
    document.addEventListener('click', function(e) {
        if (e.target.closest('.gallery-item')) {
            const galleryItem = e.target.closest('.gallery-item');
            const img = galleryItem.querySelector('img');
            
            if (img) {
                // Obtener datos del elemento
                const title = galleryItem.dataset.title || 'Proyecto';
                const date = galleryItem.dataset.date || '';
                const description = galleryItem.dataset.description || 'Descripción del proyecto';
                const technologies = galleryItem.dataset.technologies || '';
                const tags = galleryItem.dataset.tags || '';
                const demo = galleryItem.dataset.demo || '';
                const status = galleryItem.dataset.status || '';
                
                // Configurar imagen
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                
                // Configurar información
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalDate').textContent = date;
                document.getElementById('modalDescription').textContent = description;
                
                // Configurar tecnologías
                const techContainer = document.getElementById('modalTech');
                if (technologies) {
                    techContainer.innerHTML = technologies.split(', ').map(tech => 
                        `<span>${tech}</span>`
                    ).join('');
                } else {
                    techContainer.innerHTML = '<span>No especificadas</span>';
                }
                
                // Configurar tags
                const tagsContainer = document.getElementById('modalTags');
                if (tags) {
                    tagsContainer.innerHTML = tags.split(', ').map(tag => 
                        `<span>${tag}</span>`
                    ).join('');
                } else {
                    tagsContainer.innerHTML = '<span>Sin tags</span>';
                }
                
                // Configurar status
                const statusElement = document.getElementById('modalStatus');
                if (status) {
                    statusElement.textContent = status;
                    statusElement.className = `modal-status status-${status}`;
                    statusElement.style.display = 'inline-block';
                } else {
                    statusElement.style.display = 'none';
                }
                
                // Configurar demo
                const demoLink = document.getElementById('modalDemo');
                if (demo) {
                    demoLink.href = demo;
                    demoLink.style.display = 'inline-block';
                } else {
                    demoLink.style.display = 'none';
                }
                
                // Mostrar modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
    });
    
    // Cerrar modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Efecto de scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animación de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.home-content, .contact-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Efecto parallax suave en el scroll
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.floating-nav');
        
        if (parallax) {
            const speed = scrolled * 0.1;
            parallax.style.transform = `translateX(-50%) translateY(${speed}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Efecto hover mejorado para enlaces de navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Cargar imágenes con lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Mostrar/ocultar navegación en scroll
    let lastScrollTop = 0;
    const nav = document.querySelector('.floating-nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav.style.transform = 'translateX(-50%) translateY(-100px)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateX(-50%) translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Efecto de typing para el título principal
    const titleElement = document.querySelector('.home-section h1');
    if (titleElement) {
        const originalText = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                titleElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
    
    console.log('🚀 Hidku Portfolio - JavaScript cargado correctamente');
});
