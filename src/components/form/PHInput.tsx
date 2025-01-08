import { Controller } from "react-hook-form";

type tInputProps = {
  type: string;
  name: string;
  label: string;
};

const PHInput = ({ type, name, label }: tInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div> {label ? label : null}</div>
      <Controller
        name={name}
        render={({ field }) => <input {...field} type={type} id={name} />}
      />
    </div>
  );
};

export default PHInput;
