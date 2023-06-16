import { Input, Modal, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/user";

const { Option } = Select;

const ModalAssignUser = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  selectedUsers,
  role = {},
}) => {
  const { users } = useUser();
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [form] = Form.useForm();

  const handleOk = () => {
    const ordArr = [...selectedUsers.map((role) => role.id)];
    const { user_ids } = form.getFieldValue();
    const { newSelectedIds, newRemovedIds } = handleChangeSelectbox(
      ordArr,
      user_ids
    );

    onOk(role.id, newSelectedIds, newRemovedIds, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    //form.resetFields();
  };

  useEffect(() => {
    const temp = [...selectedUsers.map((role) => role.id)];
    form.setFieldsValue({
      user_ids: temp,
    });
  }, [selectedUsers, form]);

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
        title={`${title} to role ${role.NAME}`}
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
          <Form.Item label="Users" name="user_ids">
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
              onChange={(list) => setSelectedUserIds(list)}
              value={selectedUserIds}
            >
              {users &&
                users.length > 0 &&
                users.map((user) => (
                  <Option value={user.id} key={user.id}>
                    {`${user.FIRST_NAME} ${user.LAST_NAME}`}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAssignUser;
