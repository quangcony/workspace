import {
  Table,
  Tag,
  Button,
  Row,
  Col,
  Space,
  Typography,
  Form,
  Radio,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { importApis } from "../../../../../api/importApis";
import ModalFilePDFExcelImport from "./ModalFilePDFExcelImport";
import { TblPagination } from "../../../../../common";
import { useSnackbar } from "notistack";
import i18n from "../../../../../lib/Language";
import { useRecoilState, useSetRecoilState } from "recoil";
import { historyInfoState } from "../../../../../recoil/atom/physicalExamState";
import { isDeleteState } from "../../../../../recoil/atom/booleanState";
import { physicalExamByQueryData } from "../../../../../common/getAllApi";
import { physicalExamOptionStateOccupation as physicalExamOptionState } from "../../../../../recoil/atom/physicalExamState";

const styleText = {
  marginLeft: 20,
  width: 300,
  display: "flex",
  justifyContent: "space-between",
};

const ImportFileResult = ({ examType1, text }) => {
  // console.log("ImportFileResult::examType: ", examType);
  const examType = 6;
  const specialDiseaseType = [
    { value: "0", label: "Bệnh Điếc nghề nghiệp do tiếng ồn" },
    { value: "1", label: "Bệnh Viêm phế quản mãn tính nghề nghiệp" },
    { value: "2", label: "Bệnh Hen phế quản nghề nghiệp" },
    { value: "3", label: "Bệnh Bụi phổi silic nghề nghiệp" },
    { value: "4", label: "Bệnh nghề nghiệp khác 1" },
    { value: "5", label: "Bệnh nghề nghiệp khác 2" },
  ];
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
  const [importDisease, setImportDisease] = useState(specialDiseaseType[0]);
  const [importMedicalType, setImportMedicalType] = useState(0);
  const fetchHistories = async () => {
    let res = await importApis.getImportHistoriesByType(examType);
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
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile.type);
    if (
      uploadedFile.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      uploadedFile.isUploading = true;
      setFile(uploadedFile);
    } else {
      alert("Vui lòng chọn file đúng định dạng xlsx.");
      setFile(null);
    }
    // console.log(uploadedFile);
    e.target.value = "";
  };
  const handleUploadFinal = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setIsLoading(true);
    try {
      // console.log("handleUploadFinal: ", dataFinal);
      const formDataFinal = new FormData();
      formDataFinal.append("file", file);
      formDataFinal.append("data", JSON.stringify(dataFinal));
      let res;
      switch (examType) {
        case 4:
          res = await importApis.importExamResultFromExcelFile(formDataFinal);
          break;
        case 3:
          res = await importApis.importRecruitExamResultFromExcelFile(
            formDataFinal
          );
          break;
        case 6:
          formDataFinal.append(
            "examType",
            JSON.stringify({
              TYPE: importMedicalType,
              DISEASE: importDisease,
            })
          );
          res = await importApis.importOccupationExamResultFromExcelFile(
            formDataFinal
          );
          break;
        default:
          enqueueSnackbar(`invalid File Type`, {
            variant: "error",
          });
          break;
      }

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
                TYPE: examType,
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
    // console.log(importMedicalType);
    // console.log(importDisease);
    setIsLoading(true);
    e.preventDefault();
    setIsLoading(true);
    setData([]);
    setDataFinal([]);
    const formData = new FormData();
    formData.append("file", file);

    try {
      let res;
      switch (examType) {
        case 4:
          res = await importApis.verifyExamResultFile({
            file: formData,
          });
          break;
        case 3:
          res = await importApis.verifyRecruitExamResultFile({
            file: formData,
          });
          break;
        case 6:
          const formDataCheck = new FormData();
          formDataCheck.append("file", file);
          formDataCheck.append(
            "data",
            JSON.stringify({ TYPE: importMedicalType, DISEASE: importDisease })
          );
          res = await importApis.verifyOccupationExamResultFile(formDataCheck);
          break;
        default:
          break;
      }
      setIsLoading(false);
      if (res?.data?.invalid) {
        setData([]);
        setVerifySuccess(false);
        enqueueSnackbar(res.data.message, { variant: "error" });
        return;
      }
      if (res?.data?.data?.length === 0) {
        setData([]);
        setVerifySuccess(false);
        enqueueSnackbar("No record found or invalid employee CD.", {
          variant: "error",
        });
        return;
      }
      setData(res.data.data);
      setVerifySuccess(res.data.success);
      if (res?.data?.success) {
        setDataFinal(res.data.data);
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
      title: "MSNV",
      dataIndex: "employeeCD",
      key: "employeeCD",
      width: "10%",
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
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      width: "5%",
    },
    {
      title: "Ngày sinh",
      dataIndex: "DOB",
      key: "DOB",
      width: "15%",
    },
    {
      title: "Kết quả",
      key: "result",
      dataIndex: "result",
      width: "15%",
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
    // {
    //   title: "Thao tác",
    //   dataIndex: "details",
    //   key: "details",

    //   render: (_, data) => (
    //     <Button
    //       type="link"
    //       onClick={() => {
    //         console.log(data);
    //         handleOpenFilePDF(data.details);
    //       }}
    //     >
    //       Xem chi tiết
    //     </Button>
    //   ),
    //   // render: () => <Button type="link">Xem chi tiết</Button>,
    // },
  ];
  return (
    <div>
      {/* <form> */}
      <Form>
        <Row>
          <Col span={6}>
            <p>
              Hình thức khám <br />
            </p>
          </Col>
          <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
            {/* <Form.Item
            name="TYPE"
            rules={[{ required: true }]}
            label="Hình thức khám"
          > */}
            <Radio.Group
              defaultValue={0}
              onChange={(e) => {
                setImportMedicalType(e.target.value);
              }}
              // disabled={physicalExam ? true : false}
            >
              <Radio value={0}> Tầm soát </Radio>
              <Radio value={1}> Định kỳ </Radio>
            </Radio.Group>
            {/* </Form.Item> */}
            {/* <Form.Item
            name="SPECIAL_DISEASE_TYPE"
            label="Bệnh nghề nghiệp"
            rules={[{ required: true }]}
          > */}
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <p>
              Bệnh nghề nghiệp <br />
            </p>
          </Col>
          <Col>
            <Select
              // allowClear
              options={specialDiseaseType}
              disabled={importMedicalType === 1}
              defaultValue={specialDiseaseType[0]}
              onChange={(value) => {
                setImportDisease(specialDiseaseType[value]);
                console.log(value);
                console.log(importDisease);
              }}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
            {/* </Form.Item> */}
          </Col>
        </Row>
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
      </Form>
      {/* </form> */}
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
          loading={isLoading}
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

export default ImportFileResult;
