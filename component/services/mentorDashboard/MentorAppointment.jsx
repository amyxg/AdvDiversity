import React, { useEffect, useState } from "react";
import appointmentService from "../../services/appointmentsService";
import SimpleBar from "simplebar-react";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
import * as toastr from "toastr";
import "toastr/build/toastr.css";
import debug from "sabio-debug";
const _logger = debug.extend("appointmentCard");

function MentorAppointment() {
  const [state, setState] = useState();

  useEffect(() => {
    appointmentService
      .getMentorAppts(0, 5)
      .then(onGetAppointmentsSuccess)
      .catch(onGetAppointmentsError);
  }, []);

  const onGetAppointmentsSuccess = (response) => {
    _logger(response.item.pagedItems[0]);
    setState(() => {
      let newState = response.item.pagedItems.map(mapAppointmentElements);
      return newState;
    });
  };

  const mapAppointmentElements = (appt) => {
    const date = moment(appt.apptDateTime + "Z").format("D MMM YYYY");
    const time = moment(appt.apptDateTime + "Z").format("hh:mm");
    return (
      <Row>
        <Col>
          <div className=" col-md-6" key={`appointment_${appt.id}`}>
            <div className="timeline-item-info">
              <h3 className="text-info fw-bold mb-1 d-block">
                {appt.apptType}
              </h3>
              <h5>{appt.description}</h5>
              <h5 className="mb-0 pb-2 text-muted">
                {date} at {time}
              </h5>
            </div>
          </div>
        </Col>
        <Col>
          <div className="col-md-6 p-2">
            <h4>Mentee: {appt.menteeId}</h4>
            <div>
              <div>
                <img
                  src={appt.avatarUrl}
                  className="rounded-circle avatar-sm img-thumbnail  "
                  alt=""
                />
                <h4 className="mb-0 mt-2 ">
                  {appt.firstName} {appt.lastName}
                </h4>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  };
  const onGetAppointmentsError = (response) => {
    _logger(response);
    toastr.error("Could not retrieve appointments");
  };
  return (
    <>
      <div className="row">
        <h2 className="text-secondary m-2">My Appointments</h2>
        <hr />
        <SimpleBar
          className="px-3"
          style={{ maxHeight: "337px", width: "100%" }}
        >
          {state && state}
          {!state && <h3>Loading Appointments...</h3>}
        </SimpleBar>
      </div>
    </>
  );
}

export default MentorAppointment;
