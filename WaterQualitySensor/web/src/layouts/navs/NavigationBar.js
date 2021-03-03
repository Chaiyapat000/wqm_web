import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { PersonIcon } from '@primer/octicons-react'
import { FaRegUserCircle } from "react-icons/fa";
import { history } from '../../history'

class NavigationBar extends React.Component {
  state = {
    isOpen: false,


  };

  toggle = () => {
    this.state.isOpen ?
    this.setState({isOpen: false}) :
    this.setState({isOpen: true})
  }

  _handleLogout = () => {
    localStorage.removeItem('token')
    history.push("/")
  }

  render() {
    console.log(this.props.permissions);
    return (
    <div>
      <Navbar light expand="md" className="shadow-sm text-center">
        <NavbarBrand href="/">Water Quality</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        {
          this.props.permissions.includes('user') && (
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar >
                <NavItem pills>
                  <NavLink exact to="/" className="rounded-pill"
                  activeClassName="rounded-pill-active" tag={RRNavLink}>อุปกรณ์</NavLink>
                </NavItem>
                <NavItem pills>
                  <NavLink exact to="/history" className="rounded-pill" activeClassName="rounded-pill-active" tag={RRNavLink}>ประวัติการใช้งาน</NavLink>
                </NavItem>
                <NavItem pills>
                  <NavLink exact to="/control" className="rounded-pill" activeClassName="rounded-pill-active" tag={RRNavLink}>ควบคุม</NavLink>
                </NavItem>
                <NavItem>
                <NavbarText>สวัสดี, คุณ {this.props.data.first_name}</NavbarText>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                  {/* <PersonIcon size={24} /> */}
                  <FaRegUserCircle size={26} color={'#646464'}/>
                  </DropdownToggle>
                  <DropdownMenu right>
                  {
                    this.props.permissions.includes("admin") && (
                      <DropdownItem href="/usermanage">
                        จัดการบัญชีผู้ใช้
                      </DropdownItem>
                    )
                  }
                  {
                    this.props.permissions.includes("admin") && (
                      <DropdownItem divider />
                    )
                  }
                    <DropdownItem onClick={this._handleLogout}>
                      ออกจากระบบ
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          )
        }

      </Navbar>
    </div>
    );
  }
}

export default NavigationBar;


/*
<div className="bg-dark text-light">
  <nav>
    <ul>
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <Link to="/history">History</Link>
      </li>
      <li>
        <Link to="/control">Control</Link>
      </li>
    </ul>
  </nav>
*/
