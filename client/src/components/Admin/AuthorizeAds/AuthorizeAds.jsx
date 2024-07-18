/* eslint-disable react/prop-types */
import { Typography, Box } from "@mui/material";
import useDocumentTitle from "../../../useDocumentTitle";
import AuthorizeAdsHomeCard from "./AuthorizeAdsHomeCard";

function AuthorizeAds({ data }) {
  useDocumentTitle("Authorize Ads");
  // console.log(data);

  return (
    <Box>
      <Typography variant="h6" mb={2}>Authorize Ads</Typography>
      {data?.length > 0 ? data.map((ad, idx) => (
        <AuthorizeAdsHomeCard key={idx} ad={ad} />
      )) : <center> <Typography variant="h6" mt={5}>No ad is pending for authorization</Typography></center>}
    </Box>
  );
}

export default AuthorizeAds;
