import { useParams } from "react-router-dom"
import TableHead from "./TableHead"
import TableData from "./TableData"
import { useEffect, useState } from "react";



const VerbRendered = () => {
    const { category } = useParams();
    const [verbs, setVerbs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log('helo', category)
            const response = await fetch(`/verb/${category}.json`);
            const data = await response.json();
            setVerbs(data);
        }
        fetchData()
    }, [])

    return (
        <section>
            <div className="md:container px-2 md:px-4">
                <div className="md:shadow-sm bg-white rounded-sm border border-gray-100">
                    <header className="border-gray-100 border-b border-gray-100 py-4">
                        <h2 className="main-title text-gray-800">{category} Verbs List</h2>
                    </header>
                    <div className="px-0 md:p-3">
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full">
                                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                    <tr>
                                        <TableHead content="present" />
                                        <TableHead content="meaning" />
                                        <TableHead content="past" />
                                        <TableHead content="past-participle" />
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100">
                                    {
                                        verbs.map(({ present, meaning, past, participle }) => <tr>
                                            <TableData content={present} />
                                            <TableData content={meaning} fontSize="text-[15px] font-medium" />
                                            <TableData content={past} />
                                            <TableData content={participle} />
                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default VerbRendered