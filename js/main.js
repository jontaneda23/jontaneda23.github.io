// ==================== SCROLL SPY ====================
const sections = ['inicio', 'nosotros', 'servicios', 'sectores', 'equipo', 'proceso', 'faq', 'galeria', 'contacto'];
const navLinks = document.querySelectorAll('.nav-links li');
const navIndicators = document.querySelectorAll('.nav-indicator');

function updateActiveSection() {
  const scrollPosition = window.scrollY + 150;
  let current = '';
  for (const section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetBottom = offsetTop + element.offsetHeight;
      if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
        current = section;
        break;
      }
    }
  }
  navLinks.forEach(link => {
    const href = link.querySelector('a').getAttribute('href').substring(1);
    if (href === current) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);

// Smooth scroll para los enlaces
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => updateActiveSection(), 100);
    }
  });
});

// ==================== INTERSECTION OBSERVER ====================
const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, observerOptions);

// Selector actualizado: incluimos las nuevas clases regimen-card y tip-card, eliminamos .gi
document.querySelectorAll('.hero-badge, .hero-title, .hero-sub, .hero-btns, .hero-stats, .ab-photo, .ab-right, .section-header, .flip-card, .sectores-header, .sec-card, .equipo-header, .team-card, .proceso-header, .step-btn, .process-panel, .faq-header, .faq-item, .galeria-header, .regimen-card, .tip-card, .checklist-card, .error-card, .recurso-card, .contacto-left, .form-card, .contact-item').forEach(el => observer.observe(el));

// ==================== COUNT-UP ====================
function animateNumber(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) { element.textContent = target; clearInterval(timer); }
    else { element.textContent = Math.floor(start); }
  }, 16);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateNumber(document.getElementById('stat1'), 10);
      animateNumber(document.getElementById('stat2'), 200);
      animateNumber(document.getElementById('stat3'), 6);
      animateNumber(document.getElementById('stat4'), 8);
      animateNumber(document.getElementById('yearsCounter'), 10);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statsObserver.observe(document.getElementById('heroStats'));

// ==================== PROCESO ====================
let activeStep = 0;
const stepsData = [
  { title: "Consulta Inicial", desc: "Agendamos una reunión sin costo para conocer su empresa, entender sus necesidades contables y responder todas sus preguntas.", duration: "1 día", icon: "fa-calendar-alt" },
  { title: "Diagnóstico Integral", desc: "Analizamos su situación contable, Diagnóstico tributario, contable y gerencial para garantizar su adecuada funcionalidad..", duration: "2-3 días", icon: "fa-chart-line" },
  { title: "Aceptación y Designación", desc: "El cliente formaliza su aceptación y nos otorga la confianza para asumir la gestión contable integral de su empresa.", duration: "Según el plan", icon: "fa-file-signature" },
  { title: "Ejecución de Procesos", desc: "Ejecutamos todos los procesos contables, tributarios y administrativos según los cronogramas establecidos y adaptados a la realidad de cada cliente.", duration: "Según plan", icon: "fa-cogs" },
  { title: "Seguimiento Continuo", desc: "Realizamos un seguimiento detallado y específico para cada empresa, con reportes periódicos y controles rigurosos que permiten una mejor toma de decisiones.", duration: "Permanente", icon: "fa-handshake" }
];

const progressFill = document.getElementById('progressFill');
const stepBtns = document.querySelectorAll('.step-btn');
const panelImgs = document.querySelectorAll('.panel-img');
const panelTitle = document.getElementById('panelTitle');
const panelDesc = document.getElementById('panelDesc');
const panelDuration = document.getElementById('panelDuration');
const contentIcon = document.querySelector('.content-icon i');
const dots = document.querySelectorAll('.dot');

function updateProcess(step) {
  activeStep = step;
  stepBtns.forEach((btn, i) => {
    btn.classList.remove('active', 'completed');
    if (i === step) btn.classList.add('active');
    else if (i < step) btn.classList.add('completed');
  });
  panelImgs.forEach((img, i) => {
    if (i === step) img.classList.add('active');
    else img.classList.remove('active');
  });
  panelTitle.textContent = stepsData[step].title;
  panelDesc.textContent = stepsData[step].desc;
  panelDuration.textContent = stepsData[step].duration;
  contentIcon.className = `fas ${stepsData[step].icon}`;
  dots.forEach((dot, i) => {
    if (i === step) dot.classList.add('active');
    else dot.classList.remove('active');
  });
  const progress = (step / (stepsData.length - 1)) * 100;
  progressFill.style.width = `${progress}%`;
}

stepBtns.forEach((btn, idx) => { btn.addEventListener('click', () => updateProcess(idx)); });
dots.forEach((dot, idx) => { dot.addEventListener('click', () => updateProcess(idx)); });

