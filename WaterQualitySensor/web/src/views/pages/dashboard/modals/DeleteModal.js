import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { deleteStation } from '../../../../functions/apiActions'
import {history} from '../../../../history'
class DeleteModal extends React.Component {

  _handleDeleteStation = () => {
    deleteStation({
      "stationId": this.props.station.station_id
    }).then(success => {
      if (success) {
        this.props.toggle()
        history.push("/")
      } else {
        this.props.toggle()
        alert('ลบไม่สำเร็จ')
      }
    })
  }
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader>ลบอุปกรณ์</ModalHeader>
        <ModalBody className="d-flex flex-column d-flex">
          คุณต้องการลบอุปกรณ์ ID {this.props.station.station_id} หรือไม่?
        </ModalBody>
        <ModalFooter className="border-0 ">
          <Button className="del border-0 rounded-pill" color="danger" onClick={this._handleDeleteStation}>
            ลบ
          </Button>
          <Button className="border-0 rounded-pill" color="secondary" onClick={this.props.toggle}>
            ยกเลิก
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DeleteModal;
