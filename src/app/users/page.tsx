import UsersTable from "./table";
import { usePaginatedQuery } from "../../hooks/api";
import { User } from "./types";


const Users = () => {
  const { data, isLoading, page, setPage } = usePaginatedQuery<User>("/User");
  return (
    <div>
      <UsersTable
        data={data}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Users;
