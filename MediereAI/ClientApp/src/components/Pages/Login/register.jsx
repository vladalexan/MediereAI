import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            last_name: '',
            first_name: '',
            phone: '',
            email: '',
            password: ''
        }
    }

    Last_name = (event) => {
        this.setState({ last_name: event.target.value })
    }

    First_name = (event) => {
        this.setState({ first_name: event.target.value })
    }

    Phone = (event) => {
        this.setState({ phone: event.target.value })
    }

    Email = (event) => {
        this.setState({ email: event.target.value })
    }

    Password = (event) => {
        this.setState({ password: event.target.value })
    }

    Tara = (event) => {
        this.setState({ tara: event.target.value })
    }

    Judet = (event) => {
        this.setState({ judet: event.target.value })
    }

    Oras = (event) => {
        this.setState({ oras: event.target.value })
    }

    register = (event) => {
            axios.post('api/login/Insert', {
                Nume: this.state.last_name,
                Prenume: this.state.first_name,
                Email: this.state.email,
                Telefon: this.state.phone,
                Parola: this.state.password,
                Tara: this.state.tara,
                Judet: this.state.judet,
                Oras: this.state.oras,
                Verificat: 0,
                Counter: 1
            }).then((Result) => {
                if (Result.data.status === 'Success') {
                    alert('Cont creat. Verificati casuta de email.');
                    return (<Link to='/' />)
                }
                if (Result.data.status === 'Error')
                    alert('Eroare la crearea contului')
                if (Result.data.status === 'Exists') {
                    alert('Exista deja un cont pentru acest email');

                }

            })
        
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header" style={{marginLeft: "35%"}}>Sign Up</div>
                <form style={{ width: "100%", fontSize: "2vh" }} class="col">
                    <div className="form">
                        <div className="formi-group">
                            <>
                                <div class="row">
                                    <div class="col">
                                        <label class="form-label text-dark float-left" htmlFor="last_name">Last Name*</label>
                                        <input class="form-control" type="text" onChange={this.Last_name} name="last_name" placeholder="last_name" />
                                    </div>
                                    <div class="col">
                                        <label class="form-label text-dark float-left" htmlFor="first_name">First Name*</label>
                                        <input class="form-control" type="text" onChange={this.First_name} name="first_name" placeholder="first_name" />
                                    </div>
                                </div>
                                    <div class="row">
                                        <div class="col">
                                            <label class="form-label text-dark float-left" htmlFor="phone">Phone*</label>
                                            <input class="form-control" type="text" onChange={this.Phone} name="phone" placeholder="phone" />
                                    </div>
                                    <div class="col">
                                <label class="form-label text-dark float-left" htmlFor="email">Email*</label>
                                        <input class="form-control" type="text" onChange={this.Email} name="email" placeholder="email" />
                                    </div>
                                    </div>
                                <label class="form-label text-dark float-left" htmlFor="password">Password*</label>
                                <input class="form-control" type="password" onChange={this.Password} name="password" placeholder="password" />
                                <label class="form-label text-dark float-left" htmlFor="tara">Country</label>
                                <input class="form-control" type="text" onChange={this.Tara} name="tara" placeholder="country" />
                                <label class="form-label text-dark float-left" htmlFor="judet">County</label>
                                <input class="form-control" type="text" onChange={this.Judet} name="judet" placeholder="county" />
                                <label class="form-label text-dark float-left" htmlFor="oras">City</label>
                                <input class="form-control" type="text" onChange={this.Oras} name="oras" placeholder="city" /></>
                        </div>
                    </div>
                </form>
                <div className="footer" style={{ marginLeft: "35%" }}>
                    <button type="button" onClick={this.register} className="btnl">
                        Register
                    </button>
                </div>
            </div>
        );
    }
}