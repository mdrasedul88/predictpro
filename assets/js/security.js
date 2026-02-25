async function generateSecurityToken(){

    const user = await supabase.auth.getUser();

    if(!user.data.user) return;

    const token = crypto.randomUUID();

    await supabase
    .from("users")
    .update({
        security_token: token
    })
    .eq("id", user.data.user.id);
}
async function checkSession(){

    const { data } = await supabase.auth.getSession();

    if(!data.session){
        return;
    }

    generateSecurityToken();
}
