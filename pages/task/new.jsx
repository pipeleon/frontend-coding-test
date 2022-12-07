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
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootswatch/dist/lux/bootstrap.min.css';

export const getStaticProps = async () => {
    const res = await fetch('http://localhost:3001/tasks');
    const data = await res.json();
    const res2 = await fetch('http://localhost:3001/people');
    const data2 = await res2.json();


    return {
        props: { tasks: data, people: data2 }
    }
}

function NewTask({ tasks, people }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [completed, setStatus] = useState("No")
    const [startDate, setDate] = useState("")
    const [endDate, setEnd] = useState("")
    const [personName, setName] = useState ("Select")
    const [personId, setPerson] = useState("")
    const [id, setId] = useState(tasks.lenght + 1)
    const router = useRouter()

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            id,
            title,
            description,
            completed: completed == "Yes" ? true : false,
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
        alert("Task Created!")
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
                                        <Form.Control onChange={(e) => setStatus(e.target.value)}
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
                                        <label>End Date (optional)</label>
                                        <Form.Control onChange={(e) => setEnd(e.target.value)}
                                            value={endDate}
                                            type="text"></Form.Control>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='pt-2'>
                                        <label>Responsible</label>
                                        <Dropdown className='pt-1'>
                                            <Dropdown.Toggle id="dropdown-basic">
                                                {personName}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {
                                                    people.map((person) =>
                                                    <Dropdown.Item onClick={() => {
                                                        setName(person.fullName)
                                                        setPerson(person.id)
                                                    }}>{person.fullName}</Dropdown.Item>)
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row>
                                <Row className='pt-4'>
                                    <Col md='10' className='px-3 '>
                                    </Col>
                                    <Col>
                                        <Button type="submit">Save</Button>
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