import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { Badge } from "reactstrap";

import DashItem from "./DashItem";
import AddNewItem from "./AddNewItem";
import {fetchStationInfo, getSensorValues, getStationStatus } from '../../../functions/apiActions'

import "../../../assets/css/dash.css";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      stations: [
        /*{
          station_id: "1",
          station_name: "One",
          station_type: "farmer",
          location: {
            lat: "13.752126",
            long: "100.522403",
          },
          values: {
            ph: {
              status: true,
              value: "1.0",
              threshold: {
                min: "1.0",
                max: "2.0",
              },
            },
            turbidity: {
              status: true,
              value: "1.0",
              threshold: {
                min: "1.0",
                max: "2.0",
              },
            },
            temperature: {
              status: true,
              value: "1.0",
              threshold: {
                min: "1.0",
                max: "2.0",
              },
            },
            do: {
              status: true,
              value: "1.0",
              threshold: {
                min: "1.0",
                max: "2.0",
              },
            },
          },
          time: "DD/MM/YYYY",
        },
        {
          station_id: "2",
          station_name: "Two",
          station_type: "livestock",
          location: {
            lat: "13.852100",
            long: "100.622500",
          },
          values: {
            ph: {
              status: true,
              value: "1.0",
              threshold: {
                min: "1.0",
                max: "2.0",
              },
            },
            turbidity: {
              status: true,
              value: "1.0",
              threshold: {
                min: "1.0",
                max: "2.0",
              },
            },
            temperature: {
              status: true,
              value: "1.0",
              threshold: {
                min: "1.0",
                max: "2.0",
              },
            },
            do: {
              status: false,
              value: "1.0",
              threshold: {
                min: "1.0",
                max: "2.0",
              },
            },
          },
          time: "DD/MM/YYYY",
        },*/
      ],
    };
  }

  refreshDashboard = () => {
    fetchStationInfo().then(fetchedStations => {
      if (fetchedStations == null || fetchedStations == undefined || fetchedStations == false) {
        fetchedStations = []
      }
      console.log(fetchedStations);
      const stations = []
      const sensorValues = fetchedStations.map((station, index) => {
        console.log(station);
        if (station.stationId != "") {
          return getSensorValues(station.stationId).then(values => {
            return getStationStatus(station.stationId).then(status => {
              console.log(values);
              console.log("push ", station.stationId);
              stations.push({
                station_id: station.stationId,
                station_name: station.stationName,
                station_type: station.type,
                station_status: status != false ? status.toUpperCase() : "NULL",
                location: {
                  lat: station.latitude,
                  long: station.longitude,
                },
                values: {
                  ph: {
                    status: station.phSensorStatus == "enable" ? true : false,
                    value: !values ? "NULL" : values.ph != "" ? values.ph : 0,
                    threshold: {
                      min: !isNaN(station.phMin) ? station.phMin : 0,
                      max: !isNaN(station.phMax) ? station.phMax : 0,
                    },
                  },
                  turbidity: {
                    status: station.turbiditySensorStatus == "enable" ? true : false,
                    value: !values ? "NULL" : values.turbidity != "" ? values.turbidity : 0,
                    threshold: {
                      min: !isNaN(station.turbMin) ? station.turbMin : 0,
                      max: !isNaN(station.turbMax) ? station.turbMax : 0,
                    },
                  },
                  temperature: {
                    status: station.tempSensorStatus == "enable" ? true : false,
                    value: !values ? "NULL" : values.temperature != "" ? values.temperature : 0,
                    threshold: {
                      min: !isNaN(station.tempMin) ? station.tempMin : 0,
                      max: !isNaN(station.tempMax) ? station.tempMax : 0,
                    },
                  },
                  do: {
                    status: station.doSensorStatus == "enable" ? true : false,
                    value: !values ? "NULL" : values.do != "" ? values.do : 0,
                    threshold: {
                      min: !isNaN(station.doMin) ? station.doMin : 0,
                      max: !isNaN(station.doMax) ? station.doMax : 0,
                    },
                  },
                  ec: {
                    status: station.ecSensorStatus == "enable" ? true : false,
                    value: !values ? "NULL" : values.ec != "" ? values.ec : 0,
                    threshold: {
                      min: !isNaN(station.ecMin) ? station.ecMin : 0,
                      max: !isNaN(station.ecMax) ? station.ecMax : 0,
                    },
                  },
                },
                time: !values ? "NULL" : values.dateTime != "" ? values.dateTime : "NULL",
              })
            })
          })
        }
      })
      // Wait for all requests, and then setState
      Promise.all(sensorValues).then(() => {
        this.setState({
          stations: stations
        });
      });
    })
  }

  componentDidMount() {
    this.refreshDashboard()
  }



  setLocation = (location, station_id) => {
    console.log(location.lat(), location.lng(), station_id);

    for (var index in this.state.stations) {
      if (this.state.stations[index].station_id == station_id) {
        console.log(this.state.stations[index].station_id, "==", station_id);
        this.state.stations[index].location = {
          lat: location.lat(),
          long: location.lng()
        }
        this.forceUpdate()
/*
        this.setState(({stations}) => ({
          stations: [
            ...stations.slice(index-1, index),
            {
              ...stations[index],
              location: {
                lat: location.lat(),
                long: location.lng()
              },
              ...stations.slice(index+1)
            }
          ]
        }))*/
      }

    }

    console.log(this.state.stations);
  };

  render() {
    if (this.state.loading) {
      return (<></>)
    }
    console.log(this.state.stations);
    console.log(this.state.stations2);
    return (
      <Container className="mb-5">
         <h2 className="mt-4 mb-5">อุปกรณ์</h2>
        <Row>
          <Col>
            <div className="d-flex flex-wrap justify-content-center align-items-stretch">
              <AddNewItem />
              {this.state.stations.map((station, index) => {
                return (
                  <DashItem key={station.station_id} station={station} setLocation={this.setLocation} refresh={this.refreshDashboard}/>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
