/* eslint-disable react/prop-types */
// material-ui
import { Typography, Box } from "@mui/material";
import { ContentCopyRounded } from "@mui/icons-material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// project import
import styles from "./Embed.module.css";
import useDocumentTitle from "../../../useDocumentTitle";

function Embed({ data }) {
  useDocumentTitle("Publisher Embed Code");
  //   console.log(data)

  let handleCopy = async () => {
    toast.success("Copied");
    if (data?._id) {
      await navigator.clipboard.writeText(
        `<script async src="${
          import.meta.env.VITE_JS_FILE
        }"></script>\n<div id="adethix" data-bn-publisher="${
          data._id
        }" data-bn-com="adethix"></div>`
      );
    }
  };

  return (
    <>
      {data?._id && (
        <>
          <Box>
            <Typography variant="h6" mb={1}>
              Publisher Embed Code
            </Typography>
          </Box>

          <Box>
            <Typography mb={2} paragraph={true}>
              This code will allow you to get started with showing ads on your
              site.
            </Typography>
          </Box>

          <Box className={styles.embedCodeContainer}>
            <Box>
              <pre>
                <code>
                  &lt;script async src=&quot;{import.meta.env.VITE_JS_FILE}
                  &quot;&gt;&lt;/script&gt;
                </code>
              </pre>
              <pre>
                <code>
                  &lt;div id=&quot;adethix&quot;
                  data-bn-publisher=&quot;{data._id}&quot;
                  data-bn-com=&quot;adethix&quot;&gt;&lt;/div&gt;
                </code>
              </pre>
            </Box>
            <Box>
              <ContentCopyRounded onClick={handleCopy} />
            </Box>
          </Box>
        </>
      )}
      {/* {updatedData && (
        <Grid item xs={12} md={7} mt={2} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">Day-wise Revenue Report</Typography>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable data={updatedData} />
          </MainCard>
        </Grid>
      )} */}
    </>
  );
}

export default Embed;
