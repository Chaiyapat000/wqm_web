import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap'




export default class LoadingScreenOverlay extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    const colors = {
      dark: 'rgba(0, 0, 0, 0.8)',
      light: 'rgba(255, 255, 255, 0.2)'
    }
    const shadows = {
      dark: '2px 0 0 #000',
      light: '2px 0 0 #FFF'
    }
    const textColors = {
      dark: "text-light font-weight-normal",
      light: "text-dark font-weight-normal"
    }


    return (
      <div style={{position: 'fixed', top: '0', left: '0', width: '100%', height: '100vh', background: colors[this.props.color], zIndex: '999', display: 'grid', justifyContent: 'center', alignContent: 'center', gridGap: '1em'}}>
        <Spinner color="primary" style={{ width: '5rem', height: '5rem', justifySelf: 'center'}} />
        <text className={textColors[this.props.color]} style={{ justifySelf: 'center', textShadow: shadows[this.props.color]}}>L o a d i n g . . .</text>
      </div>
    )
  }
}
