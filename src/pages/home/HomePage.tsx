import HeroCard from '../../components/mainView/HeroCard'
import MainView from '../../components/mainView/Skill'
import Self from '../../components/mainView/Self'
import Navbar from '../../layouts/Navbar'
import Footer from '../../layouts/Footer'
import CopyRight from '../../components/policy/CopyRight'
import { useQuery } from '@apollo/client'
import { getTotalInfo } from '../../graphql-client/queries'
import Loader from '../../components/loader/Loader'
import { useEffect } from 'react'


const HomePage = () => {
    const { loading, data } = useQuery(getTotalInfo)

    useEffect(() => {
        document.title = 'Huỳnh Huy Hoàng | Chia sẻ kiến thức.'
    }, [])


    if (loading) {
        return <Loader />
    }

    return (
        <div className='art-bg'>
            <Navbar />
            <div className='max-w-8xl mx-auto px-4 mb-20'>
                <HeroCard />
                <MainView getTotalInfo={data?.getTotalInfo} />
                <Self />
            </div>
            <Footer />
            <CopyRight />
        </div>
    )
}

export default HomePage
