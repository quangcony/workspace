import { Avatar, Button,Image, Space, Table,Select } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const { Option } = Select;

const ListClass = ({
  users,
  isLoading,
  onDelete,
  openEdit,
  isDisplayEditBtn,
  isDisplayDeleteBtn,
}) => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const newData = [];
    if (users && users.length > 0) {
      users.forEach((user) => {
        const FULL_NAME = user.FIRST_NAME + " " + user.LAST_NAME;
        let roles = [];
        user.Roles.forEach((role) => {
          roles.push(role.NAME);
        });
        newData.push({
          ...user,
          FULL_NAME,
          roles: roles.join(", ").toString(),
        });
      });
      setUserData(newData);
    } else {
      setUserData([]);
    }
  }, [users]);

  const handleDelete = async (id) => {
    console.log("check id delete:", id);
    // await onDelete(id);
  };

  const { confirm } = useConfirmDelete(
    handleDelete,
    "Are you sure delete this user?"
  );
const [style, setStyle] = useState(null)
const [styleId, setStyleId] = useState(null)
  const handleChange = (id,e) => {
    setStyle(e.target.value)
    setStyleId(id)
  };


  const TotalUserData = userData.length
  
  const stylePresent = {
    border:'none',
    color: 'blue',
  }
  const stylePremission = {
    border:'none',
    color: 'green'
  }
  const styleNonPermission = {
    border:'none',
    color: 'red'
  }
  const styleNon = {
    border:'none',
    color: 'black'
  }
  
  const columns = [
    {
      title: "Mã học viên",
      dataIndex: "id",
    },
    {
      title: "Tên học viên",
      dataIndex: "FULL_NAME",
      width: "15%",
      key: "FULL_NAME",
      sorter: (a, b) => a.NAME - b.NAME,
      render: (_, record) => (
        <Space>
          <Avatar src={<Image src={record.AVATAR} style={{ width: 32 }} />} />{" "}
          <Link to={`/profile/${record.id}`} className="nav-link">
            {record.FULL_NAME}
          </Link>
        </Space>
      ),
    },
    {
      title: "Mã trường",
      dataIndex: "EMAIL",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Mã lớp học",
      dataIndex: "USER_NAME",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Điểm danh",
      dataIndex: "",
      render: (_,record)=>{
       
        return(
          
        <>
          <select  defaultValue="present"
          style={(style === "present" && record.id === styleId) ? stylePresent 
                  : ((style === "permission" && record.id === styleId) ? stylePremission 
                      : ((style === "non-permission" && record.id === styleId) ? styleNonPermission : styleNon))}
          onChange={(e)=>handleChange(record.id, e)}
          >
            <option value="present">Có mặt</option>
            <option value="permission">Vắng có phép</option>
            <option value="non-permission">Vắng không phép</option>
          </select>
        </>
        )
    }
    },
    {
      title: "Tình trạng",
      dataIndex: "roles",
    },
    {
      title: "Số vắng/Đi học",
      dataIndex: "roles",
      width: "7%",
      render: ()=>(
        <p>{0}/{TotalUserData}</p>
        )
    },
    {
      title: "Quản lý",
      dataIndex: "operation",
      fixed: "right",
      width: 100,
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
    <h5>List Student</h5>
      <Table
        columns={columns}
        dataSource={userData}
      />
    </>
  );
};

export default ListClass;
