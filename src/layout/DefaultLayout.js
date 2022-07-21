import React from 'react'
import AppContent from '../components/AppContent'
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'
import { useLocation } from 'react-router-dom'

const DefaultLayout = () => {
    const location = useLocation();
    return (
        <>
            <AppHeader />
            <AppContent />
            {location.pathname==="/newsFeeds"?null:<AppFooter />}
            {/* <AppFooter /> */}
        </>
    )
}

export default DefaultLayout