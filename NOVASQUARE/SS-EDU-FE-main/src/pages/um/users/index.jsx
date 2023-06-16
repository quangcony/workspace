import { useUser } from "../../../hooks/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";
import BreadcrumbProvider from "../../../components/global/Breadcrumb";
import Card from "../../../components/global/Card";
import { Col, Row } from "antd";
import MutationUser from "../../../components/Admin/Users/MutationUser";
import { useEffect, useState } from "react";
import HeadBar from "../../../components/global/HeadBar";
import { useSearch } from "react-use-search";
import ModalAssignRole from "../../../components/Admin/Users/ModalAssignRole";
import { useSnackbar } from "notistack";
import Permissions_CD from "../../../data_json/Permissions_CD.json";
import { findExistance } from "../../../utils/findExistance";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { generalState } from "../../../recoil/atom/generalState";
import moduleApi from "../../../api/moduleApi";
import i18n from '../../../lib/Language'

import { removeAccents } from "../../../common"

const predicate = (users, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();

  

  const FULL_NAME = removeAccents(`${users.FIRST_NAME} ${users.LAST_NAME}`)
    .toLowerCase()
    .trim();

  const EMAIL = removeAccents(String(users.EMAIL)).toLowerCase().trim();
  const USERNAME = removeAccents(String(users.EMAIL)).toLowerCase().trim();
  const PRIMARY_PHONE = String(users.PRIMARY_PHONE).toLowerCase().trim();
  const DESC = removeAccents(String(users.DESC)).toLowerCase().trim();
  return (
    FULL_NAME.includes(newQuery) ||
    DESC.includes(newQuery) ||
    EMAIL.includes(newQuery) ||
    USERNAME.includes(newQuery) ||
    PRIMARY_PHONE.includes(newQuery)
  );
};

const User = () => {
  const { moduleSelected } = useRecoilValue(generalState);
  const [permissionsCD, setPermissionsCD] = useState();
  const history = useHistory();
  const {
    users,
    updateUser,
    isLoading,
    deleteUser,
    createUser,
    getUser,
    user,
    setUser,
    assignRoleIdsToUserId,
    unassignRoleIdsFromUserId,
  } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const [userId, setUserId] = useState(undefined);
  const [isOpenMutation, setIsOpenMutation] = useState(false);
  const [isOpenAssignRole, setIsOpenAssignRole] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleCreateUser = async (user, appId, callback) => {
    await createUser(user, appId, callback);
    setIsOpenMutation(false);
    setUserId(undefined);
  };
  const handleUpdateUser = async (user, id, callback) => {
    await updateUser(user, id, callback);
  };
  const handleOpenUpdate = async (id) => {
    await getUser(id, () => setIsOpenMutation(true));
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
  };

  useEffect(() => {
    if (user) {
      setUserId(user?.id);
    }
  }, [user]);

  const [filteredUsers, query, handleChange, setQuery] = useSearch(
    users,
    predicate,
    { debounce: 200 }
  );

  const openAssignRole = (user) => {
    if (!user) return;
    setSelectedUser(user);
    setSelectedRoles(user.Roles);
    setIsOpenAssignRole(true);
  };

  const handleAssignRole = async (
    userId,
    newSelectedIds,
    newRemovedIds,
    callback
  ) => {
    if (newSelectedIds.length > 0) {
      await assignRoleIdsToUserId(userId, `[${newSelectedIds}]`);
    }
    if (newRemovedIds.length > 0) {
      await unassignRoleIdsFromUserId(userId, `[${newRemovedIds}]`);
    } else if (newSelectedIds.length || newRemovedIds.length) {
      enqueueSnackbar("Assign Role Successful!", { variant: "success" });
    }
    callback();
  };

  useEffect(() => {
    //get permissions of current user to page
    (async () => {
      const response = await moduleApi.getPermissionsByModuleId(
        moduleSelected?.id
      );
      if (response.status === 200 && response.data.elements.length > 0) {
        const temp = [
          ...response.data.elements.map((item) => item.PERMISSION_CD),
        ];
        setPermissionsCD(temp);
      } else {
        setPermissionsCD([]);
        history.push("/");
      }
    })();
  }, []);

  return (
    <div className="page-content">
      <BreadcrumbProvider adrress={i18n.t("userManagement.users.lblUser")}/>
      <Row>
        <Col span={24}>
          <Card title={i18n.t("userManagement.users.title")}>
            <HeadBar
              query={query}
              onSearch={handleChange}
              openAdd={() => {
                setIsOpenMutation(true);
                setUser(undefined);
              }}
              isDisplayBtn={findExistance(permissionsCD, Permissions_CD.create)}
            />
            <ListUsers
              openAssignRole={openAssignRole}
              onDelete={handleDelete}
              openEdit={handleOpenUpdate}
              users={
                query 
                  ? filteredUsers
                  : users
              }
              isLoading={isLoading}
              isDisplayEditBtn={findExistance(
                permissionsCD,
                Permissions_CD.update
              )}
              isDisplayDeleteBtn={findExistance(
                permissionsCD,
                Permissions_CD.delete
              )}
            />
          </Card>
        </Col>
      </Row>
      <MutationUser
        setUserId={setUserId}
        userId={userId}
        onUpdate={handleUpdateUser}
        user={user}
        loading={isLoading}
        onOk={handleCreateUser}
        title={user ? "Update User" : "Create User"}
        onCancel={() => {
          setIsOpenMutation(false);
          setUserId(undefined);
        }}
        isOpen={isOpenMutation}
      />
      <ModalAssignRole
        selectedRoles={selectedRoles}
        user={selectedUser}
        isOpen={isOpenAssignRole}
        title={"Assign Role"}
        onOk={handleAssignRole}
        onCancel={() => setIsOpenAssignRole(false)}
      />
    </div>
  );
};

export default User;
