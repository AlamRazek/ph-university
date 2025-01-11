import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";

import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constant/gloval";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5, 6].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = nameOptions[Number(data?.name) - 1]?.label;

    const semisterData = {
      name,
      code: data.name,
      year: data.year,
    };
    console.log(semisterData);
  };

  const academicSemesterSchema = z.object({
    name: z.string({ required_error: "Please select a Name" }),
    name: z.string({ required_error: "Please select a Year" }),
    name: z.string({ required_error: "Please select a Start Month" }),
    name: z.string({ required_error: "Please select a End Month" }),
  });

  return (
    <Flex justify="center" align="center" style={{ height: "200vh" }}>
      <Col span={6}>
        <PHform
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name="name" options={nameOptions} />
          <PHSelect label="Year" name="Year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />

          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
