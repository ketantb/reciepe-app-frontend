import { useEffect, useState } from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios'
import "./register.css"

const Register = () => {
    const navigate = useNavigate()
    const [regFormData, setRegFormData] = useState({name: "", email: "", password: "", repeatPassword: "", termsNconditions: false})
    const [registerSuccessFull, setRegisterSuccessFull] = useState("")
    const handleRegisterForm = (params) => (e) => {
        setRegFormData({...regFormData, [params]: e.target.value})
        setErr({allfields: "", email: "", password: "", TnC: ""})
    }
    let confirmPassInput = true;
    if(!regFormData.password){confirmPassInput = true}
    else{confirmPassInput = false}
    let confirmPassErr = false
    const handleConfirmPassErr = () => {
        if(regFormData.repeatPassword && regFormData.repeatPassword != regFormData.password){
            confirmPassErr = true
        }
    }
    const [err, setErr] = useState({allfields: "", email: "", password: "", TnC: ""})
    const postRegisterForm = async (e) => {
        e.preventDefault(e)
        await axios.post('https://reciepe-ketan-server1.onrender.com/register', regFormData)
        .then((res) => {
            console.log(res)
            setRegisterSuccessFull(true)
        })
        .catch((err) => {
            if(err.response.data == "all the fields are mandatory"){
               setErr({allfields: "all the fields are mandatory"})
            }
            if(err.response.data == "email already in use"){
                setErr({email: "email already in use"})
            }
            if(err.response.data == "passwords do NOT match"){
                setErr({password: "passwords do NOT match"})
            }
            if(err.response.data == "You must agree all the TERMS & CONDITIONS"){
                setErr({TnC: "You must agree all the TERMS & CONDITIONS"})
            }
        })
    }

    useEffect(() => {
        if(registerSuccessFull){
         navigate('/')
        }
     }, [registerSuccessFull])
    return (
        <>
            <section id="register-container">
                <div id="register-body">
                    <div id="regForm-heading">
                        <div id="regform-backIcon">
                           <Link to="/"><MdOutlineArrowBackIos /></Link>
                        </div>
                        <div>
                        SIGN UP
                        </div>
                    </div>
                    <form>
                        <div>
                                <input id="userName" className='reg-inputs' type="text" placeholder='NAME' onChange={handleRegisterForm('name')}/>
                        </div>
                        <div>
                                <input type="email" className='reg-inputs' placeholder='EMAIL' onChange={handleRegisterForm('email')}/>
                        </div>
                        <div>
                                <input type="password" className='reg-inputs' placeholder='PASSWORD' onChange={handleRegisterForm('password')}/>
                        </div>
                        <p className="reg-for-err">{err.email}</p>
                        <div>
                                <input type="password" className='reg-inputs' placeholder='REPEAT PASSWORD' disabled={confirmPassInput} onChange={handleRegisterForm('repeatPassword')} onBlur={handleConfirmPassErr()} value={regFormData.repeatPassword}/>
                        </div>
                        <div>
                        <p className="reg-for-err">{err.password}</p> 
                        {confirmPassErr ? <p className="reg-for-err">passwords do NOT match</p> : null}
                        </div>
                        <div id="reg-agreement-block">
                            <div>
                                <input id="agreement-checkbox" type="checkbox" onChange={(e) => setRegFormData({...regFormData, termsNconditions: e.target.checked})}/>
                            </div>
                            <div>
                            <label htmlFor='agreement-checkbox'>I agree with <span>TERMS & CONDITIONS</span></label>
                            </div>

                        </div>
                        {<p className="reg-for-err">{err.allfields || err.TnC}</p>}
                        <div >
                            <button id="reg-post-btn" onClick={postRegisterForm}>CONTINUE</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register;