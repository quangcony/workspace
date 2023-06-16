import { Collapse, Rate, Space, Typography, Button } from "antd";
import {
  ClockCircleOutlined,
  PaperClipOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import React from "react";
import BreadcrumbProvider from "../../../components/global/Breadcrumb";
import i18n from "../../../lib/Language";
import { Box } from "@mui/material";

const { Title, Paragraph, Text, Link } = Typography;
const { Panel } = Collapse;

const Program11 = () => {
  const useStyles = {
    spaceStyles: {
      backgroundColor: "#e3e3e3",
      padding: 20,
      marginTop: 30,
      alignItems: "flex-start",
    },
    textStyles: {
      fontWeight: 600,
      fontSize: 14,
      maxWidth: "600px",
    },
    textGrayStyles: {
      color: "#b0b3c2",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 1,
    },
  };

  return (
    <div className="page-content">
      <BreadcrumbProvider adrress={i18n.t("education.address")} />
      <Box sx={{ width: "100%", marginTop: 5, backgroundColor: "white" }}>
        <Space direction="vertical">
          <Space style={useStyles.spaceStyles}>
            <Space direction="vertical">
              <Space
                align="baseline"
                wrap={true}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Title level={3}>L1-EXPLORER-WEDO</Title>
                <Text
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#29cc97",
                    color: "white",
                    borderRadius: 10,
                  }}
                >
                  Phổ biến
                </Text>
              </Space>
              <Paragraph ellipsis={{ rows: 3 }}>
                <Text style={useStyles.textStyles}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book.
                </Text>
              </Paragraph>
              <Rate allowHalf defaultValue={5} />
              <Text style={useStyles.textGrayStyles}>42,238 xem</Text>
              <Button icon={<PaperClipOutlined />} type="primary">
                Đăng kí
              </Button>
              <Text style={useStyles.textGrayStyles}>
                1,245 học viên đang học
              </Text>
              <Button icon={<ShareAltOutlined />} type="primary">
                Chia sẻ
              </Button>
            </Space>
            <Space direction="vertical" align="center">
              <Text>Thiết kế bởi</Text>
              <img
                width={100}
                height={100}
                src="https://picsum.photos/id/1/200/300"
                alt=""
              />
            </Space>
          </Space>

          <Space direction="vertical">
            <Title level={5}>CHI TIẾT CHƯƠNG TRÌNH</Title>
            <Collapse defaultActiveKey={["1"]} ghost>
              <Panel header="Giới thiệu" key="1">
                <ul>
                  <li>
                    <Text strong>
                      Bài 1: Giới thiệu về môn học Stem Robotics
                    </Text>
                    <ul>
                      {Array.from({ length: 3 }).map((item, index) => (
                        <li key={index}>
                          <Button icon={<ClockCircleOutlined />} type="text">
                            Tại sao phải học STEM
                          </Button>
                          <Text>5:12</Text>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </Panel>
              <Panel header="Cảm biến" key="2">
                <ul className="chapter">
                  <li>
                    <Text strong>
                      Bài 2: Giới thiệu về môn học Stem Robotics
                    </Text>
                    <ul className="lesson">
                      {Array.from({ length: 3 }).map((item, index) => (
                        <li key={index}>
                          <Space>
                            <ClockCircleOutlined />
                            <Link href="https://ant.design" target="_blank">
                              Tại sao phải học STEM
                            </Link>
                          </Space>
                          <Text>5:12</Text>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </Panel>
            </Collapse>
          </Space>
        </Space>
      </Box>
    </div>
  );
};

export default Program11;
