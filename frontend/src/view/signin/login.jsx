import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles/loginform.module.css";

const login = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                        const response = await axios.post('http://localhost:3001/auth/login', {
                                username,
                                password,
                        });
                        const token = response.data.token;
                        // Store the token in local storage or a cookie
                        console.log('Logged in', token);
                } catch (error) {
                        console.error('Login error', error);
                }

        }

        return (
                <div className={styles.login_container}>
                        <div className={styles.login_form_container}>
                                <div className={styles.left}>
                                        <form className={styles.form_container}>
                                                <h1>Sign in to Your Account</h1>
                                                <input
                                                        type="email"
                                                        placeholder="Email"
                                                        name="email"
                                                        onChange={handleChange}
                                                        value={data.email}
                                                        required
                                                        className={styles.input}
                                                />
                                                <input
                                                        type="password"
                                                        placeholder="Password"
                                                        name="password"
                                                        onChange={handleChange}
                                                        value={data.password}
                                                        required
                                                        className={styles.input}
                                                />
                                                {error && <div className={styles.error_msg}>{error}</div>}

                                                <Link to="">
                                                        <button
                                                                onClick={handleSubmit}
                                                                type="submit" className={styles.green_btn}>
                                                                Sing In
                                                        </button></Link>
                                        </form>
                                </div>
                                <div className={styles.right}>
                                        <h1>New Here ?</h1>
                                        <Link to="/register">
                                                <button type="button" className={styles.white_btn}>
                                                        Sing Up
                                                </button>
                                        </Link>
                                </div>
                        </div>
                </div>
        );
};

export default login;