import MutationStudent from "../../../components/Admin/Student/MutationStudent";
import ListStudents from "../../../components/Admin/Student/ListStudents";
import BreadcrumbProvider from "../../../components/global/Breadcrumb";
import Card from "../../../components/global/Card";
import { Col, Row } from "antd";
import { removeAccents, selectOptions, selectOptionUser } from "../../../common";
import { useEffect, useState } from "react";
import HeadBar from "../../../components/global/HeadBar";
import { useSearch } from "react-use-search";
import { useStudent } from "../../../hooks/student";
import {useUser} from "../../../hooks/user";
import {useSchool} from "../../../hooks/school";
import {useStudentStatus} from "../../../hooks/studentStatus";
import {useWorkPlace} from '../../../hooks/workPlace';
import {useSourceRegistration} from "../../../hooks/sourceRegistration";
import {useStudentRegistration} from "../../../hooks/studentRegistration";

import { useRecoilValue } from "recoil";
import { generalState } from "../../../recoil/atom/generalState";
import { useHistory } from "react-router-dom";
import moduleApi from "../../../api/moduleApi";
import Permissions_CD from "../../../data_json/Permissions_CD.json";
import { findExistance } from "../../../utils/findExistance";
import i18n from "../../../lib/Language";
const predicate = (apps, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();
  
  const FIRSTNAME = removeAccents(String(apps.Users.FIRST_NAME)).toLowerCase().trim();
  const LASTNAME = removeAccents(String(apps.Users.LAST_NAME)).toLowerCase().trim();
  return (FIRSTNAME.includes(newQuery) || LASTNAME.includes(newQuery)) ;
};
const Students = () => {
  const { users } = useUser();
  const {schools} = useSchool();
  const {studentstatuss} = useStudentStatus();
  const {workPlaces} = useWorkPlace();
  const {studentRegistrations} = useStudentRegistration();
  const [schoolOption, setSchoolOption] = useState([]);
  const {sourceRegistrations} = useSourceRegistration();
  const [userOption, setUserOption] = useState([]);
  const {moduleSelected } = useRecoilValue(generalState);
  const [permissionsCD, setPermissionsCD] = useState();
  const [studentOption, setStudentOption] = useState([]);
  const [studentRegistration, setStudentRegistration] = useState([]);
  const [sourceRegistrationOption, setSourceRegistrationOption] = useState([]);
  const [workplaceOption, setWorkPlaceOption] = useState([]);
  const history = useHistory();
  
  const {
    students,
    updateStudent,
    isLoading,
    deleteStudent,
    createStudent,
    getStudent,
    student,
    setStudent,
  } = useStudent();
  const [isOpenMutation, setIsOpenMutation] = useState(false);

  const handleCreateApp = async (app, callback) => {
    await createStudent(app, callback);
  };
  const handleUpdateApp = async (app, id, callback) => {
    await updateStudent(app, id, callback);
  };
  const handleOpenUpdate = async (id) => {
    await getStudent(id, () => setIsOpenMutation(true));
    setIsOpenMutation(true);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
  };

  const [filteredStudents, query, handleChange, setQuery] = useSearch(
    students,
    predicate,
    { debounce: 200 }
  );
  useEffect(() => {
    if (studentRegistrations && studentRegistrations.length > 0) {
        setStudentRegistration(selectOptionUser(studentRegistrations));
    } else {
        setStudentRegistration([]);
    }
  }, [studentRegistrations]);
  useEffect(() => {
    if (sourceRegistrations && sourceRegistrations.length > 0) {
        setSourceRegistrationOption(selectOptions(sourceRegistrations));
    } else {
        setSourceRegistrationOption([]);
    }
  }, [sourceRegistrations]);
  useEffect(() => {
    if (schools && schools.length > 0) {
        setSchoolOption(selectOptions(schools));
    } else {
        setSchoolOption([]);
    }
  }, [schools]);
  useEffect(() => {
    if (workPlaces && workPlaces.length > 0) {
        setWorkPlaceOption(selectOptions(workPlaces));
    } else {
        setWorkPlaceOption([]);
    }
  }, [workPlaces]);
  useEffect(() => {
    if (studentstatuss && studentstatuss.length > 0) {
        setStudentOption(selectOptions(studentstatuss));
    } else {
        setStudentOption([]);
    }
  }, [studentstatuss]);
  useEffect(() => {
    if (users && users.length > 0) {
      setUserOption(selectOptionUser(users));
    } else {
      setUserOption([]);
    }
  }, [users]);
  useEffect(() => {
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
      <BreadcrumbProvider
        adrress={i18n.t("Student.student.lblStudent")}
      />
      <Row>
        <Col span={24}>
          <Card title={i18n.t("Student.student.title")}>
            <HeadBar
              query={query}
              onSearch={handleChange}
              openAdd={() => {
                setIsOpenMutation(true);
                setStudent(undefined);
              }}
              isDisplayBtn={findExistance(permissionsCD, Permissions_CD.create)}
            />
            <ListStudents
              onDelete={handleDelete}
              openEdit={handleOpenUpdate}
              students={
                filteredStudents && filteredStudents.length > 0
                  ? filteredStudents
                  : students
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
      <MutationStudent
        studentRegistration={studentRegistration}
        sourceRegistration={sourceRegistrationOption}
        school={schoolOption}
        branch={workplaceOption}
        studentStatus={studentOption}
        user={userOption}
        onUpdate={handleUpdateApp}
        student={student}
        loading={isLoading}
        onOk={handleCreateApp}
        title={
          student ? "Update student" : "Create student"
        }
        onCancel={() => setIsOpenMutation(false)}
        isOpen={isOpenMutation}
      />
    </div>
  );
};

export default Students;
