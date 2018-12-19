import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {SignUpLink} from '../SignUp';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignInFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = {...INITIAL_STATE}
  }

  onSubmit = e => {
    const {email, password} = this.state

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({...INITIAL_STATE})
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({error})
      })

    e.preventDefault()
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const {email, password, error} = this.state
    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Enter Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Enter Password"
        />
        <button disabled={isInvalid} type="submit">Sign In</button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const SignInLink = () => (
  <p>Already have an account? <Link to={ROUTES.SIGN_IN}>SIGN IN</Link></p>
)

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase)

export default SignInPage;
export {SignInForm, SignInLink}