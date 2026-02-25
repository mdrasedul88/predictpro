(function() {
    const SUPABASE_URL = 'https://cclfxvmpgkytzebuhwpj.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjbGZ4dm1wZ2t5dHplYnVod3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MDUyNTIsImV4cCI6MjA4NzQ4MTI1Mn0.-x_bxezKwaiJBdkTrJaXJuN95614sTHvTR3oBP_aLZQ';
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    async function initHeader() {
        const headerRoot = document.getElementById('header-root');
        if (!headerRoot) return;

        // ইউজার লগইন আছে কি না চেক করা
        const { data: { user } } = await supabaseClient.auth.getUser();
        
        // লগইন বাটনের প্রাথমিক অবস্থা
        let authElement = `<button onclick="window.location.href='login.html'" class="btn-predict">Login / Sign Up</button>`;

        // ইউজার লগইন থাকলে নাম এবং প্রোফাইল আইকন দেখাবে
        if (user) {
            const userName = user.user_metadata.full_name || "User";
            authElement = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="color: #00ff88; font-size: 0.8rem; font-weight: bold;">Hi, ${userName}</span>
                    <i class="fas fa-user-circle" onclick="window.location.href='profile.html'" style="color: #00ff88; font-size: 1.5rem; cursor: pointer;"></i>
                </div>`;
        }

        // আপনার আগের ডিজাইন (নাম এবং নোটিফিকেশন আইকন) ফিরিয়ে আনা হলো
        headerRoot.innerHTML = `
        <header style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #0f172a; border-bottom: 1px solid #334155;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <div class="logo" style="color: #00ff88; font-weight: bold; font-size: 1.2rem; cursor: pointer;" onclick="window.location.href='index.html'">SPORTSPRO</div>
                <i class="fas fa-bell" style="color: #94a3b8; font-size: 1.1rem; cursor: pointer;"></i>
            </div>
            <div id="auth-buttons">
                ${authElement}
            </div>
        </header>`;
    }

    initHeader();
})();
