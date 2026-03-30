// Layout Management Script
// This script centralizes Sidebar, Header and Footer management
// It automatically highlights the active page and handles mobile responsiveness

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Sidebar if it doesn't exist
    if (!document.querySelector('.sidebar')) {
        const sidebarHTML = `
    <aside class="sidebar">
        <div class="brand">
            <i class="fas fa-network-wired"></i> OBAGIS PROJECT
        </div>

        <a href="index.html" class="nav-item"><i class="fas fa-home"></i> Ana Sayfa</a>

        <div class="nav-category">Genel Yönetim</div>
        <a href="sonuc-raporu.html" class="nav-item"><i class="fas fa-file-contract"></i> Sonuç Raporu</a>
        <a href="kapanis_raporu_ve_surdurulebilirlik.html" class="nav-item"><i class="fas fa-flag-checkered"></i> Kapanış Raporu</a>
        <a href="ilce_paylasim_cikti_dosyasi.html" class="nav-item"><i class="fas fa-folder-open"></i> İlçe Dosyası</a>

        <div class="nav-category">Saha Araçları & Rehberler</div>
        <a href="egitim_programi_ve_takvim.html" class="nav-item"><i class="fas fa-calendar-alt"></i> Takvim & Plan</a>
        <a href="muhtar_koordinasyon_ve_duyuru.html" class="nav-item"><i class="fas fa-bullhorn"></i> Muhtar Duyuru</a>
        <a href="akran_rehberlik_modeli.html" class="nav-item"><i class="fas fa-users-cog"></i> Rehber Modeli</a>
        
        <div class="nav-category">Dijital Hizmetler</div>
        <a href="edevlet_rehberi.html" class="nav-item"><i class="fas fa-university"></i> e-Devlet</a>
        <a href="mhrs_rehberi.html" class="nav-item"><i class="fas fa-hospital-user"></i> MHRS</a>
        <a href="enabiz_rehberi.html" class="nav-item"><i class="fas fa-heartbeat"></i> e-Nabız</a>
        <a href="mobil_bankacilik_rehberi.html" class="nav-item"><i class="fas fa-mobile-alt"></i> Mobil Bankacılık</a>
        
        <div class="nav-category">Erişilebilirlik</div>
        <a href="ai_sesli_yonlendirme.html" class="nav-item"><i class="fas fa-microphone"></i> Sesli Asistan</a>
        <a href="kolay_dil_brosur_seti.html" class="nav-item"><i class="fas fa-book-open"></i> Kolay Dil</a>

        <div class="nav-category" style="margin-top: auto;">Durum</div>
        <div style="font-size: 0.85rem; color: #9ca3af; padding: 0 15px; margin-bottom: 20px;">
            <p>Sürüm: <strong style="color:white">v2.1 Pro</strong></p>
            <p>Durum: <span style="color: #10b981;">● Online</span></p>
        </div>
    </aside>`;
        
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    }

    // 2. Active Link Highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (itemPath === currentPage) {
            item.classList.add('active');
            item.style.backgroundColor = '#2563eb';
            item.style.color = 'white';
        }
    });

    // 3. Mobile Menu Toggle Button Injection
    if (!document.querySelector('.mobile-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.style.cssText = `
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 2000;
            background: #2563eb;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            display: none; /* Written in CSS media query */
        `;
        document.body.appendChild(toggleBtn);

        // Mobile Menu Logic
        toggleBtn.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('active');
        });
    }
});
