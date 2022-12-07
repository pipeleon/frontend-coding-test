import NavBar from '../components/nav'
import {
  Badge,
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Link from 'next/link'
import { useRouter } from 'next/router';
import 'bootswatch/dist/lux/bootstrap.min.css';
import { useState } from 'react';

// import TablePeople from '../components/tablePeople'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3001/people');
  const data = await res.json();

  console.log(data)

  return {
    props: { people: data.sort((a, b) => a.age > b.age ? 1 : -1) }
  }
}

function HomePage({ people }) {
  const [data, setData] = useState(people)

  const sortNameDes = (e) => {
    e.preventDefault();
    const sorted = [...data].sort((a, b) => a.fullName < b.fullName ? 1 : -1)
    setData(sorted)
  }

  const sortNameAsc = (e) => {
    e.preventDefault();
    const sorted = [...data].sort((a, b) => a.fullName > b.fullName ? 1 : -1)
    setData(sorted)
  }

  const sortAgeDes = (e) => {
    e.preventDefault();
    const sorted = [...data].sort((a, b) => a.age < b.age ? 1 : -1)
    setData(sorted)
  }

  const sortAgeAsc = (e) => {
    e.preventDefault();
    const sorted = [...data].sort((a, b) => a.age > b.age ? 1 : -1)
    setData(sorted)
  }

  const sortOcuDes = (e) => {
    e.preventDefault();
    const sorted = [...data].sort((a, b) => a.occupation < b.occupation ? 1 : -1)
    setData(sorted)
  }

  const sortOcuAsc = (e) => {
    e.preventDefault();
    const sorted = [...data].sort((a, b) => a.occupation > b.occupation ? 1 : -1)
    setData(sorted)
  }

  return (<>
    <NavBar />
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h4">People</Card.Title>
            </Card.Header>
            <Card.Body className='table-full-width table-responsive px-0'>
              <Table className='table-hover table-striped'>
                <thead>
                  <tr>
                    <th>Picture</th>
                    <th>Full Name <a onClick={sortNameDes}>&#129045;</a> <a onClick={sortNameAsc}>&#129047;</a></th>
                    <th>Age <a onClick={sortAgeDes}>&#129045;</a> <a onClick={sortAgeAsc}>&#129047;</a></th>
                    <th>Occupation <a onClick={sortOcuDes}>&#129045;</a> <a onClick={sortOcuAsc}>&#129047;</a></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((person) =>
                      <tr key={person.id}>
                        <td><img width="80" height="80" src={person.picture} /></td>
                        <td>{person.fullName}</td>
                        <td>{person.age}</td>
                        <td>{person.occupation}</td>
                        <td><Link href={"/profile/" + person.id}>View</Link></td>
                      </tr>)
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </>)
}

export default HomePage