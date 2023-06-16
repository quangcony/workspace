import { PlusSquareOutlined, SelectOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { TblPagination } from "../../../common"
import { diseaseSelectState } from '../../../recoil/atom/diseaseState'

const ConsultationList = ({ dataSource, onKeyChange, loading, isUpdateBtn }) => {
    const setDiseaseSelect = useSetRecoilState(diseaseSelectState);
    const [data, setData] = useState();

    useEffect(() => {
        const newData = dataSource.filter((item) => item?.Medical_Consultation_Diseases[0]?.MODIFIED_DATE);
        const rest = dataSource.filter((item) => !item?.Medical_Consultation_Diseases[0]?.MODIFIED_DATE);
        newData.sort((a, b) =>
            ('' + b?.Medical_Consultation_Diseases[0]?.MODIFIED_DATE)
                .localeCompare(a?.Medical_Consultation_Diseases[0]?.MODIFIED_DATE));
        setData([...newData, ...rest]);
    }, [dataSource]);

    const columns = [
        {
            title: "STT",
            width: 70,
            fixed: 'left',
            render: (_, record, index) => index + 1
        },
        {
            title: "Tên bệnh",
            dataIndex: "NAME",
            sorter: (a, b) => ('' + a?.NAME.trim()).localeCompare(b?.NAME.trim()),
        },
        {
            title: "Ngày nhập",
            width: 150,
            sorter: (a, b) => ('' + a?.Medical_Consultation_Diseases[0]?.CREATED_DATE)
                .localeCompare(b?.Medical_Consultation_Diseases[0]?.CREATED_DATE),
            render: (_, record) => {
                if (record?.Medical_Consultation_Diseases?.length === 0) {
                    return
                } else {
                    return new Date(record?.Medical_Consultation_Diseases[0]?.CREATED_DATE)
                        .toLocaleString("en-GB")
                }
            }
        },
        {
            title: "Ngày sửa",
            dataIndex: "CHANGE_DATE",
            width: 150,
            sorter: (a, b) => ('' + a?.Medical_Consultation_Diseases[0]?.MODIFIED_DATE)
                .localeCompare(b?.Medical_Consultation_Diseases[0]?.MODIFIED_DATE),
            render: (_, record) => {
                if (record?.Medical_Consultation_Diseases?.length === 0) {
                    return
                } else {
                    return new Date(record?.Medical_Consultation_Diseases[0]?.MODIFIED_DATE)
                        .toLocaleString("en-GB")
                }
            }
        },
        {
            title: "Nhập tư vấn",
            width: 200,
            render: (_, record) => {
                if (record?.Medical_Consultation_Diseases?.length === 0) {
                    return "Chưa nhập tư vấn"
                } else {
                    return "Đã nhập tư vấn"
                }
            },
            sorter: (a, b) => a?.Medical_Consultation_Diseases?.length - b?.Medical_Consultation_Diseases?.length,
        },
        {
            title: "Hiển thị",
            width: 150,
            render: (_, record) => {
                if (record?.Medical_Consultation_Diseases[0]?.Medical_Consultation?.DISPLAY_STATUS === 1) {
                    return "Đã hiển thị"
                } else {
                    return "Chưa hiển thị"
                }
            },
        },
        {
            title: "Chọn",
            fixed: 'right',
            width: 70,
            align: 'center',
            render: (_, record) => (
                <Button
                    type='primary'
                    className={record?.Medical_Consultation_Diseases?.length === 0 ? "" : "btn-warning"}
                    icon={record?.Medical_Consultation_Diseases?.length === 0
                        ? <PlusSquareOutlined />
                        : <SelectOutlined />
                    }
                    disabled={isUpdateBtn}
                    onClick={() => {
                        setDiseaseSelect(record);
                        onKeyChange("1");
                    }}
                />
            ),
        },
    ]
    return (
        <Table pagination={TblPagination}
            columns={columns}
            dataSource={data}
            className='antd-tbl'
            loading={loading}
        />
    )
}

export default React.memo(ConsultationList)