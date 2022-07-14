import React, { useRef, useState } from 'react'
import { ListGroup } from 'react-bootstrap'

import useOnClickOutside from '~/customHooks/useOnClickOutside'

const Option = ({ index, value, placeholder, data, onChange, ...props }) => {
    const [visible, setVisible] = useState(false)
    const ref = useRef()        // Ref form select Value

    useOnClickOutside(ref, () => setVisible(false))     // Hàm xử lý đóng form khi click ra ngoài

    return (
        <div
            ref={ref}
            onClick={() => setVisible(!visible)}
            className="form-select"
            {...props}
        >
            {placeholder}
            <div className="select">
                {
                    visible && data.map((item, key) => (
                        <ListGroup.Item
                            action
                            key={key}
                            onClick={() => onChange(index, item)}
                            active={value.label === item.label}
                        >
                            {item.label}
                        </ListGroup.Item>
                    ))
                }
            </div>
        </div>
    )
}

export default Option