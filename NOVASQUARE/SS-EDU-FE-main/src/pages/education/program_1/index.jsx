import Box from "@mui/material/Box";
import React from "react";

import { List, Space, Button, Typography, Rate } from "antd";
import { FilterFilled } from "@ant-design/icons";
import BreadcrumbProvider from "../../../components/global/Breadcrumb";
import i18n from "../../../lib/Language";
import { Link } from "react-router-dom";

const { Text, Paragraph, Title } = Typography;

const data = Array.from({
  length: 16,
}).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i + 1}`,
  content: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text
    ever since the 1500s, when an unknown printer took a galley of type
    and scrambled it to make a type specimen book. Lorem Ipsum is simply
    dummy text of the printing and typesetting industry. Lorem Ipsum has
    been the industry's standard dummy text ever since the 1500s, when
    an unknown printer took a galley of type and scrambled it to make a
    type specimen book.`,
  quantity: "16",
  studentCount: "1,245",
  viewCount: "42,238",
  rating: "5",
  status: "Đã học xong",
}));

const Program1 = () => {
  return (
    <div className="page-content">
      <BreadcrumbProvider adrress={i18n.t("education.address")} />
      <Box sx={{ width: "100%", marginTop: 5 }}>
        <List
          itemLayout="vertical"
          size="large"
          style={{ backgroundColor: "white" }}
          header={
            <div style={{ paddingLeft: 24, fontWeight: 500 }}>
              16 chương trình học
            </div>
          }
          pagination={{
            pageSize: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.title}>
              <Space size={12} style={{ alignItems: "flex-start" }}>
                <Link to="program_11">
                  <img
                    width={200}
                    height={200}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                </Link>

                <Space direction="vertical" size={2}>
                  <Link
                    to={"/program_11"}
                    style={{ textTransform: "uppercase" }}
                  >
                    <Title level={5}>{item.title}</Title>
                  </Link>
                  <Paragraph ellipsis={{ rows: 3 }}>
                    <Text style={{ fontWeight: 500 }}>{item.content}</Text>
                  </Paragraph>
                  <Text
                    style={{
                      color: "#b0b3c2",
                      fontWeight: 500,
                      fontSize: "1rem",
                    }}
                  >
                    Có tất cả: {item.quantity} bài học
                  </Text>
                  <Text
                    style={{
                      color: "#b0b3c2",
                      fontWeight: 500,
                      fontSize: "1rem",
                    }}
                  >
                    {item.studentCount} học viên đang học
                  </Text>
                  <Text
                    style={{
                      color: "#b0b3c2",
                      fontWeight: 500,
                      fontSize: "1rem",
                    }}
                  >
                    {item.viewCount} xem
                  </Text>
                  <Rate
                    allowHalf
                    defaultValue={item.rating}
                    style={{ fontSize: 16 }}
                  />
                  <Space
                    wrap={true}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text
                      style={{
                        padding: "8px 24px",
                        backgroundColor: "#29cc97",
                        color: "#fff",
                        borderRadius: 30,
                      }}
                    >
                      Phổ biến
                    </Text>
                    <Button icon={<FilterFilled />} className="btn-success">
                      {item.status}
                    </Button>
                  </Space>
                </Space>
              </Space>
            </List.Item>
          )}
        />
      </Box>
    </div>
  );
};

export default Program1;
