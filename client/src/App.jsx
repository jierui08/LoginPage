import {useState} from 'react'
import './App.css'
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";

export default function App() {
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [password, setPassword] = useState(localStorage.getItem('password'));
  const [remember, setRemember] = useState(localStorage.getItem('remember')!=='false');

  /*useEffect(() => {
      if (remember) {
          localStorage.setItem('email',email);
          localStorage.setItem('password', password);
          localStorage.setItem('remember', remember);
      } else {
          localStorage.setItem('email','');
          localStorage.setItem('password', '');
          localStorage.setItem('remember',remember);
      }
  },[remember]);*/

  async function handleSubmit  (event) {
    event.preventDefault();
    try {
        if (email && password) {
            await axios.post('http://localhost:3000/login', {email,password});
            if (remember) {
                localStorage.setItem('email',email);
                localStorage.setItem('password', password);
                localStorage.setItem('remember', remember.toString());
            } else {
                localStorage.setItem('email','');
                localStorage.setItem('password', '');
                localStorage.setItem('remember',remember.toString());
            }
            alert('Log in successful');
        }
    } catch (e) {
        alert('Log in failed');
    }
  }

  return (
        <Grid container component="main">
          <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(https://a0.muscache.com/im/pictures/c596d286-57a6-460e-b6a8-9698b6f31157.jpg?im_w=960)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
          />
          <Grid item sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                  my: 8,
                  mx: 4,
                }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    autoFocus
                    onChange={event => setEmail(event.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <FormControlLabel
                    control={<Checkbox checked={remember} onChange={event => setRemember(event.target.checked)} color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
  )

}
