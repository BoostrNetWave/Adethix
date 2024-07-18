/* eslint-disable react/prop-types */
import { Typography, Box, Grid } from "@mui/material";
import useDocumentTitle from "../../../useDocumentTitle";
import { Card, CardContent, Button, CardActions } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { VscPreview } from "react-icons/vsc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function AuthorizePublishers({ data }) {
  useDocumentTitle("Authorize Publishers");
  // console.log(data);

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Authorize Publishers
      </Typography>

      <Typography variant="h6" mb={1}>
        Authorization pending
      </Typography>
      {data?.newPublishers?.length > 0 ? (
        <Grid container rowSpacing={2} columnSpacing={4} mb={2}>
          {data.newPublishers.map((publisher, idx) => (
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
                    First Name: <span>{publisher.user.firstName}</span>
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "16px", pr: 1 }}>
                    Last Name: <span>{publisher.user.lastName}</span>
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "16px", pr: 1 }}>
                    Email Address: <span>{publisher.user.email}</span>
                  </Typography>
                </CardContent>

                <CardActions>
                  <RouterLink relative="path" to={`${publisher._id}/review`}>
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
            No publisher is pending for authorization
          </Typography>
        </center>
      )}

      {/* <Typography variant="h6" mb={1}>
        Activation pending
      </Typography>
      {data?.approvedPublishers?.length > 0 ? (
        <Grid container rowSpacing={2} columnSpacing={4} mb={2}>
          {data.approvedPublishers.map((publisher, idx) => (
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
                    First Name: <span>{publisher.user.firstName}</span>
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "16px", pr: 1 }}>
                    Last Name: <span>{publisher.user.lastName}</span>
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "16px", pr: 1 }}>
                    Email Address: <span>{publisher.user.email}</span>
                  </Typography>
                </CardContent>

                <CardActions>
                  <RouterLink relative="path" to={`${publisher._id}/activate`}>
                    <Button
                      variant="outlined"
                      sx={{ textTransform: "none", mr: 2 }}
                      startIcon={<IoMdCheckmarkCircleOutline />}
                    >
                      Activate
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
            No publisher is pending for activation
          </Typography>
        </center>
      )} */}

      {/* <Typography variant="h6" mb={1}>
        Rejected in review
      </Typography>
      {data?.rejectedPublishers?.length > 0 ? (
        <Grid container rowSpacing={2} columnSpacing={4} mb={2}>
          {data.rejectedPublishers.map((publisher, idx) => (
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
                    First Name: <span>{publisher.user.firstName}</span>
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "16px", pr: 1 }}>
                    Last Name: <span>{publisher.user.lastName}</span>
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "16px", pr: 1 }}>
                    Email Address: <span>{publisher.user.email}</span>
                  </Typography>
                </CardContent>

                <CardActions>
                  <RouterLink relative="path" to={`${publisher._id}/re-review`}>
                    <Button
                      variant="outlined"
                      sx={{ textTransform: "none", mr: 2 }}
                      startIcon={<VscPreview />}
                    >
                      Re Review
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
          <Typography variant="h6" mt={5}>
            No rejected publisher is found
          </Typography>
        </center>
      )} */}
    </Box>
  );
}

export default AuthorizePublishers;
