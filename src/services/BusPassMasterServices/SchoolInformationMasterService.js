import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";


const BASE_URL = BASE_URL_API+"/school-info-master";


class SchoolInformationMasterService {

    saveSchoolInformationMastertDetails(schoolinformation) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, schoolinformation)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateSchoolInformationMastertDetails(schoolinformation) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, schoolinformation)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    

    deleteSchoolInformationById(schoolId) {
       
        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL+`/?schoolId=${schoolId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    
   getSchoolInformationMastertDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+"?statusCd=A&page=0&size=20o&sort=schoolId")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    
    getSchoolInformationDetailsById(schoolId) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+`/by-schoolid?schoolId=${schoolId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

     
     ddSchoolInformationMaster() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL +"/dd-school-info")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }
}


export default new SchoolInformationMasterService();