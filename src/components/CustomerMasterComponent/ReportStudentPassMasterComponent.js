import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";

import { BASE_URL_API } from '../../services/URLConstants';
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent'
import StudentPassMasterService from '../../services/StudentPassMasterService';
import PassTypeMasterService from '../../services/BusPassMasterServices/PassTypeMasterService';
import BusStopMasterService from '../../services/BusPassMasterServices/BusStopMasterService';
import RoutesMasterService from '../../services/BusPassMasterServices/RoutesMasterService';
import SchoolInformationMasterService from '../../services/BusPassMasterServices/SchoolInformationMasterService';
import CustomerMasterService from '../../services/CustomerMasterService';
import { useNavigate } from 'react-router-dom';
import ReportStudentPassMasterService from '../../services/ReportStudentPassMasterService';
export default function ReportStudentPassMasterComponent() {
    const navigate = useNavigate();

    
    const [reportStudPassId, setReportStudPassId] = useState('');
    const [custId, setCustId] = useState('');
    const [custFirstName, setCustFirstName] = useState('');
    const [custMiddleName, setCustMiddleName] = useState('');
    const [custLastName, setCustLastName] = useState('');
    const [custGender, setCustGender] = useState('');
    const [custDateOfBirth, setCustDateOfBirth] = useState('');
    const [custLoginUserName, setCustLoginUserName] = useState('');
    const [custAddress, setCustAddress] = useState('');
    const [custMobileNo, setCustMobileNo] = useState('');
    const [custEmailId, setCustEmailId] = useState('');

    const [studPassId, setStudPassId] = useState('');

    const [passTypeCollectionLocation, setPassTypeCollectionLocation] = useState('');
    const [passTypeAgeLimit, setPassTypeAgeLimit] = useState('');


    const [passTypeId, setPassTypeId] = useState('');
    const [passTypeName, setPassTypeName] = useState('');
    const [passTypeAmount, setPassTypeAmount] = useState('');
    const [passTypeDescription, setPassTypeDescription] = useState('');
    const [passTypeEndDate, setPassTypeEndDate] = useState('');

    const [studPassCreatedDate, setStudPassCreatedDate] = useState('');
    const [studPassExpiryDate, setStudPassExpiryDate] = useState('');
    const [routesName, setRoutesName] = useState('');

    const [fromBusStopName, setFromBusStopName] = useState('');
    const [toBusStopName, setToBusStopName] = useState('');
    const [studPassAmountPaidStatus, setStudPassAmountPaidStatus] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [schoolAddress, setSchoolAddress] = useState('')
    const [schoolAutonomus, setSchoolAutonomus] = useState('')
    const [schoolEveryDayStartTiming, setSchoolEveryDayStartTiming] = useState('')
    const [schoolEveryDayEndTiming, setSchoolEveryDayEndTiming] = useState('')



    const [routesId, setRoutesId] = useState('');
    const [routesStartLocation, setRoutesStartLocation] = useState('');
    const [routesEndLocation, setRoutesEndLocation] = useState('');
    const [fromBusStopId, setFromBusStopId] = useState('');
    const [toBusStopId, setToBusStopId] = useState('');


    const [studPassAmount, setStudPassAmount] = useState('');
    const [schoolId, setSchoolId] = useState('');

    const [schoolIdentificationNumber, setSchoolIdentificationNumber] = useState('');


    const [studCourseName, setStudCourseName] = useState('');
    const [studClassName, setStudClassName] = useState('');
    const [studRollNo, setStudRollNo] = useState('');

    const [remark, setRemark] = useState('');
    const [customerMasters, setCustomerMasters] = useState([])


    const [saveStudentMasterMasterAlert, setSaveStudentMasterMasterAlert] = useState(false);
    const [deleteCustomerMasterAlert, setDeleteCustomerMasterAlert] = useState(false);
    const [updateCustomerMasterAlert, setUpdateCustomerMasterAlert] = useState(false);

    const [isSuccess, setIsSuccess] = useState(true)
    const [passTypeMasters, setPassTypeMasters] = useState([])

    const [routesMasters, setRoutesMasters] = useState([])

    const [ddSchoolInfoMasters, setDdSchoolInfoMasters] = useState([])

    const [ddFromBusStopMasters, setDdFromBusStopMasters] = useState([])
    const [ddToBusStopMasters, setDdToBusStopMasters] = useState([])


    const handleClose = () => {

        setSaveStudentMasterMasterAlert(false);
        setDeleteCustomerMasterAlert(false)
        setUpdateCustomerMasterAlert(false)
        setCustFirstName('');
        setRemark('');
    };
    //loading all department and roles while page loading at first time
    useEffect(() => {




        ReportStudentPassMasterService.getReportStudentPassMastertDetailsByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setCustomerMasters(res.data.responseData.content);
            }
            else {
                setIsSuccess(false);
            }
        });

    

    }, []);



    const showStudentPassMasterDetailsById = (e) => {

        ReportStudentPassMasterService.getReportStudentPassDetailsById(e).then(res => {
            let studPassMaster = res.data;
            setReportStudPassId(studPassMaster.reportStudPassId)
            setCustId(studPassMaster.custId)
            setCustFirstName(studPassMaster.custFirstName)
            setCustMiddleName(studPassMaster.custMiddleName)
            setCustLastName(studPassMaster.custLastName)

            setCustAddress(studPassMaster.custAddress)
            setCustDateOfBirth(studPassMaster.custDateOfBirth)
            setCustEmailId(studPassMaster.custEmailId)
            setCustMobileNo(studPassMaster.custMobileNo)
            setCustGender(studPassMaster.custGender)


            setPassTypeName(studPassMaster.passTypeName)
            setPassTypeDescription(studPassMaster.passTypeDescription)
            setPassTypeEndDate(studPassMaster.passTypeEndDate)
            setPassTypeCollectionLocation(studPassMaster.passTypeCollectionLocation)
            setPassTypeAgeLimit(studPassMaster.passTypeAgeLimit)


            setStudPassCreatedDate(studPassMaster.studPassCreatedDate)
            setStudPassExpiryDate(studPassMaster.studPassExpiryDate)
            setRoutesName(studPassMaster.routesName)
            setFromBusStopName(studPassMaster.fromBusStopName)
            setToBusStopName(studPassMaster.toBusStopName)
            setPassTypeAmount(studPassMaster.passTypeAmount)
            setStudPassAmountPaidStatus(studPassMaster.studPassAmountPaidStatus)
            setSchoolName(studPassMaster.schoolName)
            setSchoolAddress(studPassMaster.schoolAddress)
            setSchoolAutonomus(studPassMaster.schoolAutonomus)
            setSchoolEveryDayStartTiming(studPassMaster.schoolEveryDayStartTiming)
            setSchoolEveryDayEndTiming(studPassMaster.schoolEveryDayEndTiming)
            setSchoolIdentificationNumber(studPassMaster.schoolIdentificationNumber)
            setStudCourseName(studPassMaster.studCourseName)
            setStudClassName(studPassMaster.studClassName)
            setStudRollNo(studPassMaster.studRollNo)


            setRemark(studPassMaster.remark)
        }
        );
        // window.location.reload(); 
    }

    
    const handleFromBusStopIdChange = (value) => {
        setFromBusStopId(value)
    }

    const handleToBusStopIdChange = (value) => {
        setToBusStopId(value)
    }


    
    

   
    return (
        <React.Fragment>

            <div className="row">
                <h2 className="text-center">History Pass Details</h2>

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-sm-5">

                        </div>
                        <div className="col-sm-6" align="right">
                            

                        </div>
                    </div>
                    <div className="row">
                        {isSuccess ?
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">Sr No</th>
                                       
                                        <th className="text-center">Pass Type</th>
                                        <th className="text-center">Pass Amount</th>
                                        <th className="text-center">Pass Start Date</th>
                                        <th className="text-center">Pass End Date</th>
                                        <th className="text-center">Location Start Name</th>
                                        <th className="text-center">Location End Name</th>
                                        <th className="text-center">Pass Status</th>
                                        <th className="text-center">Action</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        customerMasters.map(
                                            (customerMaster, index) =>   //index is inbuilt variable of map started with 0
                                                <tr key={customerMaster.reportStudPassId}>
                                                    <td className="text-center">{index + 1}</td>
                                                    
                                                    <td>{customerMaster.passTypeName}</td>
                                                    <td>{customerMaster.passTypeAmount}</td>
                                                    <td>{customerMaster.studPassCreatedDate}</td>
                                                    <td>{customerMaster.studPassExpiryDate}</td>
                                                    <td>{customerMaster.fromBusStopName}</td>
                                                    <td>{customerMaster.toBusStopName}</td>
                                                    <td>{customerMaster.studPassStatus}</td>
                                                    <td>
                                                      
                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showStudentPassMasterDetailsById(customerMaster.reportStudPassId)}>View</button></td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>

                            : <h4>Student Pass is not available</h4>}
                    </div>

                </div>
                <div className="col-md-2"></div>

            </div>

          
            {/* Modal for show data when user click on view button */}
            <div className="modal fade" id="showData" role="dialog">
                <div className="modal-dialog modal-lg">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Student Pass Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="deptName" >Student Name:</label>
                                    <div className="col-sm-8">
                                        {custFirstName + " " + custMiddleName + " " + custLastName}
                                    </div>
                                </div>



                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Pass Type Name :</label>
                                    <div className="col-sm-8">
                                        {passTypeName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Pass Type Description :</label>
                                    <div className="col-sm-8">
                                        {passTypeDescription}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Pass Type Created Date:</label>
                                    <div className="col-sm-3">
                                        {studPassCreatedDate}
                                    </div>

                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Student Pass End Date:</label>
                                    <div className="col-sm-3">
                                        {studPassExpiryDate}
                                    </div>
                                </div>



                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Route Name:</label>
                                    <div className="col-sm-8">
                                        {routesName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="reamrk" >From Bus Stop name:</label>
                                    <div className="col-sm-3">
                                        {fromBusStopName}
                                    </div>

                                    <label className="control-label col-sm-3" htmlFor="reamrk" >To Bus Stop name:</label>
                                    <div className="col-sm-3">
                                        {toBusStopName}
                                    </div>
                                </div>




                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Student School Name:</label>
                                    <div className="col-sm-3">
                                        {schoolName}
                                    </div>

                                    <label className="control-label col-sm-3" htmlFor="reamrk" >School Number:</label>
                                    <div className="col-sm-3">
                                        {schoolIdentificationNumber}
                                    </div>
                                </div>




                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Student Course Name:</label>
                                    <div className="col-sm-8">
                                        {studCourseName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Student Class Name:</label>
                                    <div className="col-sm-3">
                                        {studClassName}
                                    </div>

                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Student Roll Number:</label>
                                    <div className="col-sm-3">
                                        {studRollNo}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Pass Amount Paid Status:</label>
                                    <div className="col-sm-8">
                                        {studPassAmountPaidStatus}
                                    </div>
                                </div>



                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="reamrk" >Remark :</label>
                                    <div className="col-sm-8">
                                        {remark}
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>



        </React.Fragment>
    );
}