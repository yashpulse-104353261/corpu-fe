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


    let isEdit = false;

    onMount(() => {
       getProfile();
    });

    const getProfile = async (notify = true) => {
        const response = await CorpuAPI.getProfile();
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                if(notify){
                    notifications.success(message, 500);
                }
            });
            profile = response?.data?.data;
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

    const saveProfile = async () => {
        const response = await CorpuAPI.updateProfile(profile.user_first_name,profile.user_middle_name,profile.user_last_name,profile.user_street_address,profile.user_city,profile.user_state,profile.user_postcode,profile.user_phone);
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                notifications.success(message, 500);
            });
            getProfile(false);
            isEdit = false;
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

</script>


<div class="profile">
    <div class="header">
        <span class="header-title">Profile</span>
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
                        <input class="box-file" type="file" name="cv" id="cv">
                        <label for="cv" class="upload-area"><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M452 854h60V653l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220 976q-24 0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554V236H220v680h520V422H551ZM220 236v186-186 680-680Z"/></svg> <div><strong>choose a file </strong><span class="box-dragndrop"> or drag it here</span>.</div></label>
                    </div>
                </div>
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
                <input type="state" name="state" id="state" placeholder="State" bind:value={profile.user_state} readonly={!isEdit}/>
            </div>
            <div class="input-box">
                <label for="postcode">postcode</label>
                <input type="postcode" name="postcode" id="postcode" placeholder="enter postcode" bind:value={profile.user_postcode} readonly={!isEdit}/>
            </div>
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

</style>