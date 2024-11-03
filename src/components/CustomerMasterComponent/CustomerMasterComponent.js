import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";

import { BASE_URL_API } from '../../services/URLConstants';
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent'
import CustomerMasterService from '../../services/CustomerMasterService';
export default function CustomerMasterComponent() {


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


    const [remark, setRemark] = useState('');



    const [customerMasters, setCustomerMasters] = useState([])



    const [saveCustomerMasterAlert, setSaveCustomerMasterAlert] = useState(false);
    const [deleteCustomerMasterAlert, setDeleteCustomerMasterAlert] = useState(false);
    const [updateCustomerMasterAlert, setUpdateCustomerMasterAlert] = useState(false);

    const [isSuccess, setIsSuccess] = useState(true)

    const handleClose = () => {

        setSaveCustomerMasterAlert(false);
        setDeleteCustomerMasterAlert(false)
        setUpdateCustomerMasterAlert(false)
        setCustFirstName('');
        setRemark('');
    };
    //loading all department and roles while page loading at first time
    useEffect(() => {
        CustomerMasterService.getCustomerMastertDetailsByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setCustomerMasters(res.data.responseData.content);
            }
            else {
                setIsSuccess(false);
            }
        });
    }, []);




    const saveCustomerMastertDetails = (e) => {
        e.preventDefault()

        let statusCd = 'A';
        let employeeId = Cookies.get('empId')
        let routesmaster = { custFirstName, custMiddleName, custLastName, custAddress, custMobileNo, custEmailId, custGender, custDateOfBirth, remark, statusCd, employeeId };

        CustomerMasterService.saveCustomerMastertDetails(routesmaster).then(res => {

            CustomerMasterService.getCustomerMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setCustAddress('');
                    setCustEmailId('');
                    setCustFirstName('');
                    setCustMiddleName('');
                    setCustLastName('');
                    setCustAddress('');
                    setCustEmailId('');
                    setCustMobileNo('');
                    setCustomerMasters(res.data.responseData.content);


                }
                else {
                    setIsSuccess(false);
                }

            });
            setSaveCustomerMasterAlert(false);

        }
        );
        // window.location.reload(); 
    }

    const showCustomerMasterDetailsById = (e) => {

        CustomerMasterService.getCustomerDetailsById(e).then(res => {
            let customermaster = res.data;

            setCustId(customermaster.custId)
            setCustFirstName(customermaster.custFirstName)
            setCustMiddleName(customermaster.custMiddleName)
            setCustLastName(customermaster.custLastName)

            setCustAddress(customermaster.custAddress)
            setCustMobileNo(customermaster.custMobileNo)
            setCustEmailId(customermaster.custEmailId)
            setCustGender(customermaster.custGender)
            setCustDateOfBirth(customermaster.custDateOfBirth)
setCustLoginUserName(customermaster.custLoginUserName)
            setRemark(customermaster.remark)
        }
        );
        // window.location.reload(); 
    }


    const deleteCustomerById = (e) => {
        if (window.confirm("Do you want to delete this Customer details ?")) {
            CustomerMasterService.deleteCustomerById(e).then(res => {
                CustomerMasterService.getCustomerMastertDetailsByPaging().then((res1) => {
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

    const updateCustomerMaster = (e) => {

        e.preventDefault()
        let employeeId = Cookies.get('empId')

        let routesmaster = { custId, custFirstName, custMiddleName, custLastName, custAddress, custMobileNo, custEmailId, custGender, custDateOfBirth, remark, employeeId };
        CustomerMasterService.updateCustomerMastertDetails(routesmaster).then(res => {

            CustomerMasterService.getCustomerMastertDetailsByPaging().then((res) => {
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
                <h2 className="text-center">Customer List</h2>

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-sm-5">

                        </div>
                        <div className="col-sm-6" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveData">Add Customer Details</button>

                        </div>
                    </div>
                    <div className="row">
                        {isSuccess ?
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">Sr No</th>
                                        <th className="text-center">Customer Name</th>
                                        <th className="text-center">Address</th>
                                        <th className="text-center">Mobile No</th>
                                        <th className="text-center">Email Id</th>
                                        <th className="text-center">Gender</th>
                                        <th className="text-center">Date Of Birth</th>
                                        <th className="text-center">Login User Name</th>

                                        <th className="text-center">Action</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        customerMasters.map(
                                            (customerMaster, index) =>   //index is inbuilt variable of map started with 0
                                                <tr key={customerMaster.custId}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{customerMaster.custFirstName + " " + customerMaster.custMiddleName + " " + customerMaster.custLastName} </td>
                                                    <td>{customerMaster.custAddress}</td>
                                                    <td>{customerMaster.custMobileNo}</td>
                                                    <td>{customerMaster.custEmailId}</td>
                                                    <td>{customerMaster.custGender}</td>
                                                    <td>{customerMaster.custDateOfBirth}</td>
                                                    <td>{customerMaster.custLoginUserName}</td>
                                                    <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateData" onClick={() => showCustomerMasterDetailsById(customerMaster.custId)}>Update</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteCustomerById(customerMaster.custId)}>Delete</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showCustomerMasterDetailsById(customerMaster.custId)}>View</button></td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>

                            : <h4>Customer name is not available</h4>}
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
                            <h4 className="modal-title">Add Customer Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="custFirstName">Enter Customer First Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="custFirstName" placeholder="Enter Customer First Name" value={custFirstName} onChange={(e) => setCustFirstName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="custMiddleName">Enter Customer Middle Name:</label>
                                    <div className="col-sm-8">

                                        <input type="text" className="form-control" id="custMiddleName" placeholder="Enter Customer Middle Name" value={custMiddleName} onChange={(e) => setCustMiddleName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="custLastName">Enter Customer Last Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="custMiddleName" placeholder="Enter Customer Last Name" value={custLastName} onChange={(e) => setCustLastName(e.target.value)} />


                                    </div>
                                </div>



                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="custAddress">Enter Customer Address:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="custAddress" placeholder="Enter Customer Address" value={custAddress} onChange={(e) => setCustAddress(e.target.value)} />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="custMobileNo">Enter Customer Mobile No:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="custMobileNo" placeholder="Enter Customer Mobile No" value={custMobileNo} onChange={(e) => setCustMobileNo(e.target.value)} />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="custEmailId">Enter Customer Email Id:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="custEmailId" placeholder="Enter Customer Email Id" value={custEmailId} onChange={(e) => setCustEmailId(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="custGender">Select Gender:</label>
                                    <div className="col-sm-8">
                                        <select className="form-control" id="custGender" onChange={(e) => onCustGenderHandler(e.target.value)} defaultValue={custGender} >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="custDateOfBirth">Select Date of Birth:</label>
                                    <div className="col-sm-8">
                                    <input type="date" className="form-control" defaultValue={custDateOfBirth} name="custDateOfBirth" onChange={(e) => setCustDateOfBirth(e.target.value)} />
                        
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveCustomerMasterAlert(true)} > Submit</button>
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
                                    <label className="control-label col-sm-4" htmlFor="custFirstName">Enter Customer First Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="custFirstName" placeholder="Enter Customer First Name" value={custFirstName} onChange={(e) => setCustFirstName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="custMiddleName">Enter Customer Middle Name:</label>
                                    <div className="col-sm-8">

                                        <input type="text" className="form-control" id="custMiddleName" placeholder="Enter Customer Middle Name" value={custMiddleName} onChange={(e) => setCustMiddleName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="custLastName">Enter Customer Last Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="custMiddleName" placeholder="Enter Customer Last Name" value={custLastName} onChange={(e) => setCustLastName(e.target.value)} />


                                    </div>
                                </div>



                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="custAddress">Enter Customer Address:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="custAddress" placeholder="Enter Customer Address" value={custAddress} onChange={(e) => setCustAddress(e.target.value)} />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="custMobileNo">Enter Customer Mobile No:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="custMobileNo" placeholder="Enter Customer Mobile No" value={custMobileNo} onChange={(e) => setCustMobileNo(e.target.value)} />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="custEmailId">Enter Customer Email Id:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="custEmailId" placeholder="Enter Customer Email Id" value={custEmailId} onChange={(e) => setCustEmailId(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateCustomerMaster(e)} > Submit</button>
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
                                    <label className="control-label col-sm-4" htmlFor="deptName" >Customer Name:</label>
                                    <div className="col-sm-8">
                                        {custFirstName + " " + custMiddleName + " " + custLastName}
                                    </div>
                                </div>



                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk" >Customer Address :</label>
                                    <div className="col-sm-8">
                                        {custAddress}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk" >Customer Mobile No :</label>
                                    <div className="col-sm-8">
                                        {custMobileNo}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk" >Email Id:</label>
                                    <div className="col-sm-8">
                                        {custEmailId}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk" >Gender:</label>
                                    <div className="col-sm-8">
                                        {custGender}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk" >Date Of Birth:</label>
                                    <div className="col-sm-8">
                                        {custDateOfBirth}
                                    </div>
                                </div>

                                <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="reamrk" >Login User Name:</label>
                                <div className="col-sm-8">
                                    {custLoginUserName}
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


            {saveCustomerMasterAlert && (
                <AlertboxComponent
                    show={saveCustomerMasterAlert}
                    title="danger"
                    message="Do you want to save Customer details"
                    onOk={saveCustomerMastertDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}



        </React.Fragment>
    );
}