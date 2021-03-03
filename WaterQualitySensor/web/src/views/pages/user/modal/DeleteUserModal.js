import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { deleteUser } from '../../../../functions/apiActions'
import { history } from '../../../../history'
class DeleteUserModal extends React.Component {

  /*_handleDeleteUser = () => {
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
  }*/

  _handleDeleteUser = () => {
    console.log("deleteing", this.props.userId);
    deleteUser(this.props.userId).then((success) => {
      if (success) {
        this.props.toggle()
      } else {
        this.props.toggle()
        alert('ลบไม่สำเร็จ')
      }
      this.props.fetch()
    });
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader>ลบอุปกรณ์</ModalHeader>
        <ModalBody className="d-flex flex-column d-flex">
          คุณต้องการลบผู้ใช้ {this.props.userId} หรือไม่?
        </ModalBody>
        <ModalFooter className="border-0 ">
          <Button className="del border-0 rounded-pill" color="danger" onClick={this._handleDeleteUser}>
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

export default DeleteUserModal;
