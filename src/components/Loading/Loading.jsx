import spinner from '../../assets/svg/spinner.svg'
import spinnerTwo from '../../assets/svg/SpinnerTwo.svg';
import subSpinner from "../../assets/svg/subSpinner.svg"

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