const Comment = ({ comment }) => {
    return (
        <div className="flex items-center gap-2 mx-4 mb-2">
            <img src={`http://localhost:5000/assets/avater/${comment.userImg}`} className="w-7 h-7 rounded-full object-cover" />
            <div className="flex flex-col">
                <h6 className="font-medium text-sm leading-5">{comment.name}</h6>
                <span className="text-xs">{comment.comment}</span>
            </div>
        </div>
    )
}
export default Comment