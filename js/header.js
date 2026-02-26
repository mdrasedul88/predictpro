(function() {
    const SUPABASE_URL = 'https://cclfxvmpgkytzebuhwpj.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjbGZ4dm1wZ2t5dHplYnVod3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MDUyNTIsImV4cCI6MjA4NzQ4MTI1Mn0.-x_bxezKwaiJBdkTrJaXJuN95614sTHvTR3oBP_aLZQ';
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // CSS ইনজেক্ট করা হচ্ছে প্রিমিয়াম লুকের জন্য
    const style = document.createElement('style');
    style.innerHTML = `
        .premium-header {
            display: flex; justify-content: space-between; align-items: center; 
            padding: 12px 20px; background: rgba(15, 23, 42, 0.9); 
            backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            position: sticky; top: 0; z-index: 1000;
        }
        .logo-text {
            color: #00ff88; font-weight: 900; font-size: 1.3rem; 
            letter-spacing: 1px; text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
            cursor: pointer;
        }
        .right-section {
            display: flex; align-items: center; gap: 15px;
        }
        .bell-icon { color: #94a3b8; font-size: 1.2rem; transition: 0.3s; position: relative; cursor: pointer; }
        .bell-icon::after {
            content: ''; position: absolute; top: -2px; right: -2px;
            width: 7px; height: 7px; background: #ef4444; border-radius: 50%;
            border: 2px solid #0f172a;
        }
        .user-hi { color: #00ff88; font-size: 0.85rem; font-weight: 700; cursor: pointer; }
        .btn-login {
            background: #00ff88; color: #020617; padding: 8px 16px; 
            border-radius: 8px; font-weight: bold; border: none; cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    async function initHeader() {
        const headerRoot = document.getElementById('header-root');
        if (!headerRoot) return;

        // দ্রুত লোড হওয়ার জন্য লোকাল স্টোরেজ চেক
        const cachedUser = JSON.parse(localStorage.getItem('sb-cclfxvmpgkytzebuhwpj-auth-token'));
        let authHtml = `<button onclick="window.location.href='login.html'" class="btn-login">Login</button>`;

        if (cachedUser && cachedUser.user) {
            authHtml = renderUserSection();
        }

        // প্রাথমিক রেন্ডার
        renderHeader(headerRoot, authHtml);

        // সুপাবেস থেকে লেটেস্ট সেশন চেক
        const { data: { user } } = await supabaseClient.auth.getUser();
        
        if (user) {
            renderHeader(headerRoot, renderUserSection());
        } else {
            renderHeader(headerRoot, `<button onclick="window.location.href='login.html'" class="btn-login">Login</button>`);
        }
    }

    function renderUserSection() {
        return `
            <div class="right-section">
                <span class="user-hi" onclick="window.location.href='profile.html'">(Hi)</span>
                <i class="fas fa-bell bell-icon"></i>
            </div>`;
    }

    function renderHeader(container, rightContent) {
        container.innerHTML = `
        <header class="premium-header">
            <div class="logo-text" onclick="window.location.href='index.html'">SPORTSPRO</div>
            <div id="auth-buttons">
                ${rightContent}
            </div>
        </header>`;
    }

    initHeader();
})();
