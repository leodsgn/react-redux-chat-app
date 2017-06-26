import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { registerName } from "../../actions/action_creators";

import "./login.css";
import chatbg from "./chatbg.png";


class Login extends Component {
    constructor(props){
        super(props)
    }

    componentWillMount() {
        if(!localStorage.getItem("name")) {
            <Redirect path="/chat"></Redirect>
        }
    }

    doSubmit({name}) {
        this.props.registerName({name});
        <Redirect to="/chat"/>
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
                        <form onSubmit={handleSubmit(registerName)}>
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
        ...state.form
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