<script>
    import { onMount } from 'svelte';
    import CorpuAPI from '../../../lib/api/CorpuAPI';
    import { notifications } from "../../../lib/components/notification";


    let profile = {
        user_id:null,
        user_first_name:null,
        user_middle_name:null,
        user_last_name:null,
        user_street_address:null,
        user_city:null,
        user_state:null,
        user_postcode:null,
        user_email:null,
        user_phone:null,
        user_type:null
    };

    let cv = null;

    let profileStatus = {
        profile_completion_percentage : 0,
        is_profile_completed : false,
    }

    let cvFile = null;

    let availability = [];

    let isAvailabilityChanged = false;

    const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    });


    $: if (cvFile?.length > 0){
        uploadCV();
    }

    let tableRows = [
        [
            "07:00 AM",
            "Monday--07:00 AM--08:00 AM",
            "Tuesday--07:00 AM--08:00 AM",
            "Wednesday--07:00 AM--08:00 AM",
            "Thursday--07:00 AM--08:00 AM",
            "Friday--07:00 AM--08:00 AM",
        ],[
            "08:00 AM",
            "Monday--08:00 AM--09:00 AM",
            "Tuesday--08:00 AM--09:00 AM",
            "Wednesday--08:00 AM--09:00 AM",
            "Thursday--08:00 AM--09:00 AM",
            "Friday--08:00 AM--09:00 AM",
        ],[
            "09:00 AM",
            "Monday--09:00 AM--10:00 AM",
            "Tuesday--09:00 AM--10:00 AM",
            "Wednesday--09:00 AM--10:00 AM",
            "Thursday--09:00 AM--10:00 AM",
            "Friday--09:00 AM--10:00 AM",
        ],[
            "10:00 AM",
            "Monday--10:00 AM--11:00 AM",
            "Tuesday--10:00 AM--11:00 AM",
            "Wednesday--10:00 AM--11:00 AM",
            "Thursday--10:00 AM--11:00 AM",
            "Friday--10:00 AM--11:00 AM",
        ],[
            "11:00 AM",
            "Monday--11:00 AM--12:00 PM",
            "Tuesday--11:00 AM--12:00 PM",
            "Wednesday--11:00 AM--12:00 PM",
            "Thursday--11:00 AM--12:00 PM",
            "Friday--11:00 AM--12:00 PM",
        ],[
            "12:00 PM",
            "Monday--12:00 PM--01:00 PM",
            "Tuesday--12:00 PM--01:00 PM",
            "Wednesday--12:00 PM--01:00 PM",
            "Thursday--12:00 PM--01:00 PM",
            "Friday--12:00 PM--01:00 PM",
        ],[
            "01:00 PM",
            "Monday--01:00 PM--02:00 PM",
            "Tuesday--01:00 PM--02:00 PM",
            "Wednesday--01:00 PM--02:00 PM",
            "Thursday--01:00 PM--02:00 PM",
            "Friday--01:00 PM--02:00 PM",
        ],[
            "02:00 PM",
            "Monday--02:00 PM--03:00 PM",
            "Tuesday--02:00 PM--03:00 PM",
            "Wednesday--02:00 PM--03:00 PM",
            "Thursday--02:00 PM--03:00 PM",
            "Friday--02:00 PM--03:00 PM",
        ],[
            "03:00 PM",
            "Monday--03:00 PM--04:00 PM",
            "Tuesday--03:00 PM--04:00 PM",
            "Wednesday--03:00 PM--04:00 PM",
            "Thursday--03:00 PM--04:00 PM",
            "Friday--03:00 PM--04:00 PM",
        ],[
            "04:00 PM",
            "Monday--04:00 PM--05:00 PM",
            "Tuesday--04:00 PM--05:00 PM",
            "Wednesday--04:00 PM--05:00 PM",
            "Thursday--04:00 PM--05:00 PM",
            "Friday--04:00 PM--05:00 PM",
        ],[
            "05:00 PM",
            "Monday--05:00 PM--06:00 PM",
            "Tuesday--05:00 PM--06:00 PM",
            "Wednesday--05:00 PM--06:00 PM",
            "Thursday--05:00 PM--06:00 PM",
            "Friday--05:00 PM--06:00 PM",
        ],[
            "06:00 PM",
            "Monday--06:00 PM--07:00 PM",
            "Tuesday--06:00 PM--07:00 PM",
            "Wednesday--06:00 PM--07:00 PM",
            "Thursday--06:00 PM--07:00 PM",
            "Friday--06:00 PM--07:00 PM",
        ]
    ]


    let isEdit = false;

    onMount(() => {
       getProfile(true);
       getCV(true);
       getAvailability(true);
    });

    const getProfile = async (notify = true) => {
               
        let response = await CorpuAPI.getProfile();
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                if(notify){
                    notifications.success(message, 500);
                }
            });
            profile = response?.data?.data;
            getProfileStatus(false);
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

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

    const getCV = async (notify = true) => {

        let response = await CorpuAPI.getCv();
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                if(notify){
                    notifications.success(message, 500);
                }
            });
            cv = response?.data?.data.user_cv;
            getProfileStatus(false);
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });

            cv = null;
        }
    }


    const uploadCV = async () => {
        cv = await toBase64(cvFile[0])

        let response = await CorpuAPI.uploadCv(cv);
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                notifications.success(message, 500);
            });
            getCV(false);
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

    const saveProfile = async () => {
        const response = await CorpuAPI.updateProfile(profile.user_first_name,profile.user_middle_name,profile.user_last_name,profile.user_street_address,profile.user_city,profile.user_state,profile.user_postcode,profile.user_phone);
        updateAvailability();
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                notifications.success(message, 1500);
            });
            getProfile(false);
            isEdit = false;
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }
    

    const toggleAvailability = (availabilityId) => {

        if(isEdit === false){
            return;
        }
        
        isAvailabilityChanged = true;

        if(availability.includes(availabilityId)){
            availability = availability.filter(item => item !== availabilityId);
        }else{
            availability.push(availabilityId);
            availability = availability;
        }
    }


    const updateAvailability = async () => {

        if(isAvailabilityChanged === false){
            return;
        }

        const response = await CorpuAPI.updateAvailability(availability);

        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                notifications.success(message, 1500);
            });
            getAvailability(false);
            isEdit = false;
            isAvailabilityChanged = false;
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

    const getAvailability = async (notify = true) => {
               
        let response = await CorpuAPI.getAvailability();
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                if(notify){
                    notifications.success(message, 500);
                }
            });
            availability = response?.data?.data;
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

    let cssVariables = `--progress-color: ${"#7b7b7b"}`;

    $: if(profileStatus.profile_completion_percentage >= 0 && profileStatus.profile_completion_percentage <= 35){
        cssVariables = `--progress-color: ${"#ff0000"}`;
    }else if(profileStatus.profile_completion_percentage >= 36 && profileStatus.profile_completion_percentage <= 60){
        cssVariables = `--progress-color: ${"#ff8000"}`;
    }else if(profileStatus.profile_completion_percentage >= 61 && profileStatus.profile_completion_percentage <= 75){
        cssVariables = `--progress-color: ${"#e0e022"}`;
    }else if(profileStatus.profile_completion_percentage >= 76 && profileStatus.profile_completion_percentage <= 99){
        cssVariables = `--progress-color: ${"#e0e022"}`;
    }else if(profileStatus.profile_completion_percentage === 100){
        cssVariables = `--progress-color: ${"#00ff00"}`;
    }


    

