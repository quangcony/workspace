import Box from "@mui/material/Box";

import React from "react";
import { Card, Space, Typography, Input, Button } from "antd";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import {
  QuestionCircleFilled,
  ReadFilled,
  SearchOutlined,
} from "@ant-design/icons";
import BreadcrumbProvider from "../../../components/global/Breadcrumb";
import i18n from "../../../lib/Language";

const { Text, Paragraph } = Typography;

const Program = () => {
  const useStyles = {
    textStyles: {
      color: "#b0b3c2",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 1,
    },
  };

  return (
    <div className="page-content">
      <BreadcrumbProvider adrress={i18n.t("education.address")} />
      <Box sx={{ width: "100%", marginTop: 5 }}>
        <Space direction="vertical">
          <Space wrap={true} style={{ padding: "0 20px" }}>
            <Space>
              <Text
                style={{
                  fontWeight: 500,
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                }}
              >
                chủ đề
              </Text>
              <Input
                style={{
                  width: "400px",
                  padding: 6,
                  borderRadius: 6,
                }}
                placeholder="Tìm kiếm bất kỳ chủ đề"
                prefix={<SearchOutlined style={{ fontSize: 18 }} />}
              />
            </Space>
            <Space>
              <Button
                icon={<ReadFilled />}
                style={{ backgroundColor: "#e3e3e3", borderRadius: 6 }}
              >
                <Text
                  style={{
                    fontWeight: 500,
                    textTransform: "uppercase",
                    fontSize: "0.8rem",
                  }}
                >
                  khóa học của tôi
                </Text>
              </Button>
              <Button
                icon={<QuestionCircleFilled />}
                style={{ backgroundColor: "#e3e3e3", borderRadius: 6 }}
              >
                <Text
                  style={{
                    fontWeight: 500,
                    textTransform: "uppercase",
                    fontSize: "0.8rem",
                  }}
                >
                  hỗ trợ
                </Text>
              </Button>
            </Space>
          </Space>

          <Row gutter={[24, 16]}>
            {Array.from({ length: 24 }).map((item, index) => (
              <Col xs={24} lg={12} key={index}>
                <Link to={`program_1`}>
                  <Card title="STEM ROBOTICS">
                    <Space size={16} style={{ alignItems: "flex-start" }}>
                      <img
                        src={`https://picsum.photos/id/${index}/200/300`}
                        width={170}
                        height={100}
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        alt=""
                      />
                      <Paragraph
                        ellipsis={{ rows: 8 }}
                        style={{ marginTop: -6 }}
                      >
                        <Text style={{ fontWeight: 500 }}>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. Lorem Ipsum
                          is simply dummy text of the printing and typesetting
                          industry. Lorem Ipsum has been the industry's standard
                          dummy text ever since the 1500s, when an unknown
                          printer took a galley of type and scrambled it to make
                          a type specimen book.
                        </Text>
                      </Paragraph>
                    </Space>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 6,
                      }}
                    >
                      <Space direction="vertical">
                        <Text style={useStyles.textStyles}>
                          Có tất cả: 5 khóa học
                        </Text>
                        <Text style={useStyles.textStyles}>
                          Số lượng đăng kí: 1,245 học viên
                        </Text>
                      </Space>
                      <Text style={useStyles.textStyles}>42,238 học viên</Text>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Space>
      </Box>
    </div>
  );
};

export default Program;
