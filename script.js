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
        title: 'Red Teaming & Offensive Security',
        icon: '⚔️',
        skills: [
            { name: 'Red Team Operations', level: 95 },
            { name: 'Exploit Development', level: 90 },
            { name: 'Malware Development', level: 88 },
            { name: 'C2C Operations', level: 92 },
            { name: 'Threat Simulation & Emulation', level: 90 },
        ]
    },
    {
        title: 'Digital Forensics & Incident Response',
        icon: '🔍',
        skills: [
            { name: 'Digital Forensics and Incident Response', level: 95 },
            { name: 'Memory Forensics', level: 92 },
            { name: 'Threat Hunting', level: 93 },
            { name: 'Windows Forensics', level: 90 },
            { name: 'MITRE D3FEND Framework', level: 88 },
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
        title: 'AI & Security Automation',
        icon: '🤖',
        skills: [
            { name: 'Model Context Protocol (MCP) Development', level: 95 },
            { name: 'Generative AI in Cybersecurity', level: 90 },
            { name: 'AI-powered Threat Hunting', level: 88 },
            { name: 'Security Automations', level: 92 },
        ]
    }
];

const toolsData = [
    'Python', 'Assembly', 'PowerShell', 'Bash', 'C++', 'Volatility3', 'IDA Pro',
    'Belkasoft', 'OSForensics', 'Kali Linux', 'Metasploit', 'Impacket', 'Burp Suite',
    'Wireshark', 'YARA', 'Ghidra', 'x64dbg', 'OllyDbg', 'Nmap', 'OSINT Tools',
    'Havoc C2', 'Mythic C2', 'Sliver C2', 'Empire C2', 'Sysinternals', 
    'MITRE ATT&CK', 'MITRE D3FEND', 'GHDB', 'Cuckoo Sandbox', 
    'Red Team Infrastructure', 'CloudFlare', 'Model Context Protocol', 'AI Security Automation'
];

