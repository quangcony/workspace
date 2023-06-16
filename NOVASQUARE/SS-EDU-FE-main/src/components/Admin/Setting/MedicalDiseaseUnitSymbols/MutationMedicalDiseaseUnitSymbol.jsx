import { Button, Input, Modal, Form, Select } from "antd";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import i18n from "../../../../lib/Language";

const isDefaultList = [
  {
    value: true,
    label: "Yes",
  },
  {
    value: false,
    label: "No",
  },
]

const MutationMedicalDiseaseUnitSymbol = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  medicalDiseaseUnitSymbol,
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
    if (medicalDiseaseUnitSymbol) {
      return onUpdate(form.getFieldValue(), medicalDiseaseUnitSymbol.id, () =>
        handleCancel()
      );
    }
    onOk(form.getFieldValue(), () => handleCancel());
  };

  const onFinish = (values) => {
    if (medicalDiseaseUnitSymbol) {
      return onUpdate(values, medicalDiseaseUnitSymbol.id, () => handleCancel());
    }
    onOk(values, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };
  useEffect(() => {
    form.setFieldsValue(medicalDiseaseUnitSymbol);
  }, [medicalDiseaseUnitSymbol, form]);

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
            label="Medical disease unit"
            name="MEDICAL_DISEASE_UNIT_ID"
            rules={[
              {
                required: true,
                message: "Please input Medical Disease Unit Symbol!",
              },
            ]}
            onChange={() => console.log()}
          >
            <Select
              placeholder={i18n.t(
                "MedicalDisease.medicalDiseaseUnitSymbols.SelectMedicalDiseaseUnitPlacehoder"
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
                form.setFieldsValue("MEDICAL_DISEASE_UNIT_ID", value)
              }}
            />
          </Form.Item>
          <Form.Item
            label="Unit symbol"
            name="UNIT_SYMBOL"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Medical Disease Unit Symbol!",
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
            label="Is default"
            name="IS_DEFAULT"
            onChange={(value) => {
              form.setFieldsValue("IS_DEFAULT", value)
            }}
          >
            <Select options={isDefaultList}></Select>
          </Form.Item>
          <Form.Item label="Note" name="NOTE">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MutationMedicalDiseaseUnitSymbol;
