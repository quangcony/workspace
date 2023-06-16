import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useEmployeeBank } from '../../../hooks/employeeBank'
import i18n from '../../../lib/Language'
import ModalEmployeeBank from './ModalEmployeeBank'
import ListEmployeeBanks from './ModalEmployeeBank/ListEmployeeBanks'
import { useStyles } from './style'

const BankInfo = ({ userId, isOpen }) => {
    const {
        employeeBanks,
        employeeBank,
        getEmployeeBank,
        createEmployeeBank,
        updateEmployeeBank,
        deleteEmployeeBank,
        setEmployeeBank,
        isLoading,
    } = useEmployeeBank();

    const [isShow, setIsShow] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [employeeBankId, setEmployeeBankId] = useState(undefined);

    useEffect(() => {
        if (isOpen) { setIsShow(false) }
        if (employeeBank) { setEmployeeBankId(employeeBank?.id) }
    }, [employeeBank, isOpen]);

    const handleCreateEmployeeBank = async (employeeBank, appId, callback) => {
        await createEmployeeBank(employeeBank, appId, callback);
        setIsOpenModal(false);
        setEmployeeBankId(undefined);
    };
    const handleUpdateEmployeeBank = async (employeeBank, id, callback) => {
        await updateEmployeeBank(employeeBank, id, callback);
    };
    const handleOpenUpdate = async (id) => {
        await getEmployeeBank(id, () => setIsOpenModal(true));
    };
    const handleDelete = async (id) => {
        await deleteEmployeeBank(id);
    };
    const handleOpenModal = () => {
        setIsOpenModal(true);
        setEmployeeBank(undefined);
    };
    const handleCancel = () => {
        setIsOpenModal(false);
        setEmployeeBankId(undefined);
    };

    return (
        <>
            <Card
                title={
                    <Space>
                        {isShow
                            ? <CaretUpOutlined onClick={() => setIsShow(false)} style={useStyles.iconStyles} />
                            : <CaretDownOutlined onClick={() => setIsShow(true)} style={useStyles.iconStyles} />}
                        <Typography.Title style={useStyles.titleStyles}>{i18n.t("hr.bank.bank_info")}</Typography.Title>
                    </Space>
                }
                headStyle={useStyles.headStyles}
                bodyStyle={{
                    opacity: isShow ? 1 : 0,
                    visibility: isShow ? 'visible' : 'hidden',
                    height: isShow ? '' : 0,
                    transition: '0.3s',
                    padding: isShow ? '24px 24px 0' : 0,
                }}
                className='card-header'
            >
                <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        type='primary'
                        onClick={handleOpenModal}
                        disabled={userId ? false : true}
                        icon={<PlusOutlined />}
                    />
                </Space>
                <div style={{ padding: 8 }}></div>
                <ListEmployeeBanks
                    userId={userId}
                    isLoading={isLoading}
                    onDelete={handleDelete}
                    openEdit={handleOpenUpdate}
                    employeeBanks={employeeBanks}
                />
            </Card>
            <ModalEmployeeBank
                title={employeeBank
                    ? i18n.t("hr.bank.mdlTitleUp")
                    : i18n.t("hr.bank.mdlTitleCre")
                }
                isOpen={isOpenModal}
                userId={userId}
                employeeBank={employeeBank}
                employeeBankId={employeeBankId}
                setEmployeeBankId={setEmployeeBankId}
                onCancel={handleCancel}
                onUpdate={handleUpdateEmployeeBank}
                onOk={handleCreateEmployeeBank}
                loading={isLoading}
            />
        </>
    )
}

export default BankInfo