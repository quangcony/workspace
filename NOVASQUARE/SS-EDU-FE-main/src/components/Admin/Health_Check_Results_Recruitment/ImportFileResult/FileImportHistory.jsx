import { Button, Col, DatePicker, Form, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import { formatDate, removeAccents, TblPagination } from "../../../../common";
import i18n from "../../../../lib/Language";
import { useRecoilValue } from "recoil";
import { historyInfoState } from "../../../../recoil/atom/physicalExamState";
import moment from "moment";
import { importApis } from "../../../../api/importApis";

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

const ImportHistory = () => {
  const [form] = Form.useForm();
  const history = useRecoilValue(historyInfoState);
  const [filterHistory, setFilterHistory] = useState(undefined);
  const [filterResultList, setFilterResultList] = useState(undefined);
  const [createBy, setCreateBy] = useState(undefined);

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
        let tempDatas = checkFilterList(newDatas, history).filter(
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
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newDatas, history).filter((item) =>
          removeAccents(String(item?.FULL_NAME))
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
  }, [history, filterHistory]);

  const handleDelete = () => {
    console.log("Okokokok");
  };
  const { confirm } = useConfirmDelete(
    handleDelete,
    "Are you sure close this field?"
  );

  const columns = [
    {
      title: (
        <span className="title-header-tbl">
          {i18n.t("healthHandbooks.employeeHealthInfo.index")}
        </span>
      ),
      dataIndex: "",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: (
        <span className="title-header-tbl">
          {i18n.t("healthHandbooks.employeeHealthInfo.importedDate")}
        </span>
      ),
      width: "25%",
      render: (_, record) =>
        moment(record.CREATED_DATE).format(formatDate.Type),
      sorter: (a, b) => {
        var aa = a.CREATED_DATE.split("/").reverse().join(),
          bb = b.CREATED_DATE.split("/").reverse().join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      },
    },
    {
      title: (
        <span className="title-header-tbl">
          {i18n.t("healthHandbooks.employeeHealthInfo.importedBy")}
        </span>
      ),
      dataIndex: "FULL_NAME",
      width: "25%",
      sorter: (a, b) => ("" + a.FULL_NAME).localeCompare(b.FULL_NAME),
    },
    {
      title: (
        <span className="title-header-tbl">
          {i18n.t("healthHandbooks.employeeHealthInfo.viewImportResult")}
        </span>
      ),
      dataIndex: "math",
      width: "30%",
      render: () => (
        <Button type="link">
          {i18n.t("healthHandbooks.employeeHealthInfo.view")}
        </Button>
      ),
    },
    {
      title: (
        <span className="title-header-tbl">
          {i18n.t("healthHandbooks.employeeHealthInfo.downloadFile")}
        </span>
      ),
      dataIndex: "FILE_NAME",
      width: "15%",
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
          <Col span={12} offset={7}>
            <Form.Item
              label={i18n.t("healthHandbooks.employeeHealthInfo.importedDate")}
              style={{
                marginBottom: 0,
                width: "100%",
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
                    current && current.valueOf() > Date.now()
                  }
                />
              </Form.Item>
            </Form.Item>
            <Form.Item
              name="IMPORTED_BY"
              label={i18n.t("healthHandbooks.employeeHealthInfo.importedBy")}
            >
              <Select
                allowClear
                options={createBy}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
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
            <Form.Item wrapperCol={{ span: 2, offset: 9 }}>
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
      {/* <Row>
        <Col span={2} offset={12}>
          <Button type="primary" onClick={() => confirm()}>
            {`${i18n.t("general.button.btnClose")}`}
          </Button>
        </Col>
      </Row> */}
    </div>
  );
};

export default ImportHistory;
