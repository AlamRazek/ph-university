import { Button, Col, Flex } from "antd";
import PHform from "../../../components/form/PHform";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagementSchema";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academmicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const nameOptions = [
  {
    value: "01",
    label: "Department of Civil Engineering",
    key: "01",
  },
  {
    value: "02",
    label: "Department of Mechanical Engineering",
    key: "02",
  },
  {
    value: "03",
    label: "Department of Electrical Engineering",
    key: "03",
  },
  {
    value: "04",
    label: "Department of Computer Engineering",
    key: "04",
  },
  {
    value: "05",
    label: "Faculty of Business and Economics",
    key: "05",
  },
  {
    value: "06",
    label: "Faculty of Law",
    key: "06",
  },
];

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const name = nameOptions[Number(data?.name) - 1]?.label;
    console.log(name);

    const facultyData = {
      name,
    };

    const toastId = toast.loading("Creating...");

    try {
      const res = (await addAcademicFaculty(facultyData)) as TResponse<any>;
      console.log(res);

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Col span={6}>
        <PHform
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHSelect label="Name" name="name" options={nameOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
