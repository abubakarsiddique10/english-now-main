const TableData = ({ content, fontSize, }) => {
    return (
        <td className="px-1 py-2 md:p-2">
            <div class={`text-left capitalize font-['Merriweather'] ${fontSize}`}>
                {content}
            </div>
        </td>
    )
}
export default TableData


//"can, could, shall, should, will, would, may, might, must, need, dare, used to, ought to"
