
import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';

import MainEmployeeComponent from './components/EmployeeComponent/MainEmployeeComponent';

import DesignationComponent from './components/MasterComponent/DesignationComponent/DesignationComponent';

import Cookies from 'js-cookie';
import AddNewEmployeeComponent from './components/EmployeeComponent/AddNewEmployeeComponent';
import CompanyMasterComponent from './components/MasterComponent/CompanyMasterComponent/CompanyMasterComponent';
import DepartmentComponent from './components/MasterComponent/DepartmentComponent/DepartmentComponent';
import EmployeeTypeComponent from "./components/MasterComponent/EmployeeTypeComponent/EmployeeTypeComponent";
import RegionComponent from "./components/MasterComponent/RegionComponent/RegionComponent";
import RoleComponent from "./components/MasterComponent/RoloComponent/RoleComponent";
import SiteComponent from "./components/MasterComponent/SiteComponent/SiteComponent";


const removeCookies = () => {
  Cookies.remove('empId');
  Cookies.remove('roleId');
  Cookies.remove('roleName');
  Cookies.remove('deptId');
  Cookies.remove('deptName');
  Cookies.remove('desigId');
  Cookies.remove('desigName');
  Cookies.remove('empEId');
  Cookies.remove('empFirstName');
  Cookies.remove('empMiddleName');
  Cookies.remove('empLastName');
}
function App() {
  return (
    <BrowserRouter>
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="http://localhost:3008" onClick={() => removeCookies()}>FutureBizops</a>
        </div>
        <ul className="nav navbar-nav">

        
               
          
        <li className="dropdown">
        <a className="dropdown-toggle" data-toggle="dropdown" href="#">Employee Master
        <span className="caret"></span></a>
        <ul className="dropdown-menu">           
        <li><Link to="/employee">Employee Master</Link></li>
        
              
        </ul>
      </li>
  
        
      <li className="dropdown">
      <a className="dropdown-toggle" data-toggle="dropdown" href="#">Master Records
      <span className="caret"></span></a>
      <ul className="dropdown-menu">
      <li><Link to="/role">Role Master</Link></li>
      <li><Link to="/department">Department Master</Link></li>
      <li><Link to="/designation">Designation Master</Link></li>

      <li><Link to="/empTypeMaster">Employee Type Master</Link></li>
      <li><Link to="/regionMaster">Region Master</Link></li>
      <li><Link to="/siteMaster">Sites Master</Link></li>
      <li><Link to="/companyMaster">Company Master</Link></li>

  
      </ul>
    </li>
   
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">Welcome: {Cookies.get('empEId')}</a></li>
          <li> <a href="http://localhost:3008" onClick={() => removeCookies()} >Logout </a></li>
        </ul>
      </div>
    </nav>
    <Routes>
    <Route exact path="/" element={<RoleComponent />}></Route>
 
      <Route exact path="/newEmployee" element={<AddNewEmployeeComponent />}></Route>
      <Route exact path="/role" element={<RoleComponent />}></Route>
      <Route exact path="/department" element={<DepartmentComponent />}></Route>
      <Route exact path="/designation" element={<DesignationComponent />}></Route>
      <Route exact path="/regionMaster" element={<RegionComponent />}></Route>
      <Route exact path="/siteMaster" element={<SiteComponent />}></Route>
      <Route exact path="/companyMaster" element={<CompanyMasterComponent />}></Route>

      <Route exact path="/empTypeMaster" element={<EmployeeTypeComponent />}></Route>
   
    
      <Route exact path="/employee" element={<MainEmployeeComponent />}></Route>
    
      
   

     
      
     
    </Routes>
  </BrowserRouter>
);
}

export default App;