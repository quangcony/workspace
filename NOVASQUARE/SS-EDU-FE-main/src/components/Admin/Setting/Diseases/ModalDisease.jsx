import { Select, TreeSelect, Input, Button, Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import i18n from "../../../../lib/Language";
const { TextArea } = Input;

const validateMessages = {
  required: i18n.t("setting.messageValidate"),
};

const ModalDisease = ({
  title,
  isOpenModal,
  onOk,
  onCancel,
  diseaseId,
  disId,
  onUpdate,
  setDisId,
  diseasesStatus,
  newDiseases,
  showInfo,
  setShowInfo,
}) => {
  const [form] = Form.useForm();
  const [selectId, setSelectId] = useState("");
  const handleSelect = (value, node, extra) => {
    setSelectId(value);
  };

  useEffect(() => {
    if (diseaseId) {
      form.setFieldsValue({
        ...diseaseId,
        PARENT_ID: diseaseId.NAME,
      });
    } else {
      form.resetFields();
    }
  }, [diseaseId, form]);

  const handleOk = () => {
    const newData = {
      ...form.getFieldValue(),
      PARENT_ID:
        showInfo.PARENT_ID === selectId
          ? showInfo.PARENT_ID
          : selectId
          ? selectId
          : 0,
    };
    const { DESC, CD, NAME } = newData;

    if (DESC.trim() === "" || CD.trim() === "" || NAME.trim() === "") {
      return;
    }
    if (diseaseId) {
      return handleUpdateDisease(newData);
    }
    handleCreateDisease(newData);
  };

  const handleCreateDisease = async (data) => {
    onOk(data, () => handleCancel());
  };

  const handleUpdateDisease = async (data) => {
    onUpdate(data, disId, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setDisId(undefined);
    setShowInfo(undefined);
  };

  const handleClear = () => {
    setSelectId(null);
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
              allowDrop={false}
              showSearch
              onSelect={handleSelect}
              filterTreeNode={(input, item) =>
                (item?.title ?? "")
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              allowClear
              placeholder={i18n.t("setting.diseases.chooselistParent")}
              onClear={handleClear}
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

export default ModalDisease;
