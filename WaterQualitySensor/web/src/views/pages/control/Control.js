import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CustomInput,
} from "reactstrap";
import { Badge } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Label } from "reactstrap";
import { DateTimePicker } from "react-widgets";
import momentLocalizer from "react-widgets-moment";
import Moment from "moment";
import "react-widgets/dist/css/react-widgets.css";
import "../../../assets/css/history.css"
import LoadingScreenOverlay from "../../elements/LoadingScreenOverlay";
import InfoModal from "../../elements/InfoModal";

import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import {history} from '../../../history'

import { startMeasure, fetchStationInfo, getSensorValues, editStation, stationSetTime, stationTime } from '../../../functions/apiActions'


Moment.locale("en");
momentLocalizer();

const sliderBounds = {
  ph: {
    min: 0.0,
    max: 14.0,
  },
  ec: {
    min: 0.0,
    max: 20.0,
  },
  do: {
    min: 0.0,
    max: 20.0,
  },
  temperature: {
    min: -55.0,
    max: 125.0,
  },
  turbidity: {
    min: 0.0,
    max: 1000.0,
  },
};

class Control extends React.Component {

  constructor() {
    super()
    this.state = {
      loading: true,
      loadingOverlay: false,
      intervalHour: 0,
      intervalMin: 6,
      intervalSec: 0,
      intervalRound: 1,
      modals: {
        infoModal: {
          isOpen: false,
          title: "null",
          body: "null"
        }
      },
      selectedIndex: 0,
      station: {},
      stations: [],
      checkers: {
        ph: {
          status: true,
          threshold: {
            min: "5",
            max: "10"
          }
        },
        turbidity: {
          status: true,
          threshold: {
            min: "5",
            max: "10"
          }
        },
        temperature: {
          status: true,
          threshold: {
            min: "5",
            max: "10"
          }
        },
        do: {
          status: true,
          threshold: {
            min: "5",
            max: "10"
          }
        }
      }
    }
  }

  componentDidMount() {
    this.refreshDashboard()
  }

  refreshDashboard = () => {
    fetchStationInfo().then(fetchedStations => {
      if (fetchedStations == null || fetchedStations == undefined || fetchedStations == false) {
        this.setState({loading: null})
        return false
      }
      console.log(fetchedStations);
      const stations = []
      const sensorValues = fetchedStations.map((station, index) => {
        console.log(station);
        if (station.stationId != "") {
          return getSensorValues(station.stationId).then(values => {
            console.log(values);
            console.log("push ", station.stationId);
            stations.push({
              station_id: station.stationId,
              station_name: station.stationName,
              station_type: station.type,
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
              time: !values ? "NULL" : values.time != "" ? values.time : "NULL",
            })
          })
        }
      })
      // Wait for all requests, and then setState
      Promise.all(sensorValues).then(() => {
        let request = {
          stationId: stations[0].station_id
        }
        console.log(request);
        stationTime(request).then(intervalTime => {
          console.log(intervalTime);
          if (!intervalTime) {
            // do nothing
            this.setState({
              stations: stations,
              selectedIndex: 0,
              station: stations[0]
            }, () => {
              this.setState({loading: false})
            });
          } else {
            // set current interval
            this.setState({
              stations: stations,
              selectedIndex: 0,
              station: stations[0],
              intervalHour: intervalTime.period != "undefined" ? parseInt(intervalTime.period.split(':')[0], 10) : 0,
              intervalMin: intervalTime.period != "undefined" ? parseInt(intervalTime.period.split(':')[1], 10) : 6,
              intervalSec: intervalTime.period != "undefined" ? parseInt(intervalTime.period.split(':')[2], 10) : 0,
              intervalRound: intervalTime.round != "undefined" ? intervalTime.round : 1
            }, () => {
              this.setState({loading: false})
            });
          }
        })
      });
    })
  }


