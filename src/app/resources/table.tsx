import { Table } from "../../components/Table";
import Link from "../../components/ButtonLink";
import Pagination from "../../components/Pagination";
import Card from "../../components/Card";
import { PaginatedResponse } from "../../types/result";
import { Resource } from "./types";

const ResourcesTable = ({
  data,
  isLoading,
  page,
  setPage,
}: {
  data: PaginatedResponse<Resource>;
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
          <Card.Body>Total number of resources</Card.Body>
        </Card>
      </div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-white">Resources</h1>
          <p className="mt-2 text-sm text-gray-300">A list of all the resources in the system.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link href="/admin/resources/create">New Resource</Link>
        </div>
      </div>
      <Table.Container>
        {isLoading ? (
          <Table.Loading />
        ) : (
          <Table>
            <Table.Header>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Route</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>
                <span className="sr-only">Edit</span>
              </Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {data?.data.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.route}</Table.Cell>
                  <Table.Cell>{user.description}</Table.Cell>
                  <Table.Cell className="font-medium text-right">
                    <a href="#" className="text-gray-300 hover:text-white">
                      Edit<span className="sr-only">, {user.name}</span>
                    </a>
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


export default ResourcesTable;