const processSection = document.getElementById('proceso');
let animationStarted = false;
const processObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animationStarted) {
      animationStarted = true;
      const startTime = performance.now();
      const endWidth = (activeStep / (stepsData.length - 1)) * 100;
      function animateLine(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / 1400, 1);
        progressFill.style.width = `${endWidth * progress}%`;
        if (progress < 1) requestAnimationFrame(animateLine);
      }
      requestAnimationFrame(animateLine);
    }
  });
}, { threshold: 0.3 });
processObs.observe(processSection);

// ==================== FAQ ACORDEÓN ====================
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const btn = item.querySelector('.faq-question');
  btn.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    faqItems.forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

// ==================== FORMULARIO CON EMAILJS ====================
function sendForm() {
  const nombre = document.getElementById('formNombre')?.value.trim();
  const empresa = document.getElementById('formEmpresa')?.value.trim();
  const celular = document.getElementById('formCelular')?.value.trim();
  const email = document.getElementById('formEmail')?.value.trim();
  const servicio = document.getElementById('formServicio')?.value;
  const mensaje = document.getElementById('formMensaje')?.value.trim();

  if (!nombre) { alert('Por favor ingresa tu nombre completo.'); return; }
  if (!celular) { alert('Por favor ingresa tu número de celular / WhatsApp.'); return; }
  if (!email) { alert('Por favor ingresa tu correo electrónico.'); return; }
  if (!servicio) { alert('Por favor selecciona un servicio de interés.'); return; }

  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  if (!emailRegex.test(email)) { alert('Ingresa un correo electrónico válido.'); return; }

  emailjs.send("service_ukky48g", "template_1vxefeb", {
    nombre: nombre,
    empresa: empresa,
    celular: celular,
    email: email,
    servicio: servicio,
    mensaje: mensaje
  }).then(() => {
    alert("✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.");
    document.getElementById('formNombre').value = '';
    document.getElementById('formEmpresa').value = '';
    document.getElementById('formCelular').value = '';
    document.getElementById('formEmail').value = '';
    document.getElementById('formServicio').value = '';
    document.getElementById('formMensaje').value = '';
  }).catch((error) => {
    console.error(error);
    alert("❌ Error al enviar. Intenta de nuevo o contáctanos por WhatsApp.");
  });
}

// ==================== CHATBOT ====================
const chatbotFloat = document.getElementById('chatbotFloat');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

const botResponses = {
  default: "Gracias por tu mensaje. ¿Podrías ser más específico? Puedes consultar nuestras secciones de Servicios, FAQ o contactarnos directamente por WhatsApp.",
  
  servicios: "Ofrecemos los siguientes servicios:\n\n📊 **Liquidación de impuestos** - Mensuales y anuales\n🏦 **Conciliaciones bancarias** - Control y conciliación mensual\n📄 **Presentación SIRE** - Sistema Integrado de Registros Electrónicos\n💻 **Ingreso de información** - Registro en sistema contable (Siscont)\n📑 **Declaraciones Juradas (DDJJ)** - Presentación ante SUNAT\n📁 **Presentación PLE** - Programa de Libros Electrónicos\n📈 **Proyecciones financieras** - Elaboración y análisis\n👥 **Planillas electrónicas** - Gestión completa de nómina\n\n¿Te gustaría más información sobre alguno de ellos?",
  
  precios: "Nuestros honorarios se adaptan al tamaño y necesidades de cada empresa. Te invitamos a una **asesoría gratuita** para conocer tu caso y ofrecerte una propuesta personalizada sin compromiso.\n\n¿Te gustaría agendar una reunión ahora?",
  
  contacto: "Puedes contactarnos de varias formas:\n\n📞 **Teléfono/WhatsApp:** 910 548 118 \n✉️ **Correo:** jdconsultores.estudiocontable@gmail.com\n📍 **Ubicación:** Piura, Perú\n\n¿Quieres que te ayude a enviar un mensaje?",
  
  faq: "Las preguntas más frecuentes son:\n\n1️⃣ ¿Cuánto cuesta? → Ofrecemos asesoría gratuita personalizada\n2️⃣ ¿Atienden MYPE? → Sí, trabajamos con empresas de todos los tamaños\n3️⃣ ¿Cómo garantizan confidencialidad? → Firmamos acuerdos y usamos sistemas seguros\n4️⃣ ¿Tengo contador dedicado? → Sí, asignamos un especialista por cliente\n\n¿Quieres saber más sobre alguna pregunta específica?",
  
  horario: "Nuestro horario de atención es de **Lunes a Viernes de 8:00 am a 6:00 pm**. Fuera de ese horario, puedes dejarnos un mensaje y te responderemos a la brevedad. ¡Nuestro chatbot está disponible 24/7!",
  
  gracias: "¡Gracias a ti por contactarnos! 😊 ¿Hay algo más en lo que pueda ayudarte?",
  
  hola: "¡Hola! 👋 Bienvenido a JD Consultores. ¿En qué puedo ayudarte? Puedes preguntarme sobre servicios, precios, horarios o contactarnos."
};

