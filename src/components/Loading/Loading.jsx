import spinner from '../../assets/svg/spinner.svg'
import spinnerTwo from '../../assets/svg/SpinnerTwo.svg';
import subSpinner from "../../assets/svg/subSpinner.svg"
import gif from "../../assets/gif/wired-flat-1148-bee (1).gif";

export const Loading = () => {
    return (
        <div className='height flex items-center justify-center'>
            <img src={spinner} />
        </div>
    )
}
export const LoadingTwo = () => {
    return (
        <div className='height flex items-center justify-center'>
            <img src={spinnerTwo} />
        </div>
    )
}

export const SubLoading = () => {
    return (
        <img src={subSpinner} />
    )
}