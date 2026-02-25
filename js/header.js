// সুপাবেস কনফিগারেশন
const S_URL = 'https://cclfxvmpgkytzebuhwpj.supabase.co';
const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjbGZ4dm1wZ2t5dHplYnVod3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MDUyNTIsImV4cCI6MjA4NzQ4MTI1Mn0.-x_bxezKwaiJBdkTrJaXJuN95614sTHvTR3oBP_aLZQ';
const supabaseHeader = window.supabase.createClient(S_URL, S_KEY);

async function renderHeader() {
    // ইউজারের সেশন চেক করা
    const { data: { user } } = await supabaseHeader.auth.getUser();
    
    // লগইন না থাকলে এই বাটন দেখাবে
    let authHTML = `<button onclick="window.location.href='login.html'" class="btn-predict" style="background: #00ff88; color: #020617; border: none; padding: 8px 15px; border-radius: 5px; font-weight: bold; cursor: pointer;">Login / Sign Up</button>`;

    // লগইন থাকলে প্রোফাইল বাটন দেখাবে
    if (user) {
        const name = user.user_metadata.full_name || "User";
        authHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: #00ff88; font-size: 0.85rem; font-weight: bold;">Hi, ${name}</span>
                <button onclick="window.location.href='profile.html'" class="btn-predict" style="background: #1e293b; color: #00ff88; border: 1px solid #00ff88; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                    <i class="fas fa-user"></i>
                </button>
            </div>`;
    }

    const headerHTML = `
    <header style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #0f172a; border-bottom: 1px solid #334155;">
        <div class="logo" style="color: #00ff88; font-weight: bold; font-size: 1.2rem; cursor: pointer;" onclick="window.location.href='index.html'">SPORTSPRO</div>
        <div id="auth-buttons">
            ${authHTML}
        </div>
    </header>
    `;

    document.getElementById('header-root').innerHTML = headerHTML;
}

// পেজ লোড হওয়া মাত্রই হেডার রেন্ডার হবে
renderHeader();
