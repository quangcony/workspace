import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Menu,
  Row,
  Select,
  Skeleton,
  Space,
  Spin,
} from "antd";
import { useOrg } from "../../hooks/org";
import { useGender } from "../../hooks/gender";
import { useUserStatus } from "../../hooks/userStatus";
import TextArea from "antd/lib/input/TextArea";

const DetailUser = ({ profile, updateUser, handleGetUser }) => {
  const [form] = Form.useForm();
  const { getAllOrgs } = useOrg();
  const [orgs, setOrgs] = useState([]);
  const { genders } = useGender();
  const { userStatuses } = useUserStatus();
  const { Option } = Select;
  const handleReset = () => {
    form.setFieldsValue(profile);
  };
  const handleUpdateProfile = async () => {
    await updateUser(form.getFieldValue(), profile.id, () => {
      handleGetUser();
    });
  };

  // get all orgs
  useEffect(() => {
    const handleGetAllOrgs = async () => {
      const data = await getAllOrgs();
      setOrgs(data);
    };
    handleGetAllOrgs();
  }, []);

  useEffect(() => {
    form.setFieldsValue(profile);
  }, [profile]);

  // add value and label fiel for datas
  const modifiedDatas = (modified) => {
    return modified.map((item) => ({
      value: item.id,
      label: item.NAME,
    }));
  };

  return (
    <Form
      form={form}
      name="basic"
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      scrollToFirstError
      labelCol={{
        span: 6,
      }}
      wrroleerCol={{
        span: 18,
      }}
    >
      <Form.Item label="ID" name="id">
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="First Name"
        name="FIRST_NAME"
        rules={[
          {
            required: true,
            message: "Please input First Name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="LAST_NAME"
        rules={[
          {
            required: true,
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
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="PERSONAL_EMAIL"
        label="Personal E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            message: "Please input your E-mail!",
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
            message: "Please input your User Name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="PRIMARY_PHONE"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your Phone Number!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="SECOND_PHONE"
        label="Phone Number Other"
        rules={[
          {
            message: "Please input your Phone Number!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
            name="USER_STATUS_ID"
            placeholder="Select user status"
            label="User Status"
          >
            <Select options={modifiedDatas(userStatuses)}></Select>
          </Form.Item>
      <Form.Item
        label="Org"
        name="ORG_ID"
        rules={[
          {
            required: "true",
            message: "Please input ORG!",
          },
        ]}
      >
        <Select
          options={modifiedDatas(orgs)}
          //   getPopupContainer={(trigger) => trigger.parentNode}
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Select Org"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        ></Select>
      </Form.Item>
      <Form.Item
        name="NICK_NAME"
        label="Nick Name"
        rules={[
          {
            message: "Please input your Nick Name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="GENDER_ID"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please input your Gender!",
          },
        ]}
      >
        {/* <Input defaultValue={GENDER}/> */}
        <Select allowClear options={modifiedDatas(genders)}></Select>
      </Form.Item>
      <Form.Item
        name="PLACE_OF_BIRTH"
        label="Place Of Birth"
        rules={[
          {
            message: "Please input your Place Of Birth!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="DOMICILE"
        label="Domicile"
        rules={[
          {
            message: "Please input your Domicile!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="RESIDENT"
        label="Resident"
        rules={[
          {
            message: "Please input your Resident!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="NATIVE_PLACE"
        label="Native Place"
        rules={[
          {
            message: "Please input your Native Place!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="IDENTITY_CARD_NO"
        label="Identity Card No"
        rules={[
          {
            message: "Please input your Identity Card No!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="PLACE_OF_PERMANENT"
        label="Place Of Permanent"
        rules={[
          {
            message: "Please input your Place Of Permanent!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="USER_ID_INTRODUCED"
        label="User ID Introduced"
        rules={[
          {
            message: "Please input User ID Introduced!",
          },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>
      <Form.Item
        name="NOTE"
        label="Note"
        rules={[
          {
            message: "Please input Note!",
          },
        ]}
      >
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item name="FONT_COLOR" label="Font Color">
        <input type="color" id="favcolor" value="#DD6B20" />
      </Form.Item>
      <Form.Item name="BACKGROUND_COLOR" label="Background Color">
        <input type="color" id="favcolor" value="#DD6B20" />
      </Form.Item>
      <Row justify="end">
        <Space>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleUpdateProfile} type="primary">
            OK
          </Button>
        </Space>
      </Row>
    </Form>
  );
};

export default DetailUser;
