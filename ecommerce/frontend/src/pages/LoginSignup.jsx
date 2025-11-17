import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { showSuccessToast, showErrorToast } from '../utils/toast';
import './LoginSignup.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Validation states
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Email validation
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setEmailError('');
            setEmailValid(false);
        } else if (!emailRegex.test(value)) {
            setEmailError('Please enter a valid email address');
            setEmailValid(false);
        } else {
            setEmailError('');
            setEmailValid(true);
        }
    };

    // Password validation
    const validatePassword = (value) => {
        if (!value) {
            setPasswordError('');
            setPasswordValid(false);
        } else if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            setPasswordValid(false);
        } else {
            setPasswordError('');
            setPasswordValid(true);
        }
    };

    // Confirm password validation
    const validateConfirmPassword = (value) => {
        if (!value) {
            setConfirmPasswordError('');
            setConfirmPasswordValid(false);
        } else if (value !== password) {
            setConfirmPasswordError('Passwords do not match');
            setConfirmPasswordValid(false);
        } else {
            setConfirmPasswordError('');
            setConfirmPasswordValid(true);
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
        if (confirmPassword) {
            validateConfirmPassword(confirmPassword);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        validateConfirmPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            showErrorToast("Please fill all fields!");
            return;
        }

        if (!emailValid || !passwordValid) {
            showErrorToast("Please fix the errors before submitting!");
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
            if (!confirmPasswordValid) {
                showErrorToast("Please fix the errors before submitting!");
                return;
            }
            dispatch({ type: 'LOGIN_SUCCESS', payload: { name: username, email } });
            showSuccessToast(`Account created successfully! Welcome ${username}! 🎉`);
            navigate('/');
        }
    };

    const handleToggle = () => {
        setIsLogin(!isLogin);
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setEmailValid(false);
        setPasswordValid(false);
        setConfirmPasswordValid(false);
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
                        <div className="input-wrapper">
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email"
                                className={emailError ? 'input-error' : emailValid ? 'input-valid' : ''}
                            />
                            {email && (
                                <span className="validation-icon">
                                    {emailValid ? (
                                        <FaCheckCircle className="icon-valid" />
                                    ) : (
                                        <FaTimesCircle className="icon-error" />
                                    )}
                                </span>
                            )}
                        </div>
                        {emailError && <span className="error-message">{emailError}</span>}
                    </motion.div>
                    
                    <motion.div 
                        className="form-group"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <label><FaLock /> Password</label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Enter your password"
                                className={passwordError ? 'input-error' : passwordValid ? 'input-valid' : ''}
                            />
                            {password && (
                                <span className="validation-icon">
                                    {passwordValid ? (
                                        <FaCheckCircle className="icon-valid" />
                                    ) : (
                                        <FaTimesCircle className="icon-error" />
                                    )}
                                </span>
                            )}
                        </div>
                        {passwordError && <span className="error-message">{passwordError}</span>}
                        {password && passwordValid && (
                            <span className="success-message">Strong password! ✓</span>
                        )}
                    </motion.div>
                    
                    {!isLogin && (
                        <motion.div 
                            className="form-group"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <label><FaLock /> Confirm Password</label>
                            <div className="input-wrapper">
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="Confirm your password"
                                    className={confirmPasswordError ? 'input-error' : confirmPasswordValid ? 'input-valid' : ''}
                                />
                                {confirmPassword && (
                                    <span className="validation-icon">
                                        {confirmPasswordValid ? (
                                            <FaCheckCircle className="icon-valid" />
                                        ) : (
                                            <FaTimesCircle className="icon-error" />
                                        )}
                                    </span>
                                )}
                            </div>
                            {confirmPasswordError && <span className="error-message">{confirmPasswordError}</span>}
                            {confirmPassword && confirmPasswordValid && (
                                <span className="success-message">Passwords match! ✓</span>
                            )}
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
                        onClick={handleToggle}
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

