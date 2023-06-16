import { Button, Input, Modal, Radio, Select, Upload, Image, Spin } from "antd";
import { Form } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useJwt } from "../../../hooks/jwt";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { useSnackbar } from "notistack";
import apps from "../../../data_json/Apps.json";
import { useModule } from "../../../hooks/module";
import appApi from "../../../api/appApis";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const { Option } = Select;

const MutationApp = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  app,
  onUpdate,
  appId,
  placeHolder,
  setAppId,
}) => {
  const [icon, setIcon] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isInside, setIsInside] = useState(0);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [modulesByApp, setModulesByApp] = useState([]);
  const ImgaeRef = useRef();
  const { enqueueSnackbar } = useSnackbar();
  //Preview image
  const [fileList, setFileList] = useState([]);
  const [appCD, setAppCD] = useState();
  const { getAllModulesByAppId } = useModule();
  const [selectedModuleId, setSelectedModuleId] = useState();

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

    const { NAME, DESC, URL, INDEX } = newData;
    if (
      NAME.trim() === "" ||
      DESC.trim() === "" ||
      String(URL).trim() === "" ||
      String(INDEX) === ""
    ) {
      return;
    }
    newData.TYPE = isInside;

    if (appId) {
      return handleUpdateApp(newData);
    }
    handleCreateApp(newData);
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setIcon(undefined);
    setFileList([]);
    setIsInside(0);
    setAppId(undefined);
  };

  const handleCreateApp = async (data) => {
    let formData = new FormData();
    if (icon && icon.originFileObj) {
      formData.append("icon-app", icon?.originFileObj);
    }
    formData.append("APP_CD", appCD);
    formData.append("NAME", data.NAME);
    if (data.DESC) {
      formData.append("DESC", data?.DESC);
    }
    formData.append("TYPE", data?.TYPE);
    if (data.URL) {
      formData.append("URL", data?.URL);
    }
    if (data.INDEX) {
      formData.append("INDEX", data?.INDEX);
    }

    onOk(formData, () => handleCancel());
  };
  const handleUpdateApp = async (data) => {
    let formData = new FormData();
    if (icon && icon.originFileObj) {
      formData.append("icon-app", icon?.originFileObj);
    } else if (icon !== "isExist") {
      formData.append("ICON_NAME", "default.jpg");
    }
    formData.append("APP_CD", appCD);
    formData.append("NAME", data.NAME);
    formData.append("INDEX", data.INDEX);
    if (data.DESC) {
      formData.append("DESC", data?.DESC);
    }
    formData.append("TYPE", data?.TYPE);
    if (data.URL) {
      formData.append("URL", data?.URL);
    }

    // console.log("data ne", data);
    // console.log("app ne", app);
    onUpdate(formData, appId, () => handleCancel());

    await appApi.setDefaultModuleIdToAppId({
      appId,
      moduleId: selectedModuleId,
    });
  };

  useEffect(() => {
    (async () => {
      const data = await getAllModulesByAppId(appId);
      setModulesByApp(data);
    })();
  }, [appId]);

  useEffect(() => {
    if (app) {
      form.setFieldsValue(app);
      form.setFieldsValue({
        DEFAULT_MODULE_ID: app.defaultModule ? app.defaultModule?.id : null,
      });
      setFileList([
        {
          name: app.ICON_NAME,
          status: "done",
          url:
            process.env.REACT_APP_BASE_URL +
            // + "/" + process.env.REACT_APP_UPLOADED_FOLDER
            `/apps/${app.ICON_NAME}`,
        },
      ]);
      setAppCD(app.APP_CD);
      setIcon("isExist");
      setIsInside(app?.TYPE);
    }
  }, [app, form]);

  return (
    <>
      <Modal
        title={title}
        visible={isOpen}
        // onOk={handleOk}
        // confirmLoading={isLoading ? isLoading : loading}
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
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 19,
            }}
          >
            <Form.Item label="Type" name="TYPE">
              <Select
                defaultValue={0}
                style={{ width: 120 }}
                onChange={(e) => setIsInside(e)}
              >
                <Option value={0}>Inside</Option>
                <Option value={1}>Outside</Option>
              </Select>
            </Form.Item>
            {isInside === 0 ? (
              <Form.Item
                label="URL App"
                name="APP_CD"
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
                  style={{
                    width: 200,
                  }}
                  placeholder="Select App"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  // defaultValue={appCD}
                  onChange={(APP_CD) => setAppCD(APP_CD)}
                >
                  {apps &&
                    apps.length > 0 &&
                    apps.map((app) => (
                      <Option key={app.id} value={app.APP_CD}>
                        {app.APP_CD}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            ) : (
              <Form.Item
                label="URL"
                name="URL"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input URL!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            )}
            <Form.Item
              label="Name"
              name="NAME"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please input App Name!",
                },
              ]}
            >
              <Input placeholder={placeHolder} autoFocus={true} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="DESC"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please input App Description!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Index"
              name="INDEX"
              rules={[
                {
                  required: true,
                  // whitespace: true,
                  message: "Please input Index!",
                },
              ]}
            >
              <Input placeholder={placeHolder} autoFocus={true} />
            </Form.Item>
            {appId && (
              <Form.Item label="Default module" name="DEFAULT_MODULE_ID">
                <Select onChange={(moduleId) => setSelectedModuleId(moduleId)}>
                  <Option value={null}>null</Option>
                  {modulesByApp?.map((module) => (
                    <Option value={module.id}>{module.NAME}</Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item
              label="Icon"
              // rules={[
              //   {
              //     required: app ? false : true,
              //     message: "Please choose icon",
              //   },
              // ]}
              // name="icon"
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
        </Spin>
      </Modal>
    </>
  );
};

export default MutationApp;
