import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";

import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

const nameOptions = [
  {
    value: "01",
    label: "Autumn",
  },
  {
    value: "02",
    label: "Summer",
  },
  {
    value: "03",
    label: "Fall",
  },
];

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = nameOptions[Number(data.name) - 1].label;

    const semisterData = {
      name,
      code: data.name,
    };
    console.log(semisterData);
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Col span={6}>
        <PHform onSubmit={onSubmit}>
          <PHSelect label="Name" name="name" options={nameOptions} />
          <PHSelect label="Year" name="Year" options={nameOptions} />
          <PHSelect
            label="Start Month"
            name="Start Month"
            options={nameOptions}
          />
          <PHSelect label="End Month" name="End Month" options={nameOptions} />

          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
