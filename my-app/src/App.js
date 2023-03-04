import React from 'react'
import { DirectoryFiles } from './components/DirectoryFiles'
import {Container, Row, Col} from 'react-bootstrap'

const App = () => {
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col style={{'backgroundColor': '#03035f', 'height': '100vh'}}></Col>
          <Col lg={10}>
            <h3>Dashboard</h3>
            <DirectoryFiles></DirectoryFiles>
          </Col>
        </Row>
      </Container>
      
    </React.Fragment>
  )
}

export default App