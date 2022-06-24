import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import mentorProfile from "../../services/mentorProfileService";
import * as toastr from "toastr";
import "toastr/build/toastr.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import debug from "sabio-debug";
const _loggerPage = debug.extend("MentorProfile");

const MentorProfile = () => {
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
    <React.Fragment>
      {profile && (
        <div className="row">
          <div className="card">
            <Card className="text-center">
              <Card.Body>
                <img
                  src={profile.imageUrl}
                  className="rounded-circle avatar-lg img-thumbnail"
                  alt="https://styleoflady.com/wp-content/uploads/2018/04/40371225585_e0ef7fa08e_b.jpg"
                />
                <h4 className="mb-0 mt-2">
                  {profile.firstName} {profile.lastName}
                </h4>
                <p className="text-muted font-13">Web Developer</p>
                <p className="text-muted mb-2 font-13">
                  <span className="ms-2">{profile.phoneNumber}</span>
                </p>
                <button type="button" className="btn btn-success btn-sm mb-2">
                  Zoom
                </button>{" "}
                <button type="button" className="btn btn-danger btn-sm mb-2">
                  Message
                </button>
                <div className="text-start mt-3">
                  <h4 className="font-13 text-uppercase">About Me :</h4>
                  <p className="text-muted font-13 mb-3">
                    {profile.description}
                  </p>
                  <p className="text-muted mb-1 font-13">
                    <strong>Specialty :</strong>
                    {profile.specialty?.map((items) => (
                      <p className="text-muted font-13 mb-3" key={items.id}>
                        {items.name}
                      </p>
                    ))}
                  </p>
                  <p className="text-muted mb-2 font-13">
                    <strong>Email :</strong>
                    <span className="ms-2 ">mentor295@email.domain</span>
                  </p>
                  <p className="text-muted mb-1 font-13">
                    <strong>Location :</strong>
                    <span className="ms-2">Los Angeles, USA</span>
                  </p>
                  <p className="text-muted mb-1 font-13">
                    <strong>Focus Areas :</strong>
                  </p>
                </div>
                <ul className="social-list list-inline mt-3 mb-0">
                  <li className="list-inline-item">
                    <Link
                      to="#"
                      className="social-list-item border-primary text-primary"
                    >
                      <FontAwesomeIcon icon={faFacebook} />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link
                      to="#"
                      className="social-list-item border-danger text-danger"
                    >
                      <FontAwesomeIcon icon={faGoogle} />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link
                      to="#"
                      className="social-list-item border-info text-info"
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link
                      to="#"
                      className="social-list-item border-secondary text-secondary"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </Link>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MentorProfile;
