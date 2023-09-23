import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

const UserItem = ({data}) => {
  return (
    <>
     <Card style={{ width: '18rem', margin: '1rem' }}>
                        <Card.Header className='fw-bold'>{data.name}</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{data.email}</ListGroup.Item>
                            <ListGroup.Item>{data.role}</ListGroup.Item>
                            <ListGroup.Item>{data.createdAt}</ListGroup.Item>
                        </ListGroup>
                    </Card>   
    </>
  )
}

export default UserItem