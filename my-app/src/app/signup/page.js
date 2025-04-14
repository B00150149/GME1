'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from '../components/Header';  // Adjust path if needed
import Footer from '../components/Footer';  // Adjust path if needed

// Add Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the CSS file
import '../styles/Login.css';
import '../styles/Style.css';

export default function SignUp() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let fullName = data.get('fullName');
    let email = data.get('email');
    let pass = data.get('pass');
    let confirmPass = data.get('confirmPass');

    console.log("Sent fullName:" + fullName)
    console.log("Sent email:" + email)
		console.log("Sent pass:" + pass)
		console.log("Sent confirmPass:" + confirmPass)

    // Password match check
    if (pass !== confirmPass) {
      console.log("Passwords do not match");
      return;
    }

    runDBCallAsync(`/api/signUp?fullName=${fullName}&email=${email}&pass=${pass}&confirmPass=${confirmPass}`);
  };


  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.data === 'inserted') {
      console.log('Sign up is successful!');

    // Store awarded points
      localStorage.setItem('userPoints', data.points);

      window.location = '/login';
    } else {
      console.log('Sign up failed');
    }
  }

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content Container */}
      <Container maxWidth="sm" sx={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
          
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            className="login-container"
            sx={{
              padding: '20px',
              borderRadius: 2,
              boxShadow: 3,
              width: '100%',
              maxWidth: 400,
              color: '#FFFFFF',
            }}
          >
            <h2 className="text-center">Sign Up</h2>

            {/* Name Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="fullName"
              autoFocus
              InputLabelProps={{
                style: { color: '#66CCFF' },
              }}
              className="login-textfield"
            />

            {/* Email Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              InputLabelProps={{
                style: { color: '#66CCFF' },
              }}
              className="login-textfield"
            />

            {/* Password Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Password"
              type="password"
              id="pass"
              autoComplete="new-password"
              InputLabelProps={{
                style: { color: '#66CCFF' },
              }}
              className="login-textfield"
            />

            {/* Confirm Password Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPass"
              label="Confirm Password"
              type="password"
              id="confirmPass"
              autoComplete="new-password"
              InputLabelProps={{
                style: { color: '#66CCFF' },
              }}
              className="login-textfield"
            />

            {/* Submit Button */}
            <Button type="submit" fullWidth variant="contained" className="login-button">Sign Up</Button>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
}
