/* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import useDocumentTitle from "../../../useDocumentTitle";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// ads styling
import "./PreviewAd.css";

function PreviewAd({ data }) {
  useDocumentTitle(data ? `Preview: ${data.adInfo.content}` : "Authorize Ad");
  // console.log(data);
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Preview Ad
      </Typography>

      <RouterLink relative="path" to="..">
        <Button
          variant="outlined"
          sx={{ textTransform: "none", mb: 2 }}
          startIcon={<ArrowBackIosIcon />}
        >
          Go to Ad
        </Button>
      </RouterLink>
      {data && data.isOpen ? (
        <>
          <Box className="custom-ads">
            {data?.adInfo?.options?.textOnly && (
              <Box mt={2} id="textOnly">
                <Typography mb={1}>Text only ad</Typography>
                <div id="boostr-netwave-ads">
                  <span>
                    <span className="ad-wrap">
                      <a
                        href={data?.adInfo?.linkUrl}
                        className="ad-text"
                        target="_blank"
                        rel="sponsored"
                      >
                        {data?.adInfo?.content}
                      </a>
                    </span>
                    <a
                      href={import.meta.env.VITE_SPONSOR}
                      className="boostr-netwave-poweredby"
                      target="_blank"
                      rel="sponsored"
                    >
                      ads via Boostr Netwave
                    </a>
                  </span>
                </div>
              </Box>
            )}

            {/* fixed ad  */}
            {data?.adInfo?.options?.image && (
              <Box mb={2} className="fixed-ad">
                <Typography mb={1}>Fixed Ad</Typography>
                <div id="boostr-netwave-ads">
                  <span>
                    <span className="ad-wrap">
                      <a
                        href={data.adInfo.linkUrl}
                        className="ad-img"
                        target="_blank"
                        rel="sponsored"
                      >
                        <img
                          src={data.adInfo.image.url}
                          alt="ads via Boostr Netwave"
                          border="0"
                          height="100"
                          width="130"
                          style={{ maxWidth: "130px" }}
                        />
                      </a>
                      <a
                        href={data.adInfo.linkUrl}
                        className="ad-text"
                        target="_blank"
                        rel="sponsored"
                      >
                        {data.adInfo.content}
                      </a>
                    </span>
                    <a
                      href={import.meta.env.VITE_SPONSOR}
                      className="boostr-netwave-poweredby"
                      target="_blank"
                      rel="sponsored"
                    >
                      ads via Boostr Netwave
                    </a>
                  </span>
                </div>
              </Box>
            )}

            {/* sidebar ad */}
            {data?.adInfo?.options?.sidebar && (
              <Box mb={2} className="sidebar-ad">
                <Typography mb={1}>Sidebar Ad</Typography>
                <div id="boostr-netwave-ads">
                  <span>
                    <span className="ad-wrap">
                      <a
                        href={data.adInfo.linkUrl}
                        className="ad-img"
                        target="_blank"
                        rel="sponsored"
                      >
                        <img
                          src={data.adInfo.image.url}
                          alt="ads via Boostr Netwave"
                          border="0"
                          height="100"
                          width="130"
                          style={{ maxWidth: "130px" }}
                        />
                      </a>
                      <a
                        href={data.adInfo.linkUrl}
                        className="ad-text"
                        target="_blank"
                        rel="sponsored"
                      >
                        {data.adInfo.content}
                      </a>
                    </span>
                    <a
                      href={import.meta.env.VITE_SPONSOR}
                      className="boostr-netwave-poweredby"
                      target="_blank"
                      rel="sponsored"
                    >
                      ads via Boostr Netwave
                    </a>
                  </span>
                </div>
              </Box>
            )}

            {data?.adInfo?.options?.custom && (
              <Box mb={2} className="custom-ad-small">
                <Typography mb={1}>Custom Ad Small</Typography>
                <div id="boostr-netwave-ads">
                  <span>
                    <span className="ad-wrap">
                      <a
                        href={data.adInfo.linkUrl}
                        className="ad-img"
                        target="_blank"
                        rel="sponsored"
                      >
                        <img
                          src={data.adInfo.image.url}
                          alt="ads via Boostr Netwave"
                          border="0"
                          height="100"
                          width="130"
                          style={{ maxWidth: "130px" }}
                        />
                      </a>
                      <a
                        href={data.adInfo.linkUrl}
                        className="ad-text"
                        target="_blank"
                        rel="sponsored"
                      >
                        {data.adInfo.content}
                      </a>
                    </span>
                    <a
                      href={import.meta.env.VITE_SPONSOR}
                      className="boostr-netwave-poweredby"
                      target="_blank"
                      rel="sponsored"
                    >
                      ads via Boostr Netwave
                    </a>
                  </span>
                </div>
              </Box>
            )}
            {data?.adInfo?.options?.custom && (
              <Box mb={2} className="custom-ad-medium">
                <Typography mb={1}>Custom Ad Medium</Typography>
                <div id="boostr-netwave-ads">
                  <span>
                    <span className="ad-wrap">
                      <a
                        href={data.adInfo.linkUrl}
                        className="ad-img"
                        target="_blank"
                        rel="sponsored"
                      >
                        <img
                          src={data.adInfo.image.url}
                          alt="ads via Boostr Netwave"
                          border="0"
                          height="100"
                          width="130"
                          style={{ maxWidth: "130px" }}
                        />
                      </a>
                      <a
                        href={data.adInfo.linkUrl}
                        className="ad-text"
                        target="_blank"
                        rel="sponsored"
                      >
                        {data.adInfo.content}
                      </a>
                    </span>
                    <a
                      href={import.meta.env.VITE_SPONSOR}
                      className="boostr-netwave-poweredby"
                      target="_blank"
                      rel="sponsored"
                    >
                      ads via Boostr Netwave
                    </a>
                  </span>
                </div>
              </Box>
            )}
            {data?.adInfo?.options?.custom && (
              <Box className="custom-ad-large">
                <Typography mb={1}>Custom Ad Large</Typography>
                <div id="boostr-netwave-ads">
                  <span>
                    <span className="ad-wrap">
                      <a
                        href={data.adInfo.linkUrl}
                        className="ad-img"
                        target="_blank"
                        rel="sponsored"
                      >
                        <img
                          src={data.adInfo.image.url}
                          alt="ads via Boostr Netwave"
                          border="0"
                          height="100"
                          width="130"
                          style={{ maxWidth: "130px" }}
                        />
                      </a>
                      <a
                        href={data.adInfo.linkUrl}
                        className="ad-text"
                        target="_blank"
                        rel="sponsored"
                      >
                        {data.adInfo.content}
                      </a>
                    </span>
                    <a
                      href={import.meta.env.VITE_SPONSOR}
                      className="boostr-netwave-poweredby"
                      target="_blank"
                      rel="sponsored"
                    >
                      ads via Boostr Netwave
                    </a>
                  </span>
                </div>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <center>
          <Typography variant="h6" mt={5}>
            Already reviewed
          </Typography>
        </center>
      )}
    </Box>
  );
}

export default PreviewAd;
