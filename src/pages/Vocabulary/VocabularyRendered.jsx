import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import image from "../../assets/others/Bust2.png"
import baseURL from "../../api/api";
import { LoadingTwo } from "../../components/Loading/Loading";


const VocabularyRendered = () => {

    const [vocabulary, setVocabulary] = useState([]);
    const [loading, setLoading] = useState(false)
    const { category } = useParams();

    useEffect(() => {
        AOS.init({ duration: 600 });
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(`/vocabulary/${category}.json`);
                const data = await response.json();
                setVocabulary(data);
                setLoading(false)
            } catch (error) {
            }
        }
        fetchData()
    }, [])



    /*  const vegetables = [
         { word: "cabbage", meaning: "বাঁধাকপি", image: cabbage, sentence: "", synonym: [], antonym: [] },
         { word: "carrot", meaning: "গাজর", image: carrot, sentence: "", synonym: [], antonym: [] },
         { word: "cucumber", meaning: "শসা", image: cucumber, sentence: "", synonym: [], antonym: [] },
         { word: "tomato", meaning: "টমেটো", image: tomato, sentence: "", synonym: [], antonym: [] },
         { word: "cauliflower", meaning: "ফুলকপি", image: cauliflower, sentence: "", synonym: [], antonym: [] },
         { word: "potato", meaning: "আলু", image: potato, sentence: "", synonym: [], antonym: [] },
         { word: "mushroom", meaning: "মাশরুম", image: mushroom, sentence: "", synonym: [], antonym: [] }
     ]
  */
    console.log(vocabulary)

    return (
        <>
            {loading ? <LoadingTwo /> :
                <div className="mt-10">
                    <div>
                        <div data-aos="zoom-in-up" >
                            <img className="v-section-img" src={image} />
                        </div>
                        <h1 className="main-title">{category} Vocabulary</h1>
                    </div>

                    <div className="v-grid">
                        {
                            vocabulary?.map(({ word, meaning, image, _id }) => <div key={_id} className="v-flex">
                                <img className="v-img" src={image} alt="" />
                                <div className="v-content">
                                    <span className="v-word">{word}</span>
                                    <span className="v-meaning">{meaning}</span>
                                </div>
                            </div>)
                        }
                    </div>
                </div>}

        </>
    )
}
export default VocabularyRendered;