import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import image from "../../assets/others/Bust1.png"


const Verb = () => {
    const [typesOfVerbs, setTypesOfVerbs] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/verb/typesOfVerbs.json')
                const data = await response.json();
                setTypesOfVerbs(data)
            } catch (error) {
            }
        }
        fetchData()
    }, [])

    const handleTypesOfVerbs = (type) => {
        navigate(`/verbRendered/${type}`)
    }

    return (
        <section>
            <div className="md:container md:container px-4 md:p-14 pt-10">
                <div className="category-img">
                    <img data-aos="zoom-in-up" className="max-w-[100px] h-[100px] md:max-w-[110px] md:h-[110px] mx-auto" src={image} />
                    <h2 className="main-title" >List of verb</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mt-11">
                    {
                        typesOfVerbs.map(({ _id, type }) => <div key={_id} onClick={() => handleTypesOfVerbs(type)} className="flex items-center justify-between cursor-pointer v_card px-4 py-3">
                            <h3 className="sub_title capitalize">{type} verbs</h3>
                            <MdKeyboardArrowRight className="text-xl" />
                        </div>)
                    }
                </div>
            </div>
        </section>
    )
}
export default Verb