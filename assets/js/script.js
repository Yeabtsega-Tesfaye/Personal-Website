// ================= DOM CONTENT LOADED =================
document.addEventListener('DOMContentLoaded', function() {
  
  // ================= HEADER SCROLL EFFECT =================
  const header = document.querySelector('.site-header');
      const themeToggle = document.createElement('button');
    const icon = document.createElement('i');
    
    themeToggle.className = 'theme-toggle';
    icon.classList.add('fa-solid', 'fa-moon');
    themeToggle.appendChild(icon);
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
  
    // ================= THEME TOGGLE =================
  function initThemeToggle() {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      icon.classList.toggle('fa-moon', !isLight);
      icon.classList.toggle('fa-sun', isLight);
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      
      // Redraw code rain if active
      if (window.codeRain && window.codeRain.isActive) {
        window.codeRain.draw();
      }
    });
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    document.body.appendChild(themeToggle);
  }
  
  initThemeToggle();

  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      themeToggle.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
       themeToggle.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', updateHeader);
  updateHeader(); // Initial check
  
  // ================= MOBILE NAVIGATION =================
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navList.classList.toggle('active');
      document.documentElement.classList.toggle('menu-open');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        document.documentElement.classList.remove('menu-open');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        document.documentElement.classList.remove('menu-open');
      }
    });
  }
  
  // ================= ANIMATED COUNTERS =================
  function animateCounters() {
    const counters = document.querySelectorAll('.meta-value');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent.replace('+', ''));
      const duration = 2000;
      const increment = target / (duration / 16);
      
      let current = 0;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current) + '+';
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
          counter.classList.add('animated');
        }
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(counter);
    });
  }
  
  // ================= SCROLL REVEAL ANIMATIONS =================
  function initScrollReveal() {
    document.querySelectorAll('.portfolio-card, .blog-card, .service-card').forEach((card, index) => {
      card.classList.add('lazy-load');
      card.dataset.delay = index * 0.1;
    });
    
    const lazyElements = document.querySelectorAll('.lazy-load');
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.dataset.delay) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, entry.target.dataset.delay * 1000);
          } else {
            entry.target.classList.add('visible');
          }
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    lazyElements.forEach(element => observer.observe(element));
    sections.forEach(section => observer.observe(section));
  }
  
  // ================= TYPING EFFECT =================
  function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(typeWriter, 500);
        observer.unobserve(entries[0].target);
      }
    });
    
    observer.observe(heroTitle);
  }
  
  // ================= PARTICLE BACKGROUND =================
  function createParticles() {
    const container = document.createElement('div');
    container.className = 'particles';
    container.id = 'particlesContainer';
    
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 8 + 4;
      const posX = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.opacity = Math.random() * 0.1 + 0.05;
      
      container.appendChild(particle);
    }
    
    document.body.appendChild(container);
    return container;
  }
  
  function toggleParticles(show) {
    const particles = document.getElementById('particlesContainer');
    if (!particles) return;
    
    if (show) {
      particles.style.display = 'block';
      setTimeout(() => particles.style.opacity = '1', 10);
      particles.querySelectorAll('.particle').forEach(p => {
        p.style.animationPlayState = 'running';
      });
    } else {
      particles.style.opacity = '0';
      setTimeout(() => particles.style.display = 'none', 300);
      particles.querySelectorAll('.particle').forEach(p => {
        p.style.animationPlayState = 'paused';
      });
    }
  }
  
  // ================= CURSOR EFFECT =================
  function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .btn, .portfolio-card, .service-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    const cursorCSS = `
      .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, background 0.3s;
      }
      
      .custom-cursor.hover {
        width: 40px;
        height: 40px;
        background: rgba(0, 204, 255, 0.2);
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = cursorCSS;
    document.head.appendChild(style);
  }
  
  // ================= CODE RAIN CLASS =================
  class CodeRain {
    constructor() {
      // Create canvas if it doesn't exist
      if (!document.getElementById('codeRain')) {
        const canvas = document.createElement('canvas');
        canvas.id = 'codeRain';
        canvas.className = 'code-rain-canvas';
        document.body.appendChild(canvas);
      }
      
      this.canvas = document.getElementById('codeRain');
      this.ctx = this.canvas.getContext('2d');
      this.drops = [];
      this.animationId = null;
      this.intensity = 'medium';
      
      // Load saved settings
      const savedIntensity = localStorage.getItem('codeRainIntensity') || 'medium';
      const isEnabled = savedIntensity !== 'off';
      
      this.isActive = isEnabled;
      this.intensity = savedIntensity;
      
      // Tech stack with your skills
      this.techStack = [
        'React', 'JavaScript', 'Node.js', 'PHP', 'C++', 'Java',
        'HTML', 'CSS', 'Git', 'MySQL', 'MongoDB', 'Linux',
        'Express', 'npm', 'VS Code', 'GitHub', 'Figma'
      ];
      
      this.symbols = '{}<>()[];:.,?!@#$%^&*+-=~|\\/';
      this.matrixChars = '01アイウエオカキクケコサシスセソ';
      
      this.allChars = this.generateCharacterSet();
      this.init();
    }
    
    generateCharacterSet() {
      let chars = [];
      
      // Tech stack
      this.techStack.forEach(word => {
        for(let i = 0; i < 5; i++) chars.push(word);
      });
      
      // Symbols
      for(let i = 0; i < this.symbols.length; i++) {
        for(let j = 0; j < 10; j++) chars.push(this.symbols.charAt(i));
      }
      
      // Matrix chars
      for(let i = 0; i < this.matrixChars.length; i++) {
        for(let j = 0; j < 15; j++) chars.push(this.matrixChars.charAt(i));
      }
      
      // Your branding
      ['Yeab', 'Yeabtsega', 'silentCompiler'].forEach(text => {
        for(let i = 0; i < 3; i++) chars.push(text);
      });
      
      return chars;
    }
    
    init() {
      this.resizeCanvas();
      this.createDrops();
      this.setupEventListeners();
      
      if (this.isActive) {
        this.show();
        this.animate();
      } else {
        this.hide();
      }
      
      // Update UI
      this.updateUI();
    }
    
    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    
    createDrops() {
      const density = {
        off: 0, light: 0.3, medium: 0.6, intense: 1
      }[this.intensity] || 0.6;
      
      const columns = Math.floor((this.canvas.width / 25) * density);
      this.drops = [];
      
      for(let i = 0; i < columns; i++) {
        this.drops.push({
          x: i * 25,
          y: Math.random() * -this.canvas.height,
          speed: this.getSpeed(),
          length: 5 + Math.floor(Math.random() * 20),
          chars: [],
          lastUpdate: Date.now()
        });
        
        this.generateColumnChars(this.drops[i]);
      }
    }
    
    getSpeed() {
      const speeds = {
        light: [1, 2],
        medium: [2, 4],
        intense: [3, 6]
      }[this.intensity] || [2, 4];
      
      return speeds[0] + Math.random() * (speeds[1] - speeds[0]);
    }
    
    generateColumnChars(drop) {
      drop.chars = [];
      for(let i = 0; i < drop.length; i++) {
        const isHead = i === 0;
        drop.chars.push({
          char: this.allChars[Math.floor(Math.random() * this.allChars.length)],
          brightness: isHead ? 1 : (i / drop.length) * 0.5 + 0.2,
          isHead: isHead
        });
      }
    }
    
    draw() {
      const isLightMode = document.body.classList.contains('light-mode');
      
      // Clear with fade
      this.ctx.fillStyle = isLightMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(21, 21, 22, 0.04)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.font = '14px "Courier New", monospace';
      this.ctx.textAlign = 'center';
      
      this.drops.forEach(drop => {
        drop.chars.forEach((charObj, index) => {
          const y = drop.y + (index * 18);
          
          if (y < -20 || y > this.canvas.height + 20) return;
          
          // Green color scheme
          let r, g, b, a;
          
          if (charObj.isHead) {
            // Bright green head
            r = 0;
            g = 255;
            b = 136;
            a = charObj.brightness;
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = 'rgba(0, 255, 136, 0.5)';
          } else {
            // Trail - darker green
            const greenValue = Math.floor(100 + (charObj.brightness * 100));
            r = 0;
            g = greenValue;
            b = Math.floor(80 + (charObj.brightness * 40));
            a = charObj.brightness * 0.6;
            this.ctx.shadowBlur = 0;
          }
          
          // Adjust for light mode
          if (isLightMode && !charObj.isHead) {
            g = Math.floor(g * 0.7);
            b = Math.floor(b * 0.7);
            a = a * 1.2;
          }
          
          this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          this.ctx.fillText(charObj.char, drop.x, y);
        });
        
        this.ctx.shadowBlur = 0;
      });
    }
    
    update() {
      const now = Date.now();
      
      this.drops.forEach(drop => {
        drop.y += drop.speed;
        
        if (now - drop.lastUpdate > 100) {
          this.updateColumnChars(drop);
          drop.lastUpdate = now;
        }
        
        if (drop.y > this.canvas.height + (drop.length * 25)) {
          drop.y = -drop.length * 20;
          drop.speed = this.getSpeed();
          this.generateColumnChars(drop);
        }
      });
    }
    
    updateColumnChars(drop) {
      for(let i = drop.chars.length - 1; i > 0; i--) {
        drop.chars[i] = {
          ...drop.chars[i - 1],
          isHead: false,
          brightness: Math.max(0.2, drop.chars[i - 1].brightness - 0.15)
        };
      }
      
      drop.chars[0] = {
        char: this.allChars[Math.floor(Math.random() * this.allChars.length)],
        brightness: 1,
        isHead: true
      };
    }
    
    animate() {
      if (!this.isActive) return;
      
      this.update();
      this.draw();
      this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    setIntensity(level) {
      this.intensity = level;
      this.isActive = level !== 'off';
      
      localStorage.setItem('codeRainIntensity', level);
      
      // Update particles
      if (this.isActive) {
        toggleParticles(false);
        this.show();
        if (!this.animationId) this.animate();
      } else {
        toggleParticles(true);
        this.hide();
        if (this.animationId) {
          cancelAnimationFrame(this.animationId);
          this.animationId = null;
        }
      }
      
      // Recreate drops with new density
      this.createDrops();
      this.updateUI();
      
      // Update canvas class for CSS
      this.canvas.className = 'code-rain-canvas';
      if (level === 'medium') this.canvas.classList.add('active');
      if (level === 'intense') this.canvas.classList.add('intense');
    }
    
    show() {
      this.canvas.style.display = 'block';
      setTimeout(() => this.canvas.style.opacity = '1', 10);
    }
    
    hide() {
      this.canvas.style.opacity = '0';
      setTimeout(() => this.canvas.style.display = 'none', 300);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    toggle() {
      const newIntensity = this.isActive ? 'off' : 'medium';
      this.setIntensity(newIntensity);
    }
    
    updateUI() {
      const toggleBtn = document.getElementById('rainToggle');
      const intensityBtns = document.querySelectorAll('.intensity-btn');
      const activeBtn = document.querySelector(`[data-intensity="${this.intensity}"]`);
      
      if (toggleBtn) {
        toggleBtn.classList.toggle('active', this.isActive);
        toggleBtn.innerHTML = this.isActive ? 
          '<i class="fas fa-pause"></i>' : 
          '<i class="fas fa-code"></i>';
        toggleBtn.title = this.isActive ? 'Pause code rain' : 'Start code rain';
      }
      
      intensityBtns.forEach(btn => btn.classList.remove('active'));
      if (activeBtn) activeBtn.classList.add('active');
    }
    
    setupEventListeners() {
      window.addEventListener('resize', () => {
        this.resizeCanvas();
        this.createDrops();
      });
      
      // Toggle button
      const toggleBtn = document.getElementById('rainToggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => this.toggle());
      }
      
      // Intensity buttons
      document.querySelectorAll('.intensity-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.setIntensity(btn.dataset.intensity);
          this.closeDropdown();
        });
      });
      
      // Dropdown toggle
      const dropdownToggle = document.querySelector('.dropdown-toggle');
      if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
          e.stopPropagation();
          document.querySelector('.dropdown-menu').classList.toggle('show');
        });
      }
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.rain-intensity-dropdown')) {
          this.closeDropdown();
        }
      });
      
      // Pause when tab is hidden
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && this.animationId) {
          cancelAnimationFrame(this.animationId);
          this.animationId = null;
        } else if (!document.hidden && this.isActive && !this.animationId) {
          this.animate();
        }
      });
    }
    
    closeDropdown() {
      document.querySelector('.dropdown-menu')?.classList.remove('show');
    }
  }
  
  // ================= INITIALIZE EVERYTHING =================
  animateCounters();
  initScrollReveal();
  initTypingEffect();
  createParticles();
  initCursorEffect();
  
  // Initialize Code Rain
  setTimeout(() => {
    window.codeRain = new CodeRain();
  }, 500);
  
  // ================= LAZY LOAD IMAGES =================
  function lazyLoadImages() {
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
  }
  
  lazyLoadImages();
  
  // ================= SMOOTH SCROLL =================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  

});

// ================= LOADING ANIMATION =================
window.addEventListener('load', function() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  }
  document.body.classList.add('loaded');
});

// ================= TERMINAL WELCOME =================
function initTerminal() {
  document.documentElement.classList.add('terminal-open');
  const terminalOverlay = document.getElementById('terminalOverlay');
  const terminalContent = document.querySelector('.terminal-content');
  const typingCommand = document.getElementById('typingCommand');
  const skipButton = document.getElementById('skipTerminal');
  
  
  // Terminal configuration
  const terminalConfig = {
    typingSpeed: 50, // ms per character
    lineDelay: 800, // ms between lines
    commandDelay: 1200, // ms before showing output
    cursorBlinkSpeed: 500,
    showSkipAfter: 10000 // ms before skip button appears
  };
  
  // Terminal commands and responses
  const terminalScript = [
    {
      command: "whoami",
      output: "silentCompiler",
      delay: 800
    },
    {
      command: "cat about.txt",
      output: "Software Engineer & Full-Stack Developer\nBuilding robust, scalable applications\n3+ Years Experience",
      delay: 1000
    },
    {
      command: "ls skills/",
      output: "<span class='dir'>backend/</span>  <span class='dir'>frontend/</span>  <span class='dir'>databases/</span>  <span class='file'>tools.js</span>",
      delay: 800
    },
    {
      command: "npm start portfolio",
      output: "> Starting portfolio server...\n> Portfolio ready at <span class='accent'>https://yeab-tsega.netlify.app</span>\n> Press <kbd>Enter</kbd> to continue...",
      delay: 1200
    }
  ];
  
  // Create typing effect
  function typeText(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';
    
    function typeChar() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, speed);
      } else if (callback) {
        setTimeout(callback, 100);
      }
    }
    
    typeChar();
  }
  
  // Add line to terminal
  function addTerminalLine(command, output, isLast = false) {
    return new Promise((resolve) => {
      // Create command line
      const lineDiv = document.createElement('div');
      lineDiv.className = 'terminal-line';
      
      const promptSpan = document.createElement('span');
      promptSpan.className = 'prompt';
      promptSpan.textContent = '$';
      
      const commandSpan = document.createElement('span');
      commandSpan.className = 'command';
      
      lineDiv.appendChild(promptSpan);
      lineDiv.appendChild(commandSpan);
      
      // Insert before the active line
      const activeLine = document.querySelector('.active-line');
      terminalContent.insertBefore(lineDiv, activeLine);
      
      // Type the command
      typeText(commandSpan, command, terminalConfig.typingSpeed, () => {
        // Add output after delay
        setTimeout(() => {
          if (output) {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'terminal-output';
            outputDiv.innerHTML = output;
            terminalContent.insertBefore(outputDiv, activeLine);
            
            // Scroll to bottom
            terminalContent.parentElement.scrollTop = terminalContent.parentElement.scrollHeight;
          }
          
          resolve();
        }, terminalConfig.commandDelay);
      });
    });
  }
  
  // Run terminal script
  async function runTerminalScript() {
    // Clear initial static content
    const initialLines = document.querySelectorAll('.terminal-line:not(.active-line), .terminal-output');
    initialLines.forEach(line => line.remove());
    
    // Start typing sequence
    for (let i = 0; i < terminalScript.length; i++) {
      const item = terminalScript[i];
      const isLast = i === terminalScript.length - 1;
      
      await addTerminalLine(item.command, item.output, isLast);
      
      // Delay between commands (except for last one)
      if (!isLast) {
        await new Promise(resolve => setTimeout(resolve, terminalConfig.lineDelay));
      }
    }
    
    // After script completes, enable keyboard interaction
    enableTerminalInteraction();
  }
  
  // Enable keyboard commands
  function enableTerminalInteraction() {
    const commandHistory = [];
    let historyIndex = -1;
    
    // Focus on terminal
    terminalOverlay.focus();
    
    // Listen for keyboard input
    document.addEventListener('keydown', handleKeyPress);
    
    function handleKeyPress(e) {
      // Enter key to continue
      if (e.key === 'Enter') {
        e.preventDefault();
        closeTerminal();
        return;
      }
      
      // Escape key to skip
      if (e.key === 'Escape') {
        e.preventDefault();
        closeTerminal();
        return;
      }
      
      // Tab key for autocomplete (optional feature)
      if (e.key === 'Tab') {
        e.preventDefault();
        autoCompleteCommand();
        return;
      }
      
      // Arrow up/down for command history
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        navigateHistory(e.key === 'ArrowUp' ? -1 : 1);
        return;
      }
      
      // Typing in command line (only letters, numbers, spaces, and special chars)
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === ' ') {
        updateTypingCommand(e);
      }
    }
    
    function updateTypingCommand(e) {
      if (e.key === 'Backspace') {
        typingCommand.textContent = typingCommand.textContent.slice(0, -1);
      } else if (e.key.length === 1 || e.key === ' ') {
        typingCommand.textContent += e.key;
      }
    }
    
    function autoCompleteCommand() {
      const commonCommands = ['help', 'clear', 'projects', 'skills', 'contact', 'exit'];
      const currentText = typingCommand.textContent.toLowerCase();
      
      const matches = commonCommands.filter(cmd => cmd.startsWith(currentText));
      if (matches.length === 1) {
        typingCommand.textContent = matches[0];
      }
    }
    
    function navigateHistory(direction) {
      if (commandHistory.length === 0) return;
      
      historyIndex = Math.max(0, Math.min(commandHistory.length - 1, historyIndex + direction));
      
      if (historyIndex >= 0 && historyIndex < commandHistory.length) {
        typingCommand.textContent = commandHistory[historyIndex];
      }
    }
    
    // Add command execution
    function executeCommand(cmd) {
      commandHistory.push(cmd);
      historyIndex = commandHistory.length;
      
      switch (cmd.toLowerCase()) {
        case 'help':
          showHelp();
          break;
        case 'clear':
          clearTerminal();
          break;
        case 'projects':
          showProjects();
          break;
        case 'skills':
          showSkills();
          break;
        case 'contact':
          showContact();
          break;
        case 'exit':
          closeTerminal();
          break;
        default:
          showUnknownCommand(cmd);
      }
    }
    
    function showHelp() {
      const helpOutput = `
