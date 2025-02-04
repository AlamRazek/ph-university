import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

import { toast } from "sonner";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academmicManagement.api";
import { semesterStatusOptions } from "../../../constant/semester";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();

  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      console.log("API Response:", res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
        console.error("Error Details:", res.error);
      } else {
        toast.success("Semester Created", { id: toastId });
      }
    } catch (err) {
      console.error("Request failed:", err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center" style={{ height: "200vh" }}>
      <Col span={6}>
        <PHform onSubmit={onSubmit}>
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />

          <PHInput type="text" name="minCredit" label="Min Credit" />
          <PHInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
