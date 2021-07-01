import React from "react";
import "./login.scss";
import { Login } from "./Login/login";
import { Register } from "./Login/register";
import Navbar from './../Navbar/Navbar'

class Autentificare extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogginActive: true,
        }
        console.log(props)
    }


    componentDidMount() {
        this.rightSide.classList.add("right");
    }

    changeState() {
        const { isLogginActive } = this.state;

        if (isLogginActive) {
            this.rightSide.classList.remove("right");
            this.rightSide.classList.add("left");
        } else {
            this.rightSide.classList.remove("left");
            this.rightSide.classList.add("right");
        }
        this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
    }

    render() {
        const { isLogginActive } = this.state;
        const current = isLogginActive ? "Register" : "Login";
        const currentActive = isLogginActive ? "login" : "register";
        return (
            <div>
                <Navbar />
                <div className="Autentificare">
                    <div className="login">
                        <div className="container" ref={ref => (this.container = ref)}>
                            {isLogginActive && (
                                <Login containerRef={ref => (this.current = ref)} />
                            )}
                            {!isLogginActive && (
                                <Register containerRef={ref => (this.current = ref)} />
                            )}
                        </div>
                        <RightSide
                            current={current}
                            currentActive={currentActive}
                            containerRef={ref => (this.rightSide = ref)}
                            onClick={this.changeState.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const RightSide = props => {
    return (
        <div
            className="right-side"
            ref={props.containerRef}
            onClick={props.onClick}
        >
            <div className="inner-container">
                <div className="text">{props.current}</div>
            </div>
        </div>
    );
};

export default Autentificare;

/*class Autentificare extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            Pornit: true,
        }
        console.log(props)
    }

    componentDidMount() {
        this.rightSide.classList.add("right");
    }

    changeState() {
        const { Pornit } = this.state;

        if (Pornit) {
            this.rightSide.classList.remove("right");
            this.rightSide.classList.add("left");
        } else {
            this.rightSide.classList.remove("left");
            this.rightSide.classList.add("right");
        }
        this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
    }

    render() {
        
        const { Pornit } = this.state;
        const current = Pornit ? "Inregistrare" : "Autentificare";
        const currentActive = Pornit ? "login" : "register";
        return (
            <div>
                <Navbar/>
            <div className="Autentificare">
                <div className="login">
                    <div className="container" ref={ref => (this.container = ref)}>
                        {Pornit && (
                            <Login containerRef={ref => (this.current = ref)} />
                        )}
                        {!Pornit && (
                            <Register containerRef={ref => (this.current = ref)} />
                        )}
                    </div>
                    <RightSide
                        current={current}
                        currentActive={currentActive}
                        containerRef={ref => (this.rightSide = ref)}
                        onClick={this.changeState.bind(this)}
                    />
                </div>
                </div>
                </div>
        );
    }
}

const RightSide = props => {
    return (
        <div
            className="right-side"
            ref={props.containerRef}
            onClick={props.onClick}
        >
            <div className="inner-container">
                <div className="text">{props.current}</div>
            </div>
        </div>
    );
};

export default Autentificare;*/