</script>


<div class="profile">
    <div class="header">
    
            <span class="header-title">Profile</span>

            <div class="header-actions">
                <div id="progress-circle">
                    <div id="progress-indicator" style="{cssVariables}">
                            {profileStatus.profile_completion_percentage} %
                    </div>
                </div>
        {#if isEdit === true}
        <button class="save" on:click={() => saveProfile()}>
            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32" fill="currentColor"><path d="M840 373v503q0 24-18 42t-42 18H180q-24 0-42-18t-18-42V276q0-24 18-42t42-18h503l157 157Zm-60 27L656 276H180v600h600V400ZM479.765 811Q523 811 553.5 780.735q30.5-30.264 30.5-73.5Q584 664 553.735 633.5q-30.264-30.5-73.5-30.5Q437 603 406.5 633.265q-30.5 30.264-30.5 73.5Q376 750 406.265 780.5q30.264 30.5 73.5 30.5ZM233 472h358V329H233v143Zm-53-72v476-600 124Z"/></svg>
            <span>Save</span></button>
            {:else}
        <button on:click={() => isEdit = !isEdit} class="edit">
            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="currentColor"><path d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>
            <span>Edit</span></button>
            {/if}
        </div>
    </div>
    <div class="body">
        <div class="body-row">
            <div class="input-box">
                <label for="first_name">first name</label>
                <input type="text" name="first_name" id="first_name" placeholder="enter first name" bind:value={profile.user_first_name} readonly={!isEdit}/>
            </div>
            <div class="input-box">
                <label for="middle_name">middle name</label>
                <input type="text" name="middle_name" id="middle_name" placeholder="enter middle name" bind:value={profile.user_middle_name} readonly={!isEdit}/>
            </div>
        </div>
        <div class="body-row">
            <div class="input-box">
                <label for="last_name">last name</label>
                <input type="text" name="last_name" id="last_name" placeholder="enter last name" bind:value={profile.user_last_name} readonly={!isEdit}/>
            </div>
            <div class="input-box">
                <label for="phone">phone</label>
                <input type="text" name="phone" id="phone" placeholder="enter phone" bind:value={profile.user_phone} readonly={!isEdit}/>
            </div>
        </div>
        <div class="body-row">
            <div class="input-box">
                <label for="email">email</label>
                <input type="email" name="email" id="email" placeholder="enter email" bind:value={profile.user_email} readonly={true}/>
            </div>
        </div>
        <div class="body-row">
            <div class="input-box">
                <label for="cv">upload cv</label>
                <div class="input-file">
                    <div class="upload-area">
                        <input class="box-file" type="file" name="cv" id="cv" disabled={!isEdit} bind:files={cvFile} multiple={false} accept="application/pdf">
                        <label for="cv" class="upload-area"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M452 854h60V653l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220 976q-24 0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554V236H220v680h520V422H551ZM220 236v186-186 680-680Z"/></svg> <div><strong>choose a file </strong><span class="box-dragndrop"> or drag it here</span>.</div></label>
                    </div>
                </div>
                {#if cv !== null} 
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="download-cv" href={cv} download="{`Corpu-CV-${profile.user_id}`}.pdf" target="_blank"> <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Zm260-153L287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193Z"/></svg> <span>Download CV</span></a>
                {/if}
            </div>
        </div>
        <div class="body-row">
            <div class="input-box">
                <label for="street_address">street address</label>
                <input type="street_address" name="street_address" id="street_address" placeholder="enter street address" bind:value={profile.user_street_address} readonly={!isEdit}/>
            </div>
        </div>
        <div class="body-row">
            <div class="input-box">
                <label for="city">city</label>
                <input type="city" name="city" id="city" placeholder="enter city" bind:value={profile.user_city} readonly={!isEdit}/>
            </div>
        </div>
        <div class="body-row">
            <div class="input-box">
                <label for="state">state</label>
                <select name="state" id="state" bind:value={profile.user_state} disabled={!isEdit}>
                    <option value="VIC">VIC</option>
                    <option value="NSW">NSW</option>
                    <option value="QLD">QLD</option>
                    <option value="NT">NT</option>
                    <option value="WA">WA</option>
                    <option value="SA">SA</option>
                    <option value="TAS">TAS</option>
                    <option value="ACT">ACT</option>
                </select>
            </div>
            <div class="input-box">
                <label for="postcode">postcode</label>
                <input type="postcode" name="postcode" id="postcode" placeholder="enter postcode" bind:value={profile.user_postcode} readonly={!isEdit}/>
            </div>
        </div>   
        <div class="body-row">
            <table cellpadding="10"cellspacing="10">
                <thead>
                   <tr>
                      <th rowspan="2">Time</th>
                      <th colspan="5">Week Day</th>
                   </tr>
                   <tr>
                      <th scope="col">Monday</th>
                      <th scope="col">Tuesday</th>
                      <th scope="col">Wednesday</th>
                      <th scope="col">Thursday</th>
                      <th scope="col">Friday</th>
                   </tr>
                </thead>
                <tbody>
                    {#each tableRows as tableRow}
                   <tr>
                        <th>{tableRow[0]}</th>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <td id="{isEdit === true ? "clickable-cell" : ""}" class=" clickable-cell {availability.includes(tableRow[1]) === true ? "available" : ""}" on:click={() => toggleAvailability(tableRow[1])}>
                        {#if availability.includes(tableRow[1]) === true}
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"
                              ><path d="M433-228 295-365l42-42 96 94 184-184 42 43-226 226ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/></svg>
                        {/if}
                        </td>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <td id="{isEdit === true ? "clickable-cell" : ""}" class=" clickable-cell {availability.includes(tableRow[2]) === true ? "available" : ""}" on:click={() => toggleAvailability(tableRow[2])}>
                        {#if availability.includes(tableRow[2]) === true}
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"
                              ><path d="M433-228 295-365l42-42 96 94 184-184 42 43-226 226ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/></svg>
                        {/if}
                        </td>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <td id="{isEdit === true ? "clickable-cell" : ""}" class=" clickable-cell {availability.includes(tableRow[3]) === true ? "available" : ""}" on:click={() => toggleAvailability(tableRow[3])}>
                        {#if availability.includes(tableRow[3]) === true}
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"
                              ><path d="M433-228 295-365l42-42 96 94 184-184 42 43-226 226ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/></svg>
                        {/if}
                        </td>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <td id="{isEdit === true ? "clickable-cell" : ""}" class=" clickable-cell {availability.includes(tableRow[4]) === true ? "available" : ""}" on:click={() => toggleAvailability(tableRow[4])}>
                        {#if availability.includes(tableRow[4]) === true}
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"
                              ><path d="M433-228 295-365l42-42 96 94 184-184 42 43-226 226ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/></svg>
                        {/if}
                        </td>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <td id="{isEdit === true ? "clickable-cell" : ""}" class=" clickable-cell {availability.includes(tableRow[5]) === true ? "available" : ""}" on:click={() => toggleAvailability(tableRow[5])}>
                        {#if availability.includes(tableRow[5]) === true}
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"
                              ><path d="M433-228 295-365l42-42 96 94 184-184 42 43-226 226ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/></svg>
                        {/if}
                        </td>
                    </tr>
                     {/each}                  
                </tbody>
             </table>
        </div>
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

    .edit{
        background-color: #1990D3;
        border: none;
        border-radius: 0.4rem;
        padding: 0.5rem 1.5rem;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: large;
    }

    .edit:hover{
        background-color: #097abb;
        cursor: pointer;
    }

    .save{
        background-color: #78d47b;
        border: none;
        border-radius: 0.4rem;
        padding: 0.5rem 1.5rem;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: large;
    }

    .save:hover{
        background-color: #3faa43;
        cursor: pointer;
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
        gap: 2rem;
    }

    .input-box{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    .input-box input{
        width: 100%;
        height: 2rem;
        box-shadow: 0.1px 0.1px 3px rgba(0, 0, 0, 0.25);
        border: none;
        border-radius: 0.4rem;
        letter-spacing: 0.2ch;
        padding-left: 0.5rem;
    }

    .input-box select{
        width: 100%;
        height: 2rem;
        box-shadow: 0.1px 0.1px 3px rgba(0, 0, 0, 0.25);
        border: none;
        border-radius: 0.4rem;
        letter-spacing: 0.2ch;
        padding-left: 0.5rem;
    }

    .input-box input:focus{
        outline: 1px solid #1990D3;
    }

    .input-box label{
        font-size: 1.2rem;
        font-weight: 500;
        padding-bottom: 0.2rem;
        letter-spacing: 0.2ch;
    }

    input[type="file"] {
        display: none;
    }

    .input-file {
        box-shadow: 0.1px 0.1px 3px rgba(0, 0, 0, 0.25);
        border: none;
        border-radius: 0.4rem;
        letter-spacing: 0.2ch;
        padding-left: 0.5rem;
        width: 100%;
        display: flex;
        height: 7.5rem;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        gap: 0.2rem;
    }

    .upload-area{
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .download-cv{
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        border: #097abb 1px solid;
        background-color: #FFFFFF;
        border-radius: 0.4rem;
        color: #097abb;
        padding: 0.5rem;
        max-width: 20rem;
        align-self: center;
        margin-top: 1rem;
        text-decoration: none;
    }

    .download-cv:hover{
        background-color: #097abb;
        color: #FFFFFF;
        cursor: pointer;
    }


    table,
    th,
    td {
        border-radius: 0.8em;
        padding: 1em;
        min-width:6rem;
    }

    table td {
        background-color: #FFFFFF;
        box-shadow: 0.1px 0.1px 3px rgba(0, 0, 0, 0.25);
        font-size: medium;
        font-weight: 500 !important;
    }

    table th {
        box-shadow: 0.1px 0.1px 3px rgba(0, 0, 0, 0.25);
        font-weight: 700;
        white-space: nowrap;
        color: #000000;
    }

    #clickable-cell{
        cursor: pointer;
    }

    .clickable-cell{
        text-align: center;
        padding: 0 !important;
    }

    #clickable-cell:hover{
        background-color: #78d47b;
        color: #FFFFFF;
    }

    .available{
        background-color: #78d47b;
        color: #FFFFFF;
    }


    .header-actions{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    #progress-indicator{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFFFFF;
        background-color: var(--progress-color);
        padding: 0.8rem;
        border-radius: 0.4rem;
        width: 3rem;
    }

    



</style>