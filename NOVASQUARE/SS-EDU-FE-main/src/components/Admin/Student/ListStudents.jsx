import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";

const ListStudents = ({
  students,
  isLoading,
  onDelete,
  openEdit,
  isDisplayEditBtn,
  isDisplayDeleteBtn,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "5%",
      sorter: (a, b) => a.id - b.id,
      fixed: "left"
    },
    {
      title: "ID User",
      width: "5%",
      sorter: (a, b) => a.id - b.id,
      fixed: "left",
      render: (_,record)=>(
        <p>{record.Users?.id}</p>
      )
    },
    {
        title: "Avatar",
        
        width: "5%",
        sorter: (a, b) => a.NAME - b.NAME,
        render: (_,record)=>(
          <img src={record.Users?.AVATAR} alt="avatar"/>
        )
      },
    {
      title: "Họ",
      width: "10%",
      sorter: (a, b) => a.NAME - b.NAME,
      render: (_,record)=>(
        <p>{record.Users?.FIRST_NAME}</p>
      )
    },
    {
        title: "Tên",
        
        width: "5%",
        sorter: (a, b) => a.NAME - b.NAME,
        render: (_,record)=>(
          <p>{record.Users?.LAST_NAME}</p>
        )
      },
      {
        title: "Giới tính",
        width: "5%",
        sorter: (a, b) => a.id - b.id,
        render: (_,record)=>(
          <p>{record.Users.Gender?.NAME}</p>
        )
      },
      {
        title: "SĐT",
        width: "8%",
        sorter: (a, b) => a.id - b.id,
        render: (_,record)=>(
          <p>{record.Users?.PRIMARY_PHONE}</p>
        )
      },
      {
        title: "Email",
        width: "12%",
        sorter: (a, b) => a.id - b.id,
        render: (_,record)=>(
          <p>{record.Users?.EMAIL}</p>
        )
      },
    {
      title: "Lớp",
      dataIndex: "SCHOOL_CLASS_NAME",
      width: "10%",
      sorter: (a, b) => a.SCHOOL_CLASS_NAME - b.SCHOOL_CLASS_NAME,

    },
    
    {
      title: "Trình độ",
      dataIndex: "ACADEMIC_LEVEL",
      width: "10%",
      sorter: (a, b) => a.ACADEMIC_LEVEL - b.ACADEMIC_LEVEL,
    },
    {
      title: "Nơi học",
      width: "5%",
      render: (_,record)=>(
        <p>{record.Workplace?.BRANCH_NAME}</p>),
      sorter: (a, b) => a.BRANCH_NAME - b.BRANCH_NAME,
    },
    {
        title: "Trường",
        width: "15%",
        sorter: (a, b) => a.NAME - b.NAME,
        render: (_,record)=>(
          <p>{record.School?.NAME}</p>
        )
      },
    {
      title: "Action",
      dataIndex: "operation",
      fixed: "right",
      width: '5%',
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
    "Are you sure delete this student?"
  );

  return (
    <>
      <Table
        dataSource={students}
        columns={columns}
            loading={isLoading}
            scroll={{ x: 2000 }}
            rowClassName="editable-row"
            className={"table-response antd-tbl"}
            pagination={
                {
                    defaultPageSize: 20,
                    defaultCurrent: 1,
                    hideOnSinglePage: true,
                    pageSizeOptions: [10, 20, 50],
                }}
      />
    </>
  );
};

export default ListStudents;
