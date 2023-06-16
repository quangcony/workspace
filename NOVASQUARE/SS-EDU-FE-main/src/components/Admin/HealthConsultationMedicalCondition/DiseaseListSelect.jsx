import { TreeSelect } from 'antd';
import React from 'react';
import { removeAccents } from '../../../common';
import { useDisease } from '../../../hooks/disease';

const DiseaseListSelect = ({ value, setValue, treeData, disabled }) => {
    useDisease();

    const onChange = (newValue) => {
        setValue(newValue);
    };

    const tProps = {
        treeData,
        value,
        onChange,
        treeCheckable: true,
        placeholder: 'Chọn hoặc nhập tên bệnh tại đây',
        style: {
            width: '100%',
        },
    };
    return (
        <TreeSelect
            {...tProps}
            allowClear
            multiple
            dropdownStyle={{
                maxHeight: 1000,
                overflow: 'auto',
            }}
            filterTreeNode={(input, item) =>
                removeAccents(item?.title ?? "").toLowerCase()
                    .includes(removeAccents(input.toLowerCase()))
            }
            disabled={disabled ? true : false}
        />
    )
}

export default DiseaseListSelect