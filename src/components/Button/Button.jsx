export const Button = ({ children, type, width, loading }) => {
    return (
        <button type={type}
            className={`flex justify-center items-center inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-${width} ${loading && "opacity-80"}`} disabled={loading ? true : false}>{children}</button>
    )
}


export const PrimaryButton = ({ children, handleClick }) => {
    return (
        <button
            onClick={handleClick}
            className="flex justify-center gap-2 inline-block w-full rounded bg-blue-600 text-white px-4 pt-[7px] pb-[6px] text-xs font-medium capitalize leading-normal transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
            {children}
        </button>
    )
}

export const PostButton = ({ children, handlePost }) => {
    return (
        <button onClick={handlePost} style={{ border: "1px solid #1D4ED8" }} className="inline-block px-4 py-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight capitalize rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">{children}</button>
    )
}
