// Bubble Pop Mania - Mükemmel Çalışır Versiyon + Çoklu Dil

// Çoklu Dil Sistemi (5 Dil - Tam Çevrilmiş)
const GAME_LANGUAGES = {
    tr: {
        // Ana Menü
        title: "🫧 BUBBLE POP MANIA 🫧",
        subtitle: "Milyonlarca Oyuncunun Bağımlısı Olduğu Oyun!",
        play: "🎯 OYNA",
        tutorial: "📚 Nasıl Oynanır",
        downloadMobile: "📱 Telefona İndir",
        achievements: "🏆 Başarılar",
        settings: "⚙️ Ayarlar",
        
        // Stats
        dailyStreak: "🔥 Günlük Seri:",
        energy: "⚡ Enerji:",
        highScore: "En Yüksek Puan:",
        totalGames: "Toplam Oynama:",
        
        // Game HUD
        score: "Puan:",
        combo: "Combo:",
        level: "Seviye:",
        
        // Tutorial
        tutorialTitle: "🎮 Nasıl Oynanır?",
        popTitle: "Kabarcıkları Patlat:",
        popDesc: "Ekrana gelen kabarcıklara tıkla ve puan kazan!",
        colorTitle: "Renkli Puanlar:",
        colorDesc: "🔵 Mavi = 1 puan\n🟢 Yeşil = 2 puan\n🔴 Kırmızı = 5 puan\n🟡 Altın = 10 puan\n🟣 Elmas = 50 puan",
        comboTitle: "Combo Sistemi:",
        comboDesc: "Arka arkaya balon patlatarak combo yap ve daha fazla puan kazan!",
        warningTitle: "Dikkat:",
        warningDesc: "Kabarcıklar yukarı çıkıp kaçarsa canın azalır. 5 can bitince oyun biter!",
        understood: "Anladım!",
        
        // Settings
        settingsTitle: "⚙️ Ayarlar",
        languageLabel: "🌍 Dil:",
        soundLabel: "🔊 Ses:",
        vibrationLabel: "📳 Titreşim:",
        close: "Kapat",
        
        // QR Modal
        downloadTitle: "📱 Telefona İndir",
        downloadDesc: "Bu QR kodu telefonunla tara ve oyunu ana ekrana ekle!",
        mobileTitle: "📱 Android & iPhone",
        mobileDesc: "1. QR kodu telefonun kamerası ile tara\n2. Çıkan linke tıkla\n3. \"Ana ekrana ekle\" seçeneğini seç\n4. Artık telefonda app gibi çalışır! 🎮",
        manualTitle: "🔗 Manuel Link",
        manualDesc: "QR kod çalışmıyorsa bu linki kullan:",
        copy: "📋 Kopyala",
        shareTitle: "🚀 Arkadaşlarla Paylaş",
        
        // Pause & Game Over
        pauseTitle: "⏸️ Oyun Duraklatıldı",
        pauseDesc: "Oyuna devam etmek istediğinde butona bas!",
        currentScore: "Mevcut Puan:",
        remainingLives: "Kalan Can:",
        resume: "▶️ Devam Et",
        restart: "🔄 Yeniden Başla",
        mainMenu: "🏠 Ana Menü",
        gameOver: "🎯 Oyun Bitti!",
        finalScore: "Final Puanın",
        bestCombo: "En Yüksek Combo:",
        finalLevel: "Seviye:",
        bubblesPopped: "Patlayan Balon:",
        newRecord: "🎉 YENİ REKOR!",
        playAgain: "🔄 Tekrar Oyna",
        shareScore: "📱 Puanı Paylaş",
        backToMenu: "🏠 Ana Menü",
        
        // Power-ups
        freeze: "Dondur",
        double: "2x Puan",
        magnet: "Mıknatıs",
        auto: "Otomatik",
        
        // Loading
        loadingTip: "Kabarcıklara tıklayarak puan kazan!"
    },
    
    en: {
        title: "🫧 BUBBLE POP MANIA 🫧",
        subtitle: "Millions Are Addicted to This Game!",
        play: "🎯 PLAY",
        tutorial: "📚 How To Play",
        downloadMobile: "📱 Download Mobile",
        achievements: "🏆 Achievements",
        settings: "⚙️ Settings",
        
        dailyStreak: "🔥 Daily Streak:",
        energy: "⚡ Energy:",
        highScore: "High Score:",
        totalGames: "Total Games:",
        
        score: "Score:",
        combo: "Combo:",
        level: "Level:",
        
        tutorialTitle: "🎮 How To Play?",
        popTitle: "Pop Bubbles:",
        popDesc: "Tap/click the bubbles to pop them and earn points!",
        colorTitle: "Colored Points:",
        colorDesc: "🔵 Blue = 1 point\n🟢 Green = 2 points\n🔴 Red = 5 points\n🟡 Gold = 10 points\n🟣 Diamond = 50 points",
        comboTitle: "Combo System:",
        comboDesc: "Pop bubbles consecutively to make combos and earn more points!",
        warningTitle: "Warning:",
        warningDesc: "If bubbles escape to the top, you lose lives. Game ends when 5 lives are lost!",
        understood: "Got it!",
        
        settingsTitle: "⚙️ Settings",
        languageLabel: "🌍 Language:",
        soundLabel: "🔊 Sound:",
        vibrationLabel: "📳 Vibration:",
        close: "Close",
        
        downloadTitle: "📱 Download Mobile",
        downloadDesc: "Scan this QR code with your phone and add the game to home screen!",
        mobileTitle: "📱 Android & iPhone",
        mobileDesc: "1. Scan QR code with phone camera\n2. Click on the link\n3. Select \"Add to Home Screen\"\n4. Now it works like an app on your phone! 🎮",
        manualTitle: "🔗 Manual Link",
        manualDesc: "Use this link if QR code doesn't work:",
        copy: "📋 Copy",
        shareTitle: "🚀 Share with Friends",
        
        pauseTitle: "⏸️ Game Paused",
        pauseDesc: "Press button when you want to continue!",
        currentScore: "Current Score:",
        remainingLives: "Remaining Lives:",
        resume: "▶️ Resume",
        restart: "🔄 Restart",
        mainMenu: "🏠 Main Menu",
        gameOver: "🎯 Game Over!",
        finalScore: "Final Score",
        bestCombo: "Best Combo:",
        finalLevel: "Level:",
        bubblesPopped: "Bubbles Popped:",
        newRecord: "🎉 NEW RECORD!",
        playAgain: "🔄 Play Again",
        shareScore: "📱 Share Score",
        backToMenu: "🏠 Main Menu",
        
        freeze: "Freeze",
        double: "2x Points",
        magnet: "Magnet",
        auto: "Auto",
        
        loadingTip: "Tap bubbles to earn points!"
    },
    
    de: {
        title: "🫧 BUBBLE POP MANIA 🫧",
        subtitle: "Millionen sind süchtig nach diesem Spiel!",
        play: "🎯 SPIELEN",
        tutorial: "📚 Anleitung",
        downloadMobile: "📱 Mobile Herunterladen",
        achievements: "🏆 Erfolge",
        settings: "⚙️ Einstellungen",
        
        dailyStreak: "🔥 Tägliche Serie:",
        energy: "⚡ Energie:",
        highScore: "Highscore:",
        totalGames: "Spiele Gesamt:",
        
        score: "Punkte:",
        combo: "Kombo:",
        level: "Level:",
        
        tutorialTitle: "🎮 Wie spielt man?",
        popTitle: "Blasen platzen:",
        popDesc: "Tippe/klicke auf die Blasen um sie zu platzen und Punkte zu verdienen!",
        colorTitle: "Farbige Punkte:",
        colorDesc: "🔵 Blau = 1 Punkt\n🟢 Grün = 2 Punkte\n🔴 Rot = 5 Punkte\n🟡 Gold = 10 Punkte\n🟣 Diamant = 50 Punkte",
        comboTitle: "Kombo System:",
        comboDesc: "Platze Blasen hintereinander für Kombos und mehr Punkte!",
        warningTitle: "Achtung:",
        warningDesc: "Wenn Blasen nach oben entkommen, verlierst du Leben. Spiel endet bei 0 Leben!",
        understood: "Verstanden!",
        
        settingsTitle: "⚙️ Einstellungen",
        languageLabel: "🌍 Sprache:",
        soundLabel: "🔊 Ton:",
        vibrationLabel: "📳 Vibration:",
        close: "Schließen",
        
        downloadTitle: "📱 Mobile Herunterladen",
        downloadDesc: "Scanne diesen QR-Code mit deinem Handy und füge das Spiel zum Homescreen hinzu!",
        mobileTitle: "📱 Android & iPhone",
        mobileDesc: "1. QR-Code mit Handykamera scannen\n2. Auf den Link klicken\n3. \"Zum Homescreen hinzufügen\" wählen\n4. Jetzt funktioniert es wie eine App! 🎮",
        manualTitle: "🔗 Manueller Link",
        manualDesc: "Nutze diesen Link falls QR-Code nicht funktioniert:",
        copy: "📋 Kopieren",
        shareTitle: "🚀 Mit Freunden teilen",
        
        pauseTitle: "⏸️ Spiel pausiert",
        pauseDesc: "Drücke den Button wenn du weitermachen möchtest!",
        currentScore: "Aktuelle Punkte:",
        remainingLives: "Verbleibende Leben:",
        resume: "▶️ Fortsetzen",
        restart: "🔄 Neustart",
        mainMenu: "🏠 Hauptmenü",
        gameOver: "🎯 Spiel Vorbei!",
        finalScore: "Endpunktzahl",
        bestCombo: "Beste Kombo:",
        finalLevel: "Level:",
        bubblesPopped: "Blasen geplatzt:",
        newRecord: "🎉 NEUER REKORD!",
        playAgain: "🔄 Nochmal spielen",
        shareScore: "📱 Punkte teilen",
        backToMenu: "🏠 Hauptmenü",
        
        freeze: "Einfrieren",
        double: "2x Punkte",
        magnet: "Magnet",
        auto: "Auto",
        
        loadingTip: "Tippe auf Blasen um Punkte zu verdienen!"
    },
    
    fr: {
        title: "🫧 BUBBLE POP MANIA 🫧",
        subtitle: "Des millions sont accros à ce jeu !",
        play: "🎯 JOUER",
        tutorial: "📚 Comment Jouer",
        downloadMobile: "📱 Télécharger Mobile",
        achievements: "🏆 Succès",
        settings: "⚙️ Paramètres",
        
        dailyStreak: "🔥 Série Quotidienne:",
        energy: "⚡ Énergie:",
        highScore: "Meilleur Score:",
        totalGames: "Parties Totales:",
        
        score: "Score:",
        combo: "Combo:",
        level: "Niveau:",
        
        tutorialTitle: "🎮 Comment Jouer?",
        popTitle: "Éclater les Bulles:",
        popDesc: "Tape/clique sur les bulles pour les éclater et gagner des points!",
        colorTitle: "Points Colorés:",
        colorDesc: "🔵 Bleu = 1 point\n🟢 Vert = 2 points\n🔴 Rouge = 5 points\n🟡 Or = 10 points\n🟣 Diamant = 50 points",
        comboTitle: "Système de Combo:",
        comboDesc: "Éclate les bulles consécutivement pour faire des combos et gagner plus de points!",
        warningTitle: "Attention:",
        warningDesc: "Si les bulles s'échappent vers le haut, tu perds des vies. Jeu terminé à 0 vie!",
        understood: "Compris!",
        
        settingsTitle: "⚙️ Paramètres",
        languageLabel: "🌍 Langue:",
        soundLabel: "🔊 Son:",
        vibrationLabel: "📳 Vibration:",
        close: "Fermer",
        
        downloadTitle: "📱 Télécharger Mobile",
        downloadDesc: "Scanne ce code QR avec ton téléphone et ajoute le jeu à l'écran d'accueil!",
        mobileTitle: "📱 Android & iPhone",
        mobileDesc: "1. Scanner le QR code avec l'appareil photo\n2. Cliquer sur le lien\n3. Sélectionner \"Ajouter à l'écran d'accueil\"\n4. Maintenant ça fonctionne comme une app! 🎮",
        manualTitle: "🔗 Lien Manuel",
        manualDesc: "Utilise ce lien si le QR code ne fonctionne pas:",
        copy: "📋 Copier",
        shareTitle: "🚀 Partager avec des amis",
        
        pauseTitle: "⏸️ Jeu en pause",
        pauseDesc: "Appuie sur le bouton quand tu veux continuer!",
        currentScore: "Score Actuel:",
        remainingLives: "Vies Restantes:",
        resume: "▶️ Continuer",
        restart: "🔄 Recommencer",
        mainMenu: "🏠 Menu Principal",
        gameOver: "🎯 Jeu Terminé!",
        finalScore: "Score Final",
        bestCombo: "Meilleure Combo:",
        finalLevel: "Niveau:",
        bubblesPopped: "Bulles Éclatées:",
        newRecord: "🎉 NOUVEAU RECORD!",
        playAgain: "🔄 Rejouer",
        shareScore: "📱 Partager Score",
        backToMenu: "🏠 Menu Principal",
        
        freeze: "Geler",
        double: "2x Points",
        magnet: "Aimant",
        auto: "Auto",
        
        loadingTip: "Tape sur les bulles pour gagner des points!"
    },
    
    es: {
        title: "🫧 BUBBLE POP MANIA 🫧",
        subtitle: "¡Millones son adictos a este juego!",
        play: "🎯 JUGAR",
        tutorial: "📚 Cómo Jugar",
        downloadMobile: "📱 Descargar Móvil",
        achievements: "🏆 Logros",
        settings: "⚙️ Ajustes",
        
        dailyStreak: "🔥 Racha Diaria:",
        energy: "⚡ Energía:",
        highScore: "Puntuación Máxima:",
        totalGames: "Partidas Totales:",
        
        score: "Puntuación:",
        combo: "Combo:",
        level: "Nivel:",
        
        tutorialTitle: "🎮 ¿Cómo Jugar?",
        popTitle: "Explotar Burbujas:",
        popDesc: "¡Toca/haz clic en las burbujas para explotarlas y ganar puntos!",
        colorTitle: "Puntos de Colores:",
        colorDesc: "🔵 Azul = 1 punto\n🟢 Verde = 2 puntos\n🔴 Rojo = 5 puntos\n🟡 Oro = 10 puntos\n🟣 Diamante = 50 puntos",
        comboTitle: "Sistema de Combo:",
        comboDesc: "¡Explota burbujas consecutivamente para hacer combos y ganar más puntos!",
        warningTitle: "Atención:",
        warningDesc: "Si las burbujas se escapan hacia arriba, pierdes vidas. ¡El juego termina con 0 vidas!",
        understood: "¡Entendido!",
        
        settingsTitle: "⚙️ Ajustes",
        languageLabel: "🌍 Idioma:",
        soundLabel: "🔊 Sonido:",
        vibrationLabel: "📳 Vibración:",
        close: "Cerrar",
        
        downloadTitle: "📱 Descargar Móvil",
        downloadDesc: "¡Escanea este código QR con tu teléfono y añade el juego a la pantalla de inicio!",
        mobileTitle: "📱 Android & iPhone",
        mobileDesc: "1. Escanear código QR con cámara del teléfono\n2. Hacer clic en el enlace\n3. Seleccionar \"Añadir a pantalla de inicio\"\n4. ¡Ahora funciona como una app! 🎮",
        manualTitle: "🔗 Enlace Manual",
        manualDesc: "Usa este enlace si el código QR no funciona:",
        copy: "📋 Copiar",
        shareTitle: "🚀 Compartir con amigos",
        
        pauseTitle: "⏸️ Juego en Pausa",
        pauseDesc: "¡Presiona el botón cuando quieras continuar!",
        currentScore: "Puntuación Actual:",
        remainingLives: "Vidas Restantes:",
        resume: "▶️ Continuar",
        restart: "🔄 Reiniciar",
        mainMenu: "🏠 Menú Principal",
        gameOver: "🎯 ¡Fin del Juego!",
        finalScore: "Puntuación Final",
        bestCombo: "Mejor Combo:",
        finalLevel: "Nivel:",
        bubblesPopped: "Burbujas Explotadas:",
        newRecord: "🎉 ¡NUEVO RÉCORD!",
        playAgain: "🔄 Jugar de nuevo",
        shareScore: "📱 Compartir Puntuación",
        backToMenu: "🏠 Menú Principal",
        
        freeze: "Congelar",
        double: "2x Puntos",
        magnet: "Imán",
        auto: "Auto",
        
        loadingTip: "¡Toca las burbujas para ganar puntos!"
    }
};

