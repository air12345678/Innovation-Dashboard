import {  useState } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import logo from '../../Images/logo.jpg'
import classes from './Login.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {
	var history = useHistory();
	const { register, handleSubmit, formState: { errors } } = useForm();
	const {
		register: register2,
		formState: { errors: errors2 }, handleSubmit: handleSubmit2 } = useForm();
	const [isContainerActive, setIsContainerActive] = useState(false);
	const signUpButton = () => {
		setIsContainerActive(true);
		console.log(isContainerActive);
	};
	const signInButton = () => {
		console.log(isContainerActive);
		setIsContainerActive(false);
	};

	// const validatePassword = (value) => {
	// 	if (value.length < 6) {
	// 	  return 'Password should be at-least 6 characters.';
	// 	} else if (
	// 	  !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
	// 	) {
	// 	  return 'Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.';
	// 	}
	// 	return true;
	//   };
	var today = new Date()
	const onSubmit = (data) => {
		const valuesForLogin = {
			email: data.email,
			password: data.password

		}
		console.log(valuesForLogin);
		axios.post('http://localhost:8080/api/login', valuesForLogin)
			.then((result) => {
				if (result.statusText === 'Success') {
					localStorage.setItem('name', JSON.stringify(result.data.resultData[0].name))
					localStorage.setItem('email', JSON.stringify(result.data.resultData[0].email_address))
					history.push('/dashboard');
				}
				else {
					toast.error("Invalid Email/Password", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored"
					})
				}
			})
	};

	const onSignup = (data, e) => {
		e.preventDefault();
		const values = {
			name: data.name,
			signupemail: data.signupemail,
			signuppassword: data.signuppassword,
			created_at: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
		}
		console.log(values);
		axios.post('http://localhost:8080/api/registration', values)
			.then((result) => {
				console.log(result);
				console.log(result.statusText);
				if (result.statusText === 'Success') {
					setIsContainerActive(false);
					alert("You are Successfully Registered")
				}
				else {
					alert("You are aleady registered");
				}
			})
		e.target.reset();

		console.log(errors2);
	}
	return (
		<div className={`${classes.container} ${isContainerActive ? `${classes.rightpanelactive}` : ""}`} id="container">

			<div className={`${classes.formcontainer} ${classes.signupcontainer}`}>

				<form key={2} className={classes.loginForm} onSubmit={handleSubmit2(onSignup)}>
					<h2>Create Account</h2>

					<input
						type="text"
						className={`${errors2.name ? classes.isInvalid : null} `}
						name="name"
						placeholder="Name"
						{...register2("name", {
							required: 'Name is required',
							minLength: {
								value: '4',
								message: 'Name may not be less than 4 characters'
							},
							pattern: {
								value: /^(?!\s)[A-Za-z\s]+$/,
								message: "Name is in Character Format"
							}
						})}
					/>
					{errors2.name && <div style={{ height: "auto", textAlign: "left", color: 'red' }}>⚠ {errors2.name.message}</div>}

					<input
						type="text"
						className={`${errors2.signupemail ? classes.isInvalid : null} `}
						name="signupemail"
						placeholder="Email"
						{...register2("signupemail", {
							required: 'Email is required',
							pattern: {
								value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
								message: 'Email is in Invalid'
							}
						})}
					/>
					{errors2.signupemail && <div style={{ height: "auto", textAlign: "left", color: 'red' }}>⚠ {errors2.signupemail.message}</div>}
					<input
						type="password"
						className={`${errors2.signuppassword ? classes.isInvalid : null} `}
						name="signuppassword"
						placeholder="Password"
						{...register2("signuppassword", {
							required: 'Password is required',
							pattern: {
								value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
								message: 'Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.'
							}
						})}
					/>
					{errors2.signuppassword && <div style={{ height: "auto", textAlign: "left", color: 'red' }}>⚠ {errors2.signuppassword.message}</div>}
					<button type="submit">Sign Up</button>
					<div style={{ height: 'auto' }}>
						<img src={logo} className={classes.imgSignup} alt="nagarroLogo" /></div>
				</form>
			</div>
			{/* Sign In */}
			<div className={`${classes.formcontainer} ${classes.signincontainer}`}>
				<form key={1} className={classes.loginForm} onSubmit={handleSubmit(onSubmit)}>
					<h2>Sign in</h2>
					<input
						className={`${errors.email ? classes.isInvalid : null} `}
						type="text"
						name="email"
						placeholder="Email"
						{...register("email", {
							required: 'Email is required',
							pattern: {
								value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
								message: 'Email is in Invalid'
							},

						})}
					/>

					{errors.email && <div style={{ height: "auto", textAlign: "left", color: 'red' }}>⚠ {errors.email.message}</div>}


					<input
						type="password"
						name="password"
						className={`${errors.password ? classes.isInvalid : null} `}
						placeholder="Password"
						{...register("password", {
							required: 'Password is required',
							pattern: {
								value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
								message: 'Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.'
							}
						})}
					/>

					{errors.password && <div style={{ height: "auto", textAlign: "left", color: "red" }}>⚠ {errors.password.message}</div>}
					<a href="#">Forgot your password?</a>
					<button type="submit">LOGIN</button>
					<div style={{ height: 'auto' }}><img src={logo} className={classes.img} alt="nagarroLogo" /></div>
				</form>

			</div>
			<div className={classes.overlaycontainer}>
				<div className={classes.overlay}>
					<div className={`${classes.overlaypanel} ${classes.overlayleft} `}>
						<h1>Welcome Back!</h1>
						<p>To keep connected with us please login with your personal info</p>
						<button className={classes.ghost} id="signIn" onClick={signInButton}>Sign In</button>
					</div>
					<div className={`${classes.overlaypanel} ${classes.overlayright}`}>
						<h1>Hello, Friend!</h1>
						<p>Enter your personal details and start journey with us</p>
						<button className={classes.ghost} id="signUp" onClick={signUpButton}>Sign Up</button>
					</div>

				</div>
			</div>
			<ToastContainer />
		</div>



	)
}


export default Login