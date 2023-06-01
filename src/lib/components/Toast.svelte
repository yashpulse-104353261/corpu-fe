<script>
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { notifications } from "./notification";

</script>

<div class="notifications">
    {#each $notifications as notification (notification.id)}
        <div
            animate:flip
            class="toast"
            style="background: white;"
            transition:fly={{ y: 30 }}
        >
           {#if notification.type == "danger"}
                <div class="content-danger">  <span>{notification.message}</span><span><svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36" fill="currentColor"><path d="M479.982-280q14.018 0 23.518-9.482 9.5-9.483 9.5-23.5 0-14.018-9.482-23.518-9.483-9.5-23.5-9.5-14.018 0-23.518 9.482-9.5 9.483-9.5 23.5 0 14.018 9.482 23.518 9.483 9.5 23.5 9.5ZM453-433h60v-253h-60v253Zm27.266 353q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg></span></div>
            {:else if notification.type == "success"}
            <div class="content-success">  <span>{notification.message}</span><span><svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36" fill="currentColor"><path d="m346-60-76-130-151-31 17-147-96-112 96-111-17-147 151-31 76-131 134 62 134-62 77 131 150 31-17 147 96 111-96 112 17 147-150 31-77 130-134-62-134 62Zm27-79 107-45 110 45 67-100 117-30-12-119 81-92-81-94 12-119-117-28-69-100-108 45-110-45-67 100-117 28 12 119-81 94 81 92-12 121 117 28 70 100Zm107-341Zm-43 133 227-225-45-41-182 180-95-99-46 45 141 140Z"/></svg></span></div>
           {/if}
        </div>
    {/each}
</div>

<style>
    .notifications {
        position: fixed;
        top: 10px;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        pointer-events: none;
    }

    .toast {
        flex: 0 0 auto;
        margin-bottom: 10px;
    }

    .content-danger {
        padding: 4px;
        padding-left: 8px;
        display: flex;
        color:#d47b7b;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        background-color: #F9E0E0;
        border-left: 4px solid #d47b7b;
        font-weight: bold;
        min-width: 15rem;
        max-width: 45rem;
        border-radius: 1rem;
    }

    .content-success {
        padding: 4px;
        padding-left: 8px;
        display: flex;
        color:#78d47b;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        background-color: #E5F9E0;
        border-left: 4px solid #78d47b;
        font-weight: bold;
        min-width: 15rem;
        max-width: 45rem;
        border-radius: 1rem;
    }
</style>