// Dil yönetimi
let CURRENT_LANG = localStorage.getItem('gameLang') || 'tr';

// Dil güncelleme fonksiyonu
function updateLanguageTexts() {
    const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
    
    // Helper function
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el && text) el.textContent = text;
    };
    
    // Ana menü
    setText('title', LANG.title);
    setText('subtitle', LANG.subtitle);
    setText('play-btn', LANG.play);
    setText('tutorial-btn', LANG.tutorial);
    setText('download-mobile-btn', LANG.downloadMobile);
    setText('achievements-btn', LANG.achievements);
    setText('settings-btn', LANG.settings);
    
    // Stats
    setText('energy-label', LANG.energy);
    setText('high-score-label', LANG.highScore);
    setText('total-games-label', LANG.totalGames);
    
    // Game HUD
    setText('score-label', LANG.score);
    setText('combo-label', LANG.combo);
    setText('level-label', LANG.level);
    
    // Tutorial
    setText('tutorial-title', LANG.tutorialTitle);
    setText('pop-title', LANG.popTitle);
    setText('pop-desc', LANG.popDesc);
    setText('color-title', LANG.colorTitle);
    setText('color-desc', LANG.colorDesc);
    setText('combo-title', LANG.comboTitle);
    setText('combo-desc', LANG.comboDesc);
    setText('warning-title', LANG.warningTitle);
    setText('warning-desc', LANG.warningDesc);
    setText('tutorial-close', LANG.understood);
    
    // Settings
    setText('settings-title', LANG.settingsTitle);
    setText('language-label', LANG.languageLabel);
    setText('sound-label', LANG.soundLabel);
    setText('vibration-label', LANG.vibrationLabel);
    setText('settings-close', LANG.close);
    
    // QR Modal
    setText('download-title', LANG.downloadTitle);
    setText('download-desc', LANG.downloadDesc);
    setText('mobile-title', LANG.mobileTitle);
    setText('mobile-desc', LANG.mobileDesc);
    setText('manual-title', LANG.manualTitle);
    setText('manual-desc', LANG.manualDesc);
    setText('copy-url-btn', LANG.copy);
    setText('share-title', LANG.shareTitle);
    setText('close-qr-btn', LANG.close);
    
    // Pause
    setText('pause-title', LANG.pauseTitle);
    setText('pause-desc', LANG.pauseDesc);
    setText('resume-btn', LANG.resume);
    setText('restart-btn', LANG.restart);
    setText('main-menu-btn', LANG.mainMenu);
    
    // Game Over
    setText('game-over-title', LANG.gameOver);
    setText('final-score-label', LANG.finalScore);
    setText('best-combo-label', LANG.bestCombo);
    setText('final-level-label', LANG.finalLevel);
    setText('bubbles-popped-label', LANG.bubblesPopped);
    setText('new-record-text', LANG.newRecord);
    setText('play-again-btn', LANG.playAgain);
    setText('share-score-btn', LANG.shareScore);
    setText('back-to-menu-btn', LANG.backToMenu);
    
    // Power-ups
    setText('freeze-text', LANG.freeze);
    setText('double-text', LANG.double);
    setText('magnet-text', LANG.magnet);
    setText('auto-text', LANG.auto);
    
    // Loading
    setText('loading-tip', LANG.loadingTip);
    
    console.log('🌍 Dil güncellendi:', CURRENT_LANG);
}

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
        
        // Seviye sistemi
        this.levelSettings = {
            1: { speedMultiplier: 1.0, spawnDelay: 2500, maxBubbles: 6, rareChance: 0.1, bgColor: '#87CEEB' },
            2: { speedMultiplier: 1.2, spawnDelay: 2200, maxBubbles: 7, rareChance: 0.15, bgColor: '#78B3D6' },
            3: { speedMultiplier: 1.4, spawnDelay: 1900, maxBubbles: 8, rareChance: 0.2, bgColor: '#6998C1' },
            4: { speedMultiplier: 1.6, spawnDelay: 1600, maxBubbles: 9, rareChance: 0.25, bgColor: '#5A7DAC' },
            5: { speedMultiplier: 1.8, spawnDelay: 1300, maxBubbles: 10, rareChance: 0.3, bgColor: '#4B6297' }
        };
        
        this.levelUpEffects = [];
        
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
        this.spawnDelay = 2500;
        
        // Balon tipleri
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
        console.log('🎮 Bubble Pop Mania - Güzel + Çalışır Versiyon başlatılıyor...');
        this.showLoadingScreen();
        
        setTimeout(() => {
            this.setupCanvas();
            this.setupEventListeners();
            this.updateUI();
            this.showMainMenu();
            console.log('✅ Oyun hazır - Çoklu dil sistemi + güzel görünüm aktif!');
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
        
        // Tutorial ve Settings kapatma
        const tutorialClose = document.getElementById('tutorial-close');
        const settingsClose = document.getElementById('settings-close');
        if (tutorialClose) tutorialClose.addEventListener('click', () => this.showMainMenu());
        if (settingsClose) settingsClose.addEventListener('click', () => this.showMainMenu());
        
        // Dil seçici
        const langSelect = document.getElementById('language-select');
        if (langSelect) {
            langSelect.value = CURRENT_LANG;
            langSelect.addEventListener('change', (e) => {
                CURRENT_LANG = e.target.value;
                localStorage.setItem('gameLang', CURRENT_LANG);
                updateLanguageTexts();
                console.log('🌍 Dil değiştirildi:', CURRENT_LANG);
            });
        }
        
        // QR Modal
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
        
        // Game Over
        const playAgainBtn = document.getElementById('play-again-btn');
        const shareScoreBtn = document.getElementById('share-score-btn');
        const backToMenuBtn = document.getElementById('back-to-menu-btn');
        
        if (playAgainBtn) playAgainBtn.addEventListener('click', () => this.startGame());
        if (shareScoreBtn) shareScoreBtn.addEventListener('click', () => this.shareScore());
        if (backToMenuBtn) backToMenuBtn.addEventListener('click', () => this.showMainMenu());
        
        // Power-ups
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
            this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
            
            this.canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const clickEvent = new MouseEvent('click', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                this.handleCanvasClick(clickEvent);
            }, {passive: false});
        }
        
        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (this.gameState === 'playing' && e.code === 'Space') {
                e.preventDefault();
                this.pauseGame();
            }
        });
    }
    
    // Ekran yönetimi
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
    
    showSettings() {
        this.showScreen('settings-screen');
        console.log('⚙️ Ayarlar gösteriliyor');
    }
    
    showAchievements() {
        const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
        alert('🏆 ' + (LANG.achievements || 'Başarılar') + ' sistemi yakında gelecek!\n\n🎯 Mevcut seviye: ' + this.level + '\n• En yüksek puan: ' + this.highScore);
    }
    
    // QR Modal
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
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; flex-direction: column; justify-content: center; align-items: center; padding: 20px; color: #666; text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 10px;">📱</div>
                    <div>QR Kod yüklenemedi</div>
                    <div style="font-size: 0.8rem; margin-top: 10px;">Manuel linki kullan:</div>
                    <div style="font-size: 0.7rem; word-break: break-all; margin-top: 5px;">${gameURL}</div>
                </div>
            `;
        }
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
        }
    }
    
    fallbackCopy(urlInput) {
        try {
            document.execCommand('copy');
            this.showCopySuccess();
        } catch (err) {
            console.error('Fallback kopyalama hatası:', err);
        }
    }
    
    showCopySuccess() {
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
        const text = encodeURIComponent(`🫧 Bubble Pop Mania - Harika oyun! ${this.score > 0 ? `${this.score} puan yaptım! ` : ''}🎯 ${gameURL}`);
        
        const whatsappURL = `https://wa.me/?text=${text}`;
        window.open(whatsappURL, '_blank');
    }
    
    shareToTelegram() {
        const gameURL = document.getElementById('game-url')?.value || window.location.href;
        const text = encodeURIComponent(`🫧 Bubble Pop Mania ${gameURL}`);
        
        const telegramURL = `https://t.me/share/url?url=${encodeURIComponent(gameURL)}&text=${text}`;
        window.open(telegramURL, '_blank');
    }
    
    shareToTwitter() {
        const gameURL = document.getElementById('game-url')?.value || window.location.href;
        const text = encodeURIComponent(`🫧 Bubble Pop Mania oynuyorum! 🎯 #BubblePopMania`);
        
        const twitterURL = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(gameURL)}`;
        window.open(twitterURL, '_blank');
    }
    
    // Seviye sistemi
    checkLevelUp() {
        const oldLevel = this.level;
        
        if (this.score >= 500 && this.level === 1) {
            this.level = 2;
        } else if (this.score >= 1500 && this.level === 2) {
            this.level = 3;
        } else if (this.score >= 3000 && this.level === 3) {
            this.level = 4;
        } else if (this.score >= 5000 && this.level === 4) {
            this.level = 5;
        } else if (this.score >= 8000 && this.level >= 5) {
            this.level = Math.min(10, Math.floor(this.score / 2000));
        }
        
        if (this.level > oldLevel) {
            this.onLevelUp(oldLevel, this.level);
        }
    }
    
    onLevelUp(oldLevel, newLevel) {
        console.log(`🎉 LEVEL UP! ${oldLevel} → ${newLevel}!`);
        
        this.updateLevelSettings();
        this.showLevelUpEffect(newLevel);
        this.createLevelUpParticles();
        
        console.log('🎵 *LEVEL UP SOUND*');
    }
    
    updateLevelSettings() {
        const settings = this.getCurrentLevelSettings();
        this.spawnDelay = settings.spawnDelay;
        
        console.log(`⚙️ Seviye ${this.level} ayarları:`, settings);
    }
    
    getCurrentLevelSettings() {
        return this.levelSettings[this.level] || this.levelSettings[5];
    }
    
    showLevelUpEffect(newLevel) {
        this.levelUpEffects.push({
            text: `LEVEL ${newLevel}!`,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2 - 30,
            scale: 0.5,
            opacity: 1,
            life: 2500,
            maxLife: 2500
        });
    }
    
    createLevelUpParticles() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: centerX + (Math.random() - 0.5) * 80,
                y: centerY + (Math.random() - 0.5) * 80,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6 - 2,
                size: 3 + Math.random() * 4,
                color: '#FFD700',
                life: 1200 + Math.random() * 800
            });
        }
    }
    
    updateLevelUpEffects(deltaTime) {
        for (let i = this.levelUpEffects.length - 1; i >= 0; i--) {
            const effect = this.levelUpEffects[i];
            effect.life -= deltaTime;
            
            const progress = 1 - (effect.life / effect.maxLife);
            
            if (progress < 0.3) {
                effect.scale = 0.5 + (progress / 0.3) * 1.5;
            } else if (progress < 0.7) {
                effect.scale = 2.0;
            } else {
                effect.opacity = (1 - progress) / 0.3;
            }
            
            if (effect.life <= 0) {
                this.levelUpEffects.splice(i, 1);
            }
        }
    }
    
    // Oyun mekaniği
    startGame() {
        console.log('🎯 Yeni oyun başlıyor...');
        
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
        this.spawnTimer = 0;
        this.spawnDelay = 2500;
        
        Object.keys(this.powerUps).forEach(key => {
            this.powerUps[key] = false;
        });
        
        this.showScreen('game-screen');
        this.updateUI();
        
        this.createBubble();
        this.createBubble();
        
        this.gameLoop(performance.now());
    }
    
    pauseGame() {
        if (this.gameState !== 'playing') return;
        
        console.log('⏸️ Oyun duraklatıldı');
        this.gameState = 'paused';
        
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
        
        let isNewRecord = false;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore.toString());
            isNewRecord = true;
        }
        
        localStorage.setItem('totalGames', this.totalGames.toString());
        
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('best-combo').textContent = this.maxCombo + 'x';
        document.getElementById('final-level').textContent = this.level;
        document.getElementById('bubbles-popped').textContent = this.bubblesPopped;
        
        const newRecordEl = document.getElementById('new-record');
        const titleEl = document.getElementById('game-over-title');
        
        if (isNewRecord && newRecordEl && titleEl) {
            newRecordEl.style.display = 'block';
            const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
            titleEl.textContent = LANG.newRecord || '🎉 YENİ REKOR!';
        } else if (titleEl) {
            const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
            titleEl.textContent = LANG.gameOver || '🎯 Oyun Bitti!';
            if (newRecordEl) newRecordEl.style.display = 'none';
        }
        
        this.showScreen('game-over');
    }
    
    shareScore() {
        const text = `🫧 Bubble Pop Mania'da ${this.score} puan yaptım! Seviye ${this.level}! 🎯`;
        const gameURL = document.getElementById('game-url')?.value || 'https://eyedeu.github.io/bubble-pop-mania';
        
        if (navigator.share) {
            navigator.share({
                title: 'Bubble Pop Mania',
                text: text,
                url: gameURL
            }).then(() => {
                console.log('📱 Paylaşım başarılı');
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
                alert('📋 Puanın kopyalandı! Sosyal medyada paylaşabilirsin.');
            });
        }
    }
    
    // Balon yönetimi
    createBubble() {
        const settings = this.getCurrentLevelSettings();
        
        const bubble = {
            x: Math.random() * (this.canvas.width - 100) + 50,
            y: this.canvas.height + 30,
            radius: 22 + Math.random() * 13, // 22-35 arası
            speed: (0.9 + Math.random() * 0.4) * settings.speedMultiplier, // 0.9-1.3 * multiplier
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
        const rareBonus = settings.rareChance * 30;
        
        if (rand < 40 - rareBonus) return this.bubbleTypes[0].color; // Blue
        if (rand < 65 - rareBonus) return this.bubbleTypes[1].color; // Green
        if (rand < 85) return this.bubbleTypes[2].color;             // Red
        if (rand < 95 + rareBonus) return this.bubbleTypes[3].color; // Gold
        return this.bubbleTypes[4].color;                            // Purple
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
        
        let targetBubble = null;
        let minDistance = Infinity;
        
        for (let bubble of this.bubbles) {
            if (!bubble.alive) continue;
            
            const distance = Math.sqrt((x - bubble.x) ** 2 + (y - bubble.y) ** 2);
            if (distance <= bubble.radius + 8 && distance < minDistance) {
                minDistance = distance;
                targetBubble = bubble;
            }
        }
        
        if (targetBubble) {
            this.popBubble(targetBubble);
        } else {
            this.combo = 1;
            this.updateUI();
            console.log('❌ Boş yere tıklandı - combo resetlendi');
        }
    }
    
    popBubble(bubble) {
        if (!bubble.alive) return;
        
        bubble.alive = false;
        this.bubblesPopped++;
        
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
        
        const index = this.bubbles.indexOf(bubble);
        if (index > -1) {
            this.bubbles.splice(index, 1);
        }
        
        this.createParticles(bubble.x, bubble.y, bubble.color);
        this.checkLevelUp();
        this.updateUI();
        
        console.log(`💥 +${points} puan! (${this.combo-1}x combo)`);
    }
    
    // Oyun döngüsü
    gameLoop(currentTime) {
        if (this.gameState !== 'playing') return;
        
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        const settings = this.getCurrentLevelSettings();
        
        // Balon spawn
        this.spawnTimer += deltaTime;
        if (this.spawnTimer >= this.spawnDelay && this.bubbles.length < settings.maxBubbles) {
            this.createBubble();
            this.spawnTimer = 0;
            
            // Yüksek seviyede ek balon şansı
            if (this.level > 2 && Math.random() < 0.25) {
                this.createBubble();
            }
            if (this.level > 4 && Math.random() < 0.15) {
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
            
            let speed = bubble.speed;
            if (this.powerUps.freeze) speed *= 0.25;
            
            bubble.y -= speed;
            bubble.pulsePhase += 0.04;
            
            // Mıknatıs efekti
            if (this.powerUps.magnet) {
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;
                const dx = centerX - bubble.x;
                const dy = centerY - bubble.y;
                const distance = Math.sqrt(dx*dx + dy*dy);
                
                if (distance > 40) {
                    bubble.x += (dx / distance) * 0.4;
                    bubble.y += (dy / distance) * 0.4;
                }
            }
            
            // Ekran dışına çıkan balonları kaldır
            if (bubble.y + bubble.radius < -50) {
                this.bubbles.splice(i, 1);
                this.lives--;
                this.combo = 1;
                
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
                if (bubble.alive && Math.random() < 0.015) {
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
            particle.vy += 0.08; // Yerçekimi
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    updatePowerUps(deltaTime) {
        // Power-up süre yönetimi
    }
    
    // Render
    render() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
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
        
        // Level up efektleri
        this.drawLevelUpEffects();
        
        // Power-up efektleri
        this.drawPowerUpEffects();
    }
    
    drawBackground() {
        const settings = this.getCurrentLevelSettings();
        
        // Seviye bazlı gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, settings.bgColor);
        gradient.addColorStop(0.5, this.lightenColor(settings.bgColor, 12));
        gradient.addColorStop(1, this.lightenColor(settings.bgColor, 25));
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Seviye göstergesi
        this.ctx.save();
        this.ctx.globalAlpha = 0.25;
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`LEVEL ${this.level}`, this.canvas.width / 2, 35);
        this.ctx.restore();
        
        // Dekoratif arka plan
        this.ctx.save();
        this.ctx.globalAlpha = Math.min(0.08, 0.04 + this.level * 0.008);
        for (let i = 0; i < Math.min(4, this.level); i++) {
            const x = (i + 1) * this.canvas.width / 5;
            const y = this.canvas.height - 120 + Math.sin(performance.now() * 0.001 + i) * 25;
            const size = 18 + Math.sin(performance.now() * 0.0015 + i) * 8;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fill();
        }
        this.ctx.restore();
    }
    
    drawBubble(bubble) {
        const pulse = 1 + Math.sin(bubble.pulsePhase) * 0.08;
        const radius = bubble.radius * pulse;
        
        this.ctx.save();
        
        // Seviye bazlı glow
        if (this.level > 3) {
            this.ctx.shadowColor = bubble.color;
            this.ctx.shadowBlur = 8;
        }
        
        // Gölge
        this.ctx.beginPath();
        this.ctx.arc(bubble.x + 2, bubble.y + 2, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        this.ctx.fill();
        
        // Ana balon
        this.ctx.beginPath();
        this.ctx.arc(bubble.x, bubble.y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = bubble.color;
        this.ctx.fill();
        
        // Parlaklık efekti
        this.ctx.beginPath();
        this.ctx.arc(bubble.x - radius * 0.25, bubble.y - radius * 0.25, radius * 0.35, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.fill();
        
        // Kenarlık
        this.ctx.beginPath();
        this.ctx.arc(bubble.x, bubble.y, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
        
        // Puan gösterimi
        if (bubble.points >= 10) {
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.font = 'bold ' + Math.round(radius * 0.35) + 'px Arial';
            this.ctx.fillStyle = 'white';
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
            this.ctx.lineWidth = 1.5;
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
            
            this.ctx.font = `bold ${Math.round(35 * effect.scale)}px Arial`;
            this.ctx.fillStyle = '#FFD700';
            this.ctx.strokeStyle = '#FF8C00';
            this.ctx.lineWidth = 3;
            this.ctx.shadowColor = '#000000';
            this.ctx.shadowBlur = 8;
            
            this.ctx.strokeText(effect.text, effect.x, effect.y);
            this.ctx.fillText(effect.text, effect.x, effect.y);
            
            this.ctx.restore();
        }
    }
    
    drawPowerUpEffects() {
        if (this.powerUps.freeze) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.2;
            this.ctx.fillStyle = '#87CEEB';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
        
        if (this.powerUps.double) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.08 + Math.sin(performance.now() * 0.008) * 0.04;
            this.ctx.fillStyle = '#FFD700';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
    }
    
    // Yardımcı fonksiyonlar
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
                vx: (Math.random() - 0.5) * 3.5,
                vy: (Math.random() - 0.5) * 3.5 - 1.5,
                size: 2 + Math.random() * 2.5,
                color: color,
                life: 450 + Math.random() * 450
            });
        }
    }
    
    activatePowerUp(type) {
        if (this.gameState !== 'playing') return;
        
        const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
        
        console.log('⚡ Power-up aktive:', type);
        
        switch(type) {
            case 'freeze':
                this.powerUps.freeze = true;
                setTimeout(() => {
                    this.powerUps.freeze = false;
                }, 5000);
                console.log('🧊 ' + (LANG.freeze || 'Dondur') + ' aktif!');
                break;
                
            case 'double':
                this.powerUps.double = true;
                setTimeout(() => {
                    this.powerUps.double = false;
                }, 10000);
                console.log('⭐ ' + (LANG.double || '2x Puan') + ' aktif!');
                break;
                
            case 'magnet':
                this.powerUps.magnet = true;
                setTimeout(() => {
                    this.powerUps.magnet = false;
                }, 8000);
                console.log('🧲 ' + (LANG.magnet || 'Mıknatıs') + ' aktif!');
                break;
                
            case 'auto':
                this.powerUps.auto = true;
                setTimeout(() => {
                    this.powerUps.auto = false;
                }, 15000);
                console.log('🤖 ' + (LANG.auto || 'Otomatik') + ' aktif!');
                break;
        }
    }
    
    updateUI() {
        const elements = {
            'current-score': this.score.toLocaleString(),
            'current-combo': this.combo + 'x',
            'current-level': this.level,
            'current-lives': this.lives,
            'high-score': this.highScore.toLocaleString(),
            'total-games': this.totalGames,
            'daily-streak': 1,
            'energy-text': this.lives + '/5'
        };
        
        for (let [id, value] of Object.entries(elements)) {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        }
        
        // Energy bar renk
        const energyFill = document.getElementById('energy-fill');
        if (energyFill) {
            const energyPercent = (this.lives / 5) * 100;
            energyFill.style.width = energyPercent + '%';
            
            if (this.lives <= 1) {
                energyFill.style.background = 'linear-gradient(90deg, #EF4444, #DC2626)';
            } else if (this.lives <= 2) {
                energyFill.style.background = 'linear-gradient(90deg, #F59E0B, #D97706)';
            } else {
                energyFill.style.background = 'linear-gradient(90deg, #10B981, #34D399)';
            }
        }
        
        // Combo rengi
        const comboEl = document.getElementById('current-combo');
        if (comboEl) {
            if (this.combo >= 15) {
                comboEl.style.color = '#8B5CF6';
                comboEl.style.textShadow = '0 0 8px #8B5CF6';
            } else if (this.combo >= 8) {
                comboEl.style.color = '#F59E0B';
                comboEl.style.textShadow = '0 0 4px #F59E0B';
            } else if (this.combo >= 4) {
                comboEl.style.color = '#EF4444';
                comboEl.style.textShadow = 'none';
            } else {
                comboEl.style.color = '#3B82F6';
                comboEl.style.textShadow = 'none';
            }
        }
    }
}

// Başlat
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM yüklendi, geliştirilmiş çoklu dil oyunu oluşturuluyor...');
    
    // Dil seçici
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.value = CURRENT_LANG;
        langSelect.addEventListener('change', (e) => {
            CURRENT_LANG = e.target.value;
            localStorage.setItem('gameLang', CURRENT_LANG);
            updateLanguageTexts();
            console.log('🌍 Dil değiştirildi:', CURRENT_LANG);
        });
    }
    
    // İlk dil güncellemesi
    updateLanguageTexts();
    
    // Oyunu başlat
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
