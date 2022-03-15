
import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

/*
    Component này có thể được sử dụng lại ở bất cứ đâu
    Truyền vào 2 props:
    1. pagination: một đối tượng chứa 3 thuộc tính:
    + page: trang hiện tại
    + limit: số dòng trên mỗi trang
    + totalItem: tổng số Item của danh sách
    2. onPageChange: một function được truyền vào tham số newPage là trang mới khi click vào button
*/
const AppPagination = ({ pagination, onPageChange }) => {
    // Lấy các đối tượng từ props pagination
    const { page, limit, totalItem } = pagination

    // Tính toán tổng số trang
    const totalPage = Math.ceil(totalItem / limit)

    // State lưu chiều rộng hiện tại của trình duyệt
    const [width, setWidth] = useState(window.innerWidth)

    // Hàm cập nhật state width mỗi khi trình duyệt thay đổi độ rộng
    const updateWidth = () => {
        setWidth(window.innerWidth)
    }

    // Effect có tác dụng thêm hàm cập nhật state width cho event resize
    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [])

    // Hàm gọi props onPageChange được truyền vào từ component dùng nó với đối số truyền vào là trang mới cần chuyển hướng
    const handlePageChange = (newPage) => {
        onPageChange(newPage)
    }

    // Hàm này sẽ trả về một mảng lưu những số (hoặc dấu ...) cần hiển thị ra UI tùy thuộc vào chiều rộng của màn hình (đã responsive)
    const fetchListPage = () => {
        // Khởi tạo listPage là mảng rỗng
        const listPage = []

        // Thực hiện push những gì cần hiển thị vào listPage tùy thuộc vào giá trị cửa width
        if (width < 576) {
            if (totalPage >= 8) {
                if (page < 2) {
                    for (let i = 1; i <= 2; ++i) {
                        listPage.push(i)
                    }
                    listPage.push("...")
                    listPage.push(totalPage)
                }
                else if (page > totalPage - 1) {
                    listPage.push(1)
                    listPage.push("...")
                    for (let i = totalPage - 1; i <= totalPage; ++i) {
                        listPage.push(i)
                    }
                }
                else {
                    listPage.push(page - 1)
                    listPage.push(page)
                    listPage.push(page + 1)
                }
            }
            else if (totalPage >= 5) {
                if (page <= 2) {
                    for (let i = 1; i <= 3; ++i) {
                        listPage.push(i)
                    }
                    listPage.push("...")
                    listPage.push(totalPage)
                }
                else if (page > totalPage - 2) {
                    listPage.push(1)
                    listPage.push("...")
                    for (let i = totalPage - 2; i <= totalPage; ++i) {
                        listPage.push(i)
                    }
                }
                else {
                    listPage.push(1)
                    listPage.push("...")
                    for (let i = page - 1; i <= page + 1; ++i) {
                        listPage.push(i)
                    }
                    listPage.push("...")
                    listPage.push(totalPage)
                }
            }
            else {
                for (let i = 1; i <= totalPage; ++i) {
                    listPage.push(i)
                }
            }
        }
        else if (width < 992) {
            if (totalPage >= 8) {
                if (page < 3) {
                    for (let i = 1; i <= 3; ++i) {
                        listPage.push(i)
                    }
                    listPage.push("...")
                    listPage.push(totalPage)
                }
                else if (page > totalPage - 2) {
                    listPage.push(1)
                    listPage.push("...")
                    for (let i = totalPage - 2; i <= totalPage; ++i) {
                        listPage.push(i)
                    }
                }
                else {
                    listPage.push(1)
                    listPage.push("...")
                    for (let i = page - 1; i <= page + 1; ++i) {
                        listPage.push(i)
                    }
                    listPage.push("...")
                    listPage.push(totalPage)
                }
            }
            else if (totalPage >= 5) {
                if (page <= 2) {
                    for (let i = 1; i <= 3; ++i) {
                        listPage.push(i)
                    }
                    listPage.push("...")
                    listPage.push(totalPage)
                }
                else if (page > totalPage - 2) {
                    listPage.push(1)
                    listPage.push("...")
                    for (let i = totalPage - 2; i <= totalPage; ++i) {
                        listPage.push(i)
                    }
                }
                else {
                    listPage.push(1)
                    listPage.push("...")
                    for (let i = page - 1; i <= page + 1; ++i) {
                        listPage.push(i)
                    }
                    listPage.push("...")
                    listPage.push(totalPage)
                }
            }
            else {
                for (let i = 1; i <= totalPage; ++i) {
                    listPage.push(i)
                }
            }
        }
        else {
            if (totalPage >= 8) {
                if (page < 4) {
                    for (let i = 1; i <= 4; ++i) {
                        listPage.push(i)
                    }
                    listPage.push("...")
                    listPage.push(totalPage)
                }
                else if (page > totalPage - 3) {
                    listPage.push(1)
                    listPage.push("...")
                    for (let i = totalPage - 3; i <= totalPage; ++i) {
                        listPage.push(i)
                    }
                }
                else {
                    listPage.push(1)
                    listPage.push("...")
                    for (let i = page - 2; i <= page + 2; ++i) {
                        listPage.push(i)
                    }
                    listPage.push("...")
                    listPage.push(totalPage)
                }
            }
            else if (totalPage >= 5) {
                if (page <= 2) {
                    for (let i = 1; i <= 3; ++i) {
                        listPage.push(i)
                    }
                    listPage.push("...")
                    listPage.push(totalPage)
                }
                else if (page > totalPage - 2) {
                    listPage.push(1)
                    listPage.push("...")
                    for (let i = totalPage - 2; i <= totalPage; ++i) {
                        listPage.push(i)
                    }
                }
                else {
                    listPage.push(1)
                    listPage.push("...")
                    for (let i = page - 1; i <= page + 1; ++i) {
                        listPage.push(i)
                    }
                    listPage.push("...")
                    listPage.push(totalPage)
                }
            }
            else {
                for (let i = 1; i <= totalPage; ++i) {
                    listPage.push(i)
                }
            }
        }
        return listPage
    }

    return (
        <div className="d-table m-auto">
            <Pagination
            className="col"
            size={
                width < 576 ? "sm" : (width < 992 ? "" : "lg")
            }
            >
                <Pagination.Item
                    disabled={page <= 1}
                    onClick={() => handlePageChange(page - 1)}
                >
                    <BsChevronLeft />
                </Pagination.Item>
                {
                    fetchListPage().map((page, index) => {
                        if (page === page) {
                            return (
                                <Pagination.Item
                                    key={index}
                                    active
                                >
                                    {page}
                                </Pagination.Item>
                            )
                        }
                        else if (page === "...") {
                            return (
                                <Pagination.Item
                                    disabled
                                    key={index}
                                >
                                    {page}
                                </Pagination.Item>
                            )
                        }
                        else {
                            return (
                                <Pagination.Item
                                    key={index}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </Pagination.Item>
                            )
                        }
                    })
                }
                <Pagination.Item
                    disabled={page >= totalPage}
                    onClick={() => handlePageChange(page + 1)}
                >
                    <BsChevronRight />
                </Pagination.Item>
            </Pagination>
        </div>
    )
}

export default AppPagination