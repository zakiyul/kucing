import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function LoginPage(){
    const navigate = useNavigate()
    const [userData, setUserData] = useState({});
    const handleChange = e => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value})
    }
    const handleSubmit = e => {
        e.preventDefault();
        if(userData.username === 'admin' && userData.password === 'admin'){
            navigate('/admin')
        }else{
            alert('username atau password salah')
        }
    }
    return (
        <div className="container">
            <div className="card mt-5">
                <div className="card-header">
                    <h5 className="text-center">Login Admin</h5>
                </div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" name="username" id="username" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" id="password" className="form-control" onChange={handleChange} />
                        </div>
                        <button onClick={handleSubmit} className="btn btn-warning">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}