  _handleOnChecked = (value) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          station: {
            ...prevState.station,
            values: {
              ...prevState.station.values,
              [value]: {
                ...prevState.station.values[value],
                status: !this.state.station.values[value].status,
              },
            },
          },
        };
      },
      () => {
        console.log(this.state);
      }
    );
  };

  _handleStartMeasure = () => {
    this.setState({
      loadingOverlay: true
    }, () => {
      startMeasure({stationId: this.state.stations[this.state.selectedIndex].station_id}).then(data => {
        let message = {}
        if (data != null && data.status == 'success') {
          message.title = "สำเร็จ!"
          message.body = "การตรวจสำเร็จ"
        } else if (data != null && data.status == 'fail'){
          message.title = "ผิดพลาด!"
          message.body = "การตรวจเกิดข้อผิดพลาด"
        } else {
          message.title = "ผิดพลาด!"
          message.body = "การส่ง Request ผิดพลาด"
        }
        this.setState(prevState => {
          return {
            ...prevState,
            loadingOverlay: false,
            modals: {
              ...prevState.modals,
              infoModal: {
                ...prevState.modals.infoModal,
                title: message.title,
                body: message.body
              }
            }
          }
        }, () => {
          this.toggleInfoModal()
        })
      })
    })
  }

  toggleInfoModal = () => {
    this.setState( prevState => {
      return {
        ...prevState,
        modals: {
          ...prevState.modals,
          infoModal: {
            ...prevState.modals.infoModal,
            isOpen: !this.state.modals.infoModal.isOpen
          }
        }
      }
    })
  }

  _handleEditStation = () => {
    console.log(this.state.station.values.ph.threshold.min, "+" , this.state.station.values.ph.threshold.max);
    editStation({
      stationId: this.state.station.station_id,
      name: this.state.station.station_name,
      type: this.state.station.station_type,
      local: {
        latitude: this.state.station.location.lat,
        longitude: this.state.station.location.long
      },
      valueStatus: {
        ph: this.state.station.values.ph.status ? "enable" : "disable",
        turbidity: this.state.station.values.turbidity.status ? "enable" : "disable",
        temp: this.state.station.values.temperature.status ? "enable" : "disable",
        do: this.state.station.values.do.status ? "enable" : "disable",
        ec: this.state.station.values.ec.status ? "enable" : "disable"
      },
      thresholds: {
        ph: {
          min: this.state.station.values.ph.threshold.min,
          max: this.state.station.values.ph.threshold.max
        },
        turbidity: {
          min: this.state.station.values.turbidity.threshold.min,
          max: this.state.station.values.turbidity.threshold.max,
        },
        temp: {
          min: this.state.station.values.temperature.threshold.min,
          max: this.state.station.values.temperature.threshold.max,
        },
        do: {
          min: this.state.station.values.do.threshold.min,
          max: this.state.station.values.do.threshold.max,
        },
        ec: {
          min: this.state.station.values.ec.threshold.min,
          max: this.state.station.values.ec.threshold.max,
        },
      }
    }).then(success => {
      if (success) {
        // clear field
        history.push("/control")
      } else {
        alert("เพิ่มอุปกรณ์ไม่สำเร็จ")
      }
    })
  }

  _handleSetInterval = () => {
    let now = new Date()
    let date = now.getDate() + "-" + (parseInt(now.getMonth()) + 1).toString() + "-" + (parseInt(now.getFullYear()) + 543).toString()
    let time = ( "0" + now.getHours() ).slice(-2)  + ":" + ( "0" + (parseInt(now.getMinutes()) + 2).toString() ).slice(-2) + ":" + ( "0" + now.getSeconds() ).slice(-2)
    let request = {
      stationId: this.state.station.station_id,
      date: date,
      startTime: time,
      period: ( this.state.intervalHour.toString() ) + ":" + ("0" + this.state.intervalMin.toString() ).slice(-2) + ":" + ("0" + this.state.intervalSec.toString() ).slice(-2),
      round: this.state.intervalRound
    }
    console.log(request);
    stationSetTime(request).then(success => {
      if (success) {
        history.push("/control")
      } else {
        alert("ตั้งเวลาไม่สำเร็จ")
      }
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingScreenOverlay color='light'/>
      )
    } else if (this.state.loading == null) {
      return (
        <Row>
        <Col className="text-center">
        <Card className="m-3 border-0 bg-light rounded-lg">
        <CardBody>
        <div>ไม่สามารถตั้งค่าอุปกรณ์ได้ กรุณา <a href="/">สร้างอุปกรณ์</a> ก่อน</div>
        </CardBody>
        </Card>
        </Col>
        </Row>
      )
    }
    return (
      <Container className="mb-5">
        {
          this.state.loadingOverlay ?
          <LoadingScreenOverlay color='dark'/> :
          <></>
        }
        <InfoModal isOpen={this.state.modals.infoModal.isOpen} toggle={this.toggleInfoModal} title={this.state.modals.infoModal.title} body={this.state.modals.infoModal.body}/>
        <h2 className="mt-4 mb-5">ตั้งค่าการควบคุม</h2>
        <Row>
          <Col>
            <Card className="m-3 mb-4 border-0 bg-light rounded-lg">
              <CardBody>
              <Label for="stationSelect">กรุณาเลือกอุปกรณ์</Label>
              <Input type="select" name="select" id="stationSelect" className="m-1 border-0 shadow-sm rounded-sm" onChange={e => this.setState({selectedIndex: e.target.value, station: this.state.stations[e.target.value]})}>
              {
                this.state.stations.map((station, index) => {
                  console.log(station);
                  return (
                    <option key={index} value={index}>{station.station_name}</option>
                  )
                })
              }
              </Input>
              </CardBody>
            </Card>

            <Card className="m-3 mb-4 border-0 bg-light rounded-lg">
              <CardBody>

              {/* Threshold and station.values Settings */}
              <Label for="stationSelect" className="my-2 text-center">
                กรุณาเลือกค่าที่ต้องการแจ้งเตือน
              </Label>
              <Row>
                  <Col id="check1" xs="4">
                    <Input
                      addon
                      value="ph"
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                      checked={this.state.station.values.ph.status}
                      onChange={(e) => this._handleOnChecked(e.target.value)}
                    />
                    <Label className="ml-5 mt-3">ค่า pH</Label>
                  </Col>
                  <Col xs="8">
                    <InputRange
                      step={0.1}
                      minValue={
                        sliderBounds.ph.min
                      }
                      maxValue={
                        sliderBounds.ph.max
                      }
                      onChange={(value) =>
                        this.setState((prevState) => {
                          return {
                            ...prevState,
                            station: {
                              ...prevState.station,
                              values: {
                                ...prevState.station.values,
                                ph: {
                                  ...prevState.station.values.ph,
                                  threshold: {
                                    min: parseFloat(value.min).toFixed(1),
                                    max: parseFloat(value.max).toFixed(1),
                                  },
                                },
                              },
                            },
                          };
                        })
                      }
                      value={this.state.station.values.ph.threshold}
                      disabled={
                        !this.state.station.values.ph.status
                      }
                    />
                  </Col>
              </Row>

              <Row>
                  <Col xs="4">
                    <Input
                      addon
                      value="turbidity"
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                      checked={this.state.station.values.turbidity.status}
                      onChange={(e) => this._handleOnChecked(e.target.value)}
                    />
                    <Label className="ml-5 mt-3">ความขุ่น</Label>
                  </Col>
                  <Col xs="8">
                    <InputRange
                      step={0.1}
                      minValue={
                        sliderBounds.turbidity.min
                      }
                      maxValue={
                        sliderBounds.turbidity.max
                      }
                      onChange={(value) =>
                        this.setState((prevState) => {
                          return {
                            ...prevState,
                            station: {
                              ...prevState.station,
                              values: {
                                ...prevState.station.values,
                                turbidity: {
                                  ...prevState.station.values.turbidity,
                                  threshold: {
                                    min: parseFloat(value.min).toFixed(1),
                                    max: parseFloat(value.max).toFixed(1),
                                  },
                                },
                              },
                            },
                          };
                        })
                      }
                      value={this.state.station.values.turbidity.threshold}
                      disabled={
                        !this.state.station.values.turbidity.status
                      }
                    />
                  </Col>
              </Row>

              <Row>
                  <Col xs="4">
                    <Input
                      addon
                      value="temperature"
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                      checked={this.state.station.values.temperature.status}
                      onChange={(e) => this._handleOnChecked(e.target.value)}
                    />
                    <Label className="ml-5 mt-3">อุณหภูมิ</Label>
                  </Col>
                  <Col xs="8">
                    <InputRange
                      step={0.1}
                      minValue={
                        sliderBounds.temperature.min
                      }
                      maxValue={
                        sliderBounds.temperature.max
                      }
                      onChange={(value) =>
                        this.setState((prevState) => {
                          return {
                            ...prevState,
                            station: {
                              ...prevState.station,
                              values: {
                                ...prevState.station.values,
                                temperature: {
                                  ...prevState.station.values.temperature,
                                  threshold: {
                                    min: parseFloat(value.min).toFixed(1),
                                    max: parseFloat(value.max).toFixed(1),
                                  },
                                },
                              },
                            },
                          };
                        })
                      }
                      value={this.state.station.values.temperature.threshold}
                      disabled={
                        !this.state.station.values.temperature.status
                      }
                    />
                  </Col>
              </Row>

              <Row>
                  <Col xs="4">
                    <Input
                      addon
                      value="do"
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                      checked={this.state.station.values.do.status}
                      onChange={(e) => this._handleOnChecked(e.target.value)}
                    />
                    <Label className="ml-5 mt-3">ค่า DO</Label>
                  </Col>
                  <Col xs="8">
                    <InputRange
                      step={0.1}
                      minValue={
                        sliderBounds.do.min
                      }
                      maxValue={
                        sliderBounds.do.max
                      }
                      onChange={(value) =>
                        this.setState((prevState) => {
                          return {
                            ...prevState,
                            station: {
                              ...prevState.station,
                              values: {
                                ...prevState.station.values,
                                do: {
                                  ...prevState.station.values.do,
                                  threshold: {
                                    min: parseFloat(value.min).toFixed(1),
                                    max: parseFloat(value.max).toFixed(1),
                                  },
                                },
                              },
                            },
                          };
                        })
                      }
                      value={this.state.station.values.do.threshold}
                      disabled={
                        !this.state.station.values.do.status
                      }
                    />
                  </Col>
              </Row>
              <Row>
                  <Col id="check1" xs="4">
                    <Input
                      addon
                      value="ec"
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                      checked={this.state.station.values.ec.status}
                      onChange={(e) => this._handleOnChecked(e.target.value)}
                    />
                    <Label className="ml-5 mt-3">ค่า eC</Label>
                  </Col>
                  <Col xs="8">
                    <InputRange
                      step={0.1}
                      minValue={
                        sliderBounds.ec.min
                      }
                      maxValue={
                        sliderBounds.ec.max
                      }
                      onChange={(value) =>
                        this.setState((prevState) => {
                          return {
                            ...prevState,
                            station: {
                              ...prevState.station,
                              values: {
                                ...prevState.station.values,
                                ec: {
                                  ...prevState.station.values.ec,
                                  threshold: {
                                    min: parseFloat(value.min).toFixed(1),
                                    max: parseFloat(value.max).toFixed(1),
                                  },
                                },
                              },
                            },
                          };
                        })
                      }
                      value={this.state.station.values.ec.threshold}
                      disabled={
                        !this.state.station.values.ec.status
                      }
                    />
                  </Col>
              </Row>
              <Row>
              <Col>
              <Button className="ml-3 mt-3 save rounded-pill border-0 float-right" onClick={this._handleEditStation}>บันทึกการตั้งค่าแจ้งเตือน</Button>
              </Col>
              </Row>
              </CardBody>
            </Card>
            <Card className="m-3 border-0 bg-light rounded-lg">
              <CardBody>

              <Label for="stationSelect">เลือกเวลาในการตั้งค่าการควบคุม</Label>
                <InputGroup>
                  <Label className="mx-2 mt-2">ตรวจทุกๆ</Label>
                  <Input
                    placeholder="ชั่วโมง"
                    type="number"
                    className="border-0 rounded-lg shadow-sm"
                    value={ this.state.intervalHour }
                    min="0"
                    step="1"
                    onChange={e => this.setState({intervalHour: e.target.value})}
                  />
                  <Label className="mx-2 mt-2">ชั่วโมง</Label>
                  <Input
                    placeholder="นาที"
                    type="number"
                    className="border-0 rounded-lg shadow-sm"
                    value={ this.state.intervalMin }
                    min="6"
                    max="59"
                    step="1"
                    onChange={e => this.setState({intervalMin: e.target.value})}
                  />
                  <Label className="mx-2 mt-2">นาที</Label>
                  <Input
                    placeholder="วินาที"
                    type="number"
                    className="border-0 rounded-lg shadow-sm"
                    value={ this.state.intervalSec }
                    min="0"
                    max="59"
                    step="1"
                    onChange={e => this.setState({intervalSec: e.target.value})}
                  />
                  <Label className="mx-2 mt-2">วินาที</Label>
                  <Label className="mx-2 mt-2">|</Label>
                  <Label className="mx-2 mt-2">จำนวน</Label>
                  <Input
                    placeholder="เวลา"
                    type="number"
                    className="border-0 rounded-lg shadow-sm"
                    value={ this.state.intervalRound }
                    min="1"
                    step="1"
                    onChange={e => this.setState({intervalRound: e.target.value})}
                  />
                  <Label className="mx-2 mt-2">รอบ</Label>
                  <Button className="ml-3 save rounded-pill border-0" onClick={this._handleSetInterval}>บันทึกการตั้งเวลา</Button>
                  <Button className="ml-3 now rounded-pill border-0" onClick={this._handleStartMeasure}>ตรวจทันที</Button>

                </InputGroup>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Control;
