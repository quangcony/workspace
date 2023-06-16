import { Input, Modal, Form } from "antd";
import { useEffect } from "react";

const ModalSendEmail = ({
  title = "",
  isOpen,
  onCancel,
  loading,
  profile,
  allEmailSelect
}) => {
  const [form] = Form.useForm();
  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
  handleCancel()
  };


  return (
    <>
      <Modal
        title={`${title} send to `}
        visible={isOpen}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
        width={700}
      >
        <Form
          form={form}
          name="basic"
        >
          <p><span style={{fontWeight: "bold"}}>From</span>: {profile.EMAIL}</p>
          <p style={{marginBottom: 0,fontWeight: "bold"}}>To:</p>
          <div style={{maxHeight: 150, overflowX: "hidden"}}>
              {allEmailSelect && allEmailSelect.length > 0 && 
              allEmailSelect.map(item=> (
                <span key={item.id}> {item.EMAIL}{";"} </span>
              ))
              }
          </div>
          <Form.Item name="DESC" label="Desctiption" 
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems:"flex-start",
              fontWeight: "bold"
            }}
          >
            <Input.TextArea showCount maxLength={1000} 
            style={{width: 650, height: 200}}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalSendEmail;
