// imports

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// setups

const app = express();
const port = process.env.PORT || 1880;

process.env.SECRET_KEY = "secret";

// cors

var whitelist = ["http://localhost"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false, credentials: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// configs

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// endpoints

app.post("/startMeasure", cors(corsOptionsDelegate), (req, res) => {
  if (req.body.deviceId == "001") {
    setTimeout(function () {
      res.send({
        status: "success",
      });
    }, 5000);
  } else {
    res.send({
      status: "fail",
      reason: "incorrect_deviceid",
    });
  }
});

app.post("/login", cors(corsOptionsDelegate), (req, res) => {
  let token = "THISISATOKEN";

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000,
  });

  res.send({
    status: "success",
  });
});

app.get("/auth", cors(corsOptionsDelegate), (req, res) => {
  let token = "THISISATOKEN";

  if (req.cookies["token"] == token) {
    res.send({
      status: "success",
    });
  } else {
    res.send({
      status: "unsuccess",
    })
  }
});

app.post("/getSensorValues", cors(corsOptionsDelegate), (req, res) => {
  res.send({
    status: "success",
    values: {
      time: new Date(),
      ec: 3.42,
      temp: -127.0,
      turbidity: 3.64,
      ph: 3.18
    }
  });
});

app.get("/fetchStationInfo", cors(corsOptionsDelegate), (req, res) => {
  console.log(req.body);
  res.send({
    status: "success",
    stations: [
      {
        time: new Date(),
        stationId: "001",
        type: "farmer",
        la: "15.0",
        long: "100"
      },
      {
        time: new Date(),
        stationId: "002",
        type: "livestock",
        la: "15.0",
        long: "100.0"
      }
    ]
  })
})

app.post("/getSensorHistory", cors(corsOptionsDelegate), (req, res) => {
  console.log(req.body);
  res.send({
    status: "success",
    history: [
      {
        time: "2020-07-08T17:02:51.330Z",
        ecSensor: 8,
        ip: "0.0.0.0",
        pHSensor: 7,
        stationId: "001",
        temperature: 9,
        turbidity: 10
      },
      {
        time: "2020-07-08T17:02:55.330Z",
        ecSensor: 1,
        ip: "0.0.0.0",
        pHSensor: 5,
        stationId: "001",
        temperature: 10,
        turbidity: 2
      },
      {
        time: "2020-07-08T17:02:59.330Z",
        ecSensor: 4,
        ip: "0.0.0.0",
        pHSensor: 3,
        stationId: "001",
        temperature: 2,
        turbidity: 5
      }
    ]
  })
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
