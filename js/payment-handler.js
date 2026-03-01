// Supabase এবং গ্লোবাল ভেরিয়েবল
const S_URL = 'https://cclfxvmpgkytzebuhwpj.supabase.co';
const S_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjbGZ4dm1wZ2t5dHplYnVod3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MDUyNTIsImV4cCI6MjA4NzQ4MTI1Mn0.-x_bxezKwaiJBdkTrJaXJuN95614sTHvTR3oBP_aLZQ';
const _supabase = supabase.createClient(S_URL, S_KEY);

let WALLETS = {}; 
let selected = {}; 
let isLocal = true; 
let rates = { eth: 0, sol: 0 }; 
let currentUser = null;

// নম্বর এবং অ্যাড্রেস ডাটাবেস থেকে নিয়ে আসা
async function fetchWallets() {
    const { data, error } = await _supabase.from('wallets').select('*');
    if (!error) {
        data.forEach(item => {
            WALLETS[item.method_name] = item.address;
        });
    }
}

async function init() {
    const { data: { session } } = await _supabase.auth.getSession();
    currentUser = session ? session.user : null;
    
    try {
        const r = await fetch('https://api.coingecko.com/api/v3/simple price?ids=ethereum,solana&vs_currencies=usd');
        const d = await r.json(); 
        rates.eth = d.ethereum.usd; 
        rates.sol = d.solana.usd;
        
        const loc = await fetch('https://ipapi.co/json/');
        const lData = await loc.json(); 
        isLocal = (lData.country_code === 'BD');
    } catch(e) { isLocal = true; }

    await fetchWallets(); // নম্বর লোড করা
    loadPlans();
}

async function loadPlans() {
    const { data } = await _supabase.from('subscription_plans').select('*').eq('is_active', true);
    document.getElementById('plan-list').innerHTML = data.map(p => `
        <div class="premium-card animate__animated animate__fadeInUp">
            <div class="vip-badge">VIP</div>
            <div class="plan-icon"><i class="fas fa-crown"></i></div>
            <div class="plan-name">${p.plan_name}</div>
            <div class="plan-price">${isLocal ? '৳'+p.price_bdt : '$'+p.price_usd}</div>
            <ul class="plan-features">
                <li><i class="fas fa-check"></i> VIP Match Tips</li>
                <li><i class="fas fa-check"></i> 24/7 Priority Support</li>
                <li><i class="fas fa-check"></i> High Accuracy Rates</li>
            </ul>
            <button class="btn-premium" onclick="checkAccess(${p.price_usd}, ${p.price_bdt}, '${p.plan_name}', ${p.duration_days})">
                ACTIVATE VIP
            </button>
        </div>`).join('');
}

function checkAccess(usd, bdt, name, days) {
    if(!currentUser) {
        Swal.fire({ title: 'Login Required', text: 'দয়া করে আগে লগইন করুন।', icon: 'info', confirmButtonColor: '#7b61ff' })
        .then(() => window.location.href = 'login.html');
        return;
    }
    selected = { usd, bdt, name, days };
    const m = document.getElementById('mth');
    m.innerHTML = isLocal ? 
        `<option value="bKash">bKash</option><option value="Nagad">Nagad</option>` : 
        `<option value="USDT">USDT (TRC20)</option><option value="ETH">ETH (ERC20)</option><option value="SOL">SOL (Solana)</option>`;
    updateUI();
    document.getElementById('pModal').style.display = 'flex';
}

function updateUI() {
    const method = document.getElementById('mth').value;
    let amt = isLocal ? `৳${selected.bdt}` : `$${selected.usd}`;
    if(!isLocal) {
        if(method === "ETH") amt = (selected.usd / rates.eth).toFixed(5) + " ETH";
        else if(method === "SOL") amt = (selected.usd / rates.sol).toFixed(4) + " SOL";
        else if(method === "USDT") amt = selected.usd + " USDT";
    }
    document.getElementById('display-amount').innerText = amt;
    document.getElementById('display-address').innerText = WALLETS[method] || "Updating...";
}

async function finalOrderSubmit() {
    const mInfo = document.getElementById('mInfo').value;
    const trx = document.getElementById('trxId').value;
    const btn = document.getElementById('sub-btn');
    if(!mInfo || !trx) { Swal.fire('Error', 'সব ঘর পূরণ করুন', 'error'); return; }
    
    btn.disabled = true; btn.innerText = "VERIFYING...";
    try {
        const { error } = await _supabase.from('payment_requests').insert([{
            user_email: currentUser.email, mobile: mInfo, plan_name: selected.name,
            duration: selected.days, amount: document.getElementById('display-amount').innerText,
            payment_method: document.getElementById('mth').value,
            currency: isLocal ? 'BDT' : 'CRYPTO', transaction_id: trx, status: 'pending'
        }]);
        if(error) throw error;
        Swal.fire({ title: 'Success!', text: 'হোমে ফিরে যাচ্ছি...', icon: 'success', timer: 2000, showConfirmButton: false });
        setTimeout(() => window.location.href = 'index.html', 2000);
    } catch(e) {
        Swal.fire('Error', e.message, 'error');
        btn.disabled = false; btn.innerText = "SUBMIT REQUEST";
    }
}

init();
