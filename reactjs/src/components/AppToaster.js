import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

const AppToaster = ({ visible, setVisible, title, content }) => {
    const timeNow = new Date()
    const strDateTime = "Vào lúc " + timeNow.getHours() + ":" + timeNow.getMinutes() + ", ngày " + timeNow.getDate() + "/" + (timeNow.getMonth() + 1) + "/" + timeNow.getFullYear()
    return (
        <ToastContainer>
            <Toast onClose={() => setVisible(false)} show={visible}>
                <Toast.Header closeButton className="bg-gradient">
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <div className="me-auto text-white">{title}</div>
                    <small className="text-white">{strDateTime}</small>
                </Toast.Header>
                <Toast.Body>
                    {content}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default React.memo(AppToaster)