import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Accordion from './Accordion';
import Navbarul from './../../Navbar/Navbar';
import { CustomButton } from '../../CustomButton.js';

export default class Reclamatii extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: sessionStorage.getItem('email'),
            companie: '',
            isAuthenticated: sessionStorage.getItem('isAuthenticated'),
            admin: sessionStorage.getItem('admin') === 'true' ? true : false,
            radio: sessionStorage.getItem("tip"),
            radio2: '',
            emails: [],
            companii: [],
            filtru_nume: '-',
            filtru_prenume: '-',
            help_nume: '',
            help_pre: '',
            array_nume: [],
            array_prenume: [],
            fresh: false,
            server: '',
            elem: {
                id: 0,
                name: '',
                nume: '',
                prenume: '',
                state: ''
            }
        };
    }

    shouldComponentUpdate() {
        if (this.state.isAuthenticated !== sessionStorage.getItem('isAuthenticated'))
            this.setState({
                isAuthenticated: sessionStorage.getItem('isAuthenticated')
            })
        return true;
    }

    componentDidMount() {
        if (sessionStorage.getItem('isAuthenticated') === 'true') {
            if (sessionStorage.getItem('verificat') !== '1') {
                this.Sign();
                this.SignNume();
            } else {
                var a = { id: 0, name: `${this.state.email}`, nume: sessionStorage.getItem('nume'), prenume: sessionStorage.getItem('prenume'), state: "inactive" }
                this.setState({ emails: this.state.emails.concat(a) })
            }
        } else {
            return (<Redirect to='/login' />);
        }
    }

    Sign = () => {
        this.clear();
        axios.post(this.state.server + '/api/login/Emails', {
            nume: this.state.filtru_nume,
            prenume: this.state.filtru_prenume
        }).then((Result) => {
            Result.data.map((d) => {
                this.setState({ elem: { id: d.id, name: d.name, nume: d.nume, prenume: d.prenume, state: d.state } })
                this.setState({ emails: this.state.emails.concat(this.state.elem) })
            })
        })
    }

    SignNume() {
        axios.post(this.state.server + '/api/login/Nume')
            .then(result => {
                result.data.nume.map(d => {
                    var a = d;
                    var aux = this.state.array_nume;
                    this.setState({ help_nume: this.state.array_nume.push(a) })
                });
                result.data.prenume.map(d => {
                    var a = d;
                    var aux = this.state.array_nume;
                    this.setState({ help_nume: this.state.array_prenume.push(a) })
                });
            })
    }

    Nume = (event) => {
        this.setState({ filtru_nume: event.target.value })
    }

    Hide = () => {
        this.setState({ fresh: !this.state.fresh })
    }

    Prenume = (event) => {
        this.setState({ filtru_prenume: event.target.value })
    }

    clear() {
        this.setState({
            emails: []
        })
    };

    Radio = (event) => {
        this.clear();
        this.setState({ radio: event.target.value })
        this.Sign();
    }

    Capitalize(str) {
        if (str != null)
            return str.charAt(0).toUpperCase() + str.slice(1);
        else
            return null;
    }

    render() {
        if (this.state.isAuthenticated === 'true') {
            return (
                <>
                    <Navbarul />
                    <div className='reclamatii-background'>
                        <div class="col">
                            <div class="row" style={{fontSize: "4vh", marginLeft: "40%"}}>History</div>
                            {sessionStorage.getItem('verificat') !== '1' ?
                                
                                        <div class="col">
                                            <div class="row">
                                                <CustomButton authStyle='/history' buttonStyle='bttn--outline' buttonSize='bttn--medium' onClick={this.Hide}>Show Filter</CustomButton>
                                            </div>
                                            <div class="row mx-n2">
                                                {this.state.fresh ?
                                                    <div style={{ width: "25%" }} class="row">
                                                        <div class="col">
                                                            <label for="nume" class="form-label text-light float-left">Last Name</label><br />
                                                            <select class="form-select" id="nume" defaultValue={'-'} onChange={this.Nume}>
                                                                {this.state.array_nume.map(d =>
                                                                    <option value={d}>{this.Capitalize(d)}</option>)
                                                                }
                                                            </select>
                                                        </div>
                                                        <div class="col">
                                                            <label for="prenume" class="form-label text-light float-left">First Name</label><br />
                                                            <select class="form-select" id="prenume" defaultValue={'-'} onChange={this.Prenume}>
                                                                {this.state.array_prenume.map(d =>
                                                                    <option value={d}>{this.Capitalize(d)}</option>)
                                                                }
                                                            </select>
                                                        </div>
                                                        <div class="col mt-4">
                                                            <div class="mt-2">
                                                                <CustomButton style={{ marginTop: "10vh" }} authStyle='/reclamatii' buttonStyle='bttn--outline' buttonSize='bttn--medium' onClick={this.Sign}>Filter</CustomButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null}
                                        </div>
                                        <Accordion emails={this.state.emails} prop2={this.state.fresh}></Accordion>
                                        </div>
                                : <Accordion emails={this.state.emails} prop2={this.state.fresh}></Accordion>
                            }
                        </div>
                    </div>
                </>);
        }
        if (this.state.isAuthenticated !== false) {
            return (<Redirect to="/login" />)
        }
    }
}