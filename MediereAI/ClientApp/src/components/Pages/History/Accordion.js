import React, { Component,useState } from 'react';
import axios from 'axios';
import './Accordion.css';
import Popups from './Popup'
import { Link, withRouter } from 'react-router-dom'
//import Vizualizare from './Vizualizare'

class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accordions: this.props.emails,
            myJson: [],
            server: ''
        };
    }

    componentWillReceiveProps() {
        this.setState({ accordions: this.props.emails })
        this.forceUpdate();
    }

    Sign(emails) {
        axios.post(this.state.server + '/api/history/Read', {
            Email: emails,
            Parola: sessionStorage.getItem("practician") == 'true' ? sessionStorage.getItem('nume') + ' ' + sessionStorage.getItem('prenume') : "nu"
        }).then((Result) => {
            this.setState({ myJson: Result.data });
        })
    }

    handleClick = (currentAccordion) => {
        this.setState({ myJson: [] })
        this.Sign(currentAccordion.name);
    };

    Capitalize(str) {
        if (str != null)
            return str.charAt(0).toUpperCase() + str.slice(1);
        else
            return null;
    }

    render() {
        sessionStorage.setItem('mediat', 'false')
        console.log(this.state.myJson)
        const { accordions } = this.state;
        return (
            <>
                <div class="accordion accordion-flush" style={{
                    backgroundColor: "transparent"
                }} id="accordionExample">
                    {accordions.map((accordion, index) => {
                        return (
                            <div style={{ backgroundColor: "transparent" }} class="accordion-item">
                                <h2 class="accordion-header" id={"heading" + index}>
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} aria-expanded="false" aria-controls={"collapse" + index} onClick={() => this.handleClick(accordion)}>
                                        {this.Capitalize(accordion.nume)} {this.Capitalize(accordion.prenume)} ({accordion.name})
                            </button>
                                </h2>
                                <div id={"collapse" + index} class="accordion-collapse collapse" style={{ backgroundColor: "transparent" }} aria-labelledby={"heading" + index} data-bs-parent="#accordionExample">
                                    <div class="accordion-body" style={{
                                        backgroundColor: "transparent"
                                    }}>
                                        <table class="table table-dark table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th class="px-1" scope="col">Id &nbsp;</th>
                                                    <th class="px-1" scope="col">Name &nbsp;</th>
                                                    <th class="px-1" scope="col">Other Side &nbsp;</th>
                                                    <th class="px-1" scope="col">Subject &nbsp;</th>
                                                    <th class="px-1" scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.myJson.map(d =>
                                                    <Popups reclamant={d.reclamant} email={accordion.name} reclamat={d.reclamat} text={d.descriere} id={d.id} tip="persoana">
                                                        <tr key={d.id}>
                                                            <th class="px-1" scope="row">{d.id}</th>
                                                            <td class="px-1">{d.reclamant}</td>
                                                            <td class="px-1">{d.reclamat}</td>
                                                            <td class="px-1">{d.subiect}</td>
                                                            <td class="px-1">{d.statusMediere}</td>
                                                        </tr>
                                                    </Popups>
                                                )
                                                }
                                            </tbody>
                                        </table >
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        );
    }
}

export default withRouter(Accordion)