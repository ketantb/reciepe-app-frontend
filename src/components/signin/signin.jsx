import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./signin.css"

const SignIn = () => {
    const navigate = useNavigate()
    const [signinSuccess, setSignSuccess] = useState("")
    const [signInData, setSignInData] = useState({ email: "", password: "" })
    const [error, setError] = useState({ email: null, password: null, both: null })
    const handleSignInForm = (params) => (e) => {
        setSignInData({ ...signInData, [params]: e.target.value })
        error.email = null
        error.password = null
    }
    const postSignInForm = async (e) => {
        e.preventDefault()
        const signInPostData = {
            email: signInData
                .email
                .split(" ")
                .filter((i) => i != "")
                .join("")
                .toLowerCase(),
            password: signInData
                .password
                .split(" ")
                .filter((i) => i != "")
                .join("")
        }
        await axios.post('https://reciepe-ketan-server1.onrender.com/signin', signInPostData)
            .then((res) => {
                setSignSuccess(true)
            })
            .catch((err) => {
                console.log(err.response.data);
                if (err.response.data == "user doesn't exist, please REGISTER") { setError({ email: true }) }
                else if (err.response.data == "Invalid Password") { setError({ password: "Password Invalid" }) }
            });
        // console.log(signInData)
    }
    useEffect(() => {
        if (signinSuccess) {
            navigate('/homepage')
        }
    }, [signinSuccess])
    return (
        <>
            <section id="signin-container">
                <div id="signin-body">
                    <h1>Sign In</h1>
                    <form id="signin-form">
                        <div id="email-block">
                            <label htmlFor="userEmail">Email Address</label>
                            <div>
                                <input id="userEmail" className="signin-inputs" type="text" placeholder="Enter email" onChange={handleSignInForm("email")} />
                            </div>
                        </div>
                        <div id="password-block">
                            <label htmlFor="password">Password</label>
                            <div>
                                <input id="password" className="signin-inputs" type="text" placeholder="Enter password" onChange={handleSignInForm("password")} />
                            </div>
                            <p id="sign-pass-error">{error.password}</p>
                        </div>
                        <div id="remember-me-block">
                            <input id="remember-me" type="checkbox" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <div id="submit-block">
                            <button id="signin-submit-btn" onClick={postSignInForm}>Submit</button>
                        </div>

                    </form>
                    <p id="forgot-pass">Forgot <span>password?</span></p>
                    {error.email ? <p id="signin-not-found-error">user doesn't exist, please <Link to="/register">REGISTER</Link></p> : null}
                </div>
            </section>
        </>
    )
}

export default SignIn;