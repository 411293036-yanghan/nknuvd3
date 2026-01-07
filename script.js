document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.reveal, .fade-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Map Interaction (Enhanced)
    const mapPins = document.querySelectorAll('.map-pin');
    mapPins.forEach(pin => {
        // 添加脈衝動畫
        pin.style.animation = 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';
        
        // 添加懸停提示
        pin.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1.5)';
            this.style.boxShadow = '0 0 20px var(--primary)';
        });
        
        pin.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(-50%, -50%) scale(1)';
            this.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
        });
        
        pin.addEventListener('click', function(e) {
            // Create enhanced ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: var(--primary);
                opacity: 0.8;
                animation: ripple-expand 1s ease-out forwards;
                pointer-events: none;
            `;
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);

            const country = this.dataset.country;
            
            // 創建浮動通知
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, var(--primary), var(--river-blue));
                color: white;
                padding: 1.5rem 2rem;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                z-index: 10000;
                font-weight: 600;
                animation: slideInRight 0.5s ease-out;
            `;
            notification.textContent = `📍 探索國家: ${country}`;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.5s ease-out';
                setTimeout(() => notification.remove(), 500);
            }, 2500);
        });
    });
    
    // 添加動畫樣式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
