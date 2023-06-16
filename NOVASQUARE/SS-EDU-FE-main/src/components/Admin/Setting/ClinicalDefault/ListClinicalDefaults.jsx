import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import { TblPagination } from "../../../../common";
const ListClinicalDefaults = ({
  clinicaldefaults,
  isLoading,
  onDelete,
  openEdit,
  isDisplayEditBtn,
  isDisplayDeleteBtn,
  medicals
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "5%",
      sorter: (a, b) => a.id - b.id,
      fixed: 'left',
    },
    {
      title: "Name",
      
      width: "25%",
      sorter: (a, b) => a.NAME - b.NAME,
      fixed: 'left',
      render: (_,record)=>(
        <p>{record.Medical_Disease?.NAME}</p>
      )

    },
    {
      title: "Data type",
      dataIndex: "DATA_TYPE",
      width: "15%",
      sorter: (a, b) => a.DATA_TYPE - b.DATA_TYPE,
      fixed: 'left',

    },
    
    {
      title: "Min",
      dataIndex: "MIN_VERIFY",
      width: "5%",
      sorter: (a, b) => a.MIN_VERIFY.length - b.MIN_VERIFY.length,
    },
    {
      title: "Max",
      dataIndex: "MAX_VERIFY",
      width: "5%",
      sorter: (a, b) => a.MAX_VERIFY.length - b.MAX_VERIFY.length,
    },
    {
        title: "Help",
        dataIndex: "INFO_HELP",
        width: "25%",
        sorter: (a, b) => a.INFO_HELP.length - b.INFO_HELP.length,
      },
      {
        title: "NOTE",
        dataIndex: "NOTE",
        width: "15%",
        sorter: (a, b) => a.NOTE.length - b.NOTE.length,
      },
    {
      title: "Action",
      dataIndex: "operation",
      fixed: "right",
      width: '10%',
      render: (_, record) => (
        <>
          <Space size="middle">
            <Button
              disabled={!isDisplayEditBtn}
              type="primary"
              icon={<EditOutlined />}
              className={"btn-warning"}
              onClick={() => openEdit(record.id)}
            />
            <Button
              disabled={!isDisplayDeleteBtn}
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

  const handleDelete = async (id) => {
    await onDelete(id);
  };

  const { confirm } = useConfirmDelete(
    handleDelete,
    "Are you sure delete this clinical default?"
  );

  return (
    <>
      <Table pagination={TblPagination}
        dataSource={clinicaldefaults}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListClinicalDefaults;
