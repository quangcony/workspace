import { Button, Space, Table, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { useEffect, useState } from "react";
import i18n from "../../../lib/Language";
import { TblPagination } from "../../../common";
const ListWards = (props) => {
  const {
    wards,
    openEdit,
    onDelete,
    isDisplayEditBtn,
    isDisplayDeleteBtn,
    isLoading,
    countryIdSelect,
    cityIdSelect,
    districtIdSelect,
  } = props;

  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    if (wards && wards.length > 0) {
      if (countryIdSelect) {
        const list = wards.filter(
          (ward) => ward?.District?.City?.Country.id === countryIdSelect
        );
        if (cityIdSelect) {
          const newData = list.filter(
            (item) => item?.District?.City.id === cityIdSelect
          );
          if (districtIdSelect) {
            const data = newData.filter(
              (item) => item.DISTRICT_ID === districtIdSelect
            );
            setDataSource(data);
          } else setDataSource(newData);
        } else setDataSource(list);
      } else setDataSource(wards);
    } else setDataSource([]);
  }, [wards, countryIdSelect, cityIdSelect, districtIdSelect]);

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
      title: `${i18n.t("setting.ward.code")}`,
      dataIndex: "CD",
      width: "15%",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
    },
    {
      title: `${i18n.t("setting.ward.name")}`,
      dataIndex: "NAME",
      width: "15%",
      sorter: (a, b) => ("" + a.NAME).localeCompare(b.NAME),
    },
    {
      title: `${i18n.t("setting.desc")}`,
      width: "20%",
      dataIndex: "DESC",
      sorter: (a, b) => ("" + a.DESC).localeCompare(b.DESC),
    },
    {
      title: `${i18n.t("setting.note")}`,
      width: "15%",
      dataIndex: "NOTE",
      sorter: (a, b) => ("" + a.DESC).localeCompare(b.DESC),
    },
    {
      title: `${i18n.t("setting.ward.district")}`,
      width: "15%",
      render: (_, record) => (
        <Typography.Paragraph>{record.District?.NAME}</Typography.Paragraph>
      ),
      sorter: (a, b) => ("" + a.District?.NAME).localeCompare(b.District?.NAME),
    },
    {
      title: `${i18n.t("setting.district.city")}`,
      width: "15%",
      render: (_, record) => (
        <Typography.Paragraph>
          {record.District?.City?.NAME}
        </Typography.Paragraph>
      ),
      sorter: (a, b) =>
        ("" + a.District?.City?.NAME).localeCompare(b.District?.City?.NAME),
    },
    {
      title: `${i18n.t("setting.action")}`,
      fixed: "right",
      width: 100,
      align: "center",
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
  ];

  return (
    <>
      <Table pagination={TblPagination}
        dataSource={dataSource}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
        
      />
    </>
  );
};

export default ListWards;
