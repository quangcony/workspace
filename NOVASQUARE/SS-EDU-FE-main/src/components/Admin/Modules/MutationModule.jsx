import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Progress, Select, Upload } from "antd";
import { Form } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useApp } from "../../../hooks/app";
import { appState } from "../../../recoil/atom/appState";

const MutationModule = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  module,
  onUpdate,
  moduleId,
  setModuleId,
}) => {
  const [icon, setIcon] = useState();
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const [fileList, setFileList] = useState([]);
  const { apps } = useApp();

  const { enqueueSnackbar } = useSnackbar();
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
    const { NAME, DESC, MODULE_CD, APP_ID, INDEX } = newData;
    if (NAME.trim() === "" || DESC.trim() === "" || !INDEX) {
      return;
    }

    if (moduleId) {
      console.log("moduleID :", moduleId);
      return handleUpdateApp(newData, moduleId, handleCancel);
    }
    console.log("moduleID :", moduleId);
    handleCreateApp(newData);
  };
  const handleCreateApp = async (data) => {
    let formData = new FormData();
    if (icon && icon.originFileObj) {
      formData.append("icon-module", icon?.originFileObj);
    }
    formData.append("NAME", data.NAME);
    formData.append("APP_ID", data.APP_ID);
    formData.append("INDEX", data.INDEX);
    formData.append("MODULE_CD", data.MODULE_CD);
    if (data.DESC) {
      formData.append("DESC", data?.DESC);
    }

    onOk(formData, () => handleCancel());
  };
  useEffect(() => {
    if (module) {
      form.setFieldsValue(module);
      setFileList([
        {
          name: module.ICON_NAME,
          status: "done",
          url:
            process.env.REACT_APP_BASE_URL +
            // + "/" + process.env.REACT_APP_UPLOADED_FOLDER
            `/modules/${module.ICON_NAME}`,
        },
      ]);
      setIcon("isExist");
    }
  }, [module, form]);
  const handleUpdateApp = async (data) => {
    let formData = new FormData();
    if (icon && icon.originFileObj) {
      formData.append("icon-module", icon?.originFileObj);
    } else if (icon !== "isExist") {
      formData.append("ICON_NAME", "default.jpg");
    }
    formData.append("NAME", data.NAME);
    formData.append("APP_ID", data.APP_ID);
    formData.append("INDEX", data.INDEX);
    formData.append("MODULE_CD", data.MODULE_CD);
    if (data.DESC) {
      formData.append("DESC", data?.DESC);
    }

    onUpdate(formData, moduleId, () => handleCancel());
  };

  const handleCancel = () => {
    form.resetFields();
    setModuleId(undefined);
    setFileList([]);
    onCancel();
  };

  return (
    <>
      <Modal
        title={title}
        visible={isOpen}
        onOk={handleOk}
        // confirmLoading={loading}
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
        <Form
          id="myForm"
          form={form}
          name="basic"
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
        >
          <Form.Item
            label="Name"
            name="NAME"
            autoFocus={true}
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Module Name!",
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
                message: "Please input Description!",
              },
            ]}
          >
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="App"
            name="APP_ID"
            rules={[
              {
                required: "true",
                message: "Please select App!",
              },
            ]}
          >
            <Select
              getPopupContainer={(trigger) => trigger.parentNode}
              showSearch
              style={{ width: "100%" }}
              placeholder="Select App"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {apps &&
                apps.length > 0 &&
                apps.map((app) => (
                  <Option key={app.id} value={app.id}>
                    {app.NAME}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Url Page"
            name="MODULE_CD"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Module URL!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Index"
            name="INDEX"
            rules={[
              {
                required: true,
                message: "Please input index!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Icon"
            // rules={[
            //     {
            //         required: true,
            //     },
            // ]}
            name="icon"
          >
            {/* <input onChange={onSelectFile} type={'file'} /> */}
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
        </Form>
      </Modal>
    </>
  );
};

export default MutationModule;
