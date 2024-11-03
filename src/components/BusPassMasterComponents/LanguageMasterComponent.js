import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import LanguageMasterService from "../../services/BusPassMasterServices/LanguageMasterService";
import { BASE_URL_API } from '../../services/URLConstants';
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent'
export default function LanguageMasterComponent() {


    const [langId, setLangId] = useState('');
    const [langName, setLangName] = useState('');

    const [remark, setRemark] = useState('');



    const [langguageMasters, setLangguageMasters] = useState([])



    const [saveLanguagetAlert, setSaveLanguagetAlert] = useState(false);
    const [deleteLanguagetAlert, setDeleteLanguagetAlert] = useState(false);
    const [updateLanguagetAlert, setUpdateLanguagetAlert] = useState(false);

    const [isSuccess, setIsSuccess] = useState(true)

    const handleClose = () => {

        setSaveLanguagetAlert(false);
        setDeleteLanguagetAlert(false)
        setUpdateLanguagetAlert(false)
        setLangName('');
        setRemark('');
    };
    //loading all department and roles while page loading at first time
    useEffect(() => {
        LanguageMasterService.getLanguageMastertDetailsByPaging().then((res) => {
            setLangguageMasters(res.data.responseData.content);
        });
    }, []);


    const saveLanguageMaster = (e) => {
        e.preventDefault()

        let statusCd = 'A';
        let employeeId = Cookies.get('empId')
        let language = { langName, remark, statusCd, employeeId };

        LanguageMasterService.saveLanguageMastertDetails(language).then(res => {
            
            LanguageMasterService.getLanguageMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setLangguageMasters(res.data.responseData.content);
                }
                else {
                    setIsSuccess(false);
                }

            });
            setSaveLanguagetAlert(false);

        }
        );
        // window.location.reload(); 
    }

    const showLanguageDetailsById = (e) => {

        LanguageMasterService.getLanguageDetailsById(e).then(res => {
            let langauge = res.data;
            
            setLangId(langauge.langId)
            setLangName(langauge.langName)

            setRemark(langauge.remark)
        }
        );
        // window.location.reload(); 
    }


    const deleteLanguageById = (e) => {
        if (window.confirm("Do you want to delete this Langauge name ?")) {
            LanguageMasterService.deleteLanguageById(e).then(res => {
                LanguageMasterService.getLanguageMastertDetailsByPaging().then((res1) => {
                    if (res1.data.success) {
                        setIsSuccess(true);
                        setLangguageMasters(res1.data.responseData.content);
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
        setDeleteLanguagetAlert(false);
    }

    const updateLanguageMaster = (e) => {

        e.preventDefault()
        let employeeId = Cookies.get('empId')

        let language = { langId, langName, remark, employeeId };
        LanguageMasterService.updateLanguageMastertDetails(language).then(res => {
            
            LanguageMasterService.getLanguageMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setLangguageMasters(res.data.responseData.content);
                }
                else {
                    setIsSuccess(false);
                }

            });
            setUpdateLanguagetAlert(false);

        }
        );

        setUpdateLanguagetAlert(false);
    }



    return (
        <React.Fragment>

            <div className="row">
                <h2 className="text-center">Language List</h2>
                <div className="col-md-1"></div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-sm-5">

                        </div>
                        <div className="col-sm-6" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveLanguage">Add Language</button>

                        </div>
                    </div>
                    <div className="row">
                        {isSuccess ?
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">Sr No</th>
                                        <th className="text-center">Language Name</th>

                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        langguageMasters.map(
                                            (language, index) =>   //index is inbuilt variable of map started with 0
                                                <tr key={language.langId}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{language.langName}</td>



                                                    <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateLanguage" onClick={() => showLanguageDetailsById(language.langId)}>Update</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteLanguageById(language.langId)}>Delete</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showLanguageDetailsById(language.langId)}>View</button></td>
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
            <div className="modal fade" id="saveLanguage" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add Language</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName">Enter Langauge Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="deptName" placeholder="Enter language Name here" value={langName} onChange={(e) => setLangName(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveLanguagetAlert(true)} > Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal for update language details */}
            <div className="modal fade" id="updateLanguage" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Update Language</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName">Enter Language Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="deptName" placeholder="Enter Language Name here" value={langName} onChange={(e) => setLangName(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateLanguageMaster(e)} > Submit</button>
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
                            <h4 className="modal-title">Language Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName" >Langauge Name:</label>
                                    <div className="col-sm-8">
                                        {langName}
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


            {saveLanguagetAlert && (
                <AlertboxComponent
                    show={saveLanguagetAlert}
                    title="danger"
                    message="Do you want to save language"
                    onOk={saveLanguageMaster}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}



        </React.Fragment>
    );
}