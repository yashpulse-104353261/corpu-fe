<script>
    import Menu from "$lib/components/Menu.svelte";
</script>

<div class="app">
    <div class="menu">
        <Menu />
    </div>
    <div class="page">
        <slot></slot>
    </div>
</div>


<style>
    .app{
        display: flex;
        flex-direction: row;
        height: 100vh;
        width: 100vw;
    }

    .menu{
        width: 15%;
    }

    .page{
        width: 85%;
        background-color: #FCFCFC;
    }
</style>
