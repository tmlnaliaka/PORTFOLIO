/* ==========================================================================
   SOPHY NALIAKA WAFULA - INTERACTIVE PORTFOLIO APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypewriter();
  initThemeToggle();
  renderSkills();
  loadProjectsData();
  initProjectFilters();
  initInteractiveTerminal();
  initContactForm();
  initNavigation();
  initResumeDownloader();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. Interactive Particle Canvas Background
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  const particleCount = 65;
  const maxDistance = 120;
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? '#8b5cf6' : '#d946ef';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse attraction / repulsion
      if (mouse.x && mouse.y) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${1 - dist / maxDistance * 0.85})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriter');
  if (!target) return;

  const roles = [
    "Software Engineering Student @ Zetech",
    "Full-Stack Web Developer",
    "MySQL Database Architect",
    "Certified UI/UX Designer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Theme Switcher (Dark / Light Theme)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  if (!toggleBtn || !themeIcon) return;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    showToast(`Switched to ${newTheme.toUpperCase()} theme`);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'ri-sun-fill';
    } else {
      themeIcon.className = 'ri-moon-fill';
    }
  }
}

/* --------------------------------------------------------------------------
   4. Technical Skills Matrix Data & Rendering
   -------------------------------------------------------------------------- */
const SKILLS_DATA = [
  { name: 'Python', category: 'programming', icon: 'fa-brands fa-python', percentage: 80, desc: 'Object-oriented programming, data scripts, automation & API backends.' },
  { name: 'JavaScript (ES6+)', category: 'programming', icon: 'fa-brands fa-js', percentage: 84, desc: 'Async/Await, DOM manipulation, modular architecture & web interactivity.' },
  { name: 'Kotlin', category: 'programming', icon: 'fa-brands fa-android', percentage: 50, desc: 'Android mobile app development, OOP patterns & security modules.' },
  { name: 'HTML5 & CSS3', category: 'programming', icon: 'fa-brands fa-html5', percentage: 89, desc: 'Semantic layouts, Flexbox/Grid, CSS custom properties & glassmorphism.' },
  { name: 'C++', category: 'programming', icon: 'fa-solid fa-code', percentage: 70, desc: 'System programming, OOP logic & algorithmic problem solving.' },
  
  { name: 'MySQL Database', category: 'database', icon: 'fa-solid fa-database', percentage: 85, desc: 'Schema architecture, CRUD operations, relational normalization & indexing.' },
  { name: 'Relational DB Design', category: 'database', icon: 'fa-solid fa-server', percentage: 85, desc: 'Entity-relationship modeling, foreign keys, triggers & data integrity.' },

  { name: 'Git & GitHub', category: 'tools', icon: 'fa-brands fa-github', percentage: 90, desc: 'Version control, branch management, pull requests & team collaboration.' },
  { name: 'VS Code & Tools', category: 'tools', icon: 'fa-solid fa-laptop-code', percentage: 95, desc: 'Code optimization, extensions, terminal integration & debugging.' },
  { name: 'MS Office Suite', category: 'tools', icon: 'fa-solid fa-file-word', percentage: 90, desc: 'Technical documentation, reporting & business applications.' },

  { name: 'UI/UX Design Principles', category: 'design', icon: 'fa-solid fa-palette', percentage: 88, desc: 'User research, wireframing, color theory & typography hierarchy (YMCA Certified).' },
  { name: 'Responsive Web Design', category: 'design', icon: 'fa-solid fa-mobile-screen', percentage: 95, desc: 'Mobile-first design, fluid layouts, cross-browser compatibility.' }
];

function renderSkills(category = 'all') {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  const filtered = category === 'all' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(s => s.category === category);

  container.innerHTML = filtered.map(skill => `
    <div class="skill-card" data-category="${skill.category}">
      <div class="skill-info">
        <div class="skill-icon">
          <i class="${skill.icon}"></i>
        </div>
        <div style="flex:1;">
          <h4 style="font-size: 1.1rem; color: var(--text-main);">${skill.name}</h4>
          <span style="font-size: 0.8rem; color: var(--primary-bright); font-weight: 600;">${skill.percentage}% Proficiency</span>
        </div>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">${skill.desc}</p>
      <div class="skill-progress-bg">
        <div class="skill-progress-bar" data-width="${skill.percentage}%"></div>
      </div>
    </div>
  `).join('');

  // Animate progress bars
  setTimeout(() => {
    document.querySelectorAll('.skill-progress-bar').forEach(bar => {
      bar.style.width = bar.getAttribute('data-width');
    });
    // Re-observe newly inserted skill cards
    observeAnimatables();
  }, 100);

  // Tab switching listener
  document.querySelectorAll('.skill-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.skill-tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderSkills(e.target.getAttribute('data-category'));
    });
  });
}

