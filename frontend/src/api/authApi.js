import { apiConnector } from "./apiCall";
import { endpoints } from "./apis";

export async function loginFunction({email, password}){
    try{
        const response = await apiConnector("POST", endpoints.LOGIN_API, {
            email,
            password
        })
        console.log("response" , response);
        return response;
    }
    catch(error){
        console.log("error" , error);
        return new Error("Unable to connect to server");
    }
}

export async function signUpFunction({name, email, password}){
    try{
        const response = await apiConnector("POST", endpoints.SIGNUP_API, {
            name,
            email,
            password
        })
        console.log("response" , response);
        return response;
    }
    catch(error){
        console.log("error" , error);
        return new Error("Unable to connect to server");
    }
}
