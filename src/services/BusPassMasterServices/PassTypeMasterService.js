import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API+"/pass-type-master";


class PassTypeMasterService {

    savePassTypeMastertDetails(passtypemaster) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, passtypemaster)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updatePassTypeMastertDetails(passtypemaster) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, passtypemaster)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    

    deletePassTypeById(passTypeId) {
       
        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL+`/?passTypeId=${passTypeId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //at page load call all the departments load all departments
   getPassTypeMastertDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+"?statusCd=A&page=0&size=20o&sort=langName")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    
    getPassTypeDetailsById(passTypeId) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+`/by-passtypeid?passTypeId=${passTypeId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

     //dropdown list for Route master
     ddPassTypeMaster() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL +"/dd-passtype")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }
}


export default new PassTypeMasterService();