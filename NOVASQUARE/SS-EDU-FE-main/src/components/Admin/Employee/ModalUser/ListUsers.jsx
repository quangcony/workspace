import { SelectOutlined } from '@ant-design/icons'
import { Avatar, Button, Image, Space, Table, Tooltip, Typography } from 'antd'
import { useState, useEffect } from 'react'
import i18n from '../../../../lib/Language';
import { TblPagination, TblStyles, formatDate } from "../../../../common";
import moment from "moment";

const ListUsers = ({ users, loading, onGetUser }) => {
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        if (users && users.length > 0) {
            // const newData = users.reverse()
            // setDataSource(newData);
            setDataSource(users);
        } else setDataSource([])
    }, [users]);

    const columns = [
        {
            title: `${i18n.t("hr.id")}`,
            dataIndex: "id",
            width: 100,
            sorter: (a, b) => a.id - b.id,
            fixed: 'left',
        },
        {
            title: `${i18n.t("hr.avatar")}`,
            width: 75,
            render: (_, record) => (
                <Avatar src={<Image src={record?.AVATAR} style={{ width: 32 }} />} />
            )
        },
        {
            title: `${i18n.t("hr.f_name")}`,
            dataIndex: "FIRST_NAME",
            width: 150,
            sorter: (a, b) => ('' + a.FIRST_NAME).localeCompare(b.FIRST_NAME),
        },
        {
            title: `${i18n.t("hr.l_name")}`,
            dataIndex: "LAST_NAME",
            width: 130,
            sorter: (a, b) => ('' + a.LAST_NAME).localeCompare(b.LAST_NAME),
        },
        {
            title: `${i18n.t("hr.gender")}`,
            width: 120,
            render: (_, record) => (<> {record?.Gender?.NAME} </>),
            sorter: (a, b) => ('' + a.GENDER).localeCompare(b.GENDER),
        },
        {
            title: `${i18n.t("hr.birth")}`,
            width: 150,
            render: (_, record) => (
                <Typography.Text>{record.BOD ? moment(record.User?.BOD).format(formatDate.Type) : null}</Typography.Text>
            )
        },
        {
            title: `${i18n.t("hr.place_of_birth")}`,
            dataIndex: "PLACE_OF_BIRTH",
        },
        {
            title: `${i18n.t("hr.indentity_card_no")}`,
            width: 200,
            dataIndex: "INDENTITY_CARD_NO",
        },
        {
            title: `${i18n.t("hr.email")}`,
            width: 250,
            dataIndex: "EMAIL",
        },
        {
            title: `${i18n.t("hr.p_phone")}`,
            width: 150,
            dataIndex: "PRIMARY_PHONE",
        },
        {
            title: `${i18n.t("hr.s_phone")}`,
            width: 150,
            dataIndex: "SECOND_PHONE",
        },
        {
            title: `${i18n.t("hr.action")}`,
            fixed: 'right',
            width: 120,
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Tooltip
                        title='Select'
                        color='rgba(0, 0, 0, 0.35)'
                        placement="left"
                    >
                        <Button
                            type='primary'
                            className={"btn-warning"}
                            icon={<SelectOutlined />}
                            loading={loading}
                            onClick={() => onGetUser(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ]
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 1800 }}
            className='antd-tbl'
            size='medium'
            pagination={TblPagination}
        />
    )
}

export default ListUsers