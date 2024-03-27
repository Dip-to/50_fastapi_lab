import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';
import registerImg from '../assets/images/register1.png';
import userIcon from '../assets/images/user.png';

const Register = () => {
  const [credentials, setCredentials] = useState({
    userName: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  });

  const [validationMessages, setValidationMessages] = useState({
    userName: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validation
    const newValidationMessages = {};

    if (
      credentials.password !== credentials.confirm_password ||
      credentials.password.length < 6
    ) {
      newValidationMessages.password =
        'Passwords do not match or are less than six characters!';
    }

    if (!credentials.email || !credentials.email.includes('@')) {
      newValidationMessages.email = 'Please enter a valid email address!';
    }

    if (
      !credentials.phone_number ||
      credentials.phone_number.length !== 11 ||
      isNaN(credentials.phone_number)
    ) {
      newValidationMessages.phone_number =
        'Phone number must be exactly 11 digits and contain only numbers!';
    }

    setValidationMessages(newValidationMessages);

    if (Object.keys(newValidationMessages).length === 0) {
      try {
        const response = await axios.post('http://localhost:8000/register/', credentials);
        console.log(response.data);
        setRegistrationSuccess(true);
        setRegistrationError('');
        // Reset form or navigate to login page upon successful registration
      } catch (error) {
        console.error('Error registering user:', error.response.data.detail);
        setRegistrationError(error.response.data.detail);
        setRegistrationSuccess(false);
        // Update validation messages or show appropriate error to the user
      }
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className='login__container d-flex justify-content-between'>
              <div className='login__img'>
                <img src={registerImg} alt='' />
              </div>
              <div className='login__form'>
                <div className='user'>
                  <img src={userIcon} alt='' />
                </div>
                <h2>Register</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type='text'
                      placeholder='Username'
                      required
                      id='userName'
                      onChange={handleChange}
                    />
                    {validationMessages.userName && (
                      <span className='error'>{validationMessages.userName}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      type='email'
                      placeholder='Email'
                      required
                      id='email'
                      onChange={handleChange}
                    />
                    {validationMessages.email && (
                      <span className='error'>{validationMessages.email}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      type='tel'
                      placeholder='Phone Number'
                      required
                      id='phone_number'
                      onChange={handleChange}
                    />
                    {validationMessages.phone_number && (
                      <span className='error'>{validationMessages.phone_number}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      type='password'
                      placeholder='Password'
                      required
                      id='password'
                      onChange={handleChange}
                    />
                    {validationMessages.password && (
                      <span className='error'>{validationMessages.password}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      type='password'
                      placeholder='Confirm Password'
                      required
                      id='confirm_password'
                      onChange={handleChange}
                    />
                    {validationMessages.confirm_password && (
                      <span className='error'>{validationMessages.confirm_password}</span>
                    )}
                  </FormGroup>
                  <Button className='btn secondary__btn auth__btn' type='submit'>
                    Register
                  </Button>
                </Form>
                {registrationSuccess && <p>Registration successful!</p>}
                {registrationError && <p className='error'>{registrationError}</p>}
                <p>
                  Already have an account? <Link to='/login'>Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
