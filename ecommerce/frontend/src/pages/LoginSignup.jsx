import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { showSuccessToast, showErrorToast } from '../utils/toast';
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
            showErrorToast("Please fill all fields!");
            return;
        }

        const username = email.split('@')[0];

        if (isLogin) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: { name: username, email } });
            showSuccessToast(`Welcome back, ${username}! 👋`);
            navigate('/');
        } else {
            if (password !== confirmPassword) {
                showErrorToast("Passwords do not match!");
                return;
            }
            dispatch({ type: 'LOGIN_SUCCESS', payload: { name: username, email } });
            showSuccessToast(`Account created successfully! Welcome ${username}! 🎉`);
            navigate('/');
        }
    };

    return (
        <motion.div 
            className="auth-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="auth-container"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="auth-icon">
                    <FaUser />
                </div>
                <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
                <p className="auth-subtitle">
                    {isLogin ? 'Login to continue shopping' : 'Sign up to get started'}
                </p>
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <motion.div 
                        className="form-group"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <label><FaEnvelope /> Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </motion.div>
                    
                    <motion.div 
                        className="form-group"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <label><FaLock /> Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </motion.div>
                    
                    {!isLogin && (
                        <motion.div 
                            className="form-group"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <label><FaLock /> Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                            />
                        </motion.div>
                    )}
                    
                    <motion.button 
                        type="submit" 
                        className="auth-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </motion.button>
                </form>
                
                <p className="toggle-auth">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <motion.span 
                        onClick={() => setIsLogin(!isLogin)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </motion.span>
                </p>
            </motion.div>
        </motion.div>
    );
};

export default LoginSignup;

