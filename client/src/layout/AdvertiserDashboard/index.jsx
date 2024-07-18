import { useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

// material-ui
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

// project import
import Drawer from "./Drawer/index";
import Header from "./Header/index";
import Loader from "../../components/Loader";
import styles from "./index.module.css";

import { useGetMenuMaster, handlerDrawerOpen } from "../../api/menu";

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout() {
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery((theme) => theme.breakpoints.down("xl"));

  useEffect(() => {
    handlerDrawerOpen(!downXL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downXL]);

  if (menuMasterLoading) return <Loader />;

  return (
    <MantineProvider>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Header />
        <Drawer />
        <Box
          className={styles.main}
          component="main"
          sx={{ width: "calc(100% - 260px)", flexGrow: 1, p: { xs: 2, sm: 3 } }}
        >
          <Toolbar />
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </MantineProvider>
  );
}
