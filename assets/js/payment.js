async function unlockPrediction(predictionId){

    const user = await supabase.auth.getUser();

    if(!user.data.user){
        alert("Please login first");
        return;
    }

    showRewardAd();

    setTimeout(async ()=>{

        const expiry = new Date();
        expiry.setHours(expiry.getHours()+24);

        await supabase.from("unlock_logs").insert([
            {
                user_id:user.data.user.id,
                prediction_id:predictionId,
                unlock_time:new Date(),
                expire_time:expiry,
                status:"active"
            }
        ]);

        loadPage("free");

    },30000); // Ad watch simulation

}
function showRewardAd(){

    alert("Watching Ad... Please wait 30 seconds");

}
