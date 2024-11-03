import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

const BASE_URL = BASE_URL_API+"/student-pass-master";


class StudentPassMasterService {

    saveStudentPassMastertDetails(studentpassmaster) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, studentpassmaster)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateStudentPassMastertDetails(studentpassmaster) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, studentpassmaster)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    

    deleteStudentPassById(studPassId) {
       
        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL+`/?studPassId=${studPassId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    
   getStudentPassMastertDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+"?statusCd=A&page=0&size=20o&sort=studPassId")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    
    getStudentPassDetailsById(studPassId) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+`/by-studpassid?studPassId=${studPassId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
}


export default new StudentPassMasterService();