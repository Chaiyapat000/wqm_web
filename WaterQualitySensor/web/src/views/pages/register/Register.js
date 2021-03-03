import React, { Component } from "react";
import { View, StyleSheet, TextInput, Image, ImageBackground } from "react";
import { Container, Row, Col, CardColumns, CardDeck, InputGroup, Input } from "reactstrap";
import { Text, Button } from "reactstrap";
import axios from 'axios'
import { Card, CardBody } from "reactstrap";
import "../../../assets/css/login.css";
import { history } from '../../../history'
import { register } from '../../../functions/apiActions'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirm: "",
    }
  }

  _handleRegister = () => {
    // TODO : Input Validate
    console.log(this.state);

    register({
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
    }).then(success => {
      if (success) {
        history.push("/login")
        //this.setState({ redirect: "/login" });
      } else {
        alert("สมัคสมาชิกไม่สำเร็จ")
      }
    })

  }

  render() {
    return (
      // <ImageBackground source={require('./src/view/pages/register/watertrans.png')} style={styles.container}>
      <div className="bg">
        <div id="register">
          <Card className="shadow p-3 mb-5 bg-white rounded-lg border-0">
            <form id="formregister">
              <h3 className="text-center">ลงทะเบียน</h3>

              <div className="form-group">
                <label>อีเมล์</label>
                <input
                  type="email"
                  name="emailRegister"
                  className="form-control rounded-lg border-0 shadow"
                  placeholder="someone@example.com"
                  value={this.state.email}
                  onChange={e => this.setState({email: e.target.value})}
                />
              </div>

              <div className="form-group">
              <label>ชื่อผู้ใช้</label>
              <InputGroup>
                <Input type="text"
                className="form-control rounded-lg border-0 shadow"
                name="first_name"
                placeholder="ชื่อ" value={this.state.firstName} onChange={e => this.setState({firstName: e.target.value})}/>
                <Input type="text"
                name="last_name"
                className="form-control rounded-lg border-0 shadow"
                placeholder="นามสกุล" value={this.state.lastName} onChange={e => this.setState({lastName: e.target.value})}/>
              </InputGroup>
              </div>

              <div className="form-group">
                <label>รหัสผ่าน</label>
                <input
                  type="password"
                  name="passwordRegister"
                  className="form-control rounded-lg border-0 shadow"
                  placeholder="รหัสผ่าน (ความยาว 6 ตัวอักษรขึ้นไป)"
                  value={this.state.password}
                  onChange={e => this.setState({password: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>ยืนยันรหัสผ่าน</label>
                <input
                  type="password"
                  name="passwordConfirmRegister"
                  className="form-control rounded-lg border-0 shadow"
                  placeholder="ยืนยันรหัสผ่าน"
                  value={this.state.passwordConfirm}
                  onChange={e => this.setState({passwordConfirm: e.target.value})}
                />
              </div>

              <Button
                className="rounded-pill border-0 shadow-sm btn-block"
                id="find"
                onClick={this._handleRegister}
              >
                ลงทะเบียน
              </Button>
              <p className="forgot-password text-right">
                เคยลงทะเบียนแล้ว <a href="/login">เข้าสู่ระบบ?</a>
              </p>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}

export default Register;
