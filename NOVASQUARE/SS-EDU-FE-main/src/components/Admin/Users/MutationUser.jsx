import { Button, DatePicker, Input, Modal, Select, Space, Upload } from "antd";
import { Form } from "antd";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { constSelector } from "recoil";
import { useGender } from "../../../hooks/gender";
import { useUserStatus } from "../../../hooks/userStatus";

const MutationUser = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  user,
  onUpdate,
  userId,
  setUserId,
  width,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const { enqueueSnackbar } = useSnackbar();
  const { genders } = useGender();
  const { userStatuses } = useUserStatus();
  const [fileList, setFileList] = useState([]);
  const [avatar, setAvatar] = useState(undefined);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
      setFileList([
        {
          name: user.AVATAR,
          status: "done",
          url: `${user.AVATAR}`,
        },
      ]);
      setAvatar("isExist");
    }
  }, [user, form]);

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
      setAvatar(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setAvatar(fileList[0]);
  };

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    const {
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      USER_NAME,
      PRIMARY_PHONE,
      GENDER_ID,
    } = newData;

    if (
      FIRST_NAME.trim() === "" ||
      LAST_NAME.trim() === "" ||
      EMAIL.trim() === "" ||
      USER_NAME.trim() === "" ||
      PRIMARY_PHONE.trim() === "" ||
      GENDER_ID === null
    ) {
      enqueueSnackbar("Please fill input!", { variant: "error" });
      return;
    }
    if (user) {
      return handleUpdateApp(newData);
    }
    handleCreateApp(newData);
  };

  const handleCreateApp = async (data) => {
    let formData = new FormData();
    if (avatar && avatar.originFileObj) {
      formData.append("avatar", avatar?.originFileObj);
    }
    Object.keys(data).forEach((el) => {
      formData.append(el, data[el]);
    });

    onOk(formData, () => handleCancel());
  };
  const handleUpdateApp = async (data) => {
    let formData = new FormData();
    if (avatar && avatar.originFileObj) {
      formData.append("avatar", avatar?.originFileObj);
    } else if (avatar !== "isExist") {
      formData.append("AVATAR", "default.jpg");
    }

    Object.keys(data).forEach((el, id) => {
      if (data[el]) {
        formData.append(el, data[el]);
      }
    });
    onUpdate(formData, userId, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setUserId(undefined);
    setFileList([]);
  };
  useEffect(() => {
    form.setFieldsValue(user);
  }, [user, form]);

  // add value and label fiel for datas
  const modifiedDatas = (modified) => {
    return modified.map((item) => ({
      value: item.id,
      label: item.NAME,
    }));
  };

  return (
    <>
      <Modal
        title={title}
        visible={isOpen}
        width={width}
        // onOk={handleOk}
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
        <Form
          id="myForm"
          form={form}
          name="basic"
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          scrollToFirstError
          labelCol={{
            span: 7,
          }}
          wrroleerCol={{
            span: 17,
          }}
        >
          <Form.Item
            label="First Name"
            name="FIRST_NAME"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input First Name!",
              },
            ]}
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="LAST_NAME"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Last Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="EMAIL"
            label="E-mail"
            rules={[
              {
                type: "email",
                required: true,
                whitespace: true,
                message: "Please input E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="USER_NAME"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please input User Name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="GENDER_ID"
            placeholder="Select Gender"
            rules={[
              {
                required: true,
                message: "Please input Gender!",
              },
            ]}
            label="Gender"
          >
            <Select options={modifiedDatas(genders)}></Select>
          </Form.Item>

          <Form.Item
            name="PRIMARY_PHONE"
            label="Phone Number"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="USER_STATUS_ID"
            placeholder="Select user status"
            label="User status"
          >
            <Select options={modifiedDatas(userStatuses)}></Select>
          </Form.Item>
          {!userId && (
            <>
              <Form.Item
                name="USER_PW"
                label="Password"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please confirm password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("USER_PW") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          )}
          <Form.Item name="avt" label="Avatar">
            <ImgCrop rotate>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={(e) => {
                  onChange(e);
                  onSelectFile(e);
                }}
                onPreview={onPreview}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MutationUser;
