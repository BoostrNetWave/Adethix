/* eslint-disable react/prop-types */
import { Typography, Box, Grid } from "@mui/material";
import useDocumentTitle from "../../../useDocumentTitle";
import { Card, CardContent, Button, CardActions } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { VscPreview } from "react-icons/vsc";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function AuthorizeAdvertisers({ data }) {
  useDocumentTitle("Authorize Advertisers");
  // console.log(data);

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Authorize Advertisers
      </Typography>

      <Typography variant="h6" mb={1}>
        Authorization pending
      </Typography>
      {data?.newAdvertisers?.length > 0 ? (
        <Grid container rowSpacing={2} columnSpacing={4} mb={2}>
          {data.newAdvertisers.map((advertiser, idx) => (
            <Grid key={idx} item sm={12} md={6}>
              <Card
                sx={{
                  display: "flex",
                  boxShadow: "none",
                  border: "1px solid #dee2e6",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    padding: 1,
                    paddingBottom: 1,
                  }}
                  // pb={0}
                >
                  <Typography variant="h6" sx={{ fontSize: "16px", pr: 1 }}>
                    First Name: <span>{advertiser.user.firstName}</span>
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "16px", pr: 1 }}>
                    Last Name: <span>{advertiser.user.lastName}</span>
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "16px", pr: 1 }}>
                    Email Address: <span>{advertiser.user.email}</span>
                  </Typography>
                </CardContent>

                <CardActions>
                  <RouterLink relative="path" to={`${advertiser._id}/review`}>
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
            </Grid>
          ))}
        </Grid>
      ) : (
        <center>
          {" "}
          <Typography variant="h6" mt={3} mb={3}>
            No advertiser is pending for authorization
          </Typography>
        </center>
      )}
    </Box>
  );
}

export default AuthorizeAdvertisers;
