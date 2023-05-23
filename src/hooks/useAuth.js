import { useEffect, useState } from "react"
import baseURL from "../api/api";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`${baseURL}/api/v1/user/profile`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => res.json())
                .then(({ data, error }) => {
                    if (data) {
                        setUser(data)
                    }
                    else if (error) {
                        console.log(error)
                        setError(error);
                    }
                })
        }
        fetchData()
    }, [])
    return { user, error, setUser }
}
export default useAuth