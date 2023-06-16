import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Menu,
  Modal,
  Row,
  Select,
  Skeleton,
  Space,
  Spin,
} from "antd";

import React, { useEffect, useState } from "react";
import BreadcrumbProvider from "../../components/global/Breadcrumb";
import { useParams } from "react-router-dom";
import { useProfile } from "../../hooks/profile";

import DetailUser from "../../components/Profile/DetailUser";
import ChangePassword from "../../components/Profile/ChangePassword";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atom/authState";
import ResetPassword from "../../components/Profile/ResetPassword";
import i18n from '../../lib/Language';


const itemBreadcrumb = [
  {
    label: "User",
    link: "/um/users",
  },
];

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const Profile = () => {
  const { page: id } = useParams();
  const { isLoading, getUser, updateUser } = useProfile();
  const [profile, setProfile] = useState(undefined);
  const [tab, setTab] = useState(1)
  const {profile:profileData} = useRecoilValue(authState)
  const handleGetUser = async () => {
    const { profile: data } = await getUser(id);
    setProfile(data);
  };
  useEffect(() => {
    if (id) {
      handleGetUser();
    }
  }, [id]);

  const items = id == profileData.id ? [
    getItem(i18n.t("profile.lblProfile"), "1"),
    getItem(i18n.t("profile.lblChangePassword"), "2"),
    getItem(i18n.t("profile.lblShowShortInfo"), "4"),
  ] : [
    getItem(i18n.t("profile.lblProfile"), "1"),
    getItem(i18n.t("profile.lblResetPassword"), "3"),
    getItem(i18n.t("profile.lblShowShortInfo"), "4"),
  ];

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <div className="page-content">
      <BreadcrumbProvider
        item={itemBreadcrumb}
        adrress={`${profile?.FIRST_NAME} ${profile?.LAST_NAME}`}
      />
      <Row>
        <Col span={24}>
          <Spin spinning={isLoading}>
            <Card title={i18n.t("profile.title")}>
              <Card.Grid className="profile-left" hoverable={false}>
                <div className="represent-user">
                  {
                    isLoading ? <><Skeleton.Avatar size={128} shape={'circle'} /><Skeleton.Input style={{ marginTop: 10 }} /><Skeleton.Input style={{ marginTop: 10 }} /></> : <><Avatar
                      src={
                        <Image
                          src={`${profile?.AVATAR}`}
                          style={{ width: 128 }}
                        />
                      }
                      size={128}
                      icon={<UserOutlined />}
                    />
                      <h3>{`${profile?.FIRST_NAME} ${profile?.LAST_NAME}`}</h3>
                      <p
                        style={{ wordWrap: "break-word" }}
                      >{`${profile?.EMAIL}`}</p>
                    </>
                  }


                </div>
                <Menu
                  selectedKeys={[`${tab}`]}
                  mode="inline"
                  theme="light"
                  items={items}
                  onClick={({key})=> {
                    if(key == 4){
                      return showModal()
                    }
                    setTab(key)
                  }}
                />
              </Card.Grid>
              <Card.Grid className="profile-right" hoverable={false}>
              {
                  tab == 1 && <DetailUser handleGetUser={handleGetUser} profile={profile} updateUser={updateUser} />
              }
              {
                  tab == 2 && <ChangePassword/>
              }
              {
                  tab == 3 && <ResetPassword userId={id} />
              }
              
              </Card.Grid>
            </Card>
          </Spin>
        </Col>
      </Row>
      <Modal
        title="Information User"
        visible={visible}
        onCancel={hideModal}
        footer={[
          <Button form="myForm" type="second" onClick={hideModal}>
            Cancel
          </Button>
        ]}
      >
        {
          profile && <><p>Full Name: {profile.FIRST_NAME} {profile.LAST_NAME}</p>
            <p>Primary Phone: {profile.PRIMARY_PHONE || ''}</p>
            <p>Second Phone: {profile?.SECOND_PHONE || ''}</p>
            <p>Primary Email: {profile?.EMAIL || ''}</p>
            <p>Personal Email: {profile?.PERSONAL_EMAIL || ''}</p>
            <p>Password: {profile?.USER_PW || ''}</p></>
        }
      </Modal>
    </div>
  );
};
export default Profile;
