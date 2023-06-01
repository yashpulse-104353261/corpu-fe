
<script>
    import { onMount } from 'svelte';
    import CorpuAPI from '../../../lib/api/CorpuAPI';
    import { notifications } from "../../../lib/components/notification";
	import { fly } from "svelte/transition";
    import { backOut } from 'svelte/easing';


    let applications = [];
	let isChangeStatusApplications = [];
	let viewUserProfile = null;
	let viewUserCv = null;
	let viewUserAvailability = null;

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

	const APPLICATION_STATUSES = [
		"Processing",
		"Successful",
		"Unsuccessful",
		"Submitted",
		"Withdrawn"
	]

    onMount(() => {
        getApplications();
    });

    const getApplications = async (notify = true) => {
        const response = await CorpuAPI.getApplications();
        if (response?.data?.success === true) {
			applications = response?.data?.data;
            response?.data?.messages.forEach(message => {
                if(notify){
                    notifications.success(message, 500);
					applications.forEach(application => {
					isChangeStatusApplications.push(false);
				});
                }
            });
            
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

	const getProfile = async (notify = true,user_id = null) => {
        let response = null;
        if(user_id === null){
            response = await CorpuAPI.getProfile();
        }else{
            response = await CorpuAPI.getProfile(user_id);
        }
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                if(notify){
                    notifications.success(message, 500);
                }
            });
            viewUserProfile = response?.data?.data;
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

    const changeApplicationStatus = async (application_id,application_status,index) => {
		applications = applications;
        const response = await CorpuAPI.changeApplicationStatus(application_id, application_status);
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                notifications.success(message, 500);
            });
           	await getApplications(false);
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }

		toggleIsChangeStatus(index);
    }

	const toggleIsChangeStatus = (index) => {
		isChangeStatusApplications[index] = !isChangeStatusApplications[index];
	}

	const getCV = async (notify = true,user_id = null) => {

		let response = null;

        if(user_id === null){
            response = await CorpuAPI.getCv();
        }else{
            response = await CorpuAPI.getCv(user_id);
        }
		if (response?.data?.success === true) {
			response?.data?.messages.forEach(message => {
				if(notify){
					notifications.success(message, 500);
				}
			});
			viewUserCv = response?.data?.data.user_cv;
		} else {
			response?.data?.messages.forEach(message => {
				notifications.danger(message, 2000);
			});

			viewUserCv = null;
		}
	}

	const getAvailability = async (notify = true,user_id = null) => {
               
		let response = null;

        if(user_id === null){
            response = await CorpuAPI.getAvailability();
        }else{
            response = await CorpuAPI.getAvailability(user_id);
        }

		if (response?.data?.success === true) {
			response?.data?.messages.forEach(message => {
				if(notify){
					notifications.success(message, 500);
				}
			});
			viewUserAvailability = response?.data?.data;
			console.log(viewUserAvailability);
		} else {
			response?.data?.messages.forEach(message => {
				notifications.danger(message, 2000);
			});
		}
	}

	const viewProfile = (user_id) => {
		viewUserProfile = null;
		viewUserCv = null;
		viewUserAvailability = null;
	
		getProfile(false,user_id);
		getCV(false,user_id)
		getAvailability(false,user_id)
		notifications.success("Fetching Profile....", 1000);
		document.getElementById("view-profile").showModal();
	}
</script>


