const headerHTML = `
<header id="main-header">
    <div class="header-container">
        <div class="logo">
            <span class="logo-icon">⚽</span>
            <span class="logo-text">Sports<span class="pro">PRO</span></span>
        </div>
        
        <nav class="desktop-menu">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="cricket.html">Cricket</a></li>
                <li><a href="football.html">Football</a></li>
            </ul>
        </nav>

        <div class="header-action">
            <a href="https://t.me/yourchannel" class="btn-join">
                <i class="icon-telegram"></i> <span>Join Now</span>
            </a>
        </div>
    </div>
</header>
`;

document.body.insertAdjacentHTML('afterbegin', headerHTML);

// Scroll Effect Logic
window.onscroll = function() {
    const header = document.getElementById("main-header");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
};
