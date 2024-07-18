/* eslint-disable react/prop-types */
// material-ui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

const headCells = [
  {
    id: "date",
    align: "left",
    disablePadding: false,
    label: "Date",
  },
  {
    id: "views",
    align: "right",
    disablePadding: true,
    label: "Views",
  },
  {
    id: "clicks",
    align: "right",
    disablePadding: false,
    label: "Clicks",
  },
  {
    id: "cpm",
    align: "right",
    disablePadding: false,
    label: "CPM",
  },
  {
    id: "ctr",
    align: "right",
    disablePadding: false,
    label: "CTR",
  },
  {
    id: "spend",
    align: "right",
    disablePadding: false,
    label: "Spend",
  },
];

// ==============================|| TABLE - HEADER ||============================== //
function AdvertisementReportTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sx={{fontWeight: 600}}
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


export default function AdvertisementReportTable({
  data,
  updatedTotalReportInfo,
}) {
  // console.log(data);
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
          <AdvertisementReportTableHead />
          <TableBody>
            {/* eslint-disable-next-line react/prop-types */}
            {data.map((info, index) => {
              return (
                <TableRow
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  tabIndex={-1}
                  key={index}
                >
                  <TableCell component="th" id={index} scope="row" align="left">
                    {info.date}
                  </TableCell>
                  <TableCell align="right">{info.totalViews}</TableCell>
                  <TableCell align="right">{info.totalClicks}</TableCell>
                  <TableCell align="right">
                    {cpm(info.totalViews, info.totalViewsCost)}
                  </TableCell>
                  <TableCell align="right">
                    {calculateCTR(info.totalViews, info.totalClicks)}
                  </TableCell>
                  <TableCell align="right">
                    ${info.totalAdvertiserCost.toFixed(3)}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow
              hover
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              tabIndex={-1}
            >
              <TableCell align="left" component="th"  scope="row" sx={{fontWeight: 600}}>
                Total
              </TableCell>
              <TableCell align="right" sx={{fontWeight: 600}}>{updatedTotalReportInfo.totalViews}</TableCell>
              <TableCell align="right" sx={{fontWeight: 600}}>{updatedTotalReportInfo.totalClicks}</TableCell>
              <TableCell align="right" sx={{fontWeight: 600}}>
                {cpm(updatedTotalReportInfo.totalViews, updatedTotalReportInfo.totalViewsCost)}
              </TableCell>
              <TableCell align="right" sx={{fontWeight: 600}}>
                {calculateCTR(updatedTotalReportInfo.totalViews, updatedTotalReportInfo.totalClicks)}
              </TableCell>
              <TableCell align="right" sx={{fontWeight: 600}}>
                ${updatedTotalReportInfo.totalAdvertiserCost.toFixed(3)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
