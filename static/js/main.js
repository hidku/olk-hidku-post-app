// JavaScript para funcionalidad del sitio
document.addEventListener('DOMContentLoaded', function() {
    
    // Funcionalidad del menú móvil
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
                // Cerrar todos los dropdowns cuando se cierra el menú
                navDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
        
        // Manejar clicks en dropdowns para móvil
        navDropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', function(e) {
                    // Solo prevenir default en móvil
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
        
        // Cerrar menú al hacer click en un enlace (no dropdown)
        const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    navDropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
        });
        
        // Cerrar menú al redimensionar ventana
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                navDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
        
        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                navDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
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
    
    // Efecto parallax removido para mantener navegación fija
    
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
    
    // Mantener navegación fija al hacer scroll
    const nav = document.querySelector('.floating-nav');
    
    if (nav) {
        // Asegurar que la navegación esté siempre fija
        nav.style.position = 'fixed';
        nav.style.top = '20px';
        nav.style.left = '50%';
        nav.style.transform = 'translateX(-50%)';
        nav.style.zIndex = '1000';
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Mantener la navegación siempre visible y fija
            nav.style.transform = 'translateX(-50%) translateY(0)';
            
            // Ajustar opacidad basada en el scroll
            if (scrollTop > 50) {
                nav.style.background = 'rgba(20, 20, 20, 0.9)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(20, 20, 20, 0.8)';
                nav.style.backdropFilter = 'blur(15px)';
            }
        });
    }
    
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
