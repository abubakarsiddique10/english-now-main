import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { MdOutlineCreate, } from "react-icons/md";
import { PrimaryButton } from "../../components/Button/Button";
import { memo, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import baseURL from "../../api/api";

const Profile = () => {
    const { user } = useContext(AppContext);
    const [posts, setPosts] = useState([]);
    const phoneNumber = user?.phoneNumber;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${baseURL}/api/v1/userPost/${phoneNumber}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setPosts(data?.posts))
    }, [phoneNumber]);




    const handleEditProfile = () => {
        navigate('/profileEdit')
    }

    return (
        <section>
            <div className="md:flex gap-5">
                <div className="max-w-[300px] h-full top-0 md:sticky md:top-[80px] mx-auto md:mx-0 md:my-0 my-5 md:b-0">
                    <img src={`${baseURL}/assets/avater/${user?.userImgURL}`} className="sm:max-w-[300px] sm:max-h-[300px] max-w-52 max-h-52 rounded-full object-cover mx-auto" />
                    <div>
                        <h5 className={`text-xl font-medium mt-4 text-center mb-2`}>{user?.userName}</h5>
                    </div>

                    <PrimaryButton handleClick={handleEditProfile}><MdOutlineCreate /> Edit profile</PrimaryButton>
                </div>
                <div className="flex-1">
                    {posts?.map(post => <Card key={post?._id} post={post} />)}
                </div>
            </div>
        </section>
    )
}
export default memo(Profile);