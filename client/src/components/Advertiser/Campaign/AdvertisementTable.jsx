// material-ui
import {
  Box,
  Table,
  TableCell,
  TableBody,
  // Typography,
  TableRow,
  TableHead,
  TableContainer,
  Link,
  Tooltip,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CircleIcon from "@mui/icons-material/Circle";

import { Link as RouterLink } from "react-router-dom";

const headCells = [
  {
    id: "advertisement",
    align: "center",
    disablePadding: false,
    label: "Advertisement",
  },
  {
    id: "advertisement-name",
    align: "left",
    disablePadding: false,
    label: "Name",
  },
  {
    id: "views",
    align: "center",
    disablePadding: false,
    label: "Views",
  },
  {
    id: "clicks",
    align: "center",
    disablePadding: false,
    label: "Clicks",
  },
  {
    id: "cpm",
    align: "center",
    disablePadding: false,
    label: "CPM",
  },
  {
    id: "ctr",
    align: "center",
    disablePadding: false,
    label: "CTR",
  },
  {
    id: "spend",
    align: "center",
    disablePadding: false,
    label: "Spend",
  },
  {
    id: "details",
    align: "center",
    disablePadding: false,
    label: "Details",
  },
];

// ==============================|| TABLE - HEADER ||============================== //
function AdvertisementTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            width={headCell.id === "advertisement" ? "150px" : "0px"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function calculateCTR(views, clicks) {
  if (views === 0) {
    return `${0}%`;
  } else {
    return `${((clicks / views) * 100).toFixed(3)}%`;
  }
}

function cpm(totalViews, totalViewsCost) {
  if (totalViews === 0) {
    return `$ ${0}`;
  } else {
    //toFixed(3)
    return `$ ${((totalViewsCost / totalViews) * 1000).toFixed(3)}`;
  }
}

// ==============================|| TABLE ||============================== //

// eslint-disable-next-line react/prop-types
export default function AdvertisementTable({ ads, adInfo }) {
  // console.log(ads);
  // console.log(adInfo);
  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <AdvertisementTableHead />
          <TableBody>
            {/* eslint-disable-next-line react/prop-types */}
            {ads.map((ad, index) => {
              return (
                <TableRow
                  hover
                  // role="checkbox"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  // tabIndex={-1}
                  key={index}
                >
                  <TableCell align="center">
                    <Box>
                      <img
                        src={ad.image.url}
                        alt=""
                        border="0"
                        height="100"
                        width="130"
                        style={{ maxWidth: "130px" }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell id={index} scope="row">
                    <Link component={RouterLink} to={ad._id} underline="none">
                      {ad.name}
                    </Link>
                  </TableCell>

                  <TableCell align="center">
                    {adInfo[ad._id]?.totalViews}
                  </TableCell>
                  <TableCell align="center">
                    {adInfo[ad._id]?.totalClicks}
                  </TableCell>
                  <TableCell align="center">
                    {cpm(
                      adInfo[ad._id]?.totalViews,
                      adInfo[ad._id]?.totalViewsCost
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {calculateCTR(
                      adInfo[ad._id]?.totalViews,
                      adInfo[ad._id]?.totalClicks
                    )}
                  </TableCell>
                  <TableCell align="center">
                    ${adInfo[ad._id]?.totalAdvertiserCost.toFixed(3)}
                  </TableCell>
                  {/* <TableCell align="right">{}</TableCell> */}
                  {/* <TableCell align="right">{}</TableCell> */}

                  <TableCell align="center" padding="none">
                    <Link component={RouterLink} to={ad._id} underline="none">
                      See Details
                      <KeyboardDoubleArrowRightIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
