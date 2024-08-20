import { Link } from 'react-router-dom'
import Kucing  from '../assets/cat.jpg';
import { IoMdArrowDropright } from "react-icons/io";


export default function HomePage() {
    return (
        <>
            {/* <Navbar collapseOnSelect expand="md" className="bg-body-tertiary" sticky='bottom'>
                <div className='container px-3'>
                    <Navbar.Brand href="#home">Penyakit Kucing</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar> */}
            <div className='container' style={{ padding:'20px' }}>
                <img src={Kucing} alt="kucing" className='img-fluid mt-3' style={{ borderRadius:'25px' }} />
                <div className="my-3">
                        <div>
                            <p className="lead">Sistem Pakar Kucing</p>
                            <p style={{ fontFamily:'Montserrat', textAlign:'justify' }}>Sistem pakar pada kucing adalah sebuah aplikasi kecerdasan buatan yang dirancang untuk membantu dalam mendiagnosis dan memberikan rekomendasi perawatan untuk kucing. Sistem ini menggunakan basis pengetahuan yang diambil dari dokter hewan, khususnya yang berfokus pada kesehatan kucing</p>
                        </div>
                        <Link to={'/diagnosa'} className='btn btn-success mb-3'>
                            Mulai Diagnosa Penyakit
                        </Link>
                        <div>
                            <p>
                                <strong>Data yang digunakan dalam sistem ini</strong>
                            </p>
                            <ul class="list-group">
                                <Link to={'/login'} class="list-group-item"><IoMdArrowDropright /> Login</Link>
                                <Link to={'/daftar-penyakit'} class="list-group-item"><IoMdArrowDropright /> Daftar Penyakit</Link>
                                <Link to={'/daftar-gejala'} class="list-group-item"><IoMdArrowDropright /> Daftar Gejala</Link>
                            </ul>
                        </div>
                </div>
                {/* <div className="my-3">
                    <h4 style={{ fontWeight: "bold" }}>Sistem Pakar Kucing</h4>
                    <p style={{ textAlign:'justify' }}>
                    Sistem pakar dapat membantu veterinarians atau pemilik kucing dalam mendiagnosis penyakit berdasarkan gejala yang teramati pada kucing. Misalnya, sistem dapat memberikan kemungkinan diagnosa berdasarkan gejala seperti demam, muntah, atau perubahan perilaku.
                    </p>
                </div> */}
                {/* <div className="row">
                    <div className="col-12 mb-3">
                        <Link className="btn btn-primary" to={'/diagnosa'}>Mulai Diagnosa</Link>
                    </div>
                    <div className="col-12 mb-3">
                        <Link className="btn btn-primary" to={'/login'}>Login</Link>
                    </div>
                </div> */}
            </div>
        </>
    )
}