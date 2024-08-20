import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config  from '../../global/config';
export default function ListGejala() {
    const [gejalas, setGejala] = useState([]);
    const getGejala = async _ => {
        const res = await axios.get(`${config.BASE_URL}/api/gejala`);
        setGejala(res.data)
    }

    useEffect(() => {
        getGejala()
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
                <h5>Daftar Gejala Kucing</h5>
                <div className="card px-2 mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gejalas && gejalas.map((gejala, index) => {
                                return (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{gejala.nama}</td>
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