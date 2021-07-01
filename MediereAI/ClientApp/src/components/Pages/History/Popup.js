import React, { Children, useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import './../../../App.css';

function Popups(props) {
    const [buton, setButon] = useState(false)
    const [etape, setEtape] = useState('')
    const [show, setShow] = useState(false)
    var server = ''

    const Sign = () => {
        axios.post(server + '/api/faze/Read', {
            tip: props.id.toString()
        }
        ).then(result => {
            setEtape(result.data)
        })
        setButon(!buton)
    }

    const contentStyle = { backgroundColor: 'transparent', border: "none", maxHeight: "80vh", marginTop: "5vh", maxWidth: "80vw" };

    const Afisare = () => {
        setShow(!show)
    }

    return (
        <Popup trigger={props.children} class="modal-dialog modal-dialog-scrollable" tabindex="-1" position="top" modal={true} closeOnDocumentClick {...{ contentStyle }}>
            <div >
                <div class="modal-content">
                    <div class="modal-header">
                            <h5 class="modal-title">Case {props.id}</h5>
                    </div>
                    <div class="modal-body">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                                <h3>Description: </h3>
                            {props.text != null ? <div style={{ maxWidth: "120ch", marginLeft: '5px', marginTop: '0.7%' }}>{props.text}</div> : null}
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                                <h4>First party: </h4>
                            {props.reclamant != null ? <div style={{ maxWidth: "120ch", marginLeft: '5px', marginTop: '0.7%' }}>{props.reclamant}</div> : null}
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                                <h4>Second party: </h4>
                            {props.reclamat != null ? <div style={{ maxWidth: "120ch", marginLeft: '5px', marginTop: '0.7%' }}>{props.reclamat}</div> : null}
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                                <h4>Answer: </h4>
                            {props.raspuns != null ? <div style={{ maxWidth: "120ch", marginLeft: '5px', marginTop: '0.7%' }}>{props.raspuns}</div> : null}
                        </div>
                    </div>
                    <div class="modal-footer">
                        {props.raspuns == null ?
                            <button class="btn btn-primary">Request Help</button> :
                            <button class="btn btn-primary">Request Human Help</button>}
                    </div>
                </div>
            </div>
        </Popup>
    );
}

export default Popups;