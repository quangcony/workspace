import { Grid } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import BreadcrumbProvider from "../../components/global/Breadcrumb";
import { logoState } from "../../recoil/atom/logoState";
const Home = () => {
  const logo = useRecoilValue(logoState);
  return (
    <>
      <div className="page-content">
        <BreadcrumbProvider item="" adrress="Sổ tay sức khỏe" />
        <div className="row">
          <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h6 className="card-title">Sổ tay sức khỏe</h6>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ paddingY: 5 }}
                >
                  <img className="" style={{ width: "30%" }} src={logo} />
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
