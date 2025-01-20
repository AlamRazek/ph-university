import { Table, TableColumnsType } from "antd";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academmicManagement.api";
import { TTAbleData } from "./AcademicSemester";

const AcademicDepartment = () => {
  const {
    data: facultyData,

    isFetching,
  } = useGetAllDepartmentQuery([]);

  const tableData = facultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTAbleData> = [
    {
      title: "Department Name",
      key: "name",
      dataIndex: "name",
    },
  ];

  return (
    <Table loading={isFetching} dataSource={tableData} columns={columns} />
  );
};

export default AcademicDepartment;
