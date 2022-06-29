import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalSuccess,
  onGlobalError,
} from "../services/serviceHelpers";

const appointmentServiceApi = `${API_HOST_PREFIX}/api/appointments`;

const getAppointments = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${appointmentServiceApi}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getMentorAppts = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${appointmentServiceApi}/mentorAppts?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const appointmentService = {
  getAppointments,
  getMentorAppts,
};

export default appointmentService;
