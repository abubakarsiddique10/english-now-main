import img from '../../assets/others/bust4.png'
import AOS from 'aos';
import { useEffect } from 'react';
export const Avatar = () => {
    useEffect(() => {
        AOS.init({ duration: 600 });
    }, [])
    return (
        <img data-aos="zoom-in" className="section-img" src={img} />
    )
}