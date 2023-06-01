<script>
    import { onMount } from 'svelte';
    import CorpuAPI from '../../../lib/api/CorpuAPI';
    import { notifications } from "../../../lib/components/notification";
    import { fly } from "svelte/transition";
    import { backOut } from 'svelte/easing'
    import { goto } from "$app/navigation";

    let jobs = [];

    onMount(() => {
        getProfileStatus();
    });

    let profileStatus = {
        profile_completion_percentage : 0,
        is_profile_completed : false,
    }

    $: if(profileStatus.is_profile_completed === true){
        getJobs();
    }

    const getJobs = async (notify = true) => {
        const response = await CorpuAPI.getJobs("active");
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                if(notify){
                    notifications.success(message, 500);
                }
            });
            jobs = response?.data?.data;
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

    let jobToView = {}

    const getProfileStatus = async (notify = true) => {
               
        let response = await CorpuAPI.getProfileStatus();
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                if(notify){
                    notifications.success(message, 500);
                }
            });
            profileStatus = response?.data?.data;
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

    const viewJob = (job) => {
        jobToView = job;
        const dialog = document.getElementById('view-requirements');
        dialog.showModal();
    }


    const apply = async(unit_ad_id) => {
        const response = await CorpuAPI.apply(unit_ad_id);
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                notifications.success(message, 500);
            });
            const dialog = document.getElementById('view-requirements');
            dialog.close();
            getJobs(false);
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }
</script>

