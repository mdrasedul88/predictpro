const headerHTML = `
<header style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #0f172a; border-bottom: 1px solid #334155;">
    <div class="logo" style="color: #00ff88; font-weight: bold; font-size: 1.2rem;">SPORTSPRO</div>
    <div id="auth-buttons">
        <button onclick="openAuthModal()" style="background: #00ff88; color: #020617; border: none; padding: 8px 15px; border-radius: 5px; font-weight: bold; cursor: pointer;">
            <i class="fa-solid fa-user"></i> Login / Sign Up
        </button>
    </div>
</header>
`;

document.getElementById('header-root').innerHTML = headerHTML;
