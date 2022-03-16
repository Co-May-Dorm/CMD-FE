import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import AdvancedFilters from './AdvancedFilters'

const ButtonShowAdvancedFilters = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Button
                variant="outline-primary"
                onClick={() => setVisible(!visible)}
            >
                <span className="fw-bolder">
                    Bộ lọc
                </span>
            </Button>
            <AdvancedFilters visible={visible} setVisible={setVisible} />
        </>
    )
}

export default ButtonShowAdvancedFilters