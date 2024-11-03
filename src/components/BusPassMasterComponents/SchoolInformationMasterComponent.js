import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";

import AlertboxComponent from '../AlertboxComponent/AlertboxComponent'
import SchoolInformationMasterService from '../../services/BusPassMasterServices/SchoolInformationMasterService';

export default function SchoolInformationMasterComponent() {


    const [schoolId, setSchoolId] = useState('');
    const [schoolName, setSchoolName] = useState('');

    const [schoolAddress, setSchoolAddress] = useState('');
    const [schoolAutonomus, setSchoolAutonomus] = useState('No');

    const [schoolEveryDayStartTiming, setSchoolEveryDayStartTiming] = useState('');
    const [schoolEveryDayEndTiming, setSchoolEveryDayEndTiming] = useState('');
    const [remark, setRemark] = useState('');



    const [schoolInformationMasters, setSchoolInformationMasters] = useState([])



    const [saveSchoolInformationMasterMasterAlert, setSaveSchoolInformationMasterMasterAlert] = useState(false);
    const [deleteSchoolInformationMasterAlert, setDeleteSchoolInformationMasterAlert] = useState(false);
    const [updateStudentInformationMasterAlert, setUpdateStudentInformationMasterAlert] = useState(false);

    const [isSuccess, setIsSuccess] = useState(true)

    const handleClose = () => {

        setSaveSchoolInformationMasterMasterAlert(false);
        setDeleteSchoolInformationMasterAlert(false)
        setUpdateStudentInformationMasterAlert(false)
        setSchoolName('');
        setRemark('');
    };
    //loading all department and roles while page loading at first time
    useEffect(() => {
        SchoolInformationMasterService.getSchoolInformationMastertDetailsByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setSchoolInformationMasters(res.data.responseData.content);
            }
            else {
                setIsSuccess(false);
            }
        });
    }, []);




    const saveStudentInformationMastertDetails = (e) => {
        e.preventDefault()

        let statusCd = 'A';
        let employeeId = Cookies.get('empId')
        let schoolInformation = { schoolName, schoolAddress, schoolAutonomus,schoolEveryDayStartTiming, schoolEveryDayEndTiming, remark, statusCd, employeeId };

        SchoolInformationMasterService.saveSchoolInformationMastertDetails(schoolInformation).then(res => {

            SchoolInformationMasterService.getSchoolInformationMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setSchoolAddress('');
                  
                    setSchoolInformationMasters(res.data.responseData.content);


                }
                else {
                    setIsSuccess(false);
                }

            });
            setSaveSchoolInformationMasterMasterAlert(false);

        }
        );
        // window.location.reload(); 
    }

    const showSchoolInformationMasterDetailsById = (e) => {

        SchoolInformationMasterService.getSchoolInformationDetailsById(e).then(res => {
            let schoolInformation = res.data;

            setSchoolId(schoolInformation.schoolId)
            setSchoolName(schoolInformation.schoolName)
            setSchoolAddress(schoolInformation.schoolAddress)
            setSchoolAutonomus(schoolInformation.schoolAutonomus)
            setSchoolEveryDayStartTiming(schoolInformation.schoolEveryDayStartTiming)
            setSchoolEveryDayEndTiming(schoolInformation.schoolEveryDayEndTiming)

            setRemark(schoolInformation.remark)
        }
        );
        // window.location.reload(); 
    }


    const deleteSchoolInformationById = (e) => {
        if (window.confirm("Do you want to delete this Customer details ?")) {
            SchoolInformationMasterService.deleteSchoolInformationById(e).then(res => {
                SchoolInformationMasterService.getSchoolInformationMastertDetailsByPaging().then((res1) => {
                    if (res1.data.success) {
                        setIsSuccess(true);
                        setSchoolInformationMasters(res1.data.responseData.content);
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
        setDeleteSchoolInformationMasterAlert(false);
    }

    const updateSchoolInformationMaster = (e) => {

        e.preventDefault()
        let employeeId = Cookies.get('empId')

        let routesmaster = { schoolId, schoolName, schoolAddress, schoolAutonomus, schoolEveryDayStartTiming, schoolEveryDayEndTiming, remark, employeeId };
        SchoolInformationMasterService.updateSchoolInformationMastertDetails(routesmaster).then(res => {

            SchoolInformationMasterService.getSchoolInformationMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setSchoolInformationMasters(res.data.responseData.content);
                }
                else {
                    setIsSuccess(false);
                }

            });
            setUpdateStudentInformationMasterAlert(false);

        }
        );

        setUpdateStudentInformationMasterAlert(false);
    }

  //for customer gender male or female
  const onSchoolAutonomusHandler = (event) => {
    setSchoolAutonomus(event);
};

    return (
        <React.Fragment>

            <div className="row">
                <h2 className="text-center">School Information List</h2>

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-sm-5">

                        </div>
                        <div className="col-sm-6" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveData">Add School Information Details</button>

                        </div>
                    </div>
                    <div className="row">
                        {isSuccess ?
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">Sr No</th>
                                        <th className="text-center">School Name</th>
                                        <th className="text-center">School No</th>
                                        <th className="text-center">School Address</th>
                                        <th className="text-center">School Autonomous</th>
                                        <th className="text-center">Every Day Start Timing</th>
                                        <th className="text-center">Every Day End Timing</th>
                                        <th className="text-center">Action</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        schoolInformationMasters.map(
                                            (schoolInformationMaster, index) =>   //index is inbuilt variable of map started with 0
                                                <tr key={schoolInformationMaster.schoolId}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{schoolInformationMaster.schoolName} </td>
                                                    <td>{schoolInformationMaster.schoolIdentificationNumber} </td>
                                                    <td>{schoolInformationMaster.schoolAddresss}</td>
                                                    <td>{schoolInformationMaster.schoolAutonomus}</td>
                                                    <td>{schoolInformationMaster.schoolEveryDayStartTiming}</td>
                                                    <td>{schoolInformationMaster.schoolEveryDayEndTiming}</td>
                                                    
                                                    <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateData" onClick={() => showSchoolInformationMasterDetailsById(schoolInformationMaster.schoolId)}>Update</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteSchoolInformationById(schoolInformationMaster.schoolId)}>Delete</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showSchoolInformationMasterDetailsById(schoolInformationMaster.schoolId)}>View</button></td>
                                                </tr>
                                        )

                                    }
                                </tbody>
                            </table>

                            : <h4>School information is not available</h4>}
                    </div>

                </div>
                <div className="col-md-2"></div>

            </div>

            {/* Modal for save Language details */}
            <div className="modal fade" id="saveData" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add School Information Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="schoolName">Enter School Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="schoolName" placeholder="Enter School Name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="schoolAddresss">Enter School Address:</label>
                                    <div className="col-sm-8">

                                        <input type="text" className="form-control" id="schoolAddresss" placeholder="Enter School Address" value={schoolAddress} onChange={(e) => setSchoolAddress(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="schoolAutonomus">Is School Autonomous:</label>
                                    <div className="col-sm-8">
                                    
                                        <select className="form-control" id="schoolAutonomus" onChange={(e) => onSchoolAutonomusHandler(e.target.value)} defaultValue={schoolAutonomus} >
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </select>

                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="schoolEveryDayStartTiming">Select Every day Start School Timing :</label>
                                    <div className="col-sm-8">
                                        <input type="date" className="form-control" defaultValue={schoolEveryDayStartTiming} name="schoolEveryDayStartTiming" onChange={(e) => setSchoolEveryDayStartTiming(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="schoolEveryDayEndTiming">Select School End Time:</label>
                                    <div className="col-sm-8">
                    
                                    <input type="date" className="form-control" defaultValue={schoolEveryDayEndTiming} name="schoolEveryDayEndTiming" onChange={(e) => setSchoolEveryDayEndTiming(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                    <div className="col-sm-8">
                                        <textarea row="5" className="form-control" id="remark" placeholder="Enter Remark here" value={remark} onChange={(e) => setRemark(e.target.value)} />
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveSchoolInformationMasterMasterAlert(true)} > Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal for update language details */}
            <div className="modal fade" id="updateData" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Update Customer</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">


                            <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="schoolName">Enter School Name:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="schoolName" placeholder="Enter School Name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="schoolAddresss">Enter School Address:</label>
                            <div className="col-sm-8">

                                <input type="text" className="form-control" id="schoolAddresss" placeholder="Enter School Address" value={schoolAddress} onChange={(e) => setSchoolAddress(e.target.value)} />
                            </div>
                        </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="schoolAutonomus">Select School as Autonomous:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="schoolAddresss" placeholder="Enter Customer Last Name" value={schoolAutonomus} onChange={(e) => setSchoolAutonomus(e.target.value)} />


                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk">Enter Remark:</label>
                                    <div className="col-sm-8">
                                        <textarea row="5" className="form-control" id="remark" placeholder="Enter Remark here" value={remark} onChange={(e) => setRemark(e.target.value)} />
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateSchoolInformationMaster(e)} > Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>


            {/* Modal for show data when user click on view button */}
            <div className="modal fade" id="showData" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Customer Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName" >School Name:</label>
                                    <div className="col-sm-8">
                                        {schoolName}
                                    </div>
                                </div>

                                <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="schoolAddresss" >School Address:</label>
                                <div className="col-sm-8">
                                    {schoolAddress}
                                </div>
                            </div>

                            <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="schoolAutonomus" >Is School Autonomous:</label>
                            <div className="col-sm-8">
                                {schoolAutonomus}
                            </div>
                        </div>



                              

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="schoolEveryDayStartTiming" >Every day school start timing:</label>
                                    <div className="col-sm-8">
                                        {schoolEveryDayStartTiming}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="schoolEveryDayEndTiming" >Every day school end timing:</label>
                                    <div className="col-sm-8">
                                        {schoolEveryDayEndTiming}
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk" >Remark :</label>
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


            {saveSchoolInformationMasterMasterAlert && (
                <AlertboxComponent
                    show={saveSchoolInformationMasterMasterAlert}
                    title="danger"
                    message="Do you want to save School Information details"
                    onOk={saveStudentInformationMastertDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}



        </React.Fragment>
    );
}