import { toast } from "react-toastify";
import { PaginatedResponse, QueryObject, useApiMutation, usePaginatedQuery } from "../../../hooks/api";
import { Form } from "../../../components/Form";
import TextInput from "../../../components/TextInput";
import TextArea from "../../../components/Textarea";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import PermissionsTable from "../../../components/advanced/PermissionsTable";
import { Resource } from "../../resources/types";
import { Permission } from "../../../types/basetype";
import { useState } from "react";
import { Query } from "@tanstack/react-query";

interface CreateRoleResponse {
    id: string;
}
interface CreateRoleRequest {
    name: string;
    description: string;
}

const CreateRolePage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<CreateRoleRequest>({
      name: "",
      description: "",
    });
      const [permissions, setPermissions] = useState< Permission[]>([]); // Store selected permissions
      
      const permissionsQuery = usePaginatedQuery<Permission>("/Permission", [{key: "roleId", value: "0"}] as QueryObject[]);   

      const resourceQuery = usePaginatedQuery<Resource>("/Resource");

      const { mutateAsync, isIdle, error } = useApiMutation<CreateRoleResponse, CreateRoleRequest>(
        "/auth/register",
        "POST",
        {
          onSuccess() {
            toast.success("Role created successfully");
            navigate("/admin/users"); // Redirect to users page
          }
        }
      );

      if(error){
        toast.error(error.title ?? "An error occurred");
        console.log(error);
      }
      

      const onSubmit = () => {
        if (isIdle) {
            mutateAsync({ ...form });
          }
      }
    return ( 
        <Form onSubmit={onSubmit} >
           <Form.Header  title="Roles" description="Create a role with default permissions"  />
           <Form.Section>
                <TextInput             
                id="name"
                label="Name"
                placeholder=""
                type="text"
                name="name"
                autoComplete="off"
                required
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} 
                />
                <TextArea             
                id="description"
                rows={4}
                label="Description"
                placeholder=""
                type="text"
                name="description"
                autoComplete="off"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} 
                />
               
           </Form.Section>
           <Form.Section className="w-full">
            {/* Permissions */}
             <PermissionsTable 
                isLoading={permissionsQuery.isLoading}
                data={permissionsQuery.data}
                page={resourceQuery.page}
                setPage={resourceQuery.setPage}
             />
           </Form.Section>
           <Form.Section>
                <Button
                type="submit"
                className={!isIdle ? "cursor-not-allowed opacity-50" : ""}>
                    Create Role
                </Button>
            </Form.Section>
        </Form>
     );
}
 
export default CreateRolePage;