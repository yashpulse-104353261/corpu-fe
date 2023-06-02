<svelte:head>
    <title>Login</title> 
</svelte:head>

<script>
    import Logo from "../../lib/components/Logo.svelte";
    import CorpuAPI from "../../lib/api/CorpuAPI";
    import { notifications } from "../../lib/components/notification";
    import { UserStore } from "../../stores";
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';

    let loginData = {
        email: "",
        password: "",
    }

    onMount(() => {
        if($UserStore.isLoggedIn === true){
            history.back();
        }
    })


    const login = async () => {

        const response = await CorpuAPI.login(loginData.email, loginData.password)

        if(response?.data?.success === true){
            response?.data?.messages.forEach(message => {
                notifications.success(message,1000);
            });

            localStorage.setItem("authToken",response?.data?.auth_token);
            localStorage.setItem("refreshToken",response?.data?.refresh_token);
            localStorage.setItem("user",JSON.stringify(response?.data?.data));

            UserStore.set({
                isLoggedIn: true,
                user: response?.data?.data,
                authToken: response?.data?.auth_token,
                refreshToken: response?.data?.refresh_token,
                user: response?.data?.data?.user_type
            });

            window.location.pathname = "app/profile";
        }else{
            response?.data?.messages.forEach(message => {
                notifications.danger(message,1000);
            });
        } 
    }
</script>

<div class="login-page">
    <div class="login-box">

        <div class="logo">
            <Logo />
        </div>
        <div>
            <div class="input-box">
                <label for="email">email</label>
                <input type="email" id="email" name="email" placeholder="enter email" bind:value={loginData.email}>
            </div>
            <div class="input-box">
                <label for="password">password</label>
                <input type="password" id="password" name="password" placeholder="enter password" bind:value={loginData.password}>
            </div>
        </div>
        <div class="forgot-password">
            <span>forgot password?</span>
        </div>
        <div class="buttons">
            <button on:click={() => window.location.pathname = "signup"}>sign up</button>
            <button on:click={() => login()}>login</button>
        </div>

    </div>

</div>


<style>
    .login-page {
        width: 100vw;
        height: 100vh;
        background-color: #FCFCFC;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-box {
        background-color: #FFFFFF;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        border-radius: 0.4rem;
    }

    .input-box {
        padding-top: 1rem;
        gap: 0.2rem;
        display: flex;
        width: 24rem;
        flex-direction: column;
    }
    .input-box label{
        font-size: 1.2rem;
        font-weight: 500;
        padding-bottom: 0.2rem;
        letter-spacing: 0.2ch;
    }

    .input-box input{
        height: 2rem;
        box-shadow: 0.1px 0.1px 3px rgba(0, 0, 0, 0.25);
        border: none;
        border-radius: 0.4rem;
        padding-left: 1rem;
        letter-spacing: 0.2ch;
    }

    .input-box input:focus{
        outline: 1px solid #1990D3;
    }

    .buttons{
        display: flex;
        gap: 1rem;
        width: 100%;
        justify-content: space-between;
        padding: 2rem 0 0 0;
    }

    .buttons button{
        font-size: 1.2rem;
        font-weight: 500;
        color: #FFFFFF;
        width: 10rem;
        padding: 0.6rem;
        border: none;
        border-radius: 0.4rem;
        letter-spacing: 0.2ch;
        box-shadow: 0.1px 0.1px 3px rgba(0, 0, 0, 0.25);
    }

    .buttons button:hover{
        cursor: pointer;
    }

    .buttons button:nth-child(1){
        background-color: #7A7A7A;
    }

    .buttons button:nth-child(1):hover{
        background-color: #a09e9e;
    }

    .buttons button:nth-child(2){
        background-color: #1990D3;
    }

    .buttons button:nth-child(2):hover{
        background-color: #39a4e2;
    }

    .forgot-password{
        padding: 0.5rem 0 0 0;
        align-self: start;
        color: red;
        cursor: pointer;
    }

</style>