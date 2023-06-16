import { Button, Col, DatePicker, Form, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  formatDate,
  removeAccents,
  TblPagination,
} from "../../../../../common";
import i18n from "../../../../../lib/Language";
import { useRecoilValue } from "recoil";
import { historyInfoState } from "../../../../../recoil/atom/physicalExamState";
import moment from "moment";
import { importApis } from "../../../../../api/importApis";
import useConfirmClose from "../../../../../hooks/useConfirmClose";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 12,
  },
  labelAlign: "left",
};

function unique(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i]?.FULL_NAME)) {
      newArr.push(arr[i]?.FULL_NAME);
    }
  }
  return newArr;
}

const ImportHistory = ({ onCancel, isOpen }) => {
  const [form] = Form.useForm();
  const history = useRecoilValue(historyInfoState);
  const [filterHistory, setFilterHistory] = useState(undefined);
  const [filterResultList, setFilterResultList] = useState(undefined);
  const [createBy, setCreateBy] = useState(undefined);
  const [startInputDate, setStartInputDate] = useState(null);

  useEffect(() => {
    if (history) {
      let dataNew = [];
      const dataCreateBy = unique(history);
      dataCreateBy.forEach((item) => {
        dataNew.push({
          lable: item,
          value: item,
        });
      });
      setCreateBy(dataNew);
    }
  }, [history]);

  const handleSearch = () => {
    const data = { ...form.getFieldsValue() };
    setFilterHistory(data);
  };

  const checkFilterList = (a, b) => {
    return a ? a : b;
  };
  // const handleDownload = async (fileName) => {
  //   await importApis.downloadExcelFile(fileName);
  // };
  useEffect(() => {
    if (
      filterHistory?.START_DATE ||
      filterHistory?.END_DATE ||
      filterHistory?.IMPORTED_BY
    ) {
      let newDatas = undefined;
      //FILTER DATE IMPORTFILE
      if (filterHistory?.START_DATE || filterHistory?.END_DATE) {
        let tempDatas = checkFilterList(newDatas, history)?.filter(
          (item, index) => {
            const dataOfList = new Date(item?.CREATED_DATE);
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
          ?.toLowerCase()
          ?.trim();
        const tempData = checkFilterList(newDatas, history)?.filter((item) =>
          removeAccents(String(item?.FULL_NAME))
            ?.toLowerCase()
            ?.trim()
            ?.includes(newQuery)
        );
        newDatas = [...tempData];
      }
      setFilterResultList(newDatas);
    } else {
      setFilterResultList(undefined);
    }
  }, [history, filterHistory]);

  const handleDelete = () => {
    console.log("Okokokok");
  };
  // const { confirm } = useConfirmDelete(
  //   handleDelete,
  //   "Are you sure close this field?"
  // );

  const { confirm } = useConfirmClose(onCancel, "Bạn có muốn đóng?");

  const columns = [
    {
      title: i18n.t("healthHandbooks.employeeHealthInfo.index"),
      dataIndex: "",
      render: (text, record, index) => index + 1,
    },
    {
      title: i18n.t("healthHandbooks.employeeHealthInfo.importedDate"),
      width: "30%",
      render: (_, record) =>
        moment(record.CREATED_DATE).format(formatDate.Type),
      sorter: (a, b) => {
        var aa = a.CREATED_DATE.split("/").reverse().join(),
          bb = b.CREATED_DATE.split("/").reverse().join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      },
    },
    {
      title: i18n.t("healthHandbooks.employeeHealthInfo.importedBy"),
      dataIndex: "FULL_NAME",
      width: "30%",
      sorter: (a, b) => ("" + a.FULL_NAME).localeCompare(b.FULL_NAME),
    },
    {
      title: i18n.t("healthHandbooks.employeeHealthInfo.viewImportResult"),
      dataIndex: "math",
      render: () => (
        <Button type="link">
          {i18n.t("healthHandbooks.employeeHealthInfo.view")}
        </Button>
      ),
    },
    {
      title: i18n.t("healthHandbooks.employeeHealthInfo.downloadFile"),
      dataIndex: "FILE_NAME",
      render: (fileName) => (
        <Button
          type="link"
          onClick={async () => {
            // console.log(
            //   `${process.env.REACT_APP_BASE_URL}/api/v1/upload/downloadExcelFile/${fileName}`
            // );
            await importApis.downloadExcelFile(fileName);
          }}
        >
          {i18n.t("healthHandbooks.employeeHealthInfo.download")}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ marginTop: 20 }}>
      <Form
        {...layout}
        form={form}
        name="time_related_controls"
        onFinish={handleSearch}
      >
        <Row>
          <Col span={12} offset={5}>
            <Form.Item
              label={i18n.t("healthHandbooks.employeeHealthInfo.importedDate")}
              style={{
                marginBottom: 0,
                width: "100%",
              }}
              labelCol={{
                lg: { span: 7 },
                md: { span: 8 },
                sm: { span: 24 },
                xs: { span: 24 },
              }}
              wrapperCol={{
                lg: { span: 16 },
                md: { span: 24 },
                sm: { span: 24 },
                xs: { span: 24 },
              }}
            >
              <Form.Item
                name="START_DATE"
                style={{
                  display: "inline-block",
                  width: "45%",
                }}
              >
                <DatePicker
                  format={formatDate.Type}
                  placeholder={false}
                  disabledDate={(current) =>
                    current && current.valueOf() > Date.now()
                  }
                  style={{ width: "100%" }}
                  onChange={(value) => setStartInputDate(value)}
                />
              </Form.Item>
              <span
                style={{
                  display: "inline-block",
                  width: "10%",
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
                  width: "45%",
                }}
              >
                <DatePicker
                  format={formatDate.Type}
                  placeholder={false}
                  disabledDate={(current) =>
                    current &&
                    current.valueOf() < new Date(startInputDate).getTime()
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item
              name="IMPORTED_BY"
              label={i18n.t("healthHandbooks.employeeHealthInfo.importedBy")}
              labelCol={{
                lg: { span: 7 },
                md: { span: 8 },
                sm: { span: 24 },
                xs: { span: 24 },
              }}
              wrapperCol={{
                lg: { span: 16 },
                md: { span: 24 },
                sm: { span: 24 },
                xs: { span: 24 },
              }}
            >
              <Select
                allowClear
                options={createBy}
                showSearch
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.trim().toLowerCase()))
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
              ></Select>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 2, offset: 12 }}>
              <Button type="primary" htmlType="submit">
                {`${i18n.t("hr.search")}`}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div style={{ marginTop: 15 }}>
        <h5>{`${i18n.t(
          "healthHandbooks.employeeHealthInfo.importedFileList"
        )}`}</h5>
        <Table
          columns={columns}
          dataSource={filterResultList ? filterResultList : history}
          pagination={TblPagination}
          // loading={history?.length ? false : true}
        />
      </div>
      {isOpen && (
        <Row>
          <Col span={2} offset={12}>
            <Button type="primary" onClick={() => confirm()}>
              {`${i18n.t("general.button.btnClose")}`}
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ImportHistory;
