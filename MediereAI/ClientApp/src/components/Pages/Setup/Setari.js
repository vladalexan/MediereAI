import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../../Navbar/Navbar';

export default class Setup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            home: null,
            contact: null,
            istoric: null,
            mediere: null,
            raspuns: null,
            imgBlog: null,
            imgCardCerere: null,
            imgPractician: null,
            imgObservator: null,
            blog: '',
            email: '',
            parola: '',
            locatie: '',

            titlu: '',
            nume: '',
            descriere: '',
            CV: '',

            numeO: '',
            descriereO: '',
            linkO: '',

            emailInvPrac: '',
            emailInvObs: '',

            radio: '',
            radio2: '',
            server: '',

            dc: true,
            ia: false,

            enablePrac: '',
            enableObs: '',
            practicieni: [],
            observatori: []
        }
    }
    componentDidMount() {
        this.setState({ radio: '' })
        this.setState({ radio2: '' })
        axios.post(this.state.server + "/api/update/AllPrac")
            .then(result => this.setState({ practicieni: result.data }))
        axios.post(this.state.server + "/api/update/AllObs")
            .then(result => this.setState({ observatori: result.data }))
    }

    InvitatiePrac = (event) => {
        this.setState({ emailInvPrac: event.target.value })
    }

    InvitatieObs = (event) => {
        this.setState({ emailInvObs: event.target.value })
    }

    Email = (event) => {
        this.setState({
            email: event.target.value
        })
    };

    Parola = (event) => {
        this.setState({
            parola: event.target.value
        })
    };

    Adresa = (event) => {
        this.setState({
            locatie: event.target.value
        })
    };

    Blog = (event) => {
        this.setState({
            blog: event.target.value
        })
    };

    Home = (event) => {
        this.setState({
            home: event.target.files[0]
        })
    };

    Contact = (event) => {
        this.setState({
            contact: event.target.files[0]
        })
    };

    Istoric = (event) => {
        this.setState({
            istoric: event.target.files[0]
        })
    };

    Mediere = (event) => {
        this.setState({
            mediere: event.target.files[0]
        })
    };

    BlogImg = (event) => {
        this.setState({
            imgBlog: event.target.files[0]
        })
    };

    CardCerereImg = (event) => {
        this.setState({
            imgCardCerere: event.target.files[0]
        })
    };

    PracticianImg = (event) => {
        this.setState({
            imgPractician: event.target.files[0]
        })
    };

    ObservatorImg = (event) => {
        //event.target.files[0].name = this.state.nume+'.jpg'
        this.setState({
            imgObservator: event.target.files[0]
        })
    };

    PracticianCV = (event) => {
        //event.target.files[0].name=this.state.nume+'.pdf'
        this.setState({
            CV: event.target.files[0]
        })
    };

    Titlu = (event) => {
        this.setState({
            titlu: event.target.value
        })
    };

    Nume = (event) => {
        this.setState({
            nume: event.target.value
        })
    };

    NumeO = (event) => {
        this.setState({
            numeO: event.target.value
        })
    };

    LinkO = (event) => {
        this.setState({
            linkO: event.target.value
        })
    };

    Descriere = (event) => {
        this.setState({
            descriere: event.target.value
        })
    };

    DescriereO = (event) => {
        this.setState({
            descriereO: event.target.value
        })
    }

    SignEmail = (event) => {

        axios.post(this.state.server + '/api/update/Email',
            {
                Email: this.state.email,
                Parola: this.state.parola
            }).then(
                alert("Contul pentru email-uri a fost actualizat")
            )
    }

    SignAdresa = (event) => {
        axios.post(this.state.server + '/api/update/Adresa', {
            user: this.state.locatie
        }).then(
            alert("Address was updated")
        )
    }

    SignHome = (event) => {
        var formData = new FormData()
        formData.append('body', this.state.home)
        axios({
            method: "POST",
            url: this.state.server + '/api/view/PozaHome',
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(
            alert("Home background updated")
        )
    }

    SignContact = (event) => {
        var formData = new FormData()
        formData.append('body', this.state.contact)
        axios({
            method: "POST",
            url: this.state.server + '/api/view/PozaContact',
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(
            alert("Contact background updated")
        )
    }

    SignIstoric = (event) => {
        var formData = new FormData()
        formData.append('body', this.state.istoric)
        axios({
            method: "POST",
            url: this.state.server + '/api/view/PozaIstoric',
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(
            alert("History background updated")
        )
    }

    SignMediere = (event) => {
        var formData = new FormData()
        formData.append('body', this.state.mediere)
        axios({
            method: "POST",
            url: this.state.server + '/api/view/PozaFormular',
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(
            alert("Complaint Form background updated")
        )
    }

    Radio = (event) => {
        this.setState({ radio: event.target.value })
    }

    Radio2 = (event) => {
        this.setState({ radio2: event.target.value })
    }


    IA = () => {
        this.setState({ ia: true })
        this.setState({ dc: false })
    }

    DC = () => {
        this.setState({ ia: false })
        this.setState({ dc: true })
    }

    setPrac = (event) => {
        this.setState({ enablePrac: event.target.value })
    }

    setObs = (event) => {
        this.setState({ enableObs: event.target.value })
    }

    render() {
        return (
            <>
                <Navbar />
                <div style={{ display: "flex", alignItems: "center", justifyContent: 'center', width: "100%", backgroundColor: "black" }}>
                    <button className="btnl" onClick={this.DC}>Contact Info</button> &nbsp;
                            <button className="btnl" onClick={this.IA}>App Images</button> &nbsp;
                </div>
                {sessionStorage.getItem('admin') === 'true' ?
                    <div className='setup'>
                        {this.state.dc === true ? <div style={{ height: "90%" }}>
                            <div style={{ marginTop: "5px" }}>
                                <div style={{
                                    backgroundColor: "gray", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <div style={{ flexDirection: "column", marginBottom: "10px" }}>
                                        <label>Email (Gmail):</label>
                                        <input type="text" onChange={this.Email} />
                                    </div>
                                    <div style={{ flexDirection: "column", marginBottom: "5px" }}>
                                        <label>Password:</label>
                                        <input type="text" onChange={this.Parola} />
                                    </div>
                                    <button className="btnl" onClick={this.SignEmail}>Update Email Client</button>
                                </div>
                            </div>
                            <div style={{ display: "flex", marginTop: '40px' }}>
                                <div style={{ backgroundColor: "gray", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ flexDirection: "row", marginBottom: "5px" }}>
                                        <label>Address:</label>
                                        <input type="text" onChange={this.Adresa} />
                                    </div>
                                    <button class="btnl" onClick={this.SignAdresa}>Update Address</button>
                                </div>
                            </div>
                        </div> : null}
                        {this.state.ia === true ? <div style={{ height: "90%" }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ marginTop: '30px' }}>
                                        <div style={{ backgroundColor: "gray", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ flexDirection: "row", marginBottom: "5px" }}>
                                                <label>Home Background:</label>
                                                <input type="file" onChange={this.Home} />
                                            </div>
                                            <button className="btnl" onClick={this.SignHome}>Submit</button>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '30px' }}>
                                        <div style={{ backgroundColor: "gray", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ flexDirection: "row", marginBottom: "5px" }}>
                                                <label>Contact Background:</label>
                                                <input type="file" onChange={this.Contact} />
                                            </div>
                                            <button className="btnl" onClick={this.SignContact}>Submit</button>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div style={{ margin: "20px" }}>&nbsp;</div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ marginTop: '30px' }}>
                                        <div style={{ backgroundColor: "gray", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ flexDirection: "row", marginBottom: "5px" }}>
                                                <label>History Background:</label>
                                                <input type="file" onChange={this.Istoric} />
                                            </div>
                                            <button className="btnl" onClick={this.SignIstoric}>Submit</button>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '30px' }}>
                                        <div style={{ backgroundColor: "gray", flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ flexDirection: "row", marginBottom: "5px" }}>
                                                <label>Form Background:</label>
                                                <input type="file" onChange={this.Mediere} />
                                            </div>
                                            <button className="btnl" onClick={this.SignMediere}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div > : null}
                    </div> : null}
            </>
        );
    }
}
