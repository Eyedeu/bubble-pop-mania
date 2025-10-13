// ✅ Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyCLm-w85AbcY4IvlfQJvsqN0rq23qUFrRk",
    authDomain: "bubblepopmania-668bf.firebaseapp.com",
    projectId: "bubblepopmania-668bf",
    storageBucket: "bubblepopmania-668bf.firebasestorage.app",
    messagingSenderId: "477355204391",
    appId: "1:477355204391:web:f107e67881c1fbb415d302",
    measurementId: "G-REP9ENP1S2"
};
let _firebaseInitPromise = null;
let isFirebaseReady = false;

// Çoklu Dil Sistemi - 5 Dil - Tam evrilmiş
const GAME_LANGUAGES = {
    tr: {
        // Ana Menü
        title: "BUBBLE POP MANIA",
        subtitle: "Milyonlarca Oyuncunun Bağımlısı Olduğu Oyun!",
        play: "OYNA",
        tutorial: "Nasıl Oynanır",
        downloadMobile: "Play Store'da Paylaş",
        achievements: "Başarılar",
        settings: "Ayarlar",

 // YENİ: Kullanıcı Adı Çevirileri
        username: "Kullanıcı Adı",
        save: "Kaydet",
        usernamePlaceholder: "Yeni kullanıcı adınızı girin",
        usernameUpdated: "Kullanıcı adınız güncellendi!",
        usernameTaken: "Bu kullanıcı adı zaten alınmış. Başka bir tane deneyin.",
        usernameInvalid: "Kullanıcı adı 3-15 karakter arasında olmalı ve özel karakter içermemelidir.",
        defaultPlayerName: "Oyuncu", // Otomatik oluşturulan isimler için

        // Stats
        dailyStreak: "Günlük Seri",
        days: "Gün",
        energy: "Enerji",
        highScore: "En Yüksek Puan",
        totalGames: "Toplam Oynama",

        // Game HUD
        score: "Puan",
        combo: "Combo",
        level: "Seviye",
        pauseScoreLabel: "Mevcut Puan",
          pauseComboLabel: "Combo",
          pauseLivesLabel: "Kalan Can",

        // Tutorial
        tutorialTitle: "Nasıl Oynanır?",
        popTitle: "Kabarcıkları Patlat",
        popDesc: "Ekrana gelen kabarcıklara tıkla ve puan kazan!",
        colorTitle: "Renkli Puanlar",
        colorDesc: "• Mavi: 1 puan • Yeşil: 2 puan • Kırmızı: 5 puan • Altın: 10 puan • Elmas: 50 puan",
        comboTitle: "Combo Sistemi",
        comboDesc: "Arka arkaya balon patlatarak combo yap ve daha fazla puan kazan!",
        warningTitle: "Dikkat",
        warningDesc: "Kabarcıklar yukarı kaçıp kaçarsa canın azalır. 5 can bitince oyun biter!",
        understood: "Anladım!",

        // Settings
        settingsTitle: "Ayarlar",
        languageLabel: "Dil",
        soundLabel: "Ses",
        vibrationLabel: "Titreşim",
        close: "Kapat",

        // QR Modal
        downloadTitle: "Play Store'da Paylaş",
        downloadDesc: "Oyunu arkadaşlarınla paylaş ve birlikte oyna!",
        mobileTitle: "Google Play Store",
        mobileDesc: "Oyun Play Store'da yayınlandığında buradan paylaşabileceksin!",
        manualTitle: "Paylaşım Linki",
        manualDesc: "Arkadaşlarınla bu linki paylaş",
        copy: "Kopyala",
        shareTitle: "Arkadaşlarla Paylaş",

        // Pause
        pauseTitle: "Oyun Duraklatıldı",
        pauseDesc: "Oyuna devam etmek istediğinde buton'a bas!",
        currentScore: "Mevcut Puan",
        remainingLives: "Kalan Can",
        resume: "Devam Et",
        restart: "Yeniden Başla",
        mainMenu: "Ana Menü",

        // Game Over
        gameOver: "Oyun Bitti!",
        finalScore: "Final Puanın",
        bestCombo: "En Yüksek Combo",
        finalLevel: "Seviye",
        bubblesPopped: "Patlayan Balon",
        newRecord: "YENİ REKOR!",
        playAgain: "Tekrar Oyna",
        shareScore: "Puan Paylaş",
        backToMenu: "Ana Menü",

        // Power-ups & Energy
        freeze: "Dondur",
        double: "2x Puan",
        magnet: "Mıknatıs",
        auto: "Otomatik",
        energyRefill: "Enerji Doldur",
        watchAd: "Reklam İzle",
        energyFull: "Enerji Dolu!",
        energyEmpty: "Enerjin bitti! Reklam izleyip doldurmak ister misin?",

        // Loading
        loadingTip: "Kabarcıklara tıklayarak puan kazan!",
        autoIncreased: "Auto hakkın 1 arttı!",
        increasedMsg: "{TIP} hakkın 1 arttı!",

          magnetIncreased: "Mıknatıs hakkın 1 arttı!",
          doubleIncreased: "2x Bonus hakkın 1 arttı!",
          freezeIncreased: "Dondur hakkın 1 arttı!",
          currentScore: "Mevcut Puan",
          combo: "Combo",
          lives: "Kalan Can",
          pause: "Duraklatıldı",

        achievementLevel: 'Seviye {N}!',
        achievementLevelDesc: 'Tebrikler! {N}. seviyeye ulaştın!',

        // Liderlik Tablosu
        leaderboardTitle: "🏆 Liderlik Tablosu",
        leaderboardPlayerRank: "🎯 Senin Sıran: #{RANK} (Puan: {SCORE})",
        leaderboardNoRank: "🎯 Henüz sıralamada yerin yok. Oyun oynayarak sıralamaya gir!",
        leaderboardTopPlayers: "En İyi 10 Oyuncu:"
    },

    en: {
        title: "BUBBLE POP MANIA",
        subtitle: "Millions Are Addicted to This Game!",
        play: "PLAY",
        tutorial: "How To Play",
        downloadMobile: "Share on Play Store",
        achievements: "Achievements",
        settings: "Settings",
        username: "Username",
         save: "Save",
         usernamePlaceholder: "Enter new username",
         usernameUpdated: "Username updated!",
         usernameTaken: "This username is already taken. Try another.",
         usernameInvalid: "Username must be 3-15 characters long and contain no special characters.",
         defaultPlayerName: "Player",
        dailyStreak: "Daily Streak",
        days: "Day",
        energy: "Energy",
        highScore: "High Score",
        totalGames: "Total Games",
        score: "Score",
        combo: "Combo",
        level: "Level",
        pauseScoreLabel: "Current Score",
          pauseComboLabel: "Combo",
          pauseLivesLabel: "Lives Remaining",
        tutorialTitle: "How To Play?",
        popTitle: "Pop Bubbles",
        popDesc: "Tap/click the bubbles to pop them and earn points!",
        colorTitle: "Colored Points",
        colorDesc: "• Blue: 1 point • Green: 2 points • Red: 5 points • Gold: 10 points • Diamond: 50 points",
        comboTitle: "Combo System",
        comboDesc: "Pop bubbles consecutively to make combos and earn more points!",
        warningTitle: "Warning",
        warningDesc: "If bubbles escape to the top, you lose lives. Game ends when 5 lives are lost!",
        understood: "Got it!",
        settingsTitle: "Settings",
        languageLabel: "Language",
        soundLabel: "Sound",
        vibrationLabel: "Vibration",
        close: "Close",
        downloadTitle: "Share on Play Store",
        downloadDesc: "Share the game with your friends and play together!",
        mobileTitle: "Google Play Store",
        mobileDesc: "When the game is published on Play Store, you can share it from here!",
        manualTitle: "Share Link",
        manualDesc: "Share this link with your friends",
        copy: "Copy",
        shareTitle: "Share with Friends",
        pauseTitle: "Game Paused",
        pauseDesc: "Press button when you want to continue!",
        currentScore: "Current Score",
        remainingLives: "Remaining Lives",
        resume: "Resume",
        restart: "Restart",
        mainMenu: "Main Menu",
        gameOver: "Game Over!",
        finalScore: "Final Score",
        bestCombo: "Best Combo",
        finalLevel: "Level",
        bubblesPopped: "Bubbles Popped",
        newRecord: "NEW RECORD!",
        playAgain: "Play Again",
        shareScore: "Share Score",
        backToMenu: "Main Menu",
        freeze: "Freeze",
        double: "2x Points",
        magnet: "Magnet",
        auto: "Auto",
        energyRefill: "Refill Energy",
        watchAd: "Watch Ad",
        energyFull: "Energy Full!",
        energyEmpty: "Your energy is empty! Would you like to watch an ad to refill it?",
        loadingTip: "Tap bubbles to earn points!",
         autoIncreased: "Auto power-up +1!",
         increasedMsg: "{TIP} power-up +1!",
          magnetIncreased: "Magnet power-up +1!",
          doubleIncreased: "Double Points +1!",
          freezeIncreased: "Freeze power-up +1!",
          currentScore: "Current Score",
          combo: "Combo",
          lives: "Lives Remaining",
          pause: "Paused",
        achievementLevel: 'Level {N}!',
        achievementLevelDesc: 'Congratulations! You reached level {N}!',
        // Liderlik Tablosu
        leaderboardTitle: "🏆 Leaderboard",
        leaderboardPlayerRank: "🎯 Your Rank: #{RANK} (Score: {SCORE})",
        leaderboardNoRank: "🎯 You're not on the leaderboard yet. Play to join the rankings!",
        leaderboardTopPlayers: "Top 10 Players:"
    },
    de: {
        // Hauptmenü
        title: "BUBBLE POP MANIA",
        subtitle: "Millionen sind süchtig nach diesem Spiel!",
        play: "SPIELEN",
        tutorial: "Wie zu spielen",
        downloadMobile: "Im Play Store teilen",
        achievements: "Erfolge",
        settings: "Einstellungen",

        // Stats
        dailyStreak: "Tägliche Serie",
        days: "Tag",
        energy: "Energie",
        highScore: "Höchste Punktzahl",
        totalGames: "Gespielte Spiele",

        // Game HUD
        score: "Punkte",
        combo: "Combo",
        level: "Level",
        pauseScoreLabel: "Aktueller Punktestand",
          pauseComboLabel: "Combo",
          pauseLivesLabel: "Verbleibende Leben",

        // Tutorial
        tutorialTitle: "Wie zu spielen?",
        popTitle: "Blasen platzen",
        popDesc: "Tippe auf die Blasen, um sie platzen zu lassen und Punkte zu sammeln!",
        colorTitle: "Farbige Punkte",
        colorDesc: "• Blau: 1 Punkt • Grün: 2 Punkte • Rot: 5 Punkte • Gold: 10 Punkte • Diamant: 50 Punkte",
        comboTitle: "Combo-System",
        comboDesc: "Platze Blasen nacheinander, um Combos zu machen und mehr Punkte zu verdienen!",
        warningTitle: "Warnung",
        warningDesc: "Wenn Blasen nach oben entkommen, verlierst du Leben. Das Spiel endet, wenn 5 Leben verloren sind!",
        understood: "Verstanden!",

        // Einstellungen
        settingsTitle: "Einstellungen",
        languageLabel: "Sprache",
        soundLabel: "Ton",
        vibrationLabel: "Vibration",
        close: "Schließen",
 // YENİ: Kullanıcı Adı Çevirileri
        username: "Benutzername",
        save: "Speichern",
        usernamePlaceholder: "Geben Sie Ihren neuen Benutzernamen ein",
        usernameUpdated: "Ihr Benutzername wurde aktualisiert!",
        usernameTaken: "Dieser Benutzername ist bereits vergeben. Bitte wählen Sie einen anderen.",
        usernameInvalid: "Der Benutzername muss zwischen 3 und 15 Zeichen lang sein und darf keine Sonderzeichen enthalten.",
        defaultPlayerName: "Spieler", // Für automatisch erstellte Namen

        // QR Modal
        downloadTitle: "Im Play Store teilen",
        downloadDesc: "Teile das Spiel mit deinen Freunden und spielt zusammen!",
        mobileTitle: "Google Play Store",
        mobileDesc: "Wenn das Spiel im Play Store veröffentlicht wird, kannst du es von hier teilen!",
        manualTitle: "Link teilen",
        manualDesc: "Teile diesen Link mit deinen Freunden",
        copy: "Kopieren",
        shareTitle: "Mit Freunden teilen",

        // Pause
        pauseTitle: "Spiel pausiert",
        pauseDesc: "Drücke den Button, wenn du weitermachen möchtest!",
        currentScore: "Aktuelle Punkte",
        remainingLives: "Verbleibende Leben",
        lives: "Verbleibende Leben",
        resume: "Fortsetzen",
        restart: "Neustart",
        mainMenu: "Hauptmenü",

        // Spielende
        gameOver: "Spiel vorbei!",
        finalScore: "Endpunkte",
        bestCombo: "Beste Combo",
        finalLevel: "Level",
        bubblesPopped: "Geplatzte Blasen",
        newRecord: "NEUER REKORD!",
        playAgain: "Nochmal spielen",
        shareScore: "Punkte teilen",
        backToMenu: "Hauptmenü",

        // Power-ups & Energie
        freeze: "Einfrieren",
        double: "2x Punkte",
        magnet: "Magnet",
        auto: "Auto",
        energyRefill: "Energie auffüllen",
        watchAd: "Werbung ansehen",
        energyFull: "Energie voll!",
        energyEmpty: "Deine Energie ist leer! Möchtest du eine Werbung ansehen, um sie wieder aufzufüllen?",
        increasedMsg: "{TIP}-Power-up +1!",
        // Laden
        loadingTip: "Tippe auf Blasen, um Punkte zu sammeln!",
        achievementLevel: 'Level {N}!',
        achievementLevelDesc: 'Glückwunsch! Du hast Level {N} erreicht!',
        leaderboardTitle: "🏆 Bestenliste",
        leaderboardPlayerRank: "🎯 Dein Platz: #{RANK} (Punkte: {SCORE})",
        leaderboardNoRank: "🎯 Du bist noch nicht auf der Bestenliste. Spiele, um dich zu platzieren!",
        leaderboardTopPlayers: "Top 10 Spieler:"
    },
    fr: {
        // Menu principal
        title: "BUBBLE POP MANIA",
        subtitle: "Des millions sont accros à ce jeu!",
        play: "JOUER",
        tutorial: "Comment jouer",
        downloadMobile: "Partager sur Play Store",
        achievements: "Succès",
        settings: "Paramètres",

        // Stats
        dailyStreak: "Série quotidienne",
        days: "Jour",
        energy: "Énergie",
        highScore: "Meilleur score",
        totalGames: "Parties totales",

        // HUD du jeu
        score: "Score",
        combo: "Combo",
        level: "Niveau",
        pauseScoreLabel: "Score actuel",
          pauseComboLabel: "Combo",
          pauseLivesLabel: "Vies restantes",

        // Tutoriel
        tutorialTitle: "Comment jouer ?",
        popTitle: "Éclater les bulles",
        popDesc: "Appuyez sur les bulles pour les faire éclater et gagner des points !",
        colorTitle: "Points colorés",
        colorDesc: "• Bleu : 1 point • Vert : 2 points • Rouge : 5 points • Or : 10 points • Diamant : 50 points",
        comboTitle: "Système de combo",
        comboDesc: "Éclatez les bulles consécutivement pour faire des combos et gagner plus de points !",
        warningTitle: "Attention",
        warningDesc: "Si les bulles s'échappent vers le haut, vous perdez des vies. Le jeu se termine quand 5 vies sont perdues !",
        understood: "Compris !",

        // Paramètres
        settingsTitle: "Paramètres",
        languageLabel: "Langue",
        soundLabel: "Son",
        vibrationLabel: "Vibration",
        close: "Fermer",

        username: "Nom d'utilisateur",
        save: "Enregistrer",
        usernamePlaceholder: "Entrez votre nouveau nom d'utilisateur",
        usernameUpdated: "Votre nom d'utilisateur a été mis à jour !",
        usernameTaken: "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
        usernameInvalid: "Le nom d'utilisateur doit comporter entre 3 et 15 caractères et ne pas contenir de caractères spéciaux.",
        defaultPlayerName: "Joueur", // Pour les noms générés automatiquement

        // QR Modal
        downloadTitle: "Partager sur Play Store",
        downloadDesc: "Partagez le jeu avec vos amis ve jouez ensemble !",
        mobileTitle: "Google Play Store",
        mobileDesc: "Quand le jeu sera publié sur Play Store, vous pourrez le partager d'ici !",
        manualTitle: "Partager le lien",
        manualDesc: "Partagez ce lien avec vos amis",
        copy: "Copier",
        shareTitle: "Partager avec des amis",

        // Pause
        pauseTitle: "Jeu en pause",
        pauseDesc: "Appuyez sur le bouton quand vous voulez continuer !",
        currentScore: "Score actuel",
        remainingLives: "Vies restantes",
        lives: "Vies restantes",
        resume: "Reprendre",
        restart: "Redémarrer",
        mainMenu: "Menu principal",

        // Fin du jeu
        gameOver: "Jeu terminé !",
        finalScore: "Score final",
        bestCombo: "Meilleur combo",
        finalLevel: "Niveau",
        bubblesPopped: "Bulles éclatées",
        newRecord: "NOUVEAU RECORD !",
        playAgain: "Rejouer",
        shareScore: "Partager le score",
        backToMenu: "Menu principal",

        // Power-ups & énergie
        freeze: "Geler",
        double: "2x Points",
        magnet: "Aimant",
        auto: "Auto",
        energyRefill: "Recharger l'énergie",
        watchAd: "Regarder une pub",
        energyFull: "Énergie pleine !",
        energyEmpty: "Votre énergie est épuisée ! Voulez-vous regarder une annonce pour la recharger ?",
        increasedMsg: "Power-up {TIP} +1 !",

        // Chargement
        loadingTip: "Appuyez sur les bulles pour gagner des points !",
        achievementLevel: 'Niveau {N}!',
        achievementLevelDesc: "Félicitations ! Vous avez atteint le niveau {N} !",
        leaderboardTitle: "🏆 Classement",
        leaderboardPlayerRank: "🎯 Ton rang : #{RANK} (Score : {SCORE})",
        leaderboardNoRank: "🎯 Tu n'es pas encore dans le classement. Joue pour entrer dans le classement !",
        leaderboardTopPlayers: "Top 10 joueurs:"

    },
    es: {
        // Menú principal
        title: "BUBBLE POP MANIA",
        subtitle: "¡Millones son adictos a este juego!",
        play: "JUGAR",
        tutorial: "Cómo jugar",
        downloadMobile: "Compartir en Play Store",
        achievements: "Logros",
        settings: "Configuración",

        // Estadísticas
        dailyStreak: "Racha diaria",
        days: "Día",
        energy: "Energía",
        highScore: "Puntuación máxima",
        totalGames: "Partidas totales",

        // HUD del juego
        score: "Puntuación",
        combo: "Combo",
        level: "Nivel",
        pauseScoreLabel: "Puntuación Actual",
          pauseComboLabel: "Combo",
          pauseLivesLabel: "Vidas Restantes",

        // Tutorial
        tutorialTitle: "¿Cómo jugar?",
        popTitle: "Explotar burbujas",
        popDesc: "¡Toca las burbujas para explotarlas y ganar puntos!",
        colorTitle: "Puntos de colores",
        colorDesc: "• Azul: 1 punto • Verde: 2 puntos • Rojo: 5 puntos • Oro: 10 puntos • Diamante: 50 puntos",
        comboTitle: "Sistema de combo",
        comboDesc: "¡Explota burbujas consecutivamente para hacer combos y ganar más puntos!",
        warningTitle: "Advertencia",
        warningDesc: "¡Si las burbujas se escapan hacia arriba, pierdes vidas. El juego termina cuando se pierden 5 vidas!",
        understood: "¡Entendido!",

        // Configuración
        settingsTitle: "Configuración",
        languageLabel: "Idioma",
        soundLabel: "Sonido",
        vibrationLabel: "Vibración",
        close: "Cerrar",

        // NUEVO: Traducciones de nombre de usuario
        username: "Nombre de usuario",
        save: "Guardar",
        usernamePlaceholder: "Ingrese su nuevo nombre de usuario",
        usernameUpdated: "¡Tu nombre de usuario ha sido actualizado!",
        usernameTaken: "Este nombre de usuario ya está en uso. Prueba con otro.",
        usernameInvalid: "El nombre de usuario debe tener entre 3 y 15 caracteres y no contener caracteres especiales.",
        defaultPlayerName: "Jugador", // Para nombres generados automáticamente

        // QR Modal
        downloadTitle: "Compartir en Play Store",
        downloadDesc: "¡Comparte el juego con tus amigos y jueguen juntos!",
        mobileTitle: "Google Play Store",
        mobileDesc: "¡Cuando el juego se publique en Play Store, podrás compartirlo desde aquí!",
        manualTitle: "Compartir enlace",
        manualDesc: "Comparte este enlace con tus amigos",
        copy: "Copiar",
        shareTitle: "Compartir con amigos",

        // Pausa
        pauseTitle: "Juego pausado",
        pauseDesc: "¡Presiona el botón cuando quieras continuar!",
        currentScore: "Puntuación actual",
        remainingLives: "Vidas restantes",
        resume: "Reanudar",
        restart: "Reiniciar",
        mainMenu: "Menú principal",

        // Fin del juego
        gameOver: "¡Juego terminado!",
        finalScore: "Puntuación final",
        bestCombo: "Mejor combo",
        finalLevel: "Nivel",
        bubblesPopped: "Burbujas explotadas",
        newRecord: "¡NUEVO RÉCORD!",
        playAgain: "Jugar de nuevo",
        shareScore: "Compartir puntuación",
        backToMenu: "Menú principal",

        // Power-ups & Energía
        freeze: "Congelar",
        double: "2x Puntos",
        magnet: "Imán",
        auto: "Auto",
        energyRefill: "Rellenar energía",
        watchAd: "Ver anuncio",
        energyFull: "¡Energía llena!",
        energyEmpty: "¡Tu energía se ha agotado! ¿Quieres ver un anuncio para recargarla?",
        increasedMsg: "¡Power-up {TIP} +1!",

        // Cargando
        loadingTip: "¡Toca las burbujas para ganar puntos!",

        autoIncreased: "¡Auto power-up +1!",
          magnetIncreased: "¡Imán power-up +1!",
          doubleIncreased: "¡Doble puntos +1!",
          freezeIncreased: "¡Congelar power-up +1!",
          currentScore: "Puntuación Actual",
          combo: "Combo",
          lives: "Vidas Restantes",
          pause: "Pausado",

        achievementLevel: '¡Nivel {N}!',
        achievementLevelDesc: '¡Felicidades! ¡Has alcanzado el nivel {N}!',
        leaderboardTitle: "🏆 Tabla de líderes",
        leaderboardPlayerRank: "🎯 Tu puesto: #{RANK} (Puntuación: {SCORE})",
        leaderboardNoRank: "🎯 Aún no estás en la tabla de líderes. ¡Juega para entrar en el ranking!",
        leaderboardTopPlayers: "Los 10 mejores jugadores:"
    }
    // Diğer dilleri de ekleyebiliriz (Almanca, Fransızca, İspanyolca...)
};

