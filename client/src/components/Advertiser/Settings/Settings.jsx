import { Typography, Box } from "@mui/material";
import ResetPassword from "./ResetPassword";
import useDocumentTitle from "../../../useDocumentTitle";
import RefferalCode from "./RefferalCode"

function Settings({ data }) {
  // console.log(data)
  useDocumentTitle("Settings");
  return (
    <>
      <Box>
        <Typography variant="h6" mb={1}>
          Settings
        </Typography>
      </Box>
      <ResetPassword />
      <RefferalCode data={data}/>
    </>
  );
}

export default Settings;
