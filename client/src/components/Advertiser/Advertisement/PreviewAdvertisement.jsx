/* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import useDocumentTitle from "../../../useDocumentTitle";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditNoteIcon from "@mui/icons-material/EditNote";
import styles from "./PreviewAdvertisement.module.css";

// ads styling
import "./PreviewAdvertisement.css";

function PreviewAdvertisement({ ad }) {
  useDocumentTitle(ad?.name ? `Preview: ${ad.name}` : "Advertisement Platform");
  const { campaignId, adId } = useParams();
  // console.log(ad);
  return (
    <Box>
      <Typography variant="h6">Preview Advertisement: {ad?.name}</Typography>

      <Box
        sx={{ display: "flex", justifyContent: "space-between" }}
        mb={2}
        className={styles.buttonContainer}
      >
        <RouterLink relative="path" to="..">
          <Button
            variant="outlined"
            sx={{ textTransform: "none", mt: 2 }}
            startIcon={<ArrowBackIosIcon />}
          >
            Go to advertisement
          </Button>
        </RouterLink>

        {/* <RouterLink to={`/advertiser/campaings/${campaignId}/${adId}/edit`}>
          <Button
            variant="outlined"
            sx={{ textTransform: "none", mt: 2 }}
            endIcon={<EditNoteIcon />}
          >
            Edit advertisement
          </Button>
        </RouterLink> */}
      </Box>

      <Box className="custom-ads">
        {!ad?.options?.textOnly &&
          !ad?.options?.custom &&
          !ad?.options?.image &&
          !ad?.options?.sidebar && (
            <Box mt={2} id="video">
              <Typography mb={1}>Video ad</Typography>
              <div id="adethix-video-ad">
                <span className="outerSpan">
                  <span className="ad-wrap">
                    {/* <video ></video> */}
                    <video width={400} controls>
                      <source src={ad?.video?.url} type="video/mp4" />
                    </video>
                  </span>
                  <span className="innerSpan2">
                    <button>
                      <a
                        href={ad?.linkUrl}
                        className="adethix-poweredby"
                        target="_blank"
                        rel="sponsored"
                      >
                        Show more
                      </a>
                    </button>
                    <a
                      href={import.meta.env.VITE_SPONSOR}
                      className="adethix-poweredby"
                      target="_blank"
                      rel="sponsored"
                    >
                      ads via Adethix
                    </a>
                  </span>
                </span>
              </div>
            </Box>
          )}

        {ad?.options?.textOnly && (
          <Box mt={2} id="textOnly">
            <Typography mb={1}>Text only ad</Typography>
            <div id="boostr-netwave-ads">
              <span>
                <span className="ad-wrap">
                  <a
                    href={ad?.linkUrl}
                    className="ad-text"
                    target="_blank"
                    rel="sponsored"
                  >
                    {ad?.content}
                  </a>
                </span>
                <a
                  href={import.meta.env.VITE_SPONSOR}
                  className="boostr-netwave-poweredby"
                  target="_blank"
                  rel="sponsored"
                >
                  ads via Adethix
                </a>
              </span>
            </div>
          </Box>
        )}

        {/* fixed ad  */}
        {ad?.options?.image && (
          <Box mb={2} className="fixed-ad">
            <Typography mb={1}>Fixed Ad</Typography>
            <div id="boostr-netwave-ads">
              <span>
                <span className="ad-wrap">
                  <a
                    href={ad?.linkUrl}
                    className="ad-img"
                    target="_blank"
                    rel="sponsored"
                  >
                    <img
                      src={ad?.image.url}
                      alt="ads via Boostr Netwave"
                      border="0"
                      height="100"
                      width="130"
                      style={{ maxWidth: "130px" }}
                    />
                  </a>
                  <a
                    href={ad?.linkUrl}
                    className="ad-text"
                    target="_blank"
                    rel="sponsored"
                  >
                    {ad?.content}
                  </a>
                </span>
                <a
                  href={import.meta.env.VITE_SPONSOR}
                  className="boostr-netwave-poweredby"
                  target="_blank"
                  rel="sponsored"
                >
                  ads via Adethix
                </a>
              </span>
            </div>
          </Box>
        )}

        {/* sidebar ad */}
        {ad?.options?.sidebar && (
          <Box mb={2} className="sidebar-ad">
            <Typography mb={1}>Sidebar Ad</Typography>
            <div id="boostr-netwave-ads">
              <span>
                <span className="ad-wrap">
                  <a
                    href={ad?.linkUrl}
                    className="ad-img"
                    target="_blank"
                    rel="sponsored"
                  >
                    <img
                      src={ad?.image.url}
                      alt="ads via Boostr Netwave"
                      border="0"
                      height="100"
                      width="130"
                      style={{ maxWidth: "130px" }}
                    />
                  </a>
                  <a
                    href={ad?.linkUrl}
                    className="ad-text"
                    target="_blank"
                    rel="sponsored"
                  >
                    {ad?.content}
                  </a>
                </span>
                <a
                  href={import.meta.env.VITE_SPONSOR}
                  className="boostr-netwave-poweredby"
                  target="_blank"
                  rel="sponsored"
                >
                  ads via Adethix
                </a>
              </span>
            </div>
          </Box>
        )}

        {ad?.options?.custom && (
          <>
            <Box mb={2} className="custom-ad-small">
              <Typography mb={1}>Custom Ad for small screen</Typography>
              <div id="boostr-netwave-ads">
                <span>
                  <span className="ad-wrap">
                    <a
                      href={ad?.linkUrl}
                      className="ad-img"
                      target="_blank"
                      rel="sponsored"
                    >
                      <img
                        src={ad?.image.url}
                        alt="ads via Boostr Netwave"
                        border="0"
                        height="100"
                        width="130"
                        style={{ maxWidth: "130px" }}
                      />
                    </a>
                    <a
                      href={ad?.linkUrl}
                      className="ad-text"
                      target="_blank"
                      rel="sponsored"
                    >
                      {ad?.content}
                    </a>
                  </span>
                  <a
                    href={import.meta.env.VITE_SPONSOR}
                    className="boostr-netwave-poweredby"
                    target="_blank"
                    rel="sponsored"
                  >
                    ads via Adethix
                  </a>
                </span>
              </div>
            </Box>

            <Box mb={2} className="custom-ad-medium">
              <Typography mb={1}>Custom Ad for medium screen</Typography>
              <div id="boostr-netwave-ads">
                <span>
                  <span className="ad-wrap">
                    <a
                      href={ad?.linkUrl}
                      className="ad-img"
                      target="_blank"
                      rel="sponsored"
                    >
                      <img
                        src={ad?.image.url}
                        alt="ads via Boostr Netwave"
                        border="0"
                        height="100"
                        width="130"
                        style={{ maxWidth: "130px" }}
                      />
                    </a>
                    <a
                      href={ad?.linkUrl}
                      className="ad-text"
                      target="_blank"
                      rel="sponsored"
                    >
                      {ad?.content}
                    </a>
                  </span>
                  <a
                    href={import.meta.env.VITE_SPONSOR}
                    className="boostr-netwave-poweredby"
                    target="_blank"
                    rel="sponsored"
                  >
                    ads via Adethix
                  </a>
                </span>
              </div>
            </Box>

            <Box className="custom-ad-large">
              <Typography mb={1}>Custom Ad for large screen</Typography>
              <div id="boostr-netwave-ads">
                <span>
                  <span className="ad-wrap">
                    <a
                      href={ad?.linkUrl}
                      className="ad-img"
                      target="_blank"
                      rel="sponsored"
                    >
                      <img
                        src={ad?.image.url}
                        alt="ads via Boostr Netwave"
                        border="0"
                        height="100"
                        width="130"
                        style={{ maxWidth: "130px" }}
                      />
                    </a>
                    <a
                      href={ad?.linkUrl}
                      className="ad-text"
                      target="_blank"
                      rel="sponsored"
                    >
                      {ad?.content}
                    </a>
                  </span>
                  <a
                    href={import.meta.env.VITE_SPONSOR}
                    className="boostr-netwave-poweredby"
                    target="_blank"
                    rel="sponsored"
                  >
                    ads via Adethix
                  </a>
                </span>
              </div>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default PreviewAdvertisement;
