// Bubble Pop Mania - Advanced Level System & QR Code Features
// Gelişmiş seviye sistemi + QR kod özellikli tam versiyon!

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
        
        // Seviye sistemi ayarları
        this.levelSettings = {
            1: { speedMultiplier: 1.0, spawnDelay: 2000, maxBubbles: 6, rareChance: 0.1, bgColor: '#87CEEB', name: 'Başlangıç' },
            2: { speedMultiplier: 1.2, spawnDelay: 1700, maxBubbles: 7, rareChance: 0.15, bgColor: '#78B3D6', name: 'Acemi' },
            3: { speedMultiplier: 1.4, spawnDelay: 1400, maxBubbles: 8, rareChance: 0.2, bgColor: '#6998C1', name: 'Orta' },
            4: { speedMultiplier: 1.6, spawnDelay: 1200, maxBubbles: 9, rareChance: 0.25, bgColor: '#5A7DAC', name: 'İleri' },
            5: { speedMultiplier: 1.8, spawnDelay: 1000, maxBubbles: 10, rareChance: 0.3, bgColor: '#4B6297', name: 'Uzman' },
            6: { speedMultiplier: 2.0, spawnDelay: 900, maxBubbles: 11, rareChance: 0.35, bgColor: '#3C4782', name: 'Pro' },
            7: { speedMultiplier: 2.2, spawnDelay: 800, maxBubbles: 12, rareChance: 0.4, bgColor: '#2D2C6D', name: 'Master' },
            8: { speedMultiplier: 2.4, spawnDelay: 700, maxBubbles: 13, rareChance: 0.45, bgColor: '#1E1158', name: 'Legend' },
            9: { speedMultiplier: 2.6, spawnDelay: 600, maxBubbles: 14, rareChance: 0.5, bgColor: '#0F0043', name: 'God Mode' },
            10: { speedMultiplier: 3.0, spawnDelay: 500, maxBubbles: 15, rareChance: 0.6, bgColor: '#000020', name: 'Impossible' }
        };
        
        this.levelUpEffects = [];
        this.levelTransitions = [];
        
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
        this.spawnDelay = 2000;
        
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
        console.log('🎮 Bubble Pop Mania - Advanced Version başlatılıyor...');
        this.showLoadingScreen();
        
        // 1.5 saniye loading göster
        setTimeout(() => {
            this.setupCanvas();
            this.setupEventListeners();
            this.updateUI();
            this.showMainMenu();
            console.log('✅ Oyun hazır - Gelişmiş seviye sistemi aktif!');
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
        const downloadMobileBtn = document.getElementById('download-mobile-btn');
        const achievementsBtn = document.getElementById('achievements-btn');
        const settingsBtn = document.getElementById('settings-btn');
        
        if (playBtn) playBtn.addEventListener('click', () => this.startGame());
        if (tutorialBtn) tutorialBtn.addEventListener('click', () => this.showTutorial());
        if (downloadMobileBtn) downloadMobileBtn.addEventListener('click', () => this.showQRModal());
        if (achievementsBtn) achievementsBtn.addEventListener('click', () => this.showAchievements());
        if (settingsBtn) settingsBtn.addEventListener('click', () => this.showSettings());
        
        // Tutorial
        const tutorialClose = document.getElementById('tutorial-close');
        if (tutorialClose) tutorialClose.addEventListener('click', () => this.hideTutorial());
        
        // QR Modal butonları
        const closeQrBtn = document.getElementById('close-qr-btn');
        const copyUrlBtn = document.getElementById('copy-url-btn');
        const shareWhatsappBtn = document.getElementById('share-whatsapp');
        const shareTelegramBtn = document.getElementById('share-telegram');
        const shareTwitterBtn = document.getElementById('share-twitter');
        
        if (closeQrBtn) closeQrBtn.addEventListener('click', () => this.hideQRModal());
        if (copyUrlBtn) copyUrlBtn.addEventListener('click', () => this.copyGameURL());
        if (shareWhatsappBtn) shareWhatsappBtn.addEventListener('click', () => this.shareToWhatsApp());
        if (shareTelegramBtn) shareTelegramBtn.addEventListener('click', () => this.shareToTelegram());
        if (shareTwitterBtn) shareTwitterBtn.addEventListener('click', () => this.shareToTwitter());
        
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
        alert('🏆 Başarılar sistemi yakında gelecek!\n\n🎯 Mevcut seviye sistemi:\n• Seviye ' + this.level + ': ' + (this.levelSettings[this.level]?.name || 'Efsane') + '\n• En yüksek puan: ' + this.highScore);
        console.log('🏆 Başarılar gösteriliyor');
    }
    
    showSettings() {
        alert('⚙️ Ayarlar menüsü yakında gelecek!\n\n🎮 Mevcut ayarlar:\n• Seviye atlama: Aktif\n• Dinamik zorluk: Açık\n• Ses efektleri: Konsol');
        console.log('⚙️ Ayarlar gösteriliyor');
    }
    
    // =========================
    // QR KOD FONKSİYONLARI
    // =========================
    
    showQRModal() {
        console.log('📱 QR Modal açılıyor');
        this.generateQRCode();
        this.showScreen('qr-modal');
    }
    
    hideQRModal() {
        this.showMainMenu();
    }
    
    generateQRCode() {
        let gameURL = window.location.href;
        
        if (gameURL.includes('localhost') || gameURL.includes('127.0.0.1') || gameURL.includes('file://')) {
            gameURL = 'https://eyedeu.github.io/bubble-pop-mania';
        }
        
        const urlInput = document.getElementById('game-url');
        if (urlInput) {
            urlInput.value = gameURL;
        }
        
        const qrDisplay = document.getElementById('qr-code-display');
        if (qrDisplay) {
            const qrCodeURL = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(gameURL)}&choe=UTF-8&chld=M|0`;
            
            qrDisplay.innerHTML = `
                <img src="${qrCodeURL}" 
                     alt="QR Kod - Bubble Pop Mania" 
                     style="width: 100%; height: 100%; border-radius: 7px;"
                     onload="console.log('✅ QR kod yüklendi')"
                     onerror="console.log('❌ QR kod hatası'); this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; flex-direction: column; justify-content: center; align-items: center; padding: 20px; color: #666; text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 10px;">📱</div>
                    <div>QR Kod yüklenemedi</div>
                    <div style="font-size: 0.8rem; margin-top: 10px;">Manuel linki kullan:</div>
                    <div style="font-size: 0.7rem; word-break: break-all; margin-top: 5px;">${gameURL}</div>
                </div>
            `;
        }
        
        console.log('📱 QR kod oluşturuldu:', gameURL);
    }
    
    copyGameURL() {
        const urlInput = document.getElementById('game-url');
        if (!urlInput) return;
        
        urlInput.select();
        urlInput.setSelectionRange(0, 99999);
        
        try {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(urlInput.value).then(() => {
                    this.showCopySuccess();
                }).catch(() => {
                    this.fallbackCopy(urlInput);
                });
            } else {
                this.fallbackCopy(urlInput);
            }
        } catch (err) {
            console.error('Kopyalama hatası:', err);
            this.showNotification('❌ Kopyalama başarısız. Lütfen manuel olarak seçip kopyala.');
        }
    }
    
    fallbackCopy(urlInput) {
        try {
            document.execCommand('copy');
            this.showCopySuccess();
        } catch (err) {
            console.error('Fallback kopyalama hatası:', err);
            this.showNotification('❌ Kopyalama başarısız. URL\'i manuel seç ve Ctrl+C ile kopyala.');
        }
    }
    
    showCopySuccess() {
        this.showNotification('📋 Link kopyalandı!');
        
        const btn = document.getElementById('copy-url-btn');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '✅ Kopyalandı!';
            btn.style.background = 'linear-gradient(45deg, #10B981, #059669)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 2000);
        }
    }
    
    shareToWhatsApp() {
        const gameURL = document.getElementById('game-url')?.value || window.location.href;
        const text = encodeURIComponent(`🫧 Bubble Pop Mania - Süper eğlenceli balon patlatma oyunu! 

${this.score > 0 ? `En son ${this.score} puan yaptım! Seviye ${this.level}! ` : ''}Sen de oyna ve puanını paylaş! 🎯

${gameURL}`);
        
        const whatsappURL = `https://wa.me/?text=${text}`;
        window.open(whatsappURL, '_blank');
        
        console.log('📲 WhatsApp paylaşımı');
    }
    
    shareToTelegram() {
        const gameURL = document.getElementById('game-url')?.value || window.location.href;
        const text = encodeURIComponent(`🫧 Bubble Pop Mania - Harika bir balon patlatma oyunu! ${gameURL}`);
        
        const telegramURL = `https://t.me/share/url?url=${encodeURIComponent(gameURL)}&text=${text}`;
        window.open(telegramURL, '_blank');
        
        console.log('✈️ Telegram paylaşımı');
    }
    
    shareToTwitter() {
        const gameURL = document.getElementById('game-url')?.value || window.location.href;
        const text = encodeURIComponent(`🫧 Bubble Pop Mania oynuyorum! ${this.score > 0 ? `${this.score} puan yaptım! Seviye ${this.level}! ` : ''}Çok bağımlılık yapıyor! 🎯 #BubblePopMania #TürkOyunu`);
        
        const twitterURL = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(gameURL)}`;
        window.open(twitterURL, '_blank');
        
        console.log('🐦 Twitter paylaşımı');
    }
    
    // =========================
    // SEVİYE SİSTEMİ - YENİ!
    // =========================
    
    checkLevelUp() {
        const oldLevel = this.level;
        let newLevel = this.level;
        
        // Seviye geçiş tablosu
        const levelThresholds = [
            { level: 1, score: 0 },
            { level: 2, score: 500 },
            { level: 3, score: 1500 },
            { level: 4, score: 3000 },
            { level: 5, score: 5000 },
            { level: 6, score: 8000 },
            { level: 7, score: 12000 },
            { level: 8, score: 18000 },
            { level: 9, score: 25000 },
            { level: 10, score: 35000 }
        ];
        
        // Mevcut seviyeyi belirle
        for (let i = levelThresholds.length - 1; i >= 0; i--) {
            if (this.score >= levelThresholds[i].score) {
                newLevel = levelThresholds[i].level;
                break;
            }
        }
        
        // 10. seviyeden sonra her 15000 puanda bir seviye
        if (this.score >= 35000) {
            newLevel = Math.floor((this.score - 35000) / 15000) + 10;
            newLevel = Math.min(newLevel, 50); // Maksimum 50. seviye
        }
        
        // Seviye atlama oldu mu?
        if (newLevel > oldLevel) {
            this.level = newLevel;
            this.onLevelUp(oldLevel, newLevel);
        }
    }
    
    onLevelUp(oldLevel, newLevel) {
        console.log(`🎉 LEVEL UP! ${oldLevel} → ${newLevel}!`);
        
        // Seviye ayarlarını güncelle
        this.updateLevelSettings();
        
        // Görsel efektler
        this.showLevelUpEffect(newLevel);
        this.createLevelUpParticles();
        
        // Ses efekti (konsol için)
        console.log('🎵 *LEVEL UP SOUND EFFECT*');
        
        // Başarı bildirimi
        const levelName = this.levelSettings[newLevel]?.name || `Seviye ${newLevel}`;
        this.showNotification(`🎉 ${levelName} seviyesine çıktın! 🚀 Oyun hızlandı!`);
        
        // Level up transition efekti
        this.createLevelTransition(oldLevel, newLevel);
    }
    
    updateLevelSettings() {
        const settings = this.getCurrentLevelSettings();
        
        // Spawn delay güncelle
        this.spawnDelay = settings.spawnDelay;
        
        // Mevcut balonların hızını oransal artır
        const prevSettings = this.levelSettings[this.level - 1] || this.levelSettings[1];
        const speedIncrease = settings.speedMultiplier / prevSettings.speedMultiplier;
        
        this.bubbles.forEach(bubble => {
            bubble.speed *= speedIncrease;
        });
        
        console.log(`⚙️ Seviye ${this.level} ayarları aktive edildi:`, settings);
    }
    
    getCurrentLevelSettings() {
        // Tanımlı seviyeler için ayarları al
        if (this.levelSettings[this.level]) {
            return this.levelSettings[this.level];
        }
        
        // 10+ seviyeler için dinamik ayarlar
        const baseSettings = this.levelSettings[10];
        const extraLevels = this.level - 10;
        
        return {
            speedMultiplier: baseSettings.speedMultiplier + (extraLevels * 0.2),
            spawnDelay: Math.max(300, baseSettings.spawnDelay - (extraLevels * 20)),
            maxBubbles: baseSettings.maxBubbles + Math.floor(extraLevels / 2),
            rareChance: Math.min(0.8, baseSettings.rareChance + (extraLevels * 0.05)),
            bgColor: this.generateDynamicColor(extraLevels),
            name: `Seviye ${this.level}`
        };
    }
    
    generateDynamicColor(extraLevels) {
        // Yüksek seviyeler için dinamik renk üretimi
        const colors = ['#000020', '#200040', '#400060', '#600080', '#8000A0', '#A000C0'];
        return colors[extraLevels % colors.length] || '#000020';
    }
    
    showLevelUpEffect(newLevel) {
        const levelName = this.getCurrentLevelSettings().name;
        
        this.levelUpEffects.push({
            text: `LEVEL ${newLevel}!`,
            subText: levelName,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2 - 30,
            scale: 0.5,
            opacity: 1,
            life: 3000,
            maxLife: 3000
        });
    }
    
    createLevelUpParticles() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Altın parçacık patlaması
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: centerX + (Math.random() - 0.5) * 100,
                y: centerY + (Math.random() - 0.5) * 100,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10 - 3,
                size: 3 + Math.random() * 6,
                color: Math.random() < 0.5 ? '#FFD700' : '#FF8C00',
                life: 1500 + Math.random() * 1000
            });
        }
    }
    
    createLevelTransition(oldLevel, newLevel) {
        this.levelTransitions.push({
            oldLevel: oldLevel,
            newLevel: newLevel,
            progress: 0,
            duration: 2000
        });
    }
    
    updateLevelUpEffects(deltaTime) {
        // Level up text efektleri
        for (let i = this.levelUpEffects.length - 1; i >= 0; i--) {
            const effect = this.levelUpEffects[i];
            effect.life -= deltaTime;
            
            const progress = 1 - (effect.life / effect.maxLife);
            
            if (progress < 0.3) {
                effect.scale = 0.5 + (progress / 0.3) * 1.5; // 0.5 → 2.0
            } else if (progress < 0.7) {
                effect.scale = 2.0; // Sabit büyüklük
            } else {
                effect.opacity = (1 - progress) / 0.3; // Solma
            }
            
            if (effect.life <= 0) {
                this.levelUpEffects.splice(i, 1);
            }
        }
        
        // Seviye geçiş efektleri
        for (let i = this.levelTransitions.length - 1; i >= 0; i--) {
            const transition = this.levelTransitions[i];
            transition.progress += deltaTime / transition.duration;
            
            if (transition.progress >= 1) {
                this.levelTransitions.splice(i, 1);
            }
        }
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
        this.levelUpEffects = [];
        this.levelTransitions = [];
        this.spawnTimer = 0;
        this.spawnDelay = 2000;
        
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
        console.log('💀 Oyun bitti! Final puanı:', this.score, '| Seviye:', this.level);
        
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
        const levelName = this.getCurrentLevelSettings().name;
        const text = `🫧 Bubble Pop Mania'da ${this.score} puan yaptım! ${levelName} seviyesine ulaştım! ${this.maxCombo}x combo ile rekor kırdım! 🎯`;
        const gameURL = document.getElementById('game-url')?.value || 'https://eyedeu.github.io/bubble-pop-mania';
        
        if (navigator.share) {
            navigator.share({
                title: 'Bubble Pop Mania - Puanımı Paylaşıyorum!',
                text: text,
                url: gameURL
            }).then(() => {
                console.log('📱 Native share başarılı');
            }).catch(() => {
                this.fallbackShare(text, gameURL);
            });
        } else {
            this.fallbackShare(text, gameURL);
        }
    }
    
    fallbackShare(text, gameURL) {
        const fullText = text + '\n' + gameURL;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(fullText).then(() => {
                this.showNotification('📋 Puanın kopyalandı! Sosyal medyada paylaşabilirsin.');
            });
        } else {
            this.showNotification('📱 Puanını paylaşmak için yukarıdaki QR kodu kullan!');
        }
        
        console.log('📱 Puan paylaşıldı:', this.score);
    }
    
    // =========================
    // BALON YÖNETİMİ
    // =========================
    
    createBubble() {
        const settings = this.getCurrentLevelSettings();
        
        const bubble = {
            x: Math.random() * (this.canvas.width - 100) + 50,
            y: this.canvas.height + 30,
            radius: 20 + Math.random() * 15,
            speed: (0.8 + Math.random() * 0.4) * settings.speedMultiplier,
            color: this.getRandomBubbleColor(),
            id: Date.now() + Math.random(),
            alive: true,
            pulsePhase: Math.random() * Math.PI * 2
        };
        
        bubble.points = this.getBubblePoints(bubble.color);
        this.bubbles.push(bubble);
        
        return bubble;
    }
    
    getRandomBubbleColor() {
        const settings = this.getCurrentLevelSettings();
        const rand = Math.random() * 100;
        
        // Yüksek seviyelerde nadir balonlar daha sık çıkar
        const rareBonus = settings.rareChance * 50;
        
        if (rand < 35 - rareBonus) return this.bubbleTypes[0].color;      // Blue
        if (rand < 65 - rareBonus) return this.bubbleTypes[1].color;      // Green 
        if (rand < 85) return this.bubbleTypes[2].color;                  // Red
        if (rand < 95 + rareBonus) return this.bubbleTypes[3].color;      // Gold - ARTIŞLI
        return this.bubbleTypes[4].color;                                 // Purple - ARTIŞLI
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
        
        // SEVİYE KONTROLÜ
        this.checkLevelUp();
        
        this.updateUI();
        
        console.log(`💥 Balon patladı! +${points} puan (${this.combo-1}x combo) | Seviye: ${this.level}`);
    }
    
    // =========================  
    // OYUN DÖNGÜSÜ
    // =========================
    
    gameLoop(currentTime) {
        if (this.gameState !== 'playing') return;
        
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        const settings = this.getCurrentLevelSettings();
        
        // Balon spawn - seviye bazlı hız ve sayı
        this.spawnTimer += deltaTime;
        if (this.spawnTimer >= this.spawnDelay && this.bubbles.length < settings.maxBubbles) {
            this.createBubble();
            this.spawnTimer = 0;
            
            // Yüksek seviyede ek balon şansı
            if (this.level > 3 && Math.random() < 0.4) {
                this.createBubble();
            }
            if (this.level > 6 && Math.random() < 0.3) {
                this.createBubble();
            }
            if (this.level > 9 && Math.random() < 0.2) {
                this.createBubble();
            }
        }
        
        this.updateBubbles(deltaTime);
        this.updateParticles(deltaTime);
        this.updateLevelUpEffects(deltaTime);
        this.updatePowerUps(deltaTime);
        
        this.render();
        
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
        // Power-up süre yönetimi burada olacak
    }
    
    // =========================
    // RENDER FONKSİYONLARI
    // =========================
    
    render() {
        if (!this.ctx) return;
        
        // Temizle
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Arka plan - seviye bazlı
        this.drawBackground();
        
        // Seviye geçiş efektleri
        this.drawLevelTransitions();
        
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
        
        // Seviye atlama efektleri çiz
        this.drawLevelUpEffects();
        
        // Power-up efektlerini çiz
        this.drawPowerUpEffects();
    }
    
    drawBackground() {
        const settings = this.getCurrentLevelSettings();
        
        // Seviye bazlı gradient arka plan
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, settings.bgColor);
        gradient.addColorStop(0.5, this.lightenColor(settings.bgColor, 15));
        gradient.addColorStop(1, this.lightenColor(settings.bgColor, 30));
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Seviye göstergesi (arka plan üzerinde)
        this.ctx.save();
        this.ctx.globalAlpha = 0.3;
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`LEVEL ${this.level}`, this.canvas.width / 2, 40);
        
        const levelName = settings.name;
        this.ctx.font = '12px Arial';
        this.ctx.fillText(levelName, this.canvas.width / 2, 60);
        this.ctx.restore();
        
        // Dekoratif arka plan efektleri (seviye bazlı yoğunluk)
        this.ctx.save();
        this.ctx.globalAlpha = Math.min(0.1, 0.05 + this.level * 0.01);
        for (let i = 0; i < Math.min(5, this.level); i++) {
            const x = (i + 1) * this.canvas.width / 6;
            const y = this.canvas.height - 100 + Math.sin(performance.now() * 0.001 + i) * 30;
            const size = 20 + Math.sin(performance.now() * 0.002 + i) * 10;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fill();
        }
        this.ctx.restore();
    }
    
    drawBubble(bubble) {
        const pulse = 1 + Math.sin(bubble.pulsePhase) * 0.1;
        const radius = bubble.radius * pulse;
        
        this.ctx.save();
        
        // Seviye bazlı glow efekti
        if (this.level > 5) {
            this.ctx.shadowColor = bubble.color;
            this.ctx.shadowBlur = 10;
        }
        
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
        
        // Puan gösterimi (altın ve elmas için)
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
    
    drawLevelUpEffects() {
        for (let effect of this.levelUpEffects) {
            this.ctx.save();
            this.ctx.globalAlpha = effect.opacity;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Ana yazı
            this.ctx.font = `bold ${Math.round(40 * effect.scale)}px Arial`;
            this.ctx.fillStyle = '#FFD700';
            this.ctx.strokeStyle = '#FF8C00';
            this.ctx.lineWidth = 4;
            this.ctx.shadowColor = '#000000';
            this.ctx.shadowBlur = 10;
            
            this.ctx.strokeText(effect.text, effect.x, effect.y);
            this.ctx.fillText(effect.text, effect.x, effect.y);
            
            // Alt yazı
            if (effect.subText) {
                this.ctx.font = `bold ${Math.round(20 * effect.scale)}px Arial`;
                this.ctx.fillStyle = '#FFA500';
                this.ctx.strokeStyle = '#FF4500';
                this.ctx.lineWidth = 2;
                
                this.ctx.strokeText(effect.subText, effect.x, effect.y + 50);
                this.ctx.fillText(effect.subText, effect.x, effect.y + 50);
            }
            
            this.ctx.restore();
        }
    }
    
    drawLevelTransitions() {
        for (let transition of this.levelTransitions) {
            // Seviye geçiş efekti (ışık animasyonu vb.)
            this.ctx.save();
            const alpha = Math.sin(transition.progress * Math.PI) * 0.3;
            this.ctx.globalAlpha = alpha;
            this.ctx.fillStyle = '#FFD700';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
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
            this.ctx.globalAlpha = 0.1 + Math.sin(performance.now() * 0.01) * 0.05;
            this.ctx.fillStyle = '#FFD700';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
    }
    
    // =========================
    // YARDIMCI FONKSİYONLAR
    // =========================
    
    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const B = (num >> 8 & 0x00FF) + amt;
        const G = (num & 0x0000FF) + amt;
        
        return "#" + (0x1000000 + 
                     (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + 
                     (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + 
                     (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
    }
    
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
                this.showNotification('🧊 Dondurma aktif! 5 saniye');
                break;
                
            case 'double':
                this.powerUps.double = true;
                setTimeout(() => {
                    this.powerUps.double = false;
                }, 10000);
                this.showNotification('⭐ 2x Puan aktif! 10 saniye');
                break;
                
            case 'magnet':
                this.powerUps.magnet = true;
                setTimeout(() => {
                    this.powerUps.magnet = false;
                }, 8000);
                this.showNotification('🧲 Mıknatıs aktif! 8 saniye');
                break;
                
            case 'auto':
                this.powerUps.auto = true;
                setTimeout(() => {
                    this.powerUps.auto = false;
                }, 15000);
                this.showNotification('🤖 Otomatik aktif! 15 saniye');
                break;
        }
    }
    
    showNotification(message) {
        console.log('📢', message);
        
        // Basit notification sistemi
        if (window.Notification && Notification.permission === 'granted') {
            new Notification('Bubble Pop Mania', {
                body: message,
                icon: 'icon-192.png'
            });
        }
    }
    
    checkAchievements() {
        // Gelişmiş başarı sistemi
        const achievements = [
            {id: 'first_bubble', condition: this.bubblesPopped >= 1, title: 'İlk Balon', desc: 'İlk balonu patlattın!', points: 10},
            {id: 'bubble_master', condition: this.bubblesPopped >= 50, title: 'Balon Ustası', desc: '50 balon patlattın!', points: 100},
            {id: 'combo_king', condition: this.maxCombo >= 20, title: 'Combo Kralı', desc: '20x combo yaptın!', points: 200},
            {id: 'level_5', condition: this.level >= 5, title: 'Uzman', desc: '5. seviyeye ulaştın!', points: 150},
            {id: 'level_10', condition: this.level >= 10, title: 'Efsane', desc: '10. seviyeye ulaştın!', points: 500},
            {id: 'high_score', condition: this.score >= 10000, title: 'Puan Avcısı', desc: '10.000 puan yaptın!', points: 300},
        ];
        
        for (let achievement of achievements) {
            const storageKey = `achievement_${achievement.id}`;
            if (achievement.condition && !localStorage.getItem(storageKey)) {
                localStorage.setItem(storageKey, 'true');
                this.showAchievement(achievement.title, achievement.desc, achievement.points);
            }
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
        
        console.log('🏆 Başarı kazanıldı:', title, '-', desc);
    }
    
    updateUI() {
        // Skorları güncelle
        const elements = {
            'current-score': this.score.toLocaleString(), // Binlik ayracı ile
            'current-combo': this.combo + 'x',
            'current-level': this.level,
            'current-lives': this.lives,
            'high-score': this.highScore.toLocaleString(),
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
            
            // Renk değişimi
            if (this.lives <= 1) {
                energyFill.style.background = 'linear-gradient(90deg, #EF4444, #DC2626)';
            } else if (this.lives <= 2) {
                energyFill.style.background = 'linear-gradient(90deg, #F59E0B, #D97706)';
            } else {
                energyFill.style.background = 'linear-gradient(90deg, #10B981, #34D399)';
            }
        }
        
        // Combo rengi (dinamik)
        const comboEl = document.getElementById('current-combo');
        if (comboEl) {
            if (this.combo >= 20) {
                comboEl.style.color = '#8B5CF6'; // Mor
                comboEl.style.textShadow = '0 0 10px #8B5CF6';
            } else if (this.combo >= 10) {
                comboEl.style.color = '#F59E0B'; // Altın
                comboEl.style.textShadow = '0 0 5px #F59E0B';
            } else if (this.combo >= 5) {
                comboEl.style.color = '#EF4444'; // Kırmızı
                comboEl.style.textShadow = 'none';
            } else {
                comboEl.style.color = '#3B82F6'; // Mavi
                comboEl.style.textShadow = 'none';
            }
        }
    }
}

// Oyunu başlat
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM yüklendi, gelişmiş oyun oluşturuluyor...');
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
