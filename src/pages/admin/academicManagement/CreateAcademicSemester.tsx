import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";

import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHform onSubmit={onSubmit}>
          <PHSelect label="Name" name="name" />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
