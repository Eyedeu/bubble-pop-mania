// Bubble Pop Mania - Sorunsuz Versiyon

class BubblePopGame {
    constructor() {
        this.gameState = 'menu';
        this.score = 0;
        this.combo = 1;
        this.level = 1;
        this.lives = 5;
        this.bubbles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        
        this.bubbleTypes = [
            {color: "#3B82F6", points: 1, name: "Mavi"},     // Blue
            {color: "#10B981", points: 2, name: "Yeşil"},    // Green  
            {color: "#EF4444", points: 5, name: "Kırmızı"},  // Red
            {color: "#F59E0B", points: 10, name: "Altın"},   // Gold
            {color: "#8B5CF6", points: 50, name: "Elmas"}    // Purple
        ];
        
        this.init();
    }
    
    init() {
        console.log('🎮 Bubble Pop Mania başlatılıyor...');
        this.setupCanvas();
        this.setupEventListeners();
        this.updateUI();
        console.log('✅ Oyun hazır!');
    }
    
    setupCanvas() {
        this.canvas = document.getElementById('game-canvas');
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.drawWelcomeScreen();
        } else {
            console.error('❌ Canvas bulunamadı!');
        }
    }
    
    setupEventListeners() {
        // Play butonu
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', () => this.startGame());
        }
        
        // Tutorial butonları
        const skipBtn = document.getElementById('skip-tutorial');
        const startBtn = document.getElementById('start-tutorial');
        if (skipBtn) skipBtn.addEventListener('click', () => this.startGame());
        if (startBtn) startBtn.addEventListener('click', () => this.startGame());
        
        // Game over butonları
        const playAgainBtn = document.getElementById('play-again-btn');
        const mainMenuBtn = document.getElementById('main-menu-btn');
        if (playAgainBtn) playAgainBtn.addEventListener('click', () => this.startGame());
        if (mainMenuBtn) mainMenuBtn.addEventListener('click', () => this.showMainMenu());
        
        // Canvas tıklama
        if (this.canvas) {
            this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        }
        
        // Power-up butonları
        const powerupBtns = document.querySelectorAll('.powerup-btn');
        powerupBtns.forEach(btn => {
            btn.addEventListener('click', () => this.usePowerUp(btn.id));
        });
    }
    
    startGame() {
        console.log('🎯 Oyun başlıyor...');
        this.gameState = 'playing';
        this.score = 0;
        this.combo = 1;
        this.lives = 5;
        this.bubbles = [];
        
        this.showScreen('game-screen');
        this.updateUI();
        this.spawnInitialBubbles();
        this.gameLoop();
    }
    
    showScreen(screenId) {
        // Tüm ekranları gizle
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
            screen.classList.remove('active');
        });
        
        // Seçili ekranı göster
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('active');
        }
    }
    
    showMainMenu() {
        this.gameState = 'menu';
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.showScreen('main-menu');
        this.drawWelcomeScreen();
    }
    
    spawnInitialBubbles() {
        this.bubbles = [];
        for (let i = 0; i < 5; i++) {
            this.createBubble();
        }
    }
    
    createBubble() {
        const bubble = {
            x: Math.random() * (this.canvas.width - 60) + 30,
            y: this.canvas.height + 30,
            radius: Math.random() * 15 + 20,
            speed: Math.random() * 2 + 1,
            color: this.getRandomBubbleColor(),
            points: this.getBubblePoints(this.getRandomBubbleColor()),
            id: Date.now() + Math.random()
        };
        
        this.bubbles.push(bubble);
    }
    
    getRandomBubbleColor() {
        const rand = Math.random() * 100;
        if (rand < 40) return this.bubbleTypes[0].color;      // Blue - 40%
        if (rand < 70) return this.bubbleTypes[1].color;      // Green - 30% 
        if (rand < 90) return this.bubbleTypes[2].color;      // Red - 20%
        if (rand < 98) return this.bubbleTypes[3].color;      // Gold - 8%
        return this.bubbleTypes[4].color;                     // Purple - 2%
    }
    
    getBubblePoints(color) {
        const type = this.bubbleTypes.find(t => t.color === color);
        return type ? type.points : 1;
    }
    
    gameLoop() {
        if (this.gameState !== 'playing') return;
        
        this.updateBubbles();
        this.drawGame();
        
        // Yeni bubble spawn
        if (Math.random() < 0.02 && this.bubbles.length < 8) {
            this.createBubble();
        }
        
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
    
    updateBubbles() {
        this.bubbles.forEach((bubble, index) => {
            bubble.y -= bubble.speed;
            
            // Ekranın üstüne çıkan bubbleları kaldır ve can düş
            if (bubble.y + bubble.radius < 0) {
                this.bubbles.splice(index, 1);
                this.lives--;
                this.combo = 1;
                
                if (this.lives <= 0) {
                    this.gameOver();
                }
            }
        });
    }
    
    drawGame() {
        if (!this.ctx) return;
        
        // Canvas'ı temizle
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Arka plan gradyanı
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#E0F6FF');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Bubbleları çiz
        this.bubbles.forEach(bubble => {
            this.drawBubble(bubble.x, bubble.y, bubble.radius, bubble.color);
        });
        
        // Eğer bubble yoksa bilgi göster
        if (this.bubbles.length === 0) {
            this.ctx.fillStyle = '#3B82F6';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Bubblelar geliyor...', this.canvas.width/2, this.canvas.height/2);
        }
    }
    
    drawBubble(x, y, radius, color) {
        if (!this.ctx) return;
        
        // Ana bubble
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        
        // Parlaklık efekti
        this.ctx.beginPath();
        this.ctx.arc(x - radius/3, y - radius/3, radius/3, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.fill();
        
        // Kenarlık
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    drawWelcomeScreen() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Arka plan
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Hoş geldin mesajı
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Bubble Pop Mania', this.canvas.width/2, this.canvas.height/2 - 50);
        
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Oynamak için OYNA butonuna bas!', this.canvas.width/2, this.canvas.height/2);
        
        this.ctx.font = '12px Arial';
        this.ctx.fillText('Kabarcıklara tıklayarak puan kazan 🫧', this.canvas.width/2, this.canvas.height/2 + 50);
    }
    
    handleCanvasClick(e) {
        if (this.gameState !== 'playing') return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Tıklanan konumda bubble var mı kontrol et
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const bubble = this.bubbles[i];
            const distance = Math.sqrt((x - bubble.x) ** 2 + (y - bubble.y) ** 2);
            
            if (distance <= bubble.radius) {
                // Bubble patladı!
                this.popBubble(i);
                break;
            }
        }
    }
    
    popBubble(index) {
        const bubble = this.bubbles[index];
        const points = bubble.points * this.combo;
        
        this.score += points;
        this.combo++;
        this.bubbles.splice(index, 1);
        
        this.updateUI();
        this.showPopEffect(bubble.x, bubble.y, points);
        
        console.log(`💥 Bubble patladı! +${points} puan (${this.combo-1}x combo)`);
    }
    
    showPopEffect(x, y, points) {
        // Basit popup efekti (console'da gösterilecek şimdilik)
        console.log(`✨ +${points} puan!`);
    }
    
    updateUI() {
        // Score güncelle
        const scoreEl = document.getElementById('current-score');
        if (scoreEl) scoreEl.textContent = this.score;
        
        // Combo güncelle
        const comboEl = document.getElementById('current-combo');
        if (comboEl) comboEl.textContent = this.combo + 'x';
        
        // Level güncelle
        const levelEl = document.getElementById('current-level');
        if (levelEl) levelEl.textContent = this.level;
        
        // Lives güncelle
        const livesEl = document.getElementById('current-lives');
        if (livesEl) livesEl.textContent = this.lives;
    }
    
    gameOver() {
        console.log('💀 Oyun bitti! Final puanı:', this.score);
        this.gameState = 'gameover';
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Final puanını güncelle
        const finalScoreEl = document.getElementById('final-score');
        const bestComboEl = document.getElementById('best-combo');
        
        if (finalScoreEl) finalScoreEl.textContent = this.score;
        if (bestComboEl) bestComboEl.textContent = (this.combo - 1) + 'x';
        
        this.showScreen('game-over');
    }
    
    usePowerUp(powerupId) {
        console.log('⚡ Power-up kullanıldı:', powerupId);
        // Power-up mantığı buraya eklenecek
    }
}

// Oyunu başlat
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM yüklendi, oyun oluşturuluyor...');
    window.game = new BubblePopGame();
});

// Service Worker kaydı
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => console.log('✅ ServiceWorker kaydedildi'))
            .catch(error => console.log('❌ ServiceWorker kayıt hatası:', error));
    });
}
