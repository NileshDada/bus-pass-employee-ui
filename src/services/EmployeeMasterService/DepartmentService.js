import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API+"/department";


class DepartmentService {

    saveDepartmentDetails(department) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, department)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    //when click on view button of UI
    getDepartmentById(deptId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL + `/by-dept-id?deptId=${deptId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateDepartmentDetails(department) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, department)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //at page load call all the departments load all departments
    getDepartmentDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+"/department/search?statusCd=A&page=0&size=1200&sort=dept.dept_name asc")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    // search department by its name
    getDepartmentDetailsByDeptNamePaging(deptName) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API+`/department/search?deptName=${deptName}&statusCd=A&page=0&size=20&sort=dept.dept_name`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }
   
     //Upload department
     uploadExcelDept(formData) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL_API+"/department/upload-department",formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },});
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
        
    }

    ddAllDepartmentExceptGM() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL_API +"/department/all-dd-dept-except-cust")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }

}


export default new DepartmentService();