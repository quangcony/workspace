import { Input, Modal, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { usePermission } from "../../../hooks/permission";

const { Option } = Select;

const ModalAddPermission = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  selectedPermissions,
  setSelectedPermissions,
  module = {},
}) => {
  const { permissions } = usePermission();
  const [selectedPermissionIds, setSelectedPermissionIds] = useState([]);
  const [form] = Form.useForm();

  const handleOk = () => {
    const { permission_ids } = form.getFieldValue();
    const { newSelectedIds, newRemovedIds } = handleChangeSelectbox(
      selectedPermissions,
      permission_ids
    );
    onOk(module.id, permission_ids, newRemovedIds, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    //form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({
      permission_ids: selectedPermissions,
    });
    //setSelectedPermissionIds(selectedPermissions);
  }, [selectedPermissions, form]);

  // useEffect(() => {
  //   let newData = [];
  //   if (selectedPermissions && selectedPermissions.length > 0) {
  //     selectedPermissions.forEach((element) => {
  //       newData.push(element);
  //     });
  //   } else {
  //     setSelectedPermissionIds([]);
  //   }
  //   setSelectedPermissionIds(newData);
  // }, [selectedPermissions]);

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
        title={`${title} to module ${module.name}`}
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
          <Form.Item label="Permissions" name="permission_ids">
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
              onChange={(list) => setSelectedPermissionIds(list)}
              value={selectedPermissionIds}
            >
              {permissions &&
                permissions.length > 0 &&
                permissions.map((permission) => (
                  <Option value={permission.id} key={permission.id}>
                    {permission.NAME}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddPermission;
