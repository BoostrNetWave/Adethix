import { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../axiosInstance";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!isLoggedIN) {
      navigate("/auth/login");
    }
  }, [isLoggedIN, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const data = {
      currentPassword,
      newPassword,
    };

    try {
      const response = await axiosInstance.post(
        "/api/publisher/settings/reset-password",
        data
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.status) {
        if (err.response.status === 401 || err.response.status === 403) {
          // console.log(response.data.message);
          toast.error(err.response.data.message);
          toast.error("Login again");
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        } else if (err.response.status === 400) {
          toast.error(err.response.data.message.replace(/"/g, ""));
        }
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleResetPassword}
        sx={{
          mt: 1,
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "10px",
          "&:hover": {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          },
          width: "100%",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Reset Password
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="currentPassword"
              label="Current Password"
              type="password"
              id="currentPassword"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 1 }}>
          Reset Password
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
