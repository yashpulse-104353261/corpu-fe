
<script>
    import Toast from '$lib/components/Toast.svelte';
    import { UserStore } from '../stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    onMount(() => {
        checkUser();
        setTimeout(() => {
            loadSite = true;
        }, 100);
    });

    let loadSite = false;


    const checkUser = () => {
        if($UserStore.isLoggedIn === false){
        let authToken = localStorage.getItem("authToken");
        let refreshToken = localStorage.getItem("refreshToken");
        let user = JSON.parse(localStorage.getItem("user"));

        if(authToken && refreshToken && user){
            UserStore.set({
                isLoggedIn: true,
                user: user,
                authToken: authToken,
                refreshToken: refreshToken
            });

            if (window.location.pathname == "/" || window.location.pathname == "" || window.location.pathname.includes("login") || window.location.pathname.includes("signup")){
                goto("app/profile");
            }
        }else{
            if (window.location.pathname != "/login" && window.location.pathname != "/signup"){
                goto("login");
            }
        }

    }
    }


    
</script>


{#if loadSite === true}
    <Toast />
    <slot/>
{/if}