const footerTemplate = `
<style>
    .fix-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(10px);
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        z-index: 9999;
        padding-bottom: env(safe-area-inset-bottom);
    }
    .nav-bar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px 0;
    }
    .nav-item {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        transition: all 0.2s ease;
        -webkit-tap-highlight-color: transparent;
        position: relative;
    }
    /* আইকন কালার এবং স্টাইল */
    .nav-item i { font-size: 1.2rem; transition: 0.3s; }
    .nav-item span { font-size: 0.65rem; font-weight: 500; color: #94a3b8; }

    /* ইন্ডিভিজুয়াল প্রিমিয়াম কালার */
    .nav-item:nth-child(1) i { color: #3b82f6; } /* Home - Blue */
    .nav-item:nth-child(2) i { color: #ef4444; } /* Live - Red */
    .nav-item:nth-child(3) i { color: #facc15; } /* Free - Gold */
    .nav-item:nth-child(4) i { color: #00ff88; text-shadow: 0 0 10px rgba(0, 255, 136, 0.5); } /* VIP - Neon Green */
    .nav-item:nth-child(5) i { color: #a855f7; } /* Blog - Purple */
    .nav-item:nth-child(6) i { color: #00ff88; } /* Profile - Green */

    /* ক্লিক করলে রিয়েল-টাইম ফিডব্যাক (Animation) */
    .nav-item:active {
        transform: scale(0.9);
    }
    .nav-item:active i {
        filter: brightness(1.5);
    }

    /* বর্তমান পেজে থাকলে একটি গ্লো ইফেক্ট (Optional) */
    .nav-item.active-page i {
        transform: translateY(-3px);
    }
    .nav-item.active-page span {
        color: #fff;
        font-weight: bold;
    }
</style>

<footer class="fix-nav">
    <nav class="nav-bar">
        <a href="index.html" class="nav-item"><i class="fa-solid fa-house"></i><span>Home</span></a>
        <a href="live.html" class="nav-item"><i class="fa-solid fa-tower-broadcast"></i><span>Live</span></a>
        <a href="free.html" class="nav-item"><i class="fa-solid fa-gift"></i><span>Free</span></a>
        <a href="vip.html" class="nav-item"><i class="fa-solid fa-crown"></i><span>Vip</span></a>
        <a href="blog.html" class="nav-item"><i class="fa-solid fa-newspaper"></i><span>Blog</span></a>
        <a href="profile.html" class="nav-item"><i class="fa-solid fa-user"></i><span>Profile</span></a>
    </nav>
</footer>
`;

document.getElementById('footer-root').innerHTML = footerTemplate;

// ইউজার কোন পেজে আছে তা ডিটেক্ট করে 'active-page' ক্লাস বসানো
(function() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active-page');
        }
    });
})();
