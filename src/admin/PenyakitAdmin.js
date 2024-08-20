import { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash, FaPen } from 'react-icons/fa';

import Navbar from "../admin_comp/Navbar";
import MainSide from "../admin_comp/MainSide";
import ContentHeader from "../admin_comp/ContentHeader";

import { MdAddCircle } from "react-icons/md";
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../global/config'

const PenyakitAdmin = () => {
  const [addPenyakit, setAddPenyakit] = useState({});
  const [penyakits, setPenyakits] = useState([])
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

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
        axios.delete(`${config.BASE_URL}/api/penyakit/${id}`)
          .then(res => {
            console.log(res.data)
            window.location.reload()
          })
          .catch(e => console.log(e))
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
  const handleChange = e => {
    const { name, value } = e.target;
    setAddPenyakit({ ...addPenyakit, [name]: value })
  }
  const handleSubmit = e => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `${config.BASE_URL}/api/penyakit/`,
      headers: {},
      data: addPenyakit
    })
      .then(res => {
        console.log(res.data);
        navigate('/admin/penyakit')
        // handleClose()
        window.location.reload()
      })
      .catch(e => {
        console.log(e)
      })
  }
  const getPenyakits = async _ => {
    const response = await axios.get(`${config.BASE_URL}/api/penyakit`);
    setPenyakits(response.data)
  }

  useEffect(() => {
    getPenyakits();
  }, [])

  return (
    <div className="wrapper">
      <Navbar />
      <MainSide />
      <div className="content-wrapper">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah data penyakit</Modal.Title>
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
                placeholder="Nama penyakit"
                name='nama'
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="pengertian" name='definisi' onChange={handleChange}></textarea>
                <label for="pengertian">Pengertian</label>
              </div>
            </div>
            <div className="mb-3">
              <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="solusi" name='solusi' onChange={handleChange}></textarea>
                <label for="solusi">Solusi</label>
              </div>
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

        <ContentHeader title="Penyakit List" />
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
                          <th>Nama</th>
                          <th>Pengertian</th>
                          <th>Solusi</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {penyakits && penyakits.map(penyakit => {
                          return (
                            <tr>
                              <td>{penyakit.id}</td>
                              <td>{penyakit.nama}</td>
                              <td>{penyakit.definisi.slice(0, 50)}...</td>
                              <td>{penyakit.solusi.slice(0, 50)}...</td>
                              <td>
                                <div className="row">
                                  <div className="col-md-6 col-12">
                                    <Link className="btn btn-primary" to={`/admin/penyakit/${penyakit.id}`} ><FaPen /></Link>
                                  </div>
                                  <div className="col-md-6 col-12 mt-2">
                                    <button className="btn btn-danger" onClick={() => handleDelete(penyakit.id)}><FaTrash /></button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        })}

                      </tbody>
                    </Table>
                    {/* <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Pengertian</th>
              <th>Solusi</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td>1</td>
                  <td>nomor 1</td>
                  <td>pengertian penyakit..</td>
                  <td>solusi penyakit..</td>
                  <td>
                    <Link className="btn btn-primary" to={`edit/1`} ><FaPen/></Link>
                    <button className="btn btn-danger ms-3" onClick={() => console.log('hapus')}><FaTrash/></button>
                  </td>
                </tr>
              
          </tbody>
        </table> */}
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

export default PenyakitAdmin;
