import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Space, Switch, Typography } from 'antd';
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import medicalConsultationApi from '../../../api/medicalConsultationApi';
import medicalConsultationDiseaseApi from '../../../api/medicalConsultationDiseaseApi';
import {
    diseaseIdSelectState,
    diseaseSelectState, diseasesWithoutConsultationState,
    medicalConsultationDiseaseState
} from '../../../recoil/atom/diseaseState';
import DiseaseListSelect from './DiseaseListSelect';
import HtmlEditor from './HtmlEditor';

const AddNewConsultationContent = (props) => {
    const { onKeyChange, isCreateBtn, isDeleteBtn, onGetAllDisease } = props;
    const { enqueueSnackbar } = useSnackbar();

    const [displayShow, setDisplayShow] = useState(false);
    const [htmlContent, setHtmlContent] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [diseaseIdList, setDiseaseIdList] = useRecoilState(diseaseIdSelectState);
    const [diseaseSelect, setDiesaseSelect] = useRecoilState(diseaseSelectState);
    const treeData = useRecoilValue(diseasesWithoutConsultationState);
    const diseaseList = useRecoilValue(medicalConsultationDiseaseState);

    useEffect(() => {
        if (diseaseSelect) {
            setDiseaseIdList([diseaseSelect.NAME]);
            if (diseaseSelect?.Medical_Consultation_Diseases?.length) {
                setHtmlContent(diseaseSelect?.Medical_Consultation_Diseases[0]?.Medical_Consultation?.CONTENT);
                diseaseSelect?.Medical_Consultation_Diseases[0]?.Medical_Consultation?.DISPLAY_STATUS === 1
                    ? setDisplayShow(true)
                    : setDisplayShow(false)
            } else {
                setHtmlContent(undefined);
                setDisplayShow(false);
            }
        }
    }, [diseaseSelect]);

    const onChange = (checked) => {
        setDisplayShow(checked);
    };

    const handleCreateMedicalConsultationDisease = async (data) => {
        try {
            let res = await medicalConsultationDiseaseApi.createMedicalConsultationDisease(data);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
                onGetAllDisease();
            }
        } catch (error) {
            enqueueSnackbar("Request failed !", { variant: "error" });
        }
    };
    const handleUpdateMedicalConsultation = async (data, id) => {
        try {
            let res = await medicalConsultationApi.updateMedicalConsultation(data, id);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
        }
    };
    const handleUpdateMedicalConsultationDisease = async (data, id) => {
        try {
            let res = await medicalConsultationDiseaseApi.updateMedicalConsultationDisease(data, id);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
                onGetAllDisease();
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
        }
    };
    const handleDeleteMedicalConsultation = async (id) => {
        try {
            let res = await medicalConsultationApi.deleteMedicalConsultation(id);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
            }
        } catch (error) {
            enqueueSnackbar("Request failed !", { variant: "error" });
        }
    };
    const handleDeleteMedicalConsultationDisease = async (id) => {
        try {
            let res = await medicalConsultationDiseaseApi.deleteMedicalConsultationDisease(id);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
                onGetAllDisease();
            }
        } catch (error) {
            enqueueSnackbar("Request failed !", { variant: "error" });
        }
    };

    const showConfirmDelete = (id1, id2) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn XÓA?',
            icon: <ExclamationCircleOutlined />,
            content: 'Dữ liệu không thể khôi phục!',
            okText: "Có",
            okType: "danger",
            cancelText: "Không",
            onOk() {
                handleDeleteMedicalConsultationDisease(id1);
                handleDeleteMedicalConsultation(id2);
                setDiseaseIdList([]);
                setDisplayShow(false);
                setHtmlContent(undefined);
                setDiesaseSelect(undefined);
                onKeyChange('2');
            },
        });
    };

    const handleOk = () => {
        if (!diseaseIdList.length || htmlContent === undefined || htmlContent.trim() === "") {
            return;
        }
        const medicalConsultation = {
            DISPLAY_STATUS: displayShow ? 1 : 0,
            CONTENT: htmlContent,
        }
        setIsLoading(true);
        if (diseaseSelect?.Medical_Consultation_Diseases?.length > 0) {
            handleUpdateMedicalConsultationDisease(
                {
                    DISEASE_ID: diseaseSelect?.id,
                    DISEASE_NAME: diseaseSelect?.NAME,
                    MEDICAL_CONSULTATION_ID: diseaseSelect?.Medical_Consultation_Diseases[0]?.Medical_Consultation?.id,
                },
                diseaseSelect?.Medical_Consultation_Diseases[0]?.id
            )
            handleUpdateMedicalConsultation(
                medicalConsultation,
                diseaseSelect?.Medical_Consultation_Diseases[0]?.Medical_Consultation?.id
            );
        } else {
            (async () => {
                try {
                    let res = await medicalConsultationApi.createMedicalConsultation(medicalConsultation);
                    if (res.data) {
                        diseaseList.map((item) => handleCreateMedicalConsultationDisease({
                            DISEASE_ID: diseaseSelect ? diseaseSelect.id : item[0].id,
                            DISEASE_NAME: diseaseSelect ? diseaseSelect.NAME : item[0].NAME,
                            MEDICAL_CONSULTATION_ID: res.data.elements.id,
                        }));
                        enqueueSnackbar(res.data.message, { variant: "success" })
                    }
                } catch (error) {
                    enqueueSnackbar("Request failed !", { variant: "error" });
                }
            })()
        }
        setIsLoading(false);
        setDiseaseIdList([]);
        setDisplayShow(false);
        setHtmlContent(undefined);
        setDiesaseSelect(undefined);
        onKeyChange('2');
    }

    return (
        <>
            <Row gutter={[16, 16]} justify="center">
                <Col span={22}>
                    <Typography.Text>Bệnh lý <span style={{ color: "red" }}>*</span></Typography.Text>

                </Col>
                <Col span={22} >
                    <Row justify='space-between' wrap gutter={[16, 16]}>
                        <Col span={18}>
                            <DiseaseListSelect
                                value={diseaseIdList}
                                setValue={setDiseaseIdList}
                                treeData={treeData}
                                disabled={diseaseSelect}
                            />
                        </Col>
                        <Col>
                            <Button
                                type='primary'
                                onClick={() => setIsOpenModal(true)}
                            >
                                Hướng dẫn tên bệnh
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={22}>
                    <Typography.Text>Nhập nội dung tư vấn <span style={{ color: "red" }}>*</span></Typography.Text>
                </Col>
                <Col span={22}>
                    <HtmlEditor
                        value={htmlContent}
                        setValue={setHtmlContent}
                    />
                </Col>
                <Col span={22}>
                    <Space size={16}>
                        <Typography.Text>Hiển thị</Typography.Text>
                        <Switch
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                            onChange={onChange}
                            checked={displayShow ? true : false}
                        />
                    </Space>
                </Col>
                <Col span={22}>
                    <Row justify={{ xs: "start", sm: "space-around" }} gutter={[24, 24]}>
                        <Col xs={22} sm={2}>
                            <Button
                                type='primary'
                                danger
                                // disabled={diseaseSelect?.Medical_Consultation_Diseases?.length
                                //     ? false
                                //     : isDeleteBtn ? true : false
                                // }
                                disabled={isDeleteBtn ? true :
                                    diseaseSelect?.Medical_Consultation_Diseases?.length
                                        ? false : true
                                }
                                onClick={() => showConfirmDelete(
                                    diseaseSelect?.Medical_Consultation_Diseases[0]?.id,
                                    diseaseSelect?.Medical_Consultation_Diseases[0]?.Medical_Consultation?.id,
                                )}
                            >
                                Xóa bài
                            </Button>
                        </Col>
                        <Col xs={22} sm={2}>
                            <Button
                                type='primary'
                                onClick={handleOk}
                                loading={isLoading}
                                disabled={isCreateBtn}
                            >
                                Lưu
                            </Button>
                        </Col>
                        <Col xs={22} sm={2}>
                            <Button
                                onClick={() => {
                                    setDiseaseIdList([]);
                                    setDiesaseSelect(undefined);
                                    setDisplayShow(false);
                                    setHtmlContent(undefined);
                                    onKeyChange('2');
                                }}
                            >
                                Đóng
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Modal
                centered
                width='70%'
                open={isOpenModal}
                footer={false}
                maskClosable={false}
                onCancel={() => setIsOpenModal(false)}
            >
                <Space direction='vertical' size={24}>
                    <Typography.Title level={4}>
                        Hướng dẫn tên bệnh
                    </Typography.Title>
                    <Typography.Paragraph>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores modi quis reprehenderit
                        similique nihil blanditiis illum, saepe quas! Ullam quod enim fugiat ut minus commodi eius
                        sunt, similique eaque aperiam mollitia porro aliquam magni excepturi. Ipsam doloremque a
                        debitis voluptatem eveniet voluptates, molestias omnis nobis aliquid ea harum praesentium
                        vitae aspernatur sed earum minima numquam voluptas perferendis iure cupiditate, tempore
                        necessitatibus quae sapiente! Vitae ratione, placeat laboriosam minus tempora culpa? Ad,
                        voluptatibus alias ullam vero ea hic necessitatibus, qui non adipisci labore, sunt molestias!
                        Consequuntur exercitationem facilis itaque minus ipsam vel doloribus voluptate quibusdam
                        magnam quasi. Cumque nemo in quae dolores veniam voluptatem aspernatur fugit hic dolor
                        illum sed velit provident soluta ad est labore, quos odit quia dolore inventore blanditiis?
                        Quasi aut cumque natus iure veritatis, quaerat assumenda dolorem eveniet reiciendis necessitatibus,
                        sapiente totam laborum neque. Mollitia vitae eius praesentium ipsum exercitationem, dolores
                        reprehenderit quas cumque porro numquam aliquam suscipit sapiente quibusdam expedita quaerat
                        deserunt assumenda ab recusandae quod sint temporibus aspernatur quia ea officia. Ex ducimus
                        odio inventore labore illum doloremque. Totam exercitationem odio rem consequatur saepe tempore
                        cumque. Expedita sed, cum iusto ratione consectetur quasi mollitia consequatur, hic enim ab maiores
                        sit quia quibusdam tempore nihil. Distinctio.
                    </Typography.Paragraph>
                </Space>
            </Modal>
        </>
    )
}

export default AddNewConsultationContent