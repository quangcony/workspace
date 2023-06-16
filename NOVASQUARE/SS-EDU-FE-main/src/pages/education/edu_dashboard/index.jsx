import Edu_dashboard from "../../../components/Admin/Edu_dashboard/Edu_dashboard";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ChartSaleTrafic from "../../../components/Admin/Edu_dashboard/ChartSaleTrafic/ChartSaleTrafic";
import ChartLeadStatus from "../../../components/Admin/Edu_dashboard/ChartLeadStatus/ChartLeadStatus";
import ChartSalePipeLine from "../../../components/Admin/Edu_dashboard/ChartSalePipeLine/ChartSalePipeLine";
import ChartTop5 from "../../../components/Admin/Edu_dashboard/ChartTop5/ChartTop5";
import ModalListInfoTrafic from "../../../components/Admin/Edu_dashboard/ChartSaleTrafic/ModalListInfoTrafic";
import { useEffect, useState } from "react";
import ModalListInfoLead from "../../../components/Admin/Edu_dashboard/ChartLeadStatus/ModalListInfoLead";
import ModalListInfoTop from "../../../components/Admin/Edu_dashboard/ChartTop5/ModalListInfoTop";
import dataTest from "../../../data_json/DataTest.json";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DashBoard = () => {
  const [isOpenListSaleStatus, setIsOpenListSaleStatus] = useState(false);
  const [isOpenListSalePipe, setIsOpenListSalePipe] = useState(false);
  const [isOpenListLeadStatus, setIsOpenListLeadStatus] = useState(false);
  const [isOpenListTop, setIsOpenListTop] = useState(false);
  const [dataType, setDataType] = useState(null);
  const [dataInfo, setDataInfo] = useState(null);

  // Modal open list sale
  const handleOpenListSaleStatus = (data) => {
    console.log("check data1:", data.data);
    setDataType(data.data.type);
    setIsOpenListSaleStatus(true);
  };

  // Modal open list lead status
  const handleOpenLeadStatus = (data) => {
    console.log("check data:", data);
    setIsOpenListLeadStatus(true);
  };

  // Modal open list top
  const handleOpenTop = (data) => {
    console.log("check data:", data);
    setIsOpenListTop(true);
  };

  const finished = dataTest.filter((item) => item.status === "Giao thành công");
  const cancel = dataTest.filter((item) => item.status === "Đã hủy");
  const newOrder = dataTest.filter((item) => item.status === "Chờ xác nhận");
  const delivery = dataTest.filter((item) => item.status === "Đang vận chuyển");

  useEffect(() => {
    const showDataInfo = () => {
      if (dataType === "Finished") return setDataInfo(finished);
      if (dataType === "Delivery") return setDataInfo(delivery);
      if (dataType === "NewOrder") return setDataInfo(newOrder);
      if (dataType === "Cancel") return setDataInfo(cancel);
    };
    showDataInfo();
  }, [dataType]);
  return (
    <div className="page-content">
      <Edu_dashboard />
      <Box sx={{ width: "100%", marginTop: 5 }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>
              <h4 style={{ textAlign: "left" }}>Tỷ lệ học viên theo chi nhánh</h4>
              <ChartSaleTrafic
                openListSale={handleOpenListSaleStatus}
                finished={finished}
                cancel={cancel}
                delivery={delivery}
                newOrder={newOrder}
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h4 style={{ textAlign: "left" }}>Số lớp theo loại</h4>
              <ChartLeadStatus openListLeadStatus={handleOpenLeadStatus} />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h4 style={{ textAlign: "left" }}>Độ hài lòng học viên với trung tâm</h4>
              <ChartSalePipeLine />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h4 style={{ textAlign: "left" }}>Số học viên qua các năm</h4>
              <ChartTop5 openListTop={handleOpenTop} />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <ModalListInfoTrafic
        isOpen={isOpenListSaleStatus}
        title={"List Sale Trafics"}
        showDataInfo={dataInfo}
        onCancel={() => setIsOpenListSaleStatus(false)}
      />
      <ModalListInfoLead
        isOpen={isOpenListLeadStatus}
        title={"List Sale Lead status"}
        onCancel={() => setIsOpenListLeadStatus(false)}
      />
      <ModalListInfoTop
        isOpen={isOpenListTop}
        title={"List Sale Top 5"}
        onCancel={() => setIsOpenListTop(false)}
      />
    </div>
  );
};

export default DashBoard;
