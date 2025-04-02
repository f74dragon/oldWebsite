// DOM Elements
const header = document.querySelector('.header');
const themeToggle = document.querySelector('.theme-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const sections = document.querySelectorAll('section');

// Theme toggle functionality
function initThemeToggle() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  if (currentTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
}

// Header scroll effect
function initHeaderScroll() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile navigation
function initMobileNav() {
  mobileNavToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    
    if (mobileNav.classList.contains('active')) {
      mobileNavToggle.innerHTML = '<i class="fas fa-times"></i>';
      document.body.style.overflow = 'hidden';
    } else {
      mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
      document.body.style.overflow = '';
    }
  });
  
  // Close mobile nav when clicking on a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
      document.body.style.overflow = '';
    });
  });
}

// Highlight active section in navigation
function highlightActiveSection() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Terminal simulation
function initTerminal() {
  const terminalInput = document.querySelector('.terminal-input');
  const terminalContent = document.querySelector('.terminal-content');
  
  if (!terminalInput) return;
  
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const command = terminalInput.textContent.trim();
      const newLine = document.createElement('div');
      newLine.classList.add('terminal-line');
      newLine.innerHTML = `<span class="terminal-prompt">visitor@portfolio:~$</span> <span class="terminal-command">${command}</span>`;
      
      terminalContent.appendChild(newLine);
      
      // Process command
      let output = '';
      
      switch (command.toLowerCase()) {
        case 'help':
          output = `
          <div class="terminal-output">Available commands:</div>
          <div class="terminal-output">- about: Display information about me</div>
          <div class="terminal-output">- skills: List my technical skills</div>
          <div class="terminal-output">- projects: Show my projects</div>
          <div class="terminal-output">- contact: How to reach me</div>
          <div class="terminal-output">- education: My educational background</div>
          <div class="terminal-output">- cv: Download my resume</div>
          <div class="terminal-output">- clear: Clear the terminal</div>
          `;
          break;
          
        case 'about':
          output = `
          <div class="terminal-output">Hello! I'm Arian Assadzadeh, a Computer Science student at Virginia Tech.</div>
          <div class="terminal-output">I'm passionate about AI, HCI, NLP, educational technology, privacy and cybersecurity.</div>
          <div class="terminal-output">Type 'contact' to see how you can reach me.</div>
          `;
          break;
          
        case 'skills':
          output = `
          <div class="terminal-output">Languages: Java, Python, C, JavaScript, HTML/CSS, Swift, C#, SQL</div>
          <div class="terminal-output">Frameworks: React, Flask, FastAPI</div>
          <div class="terminal-output">Developer Tools: Docker, Linux, Firebase, Netlify, Bash</div>
          <div class="terminal-output">Libraries: NumPy, pandas, Tkinter, SerpAPI</div>
          `;
          break;
          
        case 'projects':
          output = `
          <div class="terminal-output">1. Automated Short Answer Assessment (React, FastAPI, LLMs, NLP)</div>
          <div class="terminal-output">2. PassTimes iOS App (Swift, Ticketmaster API, Yelp API, Google Places API)</div>
          <div class="terminal-output">3. Facial Expression Controlled Input System (Python, OpenCV, ML, AI)</div>
          <div class="terminal-output">4. Financial Advisor and Social Platform (Flask, Python, Firebase, HTML/CSS/JS)</div>
          <div class="terminal-output">5. Pink Tax Nullifier (Java, SerpAPI, HTML/CSS/JS)</div>
          <div class="terminal-output">6. Fire Alarm Data Analysis Tool (Python, Tkinter)</div>
          <div class="terminal-output">Type 'project [number]' for more details.</div>
          `;
          break;
          
        case 'project 1':
          output = `
          <div class="terminal-output">Automated Short Answer Assessment</div>
          <div class="terminal-output">- Created frontend in React and contributed to FastAPI backend</div>
          <div class="terminal-output">- Uses LLMs and NLP to automatically grade short answer questions</div>
          <div class="terminal-output">- Provides instructors with reduced grading overhead and instant feedback</div>
          `;
          break;
          
        case 'project 2':
          output = `
          <div class="terminal-output">PassTimes iOS App</div>
          <div class="terminal-output">- Built iOS app to help users discover events and nearby food options</div>
          <div class="terminal-output">- Aggregates real-time event and restaurant data with scheduling</div>
          <div class="terminal-output">- Implements Ticketmaster API, Yelp API, and Google Places API</div>
          `;
          break;
          
        case 'project 3':
          output = `
          <div class="terminal-output">Facial Expression Controlled Input System</div>
          <div class="terminal-output">- Developing input system where facial gestures act as command triggers</div>
          <div class="terminal-output">- Uses facial recognition and expression analysis for non-contact interactions</div>
          <div class="terminal-output">- Implements Python, OpenCV, and machine learning algorithms</div>
          `;
          break;
          
        case 'project 4':
          output = `
          <div class="terminal-output">Financial Advisor and Social Platform</div>
          <div class="terminal-output">- Created a financial planning web app with personalized AI and user advice forum</div>
          <div class="terminal-output">- Built end-to-end system with social integration</div>
          <div class="terminal-output">- Hosted on Netlify/Firebase with Flask backend</div>
          `;
          break;
          
        case 'project 5':
          output = `
          <div class="terminal-output">Pink Tax Nullifier</div>
          <div class="terminal-output">- Identifies pricing disparities based on gender</div>
          <div class="terminal-output">- Recommends cost-effective product alternatives</div>
          <div class="terminal-output">- Built with Java, SerpAPI, and web technologies</div>
          `;
          break;
          
        case 'project 6':
          output = `
          <div class="terminal-output">Fire Alarm Data Analysis Tool</div>
          <div class="terminal-output">- Desktop GUI for logging and visualizing false alarm data</div>
          <div class="terminal-output">- Helped reveal patterns in recurring incidents</div>
          <div class="terminal-output">- Implemented with Python and Tkinter</div>
          `;
          break;
          
        case 'contact':
          output = `
          <div class="terminal-output">Email: arian83@vt.edu</div>
          <div class="terminal-output">Phone: (571) 375-9419</div>
          <div class="terminal-output">Location: Blacksburg, VA</div>
          `;
          break;
          
        case 'education':
          output = `
          <div class="terminal-output">Virginia Tech, Blacksburg, VA</div>
          <div class="terminal-output">Bachelor of Science in Computer Science</div>
          <div class="terminal-output">GPA: 3.88</div>
          <div class="terminal-output">Expected Graduation: December 2025</div>
          <div class="terminal-output"></div>
          <div class="terminal-output">Course Highlights:</div>
          <div class="terminal-output">- Operating Systems</div>
          <div class="terminal-output">- Data Structures and Algorithms</div>
          <div class="terminal-output">- Cryptography</div>
          <div class="terminal-output">- Machine Learning</div>
          <div class="terminal-output">- Computer Organization</div>
          <div class="terminal-output">- Mobile Software Development</div>
          <div class="terminal-output">- GUI Programming</div>
          <div class="terminal-output">- Comparative Languages</div>
          <div class="terminal-output">- Multimedia/Hypertext</div>
          <div class="terminal-output">- Artificial Intelligence</div>
          `;
          break;
          
        case 'cv':
        case 'resume':
          output = `
          <div class="terminal-output">Generating download link for resume...</div>
          <div class="terminal-output">Resume download initiated.</div>
          `;
          
          // Trigger resume download
          setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'assets/Arian_Assadzadeh_Resume.txt';
            link.download = 'Arian_Assadzadeh_Resume.txt';
            link.click();
          }, 1000);
          break;
          
        case 'clear':
          terminalContent.innerHTML = '';
          return;
          
        default:
          output = `
          <div class="terminal-output">Command not recognized: ${command}</div>
          <div class="terminal-output">Type 'help' to see available commands.</div>
          `;
      }
      
      terminalContent.innerHTML += output;
      
      // Clear input and scroll to bottom
      terminalInput.textContent = '';
      terminalContent.scrollTop = terminalContent.scrollHeight;
    }
  });
}

// Typing effect
function initTypingEffect() {
  const typedElement = document.querySelector('.typed-element');
  
  if (typedElement && window.Typed) {
    new Typed('.typed-element', {
      strings: [
        'Software Engineer',
        'CS Student',
        'AI Enthusiast',
        'Full-Stack Developer'
      ],
      typeSpeed: 70,
      backSpeed: 50,
      loop: true,
      backDelay: 1500
    });
  }
}

// Initialize animations
function initAnimations() {
  // Fade-in animation for elements when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components if they exist
  if (themeToggle) initThemeToggle();
  if (header) initHeaderScroll();
  if (mobileNavToggle && mobileNav) initMobileNav();
  
  // Initialize features
  initTypingEffect();
  initTerminal();
  initAnimations();
  
  // Scroll spy for navigation
  window.addEventListener('scroll', highlightActiveSection);
});
