

import { Button, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';


export function MyModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    // Do something with the input values
    console.log(`Creating user: ${name}, ${email}, ${phone}, ${address}`);
    // Close the modal
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Project
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={{ margin: 'auto', backgroundColor: 'white', padding: 20 }}>
          <h2>Create Project</h2>
          <form noValidate autoComplete="off">
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              margin="normal"
              fullWidth
            />
          </form>
          <Button variant="contained" onClick={handleCreate} color="primary" style={{ marginTop: 20 }}>
            Create
          </Button>
          <Button variant="contained" onClick={handleClose} color="secondary" style={{ marginTop: 20, marginLeft: 10 }}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}
