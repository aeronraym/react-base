import { Table } from "../../components/Table";
import Pagination from "../../components/Pagination";
import Card from "../../components/Card";
// import ButtonLink  from "../../components/ButtonLink";
import { Link } from "react-router-dom";
import ButtonLink from "../../components/ButtonLink";

interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
}

const UsersTable = ({
  data,
  isLoading,
  page,
  setPage,
}: {
  data: PaginatedResponse<User>;
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
}) => {
  const onNext = () => {
    if (page < data?.totalPages) setPage(page + 1);
  };

  const onPrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      <div className="flex mb-4">
        <Card>
          <Card.Title>{data?.totalCount ?? 0}</Card.Title>
          <Card.Body>Total number of Users</Card.Body>
        </Card>
      </div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-white">Users</h1>
          <p className="mt-2 text-sm text-gray-300">A list of all the users in your account.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <ButtonLink href={"/admin/users/create"}>New User</ButtonLink>
        </div>
      </div>
      <Table.Container>
        {isLoading ? (
          <Table.Loading />
        ) : (
          <Table>
            <Table.Header>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>
                <span className="sr-only">Edit</span>
              </Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {data?.data.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell className="font-medium text-right">
                    <Link to={`/admin/users/${user.id}/edit`} className="text-gray-300 hover:text-white">
                      Edit<span className="sr-only">, {user.id}</span>
                    </Link>
                    
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </Table.Container>
      <Pagination
        page={page}
        totalPages={data?.totalPages}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </div>
  );
};

export default UsersTable;
