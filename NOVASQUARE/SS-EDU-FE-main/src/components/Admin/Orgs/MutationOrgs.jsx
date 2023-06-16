import {
  Button,
  Input,
  Modal,
  Radio,
  Select,
  Upload,
  Image,
  Spin,
  Checkbox,
  Popconfirm,
} from "antd";
import { Form } from "antd";
import React, { useEffect, useState } from "react";
import { useJwt } from "../../../hooks/jwt";
import {
  PlusOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useSnackbar } from "notistack";
import { useOrg } from "../../../hooks/org";

const { Option } = Select;

const MutationOrg = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  org,
  onUpdate,
  orgId,
  setOrgId,
}) => {
  const [icon, setIcon] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [isDefault, setIsDefault] = useState(false);
  const [orgDefault, setOrgDefault] = useState(undefined);
  const { TextArea } = Input;
  // const { enqueueSnackbar } = useSnackbar();
  const [fileList, setFileList] = useState([]);
  const { getOrgByDefault } = useOrg();
  const hanleGetOrgDefault = async () => {
    try {
      const data = await getOrgByDefault();
      setOrgDefault(data);
    } catch (error) {
      setOrgDefault(undefined);
    }
  };

  useEffect(() => {
    hanleGetOrgDefault();
  }, [org]);

  const toggleChecked = () => {
    if (orgDefault && !isDefault) setIsDefault(!isDefault);
  };

  useEffect(() => {
    if (org) {
      form.setFieldsValue(org);
      setFileList([
        {
          name: org.LOGO_NAME,
          status: "done",
          url:
            process.env.REACT_APP_BASE_URL +
            // + "/" + process.env.REACT_APP_UPLOADED_FOLDER
            `/orgs/${org.LOGO_NAME}`,
        },
      ]);
      setIcon("isExist");
      setIsDefault(org.IS_LOGO_DEFAULT);
    }
  }, [org, form]);

  const onChange = ({ fileList: newFileList }) => {
    let newImage = [...newFileList];
    if (newImage && newImage.length > 0) {
      newImage[0].status = "success";
    }
    setFileList(newImage);
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();

        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onSelectFile = ({ fileList }) => {
    if (!fileList || fileList.length === 0) {
      setIcon(undefined);

      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setIcon(fileList[0]);
  };

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };

    console.log("new Data :", newData);

    const { NAME, DESC, ABB } = newData;
    if (NAME.trim() === "" || DESC.trim() === "" || ABB.trim() === "") {
      // enqueueSnackbar("Please fill input!", { variant: "error" })
      return;
    }
    if (orgId) {
      return handleUpdateApp(newData, orgId, handleCancel);
    }
    handleCreateApp(newData);
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setOrgId(undefined);
    setFileList([]);
    setIsDefault(false);
  };

  const handleCreateApp = async (data) => {
    let formData = new FormData();
    if (icon && icon.originFileObj) {
      formData.append("logo-org", icon?.originFileObj);
    }
    formData.append("NAME", data.NAME);
    formData.append("ABB", data.ABB);
    if (data.NOTE) {
      formData.append("NOTE", data.NOTE);
    }
    if (data.DESC) {
      formData.append("DESC", data?.DESC);
    }

    formData.append("DOMAIN_NAME", data.DOMAIN_NAME);
    formData.append("IS_LOGO_LOGIN", data?.IS_LOGO_LOGIN);
    formData.append("IS_LOGO_DEFAULT", isDefault);

    onOk(formData, () => handleCancel());
  };
  const handleUpdateApp = async (data) => {
    let formData = new FormData();
    if (icon && icon.originFileObj) {
      formData.append("logo-org", icon?.originFileObj);
    } else if (icon !== "isExist") {
      formData.append("LOGO_NAME", "default.jpg");
    }
    formData.append("NAME", data.NAME);
    formData.append("ABB", data.ABB);
    if (data.NOTE) {
      formData.append("NOTE", data.NOTE);
    }
    if (data.DESC) {
      formData.append("DESC", data?.DESC);
    }

    formData.append("DOMAIN_NAME", data.DOMAIN_NAME);
    formData.append("IS_LOGO_LOGIN", data?.IS_LOGO_LOGIN);
    formData.append("IS_LOGO_DEFAULT", isDefault);

    onUpdate(formData, orgId, () => handleCancel());
  };

  console.log("org default :", orgDefault);

  return (
    <>
      <Modal
        title={title}
        visible={isOpen}
        // onOk={handleOk}
        // onSubmit={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
        footer={[
          <Button form="myForm" type="second" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="myForm"
            key="submit"
            htmlType="submit"
            type="primary"
            onClick={handleOk}
          >
            OK
          </Button>,
        ]}
      >
        <Spin spinning={isLoading}>
          <Form
            id="myForm"
            form={form}
            name="basic"
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
          >
            <Form.Item
              label="Name"
              name="NAME"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please input organizations Name!",
                },
              ]}
            >
              <Input autoFocus={true} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="DESC"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please input organizations Description!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Abbreviations"
              name="ABB"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please input Abbreviations!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Note"
              name="NOTE"
              rules={[
                {
                  message: "Please input Note!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Logo"
              // rules={[
              //     {
              //         required: org ? false : true
              //     }
              // ]}
              name="logo"
            >
              <Upload
                listType="picture"
                maxCount={1}
                fileList={fileList}
                onChange={(e) => {
                  onChange(e);
                  onSelectFile(e);
                }}
                onPreview={onPreview}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
              {/* <input onChange={changeIcon} type={'file'} /> */}
            </Form.Item>
            <Form.Item label="Domain" name="DOMAIN_NAME">
              <Input />
            </Form.Item>
            <Form.Item
              label="Display login logo"
              name="IS_LOGO_LOGIN"
              valuePropName="checked"
              defaultValue={false}
            >
              <Checkbox />
            </Form.Item>
            <Form.Item label="Display default logo" name="IS_LOGO_DEFAULT">
              {orgDefault && !isDefault ? (
                <Popconfirm
                  title="Organization default does exist. Are you want to continue !"
                  placement="topLeft"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={toggleChecked}
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: "red",
                      }}
                    />
                  }
                >
                  <Checkbox checked={isDefault} />
                </Popconfirm>
              ) : (
                <Checkbox
                  onClick={(e) => setIsDefault(e.target.checked)}
                  checked={isDefault}
                />
              )}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default MutationOrg;
