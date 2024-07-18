/* eslint-disable react/prop-types */
import { Box, Typography, Button, Grid, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useDocumentTitle from "../../../useDocumentTitle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../axiosInstance";

function AddMoney({ campaign }) {
  useDocumentTitle(
    campaign?.name ? `Add Money: ${campaign.name}` : "Add Money"
  );
    // console.log(campaign);

  let [amount, setAmount] = useState("");

  let { campaignId } = useParams();

  const navigate = useNavigate();
  const [isLoggedIN, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!isLoggedIN) {
      navigate("/auth/login");
    }
  }, [isLoggedIN, navigate]);

  const handlePay = async (e) => {
    e.preventDefault();

    let orderData = {
      amount,
    };

    // console.log(data);

    try {
      const {
        data: { key },
      } = await axiosInstance.get(
        `/api/advertiser/campaign/${campaignId}/add-money/getkey`
      );
      //   console.log(key);

      const response = await axiosInstance.post(
        `/api/advertiser/campaign/${campaignId}/add-money/checkout`,
        orderData
      );
      if (response.status === 200) {
        // console.log(response.data)
        let order = response.data.order;
        // console.log(order);

        const options = {
          key,
          amount: order.amount,
          currency: "USD",
          name: "Acme Corp", // required company name // 5267 3181 8797 5449 -- card 
          description: "campaign money add",
          order_id: order.id,
          handler: async function (response) {
            // console.log(response);

            let paymentResponse = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: amount,
              order_id: order.id,
            };
            // console.log(paymentResponse);
            const verifyResponse = await axiosInstance.post(
              `/api/advertiser/campaign/${campaignId}/add-money/verifysuccess`,
              paymentResponse
            );
            // console.log(verifyResponse);
            if (verifyResponse.status === 200) {
              toast.success(verifyResponse.data.message);
              navigate(`/advertiser/campaings/${campaignId}`);
            } else if (verifyResponse.status === 400) {
              toast.error(verifyResponse.data.message);
              navigate(`/advertiser/campaings/${campaignId}`);
            }
          },
          prefill: {
            // name: "Testing",
            email: campaign?.creator.user.email,
          },
          theme: {
            color: "#3399cc",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        paymentObject.on("payment.failed", async function (response) {
          paymentObject.close();
          //   console.log(response);
          let failureResponse = {
            razorpay_payment_id: response.error.metadata.payment_id,
            razorpay_order_id: response.error.metadata.order_id,
            amount: amount,
          };
          // console.log(paymentResponse);
          const verifyResponse = await axiosInstance.post(
            `/api/advertiser/campaign/${campaignId}/add-money/verifyfailure`,
            failureResponse
          );
          //   console.log(verifyResponse);
          if (verifyResponse.status === 200) {
            toast.error(verifyResponse.data.message);
            navigate(`/advertiser/campaings/${campaignId}`);
          }
        });
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.status) {
        if (err.response.status === 401 || err.response.status === 403) {
          // console.log(response.data.message);
          toast.error(err.response.data.message);
          toast.error("Login again");
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        } else if (err.response.status === 400) {
          toast.error(err.response.data.message.replace(/"/g, ""));
        }
      }
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h6" mb={2}>
          Add Money: {campaign?.name}
        </Typography>
        <RouterLink relative="path" to="..">
          <Button
            variant="outlined"
            sx={{ textTransform: "none", mb: 1 }}
            startIcon={<ArrowBackIosIcon />}
          >
            Go to campaign
          </Button>
        </RouterLink>
      </Box>

      <Typography variant="h6"> 
        Total amount: {campaign?.totalAmount}
      </Typography>
      <Typography variant="h6"> 
        Balance amount: {campaign?.balanceAmount}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handlePay}
          sx={{
            mt: 1,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: "10px",
            "&:hover": {
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            },
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Enter amount
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="amount"
                label="Amount ($)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 1 }}>
            Pay
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AddMoney;
