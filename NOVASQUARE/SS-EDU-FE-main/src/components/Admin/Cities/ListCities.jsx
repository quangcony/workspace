import { Button, Space, Table, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { useEffect, useState } from "react";
import i18n from "../../../lib/Language";

const ListCities = (props) => {
    const { onDelete, openEdit, isLoading, cities, isDisplayEditBtn, isDisplayDeleteBtn, countryIdSelect } = props;

    const [cityData, setCityData] = useState([]);
    useEffect(() => {
        if (cities && cities.length > 0) {
            if (countryIdSelect) {
                const newData = cities.filter(city => city?.COUNTRY_ID === countryIdSelect);
                setCityData(newData);
            } else { setCityData(cities) }
        } else {
            setCityData([]);
        }
    }, [cities, countryIdSelect]);

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
            title: `${i18n.t("setting.city.code")}`,
            dataIndex: 'CD',
            width: "15%",
            sorter: (a, b) => ('' + a.CD).localeCompare(b.CD),
        },
        {
            title: `${i18n.t("setting.city.name")}`,
            dataIndex: 'NAME',
            width: "15%",
            sorter: (a, b) => ('' + a.NAME).localeCompare(b.NAME),
        },
        {
            title: `${i18n.t("setting.desc")}`,
            width: "20%",
            dataIndex: 'DESC',
            sorter: (a, b) => ('' + a.DESC).localeCompare(b.DESC),
        },
        {
            title: `${i18n.t("setting.note")}`,
            width: "20%",
            dataIndex: 'NOTE',
            sorter: (a, b) => ('' + a.DESC).localeCompare(b.DESC),
        },
        {
            title: `${i18n.t("setting.city.country")}`,
            width: "15%",
            render: (_, record) => (
                <Typography.Paragraph>{record?.Country?.NAME}</Typography.Paragraph>
            ),
            sorter: (a, b) => ('' + a?.Country?.NAME).localeCompare(b?.Country?.NAME),
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
                dataSource={cityData}
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

export default ListCities