// Dil yönetimi
let CURRENT_LANG = localStorage.getItem('gameLang') || 'tr';

// Ses ve titreşim ayarları
let SOUND_ENABLED = localStorage.getItem('soundEnabled') !== 'false';
let VIBRATION_ENABLED = localStorage.getItem('vibrationEnabled') !== 'false';

// Ses dosyaları
const SOUNDS = {
    pop: null,
    combo: null,
    levelUp: null,
    gameOver: null,
    powerUp: null
};

// Ses yükleme fonksiyonu
// Global AudioContext sadece bir kere oluşsun
let globalAudioContext = null;
let lastBeepTime = 0;

// Ses yükleme fonksiyonu, oyun başında çağırın!
function loadSounds() {
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        try {
            // Basit beep sesler oluştur (telif-free)
            SOUNDS.pop = createBeepSound(800, 0.1, 'sine');
            SOUNDS.combo = createBeepSound(1200, 0.15, 'triangle');
            SOUNDS.levelUp = createBeepSound([523, 659, 784], 0.3, 'sine');
            SOUNDS.gameOver = createBeepSound([400, 300, 200], 0.5, 'sine');
            SOUNDS.powerUp = createBeepSound([600, 800, 1000], 0.2, 'square');
        } catch (error) {
            console.log('Ses sistemi yüklenemedi:', error);
        }
    }
}

