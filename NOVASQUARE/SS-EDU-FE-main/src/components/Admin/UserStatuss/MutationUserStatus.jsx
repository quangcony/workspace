import { Button, Input, Modal, Select } from "antd";
import { Form, Radio } from "antd";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import userStatusJson from "../../../data_json/User_Status.json";

const MutationUserStatus = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  userstatus,
  onUpdate,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const { enqueueSnackbar } = useSnackbar();
  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    if (!Object.values(newData).length > 0) {
      // enqueueSnackbar("Please fill input!", { variant: "error" })
      return;
    }
    if (userstatus) {
      return onUpdate(form.getFieldValue(), userstatus.id, () =>
        handleCancel()
      );
    }
    onOk(form.getFieldValue(), () => handleCancel());
  };

  const onFinish = (values) => {
    if (userstatus) {
      return onUpdate(values, userstatus.id, () => handleCancel());
    }
    onOk(values, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };
  useEffect(() => {
    form.setFieldsValue(userstatus);
  }, [userstatus, form]);

  return (
    <>
      <Modal
        title={title}
        visible={isOpen}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
        footer={[
          <Button form="myForm" type="second" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form="myForm" key="submit" htmlType="submit" type="primary">
            OK
          </Button>,
        ]}
      >
        <Form
          id="myForm"
          form={form}
          name="basic"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{
            span: 5,
          }}
          wrroleerCol={{
            span: 19,
          }}
        >
          <Form.Item
            label="Name"
            name="NAME"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input User Status!",
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
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Action Link"
            name="ACTION_LINK"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please input Description!",
            //   },
            // ]}
          >
            <Input rows={4}/>
          </Form.Item>
          <Form.Item label="Is Login" name="IS_LOGIN" rules={[
              {
                required: true,
                message: "Please input Description!",
              },
            ]}>
            <Radio.Group  rows={4}>
              <Radio value={true}>True</Radio>
              <Radio value={false}>False</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Note" name="NOTE">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MutationUserStatus;