const projectsData = [
    {
        title: 'Self-Deleting-Exploit/Payload',
        description: 'Windows 11-compatible advanced process injection with stealth deletion capabilities',
        technologies: ['C++', 'Assembly', 'Windows API', 'Process Injection'],
        status: 'completed',
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
        title: 'Impacket-MCP',
        description: 'AI-Powered Impacket-Suite for offensive security automation with intelligent command execution',
        technologies: ['Python', 'Impacket', 'Model Context Protocol', 'AI/ML'],
        status: 'development',
        type: 'Offensive Security',
        features: [
            'AI-assisted offensive operations',
            'Automated Impacket tool execution',
            'Intelligent command suggestions',
            'VS Code integration'
        ]
    },
    {
        title: 'Havoc-MCP',
        description: 'AI-assisted Havoc C2 Framework for automated payload creation and command execution',
        technologies: ['Python', 'Havoc C2', 'Model Context Protocol', 'AI Automation'],
        status: 'development',
        type: 'C2 Framework',
        features: [
            'Automated payload generation',
            'AI-assisted command execution',
            'Real-time C2 operations',
            'MCP integration for VS Code'
        ]
    },
    {
        title: 'Volatility3-MCP',
        description: 'AI-integrated memory forensics tool with batch executions for faster results and comprehensive analysis',
        technologies: ['Python', 'Volatility3', 'Model Context Protocol', 'Memory Analysis'],
        status: 'completed',
        type: 'Digital Forensics',
        features: [
            'Memory analysis automation',
            'Batch execution support',
            'AI-assisted forensic analysis',
            'Comprehensive artifact extraction'
        ],
        github: 'https://github.com/0xOb5k-J/volatility3-mcp'
    },
    {
        title: 'IDApro-MCP',
        description: 'AI-assisted Reverse Engineering framework with multi-instance support for advanced packer analysis',
        technologies: ['Python', 'IDA Pro', 'Model Context Protocol', 'Binary Analysis'],
        status: 'completed',
        type: 'Reverse Engineering',
        features: [
            'Multi-instance support',
            'AI-powered binary analysis',
            'Advanced packer analysis',
            'Malware reverse engineering'
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
        'Role: Security Researcher | Red Team Specialist',
        'Education: M.Sc Cyber Security and Digital Forensics (2024-2026)',
        'Experience: 2+ years in Red Teaming & Offensive Security',
        'Status: Currently pursuing CBFRPro certification',
        ''
    ],
    skills: () => [
        'Offensive Security:',
        '├── Red Team Operations (Expert)',
        '├── Exploit Development (Advanced)',
        '├── Malware Development (Advanced)',
        '├── C2C Operations (Expert)',
        '├── Threat Simulation & Emulation (Advanced)',
        '└── MITRE ATT&CK Framework (Expert)',
        '',
        'Forensics & Defense:',
        '├── Digital Forensics and Incident Response (Expert)',
        '├── Threat Hunting (Expert)',
        '├── Reverse Engineering (Advanced)',
        '├── Memory Forensics (Advanced)',
        '└── MITRE D3FEND Framework (Advanced)',
        '',
        'Programming & Scripting:',
        '├── Python (Expert)',
        '├── Assembly (Advanced)',
        '├── PowerShell (Advanced)',
        '└── Bash (Advanced)',
        '',
        'Other Expertise:',
        '├── Model Context Protocol Development (Expert)',
        '├── Generative AI in Cybersecurity (Advanced)',
        '└── Security Automations (Expert)',
        ''
    ],
    projects: () => [
        'Security Projects Portfolio:',
        '├── Self-Deleting-Exploit/Payload [COMPLETED]',
        '├── Impacket-MCP [ONGOING]',
        '├── Havoc-MCP [ONGOING]',
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
        '├── GPA: 7.32/10',
        '└── Focus: Red Team Operations, DFIR & Threat Hunting',
        '',
        'B.Sc (Hons) Forensic Science',
        '├── Institution: G.D Goenka University',
        '├── Duration: 2021 - 2024',
        '├── GPA: 8.37/10',
        '└── Focus: Digital Evidence Analysis & Cybersecurity',
        '',
        '12th Grade',
        '├── Institution: Shivani Jr. College',
        '├── Duration: 2019 - 2021',
        '└── GPA: 8.40/10',
        '',
        '10th Grade',
        '├── Institution: Oxford High School',
        '├── Duration: 2018 - 2019',
        '└── GPA: 8.50/10',
        ''
    ],
    achievements: () => [
        'Awards & Recognition:',
        '',
        '🏆 1st Position - CodeArena 2.0 (SIH25 Internal Hackathon), RRU',
        '🥈 1st Runner-up - Kurukshetra Hackathon (System Security), DRDO, DIA-SVPCoE',
        '🎯 Grand Finalist - Smart India Hackathon 2024',
        '🏅 Multiple CTF Competitions - Winner',
        '🎮 CTF Challenges Creator',
        '',
        'Experience & Volunteering:',
        '├── Red Teamer - Multiple Internal & External Live-Fire Exercises (RRU)',
        '├── Bharat NXC 2025 - Red Teamer & AI in Cybersecurity Training Assistant',
        '├── CII-SECX 2025 - Red Teamer & AI in Cybersecurity Training Assistant',
        '└── Bharat NXC 2024 - Blue Teamer & DFIR Training Assistant',
        ''
    ],
    certifications: () => [
        'Current Certifications:',
        '',
        '├── Certified Red Team Analyst (CRTA) - CWL',
        '├── Certified Red-Team Infrastructure Developer (CRT-ID) - CWL',
        '├── Microsoft Cybersecurity Architect - Microsoft',
        '├── Certified Network Security Practitioner (CNSP) - SecOps Group',
        '├── ISO/IEC 27001:2022 Lead Auditor - Mastermind',
        '├── OPSWAT Associate Certifications (Multiple) - OPSWAT Academy',
        '├── Windows & Advanced Forensics - Belkasoft',
        '└── OSForensics Triage Certification - PassMark Software',
        '',
        'In Progress:',
        '└── Certified Binary Fuzzing & Reversing Professional (CBFRPro) - SecOps Group',
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