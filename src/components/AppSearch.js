import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
/*
    
*/
const AppSearch = ({ value, onSearch }) => {
    return (

        <div className="d-flex justify-content-center">
            <div
                className="d-inline-flex form-control py-1"
                style={{ borderRadius: "0.5rem" }}
            >
                <input
                    className="w-100"
                    type="search"
                    style={{
                        border: "none",
                        outline: "none",
                        color: "#2F6BB1",
                        fontSize: "14px"
                    }}
                    placeholder="Tìm kiếm..."
                    value={value?.name || ""}
                    onChange={(e) => onSearch({
                        ...value,
                        name: e.target.value
                    })}
                />
                <BiSearchAlt
                    className="mx-auto h-100"
                    style={{
                        marginTop: "0.1rem"
                    }}
                    size={20}
                />
            </div>
        </div>
    )
}

export default AppSearch