import Aos from "aos";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const VocabularyDetails = () => {
    const { id, category } = useParams();
    const [vocabulary, setVocabulary] = useState({});
    const [loading, setLoading] = useState(false)

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
        <div className="md:container px-4">
            <h1>VocabularyDetails {id}</h1>
        </div>
    )
}
export default VocabularyDetails