import { Modal } from 'antd'
import React, { useRef, useState } from 'react'
import { removeAccents } from '../../../../common'
import i18n from '../../../../lib/Language'
import ListUsers from './ListUsers'
import UserSearchForm from './UserSearchForm'

// CHECK IF FILTER RESULT LIST != null THEN USE FILTER RESULT LIST, ELSE IF THEN USE DATAS LIST
const checkFilterList = (a, b) => a ? a : b;

const ModalUser = ({ isOpen, onCancel, setUser, formRef, users, isLoading, createUser }) => {
    const [dataSource, setDataSource] = useState(undefined);
    const [searchValue, setSearchValue] = useState({
        id: '',
        FIRST_NAME: '',
        LAST_NAME: '',
        EMAIL: '',
        PRIMARY_PHONE: '',
    });
    const typingTimeoutRef = useRef(null);

    const handleFormChange = (values) => {
        // Set DEBOUNCE 500ms
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        };
        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                ...searchValue,
                ...values,
            };
            setSearchValue({ ...formValues });
        }, 500)
    };

    // useEffect(() => {
    //     if (
    //         searchValue?.id.length > 0 ||
    //         searchValue?.FIRST_NAME.length > 0 ||
    //         searchValue?.LAST_NAME.length > 0 ||
    //         searchValue?.EMAIL.length > 0 ||
    //         searchValue?.PRIMARY_PHONE.length > 0
    //     ) {
    //         let newData = undefined;
    //         if (searchValue.id) {
    //             const newQuery = (String(searchValue.id)).toLowerCase().trim();
    //             const tempData = checkFilterList(newData, users)
    //                 .filter(user => (String(user?.id)).toLowerCase().trim().includes(newQuery));
    //             newData = [...tempData];
    //         }
    //         if (searchValue.FIRST_NAME) {
    //             const newQuery = removeAccents(String(searchValue.FIRST_NAME)).toLowerCase().trim();
    //             const tempData = checkFilterList(newData, users)
    //                 .filter(user => removeAccents(String(user?.FIRST_NAME)).toLowerCase().trim().includes(newQuery));
    //             newData = [...tempData];
    //         }
    //         if (searchValue.LAST_NAME) {
    //             const newQuery = removeAccents(String(searchValue.LAST_NAME)).toLowerCase().trim();
    //             const tempData = checkFilterList(newData, users)
    //                 .filter(user => removeAccents(String(user?.LAST_NAME)).toLowerCase().trim().includes(newQuery));
    //             newData = [...tempData];
    //         }
    //         if (searchValue.EMAIL) {
    //             const newQuery = removeAccents(String(searchValue.EMAIL)).toLowerCase().trim();
    //             const tempData = checkFilterList(newData, users)
    //                 .filter(user => removeAccents(String(user?.EMAIL)).toLowerCase().trim().includes(newQuery));
    //             newData = [...tempData];
    //         }
    //         if (searchValue.PRIMARY_PHONE) {
    //             const newQuery = (String(searchValue.PRIMARY_PHONE)).toLowerCase().trim();
    //             const tempData = checkFilterList(newData, users)
    //                 .filter(user => (String(user?.PRIMARY_PHONE)).toLowerCase().trim().includes(newQuery));
    //             newData = [...tempData];
    //         }
    //         setDataSource(newData);
    //     } else setDataSource(users);
    // }, [users, searchValue]);

    const handleSearch = () => {
        if (
            searchValue?.id.length > 0 ||
            searchValue?.FIRST_NAME.length > 0 ||
            searchValue?.LAST_NAME.length > 0 ||
            searchValue?.EMAIL.length > 0 ||
            searchValue?.PRIMARY_PHONE.length > 0
        ) {
            let newData = undefined;
            if (searchValue.id) {
                const newQuery = (String(searchValue.id)).toLowerCase().trim();
                const tempData = checkFilterList(newData, users)
                    .filter(user => (String(user?.id)).toLowerCase().trim().includes(newQuery));
                newData = [...tempData];
            }
            if (searchValue.FIRST_NAME) {
                const newQuery = removeAccents(String(searchValue.FIRST_NAME)).toLowerCase().trim();
                const tempData = checkFilterList(newData, users)
                    .filter(user => removeAccents(String(user?.FIRST_NAME)).toLowerCase().trim().includes(newQuery));
                newData = [...tempData];
            }
            if (searchValue.LAST_NAME) {
                const newQuery = removeAccents(String(searchValue.LAST_NAME)).toLowerCase().trim();
                const tempData = checkFilterList(newData, users)
                    .filter(user => removeAccents(String(user?.LAST_NAME)).toLowerCase().trim().includes(newQuery));
                newData = [...tempData];
            }
            if (searchValue.EMAIL) {
                const newQuery = removeAccents(String(searchValue.EMAIL)).toLowerCase().trim();
                const tempData = checkFilterList(newData, users)
                    .filter(user => removeAccents(String(user?.EMAIL)).toLowerCase().trim().includes(newQuery));
                newData = [...tempData];
            }
            if (searchValue.PRIMARY_PHONE) {
                const newQuery = (String(searchValue.PRIMARY_PHONE)).toLowerCase().trim();
                const tempData = checkFilterList(newData, users)
                    .filter(user => (String(user?.PRIMARY_PHONE)).toLowerCase().trim().includes(newQuery));
                newData = [...tempData];
            }
            setDataSource(newData);
        } else setDataSource(users);
    }

    const handleResetForm = () => {
        formRef.current.resetFields();
        setDataSource(users);
        setSearchValue({
            id: '',
            FIRST_NAME: '',
            LAST_NAME: '',
            EMAIL: '',
            PRIMARY_PHONE: '',
        })
    }

    const handleCancel = () => {
        onCancel();
        setDataSource(users);
    };
    const handleGetUser = (user) => {
        setUser(user);
        onCancel();
        setDataSource(users);
    };

    return (
        <Modal
            open={isOpen}
            onCancel={handleCancel}
            maskClosable={false}
            title={i18n.t("hr.user_search")}
            width={1250}
            style={{
                top: 20
            }}
            footer={false}
        >
            <UserSearchForm
                formRef={formRef}
                onChange={handleFormChange}
                onSearch={handleSearch}
                onReset={handleResetForm}
                createUser={createUser}
                isLoading={isLoading}
            />
            <ListUsers
                loading={isLoading}
                users={dataSource ?? users}
                onGetUser={handleGetUser}
            />
        </Modal>
    )
}

export default ModalUser