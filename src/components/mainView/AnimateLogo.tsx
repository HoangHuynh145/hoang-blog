import { useState, useEffect } from "react"
import htmlLogo from "../../assets/imgs/htmlIcon.png"
import cssLogo from "../../assets/imgs/cssIcon.png"
import jsLogo from "../../assets/imgs/jsIcon.png"
import nodeLogo from "../../assets/imgs/nodeIcon.png"
import reactLogo from "../../assets/imgs/reactIcon.png"

const AnimateLogo = () => {
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0)
    const logoArr = [htmlLogo, cssLogo, jsLogo, nodeLogo, reactLogo]

    useEffect(() => {
        const updateLogoIndex = setInterval(() => {
            setCurrentLogoIndex(currentLogoIndex >= 4 ? 0 : currentLogoIndex + 1)
        }, 2000)

        return () => clearInterval(updateLogoIndex)
    }, [currentLogoIndex])

    return (
        <img
            key={currentLogoIndex}
            src={logoArr[currentLogoIndex]}
            className='img-animate'
        />
    )
}

export default AnimateLogo
