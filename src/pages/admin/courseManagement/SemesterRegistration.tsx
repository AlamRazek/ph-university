import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";

import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constant/gloval";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagementSchema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academmicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

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

const SemesterRegistration = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const name = nameOptions[Number(data?.name) - 1]?.label;

    const toastId = toast.loading("Creating...");

    const semisterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semisterData);

    // try {
    //   const res = (await addAcademicSemester(semisterData)) as TResponse<any>;
    //   if (res.error) {
    //     toast.error(res.error.data.message, { id: toastId });
    //   } else {
    //     toast.success("Semester Created", { id: toastId });
    //   }
    // } catch (err) {
    //   toast.error("Something went wrong", { id: toastId });
    // }
  };

  return (
    <Flex justify="center" align="center" style={{ height: "200vh" }}>
      <Col span={6}>
        <PHform
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name="name" options={nameOptions} />

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

export default SemesterRegistration;
