// material-ui
import useMediaQuery from "@mui/material/useMediaQuery";
// import IconButton from '@mui/material/IconButton';
// import Link from '@mui/material/Link';
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";

// assets
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";

import styles from "./index.module.css";

// project import
// import Search from './Search';
// import Profile from './Profile/index';
// import Notification from './Notification';
// import MobileSection from './MobileSection';

//
import { useFullscreen } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// project import
// import { GithubOutlined } from '@ant-design/icons';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { toggle, fullscreen } = useFullscreen();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    toast.success("Logout successfully");
    localStorage.removeItem("token");
  };

  return (
    <>
      {/* {!downLG && <Search />} */}
      {!downLG && <Box sx={{ width: "100%", ml: 1 }} />}
      {downLG && <Box sx={{ width: "100%", ml: 1 }} />}
      {/* <IconButton
        component={Link}
        href="https://github.com/codedthemes/mantis-free-react-admin-template"
        target="_blank"
        disableRipple
        color="secondary"
        title="Download Free Version"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      >
        <GithubOutlined />
      </IconButton> */}

      <button onClick={handleLogout} className={styles.button}>
        <LogoutIcon />
      </button>

      <Button onClick={toggle} className={styles.button}>
        {fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      </Button>

      {/* <Notification /> */}
      {/* {!downLG && <Profile />} */}
      {/* {downLG && <MobileSection />} */}
    </>
  );
}
