import { Button, Modal, Progress } from "antd";
import React from "react";

const MutationCalcu = ({
  title = "",
  isOpen,
  onCancel,
  length,
  userGenerated,
  userList,
  loading,
  noCount,
}) => {
  console.log("length", length);
  return (
    <>
      <Modal
        title={title}
        visible={isOpen}
        onCancel={onCancel}
        footer={[
          <Button
            form="myForm"
            key="submit"
            htmlType="submit"
            type="primary"
            disabled={length < 100}
            onClick={onCancel}
            loading={loading}
          >
            FINISH
          </Button>,
        ]}
      >
        <Progress
          percent={length}
          status={length < 100 ? "active" : "success"}
        />

        <div>
          {userGenerated + noCount} / {userList}
        </div>
        <div>Chi tiết</div>
        <div>Đã tính: {userGenerated} </div>
        <div>Không tính: {noCount}</div>
      </Modal>
    </>
  );
};

export default MutationCalcu;
