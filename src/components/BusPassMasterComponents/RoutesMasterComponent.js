import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent'
import RoutesMasterService from '../../services/BusPassMasterServices/RoutesMasterService';
export default function RoutesMasterComponent() {


    const [routesId, setRoutesId] = useState('');
    const [routesName, setRoutesName] = useState('');

    const [routesStartLocation, setRoutesStartLocation] = useState('');
    const [routesEndLocation, setRoutesEndLocation] = useState('');

    const [remark, setRemark] = useState('');



    const [routesMasters, setRoutesMasters] = useState([])



    const [saveRoutesMasterAlert, setSaveRoutesMasterAlert] = useState(false);
    const [deleteRoutesMasterAlert, setDeleteRoutesMasterAlert] = useState(false);
    const [updateRoutesMasterAlert, setUpdateRoutesMasterAlert] = useState(false);

    const [isSuccess, setIsSuccess] = useState(true)

    const handleClose = () => {

        setSaveRoutesMasterAlert(false);
        setDeleteRoutesMasterAlert(false)
        setUpdateRoutesMasterAlert(false)
        setRoutesName('');
        setRemark('');
    };
    //loading all department and roles while page loading at first time
    useEffect(() => {
        RoutesMasterService.getRoutesMastertDetailsByPaging().then((res) => {
            setRoutesMasters(res.data.responseData.content);
        });
    }, []);


    const saveRoutesMastertDetails = (e) => {
        e.preventDefault()

        let statusCd = 'A';
        let employeeId = Cookies.get('empId')
        let routesmaster = { routesName,routesStartLocation,routesEndLocation, remark, statusCd, employeeId };

        RoutesMasterService.saveRoutesMastertDetails(routesmaster).then(res => {
            
            RoutesMasterService.getRoutesMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setRoutesMasters(res.data.responseData.content);
                }
                else {
                    setIsSuccess(false);
                }

            });
            setSaveRoutesMasterAlert(false);

        }
        );
        // window.location.reload(); 
    }
   
    const showRoutesMasterDetailsById = (e) => {

        RoutesMasterService.getRoutesDetailsById(e).then(res => {
            let routesmaster = res.data;
            
            setRoutesId(routesmaster.routesId)
            setRoutesName(routesmaster.routesName)
            setRoutesStartLocation(routesmaster.routesStartLocation)
            setRoutesEndLocation(routesmaster.routesEndLocation)
            setRemark(routesmaster.remark)
        }
        );
        // window.location.reload(); 
    }


    const deleteRoutesById = (e) => {
        if (window.confirm("Do you want to delete this Routes name ?")) {
            RoutesMasterService.deleteRoutesById(e).then(res => {
                RoutesMasterService.getRoutesMastertDetailsByPaging().then((res1) => {
                    if (res1.data.success) {
                        setIsSuccess(true);
                        setRoutesMasters(res1.data.responseData.content);
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
        setDeleteRoutesMasterAlert(false);
    }

    const updateRoutesMaster = (e) => {

        e.preventDefault()
        let employeeId = Cookies.get('empId')

        let routesmaster = { routesId, routesName,routesStartLocation,routesEndLocation, remark, employeeId };
        RoutesMasterService.updateRoutesMastertDetails(routesmaster).then(res => {
            
            RoutesMasterService.getRoutesMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setRoutesMasters(res.data.responseData.content);
                }
                else {
                    setIsSuccess(false);
                }

            });
            setUpdateRoutesMasterAlert(false);

        }
        );

        setUpdateRoutesMasterAlert(false);
    }



    return (
        <React.Fragment>

            <div className="row">
                <h2 className="text-center">Routes List</h2>
                <div className="col-md-1"></div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-sm-5">

                        </div>
                        <div className="col-sm-6" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveData">Add Routes Details</button>

                        </div>
                    </div>
                    <div className="row">
                        {isSuccess ?
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">Sr No</th>
                                        <th className="text-center">Route Name</th>
                                        <th className="text-center">Start Location Name</th>
                                        <th className="text-center">End Location Name</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        routesMasters.map(
                                            (routemaster, index) =>   //index is inbuilt variable of map started with 0
                                                <tr key={routemaster.routesId}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{routemaster.routesName}</td>
                                                    <td>{routemaster.routesStartLocation}</td>
                                                    <td>{routemaster.routesEndLocation}</td>


                                                    <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateData" onClick={() => showRoutesMasterDetailsById(routemaster.routesId)}>Update</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteRoutesById(routemaster.routesId)}>Delete</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showRoutesMasterDetailsById(routemaster.routesId)}>View</button></td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>

                            : <h4>Route name is not available</h4>}
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
                            <h4 className="modal-title">Add Route Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="routesName">Enter Route Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="routesName" placeholder="Enter Route Name here" value={routesName} onChange={(e) => setRoutesName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="routesName">Enter Start Location Name:</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="routesName" placeholder="Enter Start Location Name here" value={routesStartLocation} onChange={(e) => setRoutesStartLocation(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="routesName">Enter End Location Name:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="routesName" placeholder="Enter End Location Name here" value={routesEndLocation} onChange={(e) => setRoutesEndLocation(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveRoutesMasterAlert(true)} > Submit</button>
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
                                    <label className="control-label col-sm-4" htmlFor="deptName">Enter Route Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="deptName" placeholder="Enter Route Name here" value={routesName} onChange={(e) => setRoutesName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="deptName">Enter Route Start Location Name:</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="deptName" placeholder="Enter document Name here" value={routesStartLocation} onChange={(e) => setRoutesStartLocation(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="deptName">Enter Document Name:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="deptName" placeholder="Enter document Name here" value={routesEndLocation} onChange={(e) => setRoutesEndLocation(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateRoutesMaster(e)} > Submit</button>
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
                            <h4 className="modal-title">Routes Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName" >Routes Name:</label>
                                    <div className="col-sm-8">
                                        {routesName}
                                    </div>
                                </div>

                                <div className="form-group">
                                <label className="control-label col-sm-4" htmlFor="reamrk" >Start Location :</label>
                                <div className="col-sm-8">
                                    {routesStartLocation}
                                </div>
                            </div>

                            <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="reamrk" >End Location :</label>
                            <div className="col-sm-8">
                                {routesEndLocation}
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


            {saveRoutesMasterAlert && (
                <AlertboxComponent
                    show={saveRoutesMasterAlert}
                    title="danger"
                    message="Do you want to save language"
                    onOk={saveRoutesMastertDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}



        </React.Fragment>
    );
}