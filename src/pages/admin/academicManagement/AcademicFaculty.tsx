import { Table, TableColumnsType } from "antd";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/academmicManagement.api";
import { TTAbleData } from "./AcademicSemester";

const AcademicFaculty = () => {
  const {
    data: facultyData,

    isFetching,
  } = useGetAllFacultiesQuery([]);

  const tableData = facultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTAbleData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
  ];

  return (
    <Table loading={isFetching} dataSource={tableData} columns={columns} />
  );
};

export default AcademicFaculty;
