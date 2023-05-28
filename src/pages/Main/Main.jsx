import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../Home/Home";
import Vocabulary from "../Vocabulary/Vocabulary";
import VocabularyRendered from "../Vocabulary/VocabularyRendered";
import VocabularyCategory from "../Vocabulary/VocabularyCategory";
import VocabularyDetails from "../Vocabulary/VocabularyDetails";



const Main = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <main>
            <div className="">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/vocabulary" element={<Vocabulary />} >
                        <Route index element={<VocabularyCategory />} />
                        <Route path=":category" element={<VocabularyRendered />} />
                        <Route path=":category/:id" element={<VocabularyDetails />} />
                    </Route>
                    <Route path="/he" element={<VocabularyDetails />} />
                </Routes>
            </div>
        </main>
    )
}
export default Main;
