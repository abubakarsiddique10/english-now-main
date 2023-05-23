import { useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input'
import { Button } from "../../components/Button/Button";
import Label from "../../components/Form/Label"
import TextField from "../../components/Form/TextField"
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from "react-phone-number-input"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { AppContext } from "../../App";
import baseURL from "../../api/api";
import { toast } from "react-toastify";
import { Avatar } from "../../components/Avatar/Avatar";
import { SubLoading } from "../../components/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import { SiNeovim } from "react-icons/si";

const Login = () => {
    const { user } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState({
        phoneNumber: "",
        password: "",
    });

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const location = useLocation()
    let from = location.state?.from?.pathname || '/';

    if (user) {
        navigate(from, { replace: true });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let isValid = value.phoneNumber && isValidPhoneNumber(value.phoneNumber) ? true : false;

        if (isValid) {
            setLoading(true)
            fetch(`${baseURL}/api/v1/user/login`, {
                method: "POST",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(value)
            }).then(res => res.json())
                .then(({ token, error }) => {
                    if (token) {
                        setLoading(false)
                        localStorage.setItem('accessToken', token);
                        setError("");
                        toast.success('Login successful!');
                        window.location.reload();
                    }
                    else if (error) {
                        setError(error);
                        setLoading(false)
                    }
                })
        }
        else {
            setError('Invalid phone number')
        }
    }


    return (
        <div className="h-screen flex justify-center items-center height">
            <div className="w-full max-w-[550px] border px-2 py-10 md:p-10">
                <div>
                    <Avatar />
                    <h3 className="section-title">Login</h3>
                </div>
                <form onSubmit={handleFormSubmit}>

                    <div className="w-full pb-3">
                        <Label label="Your mobile number" />
                        <PhoneInput
                            international
                            defaultCountry="BD"
                            countryCallingCodeEditable={false}
                            value={value.phoneNumber}
                            onChange={e => setValue({ ...value, phoneNumber: e })} />
                    </div>

                    <div className="w-full pb-6">
                        <Label label="Enter password" />
                        <div className="relative">
                            <TextField
                                handleChange={handleChange}
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                value={value.password}
                                required={true}
                                name="password" />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute top-2/4 translate-y-[-50%] right-3 cursor-pointer">
                                {showPassword ? < IoEyeOutline /> : <IoEyeOffOutline />}
                            </span>

                            <Link to="/resetPaasword" className="absolute bottom-[-35px] right-0">Forgot Password</Link>
                        </div>
                    </div>



                    {error && <span className="text-red-500 block mb-1">{error}</span>}

                    <div className="text-center">
                        <Button loading={loading} width="full" type="submit">{loading ? <SubLoading /> : "Login"}</Button>
                    </div>
                    <div className="mt-3 text-center">
                        <span>Don't have an account? </span>
                        <Link className="text-blue-500" to="/signup"> Sign up</Link>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default Login

//<a href="https://storyset.com/user">User illustrations by Storyset</a>