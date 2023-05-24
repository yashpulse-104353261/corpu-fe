<div class="profile">
    <div class="header">
        <span class="header-title">Profile</span>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32" fill="currentColor"><path d="M840 373v503q0 24-18 42t-42 18H180q-24 0-42-18t-18-42V276q0-24 18-42t42-18h503l157 157Zm-60 27L656 276H180v600h600V400ZM479.765 811Q523 811 553.5 780.735q30.5-30.264 30.5-73.5Q584 664 553.735 633.5q-30.264-30.5-73.5-30.5Q437 603 406.5 633.265q-30.5 30.264-30.5 73.5Q376 750 406.265 780.5q30.264 30.5 73.5 30.5ZM233 472h358V329H233v143Zm-53-72v476-600 124Z"/></svg>
            <span>Save</span></button>
    </div>
    <div class="body">
        <div class="body-row">
            <div class="input-box">
                <label for="first_name">first name</label>
                <input type="text" name="first_name" id="first_name" placeholder="enter first name" />
            </div>
            <div class="input-box">
                <label for="middle_name">middle name</label>
                <input type="text" name="middle_name" id="middle_name" placeholder="enter middle name" />
            </div>
        </div>
        <div class="body-row">
            <div class="input-box">
                <label for="last_name">last name</label>
                <input type="text" name="last_name" id="last_name" placeholder="enter last name" />
            </div>
            <div class="input-box">
                <label for="phone">phone</label>
                <input type="text" name="phone" id="phone" placeholder="enter phone" />
            </div>
        </div>
        <div class="body-row">
            <div class="input-box">
                <label for="email">email</label>
                <input type="email" name="email" id="email" placeholder="enter email" />
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
                <input type="street_address" name="street_address" id="street_address" placeholder="enter street address" />
            </div>
        </div>
        <div class="body-row">
            <div class="input-box">
                <label for="city">city</label>
                <input type="city" name="city" id="city" placeholder="enter city" />
            </div>
        </div>
        <div class="body-row">
            <div class="input-box">
                <label for="state">state</label>
                <input type="state" name="state" id="state" placeholder="State" />
            </div>
            <div class="input-box">
                <label for="postcode">postcode</label>
                <input type="postcode" name="postcode" id="postcode" placeholder="enter postcode" />
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

    .header button{
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

    .header button:hover{
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