import { Button, Input, Modal, Radio, Select, Upload, Image, Spin, Progress } from 'antd';
import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useJwt } from '../../../hooks/jwt';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useSnackbar } from "notistack";

const { Option } = Select;



const MutationTool = ({ title = "", isOpen, onOk, onCancel, length, userGenerated, userList, loading }) => {

    const handleGeneratePassword = async () => {
        await onOk()

    }

    console.log('count ',userGenerated)

    return (
        <>
            <Modal
                title={title}
                visible={isOpen}
                onCancel={onCancel}
                onOk={handleGeneratePassword}
                footer={[
                    <Button form="myForm" type="second" onClick={onCancel}>
                        Cancel
                    </Button>,

                    <Button
                        form="myForm"
                        key="submit"
                        htmlType="submit"
                        type="primary"
                        disabled={length ==  100}
                        onClick={handleGeneratePassword}
                        loading={loading}
                    >
                        OK
                    </Button>,
                ]}
            >
                <Progress percent={length} status={length < 100 ? "active" : "success"} />
                <div>{userGenerated} / {userList}</div>
            </Modal>
        </>
    );
}

export default MutationTool