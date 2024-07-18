/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { ContentCopyRounded } from "@mui/icons-material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RefferalCode({ data }) {
  let handleCopy = async (ownReferralCode) => {
    toast.success("Copied");
    if (ownReferralCode) {
      await navigator.clipboard.writeText(ownReferralCode);
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
          Referral Code
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <pre>
              <code>Share this code with others: {data?.publisher?.ownReferralCode}</code>
            </pre>
          </Box>
          <Box>
            <ContentCopyRounded
              onClick={() => handleCopy(data?.publisher?.ownReferralCode)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RefferalCode;
