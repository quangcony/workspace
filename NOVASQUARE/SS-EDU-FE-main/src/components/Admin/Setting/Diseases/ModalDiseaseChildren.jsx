import { Select, TreeSelect, Input, Button, Form, Modal } from "antd";
import React from "react";
import i18n from "../../../../lib/Language";
const { TextArea } = Input;

const validateMessages = {
  required: i18n.t("setting.messageValidate"),
};

const ModalDiseaseChildren = ({
  title,
  isOpenModal,
  onOk,
  onCancel,
  setDisId,
  diseasesStatus,
  newDiseases,
  selectKey,
  showInfo,
}) => {
  const [form] = Form.useForm();

  if (selectKey) {
    form.setFieldsValue({
      PARENT_ID: showInfo.title,
    });
  }

  const handleOk = () => {
    const newData = {
      ...form.getFieldValue(),
      PARENT_ID: showInfo.id,
    };
    const { DESC, CD, NAME } = newData;

    if (DESC.trim() === "" || CD.trim() === "" || NAME.trim() === "") {
      return;
    }

    handleCreateDisease(newData);
  };

  const handleCreateDisease = async (data) => {
    onOk(data, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setDisId(undefined);
  };
  return (
    <div>
      <Modal
        title={title}
        centered
        visible={isOpenModal}
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
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
          id="myForm"
          validateMessages={validateMessages}
        >
          <Form.Item
            label={i18n.t("setting.diseases.disList")}
            name="PARENT_ID"
          >
            <TreeSelect
              treeData={newDiseases}
              // onChange={onSelectModal}
              allowDrop={false}
              showSearch
              allowClear
              placeholder={i18n.t("setting.diseases.chooselistParent")}
              disabled
            />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.diseases.ICD10")}
            name="CD"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.diseases.disName")}
            name="NAME"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.diseases.desc")}
            name="DESC"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="DISEASE_STATUS_ID"
            label={i18n.t("setting.diseases.disStatus")}
          >
            <Select
              placeholder={i18n.t("setting.diseases.sltDisState")}
              allowClear
            >
              {diseasesStatus &&
                diseasesStatus.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.NAME}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalDiseaseChildren;
