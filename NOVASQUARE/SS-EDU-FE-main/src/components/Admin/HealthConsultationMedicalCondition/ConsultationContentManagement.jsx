import { Button, Col, DatePicker, Form, Row, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { formatDate, getLeafNodes } from '../../../common';
import { diseaseOptionsState } from '../../../recoil/atom/diseaseState';
import ConsultationList from './ConsultationList';
import DiseaseListSelect from './DiseaseListSelect';

const checkFilterList = (a, b) => a ? a : b;

const ConsultationContentManagement = (props) => {
    const { onKeyChange, isCreateBtn, isUpdateBtn, activeKey, isLoading } = props;
    const [form] = Form.useForm();
    const consultationInput = Form.useWatch('CONSULTATION_INPUT', form);

    const treeData = useRecoilValue(diseaseOptionsState);

    const [diseaseList, setDiseaseList] = useState([]);
    const [leafNodes, setLeafNodes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState();

    useEffect(() => {
        setLoading(true);
        (() => {
            const data = getLeafNodes(treeData);
            setLeafNodes(data);
            setLoading(false);
        })();
    }, [treeData, activeKey]);

    const handleSearch = () => {
        const input = { ...form.getFieldsValue() };

        if (
            input?.CONSULTATION_CREATE_DATE?.length ||
            input?.CONSULTATION_CHANGE_DATE?.length ||
            input.CONSULTATION_INPUT ||
            input.DISPLAY_SHOW ||
            diseaseList.length > 0
        ) {
            let newData = undefined;
            if (diseaseList.length) {
                let nodes = checkFilterList(newData, leafNodes);
                let tempData = diseaseList.map(id =>
                    nodes.filter(node => node.id === id)[0]
                )
                const data = tempData.filter((element) => {
                    return element !== undefined;
                });
                newData = [...data];
            }
            if (input.CONSULTATION_INPUT) {
                let tempData;
                // All
                if (input.CONSULTATION_INPUT === "1") {
                    tempData = checkFilterList(newData, leafNodes);
                }
                // Consulted
                else if (input.CONSULTATION_INPUT === "2") {
                    tempData = checkFilterList(newData, leafNodes)
                        .filter(node => node?.Medical_Consultation_Diseases?.length !== 0);
                }
                // Not consulted
                else {
                    tempData = checkFilterList(newData, leafNodes)
                        .filter(node => node?.Medical_Consultation_Diseases?.length === 0);
                }
                newData = [...tempData];
            }
            if (input.DISPLAY_SHOW) {
                let tempData;
                // All
                if (input.DISPLAY_SHOW === "1") {
                    tempData = checkFilterList(newData, leafNodes);
                }
                // Show
                else if (input.DISPLAY_SHOW === "2") {
                    tempData = checkFilterList(newData, leafNodes)
                        .filter(node => node?.Medical_Consultation_Diseases?.length !== 0)
                        .filter(item => item?.Medical_Consultation_Diseases[0]
                            ?.Medical_Consultation?.DISPLAY_STATUS === 1);
                }
                // Not show
                else {
                    if (input.CONSULTATION_INPUT === "2") {
                        tempData = checkFilterList(newData, leafNodes)
                            .filter(node => node?.Medical_Consultation_Diseases?.length !== 0)
                            .filter(item => item?.Medical_Consultation_Diseases[0]
                                ?.Medical_Consultation?.DISPLAY_STATUS === 0);
                    } else {
                        const list1 = checkFilterList(newData, leafNodes)
                            .filter(node => node?.Medical_Consultation_Diseases?.length === 0);
                        const list2 = checkFilterList(newData, leafNodes)
                            .filter(node => node?.Medical_Consultation_Diseases?.length !== 0)
                            .filter(item => item?.Medical_Consultation_Diseases[0]
                                ?.Medical_Consultation?.DISPLAY_STATUS === 0);

                        tempData = [...list1, ...list2];
                    }
                }
                newData = [...tempData];
            }
            if (input.CONSULTATION_CREATE_DATE) {
                let tempData = checkFilterList(newData, leafNodes)
                    .filter(node => node?.Medical_Consultation_Diseases?.length !== 0)
                    .filter(item => {
                        return new Date(item?.Medical_Consultation_Diseases[0]?.CREATED_DATE)
                            >= new Date(input.CONSULTATION_CREATE_DATE[0].format("MM/DD/YYYY 00:00:00"))
                            && new Date(item?.Medical_Consultation_Diseases[0]?.CREATED_DATE)
                            <= new Date(input.CONSULTATION_CREATE_DATE[1].format("MM/DD/YYYY 23:59:59"))
                    });
                newData = [...tempData];
            }
            if (input.CONSULTATION_CHANGE_DATE) {
                let tempData = checkFilterList(newData, leafNodes)
                    .filter(node => node?.Medical_Consultation_Diseases?.length !== 0)
                    .filter(item =>
                        new Date(item?.Medical_Consultation_Diseases[0]?.MODIFIED_DATE)
                        >= new Date(input.CONSULTATION_CHANGE_DATE[0].format("MM/DD/YYYY 00:00:00"))
                        && new Date(item?.Medical_Consultation_Diseases[0]?.MODIFIED_DATE)
                        <= new Date(input.CONSULTATION_CHANGE_DATE[1].format("MM/DD/YYYY 23:59:59")));
                newData = [...tempData];
            }
            setDataSource(newData);
        } else setDataSource(leafNodes);
    }

    return (
        <Row gutter={[24, 16]} justify="center">
            <Col lg={2} sm={22} xs={22}>
                <Typography.Text>Bệnh lý</Typography.Text>
            </Col>
            <Col lg={{ span: 19, offset: 1 }} sm={22} xs={22}>
                <DiseaseListSelect
                    value={diseaseList}
                    setValue={setDiseaseList}
                    treeData={treeData}
                />
            </Col>
            <Col span={22}>
                <Form
                    form={form}
                    name='searchForm'
                    autoComplete='off'
                    scrollToFirstError
                    labelAlign="left"
                    layout='vertical'
                    onFinish={handleSearch}
                >
                    <Row gutter={[24, 0]}>
                        <Col lg={6} sm={12} xs={24}>
                            <Form.Item
                                name="CONSULTATION_INPUT"
                                label="Nhập tư vấn"
                                initialValue="1"
                            >
                                <Select
                                    allowClear
                                    options={[
                                        {
                                            value: "1",
                                            label: "Tất cả",
                                        },
                                        {
                                            value: "2",
                                            label: "Đã nhập tư vấn",
                                        },
                                        {
                                            value: "3",
                                            label: "Chưa nhập tư vấn",
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={6} sm={12} xs={24}>
                            <Form.Item
                                name="DISPLAY_SHOW"
                                label="Hiển thị"
                                initialValue="1"
                            >
                                <Select
                                    allowClear
                                    disabled={consultationInput === '3'}
                                    options={[
                                        {
                                            value: "1",
                                            label: "Tất cả",
                                        },
                                        {
                                            value: "2",
                                            label: "Đã hiển thị",
                                        },
                                        {
                                            value: "3",
                                            label: "Chưa hiển thị",
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={6} sm={12} xs={24}>
                            <Form.Item
                                name="CONSULTATION_CREATE_DATE"
                                label="Ngày nhập tư vấn"
                            >
                                <DatePicker.RangePicker
                                    style={{ width: '100%' }}
                                    format={formatDate.Type}
                                    disabledDate={(current) => current > new Date()}
                                    disabled={consultationInput === '3'}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={6} sm={12} xs={24}>
                            <Form.Item
                                name="CONSULTATION_CHANGE_DATE"
                                label="Ngày sửa tư vấn"
                            >
                                <DatePicker.RangePicker
                                    style={{ width: '100%' }}
                                    format={formatDate.Type}
                                    disabledDate={(current) => current > new Date()}
                                    disabled={consultationInput === '3'}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <Button
                                type='primary'
                                htmlType='submit'
                            >
                                Tìm Kiếm
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col span={22}>
                <ConsultationList
                    dataSource={dataSource ?? leafNodes}
                    onKeyChange={onKeyChange}
                    loading={isLoading || loading}
                    isCreateBtn={isCreateBtn}
                    isUpdateBtn={isUpdateBtn}
                />
            </Col>
        </Row>
    )
}

export default ConsultationContentManagement
