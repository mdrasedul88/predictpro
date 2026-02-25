const bottomNavHTML = `
<div class="bottom-nav">
    <a href="index.html" class="nav-item active">
        <i class="icon-home"></i>
        <span>Home</span>
    </a>
    <a href="predictions.html" class="nav-item">
        <i class="icon-predict"></i>
        <span>Predictions</span>
    </a>
    <a href="live.html" class="nav-item">
        <div class="live-dot-container">
            <span class="live-dot"></span>
        </div>
        <span>Live</span>
    </a>
    <a href="vip.html" class="nav-item">
        <i class="icon-star"></i>
        <span>VIP Tips</span>
    </a>
    <a href="menu.html" class="nav-item">
        <i class="icon-menu"></i>
        <span>More</span>
    </a>
</div>
`;

document.body.insertAdjacentHTML('beforeend', bottomNavHTML);
