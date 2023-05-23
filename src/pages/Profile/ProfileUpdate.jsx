import { useContext, useEffect, useState } from "react"
import Label from "../../components/Form/Label"
import TextField from "../../components/Form/TextField"
import 'react-phone-number-input/style.css'
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import baseURL from "../../api/api";
import { toast } from "react-toastify";
import Error from "../../components/Error/Error";

const ProfileUpdate = () => {
    const { user, setUser } = useContext(AppContext);
    const [error, setError] = useState("");
    const navigate = useNavigate()
    const [value, setValue] = useState({
        userName: "",
        imageURL: "",
    });

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        setValue({ ...value, imageURL: e.target.files[0] })
    }

    const handleProfileEdit = (e) => {
        e.preventDefault();


        if (!value.userName) {
        } else if (value.userName.length < 3) {
            return setError('name must be at least 3 characters');
        }
        const formData = new FormData;
        formData.append('userName', value.userName);
        formData.append('imageURL', value.imageURL);


        fetch(`${baseURL}/api/v1/user/updateProfile/${user.phoneNumber}`, {
            method: "PATCH",
            body: formData,
        }).then(res => res.json())
            .then(data => {
                if (data.status) {
                    toast.success('Profile updated successfully!')
                    navigate('/')
                    window.location.reload()
                } else if (data.error.includes('File too large')) {
                    toast.error("file must be less than 500 KB", {
                        autoClose: 10000,
                    })
                } else {
                    toast.error(data.error, {
                        autoClose: 10000,
                    })
                }
            })
            .catch((error) => {
            })
    }


    return (
        <div className="h-screen flex justify-center items-center height">
            <div className="w-full max-w-[500px] border px-2 py-10 md:p-10">
                <h1 className="mb-10 text-center text-2xl font-medium">Edit your profile</h1>
                <form onSubmit={handleProfileEdit}>

                    <div className="w-full relative">
                        <Label label="Enter your name" />
                        <TextField
                            handleChange={handleChange}
                            placeholder="Name"
                            type="text"
                            required={false}
                            value={value.userName}
                            name="userName" />

                        {error && <Error error={error} />}

                    </div>

                    <div className="w-full">
                        <Label label="Enter Image" />
                        <input
                            onChange={handleImage}
                            placeholder="Image"
                            type="file"
                            name="imageURL"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2.5 px-4 mb-3" />
                    </div>

                    <div className="text-center">
                        <Button width="full" type="submit">submit</Button>
                    </div>

                </form>
            </div>
        </div>
    )
}
export default ProfileUpdate