// Performansı artırılmış ve throttle'lı, tam cleanup yapan beep fonksiyonu
function createBeepSound(frequency, duration, type = 'sine') {
    return {
        play() {
            if (!SOUND_ENABLED) return;

            // Çok hızlı tetiklenen sesleri engelle (minimum 70ms arayla)
            const now = Date.now();
            if (now - lastBeepTime < 70) return;
            lastBeepTime = now;

            try {
                if (!globalAudioContext || globalAudioContext.state === 'closed') {
                    globalAudioContext = new (window.AudioContext || window.webkitAudioContext)();
                }
                const audioContext = globalAudioContext;

                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                if (Array.isArray(frequency)) {
                    // Çoklu frekans (melodi)
                    const noteTime = duration / frequency.length;
                    frequency.forEach((freq, index) => {
                        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * noteTime);
                    });
                } else {
                    oscillator.frequency.value = frequency;
                }

                oscillator.type = type;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);

                oscillator.onended = () => {
                    try { oscillator.disconnect(); gainNode.disconnect(); } catch (e) {}
                };
            } catch (error) {
                console.log('Ses çalma hatası:', error);
            }
        }
    };
}


// Titreşim fonksiyonu
function vibrate(pattern = 50) {
    if (!VIBRATION_ENABLED) return;
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
}

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

    // Settings (Ayarlar bölümüne ait olanlar)
    setText('settings-title', LANG.settingsTitle);
    setText('language-label', LANG.languageLabel);
    setText('sound-label', LANG.soundLabel);
    setText('vibration-label', LANG.vibrationLabel);

    // YENİ EKLENEN KISIM: Kullanıcı Adı Ayarları
    setText('username-label', LANG.username);
    const usernameInput = document.getElementById('username-input');
    if (usernameInput) usernameInput.placeholder = LANG.usernamePlaceholder;
    setText('save-username-btn', LANG.save);
    // Dil değiştiğinde durum mesajını temizle (isteğe bağlı)
    setText('username-status', '');

    // Settings'in kapatma butonu
    setText('settings-close', LANG.close);

// ... updateLanguageTexts() fonksiyonunuzun sonu ...


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
    setText('pause-score-label', LANG.pauseScoreLabel);
    setText('pause-combo-label', LANG.pauseComboLabel);
    setText('pause-lives-label', LANG.pauseLivesLabel);

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
    setText('energy-refill-btn', LANG.energyRefill);

    // Loading
    setText('loading-tip', LANG.loadingTip);

    // Liderlik Tablosu
    setText('leaderboard-title', LANG.leaderboardTitle);
    setText('leaderboard-close-btn', LANG.close);

    console.log('Dil güncellendi:', CURRENT_LANG);
}

async function initFirebase() {
    return new Promise(resolve => {
        // Firebase uygulamasını başlat (eğer zaten başlatılmamışsa)
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log('Firebase uygulaması başlatıldı.');
        }
        // Kullanıcının kimlik doğrulama durumunu dinle
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe(); // Tek kullanımlık dinleyici için unsubscribe
            if (user) {
                console.log("✅ Firebase Auth: Kullanıcı başarıyla oturum açmış:", user.uid);
                isFirebaseReady = true; // Global ready durumunu ayarla
                resolve(true); // Firebase hazır ve kullanıcı oturum açmış
            } else {
                console.log("🔄 Firebase Auth: Kullanıcı oturum açmamış. Anonim oturum açma deneniyor...");
                firebase.auth().signInAnonymously()
                    .then(() => {
                        // Anonim oturum açma başarılı olduğunda, onAuthStateChanged tekrar tetiklenecek
                        // ve yukarıdaki 'if (user)' bloğu çalışıp resolve(true) çağıracaktır.
                        // Bu nedenle burada resolve(true) çağırmaya gerek yok.
                        console.log("✅ Firebase Auth: Anonim kullanıcı başarıyla oturum açtı!");
                    })
                    .catch(error => {
                        console.error("🔥 Firebase Auth: Anonim oturum açma hatası:", error);
                        isFirebaseReady = false; // Hata durumunda Firebase hazır değil
                        resolve(false); // Hata durumunda Promise'ı false ile çöz
                    });
            }
        });
    });
}

// === FIREBASE GLOBAL LEADERBOARD HELPER FUNCTION (FIRESTORE) ===
async function getGlobalLeaderboard(callback) {
  const ready = await initFirebase(); // <-- Bu çağrı, artık app.js'nin başındaki initFirebase() fonksiyonunu kullanır.
  if (!ready || typeof firebase === 'undefined' || !firebase.firestore) {
    const local = JSON.parse(localStorage.getItem('globalLeaderboard') || '[]');
    callback(local);
    return;
  }
  try {
    const usersRef = firebase.firestore().collection('Users');
    const snapshot = await usersRef.orderBy('highScore', 'desc').limit(100).get();
    const result = snapshot.docs.map(doc => {
      const d = doc.data() || {};
      const hs = (typeof d.highScore === 'number') ? d.highScore : 0;
      const lvl = (typeof d.level === 'number') ? d.level : 1;
      const pid = d.playerId || doc.id;
      const ts = (typeof d.timestamp === 'number') ? d.timestamp : null;
      // Oyuncunun ismini al, eğer yoksa "Anonim" olarak bir isim ata
      const name = d.name || `Anonim${(pid || '0000').substring(pid.length - 4)}`;

      // Görüntüleme için 'score' alanına 'highScore' değerini ve 'name' alanını ekle
      return { playerId: pid, score: hs, highScore: hs, level: lvl, timestamp: ts, name: name };
    });
    callback(result);
  } catch (error) {
    console.error('Firestore okuma hatası:', error);
    const local = JSON.parse(localStorage.getItem('globalLeaderboard') || '[]');
    callback(local);
  }
}


