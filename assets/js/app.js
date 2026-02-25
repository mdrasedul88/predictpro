async function loadPage(page){

    try{

        const response = await fetch(page+".html");
        const html = await response.text();

        document.getElementById("mainContent").innerHTML = html;

        window.history.pushState({}, "", page);

        window.scrollTo(0,0);

    }catch(err){
        console.log(err);
    }
}

/* Navigation Click Handler */

document.querySelectorAll(".nav-link").forEach(link=>{
    link.addEventListener("click", function(e){

        e.preventDefault();

        const page = this.getAttribute("data-page");

        loadPage(page);

    });
});
