import { memo } from "react"
import banner from '../../assets/banner/Untitled_design-removebg-preview.png'
import banner2 from '../../assets/banner/Untitled_design__7_-removebg-preview.png'
import banner3 from '../../assets/banner/pattern.afd33a3d.svg'

const Home = () => {
    return (
        <section className="h-screen home height flex items-center ">
            <div className='md:container px-3'>
                <div className="w-full flex items-center flex-col xl:flex-row ">
                    <div className="text-center xl:text-left mt-5 xl:mt-0">
                        <h3 className="lg:text-xl font-medium">welcome to our website!</h3>
                        <h1 className="xs:text-[20px] sm:text-[32px] lg:leading-[37px] xl:text-[43px] xl:leading-[52px] font-bold">Are you ready to learn English? If so, then thinkinenglish24.com is for you.</h1>
                    </div>

                    <img className="hidden xl:block block w-full max-w-[400px] mx-auto" src={banner2} />
                    <img className="xl:hidden block w-full max-w-[400px] mx-auto" src={banner} />

                </div>
            </div>
        </section>
    )
}
export default memo(Home) 