/* --------------------------------------------------------------------------
   5. Projects Showcase Data & Dynamic Rendering
   -------------------------------------------------------------------------- */
const DEFAULT_PROJECTS_DATA = [
  {
    id: 'thrift-shop',
    title: 'Online Local Thrift Shop Management System',
    status: 'In Progress',
    category: 'fullstack',
    tags: ['Full-Stack', 'JavaScript', 'MySQL', 'Authentication', 'Responsive'],
    icon: 'ri-store-2-line',
    shortDesc: 'A full-stack web application automating inventory and sales tracking for small-scale thrift businesses.',
    github: 'https://github.com/tmlnaliaka',
    longDesc: `
      <p>Architected a complete inventory and sales tracking platform tailored for local thrift store operations. Key features include:</p>
      <ul>
        <li><strong>Relational MySQL Database:</strong> Manages real-time item status (Available/Sold), category cataloging, and sales receipts.</li>
        <li><strong>Admin Authentication System:</strong> Secure credential handling for stock addition, price edits, and sales ledger management.</li>
        <li><strong>Dynamic JavaScript Frontend:</strong> Instant UI updates upon inventory state transitions across desktop and mobile browsers.</li>
        <li><strong>Sales Analytics:</strong> Instant breakdown of daily revenue and item turnover rates.</li>
      </ul>
    `
  },
  {
    id: 'kdms',
    title: 'KDMS - Kenya Disaster Management System',
    status: 'Featured Repository',
    category: 'mobile-ai',
    tags: ['Gemini AI', 'FastAPI', 'React', 'SMS Alerts', 'NDMA'],
    icon: 'ri-alarm-warning-line',
    shortDesc: 'A Gemini-powered FastAPI/React platform for Kenya’s NDMA featuring real-time mapping, AI analysis, and SMS worker dispatch.',
    github: 'https://github.com/tmlnaliaka/KDMS',
    longDesc: `
      <p>Built for the National Drought Management Authority (NDMA) in Kenya to streamline emergency response during climate crises:</p>
      <ul>
        <li><strong>Gemini AI Intelligence:</strong> Analyzes regional distress reports and predicts drought escalation severity.</li>
        <li><strong>Real-time Mapping:</strong> Interactive GIS dashboard pinpointing affected counties and relief distribution centers.</li>
        <li><strong>SMS Emergency Gateway:</strong> Automated dispatch of alerts to field emergency officers via SMS integration.</li>
        <li><strong>FastAPI &amp; React Stack:</strong> High-performance async backend coupled with an intuitive management dashboard.</li>
      </ul>
    `
  },
  {
    id: 'secure-notes',
    title: 'SecureNotesApp (Android Security)',
    status: 'Public Repository',
    category: 'mobile-ai',
    tags: ['Kotlin', 'Android SDK', 'AES-256', 'Privacy'],
    icon: 'ri-shield-keyhole-line',
    shortDesc: 'Kotlin mobile security application providing encrypted note storage, biometric auth, and local data protection.',
    github: 'https://github.com/tmlnaliaka/SecureNotesApp',
    longDesc: `
      <p>A native Kotlin Android application designed to protect user privacy and sensitive notes:</p>
      <ul>
        <li><strong>AES-256 Encryption:</strong> Encrypts note content before writing to persistent local storage.</li>
        <li><strong>Clean Architecture:</strong> Built using Android Jetpack components, ViewModel, and Room database.</li>
        <li><strong>Biometric Unlock:</strong> Supports fingerprint/PIN verification prior to decrypting note vaults.</li>
      </ul>
    `
  },
  {
    id: 'bimafast',
    title: 'BimaFast InsurTech Platform',
    status: 'Public Repository',
    category: 'fullstack',
    tags: ['Web Application', 'CSS3', 'JavaScript', 'InsurTech'],
    icon: 'ri-shield-flash-line',
    shortDesc: 'An insurance technology web platform enabling quick quote generation, coverage calculator, and policy management.',
    github: 'https://github.com/tmlnaliaka/BimaFast',
    longDesc: `
      <p>BimaFast simplifies micro-insurance quote estimation and policy selection for East African users:</p>
      <ul>
        <li><strong>Instant Premium Calculator:</strong> Interactive JS logic computing custom monthly rates based on selected coverage parameters.</li>
        <li><strong>Responsive UI/UX:</strong> Clean CSS layout built for high accessibility on low-bandwidth mobile devices.</li>
      </ul>
    `
  },
  {
    id: 'dbms-wk8',
    title: 'Relational Database Management System',
    status: 'Public Repository',
    category: 'systems',
    tags: ['MySQL', 'Schema Normalization', 'CRUD', 'Triggers'],
    icon: 'ri-database-2-line',
    shortDesc: 'Real-world case database management system showcasing normalized schemas, complex queries, and data integrity.',
    github: 'https://github.com/tmlnaliaka/wk8-Database-Management-System-Assignment',
    longDesc: `
      <p>A comprehensive MySQL database architecture addressing enterprise data normalization requirements:</p>
      <ul>
        <li><strong>3NF Schema Normalization:</strong> Designed tables eliminating redundancy across relational entities.</li>
        <li><strong>Advanced Queries:</strong> Multi-table JOINs, aggregated views, and stored procedures for business reporting.</li>
        <li><strong>Data Integrity Constraints:</strong> Foreign key cascades and validation triggers preventing orphan records.</li>
      </ul>
    `
  },
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    status: 'Public Repository',
    category: 'fullstack',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX Design'],
    icon: 'ri-window-fill',
    shortDesc: 'Developed a professional portfolio showcase applying clean UI/UX design principles and visual hierarchy.',
    github: 'https://github.com/tmlnaliaka/PORTFOLIO',
    longDesc: `
      <p>The original personal portfolio project demonstrating front-end design mastery:</p>
      <ul>
        <li><strong>UI/UX Principles:</strong> Harmonious color schemes, readable typography, and intuitive navigation paths.</li>
        <li><strong>Cross-Device Responsive Layouts:</strong> Mobile-first media queries ensuring perfect rendering on all screen sizes.</li>
      </ul>
    `
  }
];

