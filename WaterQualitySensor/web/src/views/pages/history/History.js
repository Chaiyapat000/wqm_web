import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Table } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Label, Button, ButtonGroup, Badge, Card, CardBody } from 'reactstrap';
import { DatePicker } from 'react-widgets'
import momentLocalizer from "react-widgets-moment";
import Moment from 'moment';
import "react-widgets/dist/css/react-widgets.css";

import "../../../assets/css/history.css"
import { IoIosArrowDropdown } from "react-icons/io"
import { Chart } from 'react-charts'
import LoadingScreenOverlay from "../../elements/LoadingScreenOverlay";
import { fetchStationInfo, getSensorValues, getStationHistory } from '../../../functions/apiActions'
import DayPicker, { DateUtils } from "react-day-picker";
import 'react-day-picker/lib/style.css';

Moment.locale("en");
momentLocalizer();

class History extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      stations: [],
      station: {},
      selectedIndex: 0,
      selected: "ph",
      showResult: false,
      showNoResult: false,
      minDate: new Date(),
      maxDate: new Date(),
      details: [],
      from: undefined,
      to: undefined,
    }
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  handleDayClick(day) {
   const range = DateUtils.addDayToRange(day, this.state);
   this.setState(range);
 }

 handleResetClick() {
   this.setState({
     from: undefined,
     to: undefined,
   });
 }

  _handleOnSelectValue = (selected) => {
    this.setState({
      selected: selected
    })
  }

  componentDidMount() {
    this.refreshDashboard()
  }
  _handleSearchHistory = () => {
    getStationHistory({
      "stationId": this.state.station.station_id
    }).then(history => {

      if (!history) {
        // console.log("Error fetching history data");
      } else {
        // console.log(history);
        let details = []
        let inRangeHistory = []
        let avail = []

        history[0].do && details.push({
          label: "do",
          data: []
        })
        history[0].do && avail.push('do')

        history[0].ec && details.push({
          label: "ec",
          data: []
        })
        history[0].ec && avail.push('ec')

        history[0].ph && details.push({
          label: "ph",
          data: []
        })
        history[0].ph && avail.push('ph')

        history[0].temperature && details.push({
          label: "temperature",
          data: []
        })
        history[0].temperature && avail.push('temperature')

        history[0].turbidity && details.push({
          label: "turbidity",
          data: []
        })
        history[0].turbidity && avail.push('turbidity')

        history.map((hist, index)=> {

          let maxDateTime = this.state.to
          maxDateTime.setHours(0,0,0,0)
          let minDateTime = this.state.from
          minDateTime.setHours(0,0,0,0)
          let currentDateTime = new Date(hist.dateTime)
          currentDateTime.setHours(0,0,0,0)

          // console.log(currentDateTime ," <= ", maxDateTime ," && ", currentDateTime ," >= ", minDateTime);

          if (currentDateTime <= maxDateTime && currentDateTime >= minDateTime) {
            details.map((sensor, index2) => {
              sensor.label == "ec" && sensor.data.push([new Date(hist.dateTime), hist.ec])
            })

            details.map((sensor, index2) => {
              sensor.label == "do" && sensor.data.push([new Date(hist.dateTime), hist.do])
            })

            details.map((sensor, index2) => {
              sensor.label == "ph" && sensor.data.push([new Date(hist.dateTime), hist.ph])
            })

            details.map((sensor, index2) => {
              sensor.label == "temperature" && sensor.data.push([new Date(hist.dateTime), hist.temperature])
            })

            details.map((sensor, index2) => {
              sensor.label == "turbidity" && sensor.data.push([new Date(hist.dateTime), hist.turbidity])
            })

            inRangeHistory.push(hist)
          }
        })

        if (inRangeHistory.length == 0) {
          this.setState({details: details, history: inRangeHistory, available: avail, selected: avail.length != 0 ? avail[0] : "ph"}, () => {
            this.setState({showResult: false, showNoResult: true})
            // console.log(this.state.details)
          })
        } else {
          this.setState({details: details, history: inRangeHistory, available: avail, selected: avail.length != 0 ? avail[0] : "ph"}, () => {
            this.setState({showResult: true, showNoResult: false})
            // console.log(this.state.details)
          })
        }
      }
    })
  }

  refreshDashboard = () => {
    fetchStationInfo().then(fetchedStations => {
      // console.log(fetchedStations);
      if (fetchedStations == null || fetchedStations == undefined || fetchedStations == false) {
        this.setState({loading: null})
        return false
      }
      const stations = []
      const sensorValues = fetchedStations.map((station, index) => {
        // console.log(station);
        if (station.stationId != "") {
          return getSensorValues(station.stationId).then(values => {
            // console.log(values);
            // console.log("push ", station.stationId);
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
              time: !values ? "NULL" : values.dateTime != "" ? values.dateTime : "NULL",
            })
          })
        }
      })
      // Wait for all requests, and then setState
      Promise.all(sensorValues).then(() => {
        this.setState({
          stations: stations,
          station: stations[0],
          selectedIndex: 0,
          minDate: new Date(),
          maxDate: new Date(),
        }, () => {
          this.setState({loading: false})
        });
      });
    })
  }

  render() {
    const data = [
        {
          label: 'Series 1',
          data: [
            [0, 1],
            [1, 2],
            [2, 4],
            [3, 2],
            [4, 7],
          ],
        },
        {
          label: 'Series 2',
          data: [
            [0, 3],
            [1, 1],
            [2, 5],
            [3, 6],
            [4, 4],
          ],
        },
      ]

    const axes = [
        { primary: true, type: 'time', position: 'bottom' },
        { type: 'linear', position: 'left' },
      ]
    // console.log(this.state.selected)

    if (this.state.loading) {
      return (
        <LoadingScreenOverlay color="light" />
      )
    } else if (this.state.loading == null) {
      return (
        <Row>
        <Col className="text-center">
        <Card className="m-3 border-0 bg-light rounded-lg">
        <CardBody>
        <div>ไม่สามารถดูประวัติการใช้งานได้ กรุณา <a href="/">สร้างอุปกรณ์</a> ก่อน</div>
        </CardBody>
        </Card>
        </Col>
        </Row>
      )
    }

    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <Container>
        <Row>
          <Col>
          <h2 className="mt-4 mb-5">ประวัติการใช้งาน</h2>
          <Card className="m-3 border-0 bg-light rounded-lg">
            <CardBody>
            <Label for="stationSelect" className="label">กรุณาเลือกอุปกรณ์</Label>
            <Input type="select" name="select" id="stationSelect" className="mx-1 shadow-sm border-0" onChange={e => this.setState({selectedIndex: e.target.value, station: this.state.stations[e.target.value]})}>
              {
                this.state.stations.map((station, index) => {
                  // console.log(station);
                  return (
                    <option key={index} value={index}>{station.station_name}</option>
                  )
                })
              }
            </Input>
              <Label className="mt-4">กรุณาเลือกวัน/เดือน/ปี</Label>
              <Row>
              <Col className="text-center">
              <div>
              <p>
                {!from && !to && 'กรุณาเลือกวันเริ่มต้น'}
                {from && !to && 'กรุณาเลือกวันสิ้นสุด'}
                {from &&
                  to &&
                  `แสดงข้อมูลวันที่ ${from.toLocaleDateString()} ถึง
                      ${to.toLocaleDateString()}`}{' '}
              </p>
              <DayPicker
                className="Selectable"
                numberOfMonths={this.props.numberOfMonths}
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}
                disabledDays={{ after: new Date() }}
              />
              </div>
              {from && to && (
                <Button className="rounded-pill border-0 shadow-sm mx-2" id="find" onClick={ this.handleResetClick }>ล้างค่า</Button>
              )}
              {from && to && (
                <Button className="rounded-pill border-0 shadow-sm mx-2" id="find" onClick={ this._handleSearchHistory }>ค้นหา</Button>
              )}
              </Col>
              </Row>
            </CardBody>
          </Card>
          </Col>
        </Row>
        {
          this.state.showNoResult ?
          (
            <Row>
            <Col className="text-center">
            <Card className="m-3 border-0 bg-light rounded-lg">
            <CardBody>

            <div>ไม่พบผลลัพท์ในช่วงเวลาดังกล่าว กรุณาลองใหม่อีกครั้ง</div>
            </CardBody>
            </Card>
            </Col>
            </Row>
          ) :
          <></>
        }
        {
          this.state.showResult ?
          <div>
          <Row>
            <Col>
            <Card className="m-3 border-0 bg-light rounded-lg">
              <CardBody className="d-flex flex-column d-flex">
              <ButtonGroup>
              {
                this.state.available.includes("ph") &&
                <Button className={this.state.selected == "ph" ? "border-0 shadow-sm darker" : "border-0 shadow-sm"} value="ph" onClick={e => this._handleOnSelectValue(e.target.value)}>ค่า pH</Button>
              }
              {
                this.state.available.includes("turbidity") &&
                <Button className={this.state.selected == "turbidity" ? "border-0 shadow-sm darker" : "border-0 shadow-sm"} value="turbidity" onClick={e => this._handleOnSelectValue(e.target.value)}>
                  ความขุ่น
                </Button>
              }
              {
                this.state.available.includes("temperature") &&
                <Button className={this.state.selected == "temperature" ? "border-0 shadow-sm darker" : "border-0 shadow-sm"} value="temperature" onClick={e => this._handleOnSelectValue(e.target.value)}>
                  อุณหภูมิ
                </Button>
              }
              {
                this.state.available.includes("ec") &&
                <Button className={this.state.selected == "ec" ? "border-0 shadow-sm darker" : "border-0 shadow-sm"} value="ec" onClick={e => this._handleOnSelectValue(e.target.value)}>ค่า eC</Button>
              }
              {
                this.state.available.includes("do") &&
                <Button className={this.state.selected == "do" ? "border-0 shadow-sm darker" : "border-0 shadow-sm"} value="do" onClick={e => this._handleOnSelectValue(e.target.value)}>ค่า DO</Button>
              }
              </ButtonGroup>

              <div style={{ width: 'auto', height: '300px', backgroundColor: 'white', margin: '1em'}}>
                <Chart
                data={this.state.details.filter(
                  (d) => d.label === this.state.selected
                )}
                axes={axes}/>
              </div>
              </CardBody>
              <Label className="mt-1 mb-3 mx-auto">กราฟแสดงค่า {this.state.selected} ของอุปกรณ์</Label>
            </Card>

            </Col>
          </Row>
          <Row>
            <Col>
            <Card className="m-3 border-0 rounded-lg">
              <Label className="mx-auto mt-4">ตารางแสดงค่าต่างๆของอุปกรณ์</Label>
                <CardBody>
                <Table responsive hover className="bg-white shadow-sm rounded-lg text-center">
                  <thead className="shadow-sm text-center">
                    <tr>
                      <th>เวลา</th>
                      {
                        this.state.available.includes("ph") &&
                        <th>ค่า pH</th>
                      }
                      {
                        this.state.available.includes("turbidity") &&
                        <th>ความขุ่น</th>
                      }
                      {
                        this.state.available.includes("temperature") &&
                        <th>อุณหภูมิ</th>
                      }
                      {
                        this.state.available.includes("do") &&
                        <th>ค่า DO</th>
                      }
                      {
                        this.state.available.includes("ec") &&
                        <th>ค่า eC</th>
                      }
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.history.map((history, index) => {
                      return (
                        <tr key={history.dateTime}>
                          <th scope="row">{history.dateTime}</th>
                          {
                            this.state.available.includes("ph") &&
                            <td>{history.ph}</td>
                          }
                          {
                            this.state.available.includes("turbidity") &&
                            <td>{history.turbidity}</td>
                          }
                          {
                            this.state.available.includes("temperature") &&
                            <td>{history.temperature}</td>
                          }
                          {
                            this.state.available.includes("do") &&
                            <td>{history.do}</td>
                          }
                          {
                            this.state.available.includes("ec") &&
                            <td>{history.ec}</td>
                          }
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </div> :
          <></>
        }
      </Container>
    );
  }
}

export default History;
