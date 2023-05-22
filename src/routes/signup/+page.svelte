<script>
    import Logo from "../../lib/components/Logo.svelte";
</script>

<div class="signup-page">
    <div class="signup-box">

        <div class="logo">
           <Logo/>
            </div>
        <div>
            <div class="input-box">
                <label for="email">email</label>
                <input type="email" id="email" name="email" placeholder="enter email">
            </div>
            <div class="input-box">
                <label for="create_password">create password</label>
                <input type="password" id="create_password" name="create_password" placeholder="creat password">
            </div>
            <div class="input-box">
                <label for="password">confirm password</label>
                <input type="password" id="password" name="confirm password">
            </div>
        </div>
        <div class="buttons">
            <button>sign up</button>
        </div>

    </div>

</div>


<style>
    .signup-page {
        width: 100vw;
        height: 100vh;
        background-color: #FCFCFC;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .signup-box {
        background-color: #FFFFFF;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        border-radius: 0.4rem;
    }

    .input-box {
        padding-top: 1rem;
        gap: 0.2rem;
        display: flex;
        width: 24rem;
        flex-direction: column;
    }
    .input-box label{
        font-size: 1.2rem;
        font-weight: 500;
        padding-bottom: 0.2rem;
        letter-spacing: 0.2ch;

    }

    .input-box input{
        height: 2rem;
        box-shadow: 0.1px 0.1px 3px rgba(0, 0, 0, 0.25);
        border: none;
        border-radius: 0.4rem;
        padding-left: 1rem;
        letter-spacing: 0.2ch;
    }

    .input-box input:focus{
        outline: 1px solid #1990D3;
    }

    .buttons{
        display: flex;
        gap: 1rem;
        width: 100%;
        justify-content: end;
        padding: 2rem 0 0 0;
    }

    .buttons button{
        font-size: 1.2rem;
        font-weight: 500;
        color: #FFFFFF;
        width: 10rem;
        padding: 0.6rem;
        border: none;
        border-radius: 0.4rem;
        box-shadow: 0.1px 0.1px 3px rgba(0, 0, 0, 0.25);
        letter-spacing: 0.2ch;
    }

    .buttons button:hover{
        cursor: pointer;
    }

    .buttons button:nth-child(1){
        background-color: #1990D3;
    }

    .buttons button:nth-child(1):hover{
        background-color: #39a4e2;
    }

</style>