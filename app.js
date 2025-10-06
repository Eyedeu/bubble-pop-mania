// Bubble Pop Mania - Milyonlarca Oyuncunun Bağımlısı Olduğu Oyun!

class BubblePopGame {
    constructor() {
        this.gameState = 'menu';
        this.score = 0;
        this.combo = 1;
        this.level = 1;
        this.lives = 5;
        this.energy = 5;
        this.maxEnergy = 5;
        this.bubbles = [];
        this.particles = [];
        this.powerUps = {
            freeze: { active: false, duration: 0 },
            double: { active: false, duration: 0 },
            magnet: { active: false, duration: 0 },
            auto: { active: false, duration: 0 }
        };
        
        // Oyun verisi
        this.bubbleTypes = [
            {color: "#3B82F6", points: 1, frequency: 40, name: "Mavi"}, // Blue
            {color: "#10B981", points: 2, frequency: 30, name: "Yeşil"}, // Green
            {color: "#EF4444", points: 5, frequency: 20, name: "Kırmızı"}, // Red
            {color: "#F59E0B", points: 10, frequency: 8, name: "Altın"}, // Gold
            {color: "#8B5CF6", points: 50, frequency: 2, name: "Elmas"} // Diamond
        ];
        
        this.achievements = [
            {id: 'first_pop', name: 'İlk Patlama', requirement: 'İlk kabarcığını patlat', reward: 10, completed: false, progress: 0, target: 1},
            {id: 'combo_master', name: 'Combo Ustası', requirement: '10x combo yap', reward: 100, completed: false, progress: 0, target: 10},
            {id: 'point_hunter', name: 'Puan Avcısı', requirement: '1000 puan topla', reward: 50, completed: false, progress: 0, target: 1000},
            {id: 'daily_devotee', name: 'Günlük Adanmış', requirement: '7 gün üst üste oyna', reward: 500, completed: false, progress: 0, target: 7},
            {id: 'diamond_collector', name: 'Elmas Koleksiyoncusu', requirement: '10 elmas kabarcık patlat', reward: 200, completed: false, progress: 0, target: 10}
        ];
        
        // Oyuncu verisi
        this.playerData = {
            totalScore: 0,
            dailyStreak: 1,
            lastPlayDate: new Date().toDateString(),
            coins: 100,
            achievements: this.achievements,
            settings: {
                soundEnabled: true,
                vibrationEnabled: true
            }
        };
        
        // Leaderboard verileri (simüle edilmiş)
        this.leaderboardData = {
            daily: [
                {rank: 1, name: 'Pro Oyuncu', score: 15420},
                {rank: 2, name: 'Bubble Master', score: 12350},
                {rank: 3, name: 'Combo King', score: 11200},
                {rank: 4, name: 'Sen', score: 0},
                {rank: 5, name: 'Hızlı Parmak', score: 8900}
            ],
            weekly: [
                {rank: 1, name: 'Hafta Şampiyonu', score: 45200},
                {rank: 2, name: 'Bubble Expert', score: 38900},
                {rank: 3, name: 'Mega Popper', score: 35600},
                {rank: 4, name: 'Sen', score: 0},
                {rank: 5, name: 'Power User', score: 28300}
            ],
            alltime: [
                {rank: 1, name: 'Efsane Oyuncu', score: 892450},
                {rank: 2, name: 'Bubble Tanrısı', score: 756320},
                {rank: 3, name: 'Combo Efsanesi', score: 645200},
                {rank: 4, name: 'Sen', score: 0},
                {rank: 5, name: 'Süper Popper', score: 534100}
            ]
        };

        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.lastTime = 0;
        this.spawnTimer = 0;
        this.comboTimer = 0;
        this.maxComboTimer = 3000; // 3 saniye
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.showScreen('main-menu');
        this.updateEnergyDisplay();
        this.updateDailyStreak();
        this.checkDailyReward();
    }

