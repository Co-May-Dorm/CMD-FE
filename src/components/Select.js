import React, { useRef, useState } from 'react'
import { ListGroup } from 'react-bootstrap'

import useOnClickOutside from '~/customHooks/useOnClickOutside'

const Select = ({ index, value, placeholder, displayValue, options, onSelect, ...props }) => {
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
            {value[displayValue] || placeholder}
            <div className="select">
                {
                    visible && options.map((item, key) => (
                        <ListGroup.Item
                            action
                            key={key}
                            onClick={() => onSelect(index, item)}
                            active={value[displayValue] === item[displayValue]}
                        >
                            {item[displayValue]}
                        </ListGroup.Item>
                    ))
                }
            </div>
        </div>
    )
}

export default Select