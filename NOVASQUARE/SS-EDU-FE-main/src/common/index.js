// Validate input value to search in HeadBar componetnt.
export const removeAccents = (str) => {
  if (str) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str?.replaceAll(/\s/g, '');
  } else {
    return
  }
};

// Convert a flat array to tree
export const arrayToTree = (arr, parent = 0) => {
  return arr
    ?.filter((item) => item.PARENT_ID === parent)
    .map((child) => ({ ...child, children: arrayToTree(arr, child.id) }));
};

// Convert data from api to Antd select options.
export const selectOptions = (array) => {
  const list = [];
  for (let item of array) {
    list.push({
      value: item.id,
      label: item.NAME,
    });
  }
  return list;
};

export const selectOptionUser = (array) => {
  const list = [];
  for (let item of array) {
    list.push({
      value: item.id,
      label: item.USER_NAME,
    });
  }
  return list;
};

// take the last 3 years
function listYears() {
  const dateNow = new Date().getFullYear();
  const listYear = [];
  for (let i = 0; i <= 3; i++) {
    listYear.push(dateNow - i);
  }
  return listYear;
}
export const yearData = listYears();
//So nam lam viec
export const WorkNumberYear = () => {
  const WorkNumberYear = [];
  for (let i = 1; i <= 50; i++) {
    WorkNumberYear.push({
      label: `${i}`,
      value: i
    });
  }
  return WorkNumberYear;
}//So thang lam viec
export const WorkNumberMonth = () => {
  const WorkNumberMonth = [];
  for (let i = 1; i <= 12; i++) {
    WorkNumberMonth.push({
      label: `${i}`,
      value: i
    });
  }
  return WorkNumberMonth;
}
//select month
export const SelectMonth = () => {
  const SelectMonth = [];
  for (let i = 1; i <= 13; i++) {
    SelectMonth.push({
      label: `${i}`,
      value: i
    });
  }
  return SelectMonth;
}
//select month
export const SelectMonthWithTotal = () => {
  const SelectMonth = [];
  SelectMonth.push({
    label: "Tất cả",
    value: 0
  })
  for (let i = 1; i <= 13; i++) {
    SelectMonth.push({
      label: `${i}`,
      value: i
    });

  }

  return SelectMonth;
}
//So ngay lam viec
export const WorkNumberDay = () => {
  const WorkNumberDay = [];
  for (let i = 1; i <= 31; i++) {
    WorkNumberDay.push({
      label: `${i}`,
      value: i
    });
  }
  return WorkNumberDay;
}

// so nam lam viec nghe nghiep
export const YearOfWork = () => {
  const YearOfWork = [];
  for (let i = 1; i <= 50; i++) {
    YearOfWork.push({
      label: `${i}`,
      value: i,
    });
  }
  return YearOfWork;
};

//style for table

export const TblStyles = {
  SELECT_BOX: 20,
  ID: 100,
  CD: 80,
  AVATAR: 75,
  FIRST_NAME: 75,
  LAST_NAME: 50,
  FULL_NAME: 150,
  GENDER: 60,
  BOD: 80,
  EMAIL: 270,
  PHONE: 70,
  ACTION: 90,
  MEDICAL_EXAM_YEAR: 70,
  USER_INPUT_NAME: 80,
  INPUT_DATE: 70,
  BRANCH_NAME: 100,
  AREA_NAME: 150,
  DEPARTMENT_NAME: 150,
  MEDICAL_VISIT_NUMBER: 60,
  SHOW: 70,
  IMPORT: 80,
  RESULT: 200,
  STATUS: 200,
  CITY: 80,
  SOCIAL_CD: 80,
  MODEL_CD: 90,
  AREA_CD: 90,
  LEVEL_CD: 90,
  MEDICAL_NAME: 180,
  PHYSICAL_DATE: 100,

};

export const TblPagination = {
  defaultPageSize: 100,
  defaultCurrent: 1,
  showSizeChanger: true,
  pageSizeOptions: [50, 100, 200],
};

export const TblPaginationRepu = {
  current: 1,
  defaultPageSize: 100,
  defaultCurrent: 1,
  hideOnSinglePage: false,
  showSizeChanger: true,
  position: ["topRight", "bottomRight"],
  pageSizeOptions: [50, 100, 200],
  size: "small",
  showTotal: (total, range) =>
    `Hiển thị ${range[0]}~${range[1]}/${total}`
}

export const getLeafNodes = (nodes, result = []) => {
  nodes.forEach((node) => {
    if (!node.children || node.children.length === 0) {
      const { children, ...data } = node;
      result.push(data);
    } else {
      getLeafNodes(node.children, result);
    }
  });
  return result;

  // for(var i = 0, length = nodes.length; i < length; i++){
  //   if(!nodes[i].children || nodes[i].children.length === 0){
  //     result.push(nodes[i]);
  //   }else{
  //     result = getLeafNodes(nodes[i].children, result);
  //   }
  // }
  // return result;
};

// Date format
export const formatDate = {
  Type: "DD/MM/YYYY",
}

export const numberRegex = /^[0-9]+$/;
export const regexBP = /^\d{2,3}\/+\d{2,3}$/;

// get base64
export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// convert day
export const ConvertDay = (year, month, day) => {
  if (year === undefined) {
    year = 0;
  }
  if (month === undefined) {
    month = 0;
  }
  if (day === undefined) {
    day = 0;
  }
  return year * 365 + month * 30 + day;
};

// CHECK IF FILTER RESULT LIST != null THEN USE FILTER RESULT LIST, ELSE IF THEN USE DATAS LIST
export const checkFilterList = (a, b) => {
  return a ? a : b;
};

// MASSAGE VALIDATE EMPTY
export const validateMessages = {
  required: "Trường này không được để trống!",
};

// PREVENT ENTER KEY INPUT
export const handleBlockEnter = (e) => {
  e.key === "Enter" && e.preventDefault();
};

// CHECK STYLE MIN MAX (PHYSICAL EXAM SUBCLINICAL)
export function CheckError(value, Min, Max, isCheck) {
  if (isCheck) {
    if (value < Min || value > Max) {
      return "value-input";
    } else {
      return null;
    }
  } else {
    if (value < Min || value > Max) {
      return "red";
    } else {
      return "black";
    }
  }
}

// CHECK VALUE MIN MAX (PHYSICAL EXAM PRECLINICAL)
export function checkMin(value, Max, setError) {
  if (!value || value < Max || Max === 0) {
    setTimeout(() => {
      setError("");
    }, 200);
  }
  if (value > Max && Max !== 0) {
    setTimeout(() => {
      setError("Chỉ số trước phải nhỏ hơn chỉ số sau");
    }, 200);
  }
}
export function checkMax(value, Min, setError) {
  if (value > Min || value === 0) {
    setTimeout(() => {
      setError("");
    }, 200);
  }
  if (value < Min && value > 0) {
    setTimeout(() => {
      setError("Chỉ số sau phải lớn hơn chỉ số trước");
    }, 300);
  }
}