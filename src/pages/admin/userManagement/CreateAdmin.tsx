import { Row, Col, Divider, Button } from "antd";
import PHform from "../../../components/form/PHform";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { bloodGroupOptions, genderOptions } from "../../../constant/gloval";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

const CreateAdmin = () => {
  const [addAdmin] = useAddAdminMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const adminData = {
      password: "admin1234",
      admin: data,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(adminData));

    try {
      const response = await addAdmin(formData).unwrap(); // Ensure API call completes
      toast.success("Admin has been created successfully!"); // Show toast on success
      console.log("Admin added:", response);
    } catch (error) {
      console.error("Error adding admin:", error);
      toast.error("Failed to create admin"); // Show toast on failure
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
          <Divider>Designation</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="designation" label="Designation" />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
