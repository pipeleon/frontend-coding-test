import NavBar from '../../components/nav'
import {
    Button,
    Card,
    Container,
    Row,
    Col,
    Form,
} from "react-bootstrap";
import { useRouter } from 'next/router';
import { useState } from 'react'
import 'bootswatch/dist/lux/bootstrap.min.css';



export const getStaticProps = async () => {   

    const res = await fetch('http://localhost:3001/people');
    const data = await res.json();

    console.log(data)

    return {
        props: { people: data.sort((a, b) => a.age > b.age ? 1 : -1) }
    }
}

function NewProfile({ people }) {
    const [fullName, setName] = useState("")
    const [age, setAge] = useState("")
    const [occupation, setOccupation] = useState("")
    const [nickname, setNick] = useState("")
    const [gender, setGender] = useState("")
    const [picture, setPicture] = useState("")
    const [id, setId] = useState(people.length + 1)
    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            id,
            fullName,
            age: parseInt(age),
            occupation,
            nickname,
            gender,
            picture
        }

        const res = await fetch('http://localhost:3001/people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(res)
        refreshData()
    }


    return (<>
        <NavBar />
        <Container className='pt-4'>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">Create Profile No. {id}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <label>Full Name</label>
                                        <Form.Control onChange={(e) => setName(e.target.value)}
                                            value={fullName}
                                            type="text"></Form.Control>
                                    </Col>
                                    <Col>
                                        <label>Nickname</label>
                                        <Form.Control onChange={(e) => setNick(e.target.value)}
                                            value={nickname}
                                            type="text"></Form.Control>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>Age</label>
                                        <Form.Control onChange={(e) => setAge(e.target.value)}
                                            value={age}
                                            type="text"></Form.Control>
                                    </Col>
                                    <Col>
                                        <label>Gender</label>
                                        <Form.Control onChange={(e) => setGender(e.target.value)}
                                            value={gender}
                                            type="text"></Form.Control>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>Occupation</label>
                                        <Form.Control onChange={(e) => setOccupation(e.target.value)}
                                            value={occupation}
                                            type="text"></Form.Control>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>Picture URL</label>
                                        <Form.Control onChange={(e) => setPicture(e.target.value)}
                                            value={picture}
                                            type="text"></Form.Control>
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

export default NewProfile