import { Typography, Box } from "@mui/material";
import ResetPassword from "./ResetPassword";
import useDocumentTitle from "../../../useDocumentTitle";
import ReferralCode from "./ReferralCode";

function Settings({ data }) {
  useDocumentTitle("Settings");
  return (
    <>
      <Box>
        <Typography variant="h6" mb={1}>
          Settings
        </Typography>
      </Box>
      <ResetPassword />
      <ReferralCode data={data}/>
    </>
  );
}

export default Settings;
