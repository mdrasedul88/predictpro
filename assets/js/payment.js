/* ===== Reward Ad Simulation Function ===== */

function showRewardAd(){

    alert("Watching Ad... Please wait 30 seconds");

}

/* ===== Prediction Access Check Logic ===== */

async function checkUnlockAccess(predictionId){

    const userSession = await supabase.auth.getUser();

    if(!userSession.data.user){
        return false;
    }

    const { data } = await supabase
    .from("unlock_logs")
    .select("*")
    .eq("user_id", userSession.data.user.id)
    .eq("prediction_id", predictionId)
    .eq("status","active");

    if(data && data.length > 0){
        return true;
    }

    return false;
}

async function submitPayment(){

    const user = await supabase.auth.getUser();

    if(!user.data.user){
        alert("Login Required");
        return;
    }

    const method = document.getElementById("paymentMethod").value;
    const amount = document.getElementById("amount").value;
    const transaction = document.getElementById("transaction").value;

    const screenshot = document.getElementById("screenshot").files[0];

    let screenshotURL = "";

    if(screenshot){

        const fileName = Date.now()+"_"+screenshot.name;

        const { data } = await supabase.storage
        .from("payment-proof")
        .upload(fileName, screenshot);

        screenshotURL = data.path;
    }

    await supabase.from("payments").insert([
        {
            user_id:user.data.user.id,
            method:method,
            amount:amount,
            transaction_id:transaction,
            screenshot_url:screenshotURL,
            status:"pending"
        }
    ]);

    alert("Payment submitted. Wait for admin approval.");

    loadPage("profile");
}
/* ===== Unlock Prediction Engine ===== */

async function unlockPrediction(predictionId){

    const userSession = await supabase.auth.getUser();

    if(!userSession.data.user){
        alert("Please login first");
        return;
    }

    showRewardAd();

    setTimeout(async ()=>{

        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours()+24);

        await supabase.from("unlock_logs").insert([
            {
                user_id:userSession.data.user.id,
                prediction_id:predictionId,
                unlock_time:new Date(),
                expire_time:expiryTime,
                status:"active"
            }
        ]);

        loadPage("free");

    },30000);

}
