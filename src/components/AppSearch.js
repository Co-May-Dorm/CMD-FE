import React, { useRef, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
/*
    Component này có thể được sử dụng lại ở bất cứ đâu
    Truyền vào 2 props:
    1. value: giá trì tìm kiếm hiện tại
    2. onPageChange: một function được truyền vào tham số searchTerm là cụm từ mới được tìm kiếm
*/
const AppSearch = ({ value = "", onSearch }) => {
    // State lưu giá trị tìm kiếm hiện tại
    const [searchTerm, setSearchTerm] = useState("")

    // Ref có tác dụng lưu giá trị tìm kiếm trước đó
    const typingTimeoutRef = useRef(null)

    // Hàm thực gọi đến props onSearch 1 giây sau khi người dùng nhập dữ liệu
    const handleSearchTerm = (e) => {

        // Cập nhật lại giá trị tìm kiếm hiện tại
        setSearchTerm(e.target.value)

        // Nếu như đang trong thời gian đợi mà nhập giá trị mới, thì sẽ xóa khoảng thời gian thừa trước rồi mới thực hiện đợi tiếp 1 giây
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        // Sau khi đã đợi đủ 1 giây thì thực hiện gọi props onSearch để thực hiện việc tìm kiếm
        typingTimeoutRef.current = setTimeout(() => {
            onSearch(e.target.value)
        }, 1000)

    }
    return (
        <InputGroup>
            <Form.Control
                ref={typingTimeoutRef}
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm || value}
                onChange={handleSearchTerm}
            />
            {searchTerm === "" ? (
                <Button>
                    <BsSearch />
                </Button>
            ) : (
                <Button onClick={() => {
                    onSearch("")
                    setSearchTerm("")
                }}>
                    <AiOutlineClose />
                </Button>
            )}
        </InputGroup>
    )
}

export default AppSearch