    setupCanvas() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        // Ana menü butonları
        document.getElementById('play-btn').addEventListener('click', () => this.startGame());
        document.getElementById('shop-btn').addEventListener('click', () => this.showShop());
        document.getElementById('leaderboard-btn').addEventListener('click', () => this.showLeaderboard());
        
        // Tutorial
        document.getElementById('start-tutorial').addEventListener('click', () => this.startTutorialGame());
        
        // Game over butonları
        document.getElementById('watch-ad-continue').addEventListener('click', () => this.watchAdContinue());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        document.getElementById('main-menu-btn').addEventListener('click', () => this.goToMainMenu());
        
        // Sosyal paylaşım
        document.getElementById('share-twitter').addEventListener('click', () => this.shareScore('twitter'));
        document.getElementById('share-facebook').addEventListener('click', () => this.shareScore('facebook'));
        
        // Modal kontrolleri
        document.getElementById('close-shop').addEventListener('click', () => this.hideModal('shop-modal'));
        document.getElementById('close-leaderboard').addEventListener('click', () => this.hideModal('leaderboard-modal'));
        
        // Güçlendirmeler
        document.querySelectorAll('.powerup-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.activatePowerUp(e.target.dataset.powerup));
        });
        
        // Pause butonu
        document.getElementById('pause-btn').addEventListener('click', () => this.pauseGame());
        
        // Enerji satın alma
        document.getElementById('buy-energy').addEventListener('click', () => this.buyEnergy());
        
        // Oyun alanı tıklama/dokunma
        this.canvas.addEventListener('click', (e) => this.handleBubbleClick(e));
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleBubbleClick(e.touches[0]);
        });
        
        // Liderlik tablosu sekmeleri
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchLeaderboardTab(e.target.dataset.tab));
        });
        
        // Günlük ödül spinner
        document.getElementById('spin-wheel').addEventListener('click', () => this.spinRewardWheel());
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        this.gameState = screenId;
    }

    startGame() {
        if (this.energy <= 0) {
            this.showEnergyModal();
            return;
        }
        
        this.energy--;
        this.updateEnergyDisplay();
        this.showScreen('tutorial');
    }
    
    startTutorialGame() {
        this.showScreen('game-screen');
        this.resetGame();
        this.gameState = 'playing';
        this.startGameLoop();
    }

    resetGame() {
        this.score = 0;
        this.combo = 1;
        this.level = 1;
        this.lives = 5;
        this.bubbles = [];
        this.particles = [];
        this.spawnTimer = 0;
        this.comboTimer = 0;
        
        // Power-up'ları sıfırla
        Object.keys(this.powerUps).forEach(key => {
            this.powerUps[key].active = false;
            this.powerUps[key].duration = 0;
        });
        
        this.updateUI();
    }

    startGameLoop() {
        const gameLoop = (currentTime) => {
            if (this.gameState !== 'playing') return;
            
            const deltaTime = currentTime - this.lastTime;
            this.lastTime = currentTime;
            
            this.update(deltaTime);
            this.render();
            
            this.animationId = requestAnimationFrame(gameLoop);
        };
        
        this.lastTime = performance.now();
        this.animationId = requestAnimationFrame(gameLoop);
    }

    update(deltaTime) {
        // Kabarcık spawn etme
        this.spawnTimer += deltaTime;
        const spawnRate = Math.max(1000 - (this.level * 50), 300); // Seviye arttıkça daha hızlı
        
        if (this.spawnTimer >= spawnRate) {
            this.spawnBubble();
            this.spawnTimer = 0;
        }
        
        // Kabarcıkları güncelle
        this.updateBubbles(deltaTime);
        
        // Partikülleri güncelle
        this.updateParticles(deltaTime);
        
        // Power-up'ları güncelle
        this.updatePowerUps(deltaTime);
        
        // Combo timer'ı güncelle
        this.comboTimer += deltaTime;
        if (this.comboTimer >= this.maxComboTimer && this.combo > 1) {
            this.combo = 1;
            this.updateUI();
        }
        
        // Seviye kontrolü
        this.checkLevelUp();
    }

    spawnBubble() {
        if (this.powerUps.freeze.active) return;
        
        // Rastgele kabarcık tipi seç
        const rand = Math.random() * 100;
        let cumulativeFreq = 0;
        let selectedType = this.bubbleTypes[0];
        
        for (const type of this.bubbleTypes) {
            cumulativeFreq += type.frequency;
            if (rand <= cumulativeFreq) {
                selectedType = type;
                break;
            }
        }
        
        const bubble = {
            x: Math.random() * (this.canvas.width - 60) + 30,
            y: this.canvas.height + 30,
            radius: 25 + Math.random() * 10,
            speed: 1 + Math.random() * 2 + (this.level * 0.2),
            type: selectedType,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.02 + Math.random() * 0.02
        };
        
        this.bubbles.push(bubble);
    }

    updateBubbles(deltaTime) {
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const bubble = this.bubbles[i];
            
            // Hareket
            bubble.y -= bubble.speed;
            bubble.wobble += bubble.wobbleSpeed;
            bubble.x += Math.sin(bubble.wobble) * 0.5;
            
            // Mıknatıs etkisi
            if (this.powerUps.magnet.active) {
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;
                const dx = centerX - bubble.x;
                const dy = centerY - bubble.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    bubble.x += (dx / distance) * 2;
                    bubble.y += (dy / distance) * 2;
                }
            }
            
            // Otomatik patlama
            if (this.powerUps.auto.active && Math.random() < 0.1) {
                this.popBubble(i);
                continue;
            }
            
            // Ekrandan çıkan kabarcıkları kaldır
            if (bubble.y < -50) {
                this.bubbles.splice(i, 1);
                this.loseLife();
            }
        }
    }

    updateParticles(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // Yerçekimi
            particle.life--;
            particle.alpha -= 0.02;
            
            if (particle.life <= 0 || particle.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    updatePowerUps(deltaTime) {
        Object.keys(this.powerUps).forEach(key => {
            if (this.powerUps[key].active) {
                this.powerUps[key].duration -= deltaTime;
                if (this.powerUps[key].duration <= 0) {
                    this.powerUps[key].active = false;
                    this.updatePowerUpUI(key, false);
                }
            }
        });
    }

    handleBubbleClick(e) {
        if (this.gameState !== 'playing') return;
        
        const rect = this.canvas.getBoundingClientRect();
        const clickX = (e.clientX || e.pageX) - rect.left;
        const clickY = (e.clientY || e.pageY) - rect.top;
        
        // Tıklanan kabarcığı bul
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const bubble = this.bubbles[i];
            const distance = Math.sqrt(
                (clickX - bubble.x) ** 2 + (clickY - bubble.y) ** 2
            );
            
            if (distance <= bubble.radius) {
                this.popBubble(i, clickX, clickY);
                break;
            }
        }
    }

    popBubble(index, x = null, y = null) {
        const bubble = this.bubbles[index];
        if (!bubble) return;
        
        // Puan hesapla
        let points = bubble.type.points;
        if (this.powerUps.double.active) points *= 2;
        points *= this.combo;
        
        this.score += points;
        
        // Combo artır
        this.combo = Math.min(this.combo + 1, 10);
        this.comboTimer = 0;
        
        // Partiküller oluştur
        this.createParticles(bubble.x, bubble.y, bubble.type.color);
        
        // Başarım kontrolü
        this.checkAchievements('bubble_pop', bubble.type);
        
        // Kabarcığı kaldır
        this.bubbles.splice(index, 1);
        
        this.updateUI();
        
        // Haptic feedback simülasyonu
        this.triggerHapticFeedback();
    }

    createParticles(x, y, color) {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8 - 2,
                color: color,
                life: 30 + Math.random() * 20,
                alpha: 1,
                size: 3 + Math.random() * 3
            });
        }
    }

    loseLife() {
        this.lives--;
        this.combo = 1;
        this.updateUI();
        
        if (this.lives <= 0) {
            this.gameOver();
        }
    }

    gameOver() {
        this.gameState = 'game-over';
        cancelAnimationFrame(this.animationId);
        
        // İstatistikleri güncelle
        document.getElementById('final-score').textContent = this.score.toLocaleString();
        document.getElementById('highest-combo').textContent = this.combo + 'x';
        document.getElementById('final-level').textContent = this.level;
        
        // Yüksek skorları güncelle
        this.updateLeaderboards();
        
        // Toplam skoru güncelle
        this.playerData.totalScore += this.score;
        
        this.showScreen('game-over');
    }

    restartGame() {
        if (this.energy <= 0) {
            this.showEnergyModal();
            return;
        }
        
        this.energy--;
        this.updateEnergyDisplay();
        this.showScreen('game-screen');
        this.resetGame();
        this.gameState = 'playing';
        this.startGameLoop();
    }

    goToMainMenu() {
        this.showScreen('main-menu');
        cancelAnimationFrame(this.animationId);
    }

    watchAdContinue() {
        // Reklam izleme simülasyonu
        this.showAdModal();
        setTimeout(() => {
            this.hideAdModal();
            this.lives = 3; // 3 can ver
            this.updateUI();
            this.gameState = 'playing';
            this.startGameLoop();
        }, 3000);
    }

    activatePowerUp(type) {
        const costs = {freeze: 50, double: 30, magnet: 40, auto: 100};
        
        if (this.playerData.coins >= costs[type] && !this.powerUps[type].active) {
            this.playerData.coins -= costs[type];
            this.powerUps[type].active = true;
            this.powerUps[type].duration = this.getPowerUpDuration(type);
            this.updatePowerUpUI(type, true);
        }
    }

    getPowerUpDuration(type) {
        const durations = {freeze: 5000, double: 10000, magnet: 8000, auto: 15000};
        return durations[type];
    }

    updatePowerUpUI(type, active) {
        const btn = document.querySelector(`[data-powerup="${type}"]`);
        if (active) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    }

    checkLevelUp() {
        const newLevel = Math.floor(this.score / 1000) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.showLevelUpNotification();
            this.updateUI();
        }
    }

    checkAchievements(action, data = null) {
        this.achievements.forEach(achievement => {
            if (achievement.completed) return;
            
            switch (achievement.id) {
                case 'first_pop':
                    achievement.progress = 1;
                    break;
                case 'combo_master':
                    if (this.combo >= 10) {
                        achievement.progress = this.combo;
                    }
                    break;
                case 'point_hunter':
                    achievement.progress = this.score;
                    break;
                case 'diamond_collector':
                    if (data && data.name === 'Elmas') {
                        achievement.progress++;
                    }
                    break;
            }
            
            if (achievement.progress >= achievement.target && !achievement.completed) {
                achievement.completed = true;
                this.playerData.coins += achievement.reward;
                this.showAchievementNotification(achievement);
            }
        });
    }

    showAchievementNotification(achievement) {
        const notification = document.getElementById('achievement-notification');
        const title = notification.querySelector('.achievement-title');
        const description = notification.querySelector('.achievement-description');
        const reward = notification.querySelector('.reward-amount');
        
        title.textContent = achievement.name;
        description.textContent = achievement.requirement;
        reward.textContent = achievement.reward;
        
        notification.classList.remove('hidden');
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.classList.add('hidden'), 300);
        }, 3000);
    }

    showLevelUpNotification() {
        // Seviye atlama bildirimi göster
        console.log(`Seviye ${this.level}'e çıktın!`);
    }

    updateUI() {
        document.getElementById('score').textContent = this.score.toLocaleString();
        document.getElementById('combo').textContent = this.combo + 'x';
        document.getElementById('level').textContent = this.level;
        
        // Canları güncelle
        const livesDisplay = document.getElementById('lives-display');
        livesDisplay.innerHTML = '';
        for (let i = 0; i < this.lives; i++) {
            const life = document.createElement('span');
            life.className = 'life';
            life.textContent = '❤️';
            livesDisplay.appendChild(life);
        }
    }

    updateEnergyDisplay() {
        const energyFill = document.getElementById('energy-fill');
        const energyText = document.getElementById('energy-text');
        
        const percentage = (this.energy / this.maxEnergy) * 100;
        energyFill.style.width = percentage + '%';
        energyText.textContent = `${this.energy}/${this.maxEnergy}`;
        
        // Enerji yenileme
        if (this.energy < this.maxEnergy) {
            setTimeout(() => {
                this.energy = Math.min(this.energy + 1, this.maxEnergy);
                this.updateEnergyDisplay();
            }, 300000); // 5 dakika
        }
    }

    updateDailyStreak() {
        const today = new Date().toDateString();
        if (this.playerData.lastPlayDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (this.playerData.lastPlayDate === yesterday.toDateString()) {
                this.playerData.dailyStreak++;
            } else {
                this.playerData.dailyStreak = 1;
            }
            
            this.playerData.lastPlayDate = today;
        }
        
        document.getElementById('daily-streak').textContent = this.playerData.dailyStreak;
    }

    checkDailyReward() {
        // İlk giriş için günlük ödül göster
        if (Math.random() < 0.3) { // %30 şans
            setTimeout(() => this.showDailyRewardModal(), 1000);
        }
    }

    showDailyRewardModal() {
        document.getElementById('daily-reward-modal').classList.add('show');
        document.getElementById('daily-reward-modal').classList.remove('hidden');
    }

    spinRewardWheel() {
        const wheel = document.querySelector('.spinner-wheel');
        const resultDiv = document.getElementById('reward-result');
        const spinBtn = document.getElementById('spin-wheel');
        
        spinBtn.disabled = true;
        
        // Rastgele rotasyon
        const spins = 3 + Math.random() * 3; // 3-6 tam tur
        const finalAngle = Math.random() * 360;
        const totalRotation = (spins * 360) + finalAngle;
        
        wheel.style.transform = `rotate(${totalRotation}deg)`;
        
        setTimeout(() => {
            // Ödül hesapla
            const segmentAngle = 60; // 6 segment, her biri 60 derece
            const normalizedAngle = (360 - (finalAngle % 360)) % 360;
            const segmentIndex = Math.floor(normalizedAngle / segmentAngle);
            
            const rewards = [50, 100, 25, 200, 75, 'powerup'];
            const reward = rewards[segmentIndex];
            
            if (typeof reward === 'number') {
                this.playerData.coins += reward;
                resultDiv.textContent = `🎉 ${reward} Coin Kazandın!`;
            } else {
                resultDiv.textContent = `🎉 Güçlendirme Kazandın!`;
            }
            
            resultDiv.classList.remove('hidden');
            
            setTimeout(() => {
                this.hideModal('daily-reward-modal');
            }, 2000);
            
        }, 3000);
    }

    buyEnergy() {
        if (this.playerData.coins >= 50) {
            this.playerData.coins -= 50;
            this.energy = this.maxEnergy;
            this.updateEnergyDisplay();
        }
    }

    showShop() {
        document.getElementById('shop-modal').classList.add('show');
        document.getElementById('shop-modal').classList.remove('hidden');
    }

    showLeaderboard() {
        document.getElementById('leaderboard-modal').classList.add('show');
        document.getElementById('leaderboard-modal').classList.remove('hidden');
        this.switchLeaderboardTab('daily');
    }

    switchLeaderboardTab(tab) {
        // Tab butonlarını güncelle
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        
        // Leaderboard'u güncelle
        const list = document.getElementById('leaderboard-list');
        list.innerHTML = '';
        
        // Kendi skorunu güncelle
        this.leaderboardData[tab][3].score = this.playerData.totalScore;
        
        this.leaderboardData[tab].forEach(player => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            if (player.name === 'Sen') item.style.background = 'var(--color-primary)';
            
            item.innerHTML = `
                <span class="player-rank">#${player.rank}</span>
                <span class="player-name">${player.name}</span>
                <span class="player-score">${player.score.toLocaleString()}</span>
            `;
            
            list.appendChild(item);
        });
    }

    updateLeaderboards() {
        // Mevcut skoru leaderboard'lara ekle
        Object.keys(this.leaderboardData).forEach(period => {
            const userEntry = this.leaderboardData[period].find(p => p.name === 'Sen');
            if (userEntry && this.score > userEntry.score) {
                userEntry.score = this.score;
            }
        });
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
        setTimeout(() => {
            document.getElementById(modalId).classList.add('hidden');
        }, 300);
    }

    shareScore(platform) {
        const text = `🫧 Bubble Pop Mania'da ${this.score.toLocaleString()} puan yaptım! Sen de oynayıp beni yenmeye çalış! 🏆`;
        const url = 'https://bubble-pop-mania.com';
        
        if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
        }
    }

    showEnergyModal() {
        alert('Enerjin bitti! Biraz bekle veya coin harcayarak enerji satın al! ⚡');
    }

    showAdModal() {
        // Reklam gösterimi simülasyonu
        const adDiv = document.createElement('div');
        adDiv.id = 'ad-modal';
        adDiv.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); display: flex; align-items: center;
            justify-content: center; z-index: 9999; color: white; font-size: 24px;
        `;
        adDiv.innerHTML = '<div>📺 Reklam oynatılıyor... 3 saniye</div>';
        document.body.appendChild(adDiv);
    }

    hideAdModal() {
        const adModal = document.getElementById('ad-modal');
        if (adModal) adModal.remove();
    }

    pauseGame() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            cancelAnimationFrame(this.animationId);
            alert('Oyun durduruldu! Devam etmek için Tamam\'a tıkla.');
            this.gameState = 'playing';
            this.startGameLoop();
        }
    }

    triggerHapticFeedback() {
        // Mobil cihazlarda titreşim
        if (navigator.vibrate && this.playerData.settings.vibrationEnabled) {
            navigator.vibrate(50);
        }
    }

    render() {
        // Canvas'ı temizle
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Kabarcıkları çiz
        this.bubbles.forEach(bubble => this.drawBubble(bubble));
        
        // Partikülleri çiz
        this.particles.forEach(particle => this.drawParticle(particle));
        
        // Power-up efektlerini çiz
        this.drawPowerUpEffects();
    }

    drawBubble(bubble) {
        this.ctx.save();
        
        // Gölge
        this.ctx.shadowColor = 'rgba(0,0,0,0.3)';
        this.ctx.shadowBlur = 5;
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;
        
        // Ana kabarcık
        this.ctx.beginPath();
        this.ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = bubble.type.color;
        this.ctx.fill();
        
        // İç parlaklık
        this.ctx.shadowColor = 'transparent';
        this.ctx.beginPath();
        this.ctx.arc(bubble.x - bubble.radius * 0.3, bubble.y - bubble.radius * 0.3, bubble.radius * 0.3, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
        this.ctx.fill();
        
        // Puan etiketi
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(bubble.type.points, bubble.x, bubble.y);
        
        this.ctx.restore();
    }

    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.alpha;
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }

    drawPowerUpEffects() {
        // Freeze efekti
        if (this.powerUps.freeze.active) {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(173, 216, 230, 0.1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
        
        // Double points efekti
        if (this.powerUps.double.active) {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
        
        // Magnet efekti
        if (this.powerUps.magnet.active) {
            this.ctx.save();
            this.ctx.strokeStyle = 'rgba(255, 0, 255, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 200, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.restore();
        }
    }
}

// Oyunu başlat
document.addEventListener('DOMContentLoaded', () => {
    window.game = new BubblePopGame();
});