import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

const AddEditModal = ({ isOpen, onClose, onPersist, selectedEntry, createMode }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedEntry) {
      setFormData(selectedEntry);
    } else {
      setFormData({});
    }
  }, [selectedEntry]);

  function handleDashFormSubmit(evt) {
    evt.preventDefault();
    // New entry
    if (createMode) {
      // Edit entry
    } else {
      onPersist(formData);
    }
  }

  function handleDashDialogClose() {
    onClose();
  }

  function handleInputChange(key, value) {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  }

  return (
    <Dialog fullWidth open={isOpen} onClose={handleDashDialogClose}>
      <form onSubmit={handleDashFormSubmit}>
        <DialogTitle>Edit Entry</DialogTitle>
        <DialogContent className="flex flex-col">
          {selectedEntry ? (
            Object.entries(selectedEntry).map(([key, value]) => (
              <TextField
                variant="standard"
                key={key}
                label={key}
                value={value && typeof value === 'object' ? JSON.stringify(value) : formData[key]}
                // Turn readOnly the data coming from connections between the tables and if it is the table ID (automatically generated)
                InputProps={{
                  disabled: typeof value === 'object' || key === Object.keys(selectedEntry)[0],
                }}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            ))
          ) : (
            <div>No entry selected.</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleDashDialogClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              handleDashDialogClose();
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEditModal;
