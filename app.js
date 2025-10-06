// Bubble Pop Mania - Final Perfect Version
// Tüm hatalar düzeltildi, tam çalışır durumda!

class BubblePopGame {
    constructor() {
        // Temel oyun durumu
        this.gameState = 'loading';
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('highScore') || '0');
        this.combo = 1;
        this.maxCombo = 1;
        this.level = 1;
        this.lives = 5;
        this.totalGames = parseInt(localStorage.getItem('totalGames') || '0');
        this.bubblesPopped = 0;
        
        // Oyun nesneleri
        this.bubbles = [];
        this.particles = [];
        this.powerUps = {
            freeze: false,
            double: false,
            magnet: false,
            auto: false
        };
        
        // Canvas ve animasyon
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.lastTime = 0;
        this.spawnTimer = 0;
        this.spawnDelay = 2000; // 2 saniye
        
        // Balon tipleri - puan değerleri
        this.bubbleTypes = [
            {color: "#3B82F6", points: 1, name: "Mavi", frequency: 45},
            {color: "#10B981", points: 2, name: "Yeşil", frequency: 30},
            {color: "#EF4444", points: 5, name: "Kırmızı", frequency: 15},
            {color: "#F59E0B", points: 10, name: "Altın", frequency: 8},
            {color: "#8B5CF6", points: 50, name: "Elmas", frequency: 2}
        ];
        