Available commands:
• <span class="accent">help</span> - Show this help message
• <span class="accent">projects</span> - View my projects
• <span class="accent">skills</span> - View my technical skills
• <span class="accent">contact</span> - Get my contact info
• <span class="accent">clear</span> - Clear terminal
• <span class="accent">exit</span> - Close terminal and view portfolio
      `;
      addOutputToTerminal(helpOutput);
    }
    
    function showProjects() {
      const projectsOutput = `
My recent projects:
• <span class="accent">Perfue</span> - Perfume E-commerce Website
• <span class="accent">EarPods Max</span> - Product Landing Page
• <span class="accent">Glowing</span> - Cosmetics E-commerce
• <span class="accent">Cheffood</span> - Food Delivery Platform

Type <span class="accent">exit</span> to view them in detail.
      `;
      addOutputToTerminal(projectsOutput);
    }
    
    function showSkills() {
      const skillsOutput = `
Technical Stack:
• <span class="dir">Languages:</span> JavaScript, Java, C++, PHP
• <span class="dir">Frontend:</span> React, HTML5, CSS3
• <span class="dir">Backend:</span> Node.js, Express.js
• <span class="dir">Databases:</span> MySQL, MongoDB
• <span class="dir">Tools:</span> Git, Linux, npm
      `;
      addOutputToTerminal(skillsOutput);
    }
    
    function showContact() {
      const contactOutput = `
