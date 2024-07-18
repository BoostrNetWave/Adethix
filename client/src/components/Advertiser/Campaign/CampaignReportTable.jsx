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
    align: "left",
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
function CampaignReportTableHead() {
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

function calculateCTR(views, clicks) {
  if (views === 0) {
    return `${0}%`;
  } else {
    return `${((clicks / views) * 100).toFixed(3)}%`;
  }
}

// ==============================|| TABLE ||============================== //

// eslint-disable-next-line react/prop-types
export default function CampaignReportTable({ data }) {
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
          <CampaignReportTableHead />
          <TableBody>
            {/* eslint-disable-next-line react/prop-types */}
            {data.map((info, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  tabIndex={-1}
                  key={index}
                >
                  <TableCell component="th" id={index} scope="row">
                    {info.date}
                  </TableCell>
                  <TableCell>{info.totalViews}</TableCell>
                  <TableCell align="right">{info.totalClicks}</TableCell>
                  <TableCell align="right">
                    {calculateCTR(info.totalViews, info.totalClicks)}
                  </TableCell>
                  <TableCell align="right">
                    ${info.totalAdvertiserCost.toFixed(3)}
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
