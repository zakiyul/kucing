import {Link, useNavigate} from 'react-router-dom';
import Navbar from "../../admin_comp/Navbar";
import MainSide from "../../admin_comp/MainSide";
import ContentHeader from "../../admin_comp/ContentHeader";

import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CONFIG from '../../global/config';

const GejalaEdit = () => {
    const {gejalaId} = useParams();
    const navigate = useNavigate()
    const [gejala, setGejala] = useState({});
    
    const getGejala = async _ => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/gejala/${gejalaId}`);
        setGejala(res.data)
    }
    const handleChange = e => {
        setGejala({nama: e.target.value})
    }
    const handleSubmit = e => {
        e.preventDefault()
        axios.patch(`${CONFIG.BASE_URL}/api/gejala/${gejalaId}`, gejala)
         .then(res => {
            console.log(res.data)
            navigate('/admin/gejala')
         })
         .catch(e => console.log(e))
    }

    useEffect(() => {
        getGejala()
    },[])

    return (
        <div className="wrapper">
            <Navbar />
            <MainSide />
            <div className="content-wrapper">

                <ContentHeader title="Edit Gejala" />
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                {/* <TableProduct data={products}/> */}
                                <div className="card">
                                    <div className="card-header">
                                        <Link to={'/admin/gejala'} className="btn btn-info btn-sm">Kembali</Link>
                                    </div>
                                    <div className="card-body">
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
                                                value={gejala.nama}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button onClick={handleSubmit} className='btn btn-success' >Edit Data!</button>
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

export default GejalaEdit;
