// Global Variables
let terminalHistory = [];
let terminalHistoryIndex = -1;

// Data
const typewriterTexts = [
    "Red Team Specialist",
    "Digital Forensics Expert", 
    "Malware Analyst",
    "Security Researcher",
    "Threat Hunter"
];

const skillsData = [
    {
        title: 'Red Teaming & Penetration Testing',
        icon: '⚔️',
        skills: [
            { name: 'Red Team Operations', level: 92 },
            { name: 'RedTeam Infra Development', level: 88 },
            { name: 'Advanced Process Injection', level: 85 },
            { name: 'Threat Hunting', level: 90 },
        ]
    },
    {
        title: 'Digital Forensics & Incident Response',
        icon: '🔍',
        skills: [
            { name: 'Digital Forensics and Incident Response', level: 95 },
            { name: 'Windows Forensics', level: 92 },
            { name: 'Volatility3 Memory Analysis', level: 90 },
            { name: 'OSForensics', level: 88 },
        ]
    },
    {
        title: 'Malware Analysis & Development',
        icon: '🦠',
        skills: [
            { name: 'Malware Analysis', level: 90 },
            { name: 'Reverse Engineering', level: 87 },
            { name: 'Malware Development', level: 85 },
            { name: 'IDA Pro Analysis', level: 88 },
        ]
    },
    {
        title: 'Programming & Scripting',
        icon: '💻',
        skills: [
            { name: 'Python', level: 95 },
            { name: 'Assembly', level: 85 },
            { name: 'PowerShell', level: 90 },
            { name: 'Bash', level: 88 },
        ]
    },
    {
        title: 'AI & Modern Technologies',
        icon: '�',
        skills: [
            { name: 'Model Context Protocol (MCP) servers', level: 92 },
            { name: 'Gen AI', level: 85 },
            { name: 'AI-powered Threat Hunting', level: 88 },
            { name: 'Binary Analysis with AI', level: 85 },
        ]
    }
];

const toolsData = [
    'Python', 'Assembly', 'PowerShell', 'Bash', 'Volatility3', 'IDA Pro',
    'Belkasoft', 'OSForensics', 'Kali Linux', 'Metasploit', 'Burp Suite',
    'Wireshark', 'YARA', 'Ghidra', 'x64dbg', 'OllyDbg', 'Nmap', 'OSINT Tools',
    'Mythic C2', 'Sliver C2', 'Havoc C2', 'Empire C2', 'Sysinternals', 
    'MITRE ATT&CK', 'MITRE D3FEND', 'GHDB', 'Cuckoo Sandbox', 
    'Red Team Infra Development', 'CloudFlare', 'Model Context Protocol', 'AI-powered Analysis'
];

const projectsData = [
    {
        title: 'Self-Deleting-Exploit/Payload',
        description: 'Advanced Process Injection with Self Deletion Capabilities: A Windows 11 24H2 Compatible Implementation',
        technologies: ['C++', 'Assembly', 'Windows API', 'Process Injection'],
        status: 'development',
        type: 'Malware Development',
        features: [
            'Advanced process injection techniques',
            'Self-deletion capabilities',
            'Windows 11 24H2 compatibility',
            'Stealth execution methods'
        ],
        github: 'https://github.com/0xOb5k-J/Self_Deleting_Exploit'
    },
    {
        title: 'Threat-Hunting MCP',
        description: 'An automated AI powered framework for super fast and accurate threat hunting.',
        technologies: ['Python', 'AI/ML', 'Model Context Protocol', 'Threat Intelligence'],
        status: 'development',
        type: 'AI Security Tool',
        features: [
            'AI-powered threat detection',
            'Automated threat hunting',
            'Real-time analysis',
            'MCP integration with VS Code'
        ]
    },
    {
        title: 'Volatility3-MCP',
        description: 'MCP Server based on volatility3 with respect to Github Copilot VS Code extension as MCP Client (but is compatible with any mcp client)',
        technologies: ['Python', 'Volatility3', 'Model Context Protocol', 'Memory Analysis'],
        status: 'completed',
        type: 'Digital Forensics',
        features: [
            'Memory analysis automation',
            'AI-assisted forensic analysis',
            'VS Code integration',
            'Comprehensive artifact extraction'
        ],
        github: 'https://github.com/0xOb5k-J/volatility3-mcp'
    },
    {
        title: 'IDApro-MCP',
        description: 'A comprehensive binary analysis toolkit that bridges IDA Pro with modern AI assistants through the Model Context Protocol (MCP).',
        technologies: ['Python', 'IDA Pro', 'Model Context Protocol', 'Binary Analysis'],
        status: 'completed',
        type: 'Reverse Engineering',
        features: [
            'AI-powered binary analysis',
            'IDA Pro automation',
            'Advanced reverse engineering',
            'Malware analysis capabilities'
        ],
        github: 'https://github.com/0xOb5k-J/IDApro-MCP'
    }
];

