import { display } from "@mui/system";
import { Button, Input, Modal, Row, Col, Select, DatePicker, Divider } from "antd";
import { Form } from "antd";
import { Option } from "antd/lib/mentions";
import moment from "moment/moment";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import useConfirmUpdate from "../../../hooks/useConfirmUpdate";
import { formatDate } from "../../../common"

const ModalInvestigationCase = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  investigationCase,
  onUpdate,
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { enqueueSnackbar } = useSnackbar();
  const [onChangeOption, setOnchangeOption] = useState(false);
  const [beConvert, setBeConvert] = useState(false);  
  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    if (!Object.values(newData).length > 0) {
      // enqueueSnackbar("Please fill input!", { variant: "error" })
      return;
    }
    if (investigationCase.investigationCase) {
      return onUpdate(form.getFieldValue(), investigationCase.investigationCase.id, () =>
        handleCancel()
      );
    }
    onOk(form.getFieldValue(), () => handleCancel());
  };
  const beChange = () =>{
    if(investigationCase.investigationCase.STATUS === "Chưa xác minh"){
      setOnchangeOption(true)

    }else{
      setOnchangeOption(false)
    }
  
  };

  const setStatus = ()=>{
    investigationCase.investigationCase.STATUS = "Hết hạn điều tra"
  };
  const onFinish = (values) => {
    
    if(investigationCase?.investigationCase){
    if(onChangeOption){
      return confirm(values, investigationCase.investigationCase.id),
      setOnchangeOption(false),
      handleCancel();
    }
    if(investigationCase.investigationCase.STATUS === "Đã xác minh"){
      return confirm(values, investigationCase.investigationCase.id),
      handleCancel()
    }
    if (investigationCase.investigationCase) {      
      return onUpdate(values, investigationCase.investigationCase.id),
      handleCancel();
    }}
    onOk(values, () => handleCancel());
  };
  const handleConvert = () =>{
    form.resetFields();
    setBeConvert(true)
  };
  const { confirm } = useConfirmUpdate(
    onUpdate,onChangeOption?"Bạn muốn thay đổi trạng thái?":"Dữ liệu này đã được khóa tại Blockchain, bạn có muốn sửa không?",() => handleCancel(),
  );
  const handleCancel = () => {
    onCancel();
    setBeConvert(false);
    form.resetFields();
  };
  const handleExpire = () =>{
    setStatus();
    console.log("status",investigationCase?.investigationCase)
    onFinish(investigationCase?.investigationCase);
    onCancel();
   };
   const data = investigationCase?.investigationCase
   const dataBlockChain = investigationCase?.blockchainData

  useEffect(() => {
    if(investigationCase){
form.setFieldsValue({...beConvert===false?data:dataBlockChain,
      SUBJECT_TO_DATE_OF_BIRTH: moment(beConvert===false?data?.SUBJECT_TO_DATE_OF_BIRTH:dataBlockChain?.SUBJECT_TO_DATE_OF_BIRTH),
      FROM_TIME: moment(beConvert===false?data:dataBlockChain?.FROM_TIME),
      TO_TIME: moment(beConvert===false?data:dataBlockChain?.TO_TIME),
      SYMTOMS_ONSET_DATE: moment(beConvert===false?data:dataBlockChain?.SYMTOMS_ONSET_DATE),
    });
    } else {

      
      form.setFieldsValue('')
    }
  }, [beConvert===false?data:dataBlockChain, form]);
  return (
    <>
      <Modal
        width='85%'
        style={{marginTop:"-90px"}}
        title={title}
        visible={isOpen}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
        footer={[
          <Button form="myForm" type="second" onClick={handleExpire} >
            Hết hạn điều tra
          </Button>,
          <Button style={{display:investigationCase?.investigationCase?"":"none"}} disabled={investigationCase?.valid===true?true:false} onClick={handleConvert} form="myForm" type="second" >
            Convert Data from Blockchain
          </Button>,
          <Button form="myForm" type="second" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form="myForm" key="submit" htmlType="submit" type="primary">
            OK
          </Button>,
        ]}
      >
        <Form
          id="myForm"
          form={form}
          name="basic"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{
            span: 10, 
          }}
          wrapperCol={{
            span: 20,
          }}
        >
    <Row>
      <Col span={8}>
          <Form.Item
            label="ID hồ sơ"
            name="USER_ID"
            rules={[
              {
                required: true,
                message:"Nhập ID hồ sơ"
              },
            ]}
          >
            <Input style = {{border: ` ${investigationCase?.invalidFields.includes("USER_ID") === true ? "1px solid red":""}`}} autoFocus={true} />
          </Form.Item>
          <Form.Item
            label="SĐT"
            name="SUBJECT_TO_PHONE_NUMBER"
          >
            <Input autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("SUBJECT_TO_PHONE_NUMBER") === true ? "1px solid red":""}`}} />
          </Form.Item>
          <Form.Item
            hidden
            initialValue=""
            label="Nghề nghiệp"
            name="SUBJECT_TO_JOB"
          >
            <Input hidden value=" " autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("SUBJECT_TO_JOB") === true ? "1px solid red":""}`}}/>
          </Form.Item>
          <Form.Item
          hidden
            initialValue=""
            label="Nationality"
            name="SUBJECT_TO_NATIONALITY"
          >
            <Input hidden autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("SUBJECT_TO_NATIONALITY") === true ? "1px solid red":""}`}}/>
          </Form.Item>
          <Form.Item
          hidden
        
            initialValue=""
            label="Dân tộc"
            name="SUBJECT_TO_ETHNIC"
          >
            <Input hidden autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("SUBJECT_TO_ETHNIC") === true ? "1px solid red":""}`}} />
          </Form.Item>
      </Col>
      <Col span={6}>
      <Form.Item
            label="Tên"
            name="SUBJECT_TO_FULLNAME"
            rules={[
              {
                required: true,
                message: "Nhập tên",
              },
            ]}
          >
            <Input autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("SUBJECT_TO_FULLNAME") === true ? "1px solid red":""}`}} />
          </Form.Item>
          <Form.Item
          hidden
            initialValue={""}
            label="Hôn nhân"
            name="RELATIONSHIP"
          >
            <Input hidden autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("RELATIONSHIP") === true ? "1px solid red":""}`}} />
          </Form.Item>
          <Form.Item
            label="Loại bệnh"
            name="SUBJECT_TO_PASS_PORT_NUMBER"
            rules={[
              {
                required: true,
                message: "Nhập loại bệnh",
              },
            ]}
          >
            <Input autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("SUBJECT_TO_PASS_PORT_NUMBER") === true ? "1px solid red":""}`}} />
          </Form.Item>
      </Col>
      <Col span={6}>
      <Form.Item
            label="Ngày sinh"
            name="SUBJECT_TO_DATE_OF_BIRTH"
            rules={[
              {
                required: true,
                message: "Nhập ngày sinh",
              },
            ]}
          >
            <DatePicker  placeholder="Nhập ngày sinh" format={formatDate.Type} style = {{border: ` ${investigationCase?.invalidFields.includes("SUBJECT_TO_DATE_OF_BIRTH") === true ? "1px solid red":""}`}}/>
          </Form.Item>
          <Form.Item
            label="Nằm trong ổ dịch"
            name="SUBJECT_TO_GENDER"
            rules={[
              {
                required: true,
                message: "vui lòng chọn",
              },
            ]}
          >
            <Select style = {{border: ` ${investigationCase?.invalidFields.includes("SUBJECT_TO_GENDER") === true ? "1px solid red":""}`}}>
            <Option  value="-">-</Option>
            <Option  value="Có">Có</Option>
      </Select>
          </Form.Item>
          
        </Col>
        <Divider/>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item
          hidden
            initialValue=""
            label="Tên người tiếp xúc"
            name="SUBJECT_FROM_FULLNAME"
          >
            <Input hidden autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("SUBJECT_FROM_FULLNAME") === true ? "1px solid red":""}`}} />
          </Form.Item>
          <Form.Item
            label="Cơ sở y tế chuyển đi"
            name="REPORTER_NAME"
            rules={[
              {
                required: true,
                message: "Nhập cơ sở y tế chuyển đi",
              },
            ]}
          >
            <Input autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("REPORTER_NAME") === true ? "1px solid red":""}`}}/>
          </Form.Item>
          <Form.Item
            label="Nơi chuyển tới"
            name="ADDRESS_FLOOR"
            rules={[
              {
                required: true,
                message: "Nhập nơi chuyển tới",
              },
            ]}
          >
            <Input autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("ADDRESS_FLOOR") === true ? "1px solid red":""}`}}/>
          </Form.Item>
          <Form.Item
          hidden
            initialValue=""
            label="Số nhà"
            name="ADDRESS_STREET_HOUSE_NUMBER"
          >
            <Input hidden autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("ADDRESS_STREET_HOUSE_NUMBER") === true ? "1px solid red":""}`}}/>
          </Form.Item>
          <Form.Item
          hidden
            initialValue=""
            label="Quận"
            name="ADDRESS_DISTRICT"
          >
            <Input hidden value=" " autoFocus={true}style = {{border: ` ${investigationCase?.invalidFields.includes("ADDRESS_DISTRICT") === true ? "1px solid red":""}`}} />
          </Form.Item>
        </Col>
        <Col span={6}>
        <Form.Item
        hidden
            initialValue=""
            label="Ngày triệu chứng"
            name="SYMTOMS_ONSET_DATE"
          >
            <DatePicker hidden format={formatDate.Type}style = {{border: ` ${investigationCase?.invalidFields.includes("SYMTOMS_ONSET_DATE") === true ? "1px solid red":""}`}} />
          </Form.Item>
          <Form.Item
            hidden
            label="Từ lúc"
            name="FROM_TIME"
          >
            <DatePicker hidden format={formatDate.Type}style = {{border: ` ${investigationCase?.invalidFields.includes("FROM_TIME") === true ? "1px solid red":""}`}} />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="ADDRESS_NAME"
            rules={[
              {
                required: true,
                message: "Nhập địa chỉ",
              },
            ]}
          >
            <Input style = {{border: ` ${investigationCase?.invalidFields.includes("ADDRESS_NAME") === true ? "1px solid red":""}`}} />
          </Form.Item>        
          <Form.Item
            label="Loại ca bệnh"
            name="ADDRESS_ROOM"
            rules={[
              {
                required: true,
                message: "Nhập loại ca bệnh",
              },
            ]}
          >
            <Input autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("ADDRESS_ROOM") === true ? "1px solid red":""}`}} />
          </Form.Item>
          <Form.Item
          hidden
            initialValue=""
            label="Khu vực"
            name="ADDRESS_WARD"
          >
            <Input hidden value="" autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("ADDRESS_WARD") === true ? "1px solid red":""}`}} />
          </Form.Item>
          <Form.Item
          hidden
            initialValue=""
            label="Tỉnh"
            name="ADDRESS_PROVINCE"
          >
            <Input hidden value=" " autoFocus={true}style = {{border: ` ${investigationCase?.invalidFields.includes("ADDRESS_PROVINCE") === true ? "1px solid red":""}`}}/>
          </Form.Item>
        </Col>
        <Col span={6}>
        <Form.Item
            hidden
            initialValue=""
            label="Triệu chứng"
            name="SYMTOMS"
          >
            <Input hidden autoFocus={true}style = {{border: ` ${investigationCase?.invalidFields.includes("SYMTOMS") === true ? "1px solid red":""}`}} />
          </Form.Item>
          <Form.Item
            hidden
            // initialValue="30/07/2000"
            label="Đến"
            name="TO_TIME"
          >
            <DatePicker hidden style = {{border: ` ${investigationCase?.invalidFields.includes("TO_TIME") === true ? "1px solid red":""}`}}/>
          </Form.Item>
          <Form.Item
          hidden
            initialValue=""
            label="Địa chỉ"
            name="ADDRESS_LOCATION_TYPE"
          >
            <Input hidden autoFocus={true}style = {{border: ` ${investigationCase?.invalidFields.includes("ADDRESS_LOCATION_TYPE") === true ? "1px solid red":""}`}} />
          </Form.Item>
          
          <Form.Item
          hidden
            initialValue=" "
            label="Nơi chuyển tới"
            name="ADDRESS_BLOCK"
            rules={[
              {
                required: true,
                message: "Nhập nơi chuyển tới",
              },
            ]}
          >
            <Input hidden value=" " autoFocus={true}style = {{border: ` ${investigationCase?.invalidFields.includes("ADDRESS_BLOCK") === true ? "1px solid red":""}`}} />
          </Form.Item>
          <Form.Item
          hidden
            initialValue=""
            label="Nhóm"
            name="ADDRESS_GROUP"
          >
            <Input hidden value=" " autoFocus={true} style = {{border: ` ${investigationCase?.invalidFields.includes("ADDRESS_GROUP") === true ? "1px solid red":""}`}} />
          </Form.Item>       
          <Form.Item
            label="Trạng thái"
            name="STATUS"
            rules={[
              {
                required: true,
                message: "Chọn trạng thái",
              },
            ]}
          >
          <Select onChange={beChange} style = {{border: ` ${investigationCase?.invalidFields.includes("STATUS") === true ? "1px solid red":""}`}}>
            <Option  value="Chưa xác minh">Chưa xác minh</Option>
            <Option disabled={investigationCase ? false : true} value="Đã xác minh">Đã xác minh</Option>
      </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          
          </Col>
          <Col span={6}>
          
          <Form.Item
          hidden
            initialValue=""
            label="Description"
            name="DESC"
          >
            <TextArea hidden value=" " rows={3} style = {{border: ` ${investigationCase?.invalidFields.includes("DESC") === true ? "1px solid red":""}`}}/>
          </Form.Item>
        </Col>
        <Col span={6}>
        
          <Form.Item 
          hidden
          initialValue=""
           label="Note" name="NOTE">
            <TextArea hidden value="" width={20} style = {{border: ` ${investigationCase?.invalidFields.includes("NOTE") === true ? "1px solid red":""}`}} />
          </Form.Item>
        </Col>
          </Row>
        </Form>
        
      </Modal>
    </>
  );
};

export default ModalInvestigationCase;
