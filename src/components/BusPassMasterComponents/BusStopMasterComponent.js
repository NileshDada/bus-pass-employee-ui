import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { BASE_URL_API } from '../../services/URLConstants';
import AlertboxComponent from '../AlertboxComponent/AlertboxComponent'
import BusStopMasterService from '../../services/BusPassMasterServices/BusStopMasterService';
import RoutesMasterService from '../../services/BusPassMasterServices/RoutesMasterService';
export default function BusStopMasterComponent() {


    const [busStopId, setBusStopId] = useState('');
    const [routesId, setRoutesId] = useState('');
    const [routesName, setRoutesName] = useState('');

    const [routesStartLocation, setRoutesStartLocation] = useState('');
    const [routesEndLocation, setRoutesEndLocation] = useState('');
    const [busStopName, setBusStopName] = useState('');
    const [busStopNo, setBusStopNo] = useState('');

    const [remark, setRemark] = useState('');

    const [ddRoutesId, setDdRoutesId] = useState('');
    
    const [ddRoutesMasters, setDdRoutesMasters] = useState([]);

    const [busStopMaster, setBusStopMaster] = useState([])



    const [saveBusStopMasterAlert, setSaveBusStopMasterAlert] = useState(false);
    const [deleteBusStopMasterAlert, setDeleteBusStopMasterAlert] = useState(false);
    const [updateBusStopMasterAlert, setUpdateBusStopMasterAlert] = useState(false);

    const [isSuccess, setIsSuccess] = useState(true)

    const handleClose = () => {

        setSaveBusStopMasterAlert(false);
        setDeleteBusStopMasterAlert(false)
        setUpdateBusStopMasterAlert(false)
        setRoutesName('');
        setRemark('');
    };
    //loading all department and roles while page loading at first time
    useEffect(() => {
        BusStopMasterService.getBusStopMastertDetailsByPaging().then((res) => {
            if (res.data.success) {
                setIsSuccess(true);
            setBusStopMaster(res.data.responseData.content);
        }
        else {
            setIsSuccess(false);
        }
        });

        RoutesMasterService.ddRoutesMaster().then((res) => {
            setDdRoutesMasters(res.data);
            setRoutesId(res.data?.[0].routesId)

        });
    }, []);


    const saveBusStopMastertDetails = (e) => {
        e.preventDefault()

        let statusCd = 'A';
        let employeeId = Cookies.get('empId')
        let busStopMaster = { routesId, busStopName, busStopNo, remark, statusCd, employeeId };

        BusStopMasterService.saveBusStopMastertDetails(busStopMaster).then(res => {

            BusStopMasterService.getBusStopMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setBusStopMaster(res.data.responseData.content);
                }
                else {
                    setIsSuccess(false);
                }

            });
            setSaveBusStopMasterAlert(false);

        }
        );
        // window.location.reload(); 
    }

    const showBusStopMasterDetailsById = (e) => {

        BusStopMasterService.getBusStopDetailsById(e).then(res => {
            let busstopmaster = res.data;

            setBusStopId(busstopmaster.busStopId)
            setRoutesId(busstopmaster.routesId)
            setRoutesName(busstopmaster.routesName)
            setRoutesStartLocation(busstopmaster.routesStartLocation)
            setRoutesEndLocation(busstopmaster.routesEndLocation)
            setBusStopName(busstopmaster.busStopName)
            setBusStopNo(busstopmaster.busStopNo)
            setRemark(busstopmaster.remark)
        }
        );
        // window.location.reload(); 
    }


    const deleteBusStopById = (e) => {
        if (window.confirm("Do you want to delete this Bus Stop name ?")) {
            BusStopMasterService.deleteBusStopById(e).then(res => {
                BusStopMasterService.getBusStopMastertDetailsByPaging().then((res1) => {
                    if (res1.data.success) {
                        setIsSuccess(true);
                        setBusStopMaster(res1.data.responseData.content);
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
        setDeleteBusStopMasterAlert(false);
    }

    const updateBusStopMaster = (e) => {

        e.preventDefault()
        let employeeId = Cookies.get('empId')

        let busstopmaster = { busStopId,routesId, busStopName, busStopNo, remark, employeeId };
        BusStopMasterService.updateBusStopMastertDetails(busstopmaster).then(res => {

            BusStopMasterService.getBusStopMastertDetailsByPaging().then((res) => {
                if (res.data.success) {
                    setIsSuccess(true);
                    setBusStopMaster(res.data.responseData.content);
                }
                else {
                    setIsSuccess(false);
                }

            });
            setUpdateBusStopMasterAlert(false);

        }
        );

        setUpdateBusStopMasterAlert(false);
    }

    const handleRoutesIdChange = (value) => {
        setRoutesId(value)
    }


    return (
        <React.Fragment>

            <div className="row">
                <h2 className="text-center">Bus Stop List</h2>
                <div className="col-md-1"></div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-sm-5">

                        </div>
                        <div className="col-sm-6" align="right">
                            <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#saveData">Add Bus Stop Details</button>

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
                                        <th className="text-center">Bus Stop Name</th>
                                        <th className="text-center">Bus Stop Number</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        busStopMaster.map(
                                            (busStopMas, index) =>   //index is inbuilt variable of map started with 0
                                                <tr key={busStopMas.busStopId}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{busStopMas.routesName}</td>
                                                    <td>{busStopMas.routesStartLocation}</td>
                                                    <td>{busStopMas.routesEndLocation}</td>
                                                    <td>{busStopMas.busStopName}</td>
                                                    <td>{busStopMas.busStopNo}</td>

                                                    <td> <button type="submit" className="btn btn-info" data-toggle="modal" data-target="#updateData" onClick={() => showBusStopMasterDetailsById(busStopMas.busStopId)}>Update</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-danger" onClick={() => deleteBusStopById(busStopMas.busStopId)}>Delete</button>
                                                        <button type="submit" className="btn col-sm-offset-1 btn-success" data-toggle="modal" data-target="#showData" onClick={() => showBusStopMasterDetailsById(busStopMas.busStopId)}>View</button></td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>

                            : <h4>Bus Stop name is not available</h4>}
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
                            <h4 className="modal-title">Add Bus Stop Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="routesId">Enter Route Name:</label>
                                    <div className="col-sm-8">
                                    <select className="form-control" id="ddRoutesId" onChange={(e) => handleRoutesIdChange(e.target.value)}>

                                    {
                                        ddRoutesMasters.map(
                                            ddRoutesMaster =>
                                                <option key={ddRoutesMaster.routesId} value={ddRoutesMaster.routesId}>{ddRoutesMaster.routesName}</option>
                                        )
                                    };

                                </select>
                                        
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="busStopName">Enter Bus Stop Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="busStopName" placeholder="Enter Bus Stop Name here" value={busStopName} onChange={(e) => setBusStopName(e.target.value)} />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="busStopNo">Enter Bus Stop Number:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="busStopNo" placeholder="Enter Bus Stop Number here" value={busStopNo} onChange={(e) => setBusStopNo(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => setSaveBusStopMasterAlert(true)} > Submit</button>
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
                            <h4 className="modal-title">Update Bus Stop Details</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName">Route Name:</label>
                                    <div className="col-sm-8">
                                        {routesName}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName">Route Start Location Name:</label>
                                    <div className="col-sm-8">
                                       {routesStartLocation}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="deptName">Route End Location Name:</label>
                                    <div className="col-sm-8">
                                        {routesEndLocation}
                                    </div>
                                </div>

                                
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="busStopName">Enter Bus Stop Name:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="busStopName" placeholder="Enter Bus Stop Name here" value={busStopName} onChange={(e) => setBusStopName(e.target.value)} />
                                    </div>
                                </div>

                                
                                <div className="form-group">
                                    <label className="control-label col-sm-4" htmlFor="busStopNo">Enter Bus Stop Number:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="busStopNo" placeholder="Enter Bus Stop number here" value={busStopNo} onChange={(e) => setBusStopNo(e.target.value)} />
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
                            <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => updateBusStopMaster(e)} > Submit</button>
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
                            <h4 className="modal-title">Bus Stop Details</h4>
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
                                <label className="control-label col-sm-4" htmlFor="reamrk" >Bus Stop Name :</label>
                                <div className="col-sm-8">
                                    {busStopName}
                                </div>
                            </div>

                            <div className="form-group">
                            <label className="control-label col-sm-4" htmlFor="reamrk" >Bus Stop Number :</label>
                            <div className="col-sm-8">
                                {busStopNo}
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


            {saveBusStopMasterAlert && (
                <AlertboxComponent
                    show={saveBusStopMasterAlert}
                    title="danger"
                    message="Do you want to save Bus Stop details"
                    onOk={saveBusStopMastertDetails}
                    onClose={handleClose}
                    isCancleAvailable={true}
                />
            )}



        </React.Fragment>
    );
}