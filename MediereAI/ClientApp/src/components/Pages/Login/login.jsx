import React, { Component, useContext } from "react";
import { Route, Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import "../login.scss"

export class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true' ? true : false,
            username: '',
            password: ''
        }

    }

    Radio = (event) => {
        this.setState({ radio: event.target.value })
    }

    User = (event) => {
        this.setState({
            username: event.target.value
        })
    };

    Parola = (event) => {
        this.setState({
            password: event.target.value
        })
    };

    Sign = (event) => {
        sessionStorage.setItem('tip', 'nu')
        axios.post('api/login/Login', {
            Email: this.state.username,
            Password: this.state.password
        }).then((result) => {
            //if (result.data.status === "Invalid")
            //alert('Utilizator Invalid');
            if (result.data.status === "Success") {
                console.log(result.data)
                if (result.data.verificat !== 0) {
                    if (result.data.verificat === 2) {
                        sessionStorage.setItem('admin', 'true');
                    }
                    sessionStorage.setItem('verificat', result.data.verificat)
                    sessionStorage.setItem('isAuthenticated', 'true');
                    sessionStorage.setItem('email', this.state.username);
                    sessionStorage.setItem('prenume', result.data.firstName);
                    sessionStorage.setItem('nume', result.data.lastName);
                    sessionStorage.setItem('tip', 'Persoana')
                    this.setState({ isAuthenticated: true });
                    axios.post('api/login/Counter', {
                        user: this.state.username,
                        tip: sessionStorage.getItem('tip')
                    })
                    var intro = 'Welcome, ' + result.data.prenume + '!';
                    alert(intro)
                }
                if (result.data.verificat === 0) {
                    alert('Your account was not activated. Please check your email.')
                }
            }
        })
    }

    render() {
        console.log(this.state)
        return (<>
            {
                this.state.isAuthenticated ?
                    <div>
                        <Redirect push={true} to='/' />
                    </div>
                    : <div className="base-container" ref={this.props.containerRef}>
                        <div className="header" style={{marginLeft: "35%"}}>Sign In</div>
                        <form style={{ width: "100%", alignContent: "center" }}>
                            <div class="mb-2 px-10">
                                <label htmlFor="username" class="form-label text-dark float-left">Email</label>
                                <input class="form-control" type="text" onChange={this.User} name="username" placeholder="username" />
                            </div>
                            <div class="mb-2 px-10">
                                <label htmlFor="password" class="form-label text-dark float-left">Password</label>
                                <input class="form-control" type="password" onChange={this.Parola} name="password" placeholder="password" />
                            </div>
                        </form>
                        <div className="footer" style={{ marginLeft: "35%" }}>
                            <button onClick={this.Sign} className="btnl">
                                Log In
                        </button>
                        </div>
                    </div>
            }
        </>
        );
    }
}