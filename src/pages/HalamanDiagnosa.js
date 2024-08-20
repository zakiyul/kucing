import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from '../global/config';
import { useEffect, useState, useContext } from "react";
import { CiMedicalClipboard } from "react-icons/ci";
import {HasilContext} from '../context/HasilTerbaruContext';
import { Modal } from "react-bootstrap";


function hitungCf(gejalas) {
    if(gejalas.length > 1){
        const a = gejalas[0].pakar * gejalas[0].user;
        const b = gejalas[1].pakar * gejalas[1].user;

        const cf_combine = a + (b * (1 - a));
        let cf_old = cf_combine;
        for (let i = 2; i < gejalas.length; i++) {
            const kali_user = gejalas[i].pakar * gejalas[i].user;
            const cf_combine2 = cf_old + (kali_user * (1 - cf_old));
            cf_old = cf_combine2
        }

        return cf_old;
    } else if(gejalas.length === 1) {
        const hasil = gejalas[0].pakar *gejalas[0].user;
        return hasil;
    } else {
        return 0;
    }
}
function rumusCf(penyakits, basisPengetahuan, kasusBaru) {
    const resultCF = [];
    for (let i = 0; i < penyakits.length; i++) {
        const current_penyakit = [];
        const hitung_gejala = []
        const gejala_counted = []

        for (let j = 0; j < basisPengetahuan.length; j++) {
            if (penyakits[i].id === basisPengetahuan[j].id_penyakit) {
                current_penyakit.push(basisPengetahuan[j]);
            }
            
        }
        const sisa_bp = basisPengetahuan.length - current_penyakit.length;
        for (let s = 0; s < sisa_bp; s++) {
            current_penyakit.push({ id_gejala: 0, id_penyakit: penyakits[i].id, bobot: 0 })
        }
        
        for (let cp = 0; cp < current_penyakit.length; cp++) {
            for (let gfu = 0; gfu < kasusBaru.length; gfu++) {
                // console.log(typeof(current_penyakit[cp].id_gejala))
                // console.log(typeof(kasusBaru[gfu].id_gejala))
                if (current_penyakit[cp].id_gejala == kasusBaru[gfu].id_gejala) {
                    // console.log({...current_penyakit[cp],user:Number(kasusBaru[gfu].nilai)})
                    // gejala_counted.push(current_penyakit[cp])
                    gejala_counted.push({...current_penyakit[cp],user:Number(kasusBaru[gfu].nilai)})
                }
            }
        }

        for (let gc = 0; gc < gejala_counted.length; gc++) {
            hitung_gejala.push({ pakar: gejala_counted[gc].bobot, user: gejala_counted[gc].user });
        }
        // hitung_gejala.push(0)
        // console.log({penyakit: penyakits[i], hasil: Math.round(hitungCf(hitung_gejala)*100)})
        resultCF.push({ penyakit: penyakits[i], hasil: Math.round(hitungCf(hitung_gejala) * 100) })
    }
    return resultCF;
}
export default function HalamanDiagnosa() {
    const [gejalas, setGejalas] = useState();
    const [penyakits, setPenyakit] = useState([]);
    const [basisPengetahuan, setBp] = useState([]);
    const [dsRules, setDsRules] = useState([]);
    const [kasusBaru, setKasusBaru] = useState([]);
    const [nama, setNama] = useState('');

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const {hapusHasilTerbaru} = useContext(HasilContext)
    const navigate = useNavigate();
    const handleNama = e => {
        setNama(e.target.value);
    }
    const getGejalas = async _ => {
        const res = await axios.get(`${config.BASE_URL}/api/gejala`);
        setGejalas(res.data)
    }
    const getPenyakit = async _ => {
        const res = await axios.get(`${config.BASE_URL}/api/penyakit`);
        setPenyakit(res.data)
    }
    const getBp = async _ => {
        const res = await axios.get(`${config.BASE_URL}/api/basis-pengetahuan`);
        setBp(res.data)
    }
    const getDsRules = async _ => {
        const res = await axios.get(`${config.BASE_URL}/api/ds-rules`);
        setDsRules(res.data)
    }
    const handleChange = e => {
        const {name,value} = e.target;
        setKasusBaru([...kasusBaru, {id_gejala:name,nilai:value}])
    }
    const handleSubmit = e => {
        e.preventDefault();
        hapusHasilTerbaru();
        localStorage.removeItem('cf');
        localStorage.removeItem('ds');

        console.log(kasusBaru)

        for (let g = 0; g < gejalas.length; g++) {
            gejalas[g]['code'] = `G${gejalas[g]["id"]}`;
        }
        for (let p = 0; p < penyakits.length; p++) {
            penyakits[p]['code'] = `P${penyakits[p]["id"]}`;
        }
        const getIdGejala = kasusBaru.map(i => Number(i.id_gejala));

        function joinAndGroupConcat(basisPengetahuan, penyakit, gejala) {
            // Filter basisPengetahuan by gejala
            const filteredRules = basisPengetahuan.filter(rule => gejala.includes(rule.id_gejala));
        
            // Perform the join operation
            const joinedData = [];
            filteredRules.forEach(rule => {
                const problem = penyakit.find(problem => problem.id === rule.id_penyakit) || null;
                joinedData.push({
                    id_gejala: rule.id_gejala,
                    code: problem ? problem.code : null,
                    bobot: rule.bobot
                });
            });
        
            // Group by id_gejala and concatenate codes
            const groupedData = {};
            joinedData.forEach(item => {
                if (!groupedData[item.id_gejala]) {
                    groupedData[item.id_gejala] = { codes: [], bobot: item.bobot };
                }
                groupedData[item.id_gejala].codes.push(item.code);
            });
        
            // Format the result
            const result = Object.keys(groupedData).map(key => ({
                id_gejala: key,
                id_penyakit: groupedData[key].codes.join(','),
                bobot: groupedData[key].bobot
            }));
            return result;
        }
        // const groupedData = dsRules.reduce((acc,obj) => {
        //     const key = obj.id_penyakit;
        //     if(!acc[key]){
        //         acc[key] = [];
        //     }
        //     acc[key].push(obj);
        //     return acc;
        // },{});
        const hasilCf = rumusCf(penyakits, basisPengetahuan, kasusBaru);
        console.log(hasilCf)
        const hasilDs = [];
        const result = joinAndGroupConcat(dsRules, penyakits, getIdGejala);
        const evidence = []
        for (let i = 0; i < result.length; i++) {
            let row = result[i];
            evidence.push([row.id_penyakit, row.bobot]);
        }

        const codePenyakit = penyakits.map(i => i.code);
        const fod = codePenyakit.join(',');

        // let urutan = 1;
        let densitas_baru = [];

        while (evidence.length > 0) {
            if (result.length < 2) {
                break;
            }
            let densitas1 = [evidence.shift()];

            densitas1.push([fod, 1 - densitas1[0][1]]);
            let densitas2 = [];
            if (Object.keys(densitas_baru).length === 0) {
                densitas2.push(evidence.shift());
            } else {
                for (let [k, r] of Object.entries(densitas_baru)) {
                    if (k !== "&theta;") {
                        densitas2.push([k, r]);
                    }
                }
            }

            let theta = 1;
            for (let d of densitas2) {
                theta -= d[1];
            }
            densitas2.push([fod, theta]);
            let m = densitas2.length;
            densitas_baru = {};
            for (let y = 0; y < m; y++) {
                for (let x = 0; x < 2; x++) {
                    if (!(y === m - 1 && x === 1)) {
                        let v = densitas1[x][0].split(',');
                        let w = densitas2[y][0].split(',');
                        v.sort();
                        w.sort();
                        let vw = new Set(v.filter(value => w.includes(value)));
                        let k = vw.size === 0 ? "&theta;" : Array.from(vw).join(',');
                        if (!(k in densitas_baru)) {
                            densitas_baru[k] = densitas1[x][1] * densitas2[y][1];
                        } else {
                            densitas_baru[k] += densitas1[x][1] * densitas2[y][1];
                        }
                    }
                }
            }

            for (let [k, d] of Object.entries(densitas_baru)) {
                if (k !== "&theta;") {
                    densitas_baru[k] = d / (1 - (densitas_baru["&theta;"] || 0));
                }
            }
            // console.log("Proses " + urutan + " ");
            console.log(penyakits.filter(p => Object.keys(densitas_baru).includes(p.code)))
            // console.log(Object.keys(densitas_baru))
            // urutan += 1;
            hasilDs.push({ hasil: densitas_baru, penyakit: penyakits.filter(p => Object.keys(densitas_baru).includes(p.code))})
        }
        // Object.keys(groupedData).map(p => {
            // const result = joinAndGroupConcat(groupedData[p],penyakits,getIdGejala);
            // const evidence = []
            // for (let i = 0; i < result.length; i++) {
            //     let row = result[i];
            //     evidence.push([row.id_penyakit, row.bobot]);
            // }

            // const codePenyakit = penyakits.map(i => i.code);
            // const fod = codePenyakit.join(',');

            // let urutan = 1;
            // let densitas_baru = [];

            // while (evidence.length > 0) {
            //     if(result.length < 2){
            //         break;
            //     }
            //     let densitas1 = [evidence.shift()];

            //     densitas1.push([fod, 1 - densitas1[0][1]]);
            //     let densitas2 = [];
            //     if (Object.keys(densitas_baru).length === 0) {
            //         densitas2.push(evidence.shift());
            //     } else {
            //         for (let [k, r] of Object.entries(densitas_baru)) {
            //             if (k !== "&theta;") {
            //                 densitas2.push([k, r]);
            //             }
            //         }
            //     }

            //     let theta = 1;
            //     for (let d of densitas2) {
            //         theta -= d[1];
            //     }
            //     densitas2.push([fod, theta]);
            //     let m = densitas2.length;
            //     densitas_baru = {};
            //     for (let y = 0; y < m; y++) {
            //         for (let x = 0; x < 2; x++) {
            //             if (!(y === m - 1 && x === 1)) {
            //                 let v = densitas1[x][0].split(',');
            //                 let w = densitas2[y][0].split(',');
            //                 v.sort();
            //                 w.sort();
            //                 let vw = new Set(v.filter(value => w.includes(value)));
            //                 let k = vw.size === 0 ? "&theta;" : Array.from(vw).join(',');
            //                 if (!(k in densitas_baru)) {
            //                     densitas_baru[k] = densitas1[x][1] * densitas2[y][1];
            //                 } else {
            //                     densitas_baru[k] += densitas1[x][1] * densitas2[y][1];
            //                 }
            //             }
            //         }
            //     }

            //     for (let [k, d] of Object.entries(densitas_baru)) {
            //         if (k !== "&theta;") {
            //             densitas_baru[k] = d / (1 - (densitas_baru["&theta;"] || 0));
            //         }
            //     }
            //     // console.log("Proses " + urutan + " ");
            //     urutan += 1;
            //     hasilDs.push({hasil:densitas_baru,penyakit: penyakits.filter(p => p.code == Object.keys(densitas_baru))})
            // }
        // })
        
        localStorage.setItem('cf', JSON.stringify(hasilCf));
        localStorage.setItem('ds', JSON.stringify(hasilDs));
        var date = new Date()
        const postData = {
            nama: nama,
            tgl: date.toISOString(),
            result: `[${JSON.stringify(hasilCf)}, ${JSON.stringify(hasilDs)}]`
        }
        axios.post(`${config.BASE_URL}/api/riwayat`, postData)
         .then(res => console.log(res))
         .catch(e => console.log(e))

        navigate('/hasil')
    }

    useEffect(() => {
        getGejalas();
        getPenyakit();
        getBp();
        getDsRules();
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
            {/* <Navbar/> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Form User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Nama</label>
                        <input onChange={handleNama} type="text" class="form-control" id="exampleFormControlInput1" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleClose}>Mulai Diagnosa</button>
                </Modal.Footer>
            </Modal>

            <div className="container mt-3">
                <h5>Silahkan pilih gejala</h5>
                <div className="card px-2 mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Gejala</th>
                                <th>Keyakinan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gejalas && gejalas.map((i,idx) => {
                                return (
                                    <tr>
                                        {/* <td>
                                            <input type="checkbox" className="form-check-input ms-3" value={i.id} onChange={handleChange} />
                                        </td> */}
                                        <td>
                                            {idx+1}
                                        </td>
                                        <td>
                                            <label htmlFor="gejala" className="form-check-label">
                                                {i.nama}
                                            </label>
                                        </td>
                                        <td>
                                            <select id={i.id} className="form-select" onChange={handleChange} name={i.id}>
                                                    <option>Pilih</option>
                                                    <option value={'0.2'}>Tidak Yakin</option>
                                                    <option value={'0.4'}>Mungkin</option>
                                                    <option value={'0.6'}>Kemungkinan Besar</option>
                                                    <option value={'0.8'}>Hampir Pasti</option>
                                                    <option value={'1.0'}>Pasti</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button className="fab" onClick={handleSubmit}>
                        <CiMedicalClipboard />
                    </button>
                    {/* <button onClick={handleSubmit} className="btn btn-success">
                        Diagnosa
                    </button> */}
                    {/* <Link to={'/hasil'} className="btn btn-success">
                        Diagnosa
                    </Link> */}
                </div>
            </div>

        </>
    )
}