const contactMethods = [
    {
        method: 'Email',
        value: 'varshith14.jakkaraju@gmail.com',
        icon: '📧',
        command: 'sendmail -t varshith14.jakkaraju@gmail.com'
    },
    {
        method: 'LinkedIn',
        value: '/in/jakkaraju-varshith',
        icon: '💼',
        command: 'curl -X GET linkedin.com/in/jakkaraju-varshith'
    },
    {
        method: 'GitHub',
        value: '@0xOb5k-J',
        icon: '🐙',
        command: 'git clone github.com/0xOb5k-J'
    },
    {
        method: 'Phone',
        value: '+91 7032419517',
        icon: '📱',
        command: 'call +91-7032419517'
    }
];

// Terminal Commands
const terminalCommands = {
    help: () => [
        'Available commands:',
        '  whoami     - Display user information',
        '  skills     - List security skills',
        '  projects   - Show project portfolio',
        '  contact    - Display contact information',
        '  education  - Show academic background',
        '  achievements - List awards and recognition',
        '  certifications - Show current certifications',
        '  volatility - Demo volatility3-mcp usage',
        '  ida        - Demo IDApro-MCP usage',
        '  clear      - Clear terminal',
        '  exit       - Close terminal',
        ''
    ],
    whoami: () => [
        'User: Jakkaraju Varshith',
        'Role: Cybersecurity Student | Red Team Specialist',
        'Education: M.Sc Cyber Security and Digital Forensics (2024-2026)',
        'Status: Currently pursuing CRTA certification',
        ''
    ],
    skills: () => [
        'Core Security Skills:',
        '├── Red Teaming & Infrastructure Development (Expert)',
        '├── Digital Forensics and Incident Response (Expert)',
        '├── Malware Analysis & Development (Advanced)',
        '├── Threat Hunting (Advanced)',
        '├── Reverse Engineering (Advanced)',
        '├── Model Context Protocol Development (Expert)',
        '└── AI-powered Security Analysis (Advanced)',
        '',
        'Programming Languages:',
        '├── Python (Expert)',
        '├── Assembly (Advanced)',
        '├── PowerShell (Advanced)',
        '└── Bash (Advanced)',
        '',
        'Certifications:',
        '├── Certified Red-Team Infrastructure Developer (CRT-ID)',
        '├── Microsoft Cybersecurity Architect',
        '├── ISO/IEC 27001:2022 Lead Auditor',
        '└── Multiple OPSWAT Associate Certifications',
        ''
    ],
    projects: () => [
        'Active Security Projects:',
        '├── Self-Deleting-Exploit/Payload [DEVELOPMENT]',
        '├── Threat-Hunting MCP [DEVELOPMENT]',
        '├── Volatility3-MCP [COMPLETED]',
        '└── IDApro-MCP [COMPLETED]',
        '',
        'GitHub: https://github.com/0xOb5k-J',
        ''
    ],
    contact: () => [
        'Contact Information:',
        '📧 Email: varshith14.jakkaraju@gmail.com',
        '💼 LinkedIn: https://in.linkedin.com/in/jakkaraju-varshith',
        '🐙 GitHub: https://github.com/0xOb5k-J',
        '📱 Phone: +91 7032419517',
        '',
        'All communications secure and confidential',
        ''
    ],
    nmap: () => [
        'Starting Nmap scan...',
        'nmap -sS -sV -O target.example.com',
        '',
        'PORT     STATE SERVICE VERSION',
        '22/tcp   open  ssh     OpenSSH 8.0',
        '80/tcp   open  http    Apache 2.4.41',
        '443/tcp  open  https   Apache 2.4.41',
        '3389/tcp open  ms-wbt-server',
        '',
        'OS: Linux 3.X|4.X (95% confidence)',
        'Scan completed successfully',
        ''
    ],
    exploit: () => [
        'Exploit Development Framework v3.7',
        '',
        'Available exploits:',
        '├── CVE-2023-1234 (Remote Code Execution)',
        '├── CVE-2023-5678 (Privilege Escalation)', 
        '├── Custom Web Shell Generator',
        '└── Buffer Overflow Toolkit',
        '',
        'Note: For authorized testing only',
        ''
    ],
    education: () => [
        'Educational Background:',
        '',
        'M.Sc Cyber Security and Digital Forensics',
        '├── Institution: Rashtriya Raksha University, Gandhinagar',
        '├── Duration: 2024 - 2026',
        '├── GPA: 7.37/10',
        '└── Focus: Red Team Operations, DFIR & Threat Hunting',
        '',
        'B.Sc (Hons) Forensic Science',
        '├── Institution: G.D Goenka University',
        '├── Duration: 2021 - 2024',
        '├── GPA: 8.37/10',
        '└── Focus: Digital Evidence Analysis & Cybersecurity',
        ''
    ],
    achievements: () => [
        'Awards & Recognition:',
        '',
        '🏆 1st Position - CodeArena 2.0 (SIH25 Internal Hackathon)',
        '🥈 1st Runner up - KURUKSHETRA System Security Research',
        '🎯 Grand Finalist - Smart India Hackathon 2024',
        '🏅 Multiple CTF Competition Winner',
        '',
        'Volunteering Experience:',
        '├── Red Teamer - Internal Live Fire Exercises (RRU)',
        '├── NXC 2025 - Red Teamer & AI Training Assistant',
        '├── CII-SECX 2025 - Red Teamer & AI Training Assistant',
        '└── NXC 2024 - Blue Team & DFIR Training Assistant',
        ''
    ],
    certifications: () => [
        'Current Certifications:',
        '',
        '├── Certified Red-Team Infrastructure Developer (CRT-ID) - CWL',
        '├── Microsoft Cybersecurity Architect - Microsoft',
        '├── ISO/IEC 27001:2022 Lead Auditor - Mastermind',
        '├── Certified Network Security Practitioner (CNSP)',
        '├── Multiple OPSWAT Associate Certifications',
        '├── Belkasoft Digital Forensics Certifications',
        '└── OSForensics Triage Certification',
        '',
        'In Progress:',
        '└── Certified Red Team Analyst (CRTA) - CWL',
        ''
    ],
    volatility: () => [
        'Volatility3-MCP Demo:',
        'volatility3-mcp --profile Win10x64 --analyze memory.dump',
        '',
        'Loading MCP server for memory analysis...',
        'AI Assistant: Analyzing memory dump for threats...',
        '',
        'Found suspicious processes:',
        '├── PID 1337: suspicious.exe (Malware detected)',
        '├── PID 2024: powershell.exe (Encoded command)',
        '└── Network connections to malicious IPs',
        '',
        'GitHub: https://github.com/0xOb5k-J/volatility3-mcp',
        ''
    ],
    ida: () => [
        'IDApro-MCP Demo:',
        'ida-mcp --analyze malware.bin --ai-assist',
        '',
        'Loading binary analysis with AI assistance...',
        'IDA Pro + GitHub Copilot integration active',
        '',
        'Analysis Results:',
        '├── Entry Point: 0x401000',
        '├── Packer: UPX detected',
        '├── Strings: C2 domains identified',
        '└── Functions: 127 identified, 23 suspicious',
        '',
        'GitHub: https://github.com/0xOb5k-J/IDApro-MCP',
        ''
    ],
    clear: () => {
        clearTerminal();
        return '';
    }
};

