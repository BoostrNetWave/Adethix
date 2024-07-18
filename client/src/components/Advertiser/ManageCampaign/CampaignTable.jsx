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
    id: "campaign-name",
    align: "left",
    disablePadding: false,
    label: "Campaign Name",
  },
  // {
  //   id: 'views',
  //   align: 'left',
  //   disablePadding: true,
  //   label: 'Views'
  // },
  // {
  //   id: 'clicks',
  //   align: 'right',
  //   disablePadding: false,
  //   label: 'Clicks'
  // },
  // {
  //   id: 'ctr',
  //   align: 'right',
  //   disablePadding: false,
  //   label: 'CTR'
  // },
  {
    id: "details",
    align: "right",
    disablePadding: false,
    label: "Details",
  },
];

// ==============================|| TABLE - HEADER ||============================== //
function CampaignTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// function calculateCTR(views, clicks) {
//   if (views === 0) {
//     return `${0}%`;
//   } else {
//     return `${((clicks / views) * 100).toFixed(3)}%`;
//   }
// }

// ==============================|| TABLE ||============================== //

// eslint-disable-next-line react/prop-types
export default function CampaignTable({ campaigns }) {
  // console.log(campaigns);
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
          <CampaignTableHead />
          <TableBody>
            {/* eslint-disable-next-line react/prop-types */}
            {campaigns.map((campaign, index) => {
              return (
                <TableRow
                  hover
                  // role="checkbox"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  // tabIndex={-1}
                  key={index}
                >
                  <TableCell id={index} scope="row">
                    <Link
                      component={RouterLink}
                      to={campaign._id}
                      underline="none"
                    >
                      {campaign.name}
                      {/* <Tooltip
                        title={
                          <span style={{ letterSpacing: "1px" }}>
                            {campaign.isActive
                              ? "This campaign is active"
                              : "This campaign is not active"}
                          </span>
                        }
                        placement="right"
                        arrow
                        sx={{ letterSpacing: "5px" }}
                      >
                        <CircleIcon
                          sx={{
                            color: campaign.isActive ? "#66BB6A" : "#E91E63",
                            ml: 1,
                            fontSize: "14px",
                          }}
                        />
                      </Tooltip> */}
                    </Link>
                  </TableCell>
                  {/* <TableCell>{info.totalViews}</TableCell>
                  <TableCell align="right">{info.totalClicks}</TableCell>
                  <TableCell align='right'>
                    {calculateCTR(info.totalViews, info.totalClicks)} 
                  </TableCell>
                  <TableCell align="right">
                  ${info.totalPublisherRevenue.toFixed(3)}
                  </TableCell> */}
                  <TableCell align="right">
                    <Link
                      component={RouterLink}
                      to={campaign._id}
                      underline="none"
                    >
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
