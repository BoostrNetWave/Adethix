import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  Box,
  TableContainer,
  TableHead,
  Typography,
  Container,
  TableRow,
  Button,
  alpha,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function createData(column1, column2, column3, column4) {
  return { column1, column2, column3, column4 };
}

const rows = [
  createData("Security / privacy", "$4.00", "$6.50", "$5.25"),
  createData("AI / machine learning", "$4.00", "$6.25", "$5.00"),
  createData("DevOps", "$4.00", "$6.25", "$5.00"),
  createData("Frontend web / JavaScript", "$4.00", "$6.25", "$5.00"),
  createData("Backend web development", "$3.50", "$5.75", "$4.50"),
  createData("All developers", "$2.75", "$4.75", "$3.80"),
];

export default function Pricing() {
  return (
    <Box
      id="privacy-policy"
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
        <Stack useFlexGap>
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Advertisement pricing
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignSelf: "center",
              textAlign: "center",
              mt: 1,
            }}
          >
            Prices are per thousand impressions (CPM) with a $1,000 minimum ad
            buy.
          </Typography>

          <Box sx={{ mt: 5, mb: 5 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Topic</TableCell>
                    <TableCell>Run of Network (Recommended)</TableCell>
                    <TableCell>
                      US, Canada, UK, Australia, New Zealand, Ireland
                    </TableCell>
                    <TableCell>
                      Blend: W. Europe + US, Canada, UK, Australia, New Zealand
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.column1}</TableCell>
                      <TableCell>{row.column2}</TableCell>
                      <TableCell>{row.column3}</TableCell>
                      <TableCell>{row.column4}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

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
              to="/join-as-advertiser"
            >
              Run a Advertising Campaign
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
