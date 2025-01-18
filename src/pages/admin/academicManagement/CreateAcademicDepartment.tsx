import { Button, Col, Flex } from "antd";
import PHform from "../../../components/form/PHform";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/academmicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicDepartmentSchema } from "../../../schemas/academicManagementSchema";

const departmentsData = [
  {
    value: "0101",
    label: "Department of Civil Engineering",
    key: "0101",
  },
  {
    value: "0102",
    label: "Department of Mechanical Engineering",
    key: "0102",
  },
  {
    value: "0103",
    label: "Department of Electrical Engineering",
    key: "0103",
  },
  {
    value: "0104",
    label: "Department of Computer Engineering",
    key: "0104",
  },

  { value: "0201", label: "Department of Sociology", key: "0201" },
  { value: "0202", label: "Department of Anthropology", key: "0202" },
  {
    value: "0203",
    label: "Department of Political Science",
    key: "0203",
  },
  { value: "0204", label: "Department of Psychology", key: "0204" },

  { value: "0301", label: "Department of History", key: "0301" },
  { value: "0302", label: "Department of Philosophy", key: "0302" },
  { value: "0303", label: "Department of Literature", key: "0303" },
  { value: "0304", label: "Department of Linguistics", key: "0304" },

  { value: "0601", label: "Department of Criminal Law", key: "0601" },
  {
    value: "0602",
    label: "Department of Constitutional Law",
    key: "0602",
  },
  {
    value: "0603",
    label: "Department of International Law",
    key: "0603",
  },
  { value: "0604", label: "Department of Corporate Law", key: "0604" },
];

const CreateAcademicDepartment = () => {
  const { data: facultyData, isFetching } = useGetAllFacultiesQuery(undefined);

  const dataFaculty =
    facultyData?.data?.map((faculty) => ({
      label: faculty.name,
      value: faculty._id,
    })) || [];

  if (isFetching) {
    return <p>Loading faculties...</p>;
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("this is data", data);
  };

  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   // const name1 = departmentsData[Number(data?.department) - 1]?.label;
  //   // const name2 = dataFaculty[Number(data?.faculty) - 1]?.label;
  //   // console.log(name1);
  //   // console.log(name2);
  //   console.log("hello", data);
  // };

  return (
    <div>
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Col span={8}>
          <PHform
            onSubmit={onSubmit}
            resolver={zodResolver(academicDepartmentSchema)}
          >
            <PHSelect label="Faculty" name="faculty" options={dataFaculty} />
            <PHSelect
              label="Department"
              name="department"
              options={departmentsData}
            />
            <Button htmlType="submit">Submit</Button>
          </PHform>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicDepartment;
