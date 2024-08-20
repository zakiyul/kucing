
import { FaNewspaper, FaBorderAll } from 'react-icons/fa';
import {FaUserDoctor} from 'react-icons/fa6';
import {MdOutlineScience} from 'react-icons/md';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
import Logo from '../logo.png';

const MainSide = () => {
    // const { user } = useContext(AuthContext);
    const user = {username: 'admin'}
    return ( 
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to={'/'} className="brand-link" style={{ textDecoration: 'none' }}>
            <img src='https://pbs.twimg.com/profile_images/1405160563072638978/j5QQXXn__400x400.jpg' alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
            <span className="brand-text font-weight-light" >Kucing</span>
        </Link>
        <div className="sidebar">
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-header">Master</li>
                <li className="nav-item">
                    <Link to="/admin" className='nav-link'>
                        <FaBorderAll className='nav-icon' />
                        <p>
                            Dashboard
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/penyakit" className="nav-link">
                        <FaUserDoctor className='nav-icon' />
                        <p>
                            Penyakit
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/gejala" className="nav-link">
                        <FaNewspaper className='nav-icon'/>
                        <p>
                            Gejala
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/basis-pengetahuan" className="nav-link">
                        <MdOutlineScience className='nav-icon'/>
                        <p>
                            Basis Pengetahuan
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/riwayat" className="nav-link">
                        <MdOutlineScience className='nav-icon'/>
                        <p>
                            Riwayat
                        </p>
                    </Link>
                </li>
            </ul>
        </nav>
        </div>
    </aside>
     );
}
 
export default MainSide;