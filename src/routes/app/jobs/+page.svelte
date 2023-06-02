<svelte:head>
    <title>Jobs</title> 
</svelte:head>
<script>
    import { onMount } from 'svelte';
    import CorpuAPI from '../../../lib/api/CorpuAPI';
    import { notifications } from "../../../lib/components/notification";
    import { fly } from "svelte/transition";
    import { backOut } from 'svelte/easing';


    let units = [];
    let jobs = [];
    let jobChangeStatus = [];
    let staffs = [];
    
    let newJob = {
        unit_id:null,
        convenor_id:null,
        unit_requirements_text:null,
        job_ad_status:"Active"
    }

    const getUnits = async (notify = true) => {
        const response = await CorpuAPI.getUnits();
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                if(notify){
                    notifications.success(message, 500);
                }
            });
            units = response?.data?.data;
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

    const getSatff = async (notify = true) => {
        const response = await CorpuAPI.getStaff();
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                if(notify){
                    notifications.success(message, 500);
                }
            });
            staffs = response?.data?.data;
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

    const getJobs = async (notify = true) => {
        const response = await CorpuAPI.getJobs();
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                if(notify){
                    notifications.success(message, 500);
                }
            });
            jobs = response?.data?.data;
            jobs.forEach(job => {
                jobChangeStatus.push(false);
            });
            getUnits(false);
            getSatff(false);
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

    const addJobDialog = () => {
        newJob = {
            unit_id:null,
            convenor_id:null,
            unit_requirements_text:null,
            job_ad_status:"Active"
        }
        const dialog = document.getElementById("add-job");
        dialog.showModal();
    }

    const toggleIsChangeStatus = (index) => {
        jobChangeStatus[index] = !jobChangeStatus[index];
    }

    const saveJob = async (jobDetails) => {
        let response = null;

        console.log(jobDetails);

        if (jobDetails.job_id === null) {

        } else {
            response = await CorpuAPI.saveJob(jobDetails.unit_id,jobDetails.convenor_id,jobDetails.unit_requirements_text,jobDetails.job_ad_status,jobDetails.unit_ad_id);
        }
            if (response?.data?.success === true) {
                response?.data?.messages.forEach(message => {
                    notifications.success(message, 500);
                });
                await getJobs(false);
                const dialog = document.getElementById("add-job");
                dialog.close();
            } else {
                response?.data?.messages.forEach(message => {
                    notifications.danger(message, 2000);
            });
        }
    }

    onMount(async () => {
        await getJobs(true);
    });

</script>
<dialog id="add-job">
	<div class="modal">
        <div class="modal-row">
            <h2>Add Job</h2>
        </div>
        <div class="modal-row">
            <div class="input-box">
                <label for="unit_id">unit</label>
                <select name="unit_id" id="unit_id" bind:value={newJob.unit_id} placeholder="select unit">
                    {#each units as unit}
                        <option value={unit.unit_id}>{unit.unit_id}:{unit.unit_name}</option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="modal-row">
            <div class="input-box">
                <label for="convenor_id">convenor</label>
                <select name="convenor_id" id="convenor_id" bind:value={newJob.convenor_id} placeholder="select staff">
                    {#each staffs as staff}
                        <option value={staff.staff_id}>{staff.staff_id}:{staff.staff_name}</option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="modal-row">
            <div class="input-box">
                <label for="unit_requirements_text">unit requirements</label>
                <textarea name="unit_requirements_text" id="unit_requirements_text" rows="6" bind:value={newJob.unit_requirements_text} placeholder="enter unit requirements"></textarea>
            </div>
        </div>
    
        <div class="modal-row">
            <form method="dialog">
				<button class="close-modal">Close</button>
			</form>
                <button class="edit" on:click={() => saveJob(newJob)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="currentColor"><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/></svg>
                    <span>Add Job</span></button>
        </div>
            
    </div>
</dialog>

<div class="profile">
    <div class="header">
    
            <span class="header-title">Jobs</span>

            <div class="header-actions">
        <button class="edit" on:click={() => addJobDialog()}>
            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="currentColor"><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/></svg>
            <span>Add</span></button>
        </div>
    </div>
    <div class="body">
        <table>
			<tbody>
				<tr>
					<th>Unit Ad ID</th>
					<th>Unit Ad Date</th>
                    <th>Unit ID</th>
                    <th>Unit Name</th>
                    <th>Unit Requirements</th>
                    <th>Unit Convenor Name</th>
                    <th>Ad Status</th>
				</tr>
			</tbody>
			<tbody>
		{#each jobs as job,index}
		
				
			
	                <tr in:fly={{
						y: 10,
						delay: 30 * index,
						easing: backOut
					  }}>
                    <td>{job.unit_ad_id}</td>
                    <td>{(new Date(job.unit_ad_datetime)).toLocaleString()}</td>
                    <td>{job.unit_id}</td>
                    <td>{job.unit_name}</td>
                    <td style="max-width: 15rem;">{job.unit_requirements_text}</td>
                    <td>{job.convenor_name}</td>
                    {#if jobChangeStatus[index] === true}
                        <td>
                            <div class="ca-td">
                                <select name="job" class="{job.job_ad_status === "Active" ? "active" :  "expired" }" bind:value={job.job_ad_status} id="change-status-select">
									<option value="Active" selected={"Active" === job.job_ad_status}>Active</option>
                                    <option value="Expired" selected={"Expired" === job.job_ad_status}>Expired</option>
							</select>
							<button class="change-status-save-btn" on:click={() => saveJob(job)}>
								<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/></svg>
							</button>
                            </div>
							
						</td> 
                    {:else}

                    <td class="{job.job_ad_status === "Active" ? "active" : "expired" }"><div class="ca-td">{job.job_ad_status} 
						<button on:click={() => toggleIsChangeStatus(index)} class="change-status-btn">
							<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"><path d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg></button>
                        </div></td>
                    {/if}
                   
						
				</tr>
			
			{:else}
			<h3>
				No Jobs
			</h3>
		{/each}
	</tbody>
</table>
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


    .input-box{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    .input-box textarea{
        width: 100%;
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

    .input-box textarea:focus{
        outline: 1px solid #1990D3;
    }

    .input-box label{
        font-size: 1.2rem;
        font-weight: 500;
        padding-bottom: 0.2rem;
        letter-spacing: 0.2ch;
    }

    .header-actions{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

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

    #add-job{
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

    .active{
        color:#78d47b;
        font-weight: bold;
    }


    .expired{
        color:#d47b7b;
        font-weight: bold;
    }

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

	.ca-td{
		display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
	}




</style>