import {  Dialog, DialogPanel, DialogTitle, Fieldset, Input, Label, Select } from "@headlessui/react";
import { Resource } from "../../app/resources/types";
import { Table } from "../Table";
import Pagination from "../Pagination";
import { ComboBoxData, Permission } from "../../types/basetype";
import Button from "../Button";
import { useState } from "react";
import { useFetchQuery } from "../../hooks/api";
import NewComboBox from "../ComboBox";

interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

const PermissionsTable = ({
    data,
    isLoading,
    page,
    setPage
  }: {
    data: PaginatedResponse<Permission>;
    isLoading: boolean;
    page: number;
    setPage: (page: number) => void;
  }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onNext = () => {
    if (page < data?.totalPages) setPage(page + 1);
  };
  const resourceQuery = useFetchQuery<Resource[]>("/Resource/list");
  const resouceComboBoxData = resourceQuery.data?.map((res) => ({
    id: res.id,
    value: res.name,
  })) as ComboBoxData[];

  const onPrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const actions = [
      { name: "Read-Only", value: "View" },
      { name: "Read-Write", value: "Create,View" },
      { name: "Read-Write-Update", value: "Create,View,Update" },
      { name: "Full", value: "Create,Update,Delete,View"}
  ];
  const onChangeOfPermissions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // handle permission change here
  };

  return (
    <>
    <Fieldset className="sm:col-span-4">
        <Label className="mb-3">Permissions</Label>
         
        <div className="flex items-center gap-2 mb-4 align-baseline">
          <div className="flex-grow p-0 h-full">
            <Input
              id="search"
              placeholder="Search"
              type="text"
              name="search"
              autoComplete="off"
              className="bg-white/8 text-white rounded px-2 py-1 focus:outline-none w-full"
            />
          </div>
          <Button 
            type="button" 
            onClick={() => setIsDialogOpen(true)}
            className="shrink-0 whitespace-nowrap">Add Permissions
          </Button>
        </div>
          <Table.Container>
        {isLoading ? (
          <Table.Loading />
        ) : (
          <Table>
            <Table.Header>
              <Table.HeaderCell>Resource</Table.HeaderCell>
              <Table.HeaderCell>Grant</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {data?.data.map((p) => (
                <Table.Row key={p.id}>
                <Table.Cell>{p.resourceName}</Table.Cell>
                <Table.Cell> 
                    <Select
                        onChange={onChangeOfPermissions}
                        className="text-black bg-white rounded px-2 py-1 focus:outline-none"
                        name="status"
                        aria-label="Grant"
                        style={{ minWidth: 120 }}
                    >
                    {actions.map((action) => (
                        <option
                            key={action.value}
                            value={action.value}
                            style={{
                                color: "#000",
                                background: "#fff"
                            }}
                            selected={action.value === p.actions}>
                            {action.name}
                        </option>
                    ))}
                    </Select>
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
      </Fieldset>
      <Dialog open={isDialogOpen} as="div" className="" onClose={() => setIsDialogOpen(false)}>
        {/* Overlay */}
        <div className="dialog-overlay" aria-hidden="true" />

        {/* Panel Container */}
        <div className="dialog-panel-container">
          {/* Dialog Panel */}
          <DialogPanel className="dialog-panel">
            <DialogTitle as="h3" className="dialog-title">
              Add Permission
            </DialogTitle>
            <p className="dialog-subtitle">specify a resource and grant type</p>
            <div className="mt-2">
              <Fieldset className="flex flex-col gap-4 border-0 p-0 m-0">
                <NewComboBox
                  label="Resource"
                  data={resouceComboBoxData ? resouceComboBoxData : []}
                />
                <NewComboBox
                  label="Grant type"
                  data={actions.map((action) => ({
                    id: action.value,
                    value: action.name,
                  })) as ComboBoxData[]}
                />
              </Fieldset>
            </div>
            <div className="flex mt-4 gap-5 justify-end">
              <button className="button px-5" onClick={() => setIsDialogOpen(false)}>Save</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    
    </>
    
  );
};

export default PermissionsTable;