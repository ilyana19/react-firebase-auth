import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {withFirebase} from '../Firebase';
import {compose} from 'recompose';

const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
  </div>
)

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  error: null
}

class SignUpFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = {...INITIAL_STATE}
  }

  onSubmit = e => {
    const {username, email, password} = this.state

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({...INITIAL_STATE})
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({error})
      })

    e.preventDefault();
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      error
    } = this.state

    const isInvalid = password !== passwordConfirmation ||
                      password === '' ||
                      email === '' ||
                      username === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Enter Username"
        />
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
        <input
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={this.onChange}
          type="password"
          placeholder="Enter Password Again"
        />
        <button type="submit" disabled={isInvalid}>Sign Up</button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const SignUpLink = () => (
  <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>SIGN UP</Link></p>
)

// const SignUpForm = withFirebase(SignUpFormBase);
const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase)

export default SignUpPage;
export {SignUpForm, SignUpLink};