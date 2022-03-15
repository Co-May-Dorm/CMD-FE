import React, { Component, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

// Containers
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = lazy(() => import('./views/pages/login/Login'))
const Page404 = lazy(() => import('./views/pages/page404/Page404'))

class App extends Component {
    render() {
        return (
            <Suspense fallback={loading}>
                <Routes>
                    <Route path="/login" name="Đăng Nhập" element={<Login />} />
                    <Route path="/404" name="Lỗi Trang 404" element={<Page404 />} />
                    <Route path="/*" name="Trang Chủ" element={<DefaultLayout />} />
                    <Route path="*" name="Lỗi Trang 404" element={<Page404 />} />
                </Routes>
            </Suspense>
        )
    }
}

export default App
