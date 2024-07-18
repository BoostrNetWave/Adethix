// import PropTypes from "prop-types";

// material-ui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// project import
import MainCard from "../../MainCard";

// eslint-disable-next-line react/prop-types
export default function Analytic({ title, count }) {
  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0} textAlign={"center"}>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" color="inherit" >
          {count}
        </Typography>
      </Stack>
    </MainCard>
  );
}

// Analytic.propTypes = {
//   color: PropTypes.string,
//   title: PropTypes.string,
//   count: PropTypes.string,
//   percentage: PropTypes.number,
//   isLoss: PropTypes.bool,
//   extra: PropTypes.string,
// };
