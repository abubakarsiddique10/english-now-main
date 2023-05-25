import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../Home/Home";
import Vocabulary from "../Vocabulary/Vocabulary";
import VocabularyRendered from "../Vocabulary/VocabularyRendered";
import VocabularyCategory from "../Vocabulary/VocabularyCategory";



const Main = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <main className={`w-full ${path === "/" ? "bg-gradient-to-r from-blue-200 to-cyan-200" : "null"}`}>
            <div className="w-full md:container px-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/vocabulary" element={<Vocabulary />} >
                        <Route index element={<VocabularyCategory />} />
                        <Route path=":category" element={<VocabularyRendered />} />
                    </Route>

                </Routes>
            </div>
        </main>
    )
}
export default Main;
