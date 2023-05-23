import Header from "./components/Header/Header";
import Main from "../src/pages/Main/Main";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div>
      <Header />
      <Main />
      <ToastContainer />
    </div>
  );
}

export default App;
