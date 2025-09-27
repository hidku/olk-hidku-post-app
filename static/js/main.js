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
    
    // Efecto parallax removido para mantener navbar fija
    
    // Efectos hover removidos para mantener navbar fija
    
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
    
    // Navegación fija - sin efectos de scroll
    
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
    
    // Forzar navbar completamente fija y centrada en la parte superior
    const navbar = document.querySelector('.floating-nav');
    if (navbar) {
        // Resetear cualquier transformación y centrar en la parte superior
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '50%';
        navbar.style.transform = 'translateX(-50%)';
        navbar.style.zIndex = '9999';
        navbar.style.display = 'flex';
        navbar.style.justifyContent = 'center';
        navbar.style.alignItems = 'center';
        navbar.style.width = '100%';
        
        // Prevenir cualquier cambio en scroll y mantener centrado superior
        window.addEventListener('scroll', function() {
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.left = '50%';
            navbar.style.transform = 'translateX(-50%)';
            navbar.style.display = 'flex';
            navbar.style.justifyContent = 'center';
            navbar.style.alignItems = 'center';
            navbar.style.width = '100%';
        });
        
        // Asegurar centrado en resize
        window.addEventListener('resize', function() {
            navbar.style.left = '50%';
            navbar.style.transform = 'translateX(-50%)';
            navbar.style.width = '100%';
        });
    }
    
    console.log('🚀 Hidku Portfolio - JavaScript cargado correctamente');
});
