import { Fragment } from "react"
import AnimateLogo from "./AnimateLogo"
import { Link } from "react-router-dom"

const myString = 'Hi, Mình là Hoàng, web developer'

const HeroCard = () => {
    const handleSplitText = () => myString.split('').map((character, index) => {
        if (character === ',') {
            return (
                <Fragment key={index}>
                    <span
                        className='hover-character'
                    >
                        {character}
                    </span>
                    <br />
                </Fragment>
            )
        } else {
            return (
                <span
                    key={index}
                    className={`${index === 12 ? 'hover-character text-red-600' : 'hover-character'}`}
                >
                    {character}
                </span>
            )
        }
    })

    return (
        <div className='min-h-[calc(100vh-4.5rem)] flex items-center'>
            <div className='grid grid-cols-1 pt-10 md:pt-0 md:grid-cols-3 w-full md:gap-12'>
                <div className='col-span-2'>
                    <div className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-700 dark:text-slate-100 font-poppins'>
                        {handleSplitText()}
                    </div>
                    <div className='btn-contact-wrapper'>
                        <Link to="https://www.facebook.com/profile.php?id=100011362084048">
                            <button className='from-blue-600 to-blue-400 contact-btn'>
                                Liên hệ Facebook
                            </button>
                        </Link>
                        <Link to="https://www.messenger.com/t/100800419699639/?messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792&recurring_notification=0">
                            <button className='from-blue-600 to-rose-500 contact-btn'>
                                Nhắn messenger cho mình
                            </button>
                        </Link>
                    </div>
                </div>
                <h2 className='col-span-1 flex items-center justify-center'>
                    <AnimateLogo />
                </h2>
            </div>
        </div>
    )
}

export default HeroCard
