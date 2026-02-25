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