const PROJECTS_DATA = [];

async function loadProjectsData() {
  try {
    const response = await fetch('projects.json?v=20260821', { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to load projects.json');
    const data = await response.json();
    PROJECTS_DATA.length = 0;
    PROJECTS_DATA.push(...data);
    renderProjects();
  } catch (error) {
    PROJECTS_DATA.length = 0;
    PROJECTS_DATA.push(...DEFAULT_PROJECTS_DATA);
    renderProjects();
  }
}

function renderProjects(filter = 'all') {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const filtered = filter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === filter);

  container.innerHTML = filtered.map(project => `
    <div class="project-card" data-category="${project.category}">
      <div class="project-banner">
        <div class="project-banner-overlay"></div>
        <i class="${project.icon} project-icon-large"></i>
      </div>
      <div class="project-body">
        <div class="project-tags">
          ${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <span class="project-index">${String(filtered.indexOf(project) + 1).padStart(2, '0')} / ${String(filtered.length).padStart(2, '0')}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.shortDesc}</p>
        <div class="project-footer">
          <button class="btn btn-outline view-details-btn" data-id="${project.id}" style="padding: 0.4rem 1rem; font-size: 0.85rem;">
            <i class="ri-information-line"></i> Deep Dive
          </button>
          <div class="project-links">
            <a href="${project.github}" target="_blank" rel="noopener" class="icon-link" title="GitHub Repository">
              <i class="ri-github-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Attach modal listeners
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projId = e.currentTarget.getAttribute('data-id');
      openProjectModal(projId);
    });
  });

  // Re-observe newly inserted project cards for scroll animation
  setTimeout(() => observeAnimatables(), 50);
}

function initProjectFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderProjects(e.target.getAttribute('data-filter'));
    });
  });
}

/* --------------------------------------------------------------------------
   6. Project Detail Modal Window
   -------------------------------------------------------------------------- */
function openProjectModal(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');

  modalBody.innerHTML = `
    <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1rem;">
      <i class="${project.icon}" style="font-size:2.5rem; color:var(--primary-bright);"></i>
      <div>
        <span class="tag" style="margin-bottom:0.3rem;">${project.status}</span>
        <h2 style="font-size:1.8rem;">${project.title}</h2>
      </div>
    </div>

    <div class="project-tags" style="margin-bottom:1.5rem;">
      ${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>

    <div style="color:var(--text-main); font-size:1rem; line-height:1.7; margin-bottom:2rem;">
      ${project.longDesc}
    </div>

    <div style="background:rgba(139,92,246,0.1); border:1px solid var(--border-purple); padding:1.2rem; border-radius:var(--radius-md); margin-bottom:2rem;">
      <h4 style="color:var(--primary-bright); margin-bottom:0.5rem;"><i class="ri-flashlight-line"></i> Quick Interactive Simulation</h4>
      <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1rem;">Test a live simulated module execution for this project right now!</p>
      <button class="btn btn-primary" id="modal-run-sim-btn" data-id="${project.id}" style="padding:0.5rem 1.2rem; font-size:0.85rem;">
        <i class="ri-play-circle-line"></i> Launch Simulation in Terminal
      </button>
    </div>

    <div style="display:flex; gap:1rem;">
      <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-primary" style="flex:1;">
        <i class="ri-github-fill"></i> View Full Repository on GitHub
      </a>
      <button class="btn btn-outline" onclick="closeProjectModal()">
        Close Window
      </button>
    </div>
  `;

  modal.classList.add('active');

  const modalSimBtn = document.getElementById('modal-run-sim-btn');
  if (modalSimBtn) {
    modalSimBtn.addEventListener('click', () => {
      closeProjectModal();
      window.location.hash = '#simulator';
      // select corresponding option in simulator
      const select = document.getElementById('demo-select');
      if (select) {
        if (projectId === 'thrift-shop') select.value = 'thrift';
        else if (projectId === 'kdms') select.value = 'kdms';
        else if (projectId === 'secure-notes') select.value = 'notes';
        else select.value = 'oop';
        
        loadDemoCode(select.value);
        document.getElementById('run-code-btn').click();
      }
    });
  }
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
}

document.getElementById('modal-close-btn')?.addEventListener('click', closeProjectModal);
document.getElementById('project-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'project-modal') closeProjectModal();
});

/* --------------------------------------------------------------------------
   7. Interactive Terminal & Code Simulator
   -------------------------------------------------------------------------- */
const DEMO_SNIPPETS = {
  thrift: {
    code: `// Online Local Thrift Shop Management System - Inventory & Auth Simulation
const mysql = require('mysql2/promise');
const auth = require('./authMiddleware');

async function processInventoryUpdate(adminToken, productId, newStatus) {
  console.log("--> Authenticating Admin Session...");
  const user = auth.verifyToken(adminToken);
  if (!user || user.role !== 'ADMIN') throw new Error("Unauthorized Admin Access!");

  console.log(\`--> Executing SQL Update for Item ID: \${productId}...\`);
  const sql = "UPDATE inventory SET stock_status = ?, updated_at = NOW() WHERE item_id = ?";
  
  // Simulated MySQL Execution
  const result = { affectedRows: 1, status: newStatus };
  return { success: true, item_id: productId, new_status: newStatus };
}

// Trigger Simulation
processInventoryUpdate('jwt-admin-token-valid', 104, 'Sold');`,
    execute: () => [
      "[INFO] 11:45:02 - Initializing Thrift Shop Inventory Controller...",
      "[AUTH] Validating Admin JWT Credentials... Token Verified (Admin: Sophy Naliaka)",
      "[SQL] Connecting to MySQL Host: `localhost:3306` (Database: `thrift_shop_db`)",
      "[SQL] Executing Query: UPDATE inventory SET stock_status = 'Sold', updated_at = NOW() WHERE item_id = 104;",
      "[SUCCESS] Query OK, 1 row affected (0.004 sec).",
      "[LOG] Real-Time Stock Status updated: Item #104 status changed to [SOLD].",
      "[WS] Broadcasting WebSocket update to POS frontend... Inventory UI refreshed!"
    ]
  },
  kdms: {
    code: `// KDMS - Kenya Disaster Management System (NDMA AI Dispatcher)
import { GeminiAI } from '@google/generative-ai';
import { SMSGateway } from './sms';

async function dispatchEmergencyRelief(county, severityScore) {
  console.log(\`Analyzing Drought Risk for County: \${county}\`);
  const aiModel = new GeminiAI({ apiKey: "SECURE_KEY" });
  
  const riskAnalysis = await aiModel.analyzeDroughtData({ county, severity: severityScore });
  console.log(\`AI Risk Rating: \${riskAnalysis.level}\`);

  if (riskAnalysis.level === 'CRITICAL') {
    const sms = new SMSGateway();
    await sms.sendAlert("+254724910372", \`ALERT: Immediate relief dispatch required in \${county}\`);
    return { status: "DISPATCHED", officer: "Sophy Naliaka" };
  }
}

dispatchEmergencyRelief('Turkana North', 8.9);`,
    execute: () => [
      "[KDMS ENGINE] Initializing NDMA Emergency Disaster Monitor...",
      "[GIS] Fetching real-time satellite vegetation index for Turkana North...",
      "[GEMINI AI] Running AI Predictive Risk Analysis... Severity Score: 8.9 / 10",
      "[GEMINI AI] Result: CRITICAL DROUGHT LEVEL DETECTED.",
      "[ALERT SYSTEM] Constructing emergency dispatch payload...",
      "[SMS GATEWAY] Sending SMS alert to Emergency Field Officer (+254 724 910 372)...",
      "[SMS DELIVERED] 'URGENT NDMA ALERT: Water tanker & food relief dispatch approved for Turkana North.'",
      "[SYSTEM] Real-time incident logged on NDMA interactive map."
    ]
  },
  notes: {
    code: `// SecureNotesApp - Kotlin Android AES-256 Note Encryption Module
package com.sophy.securenotes.crypto

import javax.crypto.Cipher
import javax.crypto.spec.SecretKeySpec

class NoteEncryptor {
    private val ALGORITHM = "AES"

    fun encryptNote(secretKey: String, noteText: String): ByteArray {
        val key = SecretKeySpec(secretKey.toByteArray(), ALGORITHM)
        val cipher = Cipher.getInstance(ALGORITHM)
        cipher.init(Cipher.ENCRYPT_MODE, key)
        return cipher.doFinal(noteText.toByteArray())
    }
}

// Execution test
val encryptor = NoteEncryptor()
val encryptedBytes = encryptor.encryptNote("SophySecretKey12", "Confidential Engineering Notes")`,
    execute: () => [
      "[KOTLIN COMPILER] Compiling Android NoteEncryptor.kt module...",
      "[SECURITY] Initializing Android KeyStore & AES-256 Cipher Provider...",
      "[CRYPTO] Plaintext Input: 'Confidential Engineering Notes'",
      "[CRYPTO] Generating 128-bit KeySpec & initialization vector...",
      "[CRYPTO] Cipher Bytes Generated: [88, -12, 45, 109, 32, -90, 114, 76, 54, -22...]",
      "[ROOM DB] Storing encrypted blob safely into local SQLite vault...",
      "[SUCCESS] Note encrypted & biometric lock engaged."
    ]
  },
  oop: {
    code: `# Object Oriented Programming - Python Data Pipeline Simulation
class SoftwareEngineeringProject:
    def __init__(self, title: str, author: str, tech_stack: list):
        self.title = title
        self.author = author
        self.tech_stack = tech_stack

    def compile_summary(self) -> dict:
        return {
            "Project": self.title,
            "Engineer": self.author,
            "TechCount": len(self.tech_stack),
            "Status": "Verified & Built"
        }

proj = SoftwareEngineeringProject(
    title="Local Thrift Shop Management System",
    author="Sophy Naliaka Wafula",
    tech_stack=["Python", "JavaScript", "MySQL", "CSS3"]
)
print(proj.compile_summary())`,
    execute: () => [
      "[PYTHON 3.11] Executing script `oop_pipeline.py`...",
      "[OOP] Class `SoftwareEngineeringProject` instantiated successfully.",
      "[DATA PROCESSOR] Analyzing tech stack list: ['Python', 'JavaScript', 'MySQL', 'CSS3']",
      "[OUTPUT JSON] {",
      "  'Project': 'Local Thrift Shop Management System',",
      "  'Engineer': 'Sophy Naliaka Wafula',",
      "  'TechCount': 4,",
      "  'Status': 'Verified & Built'",
      "}",
      "[PROCESS EXIT] Code 0 - Clean Execution finished in 0.012s"
    ]
  }
};

function loadDemoCode(key) {
  const editor = document.getElementById('code-editor-content');
  if (editor && DEMO_SNIPPETS[key]) {
    editor.textContent = DEMO_SNIPPETS[key].code;
  }
}

function initInteractiveTerminal() {
  const select = document.getElementById('demo-select');
  const runBtn = document.getElementById('run-code-btn');
  const consoleOutput = document.getElementById('output-console');

  if (!select || !runBtn || !consoleOutput) return;

  loadDemoCode(select.value);

  select.addEventListener('change', (e) => {
    loadDemoCode(e.target.value);
    consoleOutput.innerHTML = `Module selected: <strong>${e.target.value.toUpperCase()}</strong>. Click "Execute Simulation Code" to run.`;
  });

  runBtn.addEventListener('click', () => {
    const snippetKey = select.value;
    const logs = DEMO_SNIPPETS[snippetKey].execute();

    consoleOutput.innerHTML = `<span style="color:var(--primary-bright);">&gt; Launching simulation...</span><br>`;
    
    logs.forEach((log, index) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.style.margin = '4px 0';
        if (log.includes('CRITICAL') || log.includes('ALERT')) line.style.color = '#f87171';
        else if (log.includes('SUCCESS') || log.includes('OK') || log.includes('DELIVERED')) line.style.color = '#34d399';
        else if (log.includes('SQL') || log.includes('AUTH')) line.style.color = '#c084fc';
        else line.style.color = '#a7f3d0';
        
        line.textContent = log;
        consoleOutput.appendChild(line);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
      }, index * 250);
    });
  });
}

/* --------------------------------------------------------------------------
   8. Contact Form Validation & Toast Notification
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    showToast(`Thank you ${name}! Your message has been sent to Sophy.`);
    form.reset();
  });
}

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* --------------------------------------------------------------------------
   9. Resume Downloader & PDF Preview Trigger
   -------------------------------------------------------------------------- */
function initResumeDownloader() {
  const btn = document.getElementById('download-cv-btn');
  if (!btn) return;

  btn.addEventListener('click', (event) => {
    const resumeUrl = 'resume.html';
    if (btn.tagName === 'A') {
      btn.setAttribute('href', resumeUrl);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
      return;
    }

    event.preventDefault();
    showToast('Opening Sophy Naliaka Wafula CV Document...');
    window.open(resumeUrl, '_blank');
  });
}

/* --------------------------------------------------------------------------
   10. Scroll & Navigation Logic
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('nav-options') || document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // ScrollSpy active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });

  // Mobile nav open/close toggle
  mobileToggle?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.contains('show');
    navLinks?.classList.toggle('show');
    if (mobileToggle) {
      mobileToggle.innerHTML = isOpen
        ? '<i class="ri-menu-line"></i>'
        : '<i class="ri-close-line"></i>';
    }
  });

  // Close mobile nav on any nav link click
  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      if (mobileToggle) mobileToggle.innerHTML = '<i class="ri-menu-line"></i>';
    });
  });

  // Close mobile nav on outside click
  document.addEventListener('click', (e) => {
    if (
      navLinks?.classList.contains('show') &&
      !navLinks.contains(e.target) &&
      !mobileToggle?.contains(e.target)
    ) {
      navLinks.classList.remove('show');
      if (mobileToggle) mobileToggle.innerHTML = '<i class="ri-menu-line"></i>';
    }
  });

  // Back to top smooth scroll
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   11. Scroll-In Animation Observer
   -------------------------------------------------------------------------- */
let scrollObserver;

function initScrollAnimations() {
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.08 });

  // Observe all animatable elements
  observeAnimatables();
}

function observeAnimatables() {
  if (!scrollObserver) return;
  document.querySelectorAll(
    '.about-card, .project-card, .skill-card, .timeline-card, .contact-card, .contact-form-container'
  ).forEach(el => scrollObserver.observe(el));
}

/* --------------------------------------------------------------------------
   12. Smooth anchor scroll override
   -------------------------------------------------------------------------- */
window.addEventListener('load', () => {
  // Re-observe after dynamic renders
  observeAnimatables();

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
