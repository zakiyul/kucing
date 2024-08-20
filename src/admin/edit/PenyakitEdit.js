import { Link, useNavigate, useParams } from "react-router-dom";
import ContentHeader from "../../admin_comp/ContentHeader";
import MainSide from "../../admin_comp/MainSide";
import Navbar from "../../admin_comp/Navbar";

import {useEffect, useState} from 'react';
import axios from 'axios';
import CONFIG from '../../global/config';

export default function PenyakitEdit(){
    const {penyakitId} = useParams();
    const navigate = useNavigate();
    const [penyakit, setPenyakit] = useState({});

    const getPenyakit = async _ => {
        const res = await axios.get(`${CONFIG.BASE_URL}/api/penyakit/${penyakitId}`);
        setPenyakit(res.data)
    }
    const handleChange = e => {
        const {name, value} = e.target;
        setPenyakit({...penyakit, [name]: value});
    }
    const handleSubmit = e => {
        e.preventDefault();
        axios.patch(`${CONFIG.BASE_URL}/api/penyakit/${penyakitId}`, penyakit)
         .then(res => {
            console.log(res.data);
            navigate('/admin/penyakit')
         })
         .catch(e => console.log(e))
    }

    useEffect(() => {
        getPenyakit()
    },[])
    return (
        <div className="wrapper">
            <Navbar/>
            <MainSide/>
            <div className="content-wrapper">
                <ContentHeader title={'Edit Penyakit'}/>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <Link to={'/admin/penyakit'} className="btn btn-info btn-sm">Kembali</Link>
                                    </div>
                                    <div className="card-body">
                                        <form >
                                            <div className="mb-3">
                                                <label htmlFor="nama" className="form-label">Nama Penyakit</label>
                                                <input type="text" name="nama" id="nama" className="form-control" value={penyakit.nama} onChange={handleChange} />
                                            </div>
                                            <div className="mb-3 form-floating">
                                                <textarea name="definisi" id="definisi" className="form-control" value={penyakit.definisi} onChange={handleChange} style={{ height:'100px' }}></textarea>
                                                <label htmlFor="definisi">Definisi</label>
                                            </div>
                                            <div className="mb-3 form-floating">
                                                <textarea name="solusi" id="solusi" className="form-control" value={penyakit.solusi} onChange={handleChange} style={{ height:'100px' }}></textarea>
                                                <label htmlFor="solusi">Solusi</label>
                                            </div>
                                            <button onClick={handleSubmit} className="btn btn-success">Edit Data!</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}