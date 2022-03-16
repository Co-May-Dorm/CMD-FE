import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const AdvancedFilters = ({ visible, setVisible }) => {
    return (
        <Modal
            show={visible}
            onHide={() => setVisible(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header
                closeButton
                className="bg-gradient"
            >
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                I will not close if you click outside me. Don't even try to press
                escape key.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setVisible(false)}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AdvancedFilters