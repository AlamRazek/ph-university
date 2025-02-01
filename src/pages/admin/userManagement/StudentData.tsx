import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Modal,
} from "antd";

import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import {
  useBlockStudentMutation,
  useGetAllStudentsQuery,
} from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";

export type TTAbleData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo"
>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );

  console.log(selectedStudentId);

  const [blockStudent, { isLoading: isBlocking }] = useBlockStudentMutation();

  const showModal = (studentId: string) => {
    setSelectedStudentId(studentId);
    setIsModalOpen(true);
  };

  const handleOk = async (id: string) => {
    if (!selectedStudentId) return;

    try {
      await blockStudent({ id, status: "blocked" }).unwrap(); // API Call to block student
      console.log("Student blocked successfully!");
    } catch (error) {
      console.log(error.data.message, "Failed to block student.");
    }

    setIsModalOpen(false);
    setSelectedStudentId(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedStudentId(null);
  };

  const {
    data: StudentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "limit", value: 3 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const tableData = StudentData?.data?.map(
    ({ _id, fullName, id, email, contactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const metaData = StudentData?.meta;

  const columns: TableColumnsType<TTAbleData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },

    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        //   console.log(item);

        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <div>
              <Button type="primary" danger onClick={() => showModal(item.key)}>
                Block
              </Button>
              <Modal
                title="Block?"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>The student will be blocked.</p>
              </Modal>
            </div>
          </Space>
        );
      },
      width: "10%",
    },
  ];

  const onChange: TableProps<TTAbleData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentData;
