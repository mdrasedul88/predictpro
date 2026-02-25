
<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Admin Panel</title>

<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

<style>

body{
    background:#0f172a;
    color:white;
    font-family:Poppins,sans-serif;
}

.card{
    background:#1e293b;
    padding:24px;
    border-radius:24px;
    margin-bottom:20px;
}

.btn-gold{
    background:#fbbf24;
    color:#0f172a;
    padding:10px 24px;
    border-radius:999px;
    font-weight:600;
}

</style>

</head>

<body class="p-5 max-w-5xl mx-auto">

<h2 class="text-3xl font-bold text-yellow-400 mb-6 text-center">
Admin Dashboard
</h2>

<!-- Prediction Add Form -->
<div class="card">

<h3 class="text-xl mb-4 text-yellow-400">Add Prediction</h3>

<input id="match" placeholder="Match Name"
class="w-full p-3 mb-3 bg-slate-900 border border-slate-700 rounded">

<textarea id="prediction" placeholder="Prediction Text"
class="w-full p-3 mb-3 bg-slate-900 border border-slate-700 rounded"></textarea>

<select id="type"
class="w-full p-3 mb-4 bg-slate-900 border border-slate-700 rounded">

<option value="free">Free</option>
<option value="vip">VIP</option>
<option value="live">Live</option>

</select>

<button onclick="addPrediction()" class="btn-gold w-full">
Add Prediction
</button>

</div>

<script>

/* ===== Supabase Connection ===== */

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_PUBLIC_ANON_KEY";

const supabase = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

/* ===== Admin Guard ===== */

async function adminGuard(){

    const { data } = await supabase.auth.getUser();

    if(!data.user){
        location.href="/";
        return;
    }

    const { data:userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", data.user.id)
    .single();

    if(!userData || userData.role !== "admin"){
        location.href="/";
    }
}

/* ===== Add Prediction ===== */

async function addPrediction(){

    const match = document.getElementById("match").value;
    const prediction = document.getElementById("prediction").value;
    const type = document.getElementById("type").value;

    await supabase.from("predictions").insert([
        {
            match_name:match,
            prediction_text:prediction,
            type:type,
            publish_date:new Date()
        }
    ]);

    alert("Prediction Added Successfully");

    document.getElementById("match").value="";
    document.getElementById("prediction").value="";

}

/* ===== Page Load ===== */

window.onload = adminGuard;

</script>

</body>
</html>
