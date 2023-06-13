import { useEffect, useState } from "react";
import { MdStars } from "react-icons/md";

const DailyUseSentences = () => {
    const [loading, setLoading] = useState(false)
    const [sentences, setSentences] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(`/sentences/sentences.json`);
                const data = await response.json();
                console.log(data)
                setSentences(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <section >
            <div className="md:container px-4">
                <div className="md:shadow-sm bg-white rounded-sm md:border border-gray-100">
                    <header className="border-gray-100 border-b border-gray-100 py-4">
                        <h2 className="main-title text-gray-800">Daily Use Sentences</h2>
                    </header>
                    < div className="md:px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 py-4">
                            {
                                sentences.map(({ sentence, meaning }) => <div className="flex sm:items-center gap-2">
                                    <MdStars className="mt-1.5 sm:mt-0" />
                                    <div className="sm:flex items-center gap-2">
                                        <p className="text-lg font-medium first-letter:uppercase">{sentence}</p>
                                        <p className="font-['Hind_Siliguri'] text-base">{meaning}</p>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default DailyUseSentences