import React from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const Info = () => {
    const params = useParams()
    console.log(params)
    return (
        <Card>
            <Card.Body>
                {params.id}
            </Card.Body>
        </Card>
    )
}

export default Info