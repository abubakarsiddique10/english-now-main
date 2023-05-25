import { memo } from "react"
import banner from '../../assets/banner/banner3.png'
import banner2 from '../../assets/banner/Untitled_design__7_-removebg-preview.png'

const Home = () => {
    return (
        <>
            <div className='w-full h-screen height flex items-center justify-between flex-col xl:flex-row'>
                <div className="flex-1 text-center xl:text-left mt-5 xl:mt-0">
                    <h3 className="lg:text-xl font-medium">welcome to our website!</h3>
                    <h1 className="text-xl lg:text-[32px] lg:leading-[37px] xl:text-[43px] xl:leading-[52px] font-bold">Are you ready to learn English? If so, then thinkinenglish24.com is for you.</h1>
                    <p></p>
                </div>
                <div className="flex-1">
                    <img className="xl:ml-5" src={banner2} />
                </div>
            </div>
        </>
    )
}
export default memo(Home) 