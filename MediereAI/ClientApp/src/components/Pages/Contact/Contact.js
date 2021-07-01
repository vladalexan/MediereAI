import React, { useState } from 'react'
import axios from 'axios'
import Navbarul from '../../Navbar/Navbar.js'
export default class Contact extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nume: '',
            email: '',
            text: '',
            limita: 1000,
            locatie: '',
            server: '',
            string: ''
        }
    }
    componentDidMount() {
        this.Sign()
    }

    Nume = (event) => {
        this.setState({
            nume: event.target.value
        })
    }

    Nume = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    Text = (event) => {
        this.setState({
            text: event.target.value
        })
    };

    Sign() {
        axios.post(this.state.server + '/api/view/getAdresa')
            .then(Result => {
                this.setState({ locatie: Result.data })
                //this.setState({ string: "https://maps.google.com/maps?width=70%25&amp;height=200&amp;hl=en&amp;q=" + Result.data + "+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" })
            })
    }

    SignMesaj = () => {
        if (this.state.nume !== null && this.state.email !== null && this.state.text !== null) {
            axios.post(this.state.server + '/api/update/Contact', {
                nume: this.state.nume,
                email: this.state.email,
                text: this.state.text
            })
        }
    }
    render() {
        return (
            <>
                <Navbarul />
                <div style={{ background: "url('/images/Contact.jpg') center center/cover", color: "white", height: "94.2vh"}}>
                    <h1 class="d-flex justify-content-center">CONTACT</h1>

                    <div style={{ width: "90%", marginLeft: "10%", marginRight: "10%", marginTop:"5vh" }} class="row text-light">
                        <div class="col">
                            <label for="nume" class="form-label float-left">Name</label>
                            <input class="form-control" type="text" id="nume" onChange={this.Nume} />
                            <label for="email" class="form-label float-left">Email</label>
                            <input class="form-control" type="text" id="email" onChange={this.Email} />
                            <div class="row">
                                <div class="col">
                                    <label for="mesaj" class="form-label float-left">Mesaj</label>
                                    <textarea class="form-control" id="mesaj" maxLength={this.state.limita} onChange={this.Text} rows="4" cols="50"/>
                                    <div class="form-label float-left">{this.state.text.length}/{this.state.limita}</div>
                                </div>
                            </div>
                            <div style={{ width: "17%" }} class="row">
                                <button class="btn btn-primary mx-3" onClick={this.SignMesaj}>Submit</button>
                            </div>
                        </div>
                        <div class="col my-3">
                            <div class="row">
                                <h5>Phone: 0735494218</h5>
                            </div>
                            <div class="row">
                                <h5>Email: alexandru_vlad21@yahoo.com</h5>
                            </div>
                            <div class="row">
                                <h5>Facebook: placeholder</h5>
                            </div>
                            <div class="row">
                                <h5>LinkedIn: placeholder</h5>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <h5 style={{ whiteSpace: "nowrap" }}>Address:&nbsp;</h5> <h5>{this.state.locatie}</h5>
                            </div>
                            <div style={{ width: "100%" }}><iframe width="80%" height="200" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Str.G-ral I.E.FLorescu, Bl. B1b&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe></div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}