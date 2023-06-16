import { CaretDownOutlined, CaretUpOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParent } from '../../../hooks/parent'
import { useRelationshipUser } from '../../../hooks/relationshipUser'
import { useUser } from '../../../hooks/user'
import i18n from "../../../lib/Language"
import ModalParent from './ModalParent'
import ListParents from './ModalParent/ListParents'
import { useStyles } from './style'

const FamilyInfo = ({ userId, isOpen }) => {
    const { users, createUser, updateUser, getUser, user } = useUser();
    const { relationships } = useRelationshipUser();
    const {
        parents,
        parent,
        getParent,
        createParent,
        updateParent,
        deleteParent,
        setParent,
        isLoading,
    } = useParent();

    const [isShow, setIsShow] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [parentId, setParentId] = useState(undefined);
    const [userToUpdateId, setUserToUpdateId] = useState(undefined);

    useEffect(() => {
        if (isOpen) { setIsShow(false) }
        if (parent) {
            setParentId(parent?.id);
            setUserToUpdateId(parent?.PARENT_ID)
        }
    }, [parent, isOpen]);

    const handleCreateParent = async (parent, appId, callback) => {
        await createParent(parent, appId, callback);
        setIsOpenModal(false);
        setParentId(undefined);
        setUserToUpdateId(undefined);
    };
    const handleUpdateParent = async (parent, id, callback) => {
        await updateParent(parent, id, callback);
    };
    const handleOpenUpdate = async (id, User_Id) => {
        await getParent(id, () => setIsOpenModal(true));
        await getUser(User_Id, () => console.log('Get user success!!'));
    };
    const handleDelete = async (id) => {
        await deleteParent(id);
    };
    const handleUpdateUser = async (user, id, callback) => {
        await updateUser(user, id, callback);
    };
    const handleOpenModal = () => {
        setIsOpenModal(true);
        setParent(undefined);
    };
    const handleCancel = () => {
        setIsOpenModal(false);
        setParentId(undefined);
        setUserToUpdateId(undefined);
    };

    return (
        <>
            <Card
                title={
                    <Space>
                        {isShow
                            ? <CaretUpOutlined onClick={() => setIsShow(false)} style={useStyles.iconStyles} />
                            : <CaretDownOutlined onClick={() => setIsShow(true)} style={useStyles.iconStyles} />}
                        <Typography.Title style={useStyles.titleStyles}>{i18n.t("hr.family.family_info")}</Typography.Title>
                    </Space>
                }
                headStyle={useStyles.headStyles}
                bodyStyle={{
                    opacity: isShow ? 1 : 0,
                    visibility: isShow ? 'visible' : 'hidden',
                    height: isShow ? '' : 0,
                    transition: '0.3s',
                    padding: isShow ? '24px 24px 0' : 0,
                }}
                className='card-header'
            >
                <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        title="Create"
                        type="primary"
                        disabled={userId ? false : true}
                        icon={<PlusOutlined />}
                        onClick={handleOpenModal}
                    />
                </Space>
                <div style={{ padding: 8 }}></div>
                <ListParents
                    userId={userId}
                    isLoading={isLoading}
                    onDelete={handleDelete}
                    openEdit={handleOpenUpdate}
                    parents={parents}
                />
            </Card>
            <ModalParent
                userId={userId}
                users={users}
                relationships={relationships}
                parents={parents}
                parent={parent}
                parentId={parentId}
                isOpen={isOpenModal}
                setParentId={setParentId}
                onCancel={handleCancel}
                onUpdate={handleUpdateParent}
                onOk={handleCreateParent}
                title={parent
                    ? i18n.t("hr.family.mdlTitleUp")
                    : i18n.t("hr.family.mdlTitleCre")
                }
                loading={isLoading}
                createUser={createUser}
                onUpdateUser={handleUpdateUser}
                userToUpdate={user}
                userToUpdateId={userToUpdateId}
            />
        </>

    )
}

export default FamilyInfo