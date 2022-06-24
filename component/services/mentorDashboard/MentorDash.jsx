import React from "react";
import { Row, Col, Tab, Card, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import MentorProfile from "../../../components/mentorDashboard/MentorProfile";
import AppointmentsCard from "../../../components/appointments/AppointmentsCard";
import MentorMatches from "../../../components/mentorDashboard/MentorMatches";

const MentorDashboard = (props) => {
  return (
    <>
      <Row>
        <Col>
          <div className="page-title-box">
            <div className="page-title-right"></div>
            <h4 className="page-title">Mentor Dashboard</h4>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xl={4} lg={5}>
          <MentorProfile />
        </Col>

        <Col xl={8} lg={7}>
          <Tab.Container>
            <Card>
              <Card.Body>
                <Nav
                  variant="pills"
                  className="nav nav-pills bg-nav-pills nav-justified mb-3"
                >
                  <Nav.Item className="nav-item">
                    <Nav.Link
                      href="#"
                      eventKey="calendar"
                      className="nav-link rounded-0"
                    >
                      Calendar
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item">
                    <Nav.Link
                      href="#"
                      eventKey="menteeMatches"
                      className="nav-link rounded-0"
                    >
                      Matches
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item">
                    <Nav.Link
                      href="#"
                      eventKey="editprofile"
                      className="nav-link rounded-0"
                    >
                      Edit Profile
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="calendar">
                    <AppointmentsCard />
                  </Tab.Pane>
                </Tab.Content>

                <Tab.Content>
                  <Tab.Pane eventKey="menteeMatches">
                    <MentorMatches currentUser={props.currentUser} />
                  </Tab.Pane>
                </Tab.Content>

                <Tab.Content>
                  <Tab.Pane eventKey="editprofile"></Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </>
  );
};

MentorDashboard.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

export default MentorDashboard;
