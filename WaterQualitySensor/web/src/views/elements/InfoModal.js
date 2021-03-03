import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


export default class LoadingModal extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
        <ModalBody>
          { this.props.body }
        </ModalBody>
        <ModalFooter className="border-0">
          <Button className="border-0 rounded-pill" color="primary" onClick={this.props.toggle}>ปิด</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
