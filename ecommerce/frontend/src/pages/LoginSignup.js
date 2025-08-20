import React, { useState } from 'react';
import './LoginSignup.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields!");
            return;
        }

        const username = email.split('@')[0];

        if (isLogin) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: { name: username, email } });
            alert(`Welcome ${username}! You have successfully logged in.`);
            navigate('/');
        } else {
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            dispatch({ type: 'LOGIN_SUCCESS', payload: { name: username, email } });
            alert(`Account created successfully! Welcome ${username}.`);
            navigate('/');
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {!isLogin && (
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit" className="auth-button">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <p className="toggle-auth">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <span onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: 'blue' }}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </span>
            </p>
        </div>
    );
};

export default LoginSignup;

