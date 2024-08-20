import { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaPen } from 'react-icons/fa';

import Navbar from "../admin_comp/Navbar";
import MainSide from "../admin_comp/MainSide";
import ContentHeader from "../admin_comp/ContentHeader";

import { MdAddCircle } from "react-icons/md";
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../global/config';

const BasisPengetahuanAdmin = () => {
    const [show, setShow] = useState(false);
    const [bps, setBps] = useState([]);
    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }
    const handleDelete = _ => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }
    const getBps = async _ => {
        const response = await axios.get(`${config.BASE_URL}/api/basis-pengetahuan/`);
        setBps(response.data)
    }

    useEffect(() => {
        getBps()
    },[])
    return (
        <div className="wrapper">

            <Navbar />
            <MainSide />
            <div className="content-wrapper">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Data Basis Pengetahuan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div classname="mb-3">
                            <label className="form-label">Gejala</label>
                            <div className="">
                                <select
                                    className="form-select"
                                    id="floatingSelect"
                                    aria-label="Floating label select example"
                                >
                                    <option selected="">Open this select menu</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                        </div>
                        <div classname="mb-3">
                            <label className="form-label">Penyakit</label>
                            <div className="">
                                <select
                                    className="form-select"
                                    id="floatingSelect"
                                    aria-label="Floating label select example"
                                >
                                    <option selected="">Open this select menu</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                            </div>
                        </div>
                        <div classname="mb-3">
                            <label className="form-label">Bobot</label>
                            <input type="text" className="form-control" />
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-secondary' onClick={handleClose}>
                            Close
                        </button>
                        <button className='btn btn-primary' onClick={handleClose}>
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>

                <ContentHeader title="Basis Pengetahuan List" />
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                {/* <TableProduct data={products}/> */}
                                <div className="card">
                                    <div className="card-header">
                                        <button onClick={handleShow} className="btn btn-primary">
                                            <MdAddCircle />
                                        </button>
                                    </div>
                                    <div className="card-body">
                                        <Table responsive className='table'>
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Kode Gejala</th>
                                                    <th>Kode Penyakit</th>
                                                    <th>Bobot</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bps && bps.map(bp => {
                                                    return (
                                                        <tr>
                                                            <td>{bp.id}</td>
                                                            <td>{bp.kode_gejala}</td>
                                                            <td>{bp.kode_penyakit}</td>
                                                            <td>{bp.bobot}</td>
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <Link className="btn btn-primary" to={`/admin/basis-pengetahuan/${bp.id}`} ><FaPen /></Link>
                                                                    </div>
                                                                    <div className="col-12 mt-2">
                                                                        <button className="btn btn-danger" onClick={handleDelete}><FaTrash /></button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </Table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasisPengetahuanAdmin;
