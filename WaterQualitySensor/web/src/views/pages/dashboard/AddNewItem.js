import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardFooter,
  Button,
} from "reactstrap";
import { Badge } from "reactstrap";
import { IoIosAdd } from "react-icons/io"

import AddItemModal from "./modals/AddItemModal"

class AddNewItem extends React.Component {
  state = {
    isModalOpen: false
  };

  toggle = () => {
    this.state.isModalOpen ?
    this.setState({isModalOpen: false}) :
    this.setState({isModalOpen: true})
  }

  render() {
    return (
      <div className="col-12 col-sm-6 col-lg-4 p-0 flex-grow-1 d-flex align-content-stretch justify-content-stretch">
      <Button className="add p-0 mx-4 my-2 flex-fill rounded" onClick={this.toggle}><h1><IoIosAdd size={100} /></h1></Button>
      <AddItemModal isOpen={this.state.isModalOpen} toggle={this.toggle} />
      </div>
    );
  }
}

export default AddNewItem;
