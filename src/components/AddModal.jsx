import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

const AddEditModal = ({ isOpen, onClose, onPersist, selectedEntry, entryType }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedEntry) {
      setFormData(selectedEntry);
    } else {
      setFormData({});
    }
  }, [selectedEntry]);

  function handleFormSubmit(evt) {
    evt.preventDefault();
    onPersist(formData);
  }

  function handleInputChange(key, value) {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  }

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose}>
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>Add Entry</DialogTitle>
        <DialogContent className="flex flex-col">
          {entryType === 'games' && (
            <TextField
              variant="standard"
              label="Game Name"
              value={formData.gameName || ''}
              onChange={(e) => handleInputChange('gameName', e.target.value)}
            />
          )}
          {entryType === 'maps' && (
            <>
              <TextField
                variant="standard"
                label="Map Name"
                value={formData.mapName || ''}
                onChange={(e) => handleInputChange('mapName', e.target.value)}
              />
              <TextField
                variant="standard"
                type="number"
                label="Game ID"
                value={formData.gameId || ''}
                onChange={(e) => handleInputChange('gameId', e.target.value)}
              />
            </>
          )}
          {entryType === 'strategies' && (
            <>
              <TextField
                variant="standard"
                label="Strategy Name"
                value={formData.stratName || ''}
                onChange={(e) => handleInputChange('stratName', e.target.value)}
              />
              <TextField
                variant="standard"
                label="Type"
                value={formData.type || ''}
                onChange={(e) => handleInputChange('type', e.target.value)}
              />
              <TextField
                variant="standard"
                label="Video URL"
                value={formData.videoUrl || ''}
                onChange={(e) => handleInputChange('videoUrl', e.target.value)}
              />
              <TextField
                variant="standard"
                label="Description"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
              <TextField
                variant="standard"
                type="number"
                label="Map ID"
                value={formData.mapId || ''}
                onChange={(e) => handleInputChange('mapId', e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={onClose}>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEditModal;
