import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config  from '../../global/config';
export default function ListPenyakit() {
    const [penyakits, setPenyakits] = useState([]);
    const getPenyakit = async _ => {
        const res = await axios.get(`${config.BASE_URL}/api/penyakit`);
        setPenyakits(res.data)
    }

    useEffect(() => {
        getPenyakit()
    },[]) 
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand ms-4">
                        <i className="bi bi-arrow-left" />
                    </Link>
                    {/* <strong className="me-3">Halaman Diagnosa</strong> */}
                </div>
            </nav>

            <div className="container mt-3">
                <h5>Daftar Penyakit Kucing</h5>
                <div className="card px-2 mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Pengertian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {penyakits && penyakits.map((penyakit, index) => {
                                return (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{penyakit.nama}</td>
                                        <td>{penyakit.definisi.slice(0,100)}...</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}