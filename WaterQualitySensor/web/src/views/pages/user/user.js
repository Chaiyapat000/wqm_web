import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react";
import { Container, Row, Col, Label, Table, Button } from "reactstrap";
import { Text, Image, ImageBackground } from "react";
import { Card, CardBody } from "reactstrap";
import "../../../assets/css/login.css";
import { GrFormSearch } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import ViewUserModel from "./modal/ViewUserModal";
import DeleteUserModal from "./modal/DeleteUserModal";
import axios from "axios";
import {
  fetchUser
} from "../../../functions/apiActions";

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isDeleteModalOpen: false,
      users: [],
      viewingIndex: null,
      userIdForDeleteModal: "",
    };
  }

  componentDidMount() {
    this.fetchUser()
  }

  fetchUser = () => {
    fetchUser().then((users) => {
      console.log(users);
      let formattedUsers = [];
      users.map((user, index) => {
        formattedUsers.push({
          id: user.userId,
          first_name: user.first_name,
          last_name: user.last_name,
          permission: user.permissions,
          email: user.email,
        });
      });
      this.setState({ users: formattedUsers });
    });
  }

  _handleDeleteUser = (e, userId) => {
    console.log("del user", userId);
    e.preventDefault();
    this.setState({userIdForDeleteModal: userId}, () => {
      this.toggleDelete()
    })
    /*deleteUser(userId).then((success) => {
      if (success) {
        alert("User deleted!");
      } else {
        alert("Delete failed!");
      }
      this.fetchUser()
    });*/
  };

  toggle = (e, index) => {
    e.preventDefault();
    this.state.isModalOpen
      ? this.setState({ isModalOpen: false, viewingIndex: index })
      : this.setState({ isModalOpen: true, viewingIndex: index });
  };

  _handleDeleteUser = (e, userId) => {
    e.preventDefault();
    this.setState({userIdForDeleteModal: userId}, () => {
      this.toggleDelete()
    })
  };

  toggleDelete = () => {
    this.state.isDeleteModalOpen
      ? this.setState({ isDeleteModalOpen: false})
      : this.setState({ isDeleteModalOpen: true});
  };

  render() {
    return (
      <Container>
        {this.state.isModalOpen && (
          <ViewUserModel
            isOpen={this.state.isModalOpen}
            toggle={this.toggle}
            user={this.state.users[this.state.viewingIndex]}
          />
        )}
        {this.state.isDeleteModalOpen && (
          <DeleteUserModal
            isOpen={this.state.isDeleteModalOpen}
            toggle={this.toggleDelete}
            userId={this.state.userIdForDeleteModal}
            fetch={this.fetchUser}
          />
        )}
        <Row>
          <Col>
            <Card className="m-3 border-0 rounded-lg">
              <h3>จัดการบัญชีผู้ใช้</h3>
              <hr />
              <CardBody>
                <Table
                  responsive
                  className="bg-white shadow-sm rounded-lg text-center"
                >
                  <thead className="user shadow-sm text-center">
                    <tr>
                      <th>ไอดี</th>
                      <th>ชื่อผู้ใช้</th>
                      <th>สิทธิ์การใช้</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map((user, index) => {
                      return (
                        <tr>
                          <th scope="row">{user.id}</th>
                          <td>{user.first_name + " " + user.last_name}</td>
                          <td>{user.permission}</td>
                          <td>
                            <button
                              type="button"
                              class="user rounded-pill btn-sm border-0"
                            >
                              <GrFormSearch
                                size={26}
                                onClick={(e) => this.toggle(e, index)}
                              />
                            </button>
                            <button
                              type="button"
                              class="user ml-2 rounded-pill btn-sm border-0"
                              onClick={(e) =>
                                this._handleDeleteUser(e, user.id)
                              }
                            >
                              <RiDeleteBin5Line size={18} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      //    </ImageBackground>
    );
  }
}

export default User;
