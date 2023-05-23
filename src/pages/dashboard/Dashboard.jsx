import { Outlet, Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <div className="mt-8 flex gap-5">
                <Link to="/dashboard/addVocabulary">Add Vocabulary</Link>
                <Link to="/dashboard">Add Story</Link>
            </div>
            <Outlet />
        </div>
    )
}
export default Dashboard;