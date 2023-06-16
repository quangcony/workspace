import { Space, Row, Col, Button, Input, Checkbox, Divider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import i18n from "../../../../lib/Language";
import Card from "../../../../components/global/Card";
import diseaseApi from "../../../../api/diseaseApi";
import { useSnackbar } from "notistack";
import {
  diseaseByQueryState,
  diseasesState,
} from "../../../../recoil/atom/diseaseState";
import { useRecoilState } from "recoil";
import { diseaseByQueryData } from "../../../../common/getAllApi";

const styles = {
  styleEle: {
    color: "blue",
    textDecoration: "underline",
    fontWeight: 700,
    cursor: "pointer",
  },
  styleEleDel: {
    color: "red",
    textDecoration: "underline",
    fontWeight: 700,
    marginLeft: 20,
    cursor: "pointer",
  },
};

const ShowDetail = ({ showInfo }) => {
  const [isShowInput, setIsShowInput] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [valueEdit, setValueEdit] = useState("");
  const [value, setValue] = useState("");
  const typingTimeoutRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [checkAll, setCheckAll] = useState([]);
  const [listDisease, setListDisease] = useState([]);
  const [diseases, setDiseases] = useRecoilState(diseasesState);
  const [isLoading, setIsLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [diseaseByQuery, setDiseaseByQuery] =
    useRecoilState(diseaseByQueryState);

  // CHECK DISEASE BY QUERY
  useEffect(() => {
    if (diseaseByQuery.length === 0) {
      diseaseByQueryData(diseaseByQuery, setDiseaseByQuery, {
        USER_INPUT: true,
      });
    }
  }, [diseaseByQuery]);

  const handleDelete = async (id) => {
    if (checkAll.length > 0) {
      checkAll.map((item) => handleDeleteDisease(item));
    }
  };

  // DELETE DISEASE
  const handleDeleteDisease = async (id) => {
    setIsDelete(true);
    try {
      let res = await diseaseApi.deleteDisease(id);
      if (res.data) {
        diseaseByQueryData(diseaseByQuery, setDiseaseByQuery, {
          USER_INPUT: true,
        });
        let allData = await diseaseApi.getAllDisease();
        if (allData.data) {
          setDiseases(allData.data.elements);
        }
        setIsDelete(false);
        enqueueSnackbar(res.data.message, { variant: "success" });
      }
    } catch (error) {
      console.log("Delete disease fail!");
      setIsDelete(false);
    }
    // setSelectKey("");
  };

  // const { confirm } = useConfirmDelete(
  //   handleDelete,
  //   `${i18n.t("general.mesDelete")}`
  // );

  // HANDLE CLOSE INPUT ADD NEW
  const handleCancel = () => {
    setIsShowInput(false);
    setValue("");
  };

  // HANDLE CHANGE WHEN UPDATE
  const handleCancelUpdate = (status, data) => {
    if (status) {
      setIsUpdate(false);
    } else {
      setValueEdit(data);
      setIsUpdate(true);
      setIsShowInput(false);
    }
  };

  // HANDLE GET VALUE UPDATE
  const handleValueEdit = (e) => {
    setValueEdit({
      ...valueEdit,
      NAME: e.target.value,
    });
  };

  // HANDLE GET VALUE CREATE NEW
  const handleGetValue = (e) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setValue(e.target.value);
    }, 500);
  };

  // HANDLE CREATE NEW DISEASE
  const handleAddNew = async (status) => {
    // HANDLE CLICK BUTTON SAVE
    if (status === 1) {
      setIsShowInput(true);
      setIsUpdate(false);
    }
    // HANDLE ADD NEW
    if (value === undefined || value === null || value.trim() === "") {
      return;
    }
    if (status === 2) {
      setIsLoading(true);
      const data = {
        CD: showInfo?.CD + "." + Math.floor(Math.random() * 999999),
        NAME: value,
        USER_INPUT: true,
        PARENT_ID: showInfo?.id,
      };
      try {
        let res = await diseaseApi.createDisease(data);
        if (res.data) {
          diseaseByQueryData(diseaseByQuery, setDiseaseByQuery, {
            USER_INPUT: true,
          });
          let all = await diseaseApi.getAllDisease();
          if (all.data) {
            setDiseases(all.data.elements);
            setIsLoading(false);
          }
          enqueueSnackbar(res.data.message, { variant: "success" });
          setIsShowInput(false);
          handleCancel();
        }
      } catch (error) {
        console.log("Create disease fail!");
        setIsLoading(false);
      }
    }
  };

  const handleUpdate = async () => {
    if (
      valueEdit?.NAME === undefined ||
      valueEdit?.NAME === null ||
      valueEdit?.NAME?.trim() === ""
    ) {
      return;
    }
    setIsLoading(true);
    try {
      let res = await diseaseApi.updateDisease(
        { ...valueEdit, NAME: valueEdit?.NAME },
        valueEdit?.id
      );
      if (res.data) {
        diseaseByQueryData(diseaseByQuery, setDiseaseByQuery, {
          USER_INPUT: true,
        });
        let all = await diseaseApi.getAllDisease();
        if (all.data) {
          setDiseases(all.data.elements);
        }
        setIsLoading(false);
        enqueueSnackbar(res.data.message, { variant: "success" });
        setIsUpdate(false);
        setIsShowInput(false);
      }
    } catch (error) {
      console.log("Update disease fail!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showInfo) {
      const data = diseaseByQuery?.filter(
        (item) => item?.PARENT_ID === showInfo?.id
      );
      setListDisease(data);
    }
  }, [showInfo, diseaseByQuery]);

  const handleCheckBox = (checkedValues) => {
    setCheckAll(checkedValues);
  };
  const handleSelectAll = () => {
    handleCheckBox(listDisease?.map((item) => item.id));
  };

  return (
    <>
      <Card>
        <Row>
          <Col
            span={24}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Space>
              {isShowInput && (
                <Button
                  onClick={handleCancel}
                  title="Chỉnh sửa"
                  type="primary"
                  className={"btn-warning"}
                  style={{
                    display: "block",
                    width: 120,
                  }}
                >
                  Hủy bỏ
                </Button>
              )}
              <Button
                onClick={() => {
                  if (isShowInput) {
                    handleAddNew(2);
                  } else if (isUpdate) {
                    handleUpdate();
                  } else {
                    handleAddNew(1);
                  }
                }}
                title="Thêm bệnh"
                type="primary"
                style={{
                  display: "block",
                }}
                style={{ width: 120 }}
              >
                {isShowInput || isUpdate ? (
                  isLoading ? (
                    <LoadingOutlined />
                  ) : (
                    "Lưu"
                  )
                ) : (
                  "Thêm mới"
                )}
              </Button>
            </Space>
          </Col>
        </Row>
        <Divider />
        <Row style={{ minHeight: 300 }}>
          <Col span={24}>
            <Space>
              <p onClick={handleSelectAll} style={styles.styleEle}>
                {"[Chọn hết]"}
              </p>
              <p
                onClick={() => {
                  handleCheckBox([]);
                }}
                style={styles.styleEle}
              >
                {"[Bỏ chọn]"}
              </p>
              <p onClick={handleDelete} style={styles.styleEleDel}>
                {isDelete ? "Loanding..." : "Xóa"}
              </p>
            </Space>
            {/* SHOW INPUT ADD NEW */}
            {isShowInput && (
              <Row style={{ marginBottom: 20 }}>
                <Col span={18}>
                  <Input
                    onChange={handleGetValue}
                    placeholder="Nhập tên bệnh mới ..."
                    disabled={isLoading}
                  />
                </Col>
                <Col span={6}></Col>
              </Row>
            )}
            {/* SHOW LIST DISEASE USER INPUT */}
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={handleCheckBox}
              value={checkAll}
            >
              {listDisease &&
                listDisease?.length > 0 &&
                listDisease.map((item, index) => (
                  <Row key={index}>
                    <Col span={18}>
                      <p>
                        {isUpdate ? (
                          <>
                            {valueEdit?.id === item?.id ? (
                              <Input
                                value={valueEdit?.NAME}
                                onChange={handleValueEdit}
                                disabled={isLoading}
                              />
                            ) : (
                              <Checkbox value={item.id}>{item?.NAME}</Checkbox>
                            )}
                          </>
                        ) : (
                          <Checkbox value={item.id}>{item?.NAME}</Checkbox>
                        )}
                      </p>
                    </Col>
                    <Col span={6}>
                      <Button
                        onClick={() => {
                          if (isUpdate) {
                            handleCancelUpdate(true);
                          } else {
                            handleCancelUpdate(false, item);
                          }
                        }}
                        style={{ width: 150 }}
                        type="primary"
                        className={
                          isUpdate && valueEdit?.id === item.id
                            ? "btn-warning"
                            : null
                        }
                        disabled={isLoading ? true : false}
                      >
                        {isUpdate && valueEdit?.id === item.id
                          ? "Hủy"
                          : "Chỉnh sửa"}
                      </Button>
                    </Col>
                  </Row>
                ))}
            </Checkbox.Group>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col span={24}>
          <Card title="">
            <h2 style={{ textAlign: "center", fontWeight: 700 }}>Mô tả thêm</h2>
            <div style={{ border: "1px solid black", padding: 20 }}>
              {showInfo &&
                showInfo?.children?.map((item) => (
                  <div key={item.key}>
                    <h5 style={{ fontWeight: 700 }}>{item.title}</h5>
                    {item.INCLUDE && (
                      <>
                        <div>Bao gồm:</div>
                        <p style={{ marginLeft: 20, whiteSpace: "pre-line" }}>
                          {item.INCLUDE}
                        </p>
                      </>
                    )}
                    {item.EXCLUDE && (
                      <>
                        <div>Loại trừ:</div>
                        <p style={{ marginLeft: 20, whiteSpace: "pre-line" }}>
                          {item.EXCLUDE}
                        </p>
                      </>
                    )}
                  </div>
                ))}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ShowDetail;
