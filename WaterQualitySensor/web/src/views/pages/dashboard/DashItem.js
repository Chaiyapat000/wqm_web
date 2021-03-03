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
  Progress,
  Tooltip
} from "reactstrap";
import { Badge } from "reactstrap";
import EditItemModal from "./modals/EditItemModal";
import DeleteModal from "./modals/DeleteModal";
import ViewItemModal from "./modals/ViewItemModal";

class DashItem extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      isViewItemModalOpen: false,
    }
  }

  toggleEdit = () => {
    this.state.isEditModalOpen
      ? this.setState({ isEditModalOpen: false })
      : this.setState({ isEditModalOpen: true });
  };
  toggleDelete = () => {
    this.state.isDeleteModalOpen
      ? this.setState({ isDeleteModalOpen: false })
      : this.setState({ isDeleteModalOpen: true });
  };
  toggleView = () => {
    this.state.isViewItemModalOpen
      ? this.setState({ isViewItemModalOpen: false })
      : this.setState({ isViewItemModalOpen: true });
  };



  render() {
    console.log(this.props.station);
    return (
      <div className="col-12 col-sm-6 col-lg-4 p-0">
        <Card className="p-0 mx-4 my-2 shadow bg-white rounded-lg border-0" color="light">
          <CardHeader className="text-left border-0">
            { this.props.station.station_name }
            <Badge className="float-right head">{ this.props.station.station_type == "agriculture" ? "เกษตรกร" : this.props.station.station_type == "farm" ? "ปศุสัตว์" : this.props.station.station_type == "irrigation" ? "ประมง" : "ประเภทผิดพลาด"}</Badge>
          </CardHeader>
          <CardBody>
            <CardText className="font-weight-bold">รายละเอียด<Badge className="float-right" color={this.props.station.station_status == "NULL" ? "warning" : this.props.station.station_status == "ON" ? "success" : "danger"} pill>{this.props.station.station_status}</Badge></CardText>
            <hr />
            {
              this.props.station.values.ph.status ?
              <CardText>
                ค่า pH : <Badge color="info">{ this.props.station.values.ph.value }</Badge>
              </CardText> :
              <></>
            }
            {
              this.props.station.values.turbidity.status ?
              <CardText>
                ความขุ่น : <Badge color="info">{ this.props.station.values.turbidity.value }</Badge>
              </CardText> :
              <></>
            }
            {
              this.props.station.values.temperature.status ?
              <CardText>
                อุณหภูมิ : <Badge color="info">{ this.props.station.values.temperature.value }</Badge>
              </CardText> :
              <></>
            }
            {
              this.props.station.values.do.status ?
              <CardText>
                ค่า DO : <Badge color="info">{ this.props.station.values.do.value }</Badge>
              </CardText> :
              <></>
            }
            {
              this.props.station.values.ec.status ?
              <CardText>
                ค่า eC : <Badge color="info">{ this.props.station.values.ec.value }</Badge>
              </CardText> :
              <></>
            }
            <CardText>
              เวลา : <Badge color="info">{ this.props.station.time }</Badge>
            </CardText>
          </CardBody>
          <CardFooter className="text-center border-0">
            <Button className="mx-2 rounded-pill border-0"  onClick={this.toggleView}>
              กราฟ
            </Button>
            <Button className="mx-2 rounded-pill border-0" onClick={this.toggleEdit}>
              แก้ไข
            </Button>
            <Button className="del mx-2 rounded-pill border-0" color="danger" onClick={this.toggleDelete}>
              ลบ
            </Button>
          </CardFooter>
        </Card>
        <EditItemModal
          isOpen={this.state.isEditModalOpen}
          toggle={this.toggleEdit}
          station={this.props.station}
          setLocation={this.props.setLocation}
        />
        <DeleteModal
          isOpen={this.state.isDeleteModalOpen}
          toggle={this.toggleDelete}
          station={this.props.station}
          refresh={this.props.refresh}
        />
        <ViewItemModal
          isOpen={this.state.isViewItemModalOpen}
          toggle={this.toggleView}
          station={this.props.station}
        />
      </div>
    );
  }
}

export default DashItem;
