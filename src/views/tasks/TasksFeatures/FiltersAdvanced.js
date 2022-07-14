import React, { useState } from 'react'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'

const FiltersAdvanced = () => {
    return (
        <div className="filters_advanced">
            <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={
                    <Popover id="task-filters-advanced">
                        <Popover.Body>
                        <div className="d-flex justify-content-center">
                            <div className="col-4">
                                <div className="fw-bolder">
                                    CÔNG VIỆC
                                </div>
                            </div>
                            <div className="col-1" style={{
                                width: "1px",
                                height: "200px",

                                border: "0.5px solid #2391F5"
                            }}>

                            </div>
                            <div className="col-6">
                                <div className="fw-bolder">
                                    TRẠNG THÁI
                                </div>
                            </div>
                        </div>
                        </Popover.Body>
                    </Popover>
                }
            >
                <Button variant="outline-primary">
                    <span className="fw-bold">
                        Lọc nâng cao
                    </span>
                </Button>
            </OverlayTrigger>
        </div>
    )
}

export default FiltersAdvanced