class BubblePopGame {
    constructor() {
        // Temel oyun durumu
        this.gameState = 'loading';
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
        this.combo = 1;
        this.maxCombo = 1;
        this.level = 1;
        this.lives = 5;
        this.totalGames = parseInt(localStorage.getItem('totalGames')) || 0;
        this.bubblesPopped = 0;
        // YENİ: Oyuncu adını buradan başlatıyoruz
        this.playerName = localStorage.getItem('playerName') || GAME_LANGUAGES[CURRENT_LANG].defaultPlayerName + (Math.floor(Math.random() * 10000));
        // Enerji sistemi
        this.energy = parseInt(localStorage.getItem('energy')) || 5;
        this.maxEnergy = 5;
        this.lastEnergyTime = parseInt(localStorage.getItem('lastEnergyTime')) || Date.now();

        // Global leaderboard (localStorage yedeği - Firebase için geçici)
        this.globalLeaderboard = JSON.parse(localStorage.getItem('globalLeaderboard')) || [];

        // Achievement timeout için
        this.achievementTimeout = null;
        this.isAchievementShowing = false;

        // Power-up kullanım hakları
        this.powerUpUses = {
            freeze: 1,
            double: 1,
            magnet: 1,
            auto: 1
        };

        // Seviye sistemi - DÜZELTİLME: Seviye 9+ sorunu çözüldü
        this.levelSettings = {
            1: { speedMultiplier: 1.0, spawnDelay: 2800, maxBubbles: 5, rareChance: 0.1, pointsRequired: 100 },
            2: { speedMultiplier: 1.2, spawnDelay: 2500, maxBubbles: 6, rareChance: 0.15, pointsRequired: 250 },
            3: { speedMultiplier: 1.4, spawnDelay: 2200, maxBubbles: 7, rareChance: 0.2, pointsRequired: 500 },
            4: { speedMultiplier: 1.6, spawnDelay: 1900, maxBubbles: 8, rareChance: 0.25, pointsRequired: 800 },
            5: { speedMultiplier: 1.8, spawnDelay: 1600, maxBubbles: 9, rareChance: 0.3, pointsRequired: 1200 },
            6: { speedMultiplier: 2.0, spawnDelay: 1400, maxBubbles: 10, rareChance: 0.35, pointsRequired: 1700 },
            7: { speedMultiplier: 2.2, spawnDelay: 1200, maxBubbles: 11, rareChance: 0.4, pointsRequired: 2300 },
            8: { speedMultiplier: 2.4, spawnDelay: 1000, maxBubbles: 12, rareChance: 0.45, pointsRequired: 3000 },
            9: { speedMultiplier: 2.6, spawnDelay: 900, maxBubbles: 13, rareChance: 0.5, pointsRequired: 4000 },
            10: { speedMultiplier: 2.8, spawnDelay: 800, maxBubbles: 14, rareChance: 0.55, pointsRequired: 5500 }
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
        this.spawnDelay = Math.max(350, 2800 - (this.level - 1) * 250);

        // Balon tipleri
        this.bubbleTypes = [
            { color: '#3B82F6', points: 1, name: 'Mavi', frequency: 45 },
            { color: '#10B981', points: 2, name: 'Yeşil', frequency: 30 },
            { color: '#EF4444', points: 5, name: 'Kırmızı', frequency: 15 },
            { color: '#F59E0B', points: 10, name: 'Altın', frequency: 8 },
            { color: '#8B5CF6', points: 50, name: 'Elmas', frequency: 2 }
        ];

        // Power-up balon tipleri
        this.powerUpBubbleTypes = [
            { type: 'freeze', color: '#00BFFF', emoji: '❄️', frequency: 25 },
            { type: 'double', color: '#FFD700', emoji: '⭐', frequency: 25 },
            { type: 'magnet', color: '#FF6B6B', emoji: '🧲', frequency: 25 },
            { type: 'auto', color: '#90EE90', emoji: '🤖', frequency: 25 }
        ];

        this.init();
    }

    init() {
        console.log('🎮 Bubble Pop Mania - Güzel çalışır Versiyon başlatılıyor...');
        this.showLoadingScreen();
        this.forceHideAchievement();

        // Ses sistemi başlat
        loadSounds();

            this.setupCanvas();
            this.setupEventListeners();
            this.updateEnergySystem();
            this.updateUI();
            this.showMainMenu();
            console.log('🎮 Oyun hazır - çoklu dil sistemi güzel görünüm aktif!');

    }

    // Enerji sistemi
    updateEnergySystem() {
        const now = Date.now();
        const timePassed = now - this.lastEnergyTime;
        const energyToAdd = Math.floor(timePassed / (5 * 60 * 1000)); // 5 dakika = 1 enerji

        if (energyToAdd > 0) {
            this.energy = Math.min(this.maxEnergy, this.energy + energyToAdd);
            this.lastEnergyTime = now;
            this.saveEnergyData();
        }
    }

    saveEnergyData() {
        localStorage.setItem('energy', this.energy.toString());
        localStorage.setItem('lastEnergyTime', this.lastEnergyTime.toString());
    }

    refillEnergyWithAd() {
        const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;

        // Enerji zaten doluysa
        if (this.energy >= this.maxEnergy) {
            alert(LANG.energyFull);
            return;
        }

        // Android arayüzü varsa
        if (window.AndroidInterface && window.AndroidInterface.showRewardedAd) {
            // Alert'i göster, OK'e bastıktan sonra reklamı 0.5 sn geciktirerek başlat
            const confirmWatch = confirm(LANG.energyEmpty || "Enerjin bitti! Reklam izleyip doldurmak ister misin?");
            if (confirmWatch) {
                console.log('🎬 Reklam başlatılıyor...');
                setTimeout(() => {
                    try {
                        window.AndroidInterface.showRewardedAd();
                        console.log('Enerji için reklam gösteriliyor...');
                    } catch (err) {
                        console.error('⚠️ showRewardedAd çağrısında hata:', err);
                        alert("Reklam başlatılamadı, lütfen tekrar deneyin.");
                    }
                }, 400);
            } else {
                console.log('Kullanıcı reklam izlemeyi iptal etti.');
            }
        }
        // Android dışı simülasyon (web için)
        else {
            this.energy = this.maxEnergy;
            this.lastEnergyTime = Date.now();
            this.saveEnergyData();
            this.updateUI();
            console.log('Enerji dolduruldu (simülasyon)');
        }
    }

     // BubblePopGame sınıfının içinde bir yerlerde
     getOrCreatePlayerId() {
         const currentUser = (firebase && firebase.auth && firebase.auth().currentUser) ? firebase.auth().currentUser : null;
         if (currentUser && currentUser.uid) {
             // Her zaman aktif Firebase kimliği doğrulanmış kullanıcının UID'sini önceliklendir.
             // Bu, localStorage'da eski bir local_ID olsa bile gerçek UID'yi kullanmamızı sağlar.
             localStorage.setItem('playerId', currentUser.uid); // localStorage'ı da güncel tut.
             console.log("getOrCreatePlayerId: Aktif Firebase UID:", currentUser.uid);
             return currentUser.uid;
         } else {
             // Aktif bir Firebase kullanıcısı yoksa (henüz oturum açılmamış veya Auth başarısız)
             // localStorage'daki ID'ye geri dön.
             let playerId = localStorage.getItem('playerId');
             if (playerId && !playerId.startsWith('local_')) {
                 // Daha önce kaydedilmiş bir Firebase UID varsa, onu kullan.
                 // Bu, kullanıcının internet bağlantısı kesilirse bile önceki gerçek ID'sini kullanmaya devam etmesini sağlar.
                 console.log("getOrCreatePlayerId: localStorage'dan Firebase UID (geçerli Auth yok):", playerId);
                 return playerId;
             } else if (playerId && playerId.startsWith('local_')) {
                 // Eğer localStorage'da bir 'local_' ID varsa, onu döndür.
                 console.log("getOrCreatePlayerId: localStorage'dan Yerel ID:", playerId);
                 return playerId;
             } else {
                 // Ne aktif bir Firebase kullanıcısı ne de kaydedilmiş bir ID varsa, yeni bir yerel ID oluştur.
                 const randomSuffix = Math.floor(Math.random() * 100000);
                 playerId = `local_${Date.now()}_${randomSuffix}`;
                 localStorage.setItem('playerId', playerId);
                 console.log("getOrCreatePlayerId: Yeni Yerel ID oluşturuldu:", playerId);
                 return playerId;
             }
         }
     }


    async syncWithFirebase() {
        console.log(`syncWithFirebase başlatıldı: isFirebaseReady=${isFirebaseReady}, firebase.firestore=${!!firebase.firestore}`);
        if (!isFirebaseReady || !firebase.firestore) {
            console.log('syncWithFirebase: Firebase senkronizasyonu için hazır değil veya Firestore mevcut değil.');
            return;
        }
        const playerId = this.getOrCreatePlayerId();
        console.log(`syncWithFirebase: getOrCreatePlayerId tarafından dönen playerId=${playerId}`);
        // Sadece gerçek (non-local) Firebase UID'si varsa senkronizasyon yap
        if (playerId && !playerId.startsWith('local_')) {
            try {
                const docRef = firebase.firestore().collection('Users').doc(playerId);
                console.log(`syncWithFirebase: Firestore'dan belge okunuyor: Users/${playerId}`);
                const doc = await docRef.get();
                if (doc.exists) {
                    const onlineData = doc.data();
                    const onlineHighScore = onlineData.highScore || 0;

                    // Eğer online'daki skor, lokaldekinden yüksekse, lokali güncelle
                    if (onlineHighScore > this.highScore) {
                        console.log(`☁️ Online skor (${onlineHighScore}) lokal skordan (${this.highScore}) yüksek. Güncelleniyor.`);
                        this.highScore = onlineHighScore;
                        localStorage.setItem('highScore', this.highScore.toString());
                        this.updateUI(); // Arayüzü yeni skorla güncelle
                    } else {
                        console.log('☁️ Lokal skor güncel. Senkronizasyona gerek yok.');
                    }
                }
            } catch (error) {
                            console.error('🔥 Firebase senkronizasyon hatası:', error);
                        }
                    } else {
                        console.log('syncWithFirebase: Yerel ID kullanıldığı için Firestore senkronizasyonu atlandı.');
                              }
                }


        async updateGlobalLeaderboard() {
            const playerId = this.getOrCreatePlayerId();
            console.log(`updateGlobalLeaderboard başlatıldı: isFirebaseReady=${isFirebaseReady}, current playerId=${playerId}`);
            if (!isFirebaseReady || !firebase.firestore) {
                console.log('updateGlobalLeaderboard: Firebase hazır değil veya Firestore mevcut değil, skor lokal olarak güncellendi.');
                this.updateLocalLeaderboard({
                    highScore: this.highScore,
                    score: this.score,
                    level: this.level,
                    timestamp: Date.now(),
                    playerId: playerId
                });
                return;
            }
            const db = firebase.firestore();
            const userRef = db.collection('Users').doc(playerId);
            console.log(`updateGlobalLeaderboard: Firestore'a yazılıyor: Users/${playerId}`);
            try {
                const doc = await userRef.get();
                const existingData = doc.exists ? doc.data() : {};
                        const existingHigh = existingData.highScore || 0;
                        // playerName'i Firestore'dan çekmek yerine, this.playerName'i kullanıyoruz.
                        // Bu, kullanıcının en son belirlediği adı temsil eder.
                        const playerNameForFirestore = this.playerName;
                        // Eğer kullanıcının Firestore'da hala adı yoksa, varsayılan bir ad atayalım
                        // ve bu şekilde de kaydedelim. Bu sadece ilk kayıt için bir güvenlik önlemi.
                        if (!existingData.name && playerNameForFirestore.startsWith(GAME_LANGUAGES[CURRENT_LANG].defaultPlayerName)) {
                             const allUsersSnapshot = await db.collection('Users').get();
                             const playerCount = allUsersSnapshot.size || 0;
                             this.playerName = `${GAME_LANGUAGES[CURRENT_LANG].defaultPlayerName}${playerCount + 1}`;
                             localStorage.setItem('playerName', this.playerName);
                        }
                        const newHigh = Math.max(this.highScore, existingHigh);
                        const playerData = {
                            highScore: newHigh,
                            score: this.score,
                            level: this.level,
                            timestamp: Date.now(),
                            playerId: playerId, // Firebase UID'si
                            name: this.playerName // Kullanıcının seçtiği veya varsayılan ad

                        };
                        await userRef.set(playerData, { merge: true });
                        console.log(`☁️ Firestore güncellendi: ${this.playerName} (${newHigh} puan)`);
                    } catch (error) {
                        console.error('🔥 Firestore yazma hatası:', error);
                    }
        }


    // BubblePopGame sınıfının içinde bir yerlerde
    async loadPlayerNameFromFirestore() {
        if (!isFirebaseReady || !firebase.firestore) {
            console.warn('Firebase hazır değil, Firestore\'dan isim yüklenemiyor.');
            return;
        }
        const playerId = this.getOrCreatePlayerId();
        if (playerId.startsWith('local_')) {
            console.warn('Yerel ID kullanılıyor, Firestore\'dan isim yüklenemiyor.');
            return;
        }

        try {
            const userRef = firebase.firestore().collection('Users').doc(playerId);
            const doc = await userRef.get();
            if (doc.exists && doc.data().name) {
                this.playerName = doc.data().name;
                localStorage.setItem('playerName', this.playerName); // Lokal de güncelle
                console.log('☁️ Firestore\'dan oyuncu adı yüklendi:', this.playerName);
            } else {
                console.log('☁️ Firestore\'da oyuncu adı bulunamadı. Varsayılan ad kullanılacak.');
                // Eğer Firestore'da isim yoksa ama user id var, varsayılan bir isimle Firestore'a yazabiliriz
                // VEYA kullanıcıdan ayarlar ekranında girmesini bekleyebiliriz.
                // Şimdilik varsayılan isimle devam edelim ve kullanıcı adı girmezse o isimle kalır.
            }
            this.updateUI(); // Ana menüdeki adı güncellemek için
        } catch (error) {
            console.error('🔥 Firestore\'dan oyuncu adı yükleme hatası:', error);
        }
    }

    // BubblePopGame sınıfının içinde bir yerlerde
    async savePlayerName(newName) {
        const usernameStatusEl = document.getElementById('username-status');
        const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;

        // Firebase hazır mı kontrolü
        if (!isFirebaseReady || !firebase.firestore) {
            usernameStatusEl.textContent = 'Firebase senkronizasyonu için hazır değil.';
            usernameStatusEl.style.color = 'red';
            return false;
        }

         // Anonim kullanıcı kontrolü
         const playerId = this.getOrCreatePlayerId();
         if (!isFirebaseReady || playerId.startsWith('local_')) {
             usernameStatusEl.textContent = 'Firebase henüz hazır değil veya kimlik doğrulanamadı. Lütfen bekleyin veya uygulamayı yeniden başlatın.';
             usernameStatusEl.style.color = 'orange';
             return false;
         }


        const trimmedName = newName.trim();
        // Basit validasyon: 3-15 karakter, sadece harf, rakam ve boşluk
        const nameRegex = /^[a-zA-Z0-9 ]{3,15}$/;

        if (!nameRegex.test(trimmedName)) {
            usernameStatusEl.textContent = LANG.usernameInvalid;
            usernameStatusEl.style.color = 'red';
            return false;
        }

        try {
            const usersRef = firebase.firestore().collection('Users');
            // Kullanıcı adının benzersizliğini kontrol et (Kendi adını değiştirebilir)
            const querySnapshot = await usersRef.where('name', '==', trimmedName).limit(1).get();

            // Eğer aynı isimde başka bir kullanıcı varsa VE bu kullanıcının ID'si benim ID'm değilse
            if (!querySnapshot.empty && querySnapshot.docs[0].id !== playerId) {
                usernameStatusEl.textContent = LANG.usernameTaken;
                usernameStatusEl.style.color = 'red';
                return false;
            }

            // Kullanıcı adını Firestore'a kaydet
            const userRef = usersRef.doc(playerId);
            await userRef.set({ name: trimmedName }, { merge: true }); // Belge yoksa oluştur, varsa sadece 'name' alanını güncelle
            this.playerName = trimmedName;

            localStorage.setItem('playerName', this.playerName);
            usernameStatusEl.textContent = LANG.usernameUpdated;
            usernameStatusEl.style.color = 'green';
            this.updateUI(); // Ana menüdeki adı güncelle

            console.log('☁️ Kullanıcı adı kaydedildi:', this.playerName);
            return true;
        } catch (error) {
            console.error('🔥 Kullanıcı adı kaydetme hatası:', error);
            usernameStatusEl.textContent = `Hata: ${error.message}`;
            usernameStatusEl.style.color = 'red';
            return false;
        } finally {
            // Bir süre sonra mesajı temizle
            setTimeout(() => {
                if (usernameStatusEl.textContent === LANG.usernameUpdated || usernameStatusEl.textContent === LANG.usernameTaken || usernameStatusEl.textContent.startsWith('Hata:')) {
                    usernameStatusEl.textContent = '';
                }
            }, 5000);
        }
    }


    // Yedek localStorage sistemi (Firebase yoksa)
    // === LOKAL YEDEK ===
    updateLocalLeaderboard(playerData) {
      const idx = this.globalLeaderboard.findIndex(p => p.playerId === playerData.playerId);
      if (idx >= 0) {
        if ((playerData.highScore ?? 0) > (this.globalLeaderboard[idx].highScore ?? 0)) {
          this.globalLeaderboard[idx] = playerData;
        }
      } else {
        this.globalLeaderboard.push(playerData);
      }
      this.globalLeaderboard.sort((a, b) => (b.highScore ?? 0) - (a.highScore ?? 0)); // highScore’a göre sırala
      this.globalLeaderboard = this.globalLeaderboard.slice(0, 100);
      localStorage.setItem('globalLeaderboard', JSON.stringify(this.globalLeaderboard));
    }

   async showGlobalLeaderboard() {
       const myPlayerId = this.getOrCreatePlayerId();
       console.log(`showGlobalLeaderboard başlatıldı: isFirebaseReady=${isFirebaseReady}, myPlayerId=${myPlayerId}`);

       // Eğer Firebase hazır değilse lokal fallback kullan
       if (!isFirebaseReady || !firebase || !firebase.firestore) {
           console.warn('⚠️ showGlobalLeaderboard: Firebase hazır değil veya Firestore mevcut değil, lokal leaderboard kullanılacak.');
           const localData = JSON.parse(localStorage.getItem('globalLeaderboard') || '[]');
           this.renderLeaderboard(localData, myPlayerId, GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr);
           return;
       }

       const db = firebase.firestore();
       const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;

       try {
           console.log('showGlobalLeaderboard: Firestore liderlik tablosu okunuyor...');
           // Firestore: Users koleksiyonundan highScore'a göre en yüksek 10
           const snapshot = await db.collection('Users').orderBy('highScore', 'desc').limit(10).get();

           const players = [];
           snapshot.forEach((doc) => {
               const data = doc.data() || {};
               players.push({
                   playerId: data.playerId || doc.id,
                   name: data.name || (LANG.defaultPlayerName + (data.playerId || doc.id).slice(-4)),
                   score: (typeof data.highScore === 'number') ? data.highScore : (Number(data.highScore) || Number(data.score) || 0),
                   level: data.level || 1
               });
           });

           // Eğer snapshot boşsa local fallback
           if (players.length === 0) {
               console.log('showGlobalLeaderboard: Firestore liderlik tablosu boş, lokal fallback.');
               const localData = JSON.parse(localStorage.getItem('globalLeaderboard') || '[]');
               this.renderLeaderboard(localData, myPlayerId, LANG);
           } else {
               console.log(`showGlobalLeaderboard: Firestore'dan ${players.length} oyuncu alındı.`);
               // players zaten orderBy ile gelmeli ama güvenlik için yine sort et
               players.sort((a, b) => b.score - a.score);
               this.renderLeaderboard(players, myPlayerId, LANG);
           }
       } catch (error) {
           console.error('🔥 Firestore leaderboard yükleme hatası:', error);
           const localData = JSON.parse(localStorage.getItem('globalLeaderboard') || '[]');
           this.renderLeaderboard(localData, myPlayerId, LANG);
       }
   }



   renderLeaderboard(players, myPlayerId, LANG) {
       console.log("renderLeaderboard: Gelen myPlayerId:", myPlayerId);
       console.log("renderLeaderboard: Liderlik tablosu oyuncuları:", players);

       const leaderboardContent = document.getElementById('leaderboard-content');
       const playerRankEl = document.getElementById('player-rank');

       if (!leaderboardContent) {
           console.warn('leaderboard-content element bulunamadı.');
           return;
       }

       leaderboardContent.innerHTML = '';

       // Başlık
       const title = document.createElement('p');
       title.textContent = (LANG && LANG.leaderboardTopPlayers) ? LANG.leaderboardTopPlayers : 'Top 10 Spieler:';
       leaderboardContent.appendChild(title);

       const ol = document.createElement('ol');
       ol.classList.add('leaderboard-list');
       // Locale format: Almanya nokta binlik ayıracı için 'de-DE'
       const nf = new Intl.NumberFormat('de-DE');
       players.slice(0, 10).forEach((player, index) => {
            const li = document.createElement('li');
            const rank = (index + 1) + '. ';
            const playerNameDisplay = player.name || (LANG.defaultPlayerName + (player.playerId || '').slice(-4));
            const name = playerNameDisplay + ' - ';
            const scoreStr = `${nf.format(player.score)} puan (Seviye ${player.level})`;
            li.textContent = rank + name + scoreStr;
            if (player.playerId === myPlayerId) {
                li.classList.add('highlight-player');
                console.log(`renderLeaderboard: Kendi oyuncu bulunup vurgulandı: ${myPlayerId}`);
            }
            ol.appendChild(li);
        });

       leaderboardContent.appendChild(ol);

       // Oyuncunun kendi sıralamasını göster
       if (playerRankEl) {
           const myData = players.find(p => p.playerId === myPlayerId);
           console.log("renderLeaderboard: Kendi oyuncu verisi (find sonrası):", myData);
           if (myData) {
               const myRank = players.findIndex(p => p.playerId === myPlayerId) + 1;
               playerRankEl.textContent = `🎯 ${LANG.leaderboardPlayerRank.replace('#{RANK}', myRank).replace('{SCORE}', myData.score.toLocaleString())}`;
           } else {
               playerRankEl.textContent = (LANG && LANG.leaderboardNoRank) ? LANG.leaderboardNoRank : 'Keine Platzierung';
           }
       }

       // Ekranı göster (senin app'deki mevcut showScreen methodunu çağırıyor)
       if (typeof this.showScreen === 'function') {
           this.showScreen('leaderboard-screen');
       }
   }



    // Seviye sistemi düzeltmeleri
    checkLevelUp() {
        // Kullanılacak puan kuralı:
        // Seviye < 10 için: mevcut sistemden
        // 10'dan sonrası: getRequiredScoreForNextLevel(level) fonksiyonuyla
        const requiredScore = this.getRequiredScoreForNextLevel(this.level);

        // Sonsuz seviye için: nextSettings ile sınır koyma!
        if (this.score >= requiredScore) {
            this.level++;
            this.levelUp();

            // Aynı anda çok seviye atladığında recursive kontrol
            // (Örn: arka arkaya müthiş puan gelirse birden fazla atlatacak)
            if (this.score >= this.getRequiredScoreForNextLevel(this.level)) {
                this.checkLevelUp();
            }
        }
    }

    // Mathematical progression for required score:
    getRequiredScoreForNextLevel(level) {
        const base = 170;           // Başlangıç puanı
        const growth = 1.88;        // Büyüme oranı — 1.80–2.05 arası daha zor/seviye atlaması zor!

        return Math.floor(base * Math.pow(level, growth));
    }

    levelUp() {
        const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;

        // Ses ve titreşim
        if (SOUNDS.levelUp) SOUNDS.levelUp.play();
        vibrate([100, 50, 100]);

        // Seviye ayarlarını güncelle
        const settings = this.levelSettings[this.level];
        if (settings) {
            this.spawnDelay = settings.spawnDelay;
        }
        // Arkaplan rengi değişimi
        if (this.canvas) {
            this.canvas.style.background = `linear-gradient(135deg, ${settings?.bgColor || '#87CEEB'}, ${settings?.bgColor || '#87CEEB'}dd)`;
        }

        this.updatePowerUpButtons();
       const levelText = LANG.achievementLevel.replace('{N}', this.level);
       const levelDesc = LANG.achievementLevelDesc.replace('{N}', this.level);
       this.showAchievement(levelText, levelDesc, this.level * 10);

        console.log(`🎯 Seviye ${this.level}! Spawn delay: ${this.spawnDelay}ms`);
    }

    showLoadingScreen() {
        this.gameState = 'loading';
        this.showScreen('loading-screen');
        this.forceHideAchievement();
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

            console.log(`🎨 Canvas hazırlandı: ${this.canvas.width} x ${this.canvas.height}`);
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
        if (achievementsBtn) achievementsBtn.addEventListener('click', () => this.showGlobalLeaderboard());
        if (settingsBtn) settingsBtn.addEventListener('click', () => this.showSettings());
        // YENİ EKLENEN KISIM: Kullanıcı Adı Kaydetme Butonu Dinleyicisi
        const saveUsernameBtn = document.getElementById('save-username-btn');
        const usernameInput = document.getElementById('username-input');
        if (saveUsernameBtn && usernameInput) {
            saveUsernameBtn.addEventListener('click', async () => {
                const newName = usernameInput.value;
                await this.savePlayerName(newName);
            });
        }

        // Settings - Ses ve titreşim kontrolleri
        const soundToggle = document.getElementById('sound-toggle');
        const vibrationToggle = document.getElementById('vibration-toggle');

        if (soundToggle) {
            soundToggle.checked = SOUND_ENABLED;
            soundToggle.addEventListener('change', (e) => {
                SOUND_ENABLED = e.target.checked;
                localStorage.setItem('soundEnabled', SOUND_ENABLED.toString());
                console.log('Ses:', SOUND_ENABLED ? 'Açık' : 'Kapalı');
            });
        }

        if (vibrationToggle) {
            vibrationToggle.checked = VIBRATION_ENABLED;
            vibrationToggle.addEventListener('change', (e) => {
                VIBRATION_ENABLED = e.target.checked;
                localStorage.setItem('vibrationEnabled', VIBRATION_ENABLED.toString());
                console.log('Titreşim:', VIBRATION_ENABLED ? 'Açık' : 'Kapalı');
            });
        }

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
                this.updateDailyStreak();
                console.log('Dil değiştirildi:', CURRENT_LANG);
            });
        }

        // Enerji doldurma butonu
        const energyRefillBtn = document.getElementById('energy-refill-btn');
        if (energyRefillBtn) {
            energyRefillBtn.addEventListener('click', () => this.refillEnergyWithAd());
        }

        // Diğer event listener'lar...
        this.setupGameEventListeners();
        this.setupCanvasEvents();
    }

    setupGameEventListeners() {
        // QR Modal
        const closeQrBtn = document.getElementById('close-qr-btn');
        const copyUrlBtn = document.getElementById('copy-url-btn');

        if (closeQrBtn) closeQrBtn.addEventListener('click', () => this.hideQRModal());
        if (copyUrlBtn) copyUrlBtn.addEventListener('click', () => this.copyGameURL());

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

        // Liderlik tablosu kapatma butonu
        const leaderboardCloseBtn = document.getElementById('leaderboard-close-btn');
        if (leaderboardCloseBtn) leaderboardCloseBtn.addEventListener('click', () => this.showMainMenu());
    }

    setupCanvasEvents() {
        if (this.canvas) {
            this.canvas.addEventListener('click', (e) => {
                this.handleCanvasClick(e);
                vibrate(30); // Hafif titreşim
            });

            this.canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const clickEvent = new MouseEvent('click', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                this.handleCanvasClick(clickEvent);
                vibrate(30); // Hafif titreşim
            }, { passive: false });

            // Keyboard
            document.addEventListener('keydown', (e) => {
                if (this.gameState === 'playing' && e.code === 'Space') {
                    e.preventDefault();
                    this.pauseGame();
                }
            });
        }
    }

    startGame() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId); // Eski loop'u öldür!
            this.animationId = null;
        }

        if (this.energy <= 0) {
       /*     const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
            if (confirm(`${LANG.energy}: 0/5\n${LANG.watchAd}?`)) {
                this.refillEnergyWithAd();
                return;
            } else {
                return;
            }*/
            if (this.energy <= 0) {
                // Direk reklam fonksiyonunu çağır
                this.refillEnergyWithAd();
                return;
            }
        }

        // Enerji harca
        this.energy = Math.max(0, this.energy - 1);
        this.saveEnergyData();

        console.log('🎮 Yeni oyun başlıyor...');
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
        this.spawnDelay = 2800;
        this._nextBubbleSpawn = null; // Spawn timer'ı baştan alınır

        // Power-ups sıfırla
        this.powerUps = { freeze: false, double: false, magnet: false, auto: false };
        this.powerUpUses = { freeze: 1, double: 1, magnet: 1, auto: 1 };

        this.showScreen('game-screen');
        this.updateUI();
        this.updatePowerUpButtons();
        this.forceHideAchievement();

        this.gameLoop(0); // ANİMASYONU BAŞLAT!
    }


    gameOver() {
        console.log('☠️ Oyun bitti! Final puan:', this.score, 'Seviye:', this.level);

        // Ses ve titreşim
        if (SOUNDS.gameOver) SOUNDS.gameOver.play();
        vibrate([200, 100, 200, 100, 500]);

        this.gameState = 'gameover';
        this.totalGames++;

        let isNewRecord = false;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore.toString());
            isNewRecord = true;
        }

        // Global leaderboard güncelle
        this.updateGlobalLeaderboard();

        localStorage.setItem('totalGames', this.totalGames.toString());

        // UI güncellemeleri
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('best-combo').textContent = this.maxCombo + 'x';
        document.getElementById('final-level').textContent = this.level;
        document.getElementById('bubbles-popped').textContent = this.bubblesPopped;

        const newRecordEl = document.getElementById('new-record');
        const titleEl = document.getElementById('game-over-title');

        if (isNewRecord) {
            newRecordEl && (newRecordEl.style.display = 'block');
            const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
            titleEl && (titleEl.textContent = LANG.newRecord);
        } else {
            if (titleEl) {
                const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
                titleEl.textContent = LANG.gameOver;
            }
            if (newRecordEl) newRecordEl.style.display = 'none';
        }

        this.showScreen('game-over');

        // Interstitial reklam göster
        if (window.AndroidInterface) {
            window.AndroidInterface.showInterstitial();
            console.log('📺 Interstitial ıars tetikleniyor!');

        }
    }

    handleCanvasClick(e) {
        if (this.gameState !== 'playing') return;

        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        let hitBubble = false;

        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const bubble = this.bubbles[i];
            const distance = Math.sqrt((x - bubble.x) ** 2 + (y - bubble.y) ** 2);

            if (distance <= bubble.radius) {
                this.popBubble(i);
                hitBubble = true;
                break;
            }
        }

        // Eğer boş alana tıklandıysa bonusu/comboyu sıfırla!
        if (!hitBubble) {
            this.combo = 1;
            this.updateUI(); // ekranı güncelle
            // Dilersen kısa titreşim, görsel feedback vs. ekleyebilirsin
        }
    }

    popBubble(index) {
        const bubble = this.bubbles[index];
        let points = 0;

        // Power-up balonlara tıklanınca sadece ilgili bonus verir!
        if (bubble.type === 'powerup' && bubble.powerType) {
            const validTypes = ['freeze', 'double', 'magnet', 'auto'];
            if (validTypes.includes(bubble.powerType)) {
                this.powerUpUses[bubble.powerType]++;
                this.updatePowerUpButtons();

                if (SOUNDS.powerUp) SOUNDS.powerUp.play();
                vibrate([50, 50]);
                // Başarı bildirimi opsiyonel!
                const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
                let tipisim = LANG[bubble.powerType] || bubble.powerType;
                let incMsg = LANG.increasedMsg.replace("{TIP}", tipisim);
                this.showAchievement(bubble.emoji + " " + tipisim + "!", incMsg, 25);

                this.bubbles.splice(index, 1);
                this.updateUI();
                return;
            }
        }

        // Normal balonlarda bonus çarpanlı ve 2x etkili puanlama!
        if (bubble.type === 'normal' && typeof bubble.points === 'number') {
            // ÖRNEK: elmas(50) * comboMultiplier(örn.9) = 50x9=450 puan!
            const comboMultiplier = Math.max(1, this.combo);
            points = bubble.points * comboMultiplier;

            if (this.powerUps.double) {
                points *= 2;
            }

            points = Math.floor(points);
            this.score += points;
            this.bubblesPopped++;
            this.combo++;
            this.maxCombo = Math.max(this.maxCombo, this.combo);

            if (SOUNDS.pop) SOUNDS.pop.play();
            if (this.combo > 1 && SOUNDS.combo) SOUNDS.combo.play();

            vibrate(50);
            this.createParticles(bubble.x, bubble.y, bubble.color, points);

            this.checkLevelUp();
        }

        this.bubbles.splice(index, 1);
        this.updateUI();

        console.log(`💥 +${points} puan! ${this.combo}x combo`);
    }

    createParticles(x, y, color, points) {
        // Renk parçacıkları
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                color: color,
                life: 30,
                maxLife: 30
            });
        }

        // Puan gösterimi
        this.particles.push({
            x: x,
            y: y - 20,
            vx: 0,
            vy: -2,
            text: `+${points}`,
            color: '#FFD700',
            life: 60,
            maxLife: 60,
            isText: true
        });
    }

    gameLoop(currentTime) {
        if (this.gameState !== 'playing') return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update game objects
        this.updateBubbles(deltaTime);
        this.updateParticles(deltaTime);
        this.spawnBubbles(deltaTime);

        // Draw everything
        this.drawBubbles();
        this.drawParticles();

        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }

    updateBubbles(deltaTime) {
        const settings = this.levelSettings[this.level] || this.levelSettings[1];

        // SEVİYE İÇİN HER DAİM levelSettings varsa, sonsuz ilerleme için fallback ayarlı
        const baseSpeed = 0.05;
        const baseMultiplier = this.levelSettings[this.level]
          ? this.levelSettings[this.level].speedMultiplier
          : 2.8 * Math.pow(1.07, this.level - 10);

        // Level'a göre hız katlaması (ör: 1 + (level/7)^1.07 ile çok hafif ama her seviye artan hız)
        const levelBoost = 1 + this.level * 0.06 + Math.pow(this.level, 1.12) / 19;

        // Freeze aktifse balonlar çok yavaşlar
        const freezeSlowFactor = this.powerUps.freeze ? 0.2 : 1;
        const speed = baseSpeed * baseMultiplier * freezeSlowFactor * levelBoost;

        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const bubble = this.bubbles[i];
            if (!bubble) continue;

            bubble.y -= speed * deltaTime;

            // Magnet power-up (aynen bırak)
            if (this.powerUps.magnet) {
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;
                const dx = centerX - bubble.x;
                const dy = centerY - bubble.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 0) {
                    bubble.x += (dx / distance) * 0.02 * deltaTime;
                    bubble.y -= (dy / distance) * 0.02 * deltaTime;
                }
            }

            // Auto power-up
           const autoBurstRate = 0.07 + 0.01 * Math.sqrt(this.level); // Seviye ile daha yavaş artış
           const minVisibleY = this.canvas.height - 0.81 * this.canvas.height; // Balon ekrana çıktı mı? (ör: üst %20'lik bölümde henüz patlamasın)

           if (
               this.powerUps.auto
               && bubble.y < this.canvas.height - bubble.radius - 10 // Ekrana gerçekten gelmiş mi?
               && bubble.y > minVisibleY
               && Math.random() < autoBurstRate
           ) {
               this.popBubble(i);
               continue;
           }

            // Ekrandan çıkan bubbles (değişmeden bırak)
            if (bubble.y + bubble.radius < 0) {
                if (bubble.type === 'normal') {
                    this.bubbles.splice(i, 1);
                    this.lives--;
                    this.combo = 1;

                    vibrate(100);
                    console.log('💔 Balon kaçtı! Kalan can:', this.lives);

                    if (this.lives <= 0) {
                        if (this.animationId) {
                            cancelAnimationFrame(this.animationId);
                        }
                        this.gameOver();
                        return;
                    }
                    this.updateUI();
                } else {
                    this.bubbles.splice(i, 1);
                }
            }
        }
    }

    updateParticles(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;

            if (!particle.isText) {
                particle.vy += 0.2; // Gravity
            }

            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    spawnBubbles(deltaTime) {
        this.spawnTimer += deltaTime;
        const settings = this.levelSettings[this.level] || this.levelSettings[1];

        const baseSpawnDelay = this.spawnDelay;
        const spawnScale = 1 + Math.log10(this.level + 2) * 0.22;
        const dynamicDelay = Math.max(200, baseSpawnDelay / spawnScale);

        // Her yeni spawn için random min/max aralık belirle
        const minDelay = Math.max(120, dynamicDelay * (0.44 + Math.random() * 0.12));
        const maxDelay = dynamicDelay * (1.04 + Math.random() * 0.09);
        if (!this._nextBubbleSpawn)
            this._nextBubbleSpawn = minDelay + Math.random() * (maxDelay - minDelay);

        // Her zaman sadece 1 balon spawn! Eğer minDelay çok kısa/0'a yakın seçilirse peş peşe çıkar (tamamen random)
        while (this.spawnTimer > this._nextBubbleSpawn && this.bubbles.length < settings.maxBubbles) {
            this.createBubble();

            // Bir sonraki spawn için yeni random aralık/ve süre ayarla
            this._nextBubbleSpawn = this.spawnTimer + minDelay + Math.random() * (maxDelay - minDelay);
        }
    }

    createBubble() {
        const settings = this.levelSettings[this.level] || this.levelSettings[1];
        const isPowerUp = Math.random() < 0.05;
        let bubble;

        const radius = isPowerUp ? 25 : Math.random() * 10 + 20;

        // Tam rastgele x, ama diğer baloncuklara çok yakınlık şansı %20
        let x, tries = 0;
        do {
            x = radius + Math.random() * (this.canvas.width - 2 * radius);
            const tooClose = this.bubbles.some(bub => Math.abs(bub.x - x) < 45);
            tries++;
            if (!tooClose || Math.random() < 0.2 || tries > 8) break;
        } while (true);

        const y = this.canvas.height + radius + Math.random() * 13;

        if (isPowerUp) {
            const powerUpType = this.powerUpBubbleTypes[Math.floor(Math.random() * this.powerUpBubbleTypes.length)];
            bubble = {
                x: x,
                y: y,
                radius: radius,
                color: powerUpType.color,
                type: 'powerup',
                powerType: powerUpType.type,
                emoji: powerUpType.emoji
            };
        } else {
            const bubbleType = this.getRandomBubbleType(settings.rareChance);
            bubble = {
                x: x,
                y: y,
                radius: radius,
                color: bubbleType.color,
                points: bubbleType.points,
                type: 'normal'
            };
        }

        this.bubbles.push(bubble);
    }


    getRandomBubbleType(rareChance = 0) {
        // --- Yeni yöntem: rareChance değeri frequency'yi aşırı bozmadan, tüm renklerin şansını dengeler ---
        // 1. Tüm balonların ağırlık toplamını bul
        let totalFrequency = 0;

        // rareChance sadece rare balonlara etki etsin,
        // temel balonlar (mavi-yeşil) her zaman belirli bir oranı korusun
        for (const bubbleType of this.bubbleTypes) {
            // Rare balonlar (puanı 5 veya üstü ise) rareChance ile çarpılıyor
            let freq = bubbleType.frequency;
            if (bubbleType.points >= 5) {
                freq = freq * (1 + rareChance); // Altın/kırmızı/elmas için boost
            }
            totalFrequency += freq;
            bubbleType._effectiveFreq = freq; // Geçici olarak type içine yaz
        }

        // 2. Şanslı balonu seç
        let rand = Math.random() * totalFrequency;
        let cumulative = 0;
        for (const bubbleType of this.bubbleTypes) {
            cumulative += bubbleType._effectiveFreq;
            if (rand <= cumulative) {
                return bubbleType;
            }
        }
        return this.bubbleTypes[0]; // fallback

        // Not: bubbleType._effectiveFreq sadece bu fonksiyon içinde geçerli (geri kullanılmaz!)
    }

    drawBubbles() {
        for (const bubble of this.bubbles) {
            this.ctx.beginPath();
            this.ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);

            // Gradient effect
            const gradient = this.ctx.createRadialGradient(
                bubble.x - 5, bubble.y - 5, 0,
                bubble.x, bubble.y, bubble.radius
            );
            gradient.addColorStop(0, bubble.color + 'aa');
            gradient.addColorStop(1, bubble.color);

            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Border
            this.ctx.strokeStyle = bubble.color;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Power-up emoji
            if (bubble.type === 'powerup' && bubble.emoji) {
                this.ctx.font = '20px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(bubble.emoji, bubble.x, bubble.y + 7);
            }
        }
    }

    drawParticles() {
        for (const particle of this.particles) {
            const alpha = particle.life / particle.maxLife;

            if (particle.isText) {
                this.ctx.font = 'bold 16px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                this.ctx.fillText(particle.text, particle.x, particle.y);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
                this.ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                this.ctx.fill();
            }
        }
    }

    activatePowerUp(type) {
        const validTypes = ['freeze', 'double', 'magnet', 'auto'];
        if (!validTypes.includes(type)) return;
        if (this.powerUpUses[type] <= 0 || this.gameState !== 'playing') return;

        // SADECE kullanınca hak azalır
        this.powerUpUses[type]--;

        const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
        if (SOUNDS.powerUp) SOUNDS.powerUp.play();
        vibrate([50, 50, 50]);

        this.powerUps[type] = true;
        this.updatePowerUpButtons();

        let timeout = 5000;
        if (type === 'double') timeout = 10000;
        else if (type === 'magnet') timeout = 8000;
        else if (type === 'auto') timeout = 15000;

        setTimeout(() => {
            this.powerUps[type] = false;
            this.updatePowerUpButtons();
        }, timeout);

        console.log(`Aktif: ${LANG[type]}`);
    }


    updatePowerUpButtons() {
        const powerUpButtons = ['freeze-btn', 'double-btn', 'magnet-btn', 'auto-btn'];
        const powerUpTypes = ['freeze', 'double', 'magnet', 'auto'];

        powerUpButtons.forEach((btnId, index) => {
            const btn = document.getElementById(btnId);
            const type = powerUpTypes[index];

            if (btn) {
                const uses = this.powerUpUses[type] ?? 0;
                const active = this.powerUps[type];

                btn.disabled = uses <= 0 || this.gameState !== 'playing';
                btn.style.opacity = uses <= 0 ? '0.5' : active ? '0.8' : '1';
                btn.style.background = active ? 'linear-gradient(45deg, #10B981, #059669)' : '';

                // Güncellenen hak sayısı
                let useText = btn.querySelector('.use-count');
                if (!useText) {
                    // Eğer DOM'da yoksa çocuk olarak oluştur ve ekle
                    useText = document.createElement('span');
                    useText.className = 'use-count';
                    btn.appendChild(useText);
                }
                useText.textContent = uses;
            }
        });
    }


    updateUI() {
        const elements = {
            'current-score': this.score.toLocaleString(),
            'current-combo': this.combo + 'x',
            'current-level': this.level,
            'current-lives': this.lives,
            'high-score': this.highScore.toLocaleString(),
            'total-games': this.totalGames,
            'energy-text': `${this.energy}/${this.maxEnergy}`
        };

        for (let [id, value] of Object.entries(elements)) {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        }

        // Energy bar rengi ve doluluk
        const energyFill = document.getElementById('energy-fill');
        if (energyFill) {
            const energyPercent = (this.energy / this.maxEnergy) * 100;
            energyFill.style.width = energyPercent + '%';

            if (this.energy <= 1) {
                energyFill.style.background = 'linear-gradient(90deg, #EF4444, #DC2626)';
            } else if (this.energy <= 2) {
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

    // QR Modal ve paylaşım fonksiyonları - Play Store odaklı
    showQRModal() {
        console.log('📱 Play Store paylaşım modal açılıyor');
        this.generatePlayStoreLink();
        this.showScreen('qr-modal');
    }

    generatePlayStoreLink() {
        // Gelecekte Play Store linki buraya gelecek
        const playStoreURL = 'https://play.google.com/store/apps/details?id=com.mygame.bubblepop';

        const urlInput = document.getElementById('game-url');
        if (urlInput) {
            urlInput.value = playStoreURL;
        }

        const qrDisplay = document.getElementById('qr-code-display');
        if (qrDisplay) {
            const qrCodeURL = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(playStoreURL)}&choe=UTF-8&chld=M|0`;
            qrDisplay.innerHTML = `<img src="${qrCodeURL}" alt="QR Code" style="max-width: 100%; height: auto;">`;
        }
    }

    hideQRModal() {
        this.showMainMenu();
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

    shareScore() {
        const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
        const shareText = `Bubble Pop Mania'da ${this.score.toLocaleString()} puan aldım! Seviye ${this.level}'de oyna: https://play.google.com/store/apps/details?id=com.mygame.bubblepop`;

        if (navigator.share) {
            navigator.share({
                title: 'Bubble Pop Mania - Skorumu Gör!',
                text: shareText,
                url: 'https://play.google.com/store/apps/details?id=com.mygame.bubblepop'
            }).catch(console.error);
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Skor kopyalandı! Arkadaşlarınla paylaş!');
            }).catch(console.error);
        }
    }

    // Diğer yardımcı fonksiyonlar
    pauseGame() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }

            // Pause ekranındaki değerleri güncelle!
            document.getElementById('pause-score').textContent = this.score;
            document.getElementById('pause-combo').textContent = this.combo + "x";
            document.getElementById('pause-lives').textContent = this.lives;

            // Pause ekranını göster
            this.showScreen('pause-screen');
            console.log('⏸️ Oyun duraklatıldı');
        }
    }

    resumeGame() {
        if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.showScreen('game-screen');
            this.gameLoop(performance.now());
            console.log('▶️ Oyuna devam edildi');
        }
    }

    forceHideAchievement() {
        const popup = document.getElementById('achievement-popup');
        if (popup) {
            popup.classList.add('hidden');
            popup.style.display = 'none';
        }

        if (this.achievementTimeout) {
            clearTimeout(this.achievementTimeout);
            this.achievementTimeout = null;
        }

        this.isAchievementShowing = false;
        console.log('🏆 Achievement popup zorla gizlendi');
    }

    showAchievement(title, description, points) {
        if (this.gameState === 'loading' || this.isAchievementShowing) return;

        const popup = document.getElementById('achievement-popup');
        if (!popup) return;

        if (this.achievementTimeout) {
            clearTimeout(this.achievementTimeout);
            this.achievementTimeout = null;
        }

        const titleEl = document.getElementById('achievement-title');
        const descEl = document.getElementById('achievement-desc');
        const pointsEl = document.getElementById('achievement-points');

        if (titleEl) titleEl.textContent = title;
        if (descEl) descEl.textContent = description;
        if (pointsEl) pointsEl.textContent = `+${points}`;

        popup.classList.remove('hidden');
        popup.style.display = 'block';
        this.isAchievementShowing = true;

        this.achievementTimeout = setTimeout(() => {
            this.hideAchievement();
        }, 3000);

        console.log('🏆 Achievement gösterildi:', title);
    }

    hideAchievement() {
        const popup = document.getElementById('achievement-popup');
        if (popup) {
            popup.classList.add('hidden');
            popup.style.display = 'none';
        }

        if (this.achievementTimeout) {
            clearTimeout(this.achievementTimeout);
            this.achievementTimeout = null;
        }

        this.isAchievementShowing = false;
        console.log('🏆 Achievement popup gizlendi');
    }

    updateDailyStreak() {
        const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastDateString = localStorage.getItem('lastStreakDate');
        const lastDate = lastDateString ? new Date(lastDateString) : null;
        let streak = parseInt(localStorage.getItem('dailyStreak')) || 1;

        if (!lastDate) {
            streak = 1;
        } else {
            lastDate.setHours(0, 0, 0, 0);
            const diffDays = Math.floor((today - lastDate) / (24 * 60 * 60 * 1000));

            if (diffDays >= 1) {
                streak = 1;
            } else if (diffDays === 1) {
                streak++;
            }
        }

        localStorage.setItem('lastStreakDate', today.toISOString());
        localStorage.setItem('dailyStreak', streak.toString());

        const streakEl = document.getElementById('daily-streak-text');
        if (streakEl) {
            streakEl.textContent = `${LANG.dailyStreak}: ${streak} ${LANG.days}`;
        }

        console.log('📅 Günlük seri güncellendi:', streak);
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
        const screen = document.getElementById(screenId);
        if (screen) screen.classList.remove('hidden');

        if (screenId !== 'game-screen') {
            this.forceHideAchievement();
        }
    }

        // BubblePopGame sınıfının içinde, showMainMenu() metodu
        showMainMenu() {
            this.gameState = 'menu';
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }

            this.showScreen('main-menu');
            this.updateEnergySystem();
            this.updateUI();
            this.updateDailyStreak();
            this.forceHideAchievement();
            console.log('🏠 Ana menü gösteriliyor');

            // YENİ: Oyuncu adını göster
            const currentNameEl = document.getElementById('current-player-name');
            if (currentNameEl) {
                const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
                currentNameEl.textContent = `${LANG.username}: ${this.playerName}`;
            }
        }

    showTutorial() {
        this.showScreen('tutorial-screen');
        this.forceHideAchievement();
        console.log('📖 Tutorial gösteriliyor');
    }

        // BubblePopGame sınıfının içinde, showSettings() metodu
        showSettings() {
            this.showScreen('settings-screen');
            this.forceHideAchievement();
            console.log('⚙️ Ayarlar gösteriliyor');

            const usernameInput = document.getElementById('username-input');
            if (usernameInput) {
                usernameInput.value = this.playerName;
                // Önceki durum mesajlarını temizle
                const usernameStatusEl = document.getElementById('username-status');
                if (usernameStatusEl) usernameStatusEl.textContent = '';
            }

            // YENİ: Kullanıcı adı ayarları UI'ını güncelle (etkin/devre dışı bırak)
            this.updateUsernameSettingsUI();
        }

            // BubblePopGame sınıfının içinde bir yere ekleyin
            updateUsernameSettingsUI() {
                const usernameInput = document.getElementById('username-input');
                const saveUsernameBtn = document.getElementById('save-username-btn');
                const usernameStatusEl = document.getElementById('username-status');
                const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;

                if (usernameInput && saveUsernameBtn) {
                    // Firebase hazır ve Auth yapılmışsa
                    if (isFirebaseReady && !this.getOrCreatePlayerId().startsWith('local_')) {
                        usernameInput.disabled = false;
                        saveUsernameBtn.disabled = false;
                        if (usernameStatusEl) usernameStatusEl.textContent = ''; // Mesajı temizle
                    } else {
                        // Firebase hazır değilse veya yerel ID kullanılıyorsa devre dışı bırak
                        usernameInput.disabled = true;
                        saveUsernameBtn.disabled = true;
                        if (usernameStatusEl) {
                            usernameStatusEl.textContent = 'Kullanıcı adı değiştirmek için oturum açmalısınız. (Uygulamanız Firebase ile senkronize olana kadar bekleyin.)';
                            usernameStatusEl.style.color = 'orange';
                        }
                    }
                }
            }
}

