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
import 'bootswatch/dist/lux/bootstrap.min.css';

export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:3001/people');
    const data = await res.json();

    // map data to an array of path objects with params (id)
    const paths = data.map(person => {
        return {
            params: { id: person.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('http://localhost:3001/people/' + id);
    const data = await res.json();
    const res2 = await fetch('http://localhost:3001/tasks?personId=' + id);
    const data2 = await res2.json();

    return {
        props: { person: data, tasks: data2 }
    }
}

const Details = ({ person, tasks }) => {
    const router = useRouter();
    
    const refreshData = () => {
        router.replace(router.asPath);
    }

    const handleButton = async (task, status) => {
        const data = task
        data.completed = !status

        const res = await fetch('http://localhost:3001/tasks/' + task.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(res)
        refreshData()
    }

    return (
        <>
            <NavBar />
            <Container className='pt-4'>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">{person.fullName}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <label>Nickname</label>
                                            <Form.Control disabled={true}
                                                value={person.nickname}
                                                type="text"></Form.Control>
                                        </Col>
                                        <Col>
                                            <label>Id</label>
                                            <Form.Control disabled={true}
                                                value={person.id}
                                                type="text"></Form.Control>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>Age</label>
                                            <Form.Control disabled={true}
                                                value={person.age}
                                                type="text"></Form.Control>
                                        </Col>
                                        <Col>
                                            <label>Gender</label>
                                            <Form.Control disabled={true}
                                                value={person.gender}
                                                type="text"></Form.Control>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>Occupation</label>
                                            <Form.Control disabled={true}
                                                value={person.occupation}
                                                type="text"></Form.Control>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Link href={{ pathname: 'http://localhost:3000/profile/' + person.id + '/edit'}}>Edit</Link>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <img src={person.picture} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Tasks</Card.Title>
                            </Card.Header>
                            <Card.Body className='table-full-width table-responsive px-0'>
                                <Table className='table-hover table-striped'>
                                    <thead>
                                        <tr>
                                            <th>Title</th>                                            
                                            <th></th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tasks.map((task) =>
                                                <tr key={task.id}>
                                                    <td>{task.title}</td>
                                                    <td><Link href={{ pathname: 'http://localhost:3000/task/' + task.id + '/edit'}}>Edit</Link></td>
                                                    <td>{task.description}</td>
                                                    <td>{task.completed ? 'Completed' : 'Uncompleted'}</td>
                                                    <td><Button onClick={() => handleButton(task, task.completed)}>{task.completed ? 'Mark as uncompleted' : 'Mark as completed'}</Button></td>                                                    
                                                </tr>)
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Details;