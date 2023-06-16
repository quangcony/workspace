import { Table, Tag, Button, Row, Col, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { importApis } from "../../../../../api/importApis";
import ModalFilePDFExcelImport from "./ModalFilePDFExcelImport";
import { TblPagination } from "../../../../../common";
import { useSnackbar } from "notistack";
import i18n from "../../../../../lib/Language";
import { useRecoilState, useSetRecoilState } from "recoil";
import { historyInfoState } from "../../../../../recoil/atom/physicalExamState";
import physicalExamApi from "../../../../../api/physicalExamApi";
import { isDeleteState } from "../../../../../recoil/atom/booleanState";
import { physicalExamByQueryData } from "../../../../../common/getAllApi";
import { physicalExamOptionState } from "../../../../../recoil/atom/physicalExamState";

const styleText = {
  marginLeft: 20,
  width: 300,
  display: "flex",
  justifyContent: "space-between",
};

const ImportFile = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState([]);
  const [dataFinal, setDataFinal] = useState([]);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataViewPDF, setDataViewPDF] = useState("");
  const [isOpenFilePDF, setIsOpenFilePDF] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [physicalExamOption, setPhysicalExamOption] = useRecoilState(
    physicalExamOptionState
  );
  const setHistoryInfoState = useSetRecoilState(historyInfoState);
  const [isDelete, setIsDelete] = useRecoilState(isDeleteState);

  const fetchHistories = async () => {
    let res = await importApis.getAllImportHistories();
    if (res.data.status === 200) {
      res = res.data.elements;
      if (res.length > 0) {
        res.forEach((e) => {
          e.CREATED_DATE = e.CREATED_DATE.substring(0, 10);
          e.FULL_NAME = e.Created_By.FIRST_NAME + " " + e.Created_By.LAST_NAME;
        });
        setHistoryInfoState(res);
      }
    }
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleUpload = (e) => {
    setVerifySuccess(false);
    const file = e.target.files[0];
    console.log(file.type);
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      file.isUploading = true;
      setFile(file);
    } else {
      alert("Vui lòng chọn file đúng định dạng xlsx.");
      setFile(null);
    }
    e.target.value = "";
  };
  const handleUploadFinal = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("handleUploadFinal: ", dataFinal);
      const formDataFinal = new FormData();
      formDataFinal.append("file", file);
      formDataFinal.append("data", JSON.stringify(dataFinal));
      let res = await importApis.importExamResultFromExcelFile(formDataFinal);
      //refetch the medical exam result list
      if (res?.data?.success) {
        enqueueSnackbar(
          `${i18n.t("healthHandbooks.employeeHealthInfo.importSuccessfully")}${
            dataFinal.length
          }`,
          {
            variant: "success",
          }
        );
        fetchHistories();
        try {
          // await physicalExamApi.getAllPhysicalExams();
          setIsDelete(true);
          if (res.data) {
            physicalExamByQueryData(
              physicalExamOption,
              setPhysicalExamOption,
              {
                INPUT_STATUS: 1,
                TYPE: 4,
              },
              isDelete
            );
          }
        } catch (error) {
          console.log("error");
        }
        handleClose();
      } else {
        enqueueSnackbar(
          `${i18n.t("healthHandbooks.employeeHealthInfo.importFailed")}`,
          { variant: "error" }
        );
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleClose = (e) => {
    setData([]);
    setDataFinal([]);
    setVerifySuccess(false);
    setFile(null);
  };
  const handleDelFile = () => {
    setFile(null);
    setData([]);
    setDataFinal([]);
    setVerifySuccess(false);
  };

  const handleCheck = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      let res = await importApis.verifyExamResultFile({
        file: formData,
      });
      setData(res.data.data);
      setVerifySuccess(res.data.success);
      if (res.data.success) {
        setDataFinal(res.data.data);
        console.log("dataFinal: ", res.data.data);
      }
    } catch (error) {
      console.log(error);
      // toast.error('Upload avatar faild.Try again!')
      // toast.success(i18n.t("users.profile.toastUploadImageforUserError"))
    }
    setIsLoading(false);
  };

  const handleOpenFilePDF = async (data) => {
    setDataViewPDF(data);
    setIsOpenFilePDF(true);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Số hồ sơ",
      dataIndex: "code",
      key: "code",
      width: "15%",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      width: "20%",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Kết quả",
      key: "result",
      dataIndex: "result",
      width: "20%",
      // sorter: {
      //   compare: (a, b) => a.result - b.result,
      //   multiple: 2,
      // },
      sorter: (a, b) => a?.result?.length - b?.result?.length,
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
      render: (result) => {
        let color = result.includes("không hợp lệ") ? "red" : "green";
        return (
          <span style={{ whiteSpace: "pre", color: `${color}` }}>{result}</span>
        );
      },
    },
    {
      title: "Những cột bị thiếu dữ liệu",
      dataIndex: "reason",
      key: "reason",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      render: (reason) => (
        <span>
          {reason.map((tag) => {
            return (
              <Tag color={"orange"} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "details",
      key: "details",

      render: (_, data) => (
        <Button
          type="link"
          onClick={() => {
            console.log(data);
            handleOpenFilePDF(data.details);
          }}
        >
          Xem chi tiết
        </Button>
      ),
      // render: () => <Button type="link">Xem chi tiết</Button>,
    },
  ];
  return (
    <div>
      <form>
        <Row>
          <Col span={8}>
            <p>
              Chọn danh sách kết quả KSK ĐK cần tải lên. <br />
              (Vui lòng chọn lại file nếu file có thay đổi.)
            </p>
          </Col>
          <Col span={15} offset={1}>
            <Space size={16} wrap={false}>
              <div style={{ position: "relative" }}>
                <input
                  type="file"
                  id="file"
                  onChange={handleUpload}
                  style={{
                    position: "relative",
                    zIndex: 3,
                    maxWidth: 100,
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
                <button
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    width: 100,
                    cursor: "pointer",
                  }}
                >
                  Chọn file
                </button>
              </div>
              <div>
                <Typography.Text
                  style={{
                    marginRight: 20,
                  }}
                >
                  {file?.name}
                </Typography.Text>
                <DeleteOutlined
                  hidden={!file}
                  style={{ fontSize: 23 }}
                  onClick={() => handleDelFile()}
                />
              </div>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={24} offset={9}>
            <Button
              disabled={!file}
              loading={isLoading}
              type="primary"
              onClick={(e) => handleCheck(e)}
            >
              Kiểm tra dữ liệu
            </Button>
          </Col>
        </Row>
      </form>
      <div style={{ marginTop: 15 }}>
        <div style={{ display: "flex" }}>
          <h5 style={{ marginRight: 50 }}>Kết quả kiểm tra</h5>
          {/* <p className="link">Tải file</p> */}
        </div>
        <div>
          <p style={styleText}>
            <span>Số nhân viên được import</span>
            <span>{data.length}</span>
          </p>
          <p style={styleText}>
            <span>Dữ liệu tải hợp lệ</span>
            <span style={{ color: "green" }}>
              {data.filter((obj) => obj.result === "hợp lệ").length}
            </span>
          </p>
          <p style={styleText}>
            <span>Dữ liệu tải không hợp lệ</span>
            <span style={{ color: "red" }}>
              {data.length -
                data.filter((obj) => obj.result === "hợp lệ").length}
            </span>
          </p>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <h5>Bảng danh sách kiểm tra dữ liệu</h5>
        {/* {!verifySuccess ? (
          <Table columns={columns} dataSource={data} onChange={onChange} />
        ) : (
          <div style={{ color: "green" }}>Kiểm tra dữ liệu thành công.</div>
        )} */}
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          pagination={TblPagination}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: 20,
        }}
      >
        <Button
          disabled={!verifySuccess}
          type="primary"
          onClick={(e) => handleUploadFinal(e)}
        >
          Lưu
        </Button>
        <Button
          type="primary"
          onClick={(e) => handleClose(e)}
          style={{
            border: "none",
            outline: "none",
            color: "white",
            backgroundColor: "#1890ff",
            padding: "3px 15px",
            borderRadius: 3,
          }}
        >
          Tải lại
        </Button>
      </div>
      <ModalFilePDFExcelImport
        isOpen={isOpenFilePDF}
        onCancel={() => setIsOpenFilePDF(false)}
        dataViewPDF={dataViewPDF}
      />
    </div>
  );
};

export default ImportFile;
