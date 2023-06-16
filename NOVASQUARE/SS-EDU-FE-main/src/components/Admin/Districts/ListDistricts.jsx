import { Button, Space, Table, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { useEffect, useState } from "react";
import i18n from "../../../lib/Language";

const ListDistricts = (props) => {
    const { districts, cities, openEdit, onDelete, isDisplayEditBtn, isDisplayDeleteBtn,
        isLoading, countryIdSelect, cityIdSelect } = props

    // console.log(cityIdSelect);
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        if (districts && districts.length > 0) {
            if (countryIdSelect) {
                const list = districts.filter(district => district?.City?.Country?.id === countryIdSelect);
                if (cityIdSelect) {
                    const newData = list.filter(item => item?.CITY_ID === cityIdSelect);
                    setDataSource(newData);
                } else setDataSource(list)
            } else { setDataSource(districts) }
        } else { setDataSource([]) }
    }, [districts, cityIdSelect, countryIdSelect, cities]);

    const handleDelete = async (id) => {
        await onDelete(id);
    };
    const { confirm } = useConfirmDelete(
        handleDelete,
        `${i18n.t("general.mesDelete")}`
    );
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            width: "5%",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: `${i18n.t("setting.district.code")}`,
            dataIndex: 'CD',
            width: "15%",
            sorter: (a, b) => ('' + a.CD).localeCompare(b.CD),
        },
        {
            title: `${i18n.t("setting.district.name")}`,
            dataIndex: 'NAME',
            width: "15%",
            sorter: (a, b) => ('' + a.NAME).localeCompare(b.NAME),
        },
        {
            title: `${i18n.t("setting.desc")}`,
            width: "15%",
            dataIndex: 'DESC',
            sorter: (a, b) => ('' + a.DESC).localeCompare(b.DESC),
        },
        {
            title: `${i18n.t("setting.note")}`,
            width: "20%",
            dataIndex: 'NOTE',
            sorter: (a, b) => ('' + a.NOTE).localeCompare(b.NOTE),
        },
        {
            title: `${i18n.t("setting.district.city")}`,
            width: "15%",
            render: (_, record) => (
                <Typography.Paragraph>{record.City.NAME}</Typography.Paragraph>
            ),
            sorter: (a, b) => ('' + a.City.NAME).localeCompare(b.City.NAME),
        },
        {
            title: `${i18n.t("setting.action")}`,
            fixed: "right",
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
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowClassName="editable-row"
                loading={isLoading}
                className={"table-response"}
                pagination={
                    {
                        defaultPageSize: 20,
                        defaultCurrent: 1,
                        // hideOnSinglePage: true,
                        showSizeChanger: true,
                        pageSizeOptions: [10, 20, 50, 100],
                    }
                }
            />
        </>
    )
}

export default ListDistricts