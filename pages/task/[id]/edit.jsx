import NavBar from '../../../components/nav'
import {
    Button,
    Card,
    Container,
    Row,
    Col,
    Form,
} from "react-bootstrap";
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react'
import 'bootswatch/dist/lux/bootstrap.min.css';

export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:3001/tasks');
    const data = await res.json();

    // map data to an array of path objects with params (id)
    const paths = data.map(task => {
        return {
            params: { id: task.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('http://localhost:3001/tasks/' + id);
    const data = await res.json();


    return {
        props: { task: data }
    }
}

function EditTask({ task }) {
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [completed, setStatus] = useState(task.completed)
    const [startDate, setDate] = useState(task.startDate)
    const [endDate, setEnd] = useState(task.endDate)
    const [personId, setPerson] = useState(task.personId)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            id: task.id,
            title,
            description,
            completed,
            startDate,
            startDate,
            personId
        }

        const res = await fetch('http://localhost:3001/tasks/' + task.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(res)
        router.back()
    }


    return (<>
        <NavBar />
        <Container className='pt-4'>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">Edit Task No. {task.id}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <label>Title</label>
                                        <Form.Control onChange={(e) => setTitle(e.target.value)}
                                            value={title}
                                            type="text"></Form.Control>
                                    </Col>
                                    <Col>
                                        <label>Completed (Yes/No)</label>
                                        <Form.Control onChange={(e) => setStatus(e.target.value == "Yes" ? true : false)}
                                            value={completed ? "Yes" : "No"}
                                            type="text"></Form.Control>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>Description</label>
                                        <Form.Control onChange={(e) => setDescription(e.target.value)}
                                            value={description}
                                            type="text"></Form.Control>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>Start Date</label>
                                        <Form.Control onChange={(e) => setDate(e.target.value)}
                                            value={startDate}
                                            type="text"></Form.Control>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>End Date (optional)</label>
                                        <Form.Control onChange={(e) => setEnd(e.target.value)}
                                            value={endDate}
                                            type="text"></Form.Control>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>Person Id</label>
                                        <Form.Control onChange={(e) => setPerson(e.target.value)}
                                            value={personId}
                                            type="text"></Form.Control>
                                    </Col>
                                </Row>
                                <Row className='pt-4'>
                                    <Col md='10' className='px-3 '>
                                        <Link href={{ pathname: 'http://localhost:3000/profile/' + task.personId }}>Cancel</Link>
                                    </Col>
                                    <Col>
                                        <Button type="submit">Guardar</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
    )
}

export default EditTask