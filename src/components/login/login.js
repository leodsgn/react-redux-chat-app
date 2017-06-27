import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { registerName } from "../../actions/action_creators";

import "./login.css";
import chatbg from "./chatbg.png";

require("dotenv").config();

class Login extends Component {
    constructor(props){
        super(props)
    }

    componentWillMount() {
        if(localStorage.getItem("name")) {
            this.props.history.push("/chat");
        }
    }

    doSubmit({name}) {
        this.props.history.push("/chat");
        this.props.registerName({name});
    }

    render() {

        const { handleSubmit } = this.props

        return (
            <main className="login_page">
                <section className="login">
                    <figure className="login__image-presenter">
                        <img src={chatbg} alt="" />
                    </figure>
                    <div className="login__form">
                        <form onSubmit={handleSubmit(this.doSubmit.bind(this))}>
                            <Field name="name" component="input" type="text" placeholder="Enter your name" />
                            <button type="submit">Entrar no chat</button>
                        </form>
                    </div>
                </section>
            </main>
        )
    }
 
}

function mapStateToProps(state) {
    return {
        ...state.form,
        ...state.history
    }
}

const mapDispatchToProps = {
     registerName
}

const formLogin = reduxForm({
    form: "login",
    fields: ['name']
})(Login);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(formLogin))
// export default withRouter(loginForm)