const Label = ({ label, text }) => {
    return (
        <div className="mb-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-black font-['Hind_Siliguri'] " htmlFor="grid-first-name">
                {label}
            </label>
        </div>
    )
}
export default Label;