import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input'
import Label from "../../components/Form/Label"
import TextField from "../../components/Form/TextField"
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from "react-phone-number-input"
import { Button } from "../../components/Button/Button";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import auth from "../../firebase.init";
import baseURL from "../../api/api";
import { toast } from "react-toastify";
import { Avatar } from "../../components/Avatar/Avatar";
import { SubLoading } from "../../components/Loading/Loading";

const SignUp = () => {
    const [value, setValue] = useState({
        userName: "",
        phoneNumber: "",
        password: "",
        userImgURL: "avater.png",
    });
    const [result, setResult] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }


    const recaptha = (phone) => {
        const recapthaVerifier = new RecaptchaVerifier("recaptcha-container", {}, auth);
        recapthaVerifier.render();
        return signInWithPhoneNumber(auth, phone, recapthaVerifier)
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let isValid = value.phoneNumber && isValidPhoneNumber(value.phoneNumber) ? true : false;
        if (value.userName.length < 3) return setError('name must be at least 3 characters');
        if (!isValid) return setError('number is not valid');
        if (value.password.length < 5) return setError('password must be at least 5 characters');


        const isExist = await fetch(`${baseURL}/api/v1/user/isUserExist/${value.phoneNumber}`)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    return true
                } else {
                    return false
                }
            }).catch(error => console.log(error))

        if (isExist) {
            return setError('This number is already registered')
        } else (setError(""))

        try {
            setLoading(true)
            setError('');
            const response = await recaptha(value.phoneNumber);
            setResult(response);
            console.log(response);
            setLoading(false)
            toast.success('OTP sent successfully', {
                autoClose: 10000,
            })
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }


    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const confirm = await result.confirm(otp);
            if (confirm?.user?.phoneNumber) {
                fetch(`${baseURL}/api/v1/user/signup`, {
                    method: "POST",
                    headers: {
                        'content-type': "application/json"
                    },
                    body: JSON.stringify(value)
                })
                    .then(data => data.json())
                    .then(data => {
                        const message = data.error?.split('user validation failed:')[1]
                        if (message) {
                            setError(message);
                        }
                        else if (data?.message) {
                            toast.success('Registration successfully. please login to continue.', {
                                autoClose: 10000,
                            })
                            navigate('/login')
                        }
                    })
            }
        } catch (err) {
            setError(err.message)
        }

    }

    return (
        <div className="h-screen flex justify-center items-center height">
            <div className="w-full max-w-[550px] border px-2 py-10 md:p-10">
                {!result ?
                    <>
                        <div>
                            <Avatar />
                            <h3 className="section-title">Sign Up</h3>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="w-full">
                                <Label label="Your name" />
                                <TextField
                                    handleChange={handleChange}
                                    placeholder="Name"
                                    type="text"
                                    required={true}
                                    value={value.userName}
                                    name="userName" />
                            </div>

                            <div id="recaptcha-container" />

                            <div className="w-full mb-6">
                                <Label label="Your mobile number" />
                                <PhoneInput
                                    international
                                    defaultCountry="BD"
                                    countryCallingCodeEditable={false}
                                    value={value.phoneNumber}
                                    onChange={e => setValue({ ...value, phoneNumber: e })} />
                            </div>

                            <div className="w-full ">
                                <Label label="Enter password" />
                                <div className="relative">
                                    <TextField
                                        handleChange={handleChange}
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        required={true}
                                        value={value.password}
                                        name="password" />
                                    <span onClick={() => setShowPassword(!showPassword)} className="absolute top-2/4 translate-y-[-50%] right-3 cursor-pointer">
                                        {showPassword ? < IoEyeOutline /> : <IoEyeOffOutline />}
                                    </span>
                                </div>
                            </div>

                            {error ? <p className="text-red-500">{error}</p> : ""}

                            <div className="text-center">
                                <Button loading={loading} width="full" type="submit" >{loading ? <SubLoading /> : "Sign Up"}  </Button>
                            </div>
                            <div className="mt-3 text-center">
                                <span>Already have an acount?</span>
                                <Link className="text-blue-500" to="/login"> Login</Link>
                            </div>
                        </form>
                    </> :
                    <div className="mt-5">
                        <div className="mb-5 text-center">
                            <Avatar />
                            <h3 className="section-title">Verification Code</h3>
                        </div>
                        <form onSubmit={handleVerifyOTP}>
                            <p className="text-sm mb-2">Please enter the OTP sent to your phone number</p>
                            <input onChange={e => setOtp(e.target.value)} type="text" placeholder="Enter otp" className="border p-2 w-full mb-6" name="otp" value={otp} />
                            <Button width="full" type="submit">
                                Submit
                            </Button>
                        </form>
                    </div>}
            </div>
        </div>
    )
}
export default SignUp

//text="You can't change your password later. please save your password.

// <a href="https://storyset.com/user">User illustrations by Storyset</a>