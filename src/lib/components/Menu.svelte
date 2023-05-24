<script>
	import { onMount } from "svelte";
    import Logo from "../../lib/components/Logo.svelte";
    import { page } from '$app/stores';

    let menu = [
        {
            path: "/app/profile",
            name: "Profile",
            active: false
        },
        {
            path: "/app/apply",
            name: "Apply",
            active: false
        },
        {
            path: "/app/viewapplications",
            name: "View Appications",
            active: false
        },
        {
            path: "/app/applications",
            name: "Appications",
            active: false
        }
    ]

    const setActive = (path) => {
        menu.forEach(item => {
            if(item.path == path){
                item.active = true;
            }else{
                item.active = false;
            }
        });

        menu = [...menu];
    }

    onMount(() => {
        setActive($page.url.pathname);
    });

    page.subscribe(value => {
        setActive(value.url.pathname);
    });

   
</script>

<div class="menu-bar">
<div class="logo-menu">
    <div class="logo">
        <Logo/>
    </div>
    <div class="menu">
        {#each menu as menuItem}
            <a href={menuItem.path} class="menu-item {menuItem.active == true ? "active":""}"> {menuItem.name}</a>  
        {/each}
    </div>
</div>


<div class="logout">
    <span>
        
<svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36" fill="currentColor"><path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z"/></svg>
    </span>
<span>logout</span> 
</div>
</div>


<style>
    .menu-bar{
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
    }

    .logo-menu{
        padding-top: 1rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .menu{
        padding-top: 1rem;
        align-self: self-start;
        display: flex;
        flex-direction: column;
        justify-content: start;
        width: calc(100% - 3px - 0.4rem);
        padding-left: 0.4rem;
    }

    .menu-item{
        width: 100%;
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        font-weight: bold;
        font-size: large;
        text-decoration: none;
        color: #000000;
    }

    .menu-item:hover{
        cursor: pointer;
        border-right: 3px solid #1990D3;
        color: #1990D3;
    }

    .active {
        border-right: 3px solid #1990D3;
        color: #1990D3;
    }

    .logout{
        width: 100%;
        color: #D20000;
        font-size: large;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 0.5rem 0;
        margin-bottom: 1rem;
    }

    .logout:hover{
        cursor: pointer;
        background-color: #D20000;
        color: #FFFFFF;
    }

    a:link, a:visited {
        text-decoration: none;
    }

</style>