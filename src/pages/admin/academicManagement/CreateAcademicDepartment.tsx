import { Button, Col, Flex } from "antd";
import PHform from "../../../components/form/PHform";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddAcademicDepartmentMutation,
  useGetAllFacultiesQuery,
} from "../../../redux/features/admin/academmicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicDepartmentSchema } from "../../../schemas/academicManagementSchema";
import { toast } from "sonner";
import { TResponse } from "../../../types";

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
  const {
    data: facultyData,
    isFetching,
    isError,
  } = useGetAllFacultiesQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  if (isFetching) {
    return <p>Loading faculties...</p>;
  }

  const dataFaculty =
    facultyData?.data?.map((faculty) => ({
      label: faculty.name,
      value: faculty._id,
    })) || [];

  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   const name1 = departmentsData[Number(data?.department) - 1]?.label;
  //   const name2 = dataFaculty[Number(data?.faculty) - 1]?.label;
  //   console.log(name1);
  //   console.log(name2);
  //   console.log("hello", data);
  // };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const department = departmentsData.find(
      (item) => item.value === data?.name
    );
    const faculty = dataFaculty.find(
      (item) => item.value === data?.academicFaculty
    );

    const departmentName = department?.label || "Department not found";
    const academicFacultyName = faculty?.value || "Faculty not found";

    const departmentData = {
      name: departmentName,
      academicFaculty: academicFacultyName,
    };
    const toastId = toast.loading("Creating...");

    try {
      const res = (await addAcademicDepartment(
        departmentData
      )) as TResponse<any>;
      console.log(res);

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
    console.log(departmentData);
  };

  if (isError) {
    return <p>Error loading faculties</p>;
  }

  return (
    <div>
      {/* <Flex justify="center" align="center" style={{ height: "100vh" }}>
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
      </Flex> */}
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Col span={8}>
          <PHform
            onSubmit={onSubmit}
            resolver={zodResolver(academicDepartmentSchema)}
          >
            <PHSelect
              label="Academic Faculty"
              name="academicFaculty"
              options={dataFaculty}
            />
            <PHSelect
              label="Department"
              name="name"
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
