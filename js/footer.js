const footerTemplate = `
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
