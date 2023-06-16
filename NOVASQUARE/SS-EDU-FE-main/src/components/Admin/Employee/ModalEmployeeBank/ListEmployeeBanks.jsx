import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Space, Table } from 'antd'
import React, { useState, useEffect } from 'react'
import useConfirmDelete from '../../../../hooks/useConfirmDelete'
import i18n from '../../../../lib/Language'
import { TblPagination } from "../../../../common";

const ListEmployeeBanks = ({ isLoading, onDelete, openEdit, employeeBanks, userId }) => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (employeeBanks && employeeBanks.length > 0) {
            const data = employeeBanks.filter(item => item.USER_ID === userId)
            setDataSource(data);
        } else setDataSource([]);
    }, [employeeBanks, userId])

    const handleDelete = async (id) => {
        await onDelete(id);
    };
    const { confirm } = useConfirmDelete(
        handleDelete,
        `${i18n.t("general.mesDelete")}`
    );

    const columns = [
        {
            title: `${i18n.t("hr.bank.no")}`,
            width: 100,
            render: (_, record, index) => (index + 1),
            sorter: (a, b) => a - b,
        },
        {
            title: `${i18n.t("hr.bank.bank_num")}`,
            dataIndex: 'BANK_NUMBER',
            sorter: (a, b) => a.BANK_NUMBER - b.BANK_NUMBER,
        },
        {
            title: `${i18n.t("hr.bank.bank_cd")}`,
            dataIndex: 'BANK_CD',
            sorter: (a, b) => ('' + a.BANK_CD).localeCompare(b.BANK_CD),
        },
        {
            title: `${i18n.t("hr.bank.bank_name")}`,
            dataIndex: 'BANK_NAME',
            sorter: (a, b) => ('' + a.BANK_NAME).localeCompare(b.BANK_NAME),
        },
        {
            title: `${i18n.t("hr.note")}`,
            dataIndex: 'NOTE',
        },
        {
            title: `${i18n.t("hr.action")}`,
            width: 100,
            align: 'center',
            render: (_, record) => (
                <>
                    <Space size="middle">
                        <Button
                            // disabled={!isDisplayEditBtn}
                            type="primary"
                            icon={<EditOutlined />}
                            className={"btn-warning"}
                            onClick={() => openEdit(record.id)}
                        />
                        <Button
                            // disabled={!isDisplayDeleteBtn}
                            type="primary"
                            icon={<DeleteOutlined />}
                            className={"btn-danger"}
                            onClick={() => confirm(record.id)}
                        />
                    </Space>
                </>
            ),
        },
    ]
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowClassName="editable-row"
            className={"table-response antd-tbl"}
            loading={isLoading}
            pagination={TblPagination}
        />
    )
}

export default ListEmployeeBanks