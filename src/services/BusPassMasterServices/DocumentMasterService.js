import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API+"/document-master";


class DocumentMasterService {

    saveDocumentMastertDetails(documentmaster) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, documentmaster)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateDocumentMastertDetails(documentmaster) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, documentmaster)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    

    deleteDocumentById(docId) {
       
        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL+`/?docId=${docId}&employeeId=${Cookies.get('empId')}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //at page load call all the departments load all departments
   getDocumentMastertDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+"?statusCd=A&page=0&size=20o&sort=langName")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    
    getDocumentDetailsById(docId) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+`/by-docid?docId=${docId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

     //dropdown list for Route master
     ddDocumentMaster() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL +"/dd-document-master")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }
}


export default new DocumentMasterService();