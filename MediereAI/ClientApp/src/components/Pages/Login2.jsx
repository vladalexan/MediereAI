import React from "react";
import "./login.scss";
import { Invitatie } from "./Invitatie";
import Navbar from '../Navbar'
import './../Navbar.css'
class Autentificare2 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogginActive: false,
        }
        console.log(props)
    }

    componentDidMount() {

    }

    render() {

        const { isLogginActive } = this.state;
        const current = isLogginActive ? "Inregistrare" : "Autentificare";
        const currentActive = isLogginActive ? "login" : "register";
        return (
            <div>
                <Navbar />
                <div className="login-background">
                    <div className="Autentificare">
                        <div className="login">
                            <div className="container" ref={ref => (this.container = ref)}>
                                {!isLogginActive && (
                                    <Invitatie containerRef={ref => (this.current = ref)} />
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Autentificare2;