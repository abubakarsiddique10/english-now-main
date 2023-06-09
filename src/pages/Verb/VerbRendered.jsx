import { useParams } from "react-router-dom"
import TableHead from "./TableHead"
import TableData from "./TableData"
import { useEffect, useState } from "react";
import { MdStars } from "react-icons/md";



const VerbRendered = () => {
    const { category } = useParams();
    const [verbs, setVerbs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/verb/${category}.json`);
            const data = await response.json();
            setVerbs(data);
        }
        fetchData()
    }, [])

    return (
        <section>
            <div className="md:container px-3 md:px-4">
                <div className="md:shadow-sm bg-white rounded-sm md:border border-gray-100">
                    <header className="border-gray-100 border-b border-gray-100 py-4">
                        <h2 className="main-title text-gray-800">{category} Verbs List</h2>
                    </header>
                    {category === "regular" || category === "irregular" ? <div className="px-0 md:p-3">
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
                                        verbs.map(({ _id, present, meaning, past, participle }) => <tr key={_id}>
                                            <TableData content={present} />
                                            <TableData content={meaning} fontSize="text-[15px] font-medium" />
                                            <TableData content={past} />
                                            <TableData content={participle} />
                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div> : category === 'phrasal' ? < div className="md:px-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-4">
                            {
                                verbs.map(({ _id, verb, meaning }) => <div key={_id} className="flex items-center gap-2 ">
                                    <MdStars />
                                    <p className="text-lg text-lg font-medium first-letter:uppercase">{verb}</p>
                                    <p className="font-['Hind_Siliguri'] text-base">{meaning}</p>
                                </div>)
                            }
                        </div>
                    </div> : <div className="px-1 md:px-3">
                        {
                            verbs.map(({ _id, tobe, tohave, todo, modal }) => <div key={_id} className="lg:flex">
                                <div className="flex-1">
                                    <h4 className="font-semibold uppercase text-gray-400 bg-gray-50 py-2">primary auxiliaries</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-2 lg:gap-y-0 mb-1 mt-1 ">
                                        <div className="">
                                            <h4 className="font-semibold uppercase lg:pb-2 text-gray-600">to be</h4>
                                            <div className="pl-1 lg:pl-0 flex gap-x-2 gap-y-.5 flex-wrap">{tobe.map((verb, index,) => <span key={index} className="text-lg capitalize">{verb},</span>)}</div>
                                        </div>
                                        <div className="">
                                            <h4 className="font-semibold uppercase lg:pb-2 text-gray-600">to have</h4>
                                            <div className="pl-1 lg:pl-0 flex gap-x-2 gap-y-.5 flex-wrap">{tohave.map((verb, index) => <span key={index} className="text-lg capitalize">{verb},</span>)}</div>
                                        </div>
                                        <div className="">
                                            <h4 className="font-semibold uppercase lg:pb-2 text-gray-600">to do</h4>
                                            <div className="pl-1 lg:pl-0 flex gap-x-2 gap-y-.5 flex-wrap">{todo.map((verb, index) => <span key={index} className="text-lg capitalize">{verb},</span>)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 mt-3 lg:mt-0">
                                    <h4 className="font-semibold uppercase text-gray-400 bg-gray-50 py-2 ">modal auxiliaries</h4>
                                    <div className="pl-1 lg:pl-0 flex gap-x-2 gap-y-.5 flex-wrap">{modal.map((verb, index) => <span key={index} className="text-lg capitalize">{verb},</span>)}</div>
                                </div>
                            </div>)
                        }
                    </div>}
                </div>
            </div>
        </section>
    )
}
export default VerbRendered