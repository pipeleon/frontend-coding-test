import NavBar from '../components/nav'
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import 'bootswatch/dist/lux/bootstrap.min.css';

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
  console.log(people)
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
                <th>Full Name</th>
                <th>Age</th>
                <th>Occupation</th>
              </tr>
            </thead>
            <tbody>
              {
                people.map((person) =>
                <tr key={person.id}>
                  <td><img width="80" height="80" src={person.picture}/></td>
                  <td>{person.fullName}</td>
                  <td>{person.age}</td>
                  <td>{person.occupation}</td>
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