import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const cities = ["Երևան", "Գյումրի", "Վանաձոր", "Աբովյան", "Արտաշատ"];

const DeliveryForm = ({ total = 0, onClose,clearCart }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const newErrors = {};
    const { firstName, lastName, phone, email, city, address } = formData;

    if (!firstName.trim()) newErrors.firstName = "Անունը պարտադիր է";
    if (!lastName.trim()) newErrors.lastName = "Ազգանունը պարտադիր է";
    if (!/^(\+374|0)\s?\d{2}\s?\d{6}$/.test(phone || ""))
      newErrors.phone = "Սխալ հեռախոսահամար";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || ""))
      newErrors.email = "Սխալ էլ. փոստ";
    if (!city) newErrors.city = "Ընտրեք քաղաք";
    if (!address.trim()) newErrors.address = "Հասցեն պարտադիր է";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setDialogOpen(true);
  };

  const confirmOrder = () => {
    setSaving(true);
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push({
      ...formData,
      total,
      id: Date.now(),
      date: new Date().toISOString(),
    });
    localStorage.setItem("orders", JSON.stringify(orders));
    setSaving(false);
    setDialogOpen(false);
    setSnackbar({ open: true, message: "✅ Պատվերը հաջողությամբ գրանցվեց!" });
    setCart([]);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      city: "",
      address: "",
      note: "",
    });
     if (clearCart) clearCart();
    onClose?.();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        p: 2,
        background: "linear-gradient(135deg, #f7f7f7, #ececec)",
      }}
    >
      <Paper elevation={5} sx={{ p: 4, borderRadius: 3, maxWidth: 600, width: "100%" }}>
        <Typography variant="h5" align="center" mb={3} fontWeight={600}>
          Առաքման տվյալներ
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[{ name: "firstName", label: "Անուն" },
              { name: "lastName", label: "Ազգանուն" },
              { name: "phone", label: "Հեռախոս", helperText: "Օր. +374 77 123456" },
              { name: "email", label: "Էլ. փոստ" },
              { name: "address", label: "Հասցե" }].map((field, idx) => (
              <Grid
                item
                xs={12}
                sm={field.name === "firstName" || field.name === "lastName" ? 6 : 12}
                key={idx}
              >
                <TextField
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={!!errors[field.name]}
                  helperText={errors[field.name] || field.helperText}
                  fullWidth
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Քաղաք"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
                fullWidth
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Նշումներ"
                name="note"
                value={formData.note}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Typography align="center" fontWeight={600} color="primary" sx={{ mt: 1, fontSize: "18px" }}>
                Ընդհանուր արժեք՝ ${total.toFixed(2)}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 1,
                  py: 1.2,
                  borderRadius: 2,
                  fontWeight: 600,
                  backgroundColor: "#1976d2",
                  "&:hover": { backgroundColor: "#125ea2" },
                }}
              >
                ՀԱՍՏԱՏԵԼ
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Հաստատել պատվերը</DialogTitle>
        <DialogContent dividers>
          <List>
            {Object.entries({
              Անուն: formData.firstName,
              Ազգանուն: formData.lastName,
              Հեռախոս: formData.phone,
              "Էլ. փոստ": formData.email,
              Քաղաք: formData.city,
              Հասցե: formData.address,
              Նշումներ: formData.note || "—",
            }).map(([label, value]) => (
              <ListItem key={label}>
                <ListItemText primary={label} secondary={value} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <Typography align="center" fontWeight={600} color="primary" sx={{ mt: 2, fontSize: "18px" }}>
            💰 Ընդհանուր արժեք՝ ${total.toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Վերադառնալ</Button>
          <Button onClick={confirmOrder} variant="contained" disabled={saving}>
            {saving ? "Պահպանում..." : "Հաստատել"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default DeliveryForm;