function addMessage(text, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
  messageDiv.innerHTML = text.replace(/\n/g, '<br>');
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing-indicator';
  typingDiv.id = 'typingIndicator';
  typingDiv.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById('typingIndicator');
  if (typing) typing.remove();
}

function getBotResponse(message) {
  const msg = message.toLowerCase().trim();
  if (msg.includes('hola') || msg.includes('buenas') || msg.includes('saludos')) return botResponses.hola;
  if (msg.includes('servicio') || msg.includes('hacen') || msg.includes('ofrecen')) return botResponses.servicios;
  if (msg.includes('precio') || msg.includes('cuesta') || msg.includes('costo') || msg.includes('honorario')) return botResponses.precios;
  if (msg.includes('contacto') || msg.includes('teléfono') || msg.includes('whatsapp') || msg.includes('ubicación')) return botResponses.contacto;
  if (msg.includes('pregunta') || msg.includes('faq') || msg.includes('duda')) return botResponses.faq;
  if (msg.includes('horario') || msg.includes('atencion') || msg.includes('atend')) return botResponses.horario;
  if (msg.includes('gracias') || msg.includes('graci')) return botResponses.gracias;
  return botResponses.default;
}

function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;
  addMessage(message, true);
  chatInput.value = '';
  showTyping();
  setTimeout(() => {
    removeTyping();
    const response = getBotResponse(message);
    addMessage(response, false);
    if (!document.querySelector('.suggestions')) {
      const suggestionsDiv = document.createElement('div');
      suggestionsDiv.className = 'suggestions';
      suggestionsDiv.innerHTML = `<button class="suggestion-btn" data-question="servicios">📋 Ver servicios</button><button class="suggestion-btn" data-question="precios">💰 Consultar precios</button><button class="suggestion-btn" data-question="contacto">📞 Contactar asesor</button><button class="suggestion-btn" data-question="faq">❓ Preguntas frecuentes</button>`;
      chatMessages.appendChild(suggestionsDiv);
      attachSuggestionEvents();
    }
  }, 800);
}

function attachSuggestionEvents() {
  document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.removeEventListener('click', suggestionClick);
    btn.addEventListener('click', suggestionClick);
  });
}

function suggestionClick(e) {
  const question = e.currentTarget.dataset.question;
  addMessage(e.currentTarget.textContent, true);
  showTyping();
  setTimeout(() => {
    removeTyping();
    let response = botResponses[question] || botResponses.default;
    addMessage(response, false);
  }, 500);
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
chatbotFloat.addEventListener('click', () => { chatWindow.classList.toggle('open'); });
chatClose.addEventListener('click', () => { chatWindow.classList.remove('open'); });
document.addEventListener('click', (e) => {
  if (!chatWindow.contains(e.target) && !chatbotFloat.contains(e.target) && chatWindow.classList.contains('open')) {
    chatWindow.classList.remove('open');
  }
});
attachSuggestionEvents();

// Hero delays manual
setTimeout(() => {
  document.getElementById('heroBadge')?.classList.add('visible');
  document.getElementById('heroTitle')?.classList.add('visible');
  document.getElementById('heroSub')?.classList.add('visible');
  document.getElementById('heroBtns')?.classList.add('visible');
  document.getElementById('heroStats')?.classList.add('visible');
}, 120);


// ==================== TABS PARA GALERÍA ====================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function switchTab(tabId) {
  // Ocultar todos los contenidos
  tabContents.forEach(content => {
    content.classList.remove('active');
  });
  
  // Desactivar todos los botones
  tabBtns.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Mostrar el contenido seleccionado
  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeContent) {
    activeContent.classList.add('active');
  }
  
  // Activar el botón correspondiente
  const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

// Agregar event listeners a los botones
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    switchTab(tabId);
  });
});

// Asegurar que las tarjetas dentro de los tabs también tengan animación
const observerTabs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Observar elementos dentro de los tabs
document.querySelectorAll('.checklist-card, .error-card, .tip-card').forEach(el => {
  observerTabs.observe(el);
});
/* ====== MODALES DE RECURSOS ====== */
(function() {
  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Abrir al hacer clic en la card
  document.querySelectorAll('.recurso-card[data-modal]').forEach(card => {
    card.addEventListener('click', function() {
      openModal(this.dataset.modal);
    });
  });

  // Cerrar con botón X
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeModal(this.closest('.recurso-modal'));
    });
  });

  // Cerrar al hacer clic en el backdrop
  document.querySelectorAll('.modal-backdrop').forEach(bd => {
    bd.addEventListener('click', function() {
      closeModal(this.closest('.recurso-modal'));
    });
  });

  // Cerrar con Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.recurso-modal.open').forEach(m => closeModal(m));
    }
  });

  // Cerrar al hacer clic en el botón CTA del modal (redirige a contacto)
  document.querySelectorAll('.modal-cta-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = this.closest('.recurso-modal');
      closeModal(modal);
      setTimeout(() => {
        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    });
  });
})();