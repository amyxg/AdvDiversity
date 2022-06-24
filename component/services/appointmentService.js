import axios from "axios";

let appointmentService = {
  endpoint: `${process.env.REACT_APP_API_HOST_PREFIX}/api/appointments`,
};

appointmentService.getAppointments = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${appointmentService.endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config);
};

export default appointmentService;