// Interstitial reklam kapandığında game-over ekranını yeniden göster
window.onInterstitialClosed = () => {
    console.log('📺 Interstitial kapandı, game-over ekranı yenileniyor...');
    if (window.game && window.game.gameState === 'gameover') {
        window.game.showScreen('game-over');
    }
};

// Rewarded ad izlendikten sonra enerji doldur
window.onEnergyRewarded = function() {
    console.log('🎁 Rewarded ad izlendi, enerji dolduruldu!');
    if (window.game) {
        window.game.energy = window.game.maxEnergy;
        window.game.lastEnergyTime = Date.now();
        window.game.saveEnergyData();
        window.game.updateUI();
        const LANG = GAME_LANGUAGES[CURRENT_LANG] || GAME_LANGUAGES.tr;
    }
};
window.onRewardUnavailable = function() {
    alert("Reklam şu an hazır değil, lütfen birkaç saniye sonra tekrar deneyin.");
    console.warn("Reklam hazır değil, kullanıcıya bilgi verildi.");
};

// Başlat
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM yüklendi, oyun anında oluşturuluyor...');

    // ... (Diğer setup kodları, achievement gizleme ve dil seçici gibi, burada kalabilir)
    const achievementPopup = document.getElementById('achievement-popup');
    if (achievementPopup) {
        achievementPopup.classList.add('hidden');
        achievementPopup.style.display = 'none';
    }
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.value = CURRENT_LANG;
        langSelect.addEventListener('change', (e) => {
            CURRENT_LANG = e.target.value;
            localStorage.setItem('gameLang', CURRENT_LANG);
            updateLanguageTexts();
            if (window.game) {
                window.game.updateDailyStreak();
            }
            console.log('🌐 Dil değiştirildi:', CURRENT_LANG);
        });
    }
    updateLanguageTexts();

    // 1. Oyunu hemen başlat, Firebase'i bekleme
    window.game = new BubblePopGame();

 // 2. Firebase'i arka planda başlat ve bitince senkronize et

    initFirebase().then(ready => {
        if (ready) { // Eğer Firebase hazırsa (yani kullanıcı oturum açmışsa)
            console.log('✅ Firebase hazır, arka plan senkronizasyonu başlıyor...');
            const currentPlayerId = window.game.getOrCreatePlayerId();
            if (!currentPlayerId.startsWith('local_')) {
                window.game.syncWithFirebase();
                // YENİ: Oyuncu adını Firestore'dan yükle
                window.game.loadPlayerNameFromFirestore();
            } else {
                console.warn('⚠️ Firebase hazır olmasına rağmen hala yerel ID kullanılıyor. Senkronizasyon yapılmayacak. (Bu durum olmamalı, bir sorun var!)');
            }
            // YENİ: Firebase hazır olunca kullanıcı adı ayarlarını etkinleştir
            if (window.game) {
                window.game.updateUsernameSettingsUI();
            }
        } else {
            console.warn('⚠️ Firebase başlatılamadı veya kullanıcı oturum açamadı, oyun offline modda devam edecek.');
            // YENİ: Firebase hazır değilse kullanıcı adı ayarlarını devre dışı bırak
            if (window.game) {
                window.game.updateUsernameSettingsUI(); // Bu da devre dışı bırakma durumunu ayarlayacak
            }
        }
    });


    // Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js')
                .then(() => console.log('🔧 ServiceWorker kaydedildi'))
                .catch(() => console.log('❌ ServiceWorker kayıt hatası'));
        });
    }
});
