import { useState, useEffect } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import { FaTrash, FaPen } from 'react-icons/fa';

import Navbar from "../admin_comp/Navbar";
import MainSide from "../admin_comp/MainSide";
import ContentHeader from "../admin_comp/ContentHeader";
import config from '../global/config';

import { MdAddCircle } from "react-icons/md";
import Swal from 'sweetalert2';
import axios from 'axios';

const RiwayatAdmin = () => {
  const [gejalas, setGejala] = useState([]);
  const [dataGejala, setDataGejala] = useState({});

  const getGejala = async () => {
      const response = await axios.get(`${config.BASE_URL}/api/riwayat`);
      setGejala(response.data)
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
        axios.delete(`${config.BASE_URL}/api/riwayat/${id}`);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        window.location.reload(false);

      }
    });
  }

  useEffect(() => {
    getGejala();
  },[])
  return (
    <div className="wrapper">
      <Navbar />
      <MainSide />
      <div className="content-wrapper">

        <ContentHeader title="Riwayat Diagnosa" />
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                {/* <TableProduct data={products}/> */}
                <div className="card">
                  <div className="card-body">
                    <Table responsive className='table'>
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th>Tgl</th>
                          <th>Hasil</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gejalas && gejalas.map(gejala => {
                          const result = JSON.parse(gejala.result)
                          return (
                            <tr key={gejala.id}>
                              <td> {gejala.nama} </td>
                              <td> {gejala.tgl.slice(0,10)} </td>
                              <td> 
                                <ul>
                                      {result[0].sort((a, b) => b.hasil - a.hasil).slice(0, 3).map(list_result => {
                                          return (
                                              <li>{list_result.penyakit.nama}</li>
                                          )
                                      })}
                                </ul>
                              </td>
                              <td>
                                <div className="row">
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

export default RiwayatAdmin;
