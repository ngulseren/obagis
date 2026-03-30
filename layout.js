// Layout Management Script v2.0 - PWA Enhanced
// Sidebar, Header, Footer, Mobile UX, Bottom Nav, PWA Install

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Sidebar if it doesn't exist
    if (!document.querySelector('.sidebar')) {
        const sidebarHTML = `
    <div class="sidebar-overlay" id="sidebarOverlay"></div>
    <aside class="sidebar" id="sidebar">
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

    // 3. Mobile Menu Toggle Button
    if (!document.querySelector('.mobile-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-toggle';
        toggleBtn.id = 'mobileToggle';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.setAttribute('aria-label', 'Menüyü aç');
        document.body.appendChild(toggleBtn);

        const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');

        function openSidebar() {
            sidebar.classList.add('active');
            if (overlay) overlay.classList.add('active');
            toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden';
        }

        function closeSidebar() {
            sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }

        toggleBtn.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        // Close sidebar on overlay click
        if (overlay) {
            overlay.addEventListener('click', closeSidebar);
        }

        // Close sidebar on nav item click (mobile)
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });

        // Swipe to close sidebar
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchStartX - touchEndX;
            
            // Swipe left to close sidebar
            if (swipeDistance > 80 && sidebar.classList.contains('active')) {
                closeSidebar();
            }
            
            // Swipe right from left edge to open sidebar
            if (touchStartX < 30 && touchEndX - touchStartX > 80 && !sidebar.classList.contains('active')) {
                openSidebar();
            }
        }, { passive: true });
    }

    // 4. Bottom Navigation Bar (Mobile)
    if (!document.querySelector('.bottom-nav') && window.innerWidth <= 768) {
        const bottomNav = document.createElement('nav');
        bottomNav.className = 'bottom-nav';
        bottomNav.innerHTML = `
            <div class="bottom-nav-items">
                <a href="index.html" class="bottom-nav-item ${currentPage === 'index.html' || currentPage === '' ? 'active' : ''}">
                    <i class="fas fa-home"></i>
                    <span>Ana Sayfa</span>
                </a>
                <a href="edevlet_rehberi.html" class="bottom-nav-item ${currentPage === 'edevlet_rehberi.html' ? 'active' : ''}">
                    <i class="fas fa-university"></i>
                    <span>e-Devlet</span>
                </a>
                <a href="mhrs_rehberi.html" class="bottom-nav-item ${currentPage === 'mhrs_rehberi.html' ? 'active' : ''}">
                    <i class="fas fa-hospital-user"></i>
                    <span>MHRS</span>
                </a>
                <a href="whatsapp_rehberi.html" class="bottom-nav-item ${currentPage === 'whatsapp_rehberi.html' ? 'active' : ''}">
                    <i class="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                </a>
                <a href="#" class="bottom-nav-item" id="bottomNavMenu">
                    <i class="fas fa-th"></i>
                    <span>Menü</span>
                </a>
            </div>
        `;
        document.body.appendChild(bottomNav);

        // Bottom nav menu button opens sidebar
        document.getElementById('bottomNavMenu').addEventListener('click', (e) => {
            e.preventDefault();
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            const toggleBtn = document.getElementById('mobileToggle');
            sidebar.classList.add('active');
            if (overlay) overlay.classList.add('active');
            if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden';
        });
    }

    // 5. PWA Install Banner
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallBanner();
    });

    function showInstallBanner() {
        if (document.querySelector('.pwa-install-banner')) return;
        
        // Don't show if user already dismissed it
        if (sessionStorage.getItem('pwa-install-dismissed')) return;

        const banner = document.createElement('div');
        banner.className = 'pwa-install-banner';
        banner.style.display = 'flex';
        banner.innerHTML = `
            <div class="pwa-install-text">
                <strong>OBAGIS Uygulamasını Yükle</strong>
                <span>Hızlı erişim için ana ekranınıza ekleyin</span>
            </div>
            <button class="pwa-install-btn" id="pwaInstallBtn">Yükle</button>
            <button class="pwa-install-close" id="pwaCloseBtn">&times;</button>
        `;
        document.body.appendChild(banner);

        document.getElementById('pwaInstallBtn').addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                deferredPrompt = null;
                banner.remove();
            }
        });

        document.getElementById('pwaCloseBtn').addEventListener('click', () => {
            banner.remove();
            sessionStorage.setItem('pwa-install-dismissed', 'true');
        });
    }

    // 6. Online/Offline Status Indicator
    function updateOnlineStatus() {
        const statusEl = document.querySelector('.sidebar [style*="color: #10b981"], .sidebar [style*="color: #ef4444"]');
        if (!statusEl) return;
        
        const parent = statusEl.closest('p') || statusEl.parentElement;
        if (navigator.onLine) {
            parent.innerHTML = 'Durum: <span style="color: #10b981;">● Online</span>';
        } else {
            parent.innerHTML = 'Durum: <span style="color: #ef4444;">● Çevrimdışı</span>';
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // 7. Service Worker Registration (for subpages that include layout.js)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
});
