import React, { useState } from 'react'
import axios from 'axios'
import Navbarul from '../../Navbar/Navbar'
import BarCharts from './Bar'

export default class Report extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lista: [],
            aux: '',
            elem: {
                numar: '',
                email: ''
            },
            etichete: [],
            numere: [],
            help1: [],
            help2: [],
            server: ''
        }
    }
    componentDidMount() {
        this.setareLista();
    }
    setareLista() {
        axios.post(this.state.server + '/api/history/Vizite')
            .then(result =>
                result.data.map(d => {
                    var elem = { numar: d.id, email: d.name, counter: d.state }
                    this.setState({ aux: this.state.lista.push(elem) })
                })
            )
        axios.post(this.state.server + '/api/view/Chart')
            .then(result => {
                result.data.map(
                    d => {
                        this.setState({ help1: this.state.etichete.push(d.data) })
                        this.setState({ help2: this.state.numere.push(parseInt(d.numarVizualizari)) })
                    }
                )
            })
    }

    render() {
        return (
            <>
                <Navbarul />
                <div className="report">
                    <h1 style={{marginTop: "-40vh", marginBottom: "-10vh"}}>Report</h1>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "70%", marginLeft: "10vw" }}>
                        <table class="table table-dark table-striped table-hover ms-5" style={{ fontSize: '15px', whiteSpace: "nowrap", marginRight: "10px" }}>
                            <thead>
                                <tr>
                                    <th class="px-1">Email</th>
                                    <th class="px-1">Complaints</th>
                                    <th class="px-1">Visits</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.lista.map((d) => (
                                    <tr key={d.email}>
                                        <td class="px-1" key={d.email}>{d.email}</td>
                                        <td class="px-1" key={d.email}>{d.numar}</td>
                                        <td class="px-1" key={d.email}>{d.counter}</td>
                                    </tr>))}
                            </tbody>
                        </table>
                        <div className='chart' style={{marginTop: "15vh"}}>
                            <BarCharts etichete={this.state.etichete} numere={this.state.numere} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}