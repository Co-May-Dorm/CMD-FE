import React from 'react'
import AppContent from '../components/AppContent'
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader'

const DefaultLayout = () => {
    return (
        <>
            <AppHeader />
            <AppContent />
            <AppFooter />
        </>
    )
}

export default DefaultLayout