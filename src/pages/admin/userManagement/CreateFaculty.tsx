import { Row, Col, Divider, Button } from "antd";
import PHform from "../../../components/form/PHform";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { bloodGroupOptions, genderOptions } from "../../../constant/gloval";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academmicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

const CreateFaculty = () => {
  const [addFaculty] = useAddFacultyMutation();

  const { data: dData, isLoading: dIsLoading } =
    useGetAllDepartmentQuery(undefined);

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const facultyData = {
      password: "faculty123",
      faculty: data,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(facultyData));
    // addFaculty(formData);
    // toast.success("Event has been created");

    try {
      const response = await addFaculty(formData).unwrap(); // Ensure API call completes
      toast.success("Faculty has been created successfully!"); // Show toast after success
      console.log("Faculty added:", response);
    } catch (error) {
      console.error("Error adding faculty:", error);
      toast.error("Failed to create faculty"); // Show error toast if API call fails
    }
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <PHform onSubmit={onSubmit}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloogGroup"
                label="Blood Group"
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="designation" label="Designation" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