Get in touch:
• <span class="accent">GitHub:</span> github.com/Yeabtsega-Tesfaye
• <span class="accent">LinkedIn:</span> linkedin.com/in/dev-yeabtsega
• <span class="accent">Telegram:</span> t.me/Confidential_boy
• <span class="accent">Phone:</span> +251-914-602-982

Type <span class="accent">exit</span> to view full contact section.
      `;
      addOutputToTerminal(contactOutput);
    }
    
    function showUnknownCommand(cmd) {
      const unknownOutput = `
<span class="error">Command not found:</span> ${cmd}
Type <span class="accent">help</span> for available commands.
      `;
      addOutputToTerminal(unknownOutput);
    }
    
    function clearTerminal() {
      const allLines = document.querySelectorAll('.terminal-line:not(.active-line), .terminal-output');
      allLines.forEach(line => line.remove());
      typingCommand.textContent = '';
    }
    
    function addOutputToTerminal(output) {
      const outputDiv = document.createElement('div');
      outputDiv.className = 'terminal-output';
      outputDiv.innerHTML = output;
      
      const activeLine = document.querySelector('.active-line');
      terminalContent.insertBefore(outputDiv, activeLine);
      
      // Clear command line
      typingCommand.textContent = '';
      
      // Scroll to bottom
      terminalContent.parentElement.scrollTop = terminalContent.parentElement.scrollHeight;
    }
    
    // Enable command execution on Enter
    const originalHandleKeyPress = handleKeyPress;
    document.removeEventListener('keydown', handleKeyPress);
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && typingCommand.textContent.trim()) {
        e.preventDefault();
        const cmd = typingCommand.textContent.trim();
        
        // Create command line
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';
        
        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        promptSpan.textContent = '$';
        
        const commandSpan = document.createElement('span');
        commandSpan.className = 'command';
        commandSpan.textContent = cmd;
        
        lineDiv.appendChild(promptSpan);
        lineDiv.appendChild(commandSpan);
        
        const activeLine = document.querySelector('.active-line');
        terminalContent.insertBefore(lineDiv, activeLine);
        
        // Execute command
        executeCommand(cmd);
        
        // Clear typing line
        typingCommand.textContent = '';
        
        // Scroll to bottom
        terminalContent.parentElement.scrollTop = terminalContent.parentElement.scrollHeight;
      } else {
        originalHandleKeyPress(e);
      }
    });
  }

  // Close terminal
  function closeTerminal() {
    // Mark as seen
    
    // Add closing animation
    terminalOverlay.classList.add('hidden');
    document.documentElement.classList.remove('terminal-open');

    
    // Remove from DOM after animation
    setTimeout(() => {
      terminalOverlay.style.display = 'none';
      document.removeEventListener('keydown', handleKeyPress);
      
      // Trigger portfolio entrance animations
      document.body.classList.add('portfolio-loaded');
      
      // Optional: Play a sound effect
      playTerminalSound('close');
    }, 800);


  }
  
  // Sound effects (optional)
  function playTerminalSound(type) {
    // You can add sound effects here if desired
    // Example: using Web Audio API for simple beeps
    if (typeof AudioContext !== 'undefined') {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      
      if (type === 'type') {
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
        oscillator.start();
        setTimeout(() => oscillator.stop(), 50);
      } else if (type === 'close') {
        oscillator.frequency.value = 600;
        gainNode.gain.value = 0.1;
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        oscillator.start();
        setTimeout(() => oscillator.stop(), 300);
      }
    }
  }
  
  // Event listeners
  skipButton.addEventListener('click', closeTerminal);
  
  // Close button functionality
  document.querySelector('.control.close').addEventListener('click', closeTerminal);
  
  // Minimize button (optional feature)
  document.querySelector('.control.minimize').addEventListener('click', () => {
    terminalOverlay.classList.add('minimized');
    // You could add a notification that terminal is minimized
  });
  
  // Maximize button
  document.querySelector('.control.maximize').addEventListener('click', () => {
    terminalOverlay.classList.toggle('fullscreen');
  });
  
  // Auto-show skip button after delay
  setTimeout(() => {
    skipButton.style.opacity = '1';
    skipButton.style.visibility = 'visible';
  }, terminalConfig.showSkipAfter);
  
  // Start the terminal animation after a brief delay
  setTimeout(() => {
    runTerminalScript();
  }, 1000);
  
  // Make terminal focusable
  terminalOverlay.tabIndex = -1;
  terminalOverlay.focus();
}

// Initialize terminal when DOM is loaded
initTerminal();



// ================= MAGNETIC BUTTONS (DESKTOP ONLY) =================
function initMagneticButtons() {
  // Don't initialize on mobile
  if (window.innerWidth <= 768) {
    // Remove magnetic classes on mobile for clean fallback
    document.querySelectorAll('.btn-magnetic, .magnetic-container').forEach(el => {
      if (el.classList.contains('btn-magnetic')) {
        el.classList.remove('btn-magnetic');
        el.style.cssText = '';
      }
      if (el.classList.contains('magnetic-container')) {
        el.classList.remove('magnetic-container');
      }
    });
    return;
  }
  
  const magneticButtons = document.querySelectorAll('.btn-magnetic');
  
  if (!magneticButtons.length) return;
  
  // Track all button instances
  const buttonInstances = new Map();
  
  // Button configuration - can customize per button if needed
  const getButtonConfig = (button) => {
    const baseConfig = {
      magneticStrength: button.classList.contains('btn-primary') ? 0.35 : 0.4,
      magneticRadius: 120,
      movementDamping: 0.15,
      maxMovement: 25,
      enableParticles: true,
      particleCount: button.classList.contains('btn-primary') ? 4 : 5,
      particleColor: button.classList.contains('btn-primary') ? 'accent' : 'white',
    };
    
    return baseConfig;
  };
  
  // Create MagneticButton class for each button
  class MagneticButton {
    constructor(button) {
      this.button = button;
      this.id = button.dataset.magneticId || `btn-${Math.random().toString(36).substr(2, 9)}`;
      this.container = button.closest('.magnetic-container');
      this.particlesContainer = this.container?.querySelector('.magnetic-particles');
      this.config = getButtonConfig(button);
      
      this.isActive = false;
      this.currentX = 0;
      this.currentY = 0;
      this.targetX = 0;
      this.targetY = 0;
      this.rafId = null;
      this.lastParticleTime = 0;
      
      this.init();
    }
    
    init() {
      this.createParticleSystem();
      this.startAnimation();
      this.addEventListeners();
    }
    
    createParticleSystem() {
      // Ensure particles container exists
      if (!this.particlesContainer && this.config.enableParticles) {
        this.particlesContainer = document.createElement('div');
        this.particlesContainer.className = 'magnetic-particles';
        this.particlesContainer.dataset.button = this.id;
        this.container?.appendChild(this.particlesContainer);
      }
    }
    
    createParticles(x, y, angle) {
      if (!this.config.enableParticles || !this.particlesContainer) return;
      
      // Throttle particle creation
      const now = Date.now();
      if (now - this.lastParticleTime < 200) return;
      this.lastParticleTime = now;
      
      for (let i = 0; i < this.config.particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'magnetic-particle';
        
        // Randomize particle properties
        const distance = Math.random() * 20 + 10;
        const particleAngle = angle + (Math.random() - 0.5) * Math.PI / 3;
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 0.4 + 0.4;
        
        // Calculate final position
        const tx = Math.cos(particleAngle) * distance;
        const ty = Math.sin(particleAngle) * distance;
        
        // Set styles
        particle.style.cssText = `
          left: ${x}px;
          top: ${y}px;
          width: ${size}px;
          height: ${size}px;
          --tx: ${tx}px;
          --ty: ${ty}px;
          animation-duration: ${duration}s;
        `;
        
        this.particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode === this.particlesContainer) {
            this.particlesContainer.removeChild(particle);
          }
        }, duration * 1000);
      }
    }
    
    getDistanceFromCenter(mouseX, mouseY) {
      const rect = this.button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      return {
        x: mouseX - centerX,
        y: mouseY - centerY,
        distance: Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2))
      };
    }
    
    updatePosition() {
      // Smooth movement using lerp
      this.currentX += (this.targetX - this.currentX) * this.config.movementDamping;
      this.currentY += (this.targetY - this.currentY) * this.config.movementDamping;
      
      // Calculate distance and magnetic force
      const distance = Math.sqrt(this.currentX * this.currentX + this.currentY * this.currentY);
      const normalizedDistance = Math.min(distance / this.config.magneticRadius, 1);
      const magneticForce = 1 - normalizedDistance;
      
      // Apply magnetic effect with easing
      const easedForce = magneticForce * magneticForce; // Quadratic easing
      const finalX = this.currentX * easedForce * this.config.magneticStrength;
      const finalY = this.currentY * easedForce * this.config.magneticStrength;
      
      // Clamp to max movement
      const clampedX = Math.max(Math.min(finalX, this.config.maxMovement), -this.config.maxMovement);
      const clampedY = Math.max(Math.min(finalY, this.config.maxMovement), -this.config.maxMovement);
      
      // Apply transform if there's significant movement
      if (Math.abs(clampedX) > 0.5 || Math.abs(clampedY) > 0.5) {
        this.button.style.setProperty('--tx', `${clampedX}px`);
        this.button.style.setProperty('--ty', `${clampedY}px`);
      } else {
        this.button.style.removeProperty('--tx');
        this.button.style.removeProperty('--ty');
      }
      
      // Update active state
      const shouldBeActive = distance < this.config.magneticRadius && magneticForce > 0.2;
      
      if (shouldBeActive !== this.isActive) {
        this.isActive = shouldBeActive;
        this.button.classList.toggle('magnetic-active', this.isActive);
        
        // Create particles when becoming active
        if (this.isActive) {
          const rect = this.button.getBoundingClientRect();
          const angle = Math.atan2(this.currentY, this.currentX);
          this.createParticles(rect.width / 2, rect.height / 2, angle);
        }
      }
      
      // Continue animation
      this.rafId = requestAnimationFrame(() => this.updatePosition());
    }
    
    handleMouseMove(e) {
      const { x: deltaX, y: deltaY, distance } = this.getDistanceFromCenter(e.clientX, e.clientY);
      
      this.targetX = deltaX;
      this.targetY = deltaY;
      
      // Create particles when cursor moves near button
      if (distance < this.config.magneticRadius && distance > 20 && Math.random() > 0.8) {
        const rect = this.button.getBoundingClientRect();
        const angle = Math.atan2(deltaY, deltaX);
        this.createParticles(rect.width / 2, rect.height / 2, angle);
      }
    }
    
    resetButton() {
      this.targetX = 0;
      this.targetY = 0;
      this.button.classList.remove('magnetic-active');
      this.button.style.removeProperty('--tx');
      this.button.style.removeProperty('--ty');
    }
    
    addEventListeners() {
      // Throttled mousemove handler
      let lastMoveTime = 0;
      const throttledMouseMove = (e) => {
        const now = Date.now();
        if (now - lastMoveTime > 16) { // ~60fps
          this.handleMouseMove(e);
          lastMoveTime = now;
        }
      };
      
      document.addEventListener('mousemove', throttledMouseMove);
      this.button.addEventListener('mouseleave', () => this.resetButton());
      
      // Store for cleanup
      this.eventListeners = {
        mousemove: throttledMouseMove,
        mouseleave: () => this.resetButton()
      };
    }
    
    startAnimation() {
      this.updatePosition();
    }
    
    destroy() {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      
      // Remove event listeners
      if (this.eventListeners) {
        document.removeEventListener('mousemove', this.eventListeners.mousemove);
        this.button.removeEventListener('mouseleave', this.eventListeners.mouseleave);
      }
      
      // Reset button styles
      this.resetButton();
      this.button.classList.remove('magnetic-active');
      this.button.style.cssText = '';
    }
  }
  
  // Initialize all magnetic buttons
  magneticButtons.forEach(button => {
    const instance = new MagneticButton(button);
    buttonInstances.set(button, instance);
  });
  
  // Handle window resize
  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Reset all buttons on resize
      buttonInstances.forEach(instance => instance.resetButton());
    }, 100);
  };
  
  window.addEventListener('resize', handleResize);
  
  // Clean up function
  return () => {
    buttonInstances.forEach(instance => instance.destroy());
    window.removeEventListener('resize', handleResize);
    buttonInstances.clear();
  };
}

// Initialize magnetic buttons
function setupMagneticButtons() {
  // Only run on desktop
  if (window.innerWidth > 768) {
    // Clean up any existing instances
    if (window.magneticCleanup) {
      window.magneticCleanup();
    }
    
    // Initialize new instances
    window.magneticCleanup = initMagneticButtons();
  } else {
    // Mobile: remove all magnetic effects
    document.querySelectorAll('.btn-magnetic').forEach(btn => {
      btn.classList.remove('btn-magnetic', 'magnetic-active');
      btn.style.cssText = '';
    });
    document.querySelectorAll('.magnetic-container').forEach(container => {
      container.classList.remove('magnetic-container');
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure CSS is loaded
  setTimeout(setupMagneticButtons, 100);
});

// Handle window resize (including orientation changes)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(setupMagneticButtons, 250);
});

// Clean up on page hide
document.addEventListener('visibilitychange', () => {
  if (document.hidden && window.magneticCleanup) {
    window.magneticCleanup();
  }
});

// Re-initialize when page becomes visible again
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && window.innerWidth > 768) {
    setTimeout(setupMagneticButtons, 100);
  }
});

// ================= COMPLETE SOUND SYSTEM - ULTIMATE FIX =================
class CompleteSoundSystem {
  constructor() {
    this.audioContext = null;
    this.muted = true; // Start muted
    this.initialized = false;
    this.sounds = {};
    this.terminalClosed = false;
    this.terminalTypingHandler = null; // For typing sounds
    
    this.init();
  }
  
  init() {
    this.createControls();
    this.setupEventListeners();
    this.loadPreferences(); // LOAD FIRST to set correct initial state
  }
  
  createControls() {
    this.soundToggle = document.getElementById('soundToggle');
    this.soundWave = document.querySelector('.sound-wave');
    this.updateToggleUI(); // Update UI based on loaded preferences
    
    if (this.soundToggle) {
      this.soundToggle.addEventListener('click', () => this.toggleMute());
    }
  }
  
  setupEventListeners() {
    // Initialize audio on first user interaction
    const initAudio = () => {
      if (!this.initialized) {
        this.initializeAudioContext();
      }
    };
    
    // Listen for ANY interaction to initialize
    ['click', 'keydown', 'mousemove'].forEach(event => {
      document.addEventListener(event, initAudio, { once: true });
    });
  }
  
  initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.create3CoolSounds();
      this.initialized = true;
      
      // Add sounds to ALL interactive elements
      this.addSoundsEverywhere();
      
      console.log('🔊 Sound system initialized');
    } catch (error) {
      console.warn('Audio not supported');
      // Even if audio fails, update UI to show muted state
      this.muted = true;
      this.updateToggleUI();
    }
  }
  
  create3CoolSounds() {
    // 1. HOVER SOUND
    this.sounds.hover = () => {
      if (!this.canPlaySound()) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.type = 'sine';
      
      const now = this.audioContext.currentTime;
      oscillator.frequency.setValueAtTime(400, now);
      oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      
      oscillator.start(now);
      oscillator.stop(now + 0.25);
      
      this.visualize();
    };
    
    // 2. CLICK SOUND
    this.sounds.click = () => {
      if (!this.canPlaySound()) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.type = 'square';
      
      const now = this.audioContext.currentTime;
      oscillator.frequency.setValueAtTime(600, now);
      oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.1);
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      oscillator.start(now);
      oscillator.stop(now + 0.15);
      
      this.visualize();
    };
    
    // 3. KEYBOARD SOUND - For terminal typing
    this.sounds.keyboard = () => {
      if (!this.canPlaySound() || this.terminalClosed) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.type = 'sawtooth';
      
      const now = this.audioContext.currentTime;
      oscillator.frequency.setValueAtTime(100, now);
      oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.03);
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      
      oscillator.start(now);
      oscillator.stop(now + 0.05);
      
      this.visualize();
    };
  }
  
  addSoundsEverywhere() {
    setTimeout(() => {
      // Select ALL interactive elements EXCEPT hero image
      const selectors = [
        'a', 'button', '.nav-list li', '.nav-toggle',
        '.service-card', '.portfolio-card', '.blog-card', '.skill-group',
        '.stat-card', '.meta-item',
        'img:not(.hero-image)', '.image-layer', '.img-holder',
        'li', '.skill-list li', '.service-points li', '.social-list li',
        '.about-content p', '.about-lead', '.image-stack',
        '.footer-card', '.footer-link', '.skill-card',
        '.rain-toggle', '.intensity-btn',
        '.terminal-controls button', '.btn-skip'
      ];
      
      const selector = selectors.join(', ');
      const elements = document.querySelectorAll(selector);
      
      elements.forEach(element => {
        if (element.classList.contains('hero-image')) return;
        
        // Add hover sound to everything
        element.addEventListener('mouseenter', () => {
          this.sounds.hover();
          
          // Add glow to service cards only
          if (element.classList.contains('service-card')) {
            element.classList.add('sound-playing');
            setTimeout(() => {
              element.classList.remove('sound-playing');
            }, 600);
          }
        });
        
        // Add click sound to clickable elements
        const isClickable = element.tagName === 'A' || element.tagName === 'BUTTON' || 
                           element.tagName === 'INPUT' || element.hasAttribute('onclick');
        
        if (isClickable) {
          element.addEventListener('click', (e) => {
            // Play sound for ALL clicks
            this.sounds.click();
            
            // Add glow to service cards
            if (element.classList.contains('service-card')) {
              element.classList.add('sound-playing');
              setTimeout(() => {
                element.classList.remove('sound-playing');
              }, 600);
            }
            
            // Allow external links to navigate
            if (element.href && !element.href.includes('#') && 
                element.getAttribute('target') === '_blank') {
              return;
            }
            
            // Prevent default for internal navigation
            if (element.href && element.href.includes('#')) {
              e.preventDefault();
              const targetId = element.getAttribute('href');
              const targetElement = document.querySelector(targetId);
              if (targetElement) {
                setTimeout(() => {
                  targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }
          });
        }
      });
      
      console.log(`✅ Added 3 sounds to ${elements.length} elements`);
      
      // Setup terminal with typing detection
      this.setupTerminalTypingSounds();
      
    }, 1000);
  }
  
setupTerminalTypingSounds() {
  const terminal = document.querySelector('.terminal-overlay');
  
  if (!terminal) return;
  
  // Play keyboard sound for ANY click in terminal
  terminal.addEventListener('click', () => {
    if (!this.terminalClosed) {
      this.sounds.keyboard();
    }
  });
  
  // Also play for global key presses when terminal is visible
  document.addEventListener('keydown', (e) => {
    if (!this.terminalClosed && 
        terminal.style.display !== 'none' &&
        terminal.style.opacity !== '0') {
      this.sounds.keyboard();
    }
  });
  
  console.log('⌨️ Terminal sounds: Click anywhere in terminal for keyboard sound');
}
  
  canPlaySound() {
    return this.audioContext && !this.muted && this.initialized;
  }
  
  visualize() {
    if (this.soundWave) {
      this.soundWave.classList.add('active');
      setTimeout(() => {
        this.soundWave.classList.remove('active');
      }, 500);
    }
  }
  
  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('soundMuted', this.muted);
    this.updateToggleUI();
    
    // Play click sound when turning ON
    if (!this.muted && this.sounds.click) {
      setTimeout(() => this.sounds.click(), 50);
    }
  }
  
  updateToggleUI() {
    if (this.soundToggle) {
      const icon = this.soundToggle.querySelector('i');
      
      // IMPORTANT FIX: Show correct initial state
      if (this.muted) {
        this.soundToggle.classList.remove('active');
        if (icon) {
          icon.className = 'fas fa-volume-mute';
        }
      } else {
        this.soundToggle.classList.add('active');
        if (icon) {
          icon.className = 'fas fa-volume-up';
        }
      }
    }
  }
  
  loadPreferences() {
    // FIX: Load saved preference BEFORE setting up UI
    const savedMute = localStorage.getItem('soundMuted');
    
    // Default to muted if no preference saved
    if (savedMute === null) {
      this.muted = true; // Default to muted
      localStorage.setItem('soundMuted', 'true');
    } else {
      this.muted = savedMute === 'true';
    }
    
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.muted = true;
      localStorage.setItem('soundMuted', 'true');
    }
    
    // Update UI immediately
    this.updateToggleUI();
    
    console.log(`🔊 Sound loaded: ${this.muted ? 'MUTED' : 'ON'}`);
  }
}

// ================= INITIALIZE =================
document.addEventListener('DOMContentLoaded', function() {
  const soundSystem = new CompleteSoundSystem();
  window.soundSystem = soundSystem;
  
  // Terminal skip (backup)
  const skipTerminal = document.getElementById('skipTerminal');
  const terminalOverlay = document.getElementById('terminalOverlay');
  
  if (skipTerminal && terminalOverlay) {
    skipTerminal.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (soundSystem.sounds.click) {
        soundSystem.sounds.click();
      }
      
      soundSystem.terminalClosed = true;
      
      terminalOverlay.style.opacity = '0';
      setTimeout(() => {
        terminalOverlay.style.display = 'none';
      }, 500);
    });
  }
  
  // Your existing code continues...
});

// Skills with Popup - Complete
document.addEventListener('DOMContentLoaded', function() {
    // ALL your skills from badges plus extras
const allSkills = [
    // Languages
    {
        name: 'JavaScript',
        icon: 'devicon-javascript-plain colored',
        category: 'Language',
        description: 'The language I live in; turning ideas into interactive apps.',
        experience: '3+ years',
        level: 'Daily use',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=javascript'
    },
    {
        name: 'TypeScript',
        icon: 'devicon-typescript-plain colored',
        category: 'Language',
        description: 'Typed JavaScript that keeps my code sane and scalable.',
        experience: '1 year',
        level: 'Comfortable',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=typescript'
    },
    {
        name: 'C++',
        icon: 'devicon-cplusplus-plain colored',
        category: 'Language',
        description: 'For when performance and control really matter.',
        experience: '2+ years',
        level: 'Comfortable',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=c%2B%2B'
    },
    {
        name: 'Java',
        icon: 'devicon-java-plain colored',
        category: 'Language',
        description: 'OOP ninja skills for Android and big apps.',
        experience: '2+ years',
        level: 'Exploring',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=java'
    },
    {
        name: 'PHP',
        icon: 'devicon-php-plain colored',
        category: 'Language',
        description: 'Server-side magic for web projects.',
        experience: '2+ years',
        level: 'Comfortable',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=php'
    },
    
    // Frontend
    {
        name: 'HTML5',
        icon: 'devicon-html5-plain colored',
        category: 'Frontend',
        description: 'Building solid structure for every project I touch.',
        experience: '3+ years',
        level: 'Daily use',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=html'
    },
    {
        name: 'CSS3',
        icon: 'devicon-css3-plain colored',
        category: 'Frontend',
        description: 'Pixel-perfect styling and smooth animations.',
        experience: '3+ years',
        level: 'Daily use',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=css'
    },
    {
        name: 'React',
        icon: 'devicon-react-plain colored',
        category: 'Frontend',
        description: 'Turning messy UI ideas into neat, reusable components.',
        experience: '2+ years',
        level: 'Daily use',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=react'
    },
    {
        name: 'Tailwind CSS',
        icon: 'devicon-tailwindcss-plain colored',
        category: 'Frontend',
        description: 'Rapid styling wizardry without leaving HTML.',
        experience: '1+ year',
        level: 'Comfortable',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=tailwind'
    },
    
    // Backend
    {
        name: 'Node.js',
        icon: 'devicon-nodejs-plain colored',
        category: 'Backend',
        description: 'JS backend power; APIs and services made simple.',
        experience: '2+ years',
        level: 'Daily use',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=node'
    },
    {
        name: 'Express.js',
        icon: 'devicon-express-original colored',
        category: 'Backend',
        description: 'Minimalist framework, maximum flexibility.',
        experience: '2+ years',
        level: 'Daily use',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=express'
    },
    
    // Databases
    {
        name: 'MySQL',
        icon: 'devicon-mysql-plain colored',
        category: 'Database',
        description: 'Structured, fast, reliable data storage.',
        experience: '2+ years',
        level: 'Daily use',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=mysql'
    },
    {
        name: 'MongoDB',
        icon: 'devicon-mongodb-plain colored',
        category: 'Database',
        description: 'Flexible, modern NoSQL playground.',
        experience: '1.5 years',
        level: 'Comfortable',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=mongodb'
    },
    {
        name: 'SQL',
        icon: 'fas fa-database',
        category: 'Database',
        description: 'Query master for any database I touch.',
        experience: '2+ years',
        level: 'Daily use',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=sql'
    },
    
    // Tools & Systems
    {
        name: 'Git',
        icon: 'devicon-git-plain colored',
        category: 'Tool',
        description: 'Version control like a boss.',
        experience: '3+ years',
        level: 'Daily use',
        github: 'https://github.com/Yeabtsega-Tesfaye'
    },
    {
        name: 'Linux',
        icon: 'devicon-linux-plain',
        category: 'Tool',
        description: 'Command line playground and server control.',
        experience: '2+ years',
        level: 'Comfortable',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=linux'
    },
    {
        name: 'npm',
        icon: 'devicon-npm-original-wordmark colored',
        category: 'Tool',
        description: 'Managing JS packages like a pro.',
        experience: '3+ years',
        level: 'Daily use',
        github: 'https://github.com/Yeabtsega-Tesfaye'
    },
    {
        name: 'VS Code',
        icon: 'devicon-vscode-plain colored',
        category: 'Tool',
        description: 'My coding cockpit for everything.',
        experience: '3+ years',
        level: 'Daily use',
        github: '#'
    },
    {
        name: 'GitHub',
        icon: 'devicon-github-plain',
        category: 'Tool',
        description: 'Collaboration hub and code HQ.',
        experience: '3+ years',
        level: 'Daily use',
        github: 'https://github.com/Yeabtsega-Tesfaye'
    },
    
    // AI Tools
    {
        name: 'ChatGPT',
        icon: 'assets/icons/chatgpt-icon.svg',
        category: 'AI Tool',
        description: 'My AI partner for coding, debugging, and brainstorming.',
        experience: '3+ year',
        level: 'Daily use',
        github: '#'
    },
    {
        name: 'GitHub Copilot',
        icon: 'assets/icons/github-copilot-icon.svg',
        category: 'AI Tool',
        description: 'AI coding buddy that speeds up the grind.',
        experience: '1+ year',
        level: 'Comfortable',
        github: 'https://github.com/Yeabtsega-Tesfaye'
    },
    {
        name: 'Cursor',
        icon: 'assets/icons/cursor-ai-code-icon.svg',
        category: 'AI Tool',
        description: 'Smart editor AI to keep code neat and fast.',
        experience: '6 months',
        level: 'Exploring',
        github: '#'
    },
    {
        name: 'Claude',
        icon: 'assets/icons/claude-ai-icon.svg',
        category: 'AI Tool',
        description: 'AI brain for complex problems and ideas.',
        experience: '6 months',
        level: 'Exploring',
        github: '#'
    },
    
    // DevOps / Cloud
    {
        name: 'Docker',
        icon: 'devicon-docker-plain colored',
        category: 'DevOps',
        description: 'Containers make my dev life painless.',
        experience: '1 year',
        level: 'Comfortable',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=docker'
    },
    {
        name: 'AWS',
        icon: 'devicon-amazonwebservices-plain colored',
        category: 'Cloud',
        description: 'Cloud playground for deploying and scaling apps.',
        experience: '1 year',
        level: 'Comfortable',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=aws'
    },
    {
        name: 'REST API',
        icon: 'assets/icons/rest-api-icon.svg',
        category: 'Backend',
        description: 'Crafting clean endpoints for frontends to love.',
        experience: '2+ years',
        level: 'Daily use',
        github: 'https://github.com/Yeabtsega-Tesfaye?q=api'
    },
    {
        name: 'JSON',
        icon: 'devicon-json-plain colored',
        category: 'Data',
        description: 'Data interchange format for web applications.',
        experience: '3+ years',
        level: 'Daily use',
        github: '#'
    }
];

    // Initialize
    createSkillsGrid();
    setupPopup();

    function createSkillsGrid() {
        const grid = document.querySelector('.skills-grid');
        if (!grid) return;
        
grid.innerHTML = allSkills.map(skill => {
    // Check if it's an SVG path
    const iconHTML = skill.icon.includes('.svg') 
        ? `<img src="${skill.icon}" alt="${skill.name}" class="skill-svg-icon">`
        : `<i class="${skill.icon}"></i>`;
    
    return `
        <div class="skill-card" data-skill="${skill.name.toLowerCase()}">
            <div class="skill-icon">
                ${iconHTML}
            </div>
            <div class="skill-name">${skill.name}</div>
        </div>
    `;
}).join('');
        
        // Add click handlers
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('click', function() {
                const skillName = this.dataset.skill;
                openSkillPopup(skillName);
            });
        });
    }

    function setupPopup() {
        const popup = document.getElementById('skillPopup');
        const closeBtn = document.querySelector('.popup-close');
        
        // Close button
        closeBtn.addEventListener('click', closePopup);
        
        // Close on overlay click
        popup.addEventListener('click', function(e) {
            if (e.target.classList.contains('popup-overlay')) {
                closePopup();
            }
        });
        
        // Close on ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                closePopup();
            }
        });
    }

    function openSkillPopup(skillName) {
        const skill = allSkills.find(s => s.name.toLowerCase() === skillName) || allSkills[0];
        const popup = document.getElementById('skillPopup');
        
        // Update popup content
        document.getElementById('popupTitle').textContent = skill.name;
        if (skill.icon.includes('.svg')) {
            document.getElementById('popupIcon').innerHTML = `<img src="${skill.icon}" alt="${skill.name}" class="skill-svg-icon-pop">`;
        } else {
            document.getElementById('popupIcon').innerHTML = `<i class="${skill.icon}"></i>`;
        }
        document.getElementById('popupCategory').textContent = skill.category;
        document.getElementById('popupDescription').textContent = skill.description;
        document.getElementById('popupExperience').textContent = skill.experience;
        document.getElementById('popupLevel').textContent = skill.level;
        document.getElementById('popupGithub').href = skill.github;
        
        // Show popup and disable body scroll
        popup.classList.add('active');
        document.body.classList.add('popup-active');
        document.documentElement.classList.add('popup-open');
    }

    function closePopup() {
        const popup = document.getElementById('skillPopup');
        popup.classList.remove('active');
        document.body.classList.remove('popup-active');
        document.documentElement.classList.remove('popup-open');
    }

    
});