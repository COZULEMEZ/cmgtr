// Intersection Observer for stable scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

// PR Section Tab Switching Logic
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');

    // Update button states
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Update content states
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    const activePane = document.getElementById(targetTab);
    if (activePane) activePane.classList.add('active');
  });
});

// Modal Content Data (DSP Deep Dives)
const serviceDetails = {
  'Spotify': {
    title: 'Spotify Dağıtım & PR',
    body: 'CMG, editoryal çalma listesi değerlendirmesine odaklanarak Spotify\'a doğrudan teslimat sağlar. Her yayın için görünürlüğü optimize etmek amacıyla özel Spotify hesap yöneticilerimizle pazarlama planlarını koordine ediyoruz.'
  },
  'YouTube': {
    title: 'YouTube Kanal & İçerik Yönetimi',
    body: 'Uzman kanal optimizasyonu ve Resmi Sanatçı Kanalı (OAC) doğrulaması yoluyla YouTube varlığınızı en üst düzeye çıkarın. Müziğinizin milyonlarca dinleyici tarafından bulunmasını sağlamak için meta verileri yönetiyoruz.'
  },
  'Tidal': {
    title: 'Tidal Doğrudan Yüksek Sadakatli Dağıtım',
    body: 'Ses kalitesine önem veren kitlelere ulaşın. Müziğinizin HiFi ve Master kalite katmanlarını destekleyen kayıpsız formatlarda Tidal\'a teslim edilmesini sağlıyoruz.'
  },
  'Apple Music': {
    title: 'Apple Music Stratejisi',
    body: 'Apple Music küratörleriyle olan ilişkilerimizden yararlanın. Küresel amiral gemisi çalma listelerinde yer almanız için gereken teknik meta verileri ve pazarlama ivmesini sağlıyoruz.'
  },
  'TikTok': {
    title: 'TikTok Viral Pazarlama',
    body: 'TikTok strateji ekibimiz sesleri ve trendleri belirlemenize yardımcı olur. Müziğinize viral olma şansını en iyi şekilde sunmak için etkileyicilerle koordinasyon sağlıyor ve ses varlıklarını yönetiyoruz.'
  }
};

// Modal Logic
const modal = document.getElementById("detailModal");
const modalBody = document.getElementById("modalBody");
const span = document.getElementsByClassName("close")[0];

document.querySelectorAll('.dsp-item').forEach(item => {
  item.onclick = function () {
    const key = this.getAttribute('title') || this.querySelector('span')?.innerText;
    if (serviceDetails[key]) {
      modalBody.innerHTML = `
        <h2 style="font-size: 32px; font-weight: 800; letter-spacing: -0.02em;">${serviceDetails[key].title}</h2>
        <div style="margin-top:24px; font-size:19px; line-height:1.6; color:#424245;">
          ${serviceDetails[key].body}
        </div>
      `;
      modal.style.display = "block";
    }
  }
});

if (span) {
  span.onclick = function () {
    modal.style.display = "none";
  }
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Smooth Scroll for Zenith Navigation with Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 60;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Form Submission Handler
const appForm = document.getElementById('applicationForm');
if (appForm) {
  appForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const artistName = document.getElementById('artistName').value;
    const email = document.getElementById('email').value;
    const links = document.getElementById('links').value;

    const subject = `Zenith Dağıtım Başvurusu: ${artistName}`;
    const body = `Tam Ad: ${name}%0D%0ASanatçı/Label: ${artistName}%0D%0AE-posta: ${email}%0D%0A%0D%0ABağlantılar/Bilgi:%0D%0A${encodeURIComponent(links)}`;

    window.location.href = `mailto:cozulemezmusicgroup@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });
}

console.log('CMG - Absolute Zenith Refinement Loaded');
