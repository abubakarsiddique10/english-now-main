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
            <div className="md:container px-4 pt-10">

                <div className="max-w-[500px] mx-auto flex justify-center mb-2">
                    <div className="sm:w-full">
                        <h3 className="main-title text-left mb-5 sm:mt-5 "> Daily Use Sentences</h3>
                        {
                            sentences.map(({ sentence, meaning }) =>
                                <div className="sm:flex mb-2.5 sm:mb-2 gap-4">
                                    <div className="flex-1 flex items-center space-x-2.5">
                                        <MdStars />
                                        <p className="text-lg font-medium first-letter:uppercase leading-6 sm:leading-7">{sentence}</p>
                                    </div>
                                    <p className="flex-1 text-base mt-0.5 font-['Hind_Siliguri'] font-medium ml-7 sm:ml-0">{meaning}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
export default DailyUseSentences