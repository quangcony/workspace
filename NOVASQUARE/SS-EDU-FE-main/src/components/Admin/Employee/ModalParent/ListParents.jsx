import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Avatar, Button, Image, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import useConfirmDelete from '../../../../hooks/useConfirmDelete'
import i18n from '../../../../lib/Language'
import { TblPagination } from "../../../../common";
const ListParents = ({ isLoading, onDelete, openEdit, parents, userId }) => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (parents && parents.length > 0) {
            const data = parents.filter(item => item.USER_ID === userId)
            setDataSource(data);
        } else setDataSource([]);
    }, [parents, userId])

    const handleDelete = async (id) => {
        await onDelete(id);
    };
    const { confirm } = useConfirmDelete(
        handleDelete,
        `${i18n.t("general.mesDelete")}`
    );

    const columns = [
        {
            title: `${i18n.t("hr.id")}`,
            width: 120,
            render: (_, record) => (
                <>{record?.Parent_Id?.id}</>
            ),
            sorter: (a, b) => a?.Parent_Id?.id - b?.Parent_Id?.id,
        },
        {
            title: `${i18n.t("hr.avatar")}`,
            width: 75,
            render: (_, record) => (
                <Avatar src={<Image src={record?.Parent_Id?.AVATAR} style={{ width: 32 }} />} />
            )
        },
        {
            title: `${i18n.t("hr.f_name")}`,
            render: (_, record) => (
                <>{record?.Parent_Id?.FIRST_NAME}</>
            ),
            sorter: (a, b) => ('' + a?.Parent_Id?.FIRST_NAME).localeCompare(b?.Parent_Id?.FIRST_NAME),
        },
        {
            title: `${i18n.t("hr.l_name")}`,
            render: (_, record) => (
                <>{record?.Parent_Id?.LAST_NAME}</>
            ),
            sorter: (a, b) => ('' + a?.Parent_Id?.LAST_NAME).localeCompare(b?.Parent_Id?.LAST_NAME),
        },
        {
            title: `${i18n.t("hr.family.relationship")}`,
            render: (_, record) => (
                <>{record?.User_Relationship?.NAME}</>
            ),
            sorter: (a, b) => ('' + a?.User_Relationship?.NAME).localeCompare(b?.User_Relationship?.NAME),
        },
        {
            title: `${i18n.t("hr.email")}`,
            width: 250,
            render: (_, record) => (
                <>{record?.Parent_Id?.EMAIL}</>
            ),
        },
        {
            title: `${i18n.t("hr.p_phone")}`,
            render: (_, record) => (
                <>{record?.Parent_Id?.PRIMARY_PHONE}</>
            ),
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
                            onClick={() => openEdit(record.id, record.PARENT_ID)}
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

export default ListParents