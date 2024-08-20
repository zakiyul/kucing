import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import HomePage from './HomePage';
import HomePage from './pages/Homepage';
import Dashboard from './admin/Dashboard';
import PenyakitAdmin from './admin/PenyakitAdmin'
import GejalaAdmin from './admin/GejalaAdmin';
import GejalaEdit from './admin/edit/GejalaEdit';
import BasisPengethauanAdmin from './admin/BasisPengetahuanAdmin';
import HalamanDiagnosa from './pages/HalamanDiagnosa';
import HasilDiagnosa from './pages/HasilDiagnosa';
import PenyakitEdit from './admin/edit/PenyakitEdit';
import BPEdit from './admin/edit/BasisPengetahuanEdit';
import LoginPage from './pages/Login';
import RiwayatAdmin from './admin/RiwayatAdmin';
import ListPenyakit from './pages/data/ListPenyakit';
import ListGejala from './pages/data/ListGejala';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/diagnosa' element={<HalamanDiagnosa/>} />
        <Route path='/hasil' element={<HasilDiagnosa/>} />
        <Route path='admin' element={<Dashboard/>} />
        <Route path='login' element={<LoginPage/>} />
        <Route path='daftar-penyakit' element={<ListPenyakit/>} />
        <Route path='daftar-gejala' element={<ListGejala/>} />

        {/* PENYAKIT */}
        <Route path='admin/penyakit' element={<PenyakitAdmin/>} />
        <Route path='admin/penyakit/:penyakitId' element={ <PenyakitEdit/> } />
        {/* GEJALA */}
        <Route path='admin/gejala' element={<GejalaAdmin/>} />
        <Route path='admin/gejala/:gejalaId' element={<GejalaEdit/>} />
        {/* BASIS PENGETAHUAN */}
        <Route path='admin/basis-pengetahuan' element={<BasisPengethauanAdmin/>} />
        <Route path='admin/basis-pengetahuan/:bpId' element={<BPEdit/>} />
        {/* RIWAYAT  */}
        <Route path='admin/riwayat' element={<RiwayatAdmin/>} />
      </Routes>
    </BrowserRouter>
  )
}