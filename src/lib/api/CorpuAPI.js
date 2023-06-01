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

        this.DoAuthenticatedDelete = async (endpoint) =>{
            try{
                let response = axios.delete(this.api+endpoint,{headers:{
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

    async getApplications(){
        try{
            return await this.DoAuthenticatedGet("applications");
        }catch(ex){
            return ex.response;
        }
    }

    async getStaff(){
        try{
            return await this.DoAuthenticatedGet("staff");
        }catch(ex){
            return ex.response;
        }
    }

    async getUnits(){
        try{
            return await this.DoAuthenticatedGet("unit");
        }catch(ex){
            return ex.response;
        }
    }

    async changeApplicationStatus(application_id,application_status){
        try{
            return await this.DoAuthenticatedPost("applications",{
                application_id,
                application_status
            });
        }catch(ex){
            return ex.response;
        }
    }

    async getCv(userId = null){
        try{
            if(userId){
                return await this.DoAuthenticatedGet("cv?user_id="+userId);
            }else{
                return await this.DoAuthenticatedGet("cv");
            }
        }catch(ex){
            return ex.response;
        }

    }

    async uploadCv(cv){
        try{
            return await this.DoAuthenticatedPost("cv",{
                cv
            });
        }catch(ex){
            return ex.response;
        }
    }

    async updateAvailability(
        availability
    ){
        try{
            return await this.DoAuthenticatedPost("availability",{
                availability
            });
        }catch(ex){
            return ex.response;
        }
    }

    async getAvailability(userId = null){
        try{
            if(userId){
                return await this.DoAuthenticatedGet("availability?user_id="+userId);
            }else{
                return await this.DoAuthenticatedGet("availability");
            }
        }catch(ex){
            return ex.response;
        }

    }

    async getProfileStatus(userId = null){
        try{
            if(userId){
                return await this.DoAuthenticatedGet("profile/status?user_id="+userId);
            }else{
                return await this.DoAuthenticatedGet("profile/status");
            }
        }catch(ex){
            return ex.response;
        }

    }

    async deleteUnit(unit_id){
        try{
            if(unit_id){
                return await this.DoAuthenticatedDelete("unit?unit_id="+unit_id);
            }else{
                return await this.DoAuthenticatedDelete("profile/status");
            }
        }catch(ex){
            return ex.response;
        }

    }

    async addUnit(
        unit_id,
        unit_name
    ){
        try{
            return await this.DoAuthenticatedPost("unit",{
                unit_id,
                unit_name
            });
        }catch(ex){
            return ex.response;
        }
    }

    async saveJob(
        unit_id,
        convenor_id,
        unit_requirements_text,
        job_ad_status,
        unit_ad_id = null
    ){
        try{

            if(unit_ad_id){
                return await this.DoAuthenticatedPost("jobs?unit_ad_id="+unit_ad_id,{
                    unit_id,
                    convenor_id,
                    unit_requirements_text,
                    job_ad_status
                });
            }else{
            return await this.DoAuthenticatedPost("jobs",{
                unit_id,
                convenor_id,
                unit_requirements_text,
                job_ad_status
            });
        }
        }catch(ex){
            return ex.response;
        }
    }
        
}

const CorpuAPI = new CoupuAPIWrapper();


export default CorpuAPI;