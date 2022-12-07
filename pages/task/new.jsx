import NavBar from '../../components/nav'
import {
    Badge,
    Button,
    Card,
    Table,
    Container,
    Row,
    Col,
    Form,
} from "react-bootstrap";
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react'
import 'bootswatch/dist/lux/bootstrap.min.css';

export const getStaticProps = async () => {
    const res = await fetch('http://localhost:3001/tasks');
    const data = await res.json();


    return {
        props: { tasks: data }
    }
}

function NewTask({ tasks }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [completed, setStatus] = useState("No")
    const [startDate, setDate] = useState("")
    const [endDate, setEnd] = useState("")
    const [personId, setPerson] = useState("")
    const [id, setId] = useState(tasks.lenght + 1)
    const router = useRouter()

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const handleSubmit = async () => {
        const data = {
            id,
            title,
            description,
            completed,
            startDate,
            startDate,
            personId: parseInt(personId)
        }

        const res = await fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(res)
        //refreshData()
    }


    return (<>
        <NavBar />
        <Container className='pt-4'>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">Create Task</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={() => handleSubmit()}>
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
                                            value={completed}
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
                                        <label>End Date</label>
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

export default NewTask