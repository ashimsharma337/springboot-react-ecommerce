import { useState, type FormEvent } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';
import './login.css';

interface LoginComponentProps {
  show: boolean;
  handleClose: () => void;
  onLoginSuccess: () => void;
}

const LoginComponent = ({
  show,
  handleClose,
  onLoginSuccess,
}: LoginComponentProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post<string>(
        'http://localhost:8000/api/users/login',
        { username, password }
      );
      localStorage.setItem('token', response.data);
      onLoginSuccess();
    } catch (error) {
      console.error('Error login in: ', error);
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>WELCOME</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Please enter your Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Please enter your Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>
          <Button variant="secondary" type="submit" className="login-button">
            LOG IN
          </Button>
          <Form.Label className="signup-lable">
            Don't have an account? <a href="/signup" className="signup-link">Sign up</a>
          </Form.Label>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginComponent;