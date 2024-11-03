import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../services/URLConstants";

const BASE_URL = BASE_URL_API+"/customer-master";


class CustomerMasterService {

    saveCustomerMastertDetails(customer) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, customer)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateCustomerMastertDetails(customer) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, customer)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    

    deleteCustomerById(custId) {
       
        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL+`/?custId=${custId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //at page load call all the departments load all departments
   getCustomerMastertDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+"?statusCd=A&page=0&size=20o&sort=custFirstName")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    
    getCustomerDetailsById(custId) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+`/by-custid?custId=${custId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
}


export default new CustomerMasterService();