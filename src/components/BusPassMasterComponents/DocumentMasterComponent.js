import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import DocumentMasterService from "../../services/BusPassMasterServices/DocumentMasterService";
import { BASE_URL_API } from '../../services/URLConstants';
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent'
export default function DocumentMasterComponent() {


    const [docId, setDocId] = useState('');
    const [docName, setDocName] = useState('');

    const [remark, setRemark] = useState('');



    const [documentMasters, setDocumentMasters] = useState([])



    const [saveDocumentMasterAlert, setSaveDocumentMasterAlert] = useState(false);
    const [deleteDocumentMasterAlert, setDeleteDocumentMasterAlert] = useState(false);
    const [updateDocumentMasterAlert, setUpdateDocumentMasterAlert] = useState(false);

    const [isSuccess, setIsSuccess] = useState(true)

    const handleClose = () => {

        setSaveDocumentMasterAlert(false);
        setDeleteDocumentMasterAlert(false)
        setUpdateDocumentMasterAlert(false)
        setDocName('');
        setRemark('');
    };
    //loading all department and roles while page loading at first time
    useEffect(() => {
        DocumentMasterService.getDocumentMastertDetailsByPaging().then((res) => {
            setDocumentMasters(res.data.responseData.content);
        });
    }, []);


    const saveDocumentMastertDetails = (e) => {
        e.preventDefault()

        let statusCd = 'A';
        let employeeId = Cookies.get('empId')
        let documentmaster = { docName, remark, statusCd, employeeId };

        DocumentMasterService.saveDocumentMastertDetails(documentmaster).then(res => {
            
            DocumentMasterService.getDocumentMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setDocumentMasters(res.data.responseData.content);
                }
                else {
                    setIsSuccess(false);
                }

            });
            setSaveDocumentMasterAlert(false);

        }
        );
        // window.location.reload(); 
    }

    const showDocumentMasterDetailsById = (e) => {

        DocumentMasterService.getDocumentDetailsById(e).then(res => {
            let langauge = res.data;
            
            setDocId(langauge.docId)
            setDocName(langauge.docName)

            setRemark(langauge.remark)
        }
        );
        // window.location.reload(); 
    }


    const deleteDocumentById = (e) => {
        if (window.confirm("Do you want to delete this Langauge name ?")) {
            DocumentMasterService.deleteDocumentById(e).then(res => {
                DocumentMasterService.getDocumentMastertDetailsByPaging().then((res1) => {
                    if (res1.data.success) {
                        setIsSuccess(true);
                        setDocumentMasters(res1.data.responseData.content);
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
        setDeleteDocumentMasterAlert(false);
    }

    const updateDocumentsMaster = (e) => {

        e.preventDefault()
        let employeeId = Cookies.get('empId')

        let documentmaster = { docId, docName, remark, employeeId };
        DocumentMasterService.updateDocumentMastertDetails(documentmaster).then(res => {
            
            DocumentMasterService.getDocumentMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setDocumentMasters(res.data.responseData.content);
                }
                else {
                    setIsSuccess(false);
                }

            });
            setUpdateDocumentMasterAlert(false);

        }
        );

        setUpdateDocumentMasterAlert(false);
    }



    return (
        <React.Fragment>

            <div className="row">
                <h2 className="text-center">Document List</h2>
                <div className="col-md-1"></div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-sm-5">

                        </div>
                        <div className="col-sm-6" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveData">Add Document</button>

                        </div>
                    </div>
                    <div className="row">
                        {isSuccess ?
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">Sr No</th>
                                        <th className="text-center">Document Name</th>

                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        documentMasters.map(
                                            (documentmaster, index) =>   //index is inbuilt variable of map started with 0
                                                <tr key={documentmaster.docId}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{documentmaster.docName}</td>



                                                    <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateData" onClick={() => showDocumentMasterDetailsById(documentmaster.docId)}>Update</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteDocumentById(documentmaster.docId)}>Delete</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showDocumentMasterDetailsById(documentmaster.docId)}>View</button></td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>

                            : <h4>Language name is not available</h4>}
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
                            <h4 className="modal-title">Add Document</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="docName">Enter Document Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="docName" placeholder="Enter document Name here" value={docName} onChange={(e) => setDocName(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveDocumentMasterAlert(true)} > Submit</button>
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
                            <h4 className="modal-title">Update Document</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName">Enter Document Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="deptName" placeholder="Enter document Name here" value={docName} onChange={(e) => setDocName(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateDocumentsMaster(e)} > Submit</button>
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
                            <h4 className="modal-title">Document Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName" >Document Name:</label>
                                    <div className="col-sm-8">
                                        {docName}
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


            {saveDocumentMasterAlert && (
                <AlertboxComponent
                    show={saveDocumentMasterAlert}
                    title="danger"
                    message="Do you want to save language"
                    onOk={saveDocumentMastertDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}



        </React.Fragment>
    );
}