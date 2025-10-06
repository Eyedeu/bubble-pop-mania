// Bubble Pop Mania - Optimize Edilmiş Versiyon

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
        this.lastSpawnTime = 0;
        
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
            
            // Canvas boyutlarını ayarla
            this.canvas.width = 400;
            this.canvas.height = 600;
            
            this.drawWelcomeScreen();
            console.log('✅ Canvas hazırlandı: ', this.canvas.width + 'x' + this.canvas.height);
        } else {
            console.error('❌ Canvas bulunamadı!');
        }
    }
    
    setupEventListeners() {
        // Play butonu
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('🎯 Play butonuna tıklandı');
                this.startGame();
            });
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
        
        // Canvas tıklama - DÜZELTİLDİ
        if (this.canvas) {
            this.canvas.addEventListener('click', (e) => {
                console.log('🖱️ Canvas tıklandı');
                this.handleCanvasClick(e);
            });
            
            // Mobil dokunma desteği
            this.canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('click', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                this.canvas.dispatchEvent(mouseEvent);
            });
        }
        
        // Power-up butonları
        const powerupBtns = document.querySelectorAll('.powerup-btn');
        powerupBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('⚡ Power-up:', btn.textContent);
                this.usePowerUp(btn.id);
            });
        });
    }
    
    startGame() {
        console.log('🎯 Oyun başlıyor...');
        this.gameState = 'playing';
        this.score = 0;
        this.combo = 1;
        this.lives = 5;
        this.bubbles = [];
        this.lastSpawnTime = Date.now();
        
        this.showScreen('game-screen');
        this.updateUI();
        
        // İlk balonları oluştur
        this.createBubble();
        this.createBubble();
        this.createBubble();
        
        // Oyun döngüsünü başlat
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
            console.log('📺 Ekran değişti:', screenId);
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
    
    createBubble() {
        const bubble = {
            x: Math.random() * (this.canvas.width - 80) + 40, // Kenarlara çok yakın olmasın
            y: this.canvas.height + 50, // Alt taraftan başlasın
            radius: Math.random() * 10 + 25, // 25-35 arası radius
            speed: Math.random() * 1 + 0.5, // 0.5-1.5 arası hız (YAVAS)
            color: this.getRandomBubbleColor(),
            id: Date.now() + Math.random(),
            alive: true
        };
        
        bubble.points = this.getBubblePoints(bubble.color);
        this.bubbles.push(bubble);
        
        console.log('🫧 Yeni balon oluşturuldu:', bubble.color, 'Puan:', bubble.points);
        return bubble;
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
        if (this.gameState !== 'playing') {
            console.log('⏸️ Oyun durdu');
            return;
        }
        
        // Balonları güncelle
        this.updateBubbles();
        
        // Oyunu çiz
        this.drawGame();
        
        // Yeni balon spawn (3 saniyede bir)
        const now = Date.now();
        if (now - this.lastSpawnTime > 3000 && this.bubbles.length < 6) {
            this.createBubble();
            this.lastSpawnTime = now;
        }
        
        // Sonraki frame
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
    
    updateBubbles() {
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const bubble = this.bubbles[i];
            
            if (!bubble.alive) continue;
            
            // Balonu yukarı hareket ettir
            bubble.y -= bubble.speed;
            
            // Ekranın üstüne çıkan balonları kaldır
            if (bubble.y + bubble.radius < -50) {
                console.log('💔 Balon kaçtı! Can -1');
                this.bubbles.splice(i, 1);
                this.lives--;
                this.combo = 1; // Combo resetle
                
                if (this.lives <= 0) {
                    this.gameOver();
                    return;
                }
                this.updateUI();
            }
        }
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
        
        // Aktif balonları çiz
        this.bubbles.forEach(bubble => {
            if (bubble.alive) {
                this.drawBubble(bubble.x, bubble.y, bubble.radius, bubble.color);
            }
        });
        
        // Debug bilgisi
        this.ctx.fillStyle = '#333';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`Balonlar: ${this.bubbles.length}`, 10, 20);
        this.ctx.fillText(`Durum: ${this.gameState}`, 10, 35);
    }
    
    drawBubble(x, y, radius, color) {
        if (!this.ctx) return;
        
        // Gölge
        this.ctx.beginPath();
        this.ctx.arc(x + 2, y + 2, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fill();
        
        // Ana balon
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        
        // Parlaklık efekti
        this.ctx.beginPath();
        this.ctx.arc(x - radius/3, y - radius/3, radius/4, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.fill();
        
        // Kenarlık
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
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
        this.ctx.fillText('🫧 Bubble Pop Mania 🫧', this.canvas.width/2, this.canvas.height/2 - 50);
        
        this.ctx.font = '16px Arial';
        this.ctx.fillText('OYNA butonuna bas!', this.canvas.width/2, this.canvas.height/2);
        
        this.ctx.font = '14px Arial';
        this.ctx.fillText('Balonlara tıklayarak puan kazan', this.canvas.width/2, this.canvas.height/2 + 50);
        
        this.ctx.font = '12px Arial';
        this.ctx.fillText('🔴 = 5 puan  🟡 = 10 puan  🟣 = 50 puan', this.canvas.width/2, this.canvas.height/2 + 100);
    }
    
    handleCanvasClick(e) {
        if (this.gameState !== 'playing') return;
        
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        console.log('🖱️ Tıklama konumu:', x.toFixed(1), y.toFixed(1));
        
        // Tıklanan balonu bul
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const bubble = this.bubbles[i];
            if (!bubble.alive) continue;
            
            const distance = Math.sqrt((x - bubble.x) ** 2 + (y - bubble.y) ** 2);
            
            if (distance <= bubble.radius + 5) { // 5px tolerans
                console.log('💥 Balon patladı!', bubble.color);
                this.popBubble(i);
                return; // Sadece bir balon patlasın
            }
        }
        
        console.log('❌ Hiçbir balona değmedi');
    }
    
    popBubble(index) {
        const bubble = this.bubbles[index];
        const points = bubble.points * this.combo;
        
        // Balonu işaretle
        bubble.alive = false;
        
        // Puanları güncelle
        this.score += points;
        this.combo++;
        
        // Balonu listeden kaldır
        this.bubbles.splice(index, 1);
        
        this.updateUI();
        console.log(`💥 Balon patladı! +${points} puan (${this.combo-1}x combo)`);
        
        // Başarı sesi (console'da)
        if (points >= 50) {
            console.log('🎉 SÜPER! Elmas balon!');
        } else if (points >= 20) {
            console.log('⭐ Harika! Altın balon!');
        }
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
        
        if (powerupId === 'freeze-btn') {
            // 3 saniye dondurma
            this.bubbles.forEach(bubble => bubble.speed = 0.1);
            setTimeout(() => {
                this.bubbles.forEach(bubble => bubble.speed = Math.random() * 1 + 0.5);
            }, 3000);
        } else if (powerupId === 'double-btn') {
            // 5 saniye 2x puan
            const oldCombo = this.combo;
            this.combo = oldCombo * 2;
            setTimeout(() => {
                this.combo = oldCombo;
            }, 5000);
        }
    }
}

// Oyunu başlat
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM yüklendi, oyun oluşturuluyor...');
    window.game = new BubblePopGame();
});
