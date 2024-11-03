import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./../URLConstants";

const BASE_URL = BASE_URL_API+"/language-master";


class LanguageMasterService {

    saveLanguageMastertDetails(language) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, language)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateLanguageMastertDetails(language) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, language)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    

    deleteLanguageById(langId) {
       
        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL+`/?langId=${langId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //at page load call all the departments load all departments
   getLanguageMastertDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+"?statusCd=A&page=0&size=20o&sort=langName")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    
    getLanguageDetailsById(langId) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+`/by-langid?langId=${langId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
}


export default new LanguageMasterService();