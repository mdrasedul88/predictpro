// সুপাবেস কানেকশন (হেডারের জন্য আলাদাভাবে দেওয়া হলো)
const S_URL = 'https://cclfxvmpgkytzebuhwpj.supabase.co';
const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjbGZ4dm1wZ2t5dHplYnVod3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MDUyNTIsImV4cCI6MjA4NzQ4MTI1Mn0.-x_bxezKwaiJBdkTrJaXJuN95614sTHvTR3oBP_aLZQ';
const supabaseHeader = window.supabase.createClient(S_URL, S_KEY);

async function loadHeader() {
    const { data: { user } } = await supabaseHeader.auth.getUser();
    
    // বাটন লজিক: লগইন থাকলে প্রোফাইল দেখাবে, না থাকলে লগইন বাটন
    let authButton = `<button onclick="window.location.href='login.html'" class="btn-predict">Login / Sign Up</button>`;
    
    if (user) {
        authButton = `<button onclick="window.location.href='profile.html'" class="btn-predict" style="background: #1e293b; color: #00ff88; border: 1px solid #00ff88;">
            <i class="fas fa-user"></i> Profile
        </button>`;
    }

    const headerHTML = `
    <header style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #0f172a; border-bottom: 1px solid #334155;">
        <div class="logo" style="color: #00ff88; font-weight: bold; font-size: 1.2rem;">SPORTSPRO</div>
        <div id="auth-buttons">
            ${authButton}
        </div>
    </header>
    `;

    document.getElementById('header-root').innerHTML = headerHTML;
}

// ফাংশনটি কল করা হলো
loadHeader();
