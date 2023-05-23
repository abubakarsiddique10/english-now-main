import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import baseURL from "../../api/api";
import { Button } from "../../components/Button/Button";
import Label from "../../components/Form/Label";
import TextField from "../../components/Form/TextField";

const NewPassword = () => {
    const { phoneNumber } = useParams();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setPassword(e.target.value)
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (password.length < 5) {
            return setError('password must be at least 5 characters')
        } else { setError("") }

        fetch(`${baseURL}/api/v1/user/resetPassword/${phoneNumber}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ password })
        }).then(res => res.json())
            .then(data => {
                if (data.status) {
                    toast.success(data.message, { autoClose: 5000 });
                    navigate('/login')
                }
            })
            .catch((error) => {
            })

    }
    return (
        <div className="h-screen flex justify-center items-center height">
            <div className="w-full max-w-[500px] border px-2 py-10 md:p-10">
                <h1 className="mb-9 login_title">New Password</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="w-full">
                        <Label label="Enter password" />
                        <div className="relative">
                            <TextField
                                handleChange={handleChange}
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                required={true}
                                name="password" />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute top-2/4 translate-y-[-50%] right-3 cursor-pointer">
                                {showPassword ? < IoEyeOutline /> : <IoEyeOffOutline />}
                            </span>
                        </div>
                    </div>

                    {error && <span className="text-red-500 block mb-1">{error}</span>}

                    <div className="text-center">
                        <Button width="full" type="submit">Login</Button>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default NewPassword