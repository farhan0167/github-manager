import React from 'react'
import { DirectoryFiles } from './components/DirectoryFiles'
import {Container, Row, Col} from 'react-bootstrap'
import './index.css'

const App = () => {
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          {/*<Col style={{'backgroundColor': '#00223B', 'height': '100%'}}></Col>*/}
          <Col lg={10} className='dashboard-cont'>
            <h2>Git Manager Dashboard</h2>
            <DirectoryFiles></DirectoryFiles>
            
          </Col>
        </Row>
      </Container>
      
    </React.Fragment>
  )
}

export default App