import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import DocumentMasterService from "../../services/BusPassMasterServices/DocumentMasterService";
import { BASE_URL_API } from '../../services/URLConstants';
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent'
import PassTypeDocumentMasterService from '../../services/BusPassMasterServices/PassTypeDocumentMasterService';
import PassTypeMasterService from '../../services/BusPassMasterServices/PassTypeMasterService';
export default function PassTypeDocumentMasterComponent() {
    
    const [passTypeDocId, setPassTypeDocId] = useState('');
    const [passTypeId, setPassTypeId] = useState('');
    const [passTypeName, setPassTypeName] = useState('');

    const [passTypeDescription, setPassTypeDescription] = useState('');
    const [passTypeEndDate, setPassTypeEndDate] = useState('');



    const [passTypeCollectionLocation, setPassTypeCollectionLocation] = useState('');
    const [passTypeAmount, setPassTypeAmount] = useState('');
    const [passTypeAgeLimit, setPassTypeAgeLimit] = useState('');


    const [remark, setRemark] = useState('');
    const [docId, setDocId] = useState('');



    const [passTypeMasters, setPassTypeMasters] = useState([])
    const [documentMasters, setDocumentMasters] = useState([])
    const [passTypeDocumentMasters, setPassTypeDocumentMasters] = useState([])

    //const [passTypeMasters, setPassTypeMasters] = useState([])




    const [savePassTypeMasterAlert, setSavePassTypeMasterAlert] = useState(false);
    const [deletePassTypeMasterAlert, setDeletePassTypeMasterAlert] = useState(false);
    const [updatePassTypeMasterAlert, setUpdatePassTypeMasterAlert] = useState(false);

    const [isSuccess, setIsSuccess] = useState(true)

    const handleClose = () => {

        setSavePassTypeMasterAlert(false);
        setDeletePassTypeMasterAlert(false)
        setUpdatePassTypeMasterAlert(false)
        setPassTypeName('');
        setRemark('');
    };
    //loading all department and roles while page loading at first time
    useEffect(() => {
        PassTypeDocumentMasterService.getPassTypeDocumentMastertDetailsByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
                setPassTypeDocumentMasters(res.data.responseData.content);
            }
            else {
                setIsSuccess(false);
            }
        });

        PassTypeMasterService.ddPassTypeMaster().then((res) => {
            setPassTypeMasters(res.data);
            setPassTypeId(res.data?.[0].passTypeId)

        });

        DocumentMasterService.ddDocumentMaster().then((res) => {
            setDocumentMasters(res.data);
            setDocId(res.data?.[0].docId)

        });
    }, []);




    const savePassTypeMastertDetails = (e) => {
        e.preventDefault()

        let statusCd = 'A';
        let employeeId = Cookies.get('empId')
        let passTypeDocMaster = { passTypeId, docId, remark, statusCd, employeeId };

        PassTypeDocumentMasterService.savePassTypeDocumentMastertDetails(passTypeDocMaster).then(res => {

            PassTypeDocumentMasterService.getPassTypeDocumentMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setPassTypeDocumentMasters(res.data.responseData.content);
                }
                else {
                    console.log(res.data.responseMessage)
                    alert(res.data.responseMessage)
                    setIsSuccess(false);
                }

            });
            setSavePassTypeMasterAlert(false);

        }
        );
        // window.location.reload(); 
    }

    const showPassTypeMasterDetailsById = (e) => {

        PassTypeDocumentMasterService.getPassTypeDocumentDetailsById(e).then(res => {
            let passTypeDoc = res.data;
           setPassTypeDocId(passTypeDoc.passTypeDocId)
            setPassTypeId(passTypeDoc.passTypeId)
            setPassTypeName(passTypeDoc.passTypeName)
            setPassTypeDescription(passTypeDoc.passTypeDescription)
            setPassTypeEndDate(passTypeDoc.passTypeEndDate)

            setPassTypeCollectionLocation(passTypeDoc.passTypeCollectionLocation)
            setPassTypeAmount(passTypeDoc.passTypeAmount)
            setPassTypeAgeLimit(passTypeDoc.passTypeAgeLimit)

            setRemark(passTypeDoc.remark)
        }
        );
        // window.location.reload(); 
    }


    const deletePassTypeById = (e) => {
        if (window.confirm("Do you want to delete this Pass Type Document details ?")) {
            PassTypeDocumentMasterService.deletePassTypeDocumentById(e).then(res => {
                PassTypeDocumentMasterService.getPassTypeDocumentMastertDetailsByPaging().then((res1) => {
                    if (res1.data.success) {
                        setIsSuccess(true);
                        setPassTypeDocumentMasters(res1.data.responseData.content);
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
        setDeletePassTypeMasterAlert(false);
    }


    const updatePassTypeMaster = (e) => {

        e.preventDefault()
        let employeeId = Cookies.get('empId')

        let routesmaster = { passTypeId, passTypeName, passTypeDescription, passTypeEndDate, passTypeCollectionLocation, passTypeAmount, passTypeAgeLimit, remark, employeeId };
        PassTypeDocumentMasterService.updatePassTypeDocumentMastertDetails(routesmaster).then(res => {

            PassTypeDocumentMasterService.getPassTypeDocumentMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setPassTypeDocumentMasters(res.data.responseData.content);
                }
                else {
                    setIsSuccess(false);
                }

            });
            setUpdatePassTypeMasterAlert(false);

        }
        );

        setUpdatePassTypeMasterAlert(false);
    }



    return (
        <React.Fragment>

            <div className="row">
                <h2 className="text-center">Pass Type Document List</h2>

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-sm-5">
                            +
                        </div>
                        <div className="col-sm-6" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveData">Add Pass Type Document Details</button>

                        </div>
                    </div>
                    <div className="row">
                        {isSuccess ?
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">Sr No</th>
                                        <th className="text-center">Pass Type</th>
                                        <th className="text-center">Description</th>
                                        <th className="text-center">Required Document</th>
                                        
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        passTypeDocumentMasters.map(
                                            (passTypeDocMaster, index) =>   //index is inbuilt variable of map started with 0
                                                <tr key={passTypeDocMaster.passTypeDocId}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{passTypeDocMaster.passTypeName}</td>
                                                  
                                                    <td>{passTypeDocMaster.passTypeDescription}</td>
                                                    <td>{passTypeDocMaster.docName}</td>
                                                    <td> 
                                                        <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deletePassTypeById(passTypeDocMaster.passTypeDocId)}>Delete</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showPassTypeMasterDetailsById(passTypeDocMaster.passTypeDocId)}>View</button></td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>

                            : <h4>Pass Type document is not available</h4>}
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
                            <h4 className="modal-title">Add Pass Type Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="passTypeName">Select Pass Type Name:</label>
                                    <div className="col-sm-8">
                                    <select className="form-control" id="passTypeId" onChange={(e) => setPassTypeId(e.target.value)}>

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
                                    <label className="control-label col-sm-4" htmlFor="passTypeDescription">Select Document Name:</label>
                                    <div className="col-sm-8">
                                    <select className="form-control" id="docId" onChange={(e) => setDocId(e.target.value)}>

                                    {
                                        documentMasters.map(
                                            documentMaster =>
                                                <option key={documentMaster.docId} value={documentMaster.docId}>{documentMaster.docName}</option>
                                        )
                                    };

                                </select>
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSavePassTypeMasterAlert(true)} > Submit</button>
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
                            <h4 className="modal-title">Update Pass Type</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="passTypeName">Enter Pass Type Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="passTypeName" placeholder="Enter Route Name here" value={passTypeName} onChange={(e) => setPassTypeName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="passTypeDescription">Pass Type Description:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="passTypeDescription" placeholder="Enter Pass Type Description here" value={passTypeDescription} onChange={(e) => setPassTypeDescription(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="passTypeEndDate">Enter Pass Type End Date of Year:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="passTypeEndDate" placeholder="Enter Pass Type End Date of Year here" value={passTypeEndDate} onChange={(e) => setPassTypeEndDate(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="passTypeCollectionLocation">Enter Pass Type Collection Location:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="passTypeCollectionLocation" placeholder="Enter Pass Type Collect Location here" value={passTypeCollectionLocation} onChange={(e) => setPassTypeCollectionLocation(e.target.value)} />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="passTypeAmount">Enter Pass Type Amount:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="passTypeAmount" placeholder="Enter Pass Type End Date of Year here" value={passTypeAmount} onChange={(e) => setPassTypeAmount(e.target.value)} />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="passTypeAgeLimit">Enter Pass Type Age limit:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="passTypeAgeLimit" placeholder="Enter Pass Type Age limit here" value={passTypeAgeLimit} onChange={(e) => setPassTypeAgeLimit(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updatePassTypeMaster(e)} > Submit</button>
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
                            <h4 className="modal-title">Pass Type Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName" >Pass Type Name:</label>
                                    <div className="col-sm-8">
                                        {passTypeName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk" >Pass Type Description:</label>
                                    <div className="col-sm-8">
                                        {passTypeDescription}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk" >Pass Type End Date of Year :</label>
                                    <div className="col-sm-8">
                                        {passTypeEndDate}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk" >Pass Type Collection Location :</label>
                                    <div className="col-sm-8">
                                        {passTypeCollectionLocation}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk" >Pass Type Amount :</label>
                                    <div className="col-sm-8">
                                        {passTypeAmount}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="reamrk" >Pass Type Age Limit :</label>
                                    <div className="col-sm-8">
                                        {passTypeAgeLimit}
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


            {savePassTypeMasterAlert && (
                <AlertboxComponent
                    show={savePassTypeMasterAlert}
                    title="danger"
                    message="Do you want to save Pass Type Document"
                    onOk={savePassTypeMastertDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}



        </React.Fragment>
    );
}