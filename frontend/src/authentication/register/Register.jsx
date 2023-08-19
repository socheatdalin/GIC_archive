import { useState } from "react";
import axios from "axios";
import {Link , useNavigate } from "react-router-dom";
import styles from "./styles/registerform.module.css";

const Register = () => {
	let navigate = useNavigate();
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [last_name, setLastName] = useState('');
	const [first_name, setFirstname] = useState('');
    const [gender, setgender] = useState('');
    const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	const [enrollment_year, setyear] = useState('');	

	const handleSubmit = async (e) => {
		e.preventDefault();
		 axios.post("http://localhost:3001/signup/student", {first_name, last_name,gender,address,email,phone,password,enrollment_year})
                .then(response => {
                        console.log(response.data.message);
                        console.log("login successfully");
                })
                navigate("/login");

	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container}  method="post"  onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="firstname"
							placeholder="First Name"
							name="first_name"
							onChange={e => setFirstname(e.target.value)}
							value={first_name}
							required
							className={styles.input}
						/>
						<input
							type="lastname"
							placeholder="Last name"
							name="last_name"
							onChange={e => setLastName(e.target.value)}
							value={last_name}
							required
							className={styles.input}
						/>
						<input
							type="gender"
							placeholder="Gender"
							name="gender"
							onChange={e => setgender(e.target.value)}
							value={gender}
							required
							className={styles.input}
						/>
						<input
							type="address"
							placeholder="Address"
							name="address"
							onChange={e => setAddress(e.target.value)}
							value={address}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={e => setEmail(e.target.value)}
							value={email}
							required
							className={styles.input}
						/>
						<input
							type="phoneNumber"
							placeholder="Phone number"
							name="phone"
							onChange={e => setPhone(e.target.value)}
							value={phone}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={e => setPassword(e.target.value)}
							value={password}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Enrollment year"
							name="year"
							onChange={e => setyear(e.target.value)}
							value={enrollment_year}
							required
							className={styles.input}
						/>
						{/* {error && <div className={styles.error_msg}>{error}</div>} */}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;