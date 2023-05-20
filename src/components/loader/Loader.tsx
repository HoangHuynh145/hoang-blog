import { PacmanLoader } from "react-spinners"

const Loader = () => {
    return (
        <div className='fixed top-0 w-screen h-screen flex items-center justify-center z-[100] dark:bg-slate-650 bg-lime-150 order-1'>
            <PacmanLoader color="rgb(14, 165, 233)" />
        </div>
    )
}

export default Loader
