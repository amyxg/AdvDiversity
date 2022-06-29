import React, { useState, useEffect } from "react";
import { Row, Col, Tab, Card, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import MentorProfile from "../../../components/mentordashboard/MentorProfile";
import MentorAppointment from "../../../components/mentordashboard/MentorAppointment";
import MentorMatches from "../../../components/mentordashboard/MentorMatches";
import mentorProfile from "../../../services/mentorProfileService";
import * as toastr from "toastr";
import "toastr/build/toastr.css";
import debug from "sabio-debug";
const _loggerPage = debug.extend("MentorProfileProps");

const MentorDashboard = (props) => {
  const [profile, setMentor] = useState({});

  useEffect(() => {
    mentorProfile
      .getMentorProfile()
      .then(onGetMentorSuccess)
      .catch(onGetMentorError);
  }, []);

  const onGetMentorSuccess = (response) => {
    _loggerPage("onGetMentorSuccess -->", response);
    let profile = { ...response.item };
    setMentor(profile);
  };

  const onGetMentorError = (err) => {
    _loggerPage("onGetAllProfilesError -->", err);
    toastr.error("Could not retrieve Mentor");
  };
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
        <Col sm={3}>
          <MentorProfile mentorInfo={profile} />
        </Col>

        <Col>
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
                    <MentorAppointment />
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
