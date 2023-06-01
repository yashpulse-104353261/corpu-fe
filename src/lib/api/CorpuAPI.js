import axios from 'axios';

class CoupuAPIWrapper {
    constructor() {
        this.api = "http://yashpulse.com:8000/";
        this.DoUnAuthenticatedGet = async (endpoint,config) =>{
            try{
                let response = axios.get(this.api+endpoint,config);
                return response;
            }catch (ex){
                return ex.response;                                
            }
        }

        this.DoUnAuthenticatedPost = async (endpoint,data) =>{
            try{
                let response = axios.post(this.api+endpoint,data);
                return response;
            }catch (ex){
                return ex.response;                                
            }
        }

        this.DoAuthenticatedGet = async (endpoint) =>{
            try{
                let response = axios.get(this.api+endpoint,{headers:{
                    "X-Authorization": "Bearer " + localStorage.getItem("authToken")
                }});
                return response;
            }catch (ex){
                return ex.response;                                
            }
        }

        this.DoAuthenticatedPost = async (endpoint,data) =>{
            try{
                let response = axios.post(this.api+endpoint,data,{
                    headers:{
                        "X-Authorization": "Bearer " + localStorage.getItem("authToken")
                    }
                });
                return response;
            }catch (ex){
                return ex.response;                                
            }
        }
    }

    async login(email,password){
        try{
                return await this.DoUnAuthenticatedGet("login",{headers:{
                "X-Authorization": "Basic " + btoa(`${email}:${password}`)
            }})

        }catch(ex){
            return ex.response;
        }
    }

    async signup(email,password,create_password){

        try{
            return await this.DoUnAuthenticatedPost("signup",{
                email:email,
                password:password,
                create_password:create_password
            })
        }catch(ex){
            return ex.response;
        }
    }

    async getProfile(userId = null){
        try{
            if(userId){
                return await this.DoAuthenticatedGet("profile?user_id="+userId);
            }else{
                return await this.DoAuthenticatedGet("profile");
            }
        }catch(ex){
            return ex.response;
        }

    }

    async updateProfile(
        first_name,
        middle_name,
        last_name,
        street_address,
        city,
        state,
        postcode,
        phone
    ){
        try{
            return await this.DoAuthenticatedPost("profile",{
                first_name,
                middle_name,
                last_name,
                street_address,
                city,
                state,
                postcode,
                phone
            });
        }catch(ex){
            return ex.response;
        }
    }

    async getJobs(jobStatus = null){
        try{
            if(jobStatus){
                return await this.DoAuthenticatedGet("jobs?filter="+jobStatus);
            }else{
                return await this.DoAuthenticatedGet("jobs");
            }
        }catch(ex){
            return ex.response;
        }
    }


    async apply(unit_ad_id){
        try{
            return await this.DoAuthenticatedGet("apply?unit_ad_id="+unit_ad_id);
        }catch(ex){
            return ex.response;
        }
    }
        
}

const CorpuAPI = new CoupuAPIWrapper();


export default CorpuAPI;