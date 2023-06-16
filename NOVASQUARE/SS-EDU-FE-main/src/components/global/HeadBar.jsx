import { PlusOutlined, RedoOutlined, SearchOutlined, WarningOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space } from "antd";
import i18n from "../../lib/Language";

const HeadBar = ({ openAdd, query, onSearch, isDisplayBtn = true, cityOptions,
  countryOptions, districtOptions, showSelectBox, onSelectCountry, onClearCountry,
  onSelectCity, onClearCity, onSelectDistrict, onClearDistrict,btnReLoad="none", reLoadGet}) => {

  return (
    <div style={{ marginBottom: 16 }}>
      <Space
        align="center"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Input
          className={showSelectBox ? 'hid_element' : ''}
          allowClear
          value={query}
          onChange={onSearch}
          placeholder={i18n.t("general.ipSearch")}
          prefix={<SearchOutlined />}
        />
        <Space className={showSelectBox ? '' : 'hid_element'} wrap>
          <Select
            allowClear
            showSearch
            style={{ width: 200, display: countryOptions ? '' : 'none' }}
            placeholder={countryOptions ? i18n.t("general.ctSelect") : ''}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={countryOptions}
            onSelect={onSelectCountry}
            onClear={onClearCountry}
          />
          <Select
            allowClear
            showSearch
            style={{ width: 200, display: cityOptions ? '' : 'none' }}
            placeholder={cityOptions ? i18n.t("general.citySelect") : ''}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={cityOptions}
            onSelect={onSelectCity}
            onClear={onClearCity}
          />
          <Select
            allowClear
            showSearch
            style={{ width: 200, display: districtOptions ? '' : 'none' }}
            placeholder={districtOptions ? i18n.t("general.dtSelect") : ''}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={districtOptions}
            onSelect={onSelectDistrict}
            onClear={onClearDistrict}
          />
          
          <Input
            style={{ width: 200 }}
            allowClear
            value={query}
            onChange={onSearch}
            placeholder={i18n.t("general.ipSearch")}
            prefix={<SearchOutlined />}
          />

        </Space>
        <Space size="middle">
        <Button
          onClick={reLoadGet}
          title="Refresh"
          type="primary"
          style={{
            display: {btnReLoad},backgroundColor:"#FBC02D", border:"none"
          }}
          icon={<RedoOutlined />}
        />
        <Button
          disabled={!isDisplayBtn}
          onClick={openAdd}
          title="Create"
          type="primary"
          style={{
            display: "block",
          }}
          icon={<PlusOutlined />}
        />
        </Space>
      </Space>
    </div>
  );
};

export default HeadBar;
