import { Button, Input, Modal, Form, Select } from "antd";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import i18n from "../../../../lib/Language";

const MutationMedicalDiseaseUnit = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  medicalDiseaseUnit,
  onUpdate,
  medicaldiseases,
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
    if (medicalDiseaseUnit) {
      return onUpdate(form.getFieldValue(), medicalDiseaseUnit.id, () =>
        handleCancel()
      );
    }
    onOk(form.getFieldValue(), () => handleCancel());
  };

  const onFinish = (values) => {
    if (medicalDiseaseUnit) {
      return onUpdate(values, medicalDiseaseUnit.id, () => handleCancel());
    }
    onOk(values, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };
  useEffect(() => {
    form.setFieldsValue(medicalDiseaseUnit);
  }, [medicalDiseaseUnit, form]);

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
            label="Medical disease"
            name="MEDICAL_DISEASE_ID"
            rules={[
              {
                required: true,
                message: "Please input Medical Disease Unit!",
              },
            ]}
            onChange={() => console.log()}
          >
            <Select
              placeholder={i18n.t(
                "MedicalDisease.medicalDiseaseUnits.SelectMedicalDiseasePlacehoder"
              )}
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={modifiedDatas(medicaldiseases)}
              onChange={(value) => {
                form.setFieldsValue("MEDICAL_DISEASE_ID", value)
              }}
            />
          </Form.Item>
          <Form.Item
            label="Name"
            name="NAME"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Medical Disease Unit!",
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
            label="Index"
            name="INDEX"
            rules={[
              {
                required: true,
                message: "Please input Index!",
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item label="Note" name="NOTE">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MutationMedicalDiseaseUnit;
