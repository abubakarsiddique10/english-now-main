const Textarea = ({ handleChange, placeholder, name, value, required }) => {

    return (
        <textarea
            onChange={handleChange}
            className="w-full h-full border py-3 px-4"
            placeholder={placeholder}
            name={name}
            required={required}
            value={value}></textarea>
    )
}
export default Textarea;