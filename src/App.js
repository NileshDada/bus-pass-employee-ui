
import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';

import LanguageMasterComponent from './components/BusPassMasterComponents/LanguageMasterComponent';
import DocumentMasterComponent from './components/BusPassMasterComponents/DocumentMasterComponent';
import RoutesMasterComponent from './components/BusPassMasterComponents/RoutesMasterComponent';
import PassTypeMasterComponent from './components/BusPassMasterComponents/PassTypeMasterComponent';
import CustomerMasterComponent from './components/CustomerMasterComponent/CustomerMasterComponent';
import StudentPassMasterComponent from './components/StudentPassMasterComponent/StudentPassMasterComponent';
import SchoolInformationMasterComponent from './components/BusPassMasterComponents/SchoolInformationMasterComponent';
import BusStopMasterComponent from './components/BusPassMasterComponents/BusStopMasterComponent';
import PassTypeDocumentMasterComponent from './components/BusPassMasterComponents/PassTypeDocumentMasterComponent';


import MainEmployeeComponent from './components/EmployeeComponent/MainEmployeeComponent';
import DesignationComponent from './components/EmployeeMasterComponent/DesignationComponent/DesignationComponent';
import Cookies from 'js-cookie';
import AddNewEmployeeComponent from './components/EmployeeComponent/AddNewEmployeeComponent';
import CompanyMasterComponent from './components/EmployeeMasterComponent/CompanyMasterComponent/CompanyMasterComponent';
import DepartmentComponent from './components/EmployeeMasterComponent/DepartmentComponent/DepartmentComponent';
import EmployeeTypeComponent from "./components/EmployeeMasterComponent/EmployeeTypeComponent/EmployeeTypeComponent";
import RegionComponent from "./components/EmployeeMasterComponent/RegionComponent/RegionComponent";
import RoleComponent from "./components/EmployeeMasterComponent/RoloComponent/RoleComponent";
import SiteComponent from "./components/EmployeeMasterComponent/SiteComponent/SiteComponent";
import ReportStudentPassMasterComponent from "./components/CustomerMasterComponent/ReportStudentPassMasterComponent";


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
            <a className="navbar-brand" href="http://localhost:4000" onClick={() => removeCookies()}>FutureBizops</a>
          </div>
          <ul className="nav navbar-nav">

            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Employee Master
                <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link to="/employee">Employee Master</Link></li>
              </ul>
            </li>


           

            <li><Link to="/customer">Customer Master</Link></li>
     

            <li><Link to="/studentpass">Student Pass Master</Link></li>
            <li><Link to="/historypass">Student Pass History</Link></li> 
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Bus PassMaster Records
                <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link to="/langauge">Language Master</Link></li>
                <li><Link to="/routes">Routes Master</Link></li>
                <li><Link to="/busstop">Bus Stop Master</Link></li>
                <li><Link to="/passtype">Pass Type Master</Link></li>
                <li><Link to="/documents">Document Master</Link></li>
                <li><Link to="/passtypedocument">Pass Type Document Master</Link></li>
                <li><Link to="/schoolinfo">School Information</Link></li>
              </ul>
            </li>

            <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Employee Master Records
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
            <li> <a href="http://localhost:4000" onClick={() => removeCookies()} >Logout </a></li>
          </ul>
        </div>
      </nav>
      <Routes>

        <Route exact path="/langauge" element={<LanguageMasterComponent></LanguageMasterComponent>}></Route>
        <Route exact path="/documents" element={<DocumentMasterComponent></DocumentMasterComponent>}></Route>
        <Route exact path="/routes" element={<RoutesMasterComponent></RoutesMasterComponent>}></Route>
        <Route exact path="/busstop" element={<BusStopMasterComponent></BusStopMasterComponent>}></Route>
        <Route exact path="/passtype" element={<PassTypeMasterComponent></PassTypeMasterComponent>}></Route>
        <Route exact path="/customer" element={<CustomerMasterComponent></CustomerMasterComponent>}></Route>
        <Route exact path="/studentpass" element={<StudentPassMasterComponent></StudentPassMasterComponent>}></Route>
        <Route exact path="/historypass" element={<ReportStudentPassMasterComponent></ReportStudentPassMasterComponent>}></Route>
        <Route exact path="/schoolinfo" element={<SchoolInformationMasterComponent></SchoolInformationMasterComponent>}></Route>
        <Route exact path="/passtypedocument" element={<PassTypeDocumentMasterComponent></PassTypeDocumentMasterComponent>} ></Route>

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
