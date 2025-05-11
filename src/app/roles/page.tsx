import { usePaginatedQuery } from "../../hooks/api";
import RolesTable from "./table";
import { Role } from "./types";
const Roles = () => {
  const { data, isLoading, page, setPage } = usePaginatedQuery<Role>("/Role");

  return (
      <RolesTable
        data={data}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
      />
  );
};

export default Roles;