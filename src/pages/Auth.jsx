import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, setLogin] = useState(true);
    const { loading, error, isAuthenticated } = useSelector(state => state.auth)

    const handleLogin = async (email, password, role) => {
      dispatch(loginUser({ email, password, role }))
    }
    const handleRegister = async (name, email, password, role, address) => {
      dispatch(registerUser({ name, email, password, role, address }))
      setLogin(true)
    }

    useEffect(() => {
      if (isAuthenticated) {
        navigate('/dashboard')
      }
    }, [isAuthenticated, navigate])

    return (
        <div className='d-flex flex-column h-100 align-items-center justify-content-center'>
          { !loading ? (
              <>
                {
                  login ? <LoginForm handleLogin={handleLogin} /> : <RegisterForm handleRegister={handleRegister} /> 
                }
              <small style={{ cursor: 'pointer' }} className='m-2' onClick={() => setLogin(prev => !prev)}>
                {
                  login ? 'New user? Register' : 'Already Registered? Login'
                }
              </small>
              { error && <small style={{ color: 'red' }}>{ error }</small> }
            </>
          ) : <>Loading...</> }
        </div>
    )
}

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password, role);
  };

  return (
    <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
      <div className="form-group m-2">
        <label htmlFor="email">Email Address</label>
        <input className="form-control" type="email" placeholder="Email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group m-2">
        <label htmlFor="password">Password</label>
        <input className="form-control" type="password" placeholder="Password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>    
      <div className="form-group m-2">
          <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="" disabled>Select Role</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="transporter">Transporter</option>
          </select>
      </div>        
      <div className="btn-group m-2">
        <button type="submit" className="btn btn-primary">Submit</button>  
      </div> 
    </form>
  );
}

const RegisterForm = ({ handleRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [address, setAddress] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleRegister(name, email, password, role, address);
    };
  
    return (
      <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
        <div className="form-group m-2">
          <label htmlFor="name">Full Name</label>
          <input className="form-control" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group m-2">
          <label htmlFor="email">Email Address</label>
          <input className="form-control" type="email" placeholder="Email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group m-2">
          <label htmlFor="password">Password</label>
          <input className="form-control" type="password" placeholder="Password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group m-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input className="form-control" type="password" placeholder="Password" id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div className="form-group m-2">
          <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="" disabled>Select Role</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="transporter">Transporter</option>
          </select>
        </div> 
        <div className="form-group m-2">
          <label htmlFor="address">Address</label>
          <input className="form-control" type="text" placeholder="Address" id='address' value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>          
        <div className="btn-group m-2">
          <button type="submit" className="btn btn-primary">Register</button>  
        </div> 
      </form>
    );
}
export default Auth