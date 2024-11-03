import axios from "axios";
import Cookies from 'js-cookie';
import { BASE_URL_API, LOGIN_UI_BASE_URL } from "../URLConstants";

const BASE_URL = BASE_URL_API+"/bus-stop-master";


class BusStopMasterService {

    saveBusStopMastertDetails(busstopmaster) {
        if (null != Cookies.get('empId')) {
            return axios.post(BASE_URL, busstopmaster)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    updateBusStopMastertDetails(busstopmaster) {
        if (null != Cookies.get('empId')) {
            return axios.put(BASE_URL, busstopmaster)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

    

    deleteBusStopById(busStopId) {
       
        if (null != Cookies.get('empId')) {
            return axios.delete(BASE_URL+`/?busStopId=${busStopId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }


    //at page load call all the departments load all departments
   getBusStopMastertDetailsByPaging() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+"?statusCd=A&page=0&size=20o&sort=busStopId")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }
    }

    
    getBusStopDetailsById(busStopId) {
       
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL+`/by-busstopid?busStopId=${busStopId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }

    }

     
     ddRoutesMaster() {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL +"/dd-routes")
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }

    
    ddBusStopMaster(routesId) {
        if (null != Cookies.get('empId')) {
            return axios.get(BASE_URL +`/dd-bus-stop?routesId=${routesId}`)
        } else {
            alert("You need to login first")
            window.location.replace(LOGIN_UI_BASE_URL);
        }       
    }
   
}


export default new BusStopMasterService();