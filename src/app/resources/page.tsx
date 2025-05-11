import { usePaginatedQuery } from "../../hooks/api";
import ResourcesTable from "./table";
import { Resource } from "./types";

const Resources = () => {
  const { data, isLoading, page, setPage } = usePaginatedQuery<Resource>("/Resource");

  return (
      <ResourcesTable
        data={data}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
      />
  );
};

export default Resources;