// Initialize on DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMatrix();
    initializeTypewriter();
    initializeFloatingObjects();
    initializeScrollEffects();
    initializeNavigation();
    initializeSkills();
    initializeProjects();
    initializeContact();
    initializeTerminal();
    initializeGlitchEffects();
    initializeIntersectionObserver();
});

// Matrix Background
function initializeMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px JetBrains Mono, monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typewriter Effect
function initializeTypewriter() {
    const typewriter = document.getElementById('typewriter');
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = typewriterTexts[currentTextIndex];
        
        if (!isDeleting) {
            typewriter.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 2000);
            }
        } else {
            typewriter.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
            }
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }
    
    type();
}

// Floating Objects
function initializeFloatingObjects() {
    const container = document.getElementById('floatingObjects');
    
    const objects = [
        { type: 'cube', delay: 0 },
        { type: 'triangle', delay: 1 },
        { type: 'circle', delay: 2 }
    ];
    
    objects.forEach((obj, index) => {
        const element = document.createElement('div');
        element.className = `floating-object ${obj.type}`;
        element.style.left = `${20 + index * 30}%`;
        element.style.top = `${30 + index * 20}%`;
        element.style.animationDelay = `${obj.delay}s`;
        container.appendChild(element);
    });
}

// Navigation
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            scrollToSection(section);
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// Skills Section
function initializeSkills() {
    const container = document.getElementById('skillsContainer');
    
    skillsData.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'skill-category';
        
        categoryElement.innerHTML = `
            <div class="category-header">
                <div class="category-icon">${category.icon}</div>
                <h3 class="category-title">${category.title}</h3>
            </div>
            <ul class="skill-list">
                ${category.skills.map(skill => `
                    <li class="skill-list-item">
                        <div class="skill-info">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-level">${skill.level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" data-level="${skill.level}"></div>
                        </div>
                    </li>
                `).join('')}
            </ul>
        `;
        
        container.appendChild(categoryElement);
    });
    
    // Tools
    const toolsContainer = document.getElementById('toolsContainer');
    toolsData.forEach(tool => {
        const toolElement = document.createElement('span');
        toolElement.className = 'tool-tag';
        toolElement.textContent = tool;
        toolsContainer.appendChild(toolElement);
    });
}

