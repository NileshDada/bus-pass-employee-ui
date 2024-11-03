import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./../URLConstants";


class RoleService{

    
    getRolesDetailsByPaging(){
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+"/roles/search?page=0&size=20&sort=roleName")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }  
    }
   
    
}

export default new RoleService();