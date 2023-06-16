import { Button, Input, Modal } from "antd";
import { Form } from "antd";
import { Option } from "antd/lib/mentions";
import moment from "moment/moment";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import useConfirmUpdate from "../../../hooks/useConfirmUpdate";
import ListHistory from "./ListHistory";

const ModalHistory = ({
  title = "",
  isOpen,
  onCancel,
  loading,
  investigationCases,
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { enqueueSnackbar } = useSnackbar();
  const handleCancel = () => {
    onCancel();
  };
  return (
    <>
      <Modal
        title='Quá trình sửa đổi dữ liệu'
        width='85%'
        style={{marginTop:"-90px"}}
        bodyStyle={{marginTop:"-20px"}}
        visible={isOpen}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <ListHistory
            investigationCase={investigationCases}
        />
      </Modal>
    </>
  );
};

export default ModalHistory
