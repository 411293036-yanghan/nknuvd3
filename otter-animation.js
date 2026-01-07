// ========== 水獺互動動畫系統 ==========
document.addEventListener('DOMContentLoaded', () => {
    const floatingOtter = document.getElementById('floatingOtter');
    if (!floatingOtter) return;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let otterX = mouseX;
    let otterY = mouseY;
    let lastScrollY = window.scrollY;
    let scrollSpeed = 0;
    
    // 水獺跟隨滑鼠移動
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // 平滑移動水獺
    function moveOtter() {
        const dx = mouseX - otterX;
        const dy = mouseY - otterY;
        
        // 使用緩動效果
        otterX += dx * 0.08;
        otterY += dy * 0.08;
        
        floatingOtter.style.left = otterX + 'px';
        floatingOtter.style.top = otterY + 'px';
        
        // 根據移動方向旋轉水獺
        if (Math.abs(dx) > 1) {
            const rotation = dx > 0 ? 10 : -10;
            floatingOtter.style.transform = `rotate(${rotation}deg)`;
        }
        
        requestAnimationFrame(moveOtter);
    }
    moveOtter();
    
    // 根據滾動速度改變水獺狀態
    function calculateScrollSpeed() {
        const currentScrollY = window.scrollY;
        scrollSpeed = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;
    }
    
    // 根據頁面位置和滾動狀態改變水獺動畫
    function updateOtterAnimation() {
        calculateScrollSpeed();
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        
        // 移除所有狀態類別
        floatingOtter.className = 'floating-otter';
        
        // 根據滾動速度決定動畫
        if (scrollSpeed > 20) {
            floatingOtter.classList.add('swimming');
            return;
        }
        
        // 根據當前可見的區塊決定動畫
        const sections = document.querySelectorAll('section, header');
        let currentAnimation = '';
        
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
            
            if (isInView) {
                const sectionId = section.id || '';
                const sectionClass = section.className || '';
                const identifier = (sectionId + ' ' + sectionClass).toLowerCase();
                
                // 根據不同區塊設定不同動畫
                if (identifier.includes('hero')) {
                    currentAnimation = 'swimming';
                } else if (identifier.includes('intro')) {
                    currentAnimation = 'playing';
                } else if (identifier.includes('body') || identifier.includes('structure')) {
                    currentAnimation = 'diving';
                } else if (identifier.includes('behavior') || identifier.includes('habit')) {
                    currentAnimation = 'playing';
                } else if (identifier.includes('map') || identifier.includes('legal')) {
                    currentAnimation = 'swimming';
                } else if (identifier.includes('threat') || identifier.includes('warning')) {
                    currentAnimation = 'sleeping';
                } else if (identifier.includes('conservation') || identifier.includes('coexist')) {
                    currentAnimation = 'playing';
                } else if (identifier.includes('fact') || identifier.includes('fun')) {
                    currentAnimation = 'diving';
                }
            }
        });
        
        if (currentAnimation) {
            floatingOtter.classList.add(currentAnimation);
        }
        
        // 特殊位置的動畫
        if (scrollPercent < 0.05) {
            floatingOtter.classList.remove('swimming', 'diving', 'sleeping');
            floatingOtter.classList.add('playing');
        } else if (scrollPercent > 0.95) {
            floatingOtter.classList.remove('swimming', 'diving', 'playing');
            floatingOtter.classList.add('sleeping');
        }
    }
    
    // 監聽滾動事件
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        updateOtterAnimation();
        
        // 滾動停止後重置滾動速度
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            scrollSpeed = 0;
            updateOtterAnimation();
        }, 150);
    });
    
    // 初始化
    updateOtterAnimation();
    
    // 點擊水獺時的互動
    floatingOtter.style.pointerEvents = 'auto';
    floatingOtter.style.cursor = 'pointer';
    
    floatingOtter.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // 隨機選擇一個動畫
        const animations = ['swimming', 'diving', 'playing'];
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];
        
        floatingOtter.className = 'floating-otter ' + randomAnim;
        
        // 創建泡泡效果
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createBubble(otterX, otterY);
            }, i * 100);
        }
        
        // 2秒後恢復正常
        setTimeout(() => {
            updateOtterAnimation();
        }, 2000);
    });
    
    // 創建泡泡效果
    function createBubble(x, y) {
        const bubble = document.createElement('div');
        bubble.style.position = 'fixed';
        bubble.style.left = (x + Math.random() * 60 - 30) + 'px';
        bubble.style.top = y + 'px';
        bubble.style.width = (10 + Math.random() * 10) + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.background = 'rgba(139, 202, 254, 0.6)';
        bubble.style.borderRadius = '50%';
        bubble.style.pointerEvents = 'none';
        bubble.style.zIndex = '998';
        bubble.style.animation = 'bubbleRise 2s ease-out forwards';
        
        document.body.appendChild(bubble);
        
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.remove();
            }
        }, 2000);
    }
    
    console.log('🦦 水獺互動系統已啟動！');
});
