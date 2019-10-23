import React, { Component } from 'react';
import styled from 'styled-components';
import history from './history';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }
  
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  signup(e) {
    e.preventDefault();
    const { username, password } = this.state;
    axios.post('/api/register', {
      username,
      password
    })
    .then((response) => {
      if (response.data === 'success') {
        history.push('/user');
      } else {
        console.log('not registered');
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div></div>
    );
  }
}