// Projects Section
function initializeProjects() {
    const container = document.getElementById('projectsContainer');
    
    projectsData.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        
        projectElement.innerHTML = `
            <div class="project-header">
                <div class="project-title-row">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-badges">
                        <span class="project-badge status-${project.status}">${project.status.toUpperCase()}</span>
                        <span class="project-badge">${project.type}</span>
                    </div>
                </div>
                <p class="project-description">${project.description}</p>
            </div>
            <div class="project-body">
                <div class="project-features">
                    <h4 class="features-title">Key Features:</h4>
                    <ul class="features-list">
                        ${project.features.map(feature => `
                            <li class="feature-item">${feature}</li>
                        `).join('')}
                    </ul>
                </div>
                <div class="project-tech">
                    <h4 class="tech-title">Technologies:</h4>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                </div>
                <div class="project-actions">
                    <button class="hacker-btn primary">View Details</button>
                    ${project.github ? `<a href="${project.github}" target="_blank" class="hacker-btn secondary">GitHub</a>` : '<button class="hacker-btn secondary">Live Demo</button>'}
                </div>
            </div>
        `;
        
        container.appendChild(projectElement);
    });
}

// Contact Section
function initializeContact() {
    const container = document.getElementById('contactMethods');
    
    contactMethods.forEach(method => {
        const methodElement = document.createElement('div');
        methodElement.className = 'contact-method';
        
        methodElement.innerHTML = `
            <div class="contact-info">
                <span class="contact-icon">${method.icon}</span>
                <div class="contact-details">
                    <h4>${method.method}</h4>
                    <p>${method.value}</p>
                    <div class="contact-command">${method.command}</div>
                </div>
            </div>
        `;
        
        container.appendChild(methodElement);
    });
    
    // Contact form
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Message sent successfully! (This is a demo)');
        this.reset();
    });
}

