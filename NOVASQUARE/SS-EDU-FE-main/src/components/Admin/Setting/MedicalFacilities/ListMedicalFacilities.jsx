import { Button, Space, Table, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import { useEffect, useState } from "react";
import i18n from "../../../../lib/Language";
import { TblPagination } from "../../../../common";
const ListMedicalFacilities = (props) => {
  const {
    medicalFacilities,
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
    if (medicalFacilities && medicalFacilities.length > 0) {
      if (countryIdSelect) {
        const list = medicalFacilities.filter(
          (item) => item?.COUNTRY_ID === countryIdSelect
        );
        if (cityIdSelect) {
          const newData = list.filter((item) => item?.CITY_ID === cityIdSelect);
          if (districtIdSelect) {
            const data = newData.filter(
              (item) => item.DISTRICT_ID === districtIdSelect
            );
            setDataSource(data);
          } else setDataSource(newData);
        } else setDataSource(list);
      } else setDataSource(medicalFacilities);
    } else setDataSource([]);
  }, [medicalFacilities, countryIdSelect, cityIdSelect, districtIdSelect]);

  const handleDelete = async (id) => {
    await onDelete(id);
  };
  const { confirm } = useConfirmDelete(
    handleDelete,
    `${i18n.t("general.mesDelete")}`
  );
  const columns = [
    {
      title: i18n.t("setting.id"),
      dataIndex: "id",
      width: "5%",
    },
    // {
    //   title: i18n.t("setting.medicalFacilities.mdcModal_cd"),
    //   dataIndex: "MODEL_CD",
    // },
    // {
    //   title: i18n.t("setting.medicalFacilities.mdcArea_cd"),
    //   dataIndex: "AREA_CD",
    // },
    // {
    //   title: i18n.t("setting.medicalFacilities.mdcType_cd"),
    //   dataIndex: "TYPE_CD",
    // },
    // {
    //   title: i18n.t("setting.medicalFacilities.mdcLevel_cd"),
    //   dataIndex: "LEVEL_CD",
    // },
    // {
    //   title: i18n.t("setting.medicalFacilities.mdcSocial_cd"),
    //   dataIndex: "SOCIAL_CD",
    // },
    {
      title: i18n.t("setting.medicalFacilities.mdcFacName"),
      dataIndex: "NAME",
      sorter: (a, b) => ("" + a.NAME).localeCompare(b.NAME),
    },
    {
      title: `${i18n.t("setting.desc")}`,
      dataIndex: "DESC",
      sorter: (a, b) => ("" + a.DESC).localeCompare(b.DESC),
    },
    {
      title: i18n.t("setting.medicalFacilities.mdcFacAddress"),
      dataIndex: "ADDRESS",
      sorter: (a, b) => ("" + a.ADDRESS).localeCompare(b.ADDRESS),
    },
    {
      title: i18n.t("setting.medicalFacilities.mdcFacPhone"),
      dataIndex: "PHONE",
      sorter: (a, b) => ("" + a.PHONE).localeCompare(b.PHONE),
    },
    {
      title: i18n.t("setting.medicalFacilities.mdcFacWebsite"),
      dataIndex: "WEBSITE",
      sorter: (a, b) => ("" + a.WEBSITE).localeCompare(b.WEBSITE),
    },
    {
      title: i18n.t("setting.medicalFacilities.mdcInsurance"),
      dataIndex: "",
      render: (record) => {
        return (
          <p>
            {record.DIRECT_INSURANCE === false
              ? `${i18n.t("setting.medicalFacilities.mdcNo")}`
              : `${i18n.t("setting.medicalFacilities.mdcYes")}`}
          </p>
        );
      },
    },
    {
      title: `${i18n.t("setting.note")}`,
      dataIndex: "NOTE",
      sorter: (a, b) => ("" + a.DESC).localeCompare(b.DESC),
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

export default ListMedicalFacilities;
