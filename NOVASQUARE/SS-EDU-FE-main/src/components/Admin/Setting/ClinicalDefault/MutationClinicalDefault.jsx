import { Button, Input, Modal, Select } from "antd";
import { Form } from "antd";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const MutationClinicalDefault = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  clinicaldefault,
  onUpdate,
  medicals
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { enqueueSnackbar } = useSnackbar();
  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    if (!Object.values(newData).length > 0) {
      // enqueueSnackbar("Please fill input!", { variant: "error" })
      return;
    }
    if (clinicaldefault) {
      return onUpdate(form.getFieldValue(), clinicaldefault.id, () =>
        handleCancel()
      );
    }
    onOk(form.getFieldValue(), () => handleCancel());
  };
  const onFinish = (values) => {
    if (clinicaldefault) {
      return onUpdate(values, clinicaldefault.id, () => handleCancel());
    }
    onOk(values, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };
  useEffect(() => {
    form.setFieldsValue(clinicaldefault);
  }, [clinicaldefault, form]);

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
                form={form}
                id="myForm"
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                scrollToFirstError
                labelCol={{
                    span: 10,
                }}
                wrroleerCol={{
                    span: 17,
                }}
                labelAlign='left'
            >
              
                <Form.Item
                    name="MEDICAL_DISEASE_ID"
                    label="Tên mã chức năng bệnh"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={medicals}

                    />
                </Form.Item>
                <Form.Item
            label="Data type"
            name="DATA_TYPE"
          >
            <Input autoFocus={true} />
          </Form.Item>
                <Form.Item
            label="Min"
            name="MIN_VERIFY"
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item
            label="Max"
            name="MAX_VERIFY"
            
          >
            <Input autoFocus={true} />
            </Form.Item>
            <Form.Item
            label="Help"
            name="INFO_HELP"
          >
            <Input autoFocus={true} />
            </Form.Item>
                <Form.Item
                label="Note"
                name="NOTE"
                >
                    <Input.TextArea row={3} />
                </Form.Item>
            </Form>
      </Modal>
    </>
  );
};

export default MutationClinicalDefault;
