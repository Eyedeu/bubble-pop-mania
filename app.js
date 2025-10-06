// Bubble Pop Mania - Basitleştirilmiş Versiyon

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
        
        this.bubbleTypes = [
            {color: "#3B82F6", points: 1, frequency: 40}, // Blue
            {color: "#10B981", points: 2, frequency: 30}, // Green  
            {color: "#EF4444", points: 5, frequency: 20}, // Red
            {color: "#F59E0B", points: 10, frequency: 8}, // Gold
            {color: "#8B5CF6", points: 50, frequency: 2} // Purple
        ];
        
        this.init();
    }
    
    init() {
        console.log('Oyun başlatılıyor...');
        
        // Canvas'ı bul veya oluştur
        this.canvas = document.getElementById('game-canvas');
        if (!this.canvas) {
            console.log('Canvas bulunamadı, oluşturuluyor...');
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'game-canvas';
            this.canvas.width = 400;
            this.canvas.height = 600;
            this.canvas.style.border = '2px solid #3B82F6';
            this.canvas.style.backgroundColor = '#f0f8ff';
            
            // Canvas'ı oyun ekranına ekle
            const gameArea = document.querySelector('#game-screen .game-area') || document.body;
            gameArea.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        
        // Event listener'ları ekle
        this.setupEventListeners();
        
        // Test bubble'ları çiz
        this.drawTestBubbles();
        
        console.log('Oyun hazır!');
    }
    
    setupEventListeners() {
        // Play butonu
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                console.log('Play butonuna tıklandı');
                this.startGame();
            });
        }
        
        // Canvas tıklama
        if (this.canvas) {
            this.canvas.addEventListener('click', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                this.handleCanvasClick(x, y);
            });
        }
        
        // Diğer butonlar
        this.setupOtherButtons();
    }
    
    setupOtherButtons() {
        // Tutorial skip
        const skipBtn = document.getElementById('skip-tutorial');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => this.startGame());
        }
        
        // Main menu
        const menuBtn = document.getElementById('main-menu-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', () => this.showScreen('main-menu'));
        }
    }
    
    startGame() {
        console.log('Oyun başlıyor...');
        this.gameState = 'playing';
        this.score = 0;
        this.combo = 1;
        this.bubbles = [];
        
        this.showScreen('game-screen');
        this.updateUI();
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
    
    drawTestBubbles() {
        if (!this.ctx) return;
        
        // Canvas'ı temizle
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Test bubble'ları çiz
        const testBubbles = [
            {x: 100, y: 500, color: '#3B82F6', radius: 25},
            {x: 200, y: 450, color: '#10B981', radius: 30},
            {x: 300, y: 400, color: '#EF4444', radius: 35},
            {x: 150, y: 350, color: '#F59E0B', radius: 28},
            {x: 250, y: 300, color: '#8B5CF6', radius: 32}
        ];
        
        testBubbles.forEach(bubble => {
            this.drawBubble(bubble.x, bubble.y, bubble.radius, bubble.color);
        });
