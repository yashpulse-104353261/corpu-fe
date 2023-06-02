<script>
    import { onMount } from 'svelte';
    import CorpuAPI from '../../../lib/api/CorpuAPI';
    import { notifications } from "../../../lib/components/notification";
    import { fly } from "svelte/transition";
    import { backOut } from 'svelte/easing';


   let query_text = "";

   let query_result = {
    data: [],
    rowcount: ""
   };

   let tableHeaders = [];



    const queryDB = async () => {
        const response = await CorpuAPI.query(query_text);
        if (response?.data?.success === true) {
            response?.data?.messages.forEach(message => {
                notifications.success(message, 500);
            });
            query_result.data = response?.data?.data;
            query_result.rowcount = response?.data?.rowcount;
            
            if(query_result.data.length > 0){
                tableHeaders = Object.keys(query_result.data[0]);
            }

        } else {
            response?.data?.messages.forEach(message => {
                notifications.danger(message, 2000);
            });
        }
    }


</script>

<div class="profile">
    <div class="header">
    
            <span class="header-title">Query</span>

            <div class="header-actions">
        <button class="edit" on:click={() => queryDB()}>
            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="currentColor"><path d="M320-203v-560l440 280-440 280Zm60-280Zm0 171 269-171-269-171v342Z"/></svg>
            <span>Run</span></button>
        </div>
    </div>
    <div class="body">
        <textarea name="query_text" class="query_text_box" id="query_text" cols="30" rows="10" bind:value={query_text} placeholder="write admin queries"></textarea>

    </div>
    <br>
    <div class="body">
        <textarea name="query_text" class="query_text_box" id="query_text" cols="30" rows="2" bind:value={query_result.rowcount} readonly={true}></textarea>
    </div>

    <div class="body-table">

        {#if tableHeaders.length > 0}

             <table>
			<tbody>
				<tr>
					{#each tableHeaders as header}
                        <th>{header}</th>
                    {/each}
				</tr>
			</tbody>
			<tbody>
		{#each query_result.data as row,index}
        <tr in:fly={{
            y: 10,
            delay: 30 * index,
            easing: backOut
          }}>
				{#each tableHeaders as header}
                    <td>{row[header]}</td>
                {/each}
            </tr>
			
		{/each}
	</tbody>
</table>

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
        background-color: #FFFFFF;
        border: none;
        border-radius: 0.4rem;
        padding: 0.5rem 1.5rem;
        color: #78d47b;
        display: flex;
        align-items: center;
        border: 2px solid #78d47b;
        gap: 0.5rem;
        font-size: large;
    }

    .edit:hover{
        background-color: #78d47b;
        color: #FFFFFF;
        cursor: pointer;
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

    .body {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        resize: none;
        font-size: large;
        border-bottom: 1px solid #dfdfdf;
    }

    .query_text_box{
        width: 95%;
        padding: 0.5rem;
        text-decoration: none;
        outline: none;
        border: none;
    }

    .query_text_box:focus{
        outline: none;
        border: none;
    }

    .body-table{
        display: flex;
        max-width: 82vw;
        align-items: center;
        padding: 0.5rem;
        overflow-x: scroll;
    }




</style>