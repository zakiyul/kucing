
// import { Navigate } from 'react-router-dom';
import {useState, useEffect} from 'react'

import Navbar from "../admin_comp/Navbar";
import MainSide from "../admin_comp/MainSide";
import ContentHeader from "../admin_comp/ContentHeader";
import SmallBox from "../admin_comp/SmallBox";
import axios from 'axios';
import CONFIG from '../global/config';

const Dashboard = () => {
  const [penyakit, setPenyakit] = useState([]);
  const [gejala, setGejala] = useState([]);
  const [basisPengetahuan, setBasisPengetahuan] = useState([]);
  const [riwayat, setRiwayat] = useState([]);

  const getData = async () => {
    const penyakit_data = await axios.get(`${CONFIG.BASE_URL}/api/penyakit`)
    setPenyakit(penyakit_data.data)

    const gejala_data = await axios.get(`${CONFIG.BASE_URL}/api/gejala`)
    setGejala(gejala_data.data)

    const bp_data = await axios.get(`${CONFIG.BASE_URL}/api/basis-pengetahuan`)
    setBasisPengetahuan(bp_data.data)

    const riwayat_data = await axios.get(`${CONFIG.BASE_URL}/api/riwayat`)
    setRiwayat(riwayat_data.data)
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <div className="wrapper">
      <Navbar />
      <MainSide />
      <div className="content-wrapper">
        <ContentHeader title="Dashboard" />
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-6">
                  <SmallBox title="Penyakit" number={penyakit && penyakit.length} color="primary" icon="bag" />
              </div>
              <div className="col-6">
                  <SmallBox title="Gejala" number={gejala && gejala.length} color="primary" icon="newspaper-outline" />
              </div>
              <div className="col-6">
                  <SmallBox title="Basis Pengetahuan" number={basisPengetahuan && basisPengetahuan.length} color="primary" icon="newspaper-outline" />
              </div>
              <div className="col-6">
                  <SmallBox title="Riwayat" number={riwayat && riwayat.length} color="primary" icon="newspaper-outline" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
