import { alpha, Card, CardContent, CardMedia, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link, Link as RouterLink } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const ImageCard = ({ image, title, description, linkdin }) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia component="img" height="350" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" textAlign="center">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {description}
        </Typography>
        <Typography textAlign="center" sx={{ mt: 2 }}>
          <Link to={linkdin}>
            <LinkedInIcon />
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function TeamComponent() {
  return (
    <Box
      id="about-us"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 14 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={4} useFlexGap>
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Meet the team
          </Typography>

          <Typography variant="h4">Core team</Typography>

          <Grid container spacing={3} justifyContent="center">
            <Grid item sx={{ width: "50%" }} xs={12} sm={6}>
              <ImageCard
                image="https://boostrnetwave.com/wp-content/uploads/2024/06/Nikhil.jpeg"
                title="Nikhil Patra"
                description="Co-Founder and CEO"
                linkdin="https://www.linkedin.com/in/nikhil-patra/"
              />
            </Grid>
            <Grid item sx={{ width: "50%" }} xs={12} sm={6}>
              <ImageCard
                image="https://boostrnetwave.com/wp-content/uploads/2024/06/Sushil-2.jpeg"
                title="Sushil Puhan"
                description="Co-Founder and COO"
                linkdin="https://www.linkedin.com/in/sushil-puhan-20a619200/"
              />
            </Grid>
          </Grid>

          {/* <Typography variant="h4">Developer team</Typography> */}

          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", mb: -2 }}
            variant="h6"
          >
            Join Us
          </Typography>
          <p>
            Whether you are a developer looking for the latest tools and
            resources or a company aiming to reach a highly engaged audience,
            Adethix is here to help you connect and grow. Join us on this
            journey to empower the developer community and drive innovation
            forward.
          </p>

          <Box
            textAlign="center"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
              gap: { xs: 2, md: 5 },
            }}
          >
            <Button
              color="primary"
              variant="text"
              size="medium"
              LinkComponent={RouterLink}
              to="/advertiser/signup"
            >
              Run a Advertising Campaign
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="medium"
              LinkComponent={RouterLink}
              to="/publisher/signup"
            >
              Earn money from website
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
