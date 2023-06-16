import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ItemDashBoard from "./ItemDashBoard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Edu_Dashboard = () => {
  return (
      <Grid container spacing={3} style={{marginTop: 5}}>
        <Grid item xs>
          <Item>
            <ItemDashBoard title={"Tổng cần thu"} />
          </Item>
        </Grid>
        <Grid item xs>
          <Item>
            <ItemDashBoard title={"Tổng thu"} />
          </Item>
        </Grid>
        <Grid item xs>
          <Item>
            <ItemDashBoard title={"Tổng chi"} />
          </Item>
        </Grid>
        <Grid item xs>
          <Item>
            <ItemDashBoard title={"Còn lại"} />
          </Item>
        </Grid>
      </Grid>
  );
};

export default Edu_Dashboard;
