import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import config  from '../global/config';

export default function HasilDiagnosa() {
    const [hasilCf, setHasilCf] = React.useState([]);
    const [hasilCbr, setHasilCbr] = React.useState([]);
    const [maxValue, setMaxValue] = useState();
    const [cf, setCf] = useState(true);
    const [penyakits, setPenyakits] = useState([]);
    setCf()
    console.log(penyakits)
    const getPenyakit = async () => {
        const res = await axios.get(`${config.BASE_URL}/api/penyakit`);
        setPenyakits(res.data)
    }
    // const setCfButton = _ => {
    //     setCf(true)
    // };
    // const setDsButton = _ => {
    //     setCf(false)
    // }
    const getResult = () => {
        setHasilCf(JSON.parse(localStorage.getItem('cf')));
        setHasilCbr(JSON.parse(localStorage.getItem('ds')));
        console.log(hasilCbr)

        hasilCbr && hasilCbr.forEach(obj => {
            const key = Object.keys(obj)[0];
            const value = obj[key];

            if (value > maxValue) {
                // maxValue = value;
                setMaxValue(value)
            }
            console.log(maxValue)
        });
    }
    useEffect(() => {
        getResult();
        getPenyakit();
    }, [])
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
                {/* <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <button onClick={setCfButton} className="nav-link active">CF</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={setDsButton} className="nav-link">DS</button>
                    </li>
                </ul> */}
                {cf ? <div className="card">
                    <div className="card-header">
                        <h6>Hasil Dempster shafer</h6>
                    </div>
                    {hasilCf && hasilCf.sort((a, b) => b.hasil - a.hasil).map(i => {
                        if (i.hasil !== 0) {
                            return (
                                <>
                                    <div className="card-body">
                                        <table className="table mb-3">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nama Penyakit</th>
                                                    <td>{i.penyakit.nama}</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Persentasi Hasil Cf</th>
                                                    <td>{i.hasil}%</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Persentasi Hasil Ds</th>
                                                    <td>{Object.values(hasilCbr[hasilCbr.length-1].hasil)[0] * 100}%</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Metode</th>
                                                    <td>Certainty Factor</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <strong className="">Pengenalan Penyakit:</strong>
                                        <p style={{ textAlign:'justify' }}>{i.penyakit.definisi}</p>
                                        <br />
                                        <strong>Solusi:</strong>
                                        <p style={{ textAlign:'justify' }}>{i.penyakit.solusi}</p>
                                        <hr/>
                                    </div>

                                </>
                            )
                        }
                    })}
                </div>
                    :
                    <div className="card">
                        {hasilCbr && <>
                            <div className="card-header">
                                        <h6>Hasil Demster Shafer</h6>
                                    </div>
                                    <div className="card-body">
                                        <table className="table mb-3">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nama Penyakit</th>
                                                    {/* <td>{hasilCbr[hasilCbr.length-1].penyakit.map(p =><strong>{p.nama}</strong>)}</td> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Persentasi Hasil</th>
                                                    {/* <td>{typeof(Object.values(hasilCbr[hasilCbr.length-1].hasil))}%</td> */}
                                                </tr>
                                                <tr>
                                                    <th scope="row">Metode</th>
                                                    <td>Dempster Shafer</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <strong className="">Pengenalan Penyakit:</strong>
                                        {/* <p style={{ textAlign:'justify' }}>{hasilCbr[1].penyakit[0].definisi}</p> */}
                                        <br />
                                        <strong>Solusi:</strong>
                                        {/* <p style={{ textAlign:'justify' }}>{hasilCbr[1].penyakit[0].solusi}</p> */}
                                        <hr/>
                                    </div>
                        </>}
                        
                        
                    </div>
                }
            </div>
        </>
    )
}