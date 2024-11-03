import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";

import AlertboxComponent from '../AlertboxComponent/AlertboxComponent'
import StudentPassMasterService from '../../services/StudentPassMasterService';
import PassTypeMasterService from '../../services/BusPassMasterServices/PassTypeMasterService';
import BusStopMasterService from '../../services/BusPassMasterServices/BusStopMasterService';
import RoutesMasterService from '../../services/BusPassMasterServices/RoutesMasterService';
import SchoolInformationMasterService from '../../services/BusPassMasterServices/SchoolInformationMasterService';
import CustomerMasterService from '../../services/CustomerMasterService';
export default function StudentPassMasterComponent() {


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

//To create new student pass
let custId = Cookies.get('empId')
CustomerMasterService.getCustomerDetailsById(custId).then(res => {
    let studPassMaster = res.data;

    setCustId(studPassMaster.custId)
    setCustFirstName(studPassMaster.custFirstName)
    setCustMiddleName(studPassMaster.custMiddleName)
    setCustLastName(studPassMaster.custLastName)

    setCustAddress(studPassMaster.custAddress)
    setCustDateOfBirth(studPassMaster.custDateOfBirth)
    setCustEmailId(studPassMaster.custEmailId)
    setCustMobileNo(studPassMaster.custMobileNo)
    setCustGender(studPassMaster.custGender)
}
);



        StudentPassMasterService.getStudentPassMastertDetailsByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setCustomerMasters(res.data.responseData.content);
            }
            else {
                setIsSuccess(false);
            }
        });

        PassTypeMasterService.ddPassTypeMaster().then((res) => {
            setPassTypeMasters(res.data);
            setPassTypeId(res.data?.[0].passTypeId)

            PassTypeMasterService.getPassTypeDetailsById(passTypeId).then(res => {
                let routesmaster = res.data;

                setPassTypeId(routesmaster.passTypeId)
                setPassTypeName(routesmaster.passTypeName)
                setPassTypeDescription(routesmaster.passTypeDescription)
                setPassTypeEndDate(routesmaster.passTypeEndDate)

                setPassTypeCollectionLocation(routesmaster.passTypeCollectionLocation)
                setPassTypeAmount(routesmaster.passTypeAmount)
                setPassTypeAgeLimit(routesmaster.passTypeAgeLimit)

                setRemark(routesmaster.remark)
            }
            );

        });

        BusStopMasterService.ddRoutesMaster().then((res) => {
            setRoutesMasters(res.data);
            setRoutesId(res.data?.[0].routesId)
            let routesId = res.data?.[0].routesId;

            RoutesMasterService.getRoutesDetailsById(routesId).then(res => {
                let routesmaster = res.data;

                setRoutesId(routesmaster.routesId)
                setRoutesName(routesmaster.routesName)
                setRoutesStartLocation(routesmaster.routesStartLocation)
                setRoutesEndLocation(routesmaster.routesEndLocation)
                setRemark(routesmaster.remark)

            }
            );

            BusStopMasterService.ddBusStopMaster(routesId).then((res) => {
                setDdFromBusStopMasters(res.data);
                setDdToBusStopMasters(res.data);
                setFromBusStopId(res.data?.[0].busStopId)
                setToBusStopId(res.data?.[0].busStopId)
            });

        });

        SchoolInformationMasterService.ddSchoolInformationMaster().then((res) => {
            setDdSchoolInfoMasters(res.data);
            setSchoolId(res.data?.[0].schoolId)

            SchoolInformationMasterService.getSchoolInformationDetailsById(schoolId).then(res => {
                let schoolInformation = res.data;

                setSchoolId(schoolInformation.schoolId)
                setSchoolIdentificationNumber(schoolInformation.schoolIdentificationNumber)
                setSchoolName(schoolInformation.schoolName)
                setSchoolAddress(schoolInformation.schoolAddress)
                setSchoolAutonomus(schoolInformation.schoolAutonomus)
                setSchoolEveryDayStartTiming(schoolInformation.schoolEveryDayStartTiming)
                setSchoolEveryDayEndTiming(schoolInformation.schoolEveryDayEndTiming)

                setRemark(schoolInformation.remark)
            }
            );

        });



    }, []);




    const saveStudentPassMastertDetails = (e) => {
        e.preventDefault()

        let statusCd = 'A';
        let employeeId = Cookies.get('empId')

        let routesmaster = { custId, passTypeId,passTypeAmount, routesId, fromBusStopId, toBusStopId, schoolId, schoolIdentificationNumber, studCourseName, studClassName, studRollNo, remark, statusCd, employeeId };

        StudentPassMasterService.saveStudentPassMastertDetails(routesmaster).then(res => {

            StudentPassMasterService.getStudentPassMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                   
                    setCustomerMasters(res.data.responseData.content);


                }
                else {
                    setIsSuccess(false);
                }

            });
            setSaveStudentMasterMasterAlert(false);

        }
        );
        // window.location.reload(); 
    }

    const showStudentPassMasterDetailsById = (e) => {

        StudentPassMasterService.getStudentPassDetailsById(e).then(res => {
            let studPassMaster = res.data;

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

    // handle region id change
    //for role , department and designation
    const handlePassTypeIdChange = (value) => {
        setPassTypeId(value)
        let passTypeId = value;
        PassTypeMasterService.getPassTypeDetailsById(passTypeId).then(res => {
            let routesmaster = res.data;

            setPassTypeId(routesmaster.passTypeId)
            setPassTypeName(routesmaster.passTypeName)
            setPassTypeDescription(routesmaster.passTypeDescription)
            setPassTypeEndDate(routesmaster.passTypeEndDate)

            setPassTypeCollectionLocation(routesmaster.passTypeCollectionLocation)
            setPassTypeAmount(routesmaster.passTypeAmount)
            setPassTypeAgeLimit(routesmaster.passTypeAgeLimit)

            setRemark(routesmaster.remark)
        }
        );
    }

    const handleFromBusStopIdChange = (value) => {
        setFromBusStopId(value)
    }

    const handleToBusStopIdChange = (value) => {
        setToBusStopId(value)
    }


    // handle region id change
    //for role , department and designation
    const handleSchoolInfoIdChange = (value) => {
        setPassTypeId(value)
        let schoolId = value;
        SchoolInformationMasterService.getSchoolInformationDetailsById(schoolId).then(res => {
            let schoolInformation = res.data;

            setSchoolId(schoolInformation.schoolId)
            setSchoolIdentificationNumber(schoolInformation.schoolIdentificationNumber)
            setSchoolName(schoolInformation.schoolName)
            setSchoolAddress(schoolInformation.schoolAddress)
            setSchoolAutonomus(schoolInformation.schoolAutonomus)
            setSchoolEveryDayStartTiming(schoolInformation.schoolEveryDayStartTiming)
            setSchoolEveryDayEndTiming(schoolInformation.schoolEveryDayEndTiming)

            setRemark(schoolInformation.remark)
        }
        );
    }

    // handle routes id change

    const handleRoutesIdChange = (value) => {
        setRoutesId(value)
        let routesId = value;
        RoutesMasterService.getRoutesDetailsById(routesId).then(res => {
            let routesmaster = res.data;

            setRoutesId(routesmaster.routesId)
            setRoutesName(routesmaster.routesName)
            setRoutesStartLocation(routesmaster.routesStartLocation)
            setRoutesEndLocation(routesmaster.routesEndLocation)
            setRemark(routesmaster.remark)
        }
        );

        BusStopMasterService.ddBusStopMaster(routesId).then((res) => {
            setDdFromBusStopMasters(res.data);
            setDdToBusStopMasters(res.data);
            setFromBusStopId(res.data?.[0].busStopId)
            setToBusStopId(res.data?.[0].busStopId)
        });
    }

    const deleteStudentPassById = (e) => {
        if (window.confirm("Do you want to delete this Student Pass details ?")) {
            StudentPassMasterService.deleteStudentPassById(e).then(res => {
                StudentPassMasterService.getStudentPassMastertDetailsByPaging().then((res1) => {
                    if (res1.data.success) {
                        setIsSuccess(true);
                        setCustomerMasters(res1.data.responseData.content);
                    }
                    else {
                        setIsSuccess(false);
                    }
                });
            }
            );

        } else {
            // User clicked Cancel
            console.log("User canceled the action.");
        }
        setDeleteCustomerMasterAlert(false);
    }

    const updateStudentPassMaster = (e) => {

        e.preventDefault()
        let employeeId = Cookies.get('empId')

        let routesmaster = { custId, custFirstName, custMiddleName, custLastName, custAddress, custMobileNo, custEmailId, custGender, custDateOfBirth, remark, employeeId };
        StudentPassMasterService.updateStudentPassMastertDetails(routesmaster).then(res => {

            StudentPassMasterService.getStudentPassMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setCustomerMasters(res.data.responseData.content);
                }
                else {
                    setIsSuccess(false);
                }

            });
            setUpdateCustomerMasterAlert(false);

        }
        );

        setUpdateCustomerMasterAlert(false);
    }

    //for customer gender male or female
    const onCustGenderHandler = (event) => {
        setCustGender(event);
    };

    return (
        <React.Fragment>

            <div className="row">
                <h2 className="text-center">Student Pass List</h2>

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-sm-5">

                        </div>
                        <div className="col-sm-6" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveData" data-backdrop="static" data-keyboard="false">Add New Student Pass</button>

                        </div>
                    </div>
                    <div className="row">
                        {isSuccess ?
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">Sr No</th>
                                        <th className="text-center">Student Name</th>
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
                                                <tr key={customerMaster.studPassId}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{customerMaster.custFirstName + " " + customerMaster.custMiddleName + " " + customerMaster.custLastName} </td>
                                                    <td>{customerMaster.passTypeName}</td>
                                                    <td>{customerMaster.passTypeAmount}</td>
                                                    <td>{customerMaster.studPassCreatedDate}</td>
                                                    <td>{customerMaster.studPassExpiryDate}</td>
                                                    <td>{customerMaster.fromBusStopName}</td>
                                                    <td>{customerMaster.toBusStopName}</td>
                                                    <td>{customerMaster.studPassStatus}</td>
                                                    <td>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteStudentPassById(customerMaster.studPassId)}>Delete</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showStudentPassMasterDetailsById(customerMaster.studPassId)}>View</button></td>
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

            {/* Modal for save Language details */}
            <div className="modal fade" id="saveData" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add New Student Pass</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">


                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="studentName">Student Name:</label>
                                    <div className="col-sm-8">
                                        {custFirstName + " " + custMiddleName + " " + custLastName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">Student Address:</label>
                                    <div className="col-sm-3">
                                        {custAddress}
                                    </div>

                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">Mobile Number:</label>
                                    <div className="col-sm-3">
                                        {custMobileNo}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">Student Email Id:</label>
                                    <div className="col-sm-3">
                                        {custEmailId}
                                    </div>

                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">Student Gender:</label>
                                    <div className="col-sm-3">
                                        {custGender}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <hr></hr>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">Student School Name:</label>
                                    <div className="col-sm-8">
                                        <select className="form-control" id="passTypeId" onChange={(e) => handleSchoolInfoIdChange(e.target.value)}>

                                            {
                                                ddSchoolInfoMasters.map(
                                                    ddSchoolInfoMaster =>
                                                        <option key={ddSchoolInfoMaster.schoolId} value={ddSchoolInfoMaster.schoolId}>{ddSchoolInfoMaster.schoolName}</option>
                                                )
                                            };
                                        </select>

                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">Selected School Name:</label>
                                    <div className="col-sm-3">
                                        {schoolName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">School Number:</label>
                                    <div className="col-sm-3">
                                        {schoolIdentificationNumber}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">School Address:</label>
                                    <div className="col-sm-3">
                                        {schoolAddress}
                                    </div>

                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">School Autonomous:</label>
                                    <div className="col-sm-3">
                                        {schoolAutonomus}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">School Start Timing:</label>
                                    <div className="col-sm-3">
                                        {schoolEveryDayStartTiming}
                                    </div>

                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">School End Timig:</label>
                                    <div className="col-sm-3">
                                        {schoolEveryDayEndTiming}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <hr></hr>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">Pass Type Details:</label>
                                    <div className="col-sm-3">
                                        <select className="form-control" id="passTypeId" onChange={(e) => handlePassTypeIdChange(e.target.value)}>

                                            {
                                                passTypeMasters.map(
                                                    passTypeMaster =>
                                                        <option key={passTypeMaster.passTypeId} value={passTypeMaster.passTypeId}>{passTypeMaster.passTypeName}</option>
                                                )
                                            };
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">Pass Type Descriptioin:</label>
                                    <div className="col-sm-8">
                                        {passTypeDescription}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">Pass Type End Date:</label>
                                    <div className="col-sm-3">
                                        {passTypeEndDate}
                                    </div>

                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">Pass Collection Place:</label>
                                    <div className="col-sm-3">
                                        {passTypeCollectionLocation}
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">Pass Type Amount:</label>
                                    <div className="col-sm-3">
                                        {passTypeAmount}
                                    </div>

                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">Pass Type Age limit:</label>
                                    <div className="col-sm-3">
                                        {passTypeAgeLimit}
                                    </div>
                                </div>


                                <div className="form-group">
                                    <hr></hr>
                                </div>




                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="routesId">Select Route Name:</label>
                                    <div className="col-sm-3">
                                        <select className="form-control" id="routesId" onChange={(e) => handleRoutesIdChange(e.target.value)}>

                                            {
                                                routesMasters.map(
                                                    routesMaster =>
                                                        <option key={routesMaster.routesId} value={routesMaster.routesId}>{routesMaster.routesName}</option>
                                                )
                                            };
                                        </select>

                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="routesStartLocation">Route Start Location:</label>
                                    <div className="col-sm-3">
                                        {routesStartLocation}
                                    </div>

                                    <label className="control-label col-sm-3" htmlFor="routesEndLocation">Route End Location:</label>
                                    <div className="col-sm-3">
                                        {routesEndLocation}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <hr></hr>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">Start Bus Stop Name:</label>
                                    <div className="col-sm-5">
                                        <select className="form-control" id="passTypeId" onChange={(e) => handleFromBusStopIdChange(e.target.value)}>

                                            {
                                                ddFromBusStopMasters.map(
                                                    ddFromBusStopMaster =>
                                                        <option key={ddFromBusStopMaster.busStopId} value={ddFromBusStopMaster.busStopId}>{ddFromBusStopMaster.busStopName}</option>
                                                )
                                            };
                                        </select>
                                    </div>


                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-3" htmlFor="custMiddleName">To Bus Stop Name:</label>
                                    <div className="col-sm-5">
                                        <select className="form-control" id="passTypeId" onChange={(e) => handleToBusStopIdChange(e.target.value)}>

                                            {
                                                ddToBusStopMasters.map(
                                                    ddFromBusStopMaster =>
                                                        <option key={ddFromBusStopMaster.busStopId} value={ddFromBusStopMaster.busStopId}>{ddFromBusStopMaster.busStopName}</option>
                                                )
                                            };
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <hr></hr>
                                </div>

                                <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="studCourseName">Course Name:</label>
                                <div className="col-sm-3">
                                <input type="text" className="form-control" id="studCourseName" placeholder="Enter Course namee here" value={studCourseName} onChange={(e) => setStudCourseName(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="studClassName">Class Name:</label>
                            <div className="col-sm-3">
                            <input type="text" className="form-control" id="studClassName" placeholder="Enter Course namee here" value={studClassName} onChange={(e) => setStudClassName(e.target.value)} />
                            </div>

                            <label className="control-label col-sm-3" htmlFor="studRollNo">Roll No:</label>
                            <div className="col-sm-3">
                            <input type="text" className="form-control" id="studRollNo" placeholder="Enter Course namee here" value={studRollNo} onChange={(e) => setStudRollNo(e.target.value)} />
                            </div>
                        </div>

                            <div className="form-group">
                            <hr></hr>
                        </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveStudentMasterMasterAlert(true)} > Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
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


            {saveStudentMasterMasterAlert && (
                <AlertboxComponent
                    show={saveStudentMasterMasterAlert}
                    title="danger"
                    message="Do you want to save Student Pass details"
                    onOk={saveStudentPassMastertDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}



        </React.Fragment>
    );
}