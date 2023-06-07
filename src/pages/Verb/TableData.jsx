const TableData = ({ content, fontSize, }) => {
    return (
        <td className="p-2 whitespace-nowrap ">
            <div class={`text-left capitalize font-['Merriweather'] ${fontSize}`}>
                {content}
            </div>
        </td>
    )
}
export default TableData