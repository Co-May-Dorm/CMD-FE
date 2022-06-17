import React, { useRef, useState } from 'react'

import { ListGroup } from 'react-bootstrap'
import useOnClickOutside from '../../../../customHooks/useOnClickOutside'

/*
    Option dùng để hiển thị form chọn tùy chọn, có tác dụng tương tự như thẻ select của html
    Truyền vào 4 props:
    + defaultLabel: Nhãn hiển thị mặc định khi chưa chọn option
    + data: là một mảng đối tượng gồm 2 thuộc tính
        1. label: nhãn của đối tượng
        2. value: giá trị của đối tượng
    +
*/

const Option = ({ value, defaultValue, data = null, onChange }) => {
    const [visible, setVisible] = useState(false)       // State quản lý hiển thị danh sách phòng ban

    const ref = useRef()        // Ref form select Value

    useOnClickOutside(ref, () => setVisible(false))     // Hàm xử lý đóng form select Value khi click ra ngoài

    return (
        <div
            ref={ref}
            onClick={() => setVisible(!visible)}
            className="form-select"
        >
            {value || defaultValue}
            <div className="select">
                {
                    (visible) ? data?.map((item) => (
                        <ListGroup.Item
                            action
                            key={item.id}
                            onClick={() => onChange(item)}
                            active={value === item.name}
                        >
                            {value}
                        </ListGroup.Item>
                    )) : null
                }
            </div>
        </div>
    )
}

export default Option