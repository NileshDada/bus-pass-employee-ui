import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API+"/routes-master";


class RoutesMasterService {

    saveRoutesMastertDetails(routesmaster) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, routesmaster)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateRoutesMastertDetails(routesmaster) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, routesmaster)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    

    deleteRoutesById(routesId) {
       
        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL+`/?routesId=${routesId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //at page load call all the departments load all departments
   getRoutesMastertDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+"?statusCd=A&page=0&size=20o&sort=langName")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    
    getRoutesDetailsById(routesId) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+`/by-routesid?routesId=${routesId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

     //dropdown list for Route master
     ddRoutesMaster() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL +"/dd-routes")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }
}


export default new RoutesMasterService();