import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API+"/pass-type-document-master";


class PassTypeDocumentMasterService {

    savePassTypeDocumentMastertDetails(passtypedocmaster) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, passtypedocmaster)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updatePassTypeDocumentMastertDetails(passtypedocmaster) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, passtypedocmaster)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    

    deletePassTypeDocumentById(passTypeDocId) {
       
        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL+`/?passTypeDocId=${passTypeDocId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //at page load call all the departments load all departments
   getPassTypeDocumentMastertDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+"?statusCd=A&page=0&size=20o&sort=passTypeDocId")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    
    getPassTypeDocumentDetailsById(passTypeDocId) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+`/by-passtypedocid?passTypeDocId=${passTypeDocId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
}


export default new PassTypeDocumentMasterService();