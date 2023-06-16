import { Button, Col, DatePicker, Form, Row, Select, Table } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import { TblPagination, removeAccents, formatDate } from "../../../../common";
import moment from "moment";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 12,
  },
  labelAlign: "left",
};

const checkFilterList = (a, b) => {
  return a ? a : b;
};

const FileImportHistory = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [newData, setNewData] = useState([]);
  const [filterHistory, setFilterHistory] = useState(undefined);
  const [filterResultList, setFilterResultList] = useState([]);

  const onFinish = () => {
    const values = { ...form.getFieldsValue() };
    // if (new Date(values?.START_DATE) > new Date(values?.END_DATE)) {
    //   alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc!!!");
    //   return;
    // }
    setFilterHistory(values);
  };

  useEffect(() => {
    if (
      filterHistory?.START_DATE ||
      filterHistory?.END_DATE ||
      filterHistory?.IMPORTED_BY
    ) {
      let newDatas = undefined;
      //FILTER DATE IMPORTFILE
      if (filterHistory?.START_DATE || filterHistory?.END_DATE) {
        let tempDatas = checkFilterList(newDatas, newData).filter(
          (item, index) => {
            const dataOfList = new Date(item?.IMPORTED_DATE);

            const keyWord = new Date(
              filterHistory?.START_DATE?.format("MM/DD/YYYY 00:00:00")
            );

            const keyWord2 = new Date(
              filterHistory?.END_DATE?.format("MM/DD/YYYY 23:59:59")
            );

            if (filterHistory?.START_DATE && filterHistory?.END_DATE) {
              return dataOfList >= keyWord && dataOfList <= keyWord2;
            }
            if (filterHistory?.START_DATE) {
              return dataOfList >= keyWord;
            }
            if (filterHistory?.END_DATE) {
              return dataOfList <= keyWord2;
            }
          }
        );
        newDatas = tempDatas;
      }
      // FILTER BY LAST_NAME
      if (filterHistory?.IMPORTED_BY) {
        const newQuery = removeAccents(String(filterHistory?.IMPORTED_BY))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newDatas, newData).filter((item) =>
          removeAccents(String(item?.IMPORTED_BY))
            .toLowerCase()
            .trim()
            .includes(newQuery)
        );
        newDatas = [...tempData];
      }

      setFilterResultList(newDatas);
    } else {
      setFilterResultList(undefined);
    }
  }, [newData, filterHistory]);

  const handleDelete = () => {
    console.log("Okokokok");
  };
  const { confirm } = useConfirmDelete(
    handleDelete,
    "Are you sure close this field?"
  );

  const columns = [
    {
      title: "STT",
      dataIndex: "",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ngày nhập file",
      render: (_, record) =>
        moment(record.IMPORTED_DATE).format(formatDate.Type),
      width: "10%",
      sorter: (a, b) => {
        var aa = a.IMPORTED_DATE.split("/").reverse().join(),
          bb = b.IMPORTED_DATE.split("/").reverse().join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      },
    },
    {
      title: "Người nhập file",
      dataIndex: "IMPORTED_BY",
      width: "20%",
      sorter: (a, b) => ("" + a.IMPORTED_BY).localeCompare(b.IMPORTED_BY),
    },
    {
      title: "Xem kết quả nhập file",
      dataIndex: "math",
      width: "30%",
      render: () => <Button type="link">Xem</Button>,
    },
    {
      title: "Tải file",
      dataIndex: "english",
      width: "10%",
      render: () => <Button type="link">Download file</Button>,
    },
  ];

  return (
    <div style={{ marginTop: 20 }}>
      <Form
        {...layout}
        form={form}
        name="time_related_controls"
        onFinish={onFinish}
      >
        <Row>
          <Col span={12} offset={7}>
            <Form.Item
              label="Ngày nhập file"
              style={{
                marginBottom: 0,
              }}
            >
              <Form.Item
                name="START_DATE"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 12px)",
                }}
              >
                <DatePicker
                  format={formatDate.Type}
                  placeholder={false}
                  disabledDate={(current) =>
                    current && current.valueOf() > Date.now()
                  }
                />
              </Form.Item>
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  lineHeight: "32px",
                  textAlign: "center",
                }}
              >
                -
              </span>
              <Form.Item
                name="END_DATE"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 12px)",
                }}
              >
                <DatePicker
                  format={formatDate.Type}
                  placeholder={false}
                  disabledDate={(current) =>
                    current && current.valueOf() > Date.now()
                  }
                />
              </Form.Item>
            </Form.Item>
            <Form.Item name="IMPORTED_BY" label="Người nhập file">
              <Select placeholder="Select a item" allowClear>
                <Option value="Bình">Bình</Option>
                <Option value="Tùng">Tùng</Option>
                <Option value="Duy">Duy</Option>
                <Option value="Tin">Tin</Option>
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 2, offset: 9 }}>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div style={{ marginTop: 15 }}>
        <h5>Danh sách file đã tải lên</h5>
        <Table
          pagination={TblPagination}
          columns={columns}
          // dataSource={newData }
          dataSource={filterResultList ? filterResultList : newData}
        />
      </div>
      {/* <Row>
        <Col span={2} offset={12}>
          <Button type="primary">Đóng</Button>
        </Col>
      </Row> */}
    </div>
  );
};

export default FileImportHistory;
