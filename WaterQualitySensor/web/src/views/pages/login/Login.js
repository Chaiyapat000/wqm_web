import React from "react";
import { Container, Row, Col, Label } from "reactstrap";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Alert,
} from "reactstrap";
import "../../../assets/css/login.css";
import { Redirect } from "react-router-dom";
import { login } from '../../../functions/apiActions'
import { history } from '../../../history'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
      email: "",
      password: "",
    };
  }

  _handleLogin = (e) => {
    e.preventDefault()
    // TODO : Input Validate
    console.log(this.state);

    login({
      email: this.state.email,
      password: this.state.password,
    }).then(success => {
      if (success) {
        history.push("/")
      } else {
        alert("เข้าสู่ระบบผิดพลาด")
      }
    })
  };

  render() {
    return (
      <div className="bg">
        <div id="login">
          {/* <Label>WATER</Label>
                <Label>QUALITY</Label> */}
          <Card className="signin shadow p-3 mt-5 mb-5 rounded-lg border-0 ">
            <form id="formlogin">
              <h3 className="text-center">เข้าสู่ระบบ</h3>
              <div className="form-group" style={{ marginTop: "10px" }}>
                <label>อีเมล์</label>
                <input
                  type="text"
                  className="form-control rounded-lg border-0 shadow"
                  placeholder="อีเมล"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>รหัสผ่าน</label>
                <input
                  type="password"
                  className="form-control rounded-lg border-0 shadow"
                  placeholder="รหัสผ่าน"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <Button
                className="rounded-pill border-0 shadow-sm btn-block"
                id="find"
                onClick={e => this._handleLogin(e)}
              >
                เข้าสู่ระบบ
              </Button>
              <p className="forgot-password text-left">
                ยังไม่ได้เป็นสมาชิก? <a href="/register">สมัครตรงนี้</a>
              </p>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