<dialog id="view-requirements">

    <div class="modal">
        <span class="job-title">{jobToView.unit_id} : {jobToView.unit_name} - Job Requirements</span>
        <span class="job-description">{jobToView.unit_requirements_text}</span>
            <span><strong>Convenor Name:</strong> {jobToView.convenor_name}</span>
        
          <div class="modal-button">
            {#if jobToView.application_status === null}
              <button class="apply-btn" on:click={() => apply(jobToView.unit_ad_id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="currentColor"><path d="M480-80q-85 0-158-30.5T195-195q-54-54-84.5-127T80-480q0-84 30.5-157T195-764q54-54 127-85t158-31q75 0 140 24t117 66l-43 43q-44-35-98-54t-116-19q-145 0-242.5 97.5T140-480q0 145 97.5 242.5T480-140q37 0 71.5-7t66.5-21l45 46q-41 20-87 31t-96 11Zm290-90v-120H650v-60h120v-120h60v120h120v60H830v120h-60ZM421-298 256-464l45-45 120 120 414-414 46 45-460 460Z"/></svg>
                  Apply</button>
              {:else}
              <button class="applied-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32" fill="currentColor"><path d="m421 758 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
                  Applied</button>
              {/if}

            <form method="dialog">
                <button class="close-modal">OK</button>
            </form>
              
          </div>
    </div>  
  </dialog>

<div class="profile">
    <div class="header">
        <span class="header-title">Apply</span>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32" fill="currentColor"><path d="M120 896V256l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0V346v457Z"/></svg>
            <span>Submit</span></button>
    </div>
    <div class="body">

        {#if profileStatus.is_profile_completed === false}
        <div class="body-row">
            <div class="profile-warning">
                <span>Profile is incomplete. Please complete your profile before applying for units.</span>
                <button class="profile-btn" on:click={() => goto('/app/profile')}>Complete Profile</button>
            </div>
        </div>
        {/if}

        {#if profileStatus.is_profile_completed === true}
        <div class="body-row">
            <div class="units-apply">
                select units to apply for
            </div>
        </div>

        

        {#each jobs as job,i}
        <div class="body-row" in:fly={{
            y: 200,
            delay: 100 * i,
            easing: backOut
          }}>
            <div class="unit">
                <div class="unit-info">
                    <div class="unit-info-top">
                        <div class="unit-info-kv">
                            <span>Unit Code</span>
                            <span>{job.unit_id}</span>
                        </div>
                        <div class="unit-info-kv">
                            <span>Convenor Name</span>
                            <span>{job.convenor_name}</span>
                        </div>
                    </div>
                    <div class="unit-info-bottom">
                        <div class="unit-info-kv">
                            <span>Unit Name</span>
                            <span>{job.unit_name}</span>
                        </div>
                    </div>
                </div>
                <div class="unit-controls">
                    <div>
                        <button class="view-btn" on:click={() => viewJob(job)}><svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32" fill="currentColor"><path d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-146 0-264-83T40 556q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601 796 702.5 730.5 804 665 857 556q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359 316 257.5 381.5 156 447 102 556q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"/></svg> View&nbspRequirements</button>
                    </div>
                    <div>
                        {#if job.application_status === null}
                        <button class="apply-btn" on:click={() => apply(job.unit_ad_id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="currentColor"><path d="M480-80q-85 0-158-30.5T195-195q-54-54-84.5-127T80-480q0-84 30.5-157T195-764q54-54 127-85t158-31q75 0 140 24t117 66l-43 43q-44-35-98-54t-116-19q-145 0-242.5 97.5T140-480q0 145 97.5 242.5T480-140q37 0 71.5-7t66.5-21l45 46q-41 20-87 31t-96 11Zm290-90v-120H650v-60h120v-120h60v120h120v60H830v120h-60ZM421-298 256-464l45-45 120 120 414-414 46 45-460 460Z"/></svg>
                            Apply</button>
                        {:else}
                        <button class="applied-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32" fill="currentColor"><path d="m421 758 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
                            Applied</button>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
        {/each}       
    {/if}
    </div>
</div>


<style>
    .profile{
        max-width: calc(100% - 1.5rem);
        max-height: calc(100% - 1.5rem);
        margin: 1.5rem;
        background-color: #FFFFFF;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
        border-radius: 0.4rem;
    }

    .units-apply{
        font-size: 1.2rem;
        font-weight: bold;
        letter-spacing: 0.2ch;
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

    .header button{
        background-color: transparent;
        border: none;
        border-radius: 0.4rem;
        padding: 0.5rem 1.5rem;
        color: transparent;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: large;
    }

    .header button:hover{
        background-color: transparent;
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

    .units-apply{
        width: 100%;
        justify-self: start;
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
        align-items: center;
        gap: 1rem;
    }

    .view-btn{
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        border: #097abb 1px solid;
        background-color: #FFFFFF;
        border-radius: 0.4rem;
        color: #097abb;
        padding: 0.5rem;
    }

    .view-btn:hover{
        background-color: #097abb;
        color: #FFFFFF;
        cursor: pointer;
    }

    .apply-btn{
        display: flex;
        gap: 1rem;
        width: 11.3rem;
        justify-content: space-between;
        align-items: center;
        border: #78d47b 1px solid;
        background-color: #FFFFFF;
        border-radius: 0.4rem;
        color: #78d47b;
        padding: 0.5rem;
    }

    .apply-btn:hover{
        background-color: #78d47b;
        color: #FFFFFF;
        cursor: pointer;
    }

    .applied-btn{
        display: flex;
        gap: 1rem;
        width: 11.3rem;
        justify-content: space-between;
        align-items: center;
        border: #78d47b 1px solid;
        background-color: #78d47b;
        border-radius: 0.4rem;
        color: #FFFFFF;
        padding: 0.5rem;
    }

    #view-requirements{
        border: none;
        outline: none;
        padding: 0 !important;
        border-radius: 0.5rem;

    }

    .modal{
        padding: 5rem;
        margin: 1px !important;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        max-width: 50rem;
    }

    .job-title{
        font-size: larger;
        font-weight: bold;
        padding-bottom: 1rem;
    }

    .job-description{
        font-size: large;
        padding-bottom: 1rem;
    }

    .modal-button{
        padding-top: 1.5rem;
        justify-content: space-between;
        display: flex;
    }

    .close-modal{
        background-color: #FFFFFF;
        color: #097abb;
        border: none;
        border-radius: 0.4rem;
        padding: 0.5rem 2rem ;
        font-size: large;
        /* border: #097abb 1px solid; */
    }

    .close-modal:hover{
        background-color: #097abb;
        color: #FFFFFF;
        cursor: pointer;
    }

    .profile-warning{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: 0.4rem;
        background-color: #FFFFFF;
        color: #d47b7b;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);

    }

    .profile-warning span:nth-child(1){
        font-weight: bold;
    }


    .profile-warning button{
        background-color: #FFFFFF;
        color: #097abb;
        border: none;
        border-radius: 0.4rem;
        padding: 0.5rem 2rem ;
        font-size: large;
        border: #097abb 1px solid;
    }

    .profile-warning button:hover{
        background-color: #097abb;
        color: #FFFFFF;
        cursor: pointer;
    }
   


</style>