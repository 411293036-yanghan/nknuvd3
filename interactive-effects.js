// 互動效果 JavaScript - 多元動態網頁特效

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 粒子動畫系統
    function createParticles() {
        const container = document.createElement('div');
        container.className = 'particles-container';
        document.body.prepend(container);
        
        const colors = ['#00FFE0', '#8BCAFE', '#96D1C3'];
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 20 + 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            
            container.appendChild(particle);
        }
    }
    
    createParticles();
    
    // 2. 滑鼠點擊貝殼特效
    document.addEventListener('click', (e) => {
        createClickEffect(e.clientX, e.clientY);
    });
    
    function createClickEffect(x, y) {
        const clickImg = document.createElement('img');
        clickImg.src = '圖片/貝殼.png';
        clickImg.className = 'click-effect';
        clickImg.style.left = `${x}px`;
        clickImg.style.top = `${y}px`;
        document.body.appendChild(clickImg);
        
        setTimeout(() => clickImg.remove(), 800);
    }
    
    // 3. 視差滾動效果 - 已移除以避免佈局問題
    
    // 4. 打字機效果 - 已移除避免標題顯示問題
    
    // 5. 數字計數動畫
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = Math.floor(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // 為所有計數器添加動畫
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target) || 100;
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // 6. 進度條動畫
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.progress-fill');
                if (fill) {
                    const percentage = fill.dataset.percentage || '80';
                    setTimeout(() => {
                        fill.style.width = percentage + '%';
                    }, 200);
                }
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
    
    // 7. 卡片3D傾斜效果 - 簡化避免佈局問題
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.style.opacity || card.style.opacity === '1') {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.style.opacity || card.style.opacity === '1') {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // 8. 滾動觸發顯示動畫增強 - 簡化避免衝突
    const animateElements = document.querySelectorAll('.card');
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animateObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        if (!el.style.opacity) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.5s ease-out';
            animateObserver.observe(el);
        }
    });
    
    // 9. 添加互動式標籤雲
    function createTagCloud(container, tags) {
        const tagCloud = document.createElement('div');
        tagCloud.className = 'tag-cloud';
        
        tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag';
            tagEl.textContent = tag;
            tagEl.style.animationDelay = `${Math.random() * 0.5}s`;
            tagCloud.appendChild(tagEl);
        });
        
        container.appendChild(tagCloud);
    }
    
    // 10. 按鈕脈衝效果
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(btn => {
        btn.classList.add('pulse-button');
        
        btn.addEventListener('click', function(e) {
            // 點擊漣漪效果
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = ripple.style.height = '100px';
            ripple.style.left = e.offsetX - 50 + 'px';
            ripple.style.top = e.offsetY - 50 + 'px';
            ripple.style.animation = 'ripple-expand 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // 11. 滑鼠懸停光暈效果 - 已移除避免效能問題
    
    // 12. 平滑滾動到錨點
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
    
    // 13. 添加懸浮提示框
    function addTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-content';
        tooltip.textContent = text;
        element.classList.add('tooltip-trigger');
        element.appendChild(tooltip);
    }
    
    // 14. 背景音效觸發器 - 已移除
    
    // 15. 隨機漂浮動畫 - 已移除以避免與原有動畫衝突
    
    // 16. 鍵盤快捷鍵導航
    document.addEventListener('keydown', (e) => {
        // Alt + 數字鍵快速導航
        if (e.altKey) {
            const sections = document.querySelectorAll('section');
            const key = parseInt(e.key);
            if (key >= 1 && key <= sections.length) {
                sections[key - 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // 17. 滾動進度指示器
    function createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary), var(--river-blue));
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(indicator);
        
        window.addEventListener('scroll', () => {
            const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = scrollPercentage + '%';
        });
    }
    
    createScrollIndicator();
    
    // 18. 圖片延遲加載優化
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    console.log('🦦 互動效果已啟動！');
});

// 額外的浮動動畫 keyframes（如果CSS中沒有）
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);
