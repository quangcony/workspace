import { Input, Modal, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { useRole } from "../../../hooks/role";

const { Option } = Select;

const ModalAssignRole = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  selectedRoles,
  app = {},
}) => {
  const { roles } = useRole();
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);
  const [form] = Form.useForm();

  const handleOk = () => {
    const ordArr = [...selectedRoles.map((role) => role.id)];
    const { role_ids } = form.getFieldValue();
    const { newSelectedIds, newRemovedIds } = handleChangeSelectbox(
      ordArr,
      role_ids
    );

    onOk(app.id, newSelectedIds, newRemovedIds, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    //form.resetFields();
  };

  useEffect(() => {
    const temp = [...selectedRoles.map((role) => role.id)];
    form.setFieldsValue({
      role_ids: temp,
    });
    //setSelectedRoleIds(temp);
  }, [selectedRoles, form]);

  const handleChangeSelectbox = (prevArr, newArr) => {
    let newSelectedIds = [];
    let newRemovedIds = [];
    newArr.forEach((element) => {
      if (!prevArr.includes(element)) {
        newSelectedIds.push(element);
      }
    });
    prevArr.forEach((element) => {
      if (!newArr.includes(element)) {
        newRemovedIds.push(element);
      }
    });
    return {
      newSelectedIds,
      newRemovedIds,
    };
  };

  return (
    <>
      <Modal
        title={`${title} to app ${app.NAME}`}
        visible={isOpen}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{
            span: 5,
          }}
          wrpermissionerCol={{
            span: 19,
          }}
        >
          <Form.Item label="Roles" name="role_ids">
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              onChange={(list) => setSelectedRoleIds(list)}
              value={selectedRoleIds}
            >
              {roles &&
                roles.length > 0 &&
                roles.map((role) => (
                  <Option value={role.id} key={role.id}>
                    {role.NAME}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAssignRole;
