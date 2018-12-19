import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

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

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE}
  }

  onSubmit = e => {

  }

  onChange = e => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      error
    } = this.state

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
          type="text"
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
        <button type="submit">Sign Up</button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const SignUpLink = () => {
  <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>SIGN UP!</Link></p>
}

export default SignUpPage;
export {SignUpForm, SignUpLink};