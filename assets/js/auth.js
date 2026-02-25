const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_PUBLIC_ANON_KEY";

const supabase = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

/* ---------- Modal Control ---------- */

function openAuthModal(){
    document.getElementById("authModal").classList.remove("hidden");
}

function closeAuthModal(){
    document.getElementById("authModal").classList.add("hidden");
}

/* ---------- Login ---------- */

async function loginUser(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if(error){
        alert(error.message);
        return;
    }

    location.reload();
}

/* ---------- Register ---------- */

async function registerUser(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signUp({
        email,
        password
    });

    if(error){
        alert(error.message);
        return;
    }

    alert("Registration successful. Check email.");
}
