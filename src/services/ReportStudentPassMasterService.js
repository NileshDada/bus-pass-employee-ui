import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "./URLConstants";

const BASE_URL = BASE_URL_API+"/report-student-pass-master";


class ReportStudentPassMasterService {

    
    
   getReportStudentPassMastertDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+`?custId=${Cookies.get('empId')}&statusCd=A&page=0&size=20o&sort=studPassId`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    
    getReportStudentPassDetailsById(reportStudPassId) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+`/by-reportstudpassid?reportStudPassId=${reportStudPassId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
}


export default new ReportStudentPassMasterService();