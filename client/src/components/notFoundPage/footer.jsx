import "./footer.scss";
import { Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="h6" color="text.secondary" mt={1}>
      {"Copyright © "}
      <Link
        component={RouterLink}
        to={import.meta.env.VITE_HOME_PAGE}
        sx={{ textDecoration: "none" }}
      >
        Boostr Netwave Ads&nbsp;
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

function Footer() {
  return (
    <footer>
      <center>
        <Copyright />
      </center>
    </footer>
  );
}

export default Footer;
