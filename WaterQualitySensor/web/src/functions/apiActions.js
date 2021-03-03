import React from "react";
import axios from "axios";

// -------------------------- SENSOR Endpoints

export const startMeasure = (body) => {
  return axios
    .post("http://35.187.250.242:1880/startMeasure", body, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.status == "success") {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const fetchStationInfo = () => {
  return axios
    .get("http://35.187.250.242:1880/fetchAllStationInfo", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.status != "fail") {
        return res.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return false;
    });
};

export const getSensorValues = (stationId) => {
  return axios
    .post(
      "http://35.187.250.242:1880/getSensorValues",
      {
        stationId: stationId,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      if (res.data[0].status == "success") {
        return res.data[0].values;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const getStationHistory = (body) => {
  return axios
    .post("http://35.187.250.242:1880/getStationHistory", body, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.status == 200) {
        return res.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const deleteStation = (body) => {
  return axios
    .post("http://35.187.250.242:1880/deleteStation", body, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.status == "success") {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const addNewStationInfo = (body) => {
  return axios
    .post("http://35.187.250.242:1880/addNewStationInfo", body, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res);
      console.log(res.data);
      if (res.data.status == "success") {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const editStation = (body) => {
  return axios
    .post("http://35.187.250.242:1880/editStation", body, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.status == "success") {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const fetchAllStationInfo = (body) => {
  console.log("HEY");
  console.log(body);
  return axios
    .post("http://35.187.250.242:1880/fetchStationInfo", body, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data.status);
      if (res.data.status == "fail") {
        return false;
      } else {
        return res.data;
      }
    })
    .catch((err) => {
      return false;
    });
};

// -------------------------- AUTH Endpoints

export const authenticate = () => {
  return axios
    .get("http://35.187.250.242:1880/auth", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res);
      if (res.data.status == "authorization complete") {
        return res.data.user_data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const login = (body) => {
  return axios
    .post("http://35.187.250.242:1880/login", body)
    .then((res) => {
      console.log(res);
      if (res.data.status == "login success") {
        // console.log(res.headers['authorization']);
        localStorage.setItem("token", res.headers["authorization"]);
        return true;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const register = (body) => {
  return axios
    .post("http://35.187.250.242:1880/register", body)
    .then((res) => {
      console.log(res);
      if (res.data.status == "registor success") {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const stationSetTime = (body) => {
  return axios
    .post("http://35.187.250.242:1880/stationSetTime", body, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.status == "success") {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const editUser = (body) => {
  return axios
    .post("http://35.187.250.242:1880/editUser", body, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.status == "success") {
        return res.data;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const fetchUser = () => {
  return axios
    .get("http://35.187.250.242:1880/fetchUser", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        return res.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteUser = (userId) => {
  return axios
    .post(
      "http://35.187.250.242:1880/deleteUser",
      {
        userId: userId,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      console.log(res);
      if (res.data.status == "success") {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const stationTime = (body) => {
  return axios
    .post(
      "http://35.187.250.242:1880/stationTime",
      body,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      console.log(res);
      if (res.data.status == "success") {
        return res.data.stationTime;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const getStationStatus = (stationId) => {
  return axios
    .post(
      "http://35.187.250.242:1880/getStationStatus",
      {
        stationId: stationId,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      if (res.data.status == "success") {
        return res.data.stationStatus;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
