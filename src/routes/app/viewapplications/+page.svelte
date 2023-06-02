<svelte:head>
    <title>View Applications</title> 
</svelte:head>
<script>
    import { onMount } from 'svelte';
    import CorpuAPI from '../../../lib/api/CorpuAPI';
    import { notifications } from "../../../lib/components/notification";
    import { fly } from "svelte/transition";
    import { backOut } from 'svelte/easing'

    let applications = [];

    onMount(() => {
        getApplications();
    });

    const getApplications = async (notify = true) => {
        const response = await CorpuAPI.getApplications();
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                if(notify){
                    notifications.success(message, 500);
                }
            });
            applications = response?.data?.data;
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

    const withdrawApplication = async (application_id) => {
        const response = await CorpuAPI.changeApplicationStatus(application_id, "Withdrawn");
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                notifications.success(message, 500);
            });
            getApplications(false);
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }
</script>


<div class="profile">
    <div class="header">
        <span class="header-title">View Applied Applications</span>
        <button class="hidden-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32" fill="currentColor"><path d="M840 373v503q0 24-18 42t-42 18H180q-24 0-42-18t-18-42V276q0-24 18-42t42-18h503l157 157Zm-60 27L656 276H180v600h600V400ZM479.765 811Q523 811 553.5 780.735q30.5-30.264 30.5-73.5Q584 664 553.735 633.5q-30.264-30.5-73.5-30.5Q437 603 406.5 633.265q-30.5 30.264-30.5 73.5Q376 750 406.265 780.5q30.264 30.5 73.5 30.5ZM233 472h358V329H233v143Zm-53-72v476-600 124Z"/></svg>
            <span>Save</span></button>
    </div>
    <div class="body">
        <!-- 1 -->

        {#each applications as application,i}
        <div class="body-row" in:fly={{
            y: 200,
            delay: 100 * i,
            easing: backOut
          }}>
            <div class="unit {application.application_status === "Processing" ? "processing" : application.application_status === "Submitted" ? "submitted" : application.application_status === "Successful" ? "successful" : application.application_status === "Withdrawn" ? "withdrawn" : application.application_status === "Unsuccessful" ? "unsuccessful" : "" }-box">
                <div class="unit-info">
                    <div class="unit-info-top">
                        <div class="unit-info-kv">
                            <span>Unit Code</span>
                            <span>{application.unit_id}</span>
                        </div>
                        <div class="unit-info-kv">
                            <span>Convenor Name</span>
                            <span>{application.convenor_name}</span>
                        </div>
                    </div>
                    <div class="unit-info-bottom">
                        <div class="unit-info-kv">
                            <span>Unit Name</span>
                            <span>{application.unit_name}</span>
                        </div>
                        {#if application.application_status === "Processing" || application.application_status === "Submitted"}
                        <div>
                            <button class="withdraw-btn" on:click={() => withdrawApplication(application.application_id) }>
                                <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="currentColor"><path d="m361-299 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570Zm-438 0v570-570Z"/></svg>
                                Withdraw</button>
                        </div>
                        {/if}
                    </div>
                </div>
                <div class="unit-controls">
                    <div class="applicantion-id">
                        <div class="unit-info-kv">
                            <span>Application&nbspID</span>
                            <span>{application.application_id}</span>
                        </div>
                    </div>
                    <div class="applicantion-status">
                        <div class="unit-info-kv">
                            <span>Status</span>
                            <span class="{application.application_status === "Processing" ? "processing" : application.application_status === "Submitted" ? "submitted" : application.application_status === "Successful" ? "successful" : application.application_status === "Withdrawn" ? "withdrawn" : application.application_status === "Unsuccessful" ? "unsuccessful" : "" }">{application.application_status}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            {:else}

            <h3>No Applications Found</h3>

        {/each}


      
    </div>
</div>


<style>
    .profile{
        max-width: calc(100% - 3rem);
        max-height: calc(100% - 1.5rem);
        margin: 1.5rem;
        background-color: #FFFFFF;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
        border-radius: 0.4rem;
    }

    .header{
        padding: 0.5rem 1.5rem;
        border-bottom: 1.5px solid #dfdfdf;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .header .header-title{
        font-size: x-large;
        font-weight: bold;
    }

    .body {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		gap: 1rem;		
        padding-bottom: 3rem;
        padding-top: 3rem;
        overflow-y: scroll;
        max-height: calc(100vh - 13rem);
        min-height: calc(100vh - 13rem);
	}

    .body .body-row{
        padding: 0.5rem 1.5rem;
        display: flex;
        width: calc(70% - 21rem);
        padding: 0 25rem;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }


    .unit{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
        border-radius: 0.4rem;
        padding: 1rem;
    }

    .unit-info{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .unit-info-top{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }

    .unit-info-bottom{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }

    .unit-info-kv{
        display: flex;
        flex-direction: column;
    }

    .unit-info-kv span:nth-child(1){
        font-weight: bold;
    }

    .unit-controls{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
    }

    .successful-box{
        background-color: #E5F9E0;
        border-left: 3px solid #78d47b;
    }

    .successful{
        color:#78d47b;
        font-weight: bold;
    }

    .unsuccessful-box{
        background-color: #F9E0E0;
        border-left: 3px solid #d47b7b;
    }

    .unsuccessful{
        color:#d47b7b;
        font-weight: bold;
    }

    .processing-box{
        background-color: #F9F3E0;
        border-left: 3px solid #d4b97b;
    }
    
    .processing{
        color:#d4b97b;
        font-weight: bold;
    }

    .withdrawn-box{
        background-color: #E0E0E0;
        border-left: 3px solid #7b7b7b;
    }

    .withdrawn{
        color:#7b7b7b;
        font-weight: bold;
    }

    .submitted-box{
        background-color: #E0E0F9;
        border-left: 3px solid #7b7bd4;
    }

    .submitted{
        color:#7b7bd4;
        font-weight: bold;
    }

    .hidden-btn{
        background-color: transparent;
        border: none;
        border-radius: 0.4rem;
        padding: 0.5rem 1.5rem;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: large;
    }

    .hidden-btn:hover{
        background-color: transparent;
    }

    .withdraw-btn{
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
        border: #b93838 1px solid;
        background-color: #F9E0E0;
        border-radius: 0.4rem;
        color: #b93838;
        padding: 0.1rem 0.5rem;
    }

    .withdraw-btn:hover{
        background-color: #b93838;
        color: #F9E0E0;
        cursor: pointer;
    }
   


</style>