<dialog id="view-profile">
	<div class="modal">
	{#if viewUserProfile != null}
	
		<h2>View Profile</h2>
		<div class="modal-row">
			<div class="modal-kv">
				<span>First Name</span>
				<span>{viewUserProfile?.user_first_name !== null ? viewUserProfile.user_first_name : "-"}</span>
			</div>
			<div class="modal-kv">
				<span>Middle Name</span>
				<span>{viewUserProfile?.user_middle_name !== null ? viewUserProfile.user_middle_name : "-"}</span>
			</div>
		</div>
		<div class="modal-row">
			<div class="modal-kv">
				<span>Last Name</span>
				<span>{viewUserProfile?.user_last_name !== null ? viewUserProfile.user_last_name : "-"}</span>
			</div>
			<div class="modal-kv">
				<span>Phone</span>
				<span>{viewUserProfile?.user_phone !== null ? viewUserProfile.user_phone : "-"}</span>
			</div>
		</div>
		<div class="modal-row">
			<div class="modal-kv">
				<span>Email</span>
				<span>{viewUserProfile?.user_email !== null ? viewUserProfile.user_email : "-"}</span>
			</div>
		</div>
		<div class="modal-row">
			<div class="modal-kv">
				<span>Street Address</span>
				<span>{viewUserProfile?.user_street_address !== null ? viewUserProfile.user_street_address : "-"}</span>
			</div>
		</div>

		<div class="modal-row">
			<div class="modal-kv">
				<span>State &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<span>{viewUserProfile?.user_state !== null ? viewUserProfile.user_state : "-"}</span>
			</div>
			<div class="modal-kv">
				<span>Postcode</span>
				<span>{viewUserProfile?.user_postcode !== null ? viewUserProfile.user_postcode : "-"}</span>
			</div>
		</div>
		{#if viewUserCv !== null}
		<div class="modal-row">
			<div class="modal-kv">
				<span>CV</span>
				<a class="download-cv" href={viewUserCv} download="{`Corpu-CV-${viewUserProfile.user_id}`}.pdf" target="_blank"> <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Zm260-153L287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193Z"/></svg> <span>Download CV</span></a>
				
			</div>
		</div>
		{#if viewUserAvailability !== null}
		<div class="modal-row">
			<table id="a-table" cellpadding="15"cellspacing="15">
                <thead id="a-thead">
                   <tr id="a-tr">
                      <th rowspan="2" id="a-th">Time</th>
                      <th colspan="5" id="a-th">Week Day</th>
                   </tr>
                   <tr id="a-tr">
				 		<th scope="col" id="a-th">Monday</th>
						<th scope="col" id="a-th">Tuesday</th>
					 	<th scope="col" id="a-th">Wednesday</th>
                    	<th scope="col" id="a-th">Thursday</th>
                    	<th scope="col" id="a-th">Friday</th>
                   </tr>
                </thead>
                <tbody id="a-tbody">
                    {#each tableRows as tableRow}
                   <tr id="a-tr">
                        <th id="a-th">{tableRow[0]}</th>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <td id="a-td" class="clickable-cell {viewUserAvailability.includes(tableRow[1]) === true ? "available" : ""}">
                        {#if viewUserAvailability.includes(tableRow[1]) === true}
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"
                              ><path d="M433-228 295-365l42-42 96 94 184-184 42 43-226 226ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/></svg>
                        {/if}
                        </td>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <td id="a-td" class="clickable-cell {viewUserAvailability.includes(tableRow[2]) === true ? "available" : ""}">
                        {#if viewUserAvailability.includes(tableRow[2]) === true}
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"
                              ><path d="M433-228 295-365l42-42 96 94 184-184 42 43-226 226ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/></svg>
                        {/if}
                        </td>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <td id="a-td" class="clickable-cell {viewUserAvailability.includes(tableRow[3]) === true ? "available" : ""}">
                        {#if viewUserAvailability.includes(tableRow[3]) === true}
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"
                              ><path d="M433-228 295-365l42-42 96 94 184-184 42 43-226 226ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/></svg>
                        {/if}
                        </td>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <td id="a-td" class="clickable-cell {viewUserAvailability.includes(tableRow[4]) === true ? "available" : ""}">
                        {#if viewUserAvailability.includes(tableRow[4]) === true}
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"
                              ><path d="M433-228 295-365l42-42 96 94 184-184 42 43-226 226ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/></svg>
                        {/if}
                        </td>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <td id="a-td" class="clickable-cell {viewUserAvailability.includes(tableRow[5]) === true ? "available" : ""}">
                        {#if viewUserAvailability.includes(tableRow[5]) === true}
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"
                              ><path d="M433-228 295-365l42-42 96 94 184-184 42 43-226 226ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/></svg>
                        {/if}
                        </td>
                    </tr>
                     {/each}                  
                </tbody>
             </table>
		</div>
		{/if}
		

		{/if}
		<div class="modal-row close-modal-row">
			<form method="dialog">
				<button class="close-modal">OK</button>
			</form>
		</div>
	
	{:else}
		<h3>Fetching User Profile ...</h3>
	{/if}
</div>
</dialog>


<div class="application">
	<div class="header">
		<span class="header-title">Applications</span>
		<button class="hidden-btn">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="32"
				viewBox="0 96 960 960"
				width="32"
				fill="currentColor"
				><path
					d="M840 373v503q0 24-18 42t-42 18H180q-24 0-42-18t-18-42V276q0-24 18-42t42-18h503l157 157Zm-60 27L656 276H180v600h600V400ZM479.765 811Q523 811 553.5 780.735q30.5-30.264 30.5-73.5Q584 664 553.735 633.5q-30.264-30.5-73.5-30.5Q437 603 406.5 633.265q-30.5 30.264-30.5 73.5Q376 750 406.265 780.5q30.264 30.5 73.5 30.5ZM233 472h358V329H233v143Zm-53-72v476-600 124Z"
				/></svg
			>
			<span>Save</span></button
		>
	</div>
	<div class="body">
		<table>
			<tbody>
				<tr>
					<th>Application ID</th>
					<th>User ID</th>
					<th>Applicant Name</th>
					<th>Unit Ad ID</th>
					<th>Unit Code</th>
					<th>Unit Name</th>
					<th>Unit Staff</th>
					<th>Application Date</th>
					<th>Application Status</th>
				</tr>
			</tbody>
			<tbody>
		{#each applications as application,index}
		
				
			
	                <tr in:fly={{
						y: 10,
						delay: 30 * index,
						easing: backOut
					  }}>
                    <td>{application.application_id}</td>
					<td class="ca-td"><span>{application.user_id}</span>
						<button on:click={() => viewProfile(application.user_id)} class="view-profile-btn">
							<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20" fill="currentColor"><path d="M480.118 726Q551 726 600.5 676.382q49.5-49.617 49.5-120.5Q650 485 600.382 435.5q-49.617-49.5-120.5-49.5Q409 386 359.5 435.618q-49.5 49.617-49.5 120.5Q310 627 359.618 676.5q49.617 49.5 120.5 49.5Zm-.353-58Q433 668 400.5 635.265q-32.5-32.736-32.5-79.5Q368 509 400.735 476.5q32.736-32.5 79.5-32.5Q527 444 559.5 476.735q32.5 32.736 32.5 79.5Q592 603 559.265 635.5q-32.736 32.5-79.5 32.5ZM480 856q-146 0-264-83T40 556q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601 796 702.5 730.5 804 665 857 556q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359 316 257.5 381.5 156 447 102 556q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"/></svg></button> 
						</td>
					<td>{application.user_first_name + " " + (application.user_middle_name == null ? "" : application.user_middle_name + " ")+ application.user_last_name}</td>
					<td>{application.unit_ad_id}</td>
					<td>{application.unit_id}</td>
					<td>{application.unit_name}</td>
					<td>{application.convenor_name}</td>
					<td>{(new Date(application.application_datetime)).toLocaleString()}</td>
					{#if isChangeStatusApplications[index] === false}
					<td class="ca-td {application.application_status === "Processing" ? "processing" : application.application_status === "Submitted" ? "submitted" : application.application_status === "Successful" ? "successful" : application.application_status === "Withdrawn" ? "withdrawn" : application.application_status === "Unsuccessful" ? "unsuccessful" : "" }">{application.application_status}

						{#if application.application_status !== "Withdrawn" && application.application_status !== "Unsuccessful" && application.application_status !== "Successful"}
						<button on:click={() => toggleIsChangeStatus(index)} class="change-status-btn">
							<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"><path d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg></button>
							{/if}
						</td>
						{:else}
						<td class="ca-td">
							<select name="application_status" class="{application.application_status === "Processing" ? "processing" : application.application_status === "Submitted" ? "submitted" : application.application_status === "Successful" ? "successful" : application.application_status === "Withdrawn" ? "withdrawn" : application.application_status === "Unsuccessful" ? "unsuccessful" : "" }" id="change-status-select" bind:value={application.application_status}>
								{#each APPLICATION_STATUSES as APPLICATION_STATUS}
									<option value="{APPLICATION_STATUS}" selected={APPLICATION_STATUS === application.application_status}>{APPLICATION_STATUS}</option>
								{/each}
							</select>
							<button class="change-status-save-btn" on:click={() => changeApplicationStatus(application.application_id,application.application_status,index)}>
								<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/></svg>
							</button>
						</td>
					{/if}
				</tr>
			
			{:else}
			<h3>
				No Applications
			</h3>
		{/each}
	</tbody>
</table>
	</div>
</div>

<style>
	.application {
		max-width: calc(100% - 1.5rem);
		max-height: calc(100% - 1.5rem);
		margin: 1.5rem;
		background-color: #ffffff;
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
		border-radius: 0.4rem;
	}

	.header {
		padding: 0.5rem 1.5rem;
		border-bottom: 1.5px solid #dfdfdf;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header .header-title {
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

	.hidden-btn {
		background-color: transparent;
		border: none;
		border-radius: 0.4rem;
		padding: 0.5rem 1.5rem;
		color: #ffffff;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: large;
	}

	.hidden-btn:hover {
		background-color: transparent;
	}

	/* Table Structure Start */

	table {
		border-collapse: separate;
		border-spacing: 0;
	}
	table tr th,
	table tr td {
		/* border-right: 1px solid #b9b9b9; */
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
		height: 1.5rem;
	}
	

	/* top-left border-radius */
	table tr:first-child th:first-child {
		border-top-left-radius: 6px;
	}

	/* top-right border-radius */
	table tr:first-child th:last-child {
		border-top-right-radius: 6px;
	}

	/* bottom-left border-radius */
	table tr:last-child td:first-child {
		border-bottom-left-radius: 6px;
	}

	/* bottom-right border-radius */
	table tr:last-child td:last-child {
		border-bottom-right-radius: 6px;
	}

	th,
	td {
		padding: 16px 20px;
	}
	th {
		background: #ffffff;
		color: #000000;
	}
	td {
		background: #ffffff;
	}


    .successful{
        color:#78d47b;
        font-weight: bold;
    }


    .unsuccessful{
        color:#d47b7b;
        font-weight: bold;
    }

    
    .processing{
        color:#d4b97b;
        font-weight: bold;
    }



    .withdrawn{
        color:#7b7b7b;
        font-weight: bold;
    }

    

    .submitted{
        color:#7b7bd4;
        font-weight: bold;
    }

	/* Table Structure End */

    /* Orange Button Hex code :  */

    .change-status-btn{
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        border: #eb922c 1px solid;
        background-color: #FFFFFF;
        border-radius: 0.4rem;
        color: #eb922c;
        padding: 0.1rem 0.1rem;
    }

    .change-status-btn:hover{
        background-color: #eb922c;
        color: #FFFFFF;
        cursor: pointer;
    }

	.view-profile-btn{
		display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        border: #097abb 1px solid;
        background-color: #FFFFFF;
        border-radius: 0.4rem;
        color: #097abb;
        padding: 0.1rem 0.1rem;
	}

	.view-profile-btn:hover{
		background-color: #097abb;
        color: #FFFFFF;
        cursor: pointer;
	}

	.change-status-save-btn{
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        border: #78d47b 1px solid;
        background-color: #FFFFFF;
        border-radius: 0.4rem;
        color: #78d47b;
        padding: 0.1rem 0.1rem;
    }

    .change-status-save-btn:hover{
        background-color: #78d47b;
        color: #FFFFFF;
        cursor: pointer;
    }

	.ca-td{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}


	#change-status-select{
		border: none;
		outline: none;
		border-radius: 0.4rem;
		font-weight: 750;
		letter-spacing: 0.01rem;
		font-weight: bold;
		width: 90%;
		font-size: 0.8rem;
		margin-top: 0.3rem;
		display: flex;
		align-self: flex-start;
		padding: 0 !important;
	}	


	#view-profile{
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

	.modal h2{
		margin-bottom: 3rem;
	}

	.modal-row{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 1rem;
		gap: 25rem;
	}

	.modal-kv{
        display: flex;
        flex-direction: column;
    }

    .modal-kv span:nth-child(1){
        font-weight: bold;
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

	#a-table,
    #a-th,
    #a-td {
        border-radius: 0.8em;
        padding: 1em;
        min-width:6rem;
    }

    #a-table #a-td {
        background-color: #FFFFFF;
        box-shadow: 0.1px 0.1px 3px rgba(0, 0, 0, 0.25);
        font-size: medium;
        font-weight: 500 !important;
    }

    #a-table #a-th {
        box-shadow: 0.1px 0.1px 3px rgba(0, 0, 0, 0.25);
        font-weight: 700;
        white-space: nowrap;
        color: #000000;
    }

    .clickable-cell{
        text-align: center;
        padding: 0 !important;
    }

    .available{
        background-color: #78d47b !important;
        color: #FFFFFF !important;
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

	.close-modal-row{
		align-self: center;
	}

</style>