// Terminal
function initializeTerminal() {
    const terminalInput = document.getElementById('terminalInput');
    
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim();
            executeTerminalCommand(command);
            this.value = '';
            
            // Add to history
            if (command) {
                terminalHistory.push(command);
                terminalHistoryIndex = terminalHistory.length;
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (terminalHistoryIndex > 0) {
                terminalHistoryIndex--;
                this.value = terminalHistory[terminalHistoryIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (terminalHistoryIndex < terminalHistory.length - 1) {
                terminalHistoryIndex++;
                this.value = terminalHistory[terminalHistoryIndex];
            } else {
                terminalHistoryIndex = terminalHistory.length;
                this.value = '';
            }
        } else if (e.key === 'Escape') {
            closeTerminal();
        }
    });
}

function executeTerminalCommand(command) {
    const content = document.getElementById('terminalContent');
    
    // Add command to display
    const commandDiv = document.createElement('div');
    commandDiv.innerHTML = `<span style="color: var(--matrix-green);">~/security_toolkit$ </span>${command}`;
    content.appendChild(commandDiv);
    
    if (command === 'exit') {
        closeTerminal();
        return;
    }
    
    // Execute command
    const cmd = command.toLowerCase();
    if (terminalCommands[cmd]) {
        const output = terminalCommands[cmd]();
        if (Array.isArray(output)) {
            output.forEach(line => {
                const lineDiv = document.createElement('div');
                lineDiv.textContent = line;
                if (line.includes('ERROR') || line.includes('not found')) {
                    lineDiv.style.color = '#ff5555';
                }
                content.appendChild(lineDiv);
            });
        } else if (output) {
            const outputDiv = document.createElement('div');
            outputDiv.textContent = output;
            content.appendChild(outputDiv);
        }
    } else if (command.trim() === '') {
        const emptyDiv = document.createElement('div');
        content.appendChild(emptyDiv);
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `Command not found: ${command}<br>Type "help" for available commands`;
        errorDiv.style.color = '#ff5555';
        content.appendChild(errorDiv);
        
        const emptyDiv = document.createElement('div');
        content.appendChild(emptyDiv);
    }
    
    // Scroll to bottom
    content.scrollTop = content.scrollHeight;
}

function clearTerminal() {
    const content = document.getElementById('terminalContent');
    content.innerHTML = '<div>Terminal cleared</div><div></div>';
}

function openTerminal() {
    const modal = document.getElementById('terminalModal');
    modal.classList.add('active');
    document.getElementById('terminalInput').focus();
}

function closeTerminal() {
    const modal = document.getElementById('terminalModal');
    modal.classList.remove('active');
}

// Scroll Effects
function initializeScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Update navigation active state
        updateNavigationOnScroll();
        
        lastScrollY = currentScrollY;
    });
}

function updateNavigationOnScroll() {
    const sections = ['hero', 'about', 'education', 'skills', 'projects', 'contact'];
    const navItems = document.querySelectorAll('.nav-item');
    
    let currentSection = 'hero';
    
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = sectionId;
            }
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === currentSection) {
            item.classList.add('active');
        }
    });
}

// Glitch Effects
function initializeGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            element.classList.add('active');
            setTimeout(() => {
                element.classList.remove('active');
            }, 200);
        }, 3000);
    });
}

// Intersection Observer for Animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill progress bars
                if (entry.target.classList.contains('skill-category')) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const level = bar.getAttribute('data-level');
                        setTimeout(() => {
                            bar.style.width = `${level}%`;
                        }, 300);
                    });
                }
                
                // Add any other animations here
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Click outside terminal to close
document.getElementById('terminalModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeTerminal();
    }
});

// Mobile menu toggle (for future enhancement)
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const navItems = document.querySelector('.nav-items');
    navItems.style.display = navItems.style.display === 'flex' ? 'none' : 'flex';
});