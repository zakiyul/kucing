import { useState, useEffect } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaPen } from 'react-icons/fa';

import Navbar from "../admin_comp/Navbar";
import MainSide from "../admin_comp/MainSide";
import ContentHeader from "../admin_comp/ContentHeader";
import config from '../global/config';

import { MdAddCircle } from "react-icons/md";
import Swal from 'sweetalert2';
import axios from 'axios';

const GejalaAdmin = () => {
  const [show, setShow] = useState(false);
  const [gejalas, setGejala] = useState([]);
  const [dataGejala, setDataGejala] = useState({});

  const handleChange = e => {
    const {value, name} = e.target;
    setDataGejala({...dataGejala, [name]: value});
  }
  const getGejala = async () => {
      const response = await axios.get(`${config.BASE_URL}/api/gejala`);
      console.log(response.data)
      setGejala(response.data)
  }
  const handleShow = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleDelete = id => {
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
        axios.delete(`${config.BASE_URL}/api/gejala/${id}`);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        window.location.reload(false);

      }
    });
  }
  const handleSubmit = e => {
    e.preventDefault();
    axios({
      method:'POST',
      url: `${config.BASE_URL}/api/gejala`,
      headers: {},
      data: dataGejala
    })
     .then(res => {
      console.log(res)
      setGejala(prevState => {
        return [res.data, ...prevState]
      });
      handleClose();
      window.location.reload(false);
     })
     .catch(e => {
      console.log(e)
     })
  }

  useEffect(() => {
    getGejala();
  },[])
  return (
    <div className="wrapper">
      <Navbar />
      <MainSide />
      <div className="content-wrapper">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah data gejala</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">
                Nama
              </label>
              <input
                type="text"
                className="form-control"
                id="nama"
                placeholder="Nama Gejala"
                name='nama'
                onChange={handleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-secondary' onClick={handleClose}>
              Close
            </button>
            <button className='btn btn-primary' onClick={handleSubmit}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>

        <ContentHeader title="Gejala List" />
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
                          <th>Nama Gejala</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gejalas && gejalas.map(gejala => {
                          return (
                            <tr key={gejala.id}>
                              <td> {gejala.id} </td>
                              <td> {gejala.nama} </td>
                              <td>
                                <div className="row">
                                  <div className="col-12">
                                    <Link className="btn btn-primary" to={`/admin/gejala/${gejala.id}`} ><FaPen /></Link>
                                  </div>
                                  <div className="col-12 mt-2">
                                    <button className="btn btn-danger" onClick={() => handleDelete(gejala.id)}><FaTrash /></button>
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

export default GejalaAdmin;
