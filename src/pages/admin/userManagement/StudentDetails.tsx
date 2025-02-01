import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  //  console.log(param);

  return (
    <div>
      <h1>StudentDetails of {studentId}</h1>
    </div>
  );
};

export default StudentDetails;