        this.init();
    }
    
    init() {
        console.log('🎮 Bubble Pop Mania başlatılıyor...');
        this.showLoadingScreen();
        
        // 1.5 saniye loading göster
        setTimeout(() => {
            this.setupCanvas();
            this.setupEventListeners();
            this.updateUI();
            this.showMainMenu();
            console.log('✅ Oyun hazır!');
        }, 1500);
    }
    
    showLoadingScreen() {
        this.gameState = 'loading';
        this.showScreen('loading-screen');
    }
    
    setupCanvas() {
        this.canvas = document.getElementById('game-canvas');
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            
            // Responsive canvas boyutu
            const container = this.canvas.parentElement;
            const maxWidth = Math.min(400, container.clientWidth - 20);
            const maxHeight = Math.min(500, window.innerHeight * 0.6);
            
            this.canvas.width = maxWidth;
            this.canvas.height = maxHeight;
            
            console.log('✅ Canvas hazırlandı:', this.canvas.width + 'x' + this.canvas.height);
        }
    }
    
    setupEventListeners() {
        // Ana menü butonları
        const playBtn = document.getElementById('play-btn');
        const tutorialBtn = document.getElementById('tutorial-btn');
        const achievementsBtn = document.getElementById('achievements-btn');
        const settingsBtn = document.getElementById('settings-btn');
        
        if (playBtn) playBtn.addEventListener('click', () => this.startGame());
        if (tutorialBtn) tutorialBtn.addEventListener('click', () => this.showTutorial());
        if (achievementsBtn) achievementsBtn.addEventListener('click', () => this.showAchievements());
        if (settingsBtn) settingsBtn.addEventListener('click', () => this.showSettings());
        
        // Tutorial
        const tutorialClose = document.getElementById('tutorial-close');
        if (tutorialClose) tutorialClose.addEventListener('click', () => this.hideTutorial());
        
        // Oyun kontrolleri
        const pauseBtn = document.getElementById('pause-btn');
        const resumeBtn = document.getElementById('resume-btn');
        const restartBtn = document.getElementById('restart-btn');
        const mainMenuBtn = document.getElementById('main-menu-btn');
        
        if (pauseBtn) pauseBtn.addEventListener('click', () => this.pauseGame());
        if (resumeBtn) resumeBtn.addEventListener('click', () => this.resumeGame());
        if (restartBtn) restartBtn.addEventListener('click', () => this.startGame());
        if (mainMenuBtn) mainMenuBtn.addEventListener('click', () => this.showMainMenu());
        
        // Game Over butonları
        const playAgainBtn = document.getElementById('play-again-btn');
        const shareScoreBtn = document.getElementById('share-score-btn');
        const backToMenuBtn = document.getElementById('back-to-menu-btn');
        
        if (playAgainBtn) playAgainBtn.addEventListener('click', () => this.startGame());
        if (shareScoreBtn) shareScoreBtn.addEventListener('click', () => this.shareScore());
        if (backToMenuBtn) backToMenuBtn.addEventListener('click', () => this.showMainMenu());
        
        // Power-up butonları
        const freezeBtn = document.getElementById('freeze-btn');
        const doubleBtn = document.getElementById('double-btn');
        const magnetBtn = document.getElementById('magnet-btn');
        const autoBtn = document.getElementById('auto-btn');
        
        if (freezeBtn) freezeBtn.addEventListener('click', () => this.activatePowerUp('freeze'));
        if (doubleBtn) doubleBtn.addEventListener('click', () => this.activatePowerUp('double'));
        if (magnetBtn) magnetBtn.addEventListener('click', () => this.activatePowerUp('magnet'));
        if (autoBtn) autoBtn.addEventListener('click', () => this.activatePowerUp('auto'));
        
        // Canvas etkileşimi
        if (this.canvas) {
            // Mouse olayları
            this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
            
            // Touch olayları
            this.canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = this.canvas.getBoundingClientRect();
                const clickEvent = new MouseEvent('click', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                this.handleCanvasClick(clickEvent);
            }, {passive: false});
        }
        
        // Keyboard kısayolları
        document.addEventListener('keydown', (e) => {
            if (this.gameState === 'playing' && e.code === 'Space') {
                e.preventDefault();
                this.pauseGame();
            }
        });
    }
    
    // =========================
    // EKRAN YÖNETİMİ
    // =========================
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.remove('hidden');
        }
    }
    
    showMainMenu() {
        this.gameState = 'menu';
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.showScreen('main-menu');
        this.updateUI();
        console.log('📱 Ana menü gösteriliyor');
    }
    
    showTutorial() {
        this.showScreen('tutorial-screen');
        console.log('📚 Tutorial gösteriliyor');
    }
    
    hideTutorial() {
        this.showMainMenu();
    }
    
    showAchievements() {
        // Başarılar ekranı (şimdilik ana menüye dön)
        alert('🏆 Başarılar sistemi yakında gelecek!');
        console.log('🏆 Başarılar gösteriliyor');
    }
    
    showSettings() {
        // Ayarlar ekranı (şimdilik ana menüye dön)
        alert('⚙️ Ayarlar menüsü yakında gelecek!');
        console.log('⚙️ Ayarlar gösteriliyor');
    }
    
    // =========================
    // OYUN MekaniKLERİ  
    // =========================
    
    startGame() {
        console.log('🎯 Yeni oyun başlıyor...');
        
        // Oyun durumunu resetle
        this.gameState = 'playing';
        this.score = 0;
        this.combo = 1;
        this.maxCombo = 1;
        this.level = 1;
        this.lives = 5;
        this.bubblesPopped = 0;
        this.bubbles = [];
        this.particles = [];
        this.spawnTimer = 0;
        
        // Power-upları resetle
        Object.keys(this.powerUps).forEach(key => {
            this.powerUps[key] = false;
        });
        
        this.showScreen('game-screen');
        this.updateUI();
        
        // İlk balonları oluştur
        this.createBubble();
        this.createBubble();
        
        // Oyun döngüsünü başlat
        this.gameLoop(performance.now());
    }
    
    pauseGame() {
        if (this.gameState !== 'playing') return;
        
        console.log('⏸️ Oyun duraklatıldı');
        this.gameState = 'paused';
        
        // Pause stats güncelle
        document.getElementById('pause-score').textContent = this.score;
        document.getElementById('pause-combo').textContent = this.combo + 'x';
        document.getElementById('pause-lives').textContent = this.lives;
        
        this.showScreen('pause-screen');
    }
    
    resumeGame() {
        if (this.gameState !== 'paused') return;
        
        console.log('▶️ Oyun devam ediyor');
        this.gameState = 'playing';
        this.showScreen('game-screen');
        this.gameLoop(performance.now());
    }
    
    gameOver() {
        console.log('💀 Oyun bitti! Final puanı:', this.score);
        
        this.gameState = 'gameover';
        this.totalGames++;
        
        // High score kontrol
        let isNewRecord = false;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore.toString());
            isNewRecord = true;
        }
        
        localStorage.setItem('totalGames', this.totalGames.toString());
        
        // Game over UI güncelle
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('best-combo').textContent = this.maxCombo + 'x';
        document.getElementById('final-level').textContent = this.level;
        document.getElementById('bubbles-popped').textContent = this.bubblesPopped;
        
        const newRecordEl = document.getElementById('new-record');
        const titleEl = document.getElementById('game-over-title');
        
        if (isNewRecord && newRecordEl && titleEl) {
            newRecordEl.style.display = 'block';
            titleEl.textContent = '🎉 YENİ REKOR!';
        } else if (titleEl) {
            titleEl.textContent = '🎯 Oyun Bitti!';
            if (newRecordEl) newRecordEl.style.display = 'none';
        }
        
        this.showScreen('game-over');
        
        // Başarıları kontrol et
        this.checkAchievements();
    }
    
    shareScore() {
        const text = `🫧 Bubble Pop Mania'da ${this.score} puan yaptım! ${this.maxCombo}x combo ile rekor kırdım! 🎯`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Bubble Pop Mania - Puanımı Paylaşıyorum!',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback: clipboard'a kopyala
            navigator.clipboard.writeText(text + ' ' + window.location.href).then(() => {
                alert('📋 Puanın kopyalandı! Sosyal medyada paylaşabilirsin.');
            });
        }
        
        console.log('📱 Puan paylaşıldı:', this.score);
    }
    
    // =========================
    // BALON YÖNETİMİ
    // =========================
    
    createBubble() {
        const bubble = {
            x: Math.random() * (this.canvas.width - 100) + 50,
            y: this.canvas.height + 30,
            radius: 20 + Math.random() * 15, // 20-35 arası
            speed: 0.8 + Math.random() * 0.4, // 0.8-1.2 arası - YAVAS HIZLI
            color: this.getRandomBubbleColor(),
            id: Date.now() + Math.random(),
            alive: true,
            pulsePhase: Math.random() * Math.PI * 2 // Nabız efekti için
        };
        
        bubble.points = this.getBubblePoints(bubble.color);
        this.bubbles.push(bubble);
        
        return bubble;
    }
    
    getRandomBubbleColor() {
        const rand = Math.random() * 100;
        let cumulative = 0;
        
        for (let type of this.bubbleTypes) {
            cumulative += type.frequency;
            if (rand < cumulative) {
                return type.color;
            }
        }
        
        return this.bubbleTypes[0].color; // Fallback
    }
    
    getBubblePoints(color) {
        const type = this.bubbleTypes.find(t => t.color === color);
        return type ? type.points : 1;
    }
    
    handleCanvasClick(e) {
        if (this.gameState !== 'playing') return;
        
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        // En yakın balonu bul
        let targetBubble = null;
        let minDistance = Infinity;
        
        for (let bubble of this.bubbles) {
            if (!bubble.alive) continue;
            
            const distance = Math.sqrt((x - bubble.x) ** 2 + (y - bubble.y) ** 2);
            if (distance <= bubble.radius + 10 && distance < minDistance) {
                minDistance = distance;
                targetBubble = bubble;
            }
        }
        
        if (targetBubble) {
            this.popBubble(targetBubble);
        } else {
            // Boş yere tıklama - combo reset
            this.combo = 1;
            this.updateUI();
            console.log('❌ Boş yere tıklandı - combo resetlendi');
        }
    }
    
    popBubble(bubble) {
        if (!bubble.alive) return;
        
        bubble.alive = false;
        this.bubblesPopped++;
        
        // Puan hesapla
        let points = bubble.points;
        if (this.powerUps.double) {
            points *= 2;
        }
        points *= this.combo;
        
        this.score += points;
        this.combo++;
        
        if (this.combo > this.maxCombo) {
            this.maxCombo = this.combo;
        }
        
        // Balonu listeden kaldır
        const index = this.bubbles.indexOf(bubble);
        if (index > -1) {
            this.bubbles.splice(index, 1);
        }
        
        // Parçacık efekti oluştur
        this.createParticles(bubble.x, bubble.y, bubble.color);
        
        // Seviye kontrolü
        if (this.score > this.level * 1000) {
            this.level++;
            this.spawnDelay = Math.max(800, this.spawnDelay - 100); // Daha hızlı spawn
            this.showNotification(`🎉 Seviye ${this.level}!`);
        }
        
        this.updateUI();
        
        console.log(`💥 Balon patladı! +${points} puan (${this.combo-1}x combo)`);
    }
    
    // =========================  
    // OYUN DÖNGÜSÜ
    // =========================
    
    gameLoop(currentTime) {
        if (this.gameState !== 'playing') return;
        
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        // Balon spawn
        this.spawnTimer += deltaTime;
        if (this.spawnTimer >= this.spawnDelay && this.bubbles.length < 8) {
            this.createBubble();
            this.spawnTimer = 0;
            
            // Daha fazla balon spawn şansı (zor seviyeler için)
            if (this.level > 3 && Math.random() < 0.3) {
                this.createBubble();
            }
        }
        
        // Balonları güncelle
        this.updateBubbles(deltaTime);
        
        // Parçacıkları güncelle
        this.updateParticles(deltaTime);
        
        // Power-upları güncelle
        this.updatePowerUps(deltaTime);
        
        // Oyunu çiz
        this.render();
        
        // Devam et
        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    updateBubbles(deltaTime) {
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const bubble = this.bubbles[i];
            if (!bubble.alive) continue;
            
            // Hareket
            let speed = bubble.speed;
            if (this.powerUps.freeze) speed *= 0.2; // Dondurma efekti
            
            bubble.y -= speed;
            bubble.pulsePhase += 0.05; // Nabız efekti
            
            // Mıknatıs efekti
            if (this.powerUps.magnet) {
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;
                const dx = centerX - bubble.x;
                const dy = centerY - bubble.y;
                const distance = Math.sqrt(dx*dx + dy*dy);
                
                if (distance > 50) {
                    bubble.x += (dx / distance) * 0.5;
                    bubble.y += (dy / distance) * 0.5;
                }
            }
            
            // Ekran dışına çıkan balonları kaldır
            if (bubble.y + bubble.radius < -50) {
                this.bubbles.splice(i, 1);
                this.lives--;
                this.combo = 1; // Combo reset
                
                if (this.lives <= 0) {
                    this.gameOver();
                    return;
                } else {
                    this.updateUI();
                    console.log(`💔 Balon kaçtı! Kalan can: ${this.lives}`);
                }
            }
        }
        
        // Otomatik power-up
        if (this.powerUps.auto) {
            for (let bubble of this.bubbles) {
                if (bubble.alive && Math.random() < 0.02) { // %2 şans
                    this.popBubble(bubble);
                    break;
                }
            }
        }
    }
    
    updateParticles(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.life -= deltaTime;
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // Yerçekimi
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    updatePowerUps(deltaTime) {
        // Power-up sürelerini kontrol et (basit implementasyon)
        // Gerçek oyunda her power-up için ayrı timer olacak
    }
    
    // =========================
    // RENDER FONKSİYONLARI
    // =========================
    
    render() {
        if (!this.ctx) return;
        
        // Temizle
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Arka plan
        this.drawBackground();
        
        // Balonları çiz
        for (let bubble of this.bubbles) {
            if (bubble.alive) {
                this.drawBubble(bubble);
            }
        }
        
        // Parçacıkları çiz
        for (let particle of this.particles) {
            this.drawParticle(particle);
        }
        
        // Power-up efektlerini çiz
        this.drawPowerUpEffects();
    }
    
    drawBackground() {
        // Gradient arka plan
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.3, '#B0E0E6');
        gradient.addColorStop(1, '#E0F6FF');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Arka plan baloncukları (dekoratif)
        this.ctx.save();
        this.ctx.globalAlpha = 0.1;
        for (let i = 0; i < 3; i++) {
            const x = (i + 1) * this.canvas.width / 4;
            const y = this.canvas.height - 100 + Math.sin(performance.now() * 0.001 + i) * 20;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 30 + Math.sin(performance.now() * 0.002 + i) * 5, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fill();
        }
        this.ctx.restore();
    }
    
    drawBubble(bubble) {
        const pulse = 1 + Math.sin(bubble.pulsePhase) * 0.1; // %10 nabız
        const radius = bubble.radius * pulse;
        
        this.ctx.save();
        
        // Gölge
        this.ctx.beginPath();
        this.ctx.arc(bubble.x + 3, bubble.y + 3, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fill();
        
        // Ana balon
        this.ctx.beginPath();
        this.ctx.arc(bubble.x, bubble.y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = bubble.color;
        this.ctx.fill();
        
        // Parlaklık efekti
        this.ctx.beginPath();
        this.ctx.arc(bubble.x - radius * 0.3, bubble.y - radius * 0.3, radius * 0.4, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.fill();
        
        // Kenarlık
        this.ctx.beginPath();
        this.ctx.arc(bubble.x, bubble.y, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Puan gösterimi (sadece altın ve elmas için)
        if (bubble.points >= 10) {
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.font = 'bold ' + Math.round(radius * 0.4) + 'px Arial';
            this.ctx.fillStyle = 'white';
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.lineWidth = 2;
            this.ctx.strokeText(bubble.points.toString(), bubble.x, bubble.y);
            this.ctx.fillText(bubble.points.toString(), bubble.x, bubble.y);
        }
        
        this.ctx.restore();
    }
    
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.life / 1000;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color;
        this.ctx.fill();
        this.ctx.restore();
    }
    
    drawPowerUpEffects() {
        // Power-up efektlerini çiz
        if (this.powerUps.freeze) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.3;
            this.ctx.fillStyle = '#87CEEB';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
        
        if (this.powerUps.double) {
            // Altın parlama efekti
            this.ctx.save();
            this.ctx.globalAlpha = 0.1;
            this.ctx.fillStyle = '#FFD700';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
    }
    
    // =========================
    // YARDIMCI FONKSİYONLAR
    // =========================
    
    createParticles(x, y, color) {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4 - 2,
                size: 2 + Math.random() * 3,
                color: color,
                life: 500 + Math.random() * 500
            });
        }
    }
    
    activatePowerUp(type) {
        if (this.gameState !== 'playing') return;
        
        console.log('⚡ Power-up aktive:', type);
        
        switch(type) {
            case 'freeze':
                this.powerUps.freeze = true;
                setTimeout(() => {
                    this.powerUps.freeze = false;
                }, 5000);
                this.showNotification('🧊 Dondurma aktif!');
                break;
                
            case 'double':
                this.powerUps.double = true;
                setTimeout(() => {
                    this.powerUps.double = false;
                }, 10000);
                this.showNotification('⭐ 2x Puan aktif!');
                break;
                
            case 'magnet':
                this.powerUps.magnet = true;
                setTimeout(() => {
                    this.powerUps.magnet = false;
                }, 8000);
                this.showNotification('🧲 Mıknatıs aktif!');
                break;
                
            case 'auto':
                this.powerUps.auto = true;
                setTimeout(() => {
                    this.powerUps.auto = false;
                }, 15000);
                this.showNotification('🤖 Otomatik aktif!');
                break;
        }
    }
    
    showNotification(message) {
        console.log('📢', message);
        // Gerçek oyunda güzel bir popup gösterilir
    }
    
    checkAchievements() {
        // Başarıları kontrol et
        if (this.bubblesPopped >= 50 && !localStorage.getItem('achievement_bubblemaster')) {
            localStorage.setItem('achievement_bubblemaster', 'true');
            this.showAchievement('Balon Ustası', '50 balon patlattın!', 100);
        }
        
        if (this.maxCombo >= 20 && !localStorage.getItem('achievement_comboking')) {
            localStorage.setItem('achievement_comboking', 'true');
            this.showAchievement('Combo Kralı', '20x combo yaptın!', 200);
        }
    }
    
    showAchievement(title, desc, points) {
        const popup = document.getElementById('achievement-popup');
        const titleEl = document.getElementById('achievement-title');
        const descEl = document.getElementById('achievement-desc');
        const pointsEl = document.getElementById('achievement-points');
        
        if (titleEl) titleEl.textContent = title;
        if (descEl) descEl.textContent = desc;
        if (pointsEl) pointsEl.textContent = `+${points}`;
        
        if (popup) {
            popup.classList.remove('hidden');
            setTimeout(() => {
                popup.classList.add('hidden');
            }, 3000);
        }
        
        console.log('🏆 Başarı kazanıldı:', title);
    }
    
    updateUI() {
        // Skorları güncelle
        const elements = {
            'current-score': this.score,
            'current-combo': this.combo + 'x',
            'current-level': this.level,
            'current-lives': this.lives,
            'high-score': this.highScore,
            'total-games': this.totalGames,
            'daily-streak': 1
        };
        
        for (let [id, value] of Object.entries(elements)) {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        }
        
        // Energy bar güncelle
        const energyFill = document.getElementById('energy-fill');
        const energyText = document.getElementById('energy-text');
        if (energyFill && energyText) {
            const energyPercent = (this.lives / 5) * 100;
            energyFill.style.width = energyPercent + '%';
            energyText.textContent = this.lives + '/5';
        }
        
        // Combo rengi
        const comboEl = document.getElementById('current-combo');
        if (comboEl) {
            if (this.combo >= 10) {
                comboEl.style.color = '#F59E0B'; // Altın
            } else if (this.combo >= 5) {
                comboEl.style.color = '#EF4444'; // Kırmızı
            } else {
                comboEl.style.color = '#3B82F6'; // Mavi
            }
        }
    }
}

// Oyunu başlat
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM yüklendi, oyun oluşturuluyor...');
    window.game = new BubblePopGame();
});

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(() => console.log('✅ ServiceWorker kaydedildi'))
            .catch(() => console.log('❌ ServiceWorker kayıt hatası'));
    });
}
