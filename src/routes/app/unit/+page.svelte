<script>
    import { onMount } from 'svelte';
    import CorpuAPI from '../../../lib/api/CorpuAPI';
    import { notifications } from "../../../lib/components/notification";
    import { fly } from "svelte/transition";
    import { backOut } from 'svelte/easing';


    let units = [];
    let unit = {
        unit_id:null,
        unit_name:null
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

    const deleteUnit = async (unit_id) => {
        const response = await CorpuAPI.deleteUnit(unit_id);
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                notifications.success(message, 500);
            });
            await getUnits(false);
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

    const addUnit = async () => {
        const response = await CorpuAPI.addUnit(unit.unit_id,unit.unit_name);
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                notifications.success(message, 500);
            });
            await getUnits(false);
            const dialog = document.getElementById("add-unit");
            dialog.close();
        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }

    const addUnitDialog = () => {
        unit = {
            unit_id:null,
            unit_name:null
        }

        const dialog = document.getElementById("add-unit");
        dialog.showModal();
    }

    onMount(async () => {
        await getUnits(true);
    });

</script>
<dialog id="add-unit">
	<div class="modal">
        <div class="modal-row">
            <h2>Add Unit</h2>
        </div>
        <div class="modal-row">
            <div class="input-box">
                <label for="unit_id">unit id</label>
                <input type="text" name="unit_id" id="unit_id" bind:value={unit.unit_id} placeholder="enter unit id (8 Chars)" />
            </div>
        </div>
        <div class="modal-row">
            <div class="input-box">
                <label for="unit_name">unit name</label>
                <input type="text" name="unit_name" id="unit_name" bind:value={unit.unit_name} placeholder="enter unit name"/>
            </div>
        </div>
        <div class="modal-row">
            <form method="dialog">
				<button class="close-modal">Close</button>
			</form>
                <button class="edit" on:click={() => addUnit()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="currentColor"><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/></svg>
                    <span>Add Unit</span></button>
        </div>
            
    </div>
</dialog>

<div class="profile">
    <div class="header">
    
            <span class="header-title">Units</span>

            <div class="header-actions">
        <button class="edit" on:click={() => addUnitDialog()}>
            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="currentColor"><path d="M450-200v-250H200v-60h250v-250h60v250h250v60H510v250h-60Z"/></svg>
            <span>Add</span></button>
        </div>
    </div>
    <div class="body">
        <table>
			<tbody>
				<tr>
					<th>Unit ID</th>
					<th>Unit Name</th>
                    <th>Delete</th>
				</tr>
			</tbody>
			<tbody>
		{#each units as unit,index}
		
				
			
	                <tr in:fly={{
						y: 10,
						delay: 30 * index,
						easing: backOut
					  }}>
                    <td>{unit.unit_id}</td>
                    <td>{unit.unit_name}</td>
                    <td>
                        <button on:click={() => deleteUnit(unit.unit_id)} class="delete-unit-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg> Delete
                        </button>
                    </td>
				</tr>
			
			{:else}
			<h3>
				No Units
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

    .delete-unit-btn{
        background-color: #d62d2d;
        border: none;
        border-radius: 0.4rem;
        padding: 0.5rem 1.5rem;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: large;
    }

    .delete-unit-btn:hover{
        background-color: #aa3f3f;
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

    #add-unit{
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




</style>