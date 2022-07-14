import React, { useRef, useState } from 'react'

import { ListGroup } from 'react-bootstrap'
import useOnClickOutside from '~/customHooks/useOnClickOutside'

/*
    Option dùng để hiển thị form chọn tùy chọn, có tác dụng tương tự như thẻ select của html
    Truyền vào 4 props:
    + defaultLabel: Nhãn hiển thị mặc định khi chưa chọn option
    + data: là một mảng đối tượng gồm 2 thuộc tính
        1. label: nhãn của đối tượng
        2. value: giá trị của đối tượng
    +
*/

const Option = ({ index, value, defaultValue, data, onChange, ...props }) => {
    const [visible, setVisible] = useState(false)       // State quản lý hiển thị danh sách phòng ban
    const ref = useRef()        // Ref form select Value

    useOnClickOutside(ref, () => setVisible(false))     // Hàm xử lý đóng form select Value khi click ra ngoài

    return (
        <div
            ref={ref}
            onClick={() => setVisible(!visible)}
            className="form-select"
            {...props}
        >
            {defaultValue?.label || value?.label || data[0].label}
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