import {Link} from 'react-router-dom';
import Navbar from '../../admin_comp/Navbar';
import MainSide from '../../admin_comp/MainSide';
import ContentHeader from '../../admin_comp/ContentHeader';

export default function BPEdit(){
    return (
        <div className="wrapper">
            <Navbar/>
            <MainSide/>
            <div className="content-wrapper">
                <ContentHeader title={'Edit Basis Pengetahuan'} />
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <Link to={'/admin/basis-pengetahuan'} className='btn btn-info btn-sm'>
                                            Kembali
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="kode-gejala" className="form-label">Kode Gejala</label>
                                                <select
                                                    className="form-select"
                                                    id="kode-gejala"
                                                    aria-label="Floating label select example"
                                                >
                                                    <option selected="">Open this select menu</option>
                                                    <option value={1}>One</option>
                                                    <option value={2}>Two</option>
                                                    <option value={3}>Three</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="kode-penyakit" className="form-label">Kode Penyakit</label>
                                                <select
                                                    className="form-select"
                                                    id="kode-penyakit"
                                                    aria-label="Floating label select example"
                                                >
                                                    <option selected="">Open this select menu</option>
                                                    <option value={1}>One</option>
                                                    <option value={2}>Two</option>
                                                    <option value={3}>Three</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="bobot" className="form-label">Bobot</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <button className="btn btn-success">Edit Data!</button>
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