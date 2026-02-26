(function() {
    const SUPABASE_URL = 'https://cclfxvmpgkytzebuhwpj.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjbGZ4dm1wZ2t5dHplYnVod3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MDUyNTIsImV4cCI6MjA4NzQ4MTI1Mn0.-x_bxezKwaiJBdkTrJaXJuN95614sTHvTR3oBP_aLZQ';
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // CSS আপডেট করা হয়েছে আপনার পাঠানো ছবির কালার থিম অনুযায়ী
    const style = document.createElement('style');
    style.innerHTML = `
        .premium-header {
            display: flex; justify-content: space-between; align-items: center; 
            padding: 12px 20px; background: rgba(5, 5, 5, 0.8); 
            backdrop-filter: blur(15px); border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            position: sticky; top: 0; z-index: 1000;
        }
        .logo-text {
            color: #ffffff; font-weight: 900; font-size: 1.2rem; 
            letter-spacing: 2px; text-shadow: 0 0 15px rgba(123, 97, 255, 0.5);
            cursor: pointer;
            text-transform: uppercase;
        }
        .right-section {
            display: flex; align-items: center; gap: 15px;
        }
        .bell-icon { color: #94a3b8; font-size: 1.1rem; transition: 0.3s; position: relative; cursor: pointer; }
        .bell-icon::after {
            content: ''; position: absolute; top: -1px; right: -1px;
            width: 7px; height: 7px; background: #7b61ff; border-radius: 50%;
            border: 2px solid #050505;
            box-shadow: 0 0 5px #7b61ff;
        }
        .user-hi { 
            color: #7b61ff; 
            font-size: 0.8rem; 
            font-weight: 800; 
            cursor: pointer; 
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .btn-login {
            background: #7b61ff; color: #ffffff; padding: 8px 18px; 
            border-radius: 10px; font-weight: 800; border: none; cursor: pointer;
            font-size: 0.75rem; text-transform: uppercase;
            box-shadow: 0 0 15px rgba(123, 97, 255, 0.3);
            transition: 0.3s;
        }
        .btn-login:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(123, 97, 255, 0.5);
        }
    `;
    document.head.appendChild(style);

    async function initHeader() {
        const headerRoot = document.getElementById('header-root');
        if (!headerRoot) return;

        const cachedUser = JSON.parse(localStorage.getItem('sb-cclfxvmpgkytzebuhwpj-auth-token'));
        let authHtml = `<button onclick="window.location.href='login.html'" class="btn-login">Login</button>`;

        if (cachedUser && cachedUser.user) {
            authHtml = renderUserSection();
        }

        renderHeader(headerRoot, authHtml);

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
