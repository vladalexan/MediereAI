import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../../Navbar/Navbar'

export default class Formular extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true' ? true : false,
            submit: false,
            limita: 8000,
            nume: sessionStorage.getItem('nume'),
            prenume: sessionStorage.getItem('prenume'),
            email: sessionStorage.getItem('email'),
            telefon: '',
            selectReclamant: '',
            tara: '',
            judet: '',
            oras: '',
            codPostal: '',
            numeReclamant: sessionStorage.getItem('nume'),
            prenumeReclamant: sessionStorage.getItem('prenume'),
            emailReclamant: sessionStorage.getItem('email'),
            telefonReclamant: '',
            taraReclamant: '',
            judetReclamant: '',
            orasReclamant: '',
            zi: '',
            luna: '',
            an: '',
            subiect: '',
            text: '',
            server: ''
        }
    }

    Sign = (event) => {

        if (this.state.isAuthenticated !== true) {

            axios.post(this.state.server + '/api/login/Insert', {
                LastName: this.state.numeReclamant,
                FirstName: this.state.prenumeReclamant,
                Email: this.state.email,
                Phone: this.state.telefon,
                Password: 'de schimbat',
                Country: this.state.tara,
                County: this.state.judet,
                City: this.state.oras,
                Verificat: 0,
                Counter: 1
            })
        }

        axios.post(this.state.server + '/api/history/Write', {
            Reclamant: this.state.numeReclamant + ' ' + this.state.prenumeReclamant,
            Email: this.state.emailReclamant,
            Reclamat: this.state.numeReclamat + this.state.prenumeReclamat,
            EmailReclamat: this.state.emailReclamat,
            TelefonReclamat: this.state.telefonReclamat,
            TaraReclamat: this.state.taraReclamat,
            JudetReclamat: this.state.judetReclamat,
            OrasReclamat: this.state.orasReclamat,
            DataTranzactiei: this.state.zi + '-' + this.state.luna + '-' + this.state.an,
            Subiect: this.state.subiect,
            Descriere: this.state.text,
        }).then((result) => {
            console.log(result);
            if (result.data.status === "Invalid")
                alert('Formular Invalid!');
            if (result.data.status === "Exists")
                alert('Eroare la crearea reclamatiei!');
            if (result.data.status === "Success") {

                this.setState({ submit: true })
                alert('Reclamatie adaugata cu succes!')
            }
        })
        /*
        axios.post(this.state.server + '/api/history/Exemplu', {
            Nume: this.state.numeReclamant,
            Prenume: this.state.prenumeReclamant,
            Email: this.state.emailReclamant,
            Telefon: this.state.telefon,
            Tara: this.state.tara,
            Judet: this.state.judet,
            Oras: this.state.oras,
            CodPostal: this.state.codPostal,
            NumeReclamat: this.state.numeReclamat,
            PrenumeReclamat: this.state.prenumeReclamat,
            EmailReclamat: this.state.emailReclamat,
            TelefonReclamat: this.state.telefonReclamat,
            TaraReclamat: this.state.taraReclamat,
            JudetReclamat: this.state.judetReclamat,
            OrasReclamat: this.state.orasReclamat,
            Zi: this.state.zi,
            Luna: this.state.luna,
            An: this.state.an,
            Subiect: this.state.subiect,
            Text: this.state.text
        })*/
        axios.post(this.state.server + '/api/history/Email', {
            Mail: this.state.emailReclamant,
            Status: "Complaint registered",
            Text_mediat: this.state.text,
            Reclamant: this.state.numeReclamant + " " + this.state.prenumeReclamant,
            Reclamat: this.state.numeReclamat + " " + this.state.prenumeReclamat,
        })

        axios.post(this.state.server + '/api/history/Email', {
            Mail: this.state.emailReclamat,
            Status: "Complaint registered",
            Text_mediat: this.state.text,
            Reclamant: this.state.numeReclamant + " " + this.state.prenumeReclamant,
            Reclamat: this.state.numeReclamat + " " + this.state.prenumeReclamat,
        })
    }

    Nume = (event) => {
        this.setState({
            nume: event.target.value
        })

        this.setState({
            numeReclamant: event.target.value
        })
    };

    Prenume = (event) => {
        this.setState({
            prenume: event.target.value
        })

        this.setState({
            prenumeReclamant: event.target.value
        })
    };

    Email = (event) => {
        this.setState({
            email: event.target.value
        })
        this.setState({
            emailReclamant: event.target.value
        })
    };

    Telefon = (event) => {
        this.setState({
            telefon: event.target.value
        })

        this.setState({
            telefonReclamant: event.target.value
        })
    };

    handleReclamant = (event) => {
        this.setState({
            selectReclamant: event.target.value
        })
    };

    Tara = (event) => {
        this.setState({
            tara: event.target.value
        })
        this.setState({
            taraReclamant: event.target.value
        })
    };

    Judet = (event) => {
        this.setState({
            judet: event.target.value
        })
        this.setState({
            judetReclamant: event.target.value
        })
    };

    Oras = (event) => {
        this.setState({
            oras: event.target.value
        })
        this.setState({
            orasReclamant: event.target.value
        })
    };

    CodPostal = (event) => {
        this.setState({
            codPostal: event.target.value
        })
    };

    NumeReclamat = (event) => {
        this.setState({
            numeReclamat: event.target.value
        })
    };

    PrenumeReclamat = (event) => {
        this.setState({
            prenumeReclamat: event.target.value
        })
    };

    EmailReclamat = (event) => {
        this.setState({
            emailReclamat: event.target.value
        })
    };

    TelefonReclamat = (event) => {
        this.setState({
            telefonReclamat: event.target.value
        })
    };

    handleReclamat = (event) => {
        this.setState({
            selectReclamat: event.target.value
        })
    };

    TaraReclamat = (event) => {
        this.setState({
            taraReclamat: event.target.value
        })
    };

    JudetReclamat = (event) => {
        this.setState({
            judetReclamat: event.target.value
        })
    };

    OrasReclamat = (event) => {
        this.setState({
            orasReclamat: event.target.value
        })
    };

    Zi = (event) => {
        this.setState({
            zi: event.target.value
        })
    };

    Luna = (event) => {
        this.setState({
            luna: event.target.value
        })
    };

    An = (event) => {
        this.setState({
            an: event.target.value
        })
    };

    Subiect = (event) => {
        this.setState({
            subiect: event.target.value
        })
    };

    Text = (event) => {
        this.setState({
            text: event.target.value
        })
    };

    render() {
        return (
            <>
                <Navbar />
                <div className='formular'>

                    <div>
                        <h1 className='titlu' style={{marginTop: "-25vh"}}>REGISTER COMPLAINT</h1>
                        <div class="col">
                            <div style={{ fontSize: "2.5vh", width: "100%" }} class="row justify-content-center">
                                Fields marked by * are required
                            </div>
                            <div class="row mx-5">
                                {this.state.isAuthenticated ? (this.state.submit
                                    ? <Redirect push={true} to="/" />
                                    : <div style={{ fontSize: "2.5vh" }} class="col-lg-4 col-sm-3 col-xs-2">
                                        <h1>Your data:</h1>
                                        <h4 className='texted'>Your personal data was filled in from our database</h4>
                                    </div>
                                )
                                    : <div style={{ fontSize: "2.5vh" }} class="col-lg-4 col-sm-3 col-xs-2">
                                        <div class="row">
                                            <h1>Your data:</h1>
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                <label class="form-label text-light float-left" htmlFor="reclamat">Last Name*</label>
                                                <input class="form-control" type="text" onChange={this.Nume} name="nume" placeholder="last name" />
                                            </div>
                                            <div class="col">
                                                <label class="form-label text-light float-left" htmlFor="reclamat">First Name*</label>
                                                <input class="form-control" type="text" onChange={this.Prenume} name="prenume" placeholder="first name" />
                                            </div>
                                        </div>
                                        <label class="form-label text-light float-left" htmlFor="reclamat">Email*</label>
                                        <input class="form-control" type="text" onChange={this.Email} name="email" placeholder="email" />
                                        <label class="form-label text-light float-left" htmlFor="reclamat">Phone*</label>
                                        <input class="form-control" type="text" onChange={this.Telefon} name="telefon" placeholder="phone" />
                                        <div class="row">
                                            <div class="col">
                                                <label class="form-label text-light float-left" htmlFor="reclamat">Country</label>
                                                <input class="form-control" type="text" onChange={this.Tara} name="tara" placeholder="country" />
                                            </div>
                                            <div class="col">
                                                <label class="form-label text-light float-left" htmlFor="reclamat">County</label>
                                                <input class="form-control" type="text" onChange={this.Judet} name="judet" placeholder="county" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                <label class="form-label text-light float-left" htmlFor="reclamat">City</label>
                                                <input class="form-control" type="text" onChange={this.Oras} name="oras" placeholder="city" />
                                            </div>
                                            <div class="col">
                                                <label class="form-label text-light float-left" htmlFor="reclamat">Postcode</label>
                                                <input class="form-control" type="text" onChange={this.CodPostal} name="cod postal" placeholder="postcode" />
                                            </div>
                                        </div>
                                    </div>

                                }
                                <div style={{ fontSize: "2.5vh" }} class="col-lg-4 col-sm-3 col-xs-2">
                                    <h1>Other person's data:</h1>
                                    <div class="row">
                                        <div class="col">
                                            <label class="form-label text-light float-left" htmlFor="reclamat">Last Name</label>
                                            <input class="form-control" type="text" onChange={this.NumeReclamat} name="nume" placeholder="last name" />
                                        </div>
                                        <div class="col">
                                            <label class="form-label text-light float-left" htmlFor="reclamat">First Name</label>
                                            <input class="form-control" type="text" onChange={this.PrenumeReclamat} name="prenume" placeholder="first name" />
                                        </div>
                                    </div>
                                    <label class="form-label text-light float-left" htmlFor="reclamat">Email</label>
                                    <input class="form-control" type="text" onChange={this.EmailReclamat} name="email" placeholder="email" />
                                    <label class="form-label text-light float-left" htmlFor="reclamat">Phone</label>
                                    <input class="form-control" type="text" onChange={this.TelefonReclamat} name="telefon" placeholder="phone" />
                                    <div class="row">
                                        <div class="col">
                                            <label class="form-label text-light float-left" htmlFor="reclamat">Country</label>
                                            <input class="form-control" type="text" onChange={this.TaraReclamat} name="tara" placeholder="country" />
                                        </div>
                                        <div class="col">
                                            <label class="form-label text-light float-left" htmlFor="reclamat">County</label>
                                            <input class="form-control" type="text" onChange={this.JudetReclamat} name="judet" placeholder="county" />
                                        </div>
                                    </div>
                                    <label class="form-label text-light float-left" htmlFor="reclamat">City</label>
                                    <input class="form-control" type="text" onChange={this.OrasReclamat} name="oras" placeholder="city" />
                                </div>
                                <div style={{ fontSize: "2.5vh" }} class="col-lg-4 col-sm-3 col-xs-2">
                                    <h1>Details:</h1>
                                    <div class="d-flex justify-content-start">
                                        <label class="form-label text-light float-left" htmlFor="reclamat">Date:</label>
                                    </div>
                                    <div class="d-flex flex-row bd-highlight">
                                        <select class="form-select" defaultValue={'DEFAULT'} onChange={this.Zi}>
                                            <option value="DEFAULT" disabled>dd</option>
                                            <option value="1">01</option>
                                            <option value="2">02</option>
                                            <option value="3">03</option>
                                            <option value="4">04</option>
                                            <option value="5">05</option>
                                            <option value="6">06</option>
                                            <option value="7">07</option>
                                            <option value="8">08</option>
                                            <option value="9">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                        </select>
                                        <div>-</div>
                                        <select class="form-select" defaultValue={'DEFAULT'} onChange={this.Luna}>
                                            <option value="DEFAULT" disabled>mm</option>
                                            <option value="1">01</option>
                                            <option value="2">02</option>
                                            <option value="3">03</option>
                                            <option value="4">04</option>
                                            <option value="5">05</option>
                                            <option value="6">06</option>
                                            <option value="7">07</option>
                                            <option value="8">08</option>
                                            <option value="9">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                        <div>-</div>
                                        <select class="form-select" defaultValue={'DEFAULT'} onChange={this.An}>
                                            <option value="DEFAULT" disabled>yyyy</option>
                                            <option value="2010">2010</option>
                                            <option value="2011">2011</option>
                                            <option value="2012">2012</option>
                                            <option value="2013">2013</option>
                                            <option value="2014">2014</option>
                                            <option value="2015">2015</option>
                                            <option value="2016">2016</option>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                        </select>
                                    </div>
                                    <label class="form-label text-light float-left" htmlFor="text">Subject</label>
                                    <input class="form-control" type="text" onChange={this.Subiect} name="subject" placeholder="subject" />
                                    <label class="form-label text-light float-left" htmlFor="text">Description</label>
                                    <textarea class="form-control" maxLength={this.state.limita} onChange={this.Text} rows="5" cols="40"></textarea>
                                    <div class="d-flex justify-content-start">
                                        <label class="form-label text-light float-left" style={{ flaot: "left" }}>{this.state.text.length}/{this.state.limita}</label>
                                    </div>
                                    <div class="d-flex justify-content-start">
                                        <button onClick={this.Sign} class="btn btn-primary float-left">
                                            Submit
                                            </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}