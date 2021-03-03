import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap'


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
        className={this.props.className}
      >
        <ModalHeader>กรุณารอซักครู่...</ModalHeader>
        <ModalBody className="d-flex justify-content-center">
          <Spinner color="primary" style={{ width: '5rem', height: '5rem', margin: '1em' }} />
        </ModalBody>
      </Modal>
    )
  }
}
