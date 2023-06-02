
<script>
    import Toast from '$lib/components/Toast.svelte';
    import { UserStore } from '../stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import { notifications } from '../lib/components/notification';


    onMount(() => {
        checkUser();
        setTimeout(() => {
            loadSite = true;
        }, 100);
    });

    let loadSite = false;

    let availablePaths = [
        "/app/profile",
        "/app/apply",
        "/app/viewapplications",
        "/app/applications",
        "/app/unit",
        "/app/jobs",
        '/login',
        '/signup'
    ]

    let menu = [
        {
            path: "/app/profile",
            name: "Profile",
            active: false,
            visibleTo: ["Applicant","Admin","Permanent","Casual"]
        },
        {
            path: "/app/apply",
            name: "Apply",
            active: false,
            visibleTo: ["Applicant","Casual"]
        },
        {
            path: "/app/viewapplications",
            name: "View Applications",
            active: false,
            visibleTo: ["Applicant","Casual"]
        },
        {
            path: "/app/applications",
            name: "Applications",
            active: false,
            visibleTo: ["Admin","Permanent"]
        },{
            path: "/app/unit",
            name: "Units",
            active: false,
            visibleTo: ["Admin","Permanent"]
        },{
            path: "/app/jobs",
            name: "Jobs",
            active: false,
            visibleTo: ["Admin","Permanent"]
        },{
            path: "/login",
            name: "Login",
            active: false,
            visibleTo: ["Applicant","Admin","Permanent","Casual"]
        },{
            path: "/signup",
            name: "Sign Up",
            active: false,
            visibleTo: ["Applicant","Admin","Permanent","Casual"]
        }
    ]

    page.subscribe(value => {
        if(!availablePaths.includes(value.url.pathname)){
            if(browser){
                goto("/app/profile");
            }
        }

        let isInvalidPage = true;

        menu.forEach(item => {
            if(item.path == value.url.pathname){

                if($UserStore.userType === null){
                    isInvalidPage = false;
                }

                if(item.visibleTo.includes($UserStore.userType)){
                    isInvalidPage = false;
                }
            }
        });

        if(isInvalidPage){
            if(browser){
                notifications.danger("You are not allowed to access this page.",2500)
                goto("/app/profile");
            }
        }
    })


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
                refreshToken: refreshToken,
                userType: user.user_type
            });

            if (window.location.pathname == "/" || window.location.pathname == "" || window.location.pathname.includes("login") || window.location.pathname.includes("signup")){
                goto("/app/profile");
            }
        }else{
            if (window.location.pathname != "/login" && window.location.pathname != "/signup"){
                goto("/login");
            }
        }
    }
    }


    
</script>


{#if loadSite === true}
    <Toast />
    <slot/>
{/if}