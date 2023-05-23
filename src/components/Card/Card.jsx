import { useNavigate } from "react-router-dom"
import { FaRegCommentDots } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BsBookmarkHeart } from "react-icons/bs";
import moment from "moment";
import { memo, useContext, useState } from "react";
import Comment from "./Comment";
import baseURL from "../../api/api";
import { AppContext } from "../../App";
import { usePosts } from "../../context/postsProvider";
import { updateComment, updateLike } from "../../state/actionCreators/postAction";


const Card = ({ post }) => {
    const { userName, createdAt, description, postImgURL, userImgURL, _id, comments, likes } = post;
    const [toggle, setToggle] = useState(false);
    const [toggleComment, setToggleComment] = useState(false);
    const [comment, setComment] = useState("");
    const { user } = useContext(AppContext)
    const postTime = moment(createdAt)?.fromNow();
    const name = user?.userName;
    const userImg = user?.userImgURL;
    const id = user?._id;
    const navigate = useNavigate();
    const { dispatch } = usePosts();



    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (user) {
            fetch(`${baseURL}/api/v1/userPost/${_id}`, {
                method: "PATCH",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({ comment, name, userImg })
            }).then(res => res.json())
                .then(data => {
                    if (data.status) {
                        dispatch(updateComment(data))
                        setComment("")
                        setToggleComment(!toggleComment);
                    }
                })
        } else { navigate('/login') }
    }

    const handleLike = () => {
        if (user) {
            fetch(`${baseURL}/api/v1/userPost/like/${_id}`, {
                method: "PATCH",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({ userId: id })
            }).then(res => res.json())
                .then(data => {
                    if (data.status) {
                        dispatch(updateLike(data))
                    }
                })
        } else { navigate('/login') }
    }

    return (
        <>
            <article className="card bg-white border rounded-md mb-2">
                <div className="card-body">
                    <div className="card-top px-3 pt-3 md:p-4 pb-0">
                        <div className="flex flex-wrap items-top gap-2 mb-1">
                            <img src={`${baseURL}/assets/avater/${userImgURL}`} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                                <h5 className="text-[15px] font-medium leading-5 text-[#050505]">{userName}</h5>
                                <p className="text-[13px] font-normal leading-5 text-[#65676b]">{postTime === "a minute ago" ? "1 minute ago" : postTime === "an hour ago" ? "1 hour ago" : postTime === "a day ago" ? "1 day ago" : postTime === "a month ago" ? "1 month ago" : postTime === "a year ago" ? "1 year ago" : postTime}</p>
                            </div>
                        </div>
                        <div onClick={() => setToggle(!toggle)} className="mb-2 cursor-pointer transition-all duration-1000">
                            <p className="text-content break-all">{toggle ? description : description.length > 200 ? description.slice(0, 200) + "... See more" : description}</p>
                        </div>
                    </div>

                    <div className="card-indention">
                        <div className="px-0 lg:px-4">
                            {postImgURL ? <img src={`${baseURL}/assets/usersPostImage/${postImgURL}`} className="card-img h-auto object-fill mb-3 w-auto h-auto" /> : ""}
                        </div>

                        <div className="card-bottom flex justify-between md:mx-4 border-t py-1">
                            <div className="flex gap-2">
                                <div onClick={() => handleLike(_id)} className="flex items-center gap-1 hover:bg-[#F2F2F2] px-4 md:px-3 py-1.5 rounded cursor-pointer">
                                    <BiLike className="text-xl" />
                                    <span className="text-sm">{likes?.length} {likes?.length < 2 ? "Like" : "Likes"}</span>
                                </div>

                                <div onClick={() => setToggleComment(!toggleComment)}
                                    className="flex items-center gap-1.5 hover:bg-[#F2F2F2] px-3 py-1.5 rounded cursor-pointer">
                                    <FaRegCommentDots className="text-lg" />
                                    <span className="text-sm ">{comments.length} Comments</span>
                                </div>
                            </div>

                            {/* <div className="hover:bg-[#F2F2F2] px-3 py-2 rounded">
                                <BsBookmarkHeart className="text-md" />
                            </div> */}
                        </div >
                        <div className={`${toggleComment ? "block" : "hidden"}`}>
                            <form onSubmit={handleSubmitForm} className={`mx-4 px-3 flex items-center gap-2 mb-2 `}>
                                <input
                                    onChange={(e) => setComment(e.target.value)}
                                    className={`comment-input`}
                                    value={comment}
                                    placeholder="Write a comment..." />
                                <button className={`comment-btn ${!comment && "opacity-70"}`} disabled={!comment} type="submit">Add comment</button>
                            </form>
                            <div >
                                {
                                    comments.map((comment, index) => <Comment key={index} comment={comment} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}
export default memo(Card);