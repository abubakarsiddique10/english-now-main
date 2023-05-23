import { createContext, useState } from "react";
import Header from "./components/Header/Header";
import Main from "../src/pages/Main/Main";
import useAuth from "./hooks/useAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostsProvider from "./context/postsProvider";



export const AppContext = createContext(null)

function App() {
  const { user, errror, setUser } = useAuth()
  const provideValue = { setUser, user, errror }

  return (
    <div>
      <AppContext.Provider value={{ ...provideValue }}>
        <Header />
        <PostsProvider>
          <Main />
        </PostsProvider>
        <ToastContainer />
      </AppContext.Provider>
    </div>
  );
}

export default App;
