import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { addUser } from "../redux/slices/users";
import { DEFAULT_FORM_DATA, hobbies, roles } from "./consts";
import { validateForm } from "./helpers";
import "./Form.css";

const Form = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const resetForm = () => {
    setFormData(DEFAULT_FORM_DATA);
    setErrors({});
  };

  const handleTextFieldChange = (event) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (event) => {
    setFormData({ ...formData, role: event.target.value });
  };

  const handleHobbiesChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      hobbies: checked
        ? [...formData.hobbies, name]
        : formData.hobbies.filter((hobby) => hobby !== name),
    });
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  const handleFocus = (event) => {
    const { id } = event.target;
    if (Boolean(errors[id])) setErrors({ ...errors, [id]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { isValid, errors } = validateForm(formData);
    if (isValid) {
      setSuccessDialogOpen(true);
      dispatch(addUser(formData));
      resetForm();
    } else setErrors(errors);
  };

  return (
    <>
      <Paper className="form-container br10">
        <TextField
          autoFocus
          className="form-input"
          id="username"
          name="username"
          label="Username"
          required
          value={formData.username}
          error={Boolean(errors.username)}
          helperText={errors.username}
          onChange={handleTextFieldChange}
          onFocus={handleFocus}
        />
        <TextField
          className="form-input"
          id="email"
          name="email"
          type="email"
          label="Email address"
          required
          value={formData.email}
          error={Boolean(errors.email)}
          helperText={errors.email}
          onChange={handleTextFieldChange}
          onFocus={handleFocus}
        />
        <FormControl error={Boolean(errors.role)} className="form-input">
          <InputLabel id="role-label" color={errors.role ? "error" : "primary"}>
            Role
          </InputLabel>
          <Select
            id="role"
            name="role"
            label="Role"
            labelId="role-label"
            value={formData.role}
            error={Boolean(errors.role)}
            onChange={handleRoleChange}
            onFocus={handleFocus}
          >
            {roles.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.role}</FormHelperText>
        </FormControl>
        <FormControl className="form-input">
          <fieldset className="br10">
            <FormLabel component="legend">Select your hobbies:</FormLabel>
            <FormGroup>
              <div className="hobbies-list">
                {hobbies.map((hobby) => (
                  <FormControlLabel
                    key={hobby.id}
                    control={
                      <Checkbox
                        name={hobby.value}
                        checked={formData.hobbies.includes(hobby.value)}
                        onChange={handleHobbiesChange}
                      />
                    }
                    label={hobby.value}
                  />
                ))}
              </div>
            </FormGroup>
          </fieldset>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Add User
        </Button>
        <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
          <DialogContent>
            <DialogContentText>User added successfully!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleCloseSuccessDialog}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  );
};

export default Form;
