/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Link,
  CardActions,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { VscPreview } from "react-icons/vsc";

function AuthorizeAdsHomeCard({ ad }) {
  // console.log(ad);
  return (
    <Card
      sx={{
        display: "flex",
        mb: 2,
        p: 1,
        boxShadow: "none",
        border: "1px solid #dee2e6",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* while text only ad show no image */}
        <Box sx={{ height: 100, width: 130 }}>
          <img
            src={ad.adInfo.image?.url ? ad.adInfo.image?.url : "text ad"}
            alt=""
            style={{ height: "100px", width: "130px", maxWidth: "130px" }}
          />
        </Box>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h6" sx={{ fontSize: "17px", pr: 1 }}>
            Link URL:
            <Link
              component={RouterLink}
              to={ad.adInfo.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontSize: "15px", pl: 1 }}
            >
              {ad.adInfo.linkUrl}
            </Link>
          </Typography>

          <Box variant="h6" sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontSize: "17px", pr: 1 }}>
              Content:
            </Typography>
            <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
              {ad.adInfo.content}
            </Typography>
          </Box>
        </CardContent>
      </Box>
      <CardActions>
        <RouterLink relative="path" to={ad._id}>
          <Button
            variant="outlined"
            sx={{ textTransform: "none", mr: 2 }}
            startIcon={<VscPreview />}
          >
            Review
          </Button>
        </RouterLink>
      </CardActions>
    </Card>
  );
}

export default AuthorizeAdsHomeCard;
