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
import { useState } from 'react'
import 'bootswatch/dist/lux/bootstrap.min.css';

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3001/people');
  const data = await res.json();

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


  return {
    props: { person: data }
  }
}

function Edit({ person }) {
  const [fullName, setName] = useState(person.fullName)
  const [age, setAge] = useState(person.age)
  const [occupation, setOccupation] = useState(person.occupation)
  const [nickname, setNick] = useState(person.nickname)
  const [gender, setGender] = useState(person.gender)
  const [picture, setPicture] = useState(person.picture)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: person.id,
      fullName,
      age,
      occupation,
      nickname,
      gender,
      picture
    }

    const res = await fetch('http://localhost:3001/people/' + person.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log(res)
    alert("The changes has been Saved!")
}


  return (<>
    <NavBar />
    <Container className='pt-4'>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h4">Edit Person No. {person.id}</Card.Title>
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
                    <Link href={{ pathname: 'http://localhost:3000/profile/' + person.id }}>Back</Link>
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

export default Edit