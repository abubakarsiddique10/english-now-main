import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const VocabularyDetails = () => {
    const { id, category } = useParams();
    const [vocabulary, setVocabulary] = useState({});
    const [loading, setLoading] = useState(false)
    const { word, meaning, image, synonym, antonym, sentence } = vocabulary

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(`/vocabulary/${category}.json`);
                const data = await response.json();
                setVocabulary(data[id]);
                setLoading(false)
            } catch (error) {
            }
        }
        fetchData()
    }, [])


    return (
        <section className="h-screen height flex items-center justify-center">
            <div className="w-full md:container px-4">
                <div className="w-full max-w-2xl mx-auto bg-white xs:shadow-lg rounded-sm xs:border border-gray-200">
                    <header className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800 text-center text-2xl">Details</h2>
                    </header>
                    <div className="md:px-3 py-5">
                        <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-4 gap-5">
                            <div className="flex flex-col items-center">
                                <h3 className="mb-2 font-semibold uppercase text-gray-400 text-sm">Word</h3>
                                <img className="v-img mb-1" src={image} alt=""></img>
                                <div className="v-content">
                                    <span className="v-word ">{word}</span>
                                    <span className="v-meaning">{meaning}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center xl:items-start">
                                <h3 className="mb-2 font-semibold uppercase text-gray-400 text-sm">sentence</h3>
                                <p className="font-normal text-[#000000] text-center xl:text-left">{sentence}</p>
                            </div>
                            <div className="flex flex-col items-center xl:items-start">
                                <h3 className="mb-2 font-semibold uppercase text-gray-400 text-sm">synonym</h3>
                                <div>
                                    {synonym?.map(item => <p className="font-normal text-[#000000]">{item}</p>)}
                                </div>
                            </div>
                            <div className="flex flex-col items-center xl:items-start">
                                <h3 className="mb-2 font-semibold uppercase text-gray-400 text-sm">antonym</h3>
                                {antonym?.map(item => <p className="font-normal text-[#000000]">{item}</p>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default VocabularyDetails


