import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  ButtonGroup,
} from "reactstrap";
import { Chart } from "react-charts";
import { getStationHistory } from '../../../../functions/apiActions'

const limitedHistorySummary = 5

class ViewItemModal extends React.Component {
  constructor() {
    super();
    this.state = {
      available: [],
      selected: "ph",
      details: []
    }
  }

  _handleOnSelectValue = (selected) => {
    this.setState({
      selected: selected
    })
  }

  componentDidMount() {
    getStationHistory({
      "stationId": this.props.station.station_id
    }).then(history => {
      if (!history) {
        console.log("Error fetching history data");
      } else {
        console.log(history);
        let details = []
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
          if ( (index+1) + limitedHistorySummary - history.length > 0) {
            console.log((index+1) + limitedHistorySummary - history.length, ">", 0);
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
          }
        })
        this.setState({details: details, available: avail, selected: avail.length != 0 ? avail[0] : "ph"}, () => console.log(this.state.details))
      }
    })
  }

  render() {

    const axes = [
      { primary: true, type: "time", position: "bottom", time: {
          displayFormats: {
          'millisecond': 'h:mm a',
          'second': 'h:mm a',
          'minute': 'h:mm a',
          'hour': 'h:mm a',
          'day': 'h:mm a',
          'week': 'h:mm a',
          'month': 'h:mm a',
          'quarter': 'h:mm a',
          'year': 'h:mm a'
        } } },
      { type: "linear", position: "left" },
    ];

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader>กราฟของค่าต่างๆ</ModalHeader>
        <ModalBody className="d-flex flex-column d-flex">
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
          <div
            style={{
              width: "auto",
              height: "300px",
              backgroundColor: "white",
              margin: "1em",
            }}
          >
            <Chart
              data={this.state.details.filter(
                (d) => d.label === this.state.selected
              )}
              axes={axes}
            />
          </div>
        </ModalBody>
        <ModalFooter className="border-0">
          <Button className="cancel border-0 rounded-pill" onClick={this.props.toggle}>
            ปิด
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ViewItemModal;
