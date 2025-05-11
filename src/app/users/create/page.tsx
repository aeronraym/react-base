import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { Form } from "../../../components/Form";
import { PaginatedResponse, useApiMutation, useFetchQuery, usePaginatedQuery } from "../../../hooks/api";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Role } from "../../roles/types";
import { Resource } from "../../resources/types";
import SelectInputSearch from "../../../components/SelectInputSearch";

interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  roleId?: string; // add roleId to form state
}

interface CreateUserResponse {
  id: string;
}

const CreateUserPage = () => {
  const navigate = useNavigate(); // React Router alternative to Next.js router

  const [form, setForm] = useState<CreateUserRequest>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    roleId: undefined,
  });

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch permissions for selected role
  const selectedRoleId = form.roleId;

  const resourceQuery = usePaginatedQuery<PaginatedResponse<Resource>>("/Resource");
  
  const roleQuery = useFetchQuery<Role[]>("/Role/list");

  const { mutateAsync, isIdle, error } = useApiMutation<CreateUserResponse, CreateUserRequest>(
    "/User",
    "POST",
    {
      onSuccess(data) {
        toast.success(`User created successfully with id ${data.id}`);
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
  };
  const roleOptions = useMemo(() => {
    if (!Array.isArray(roleQuery.data)) return [];

    return roleQuery.data.map(role => ({
      id: String(role.id),
      value: role.name
    }));
  }, [roleQuery.data]);

  return (
    <Form onSubmit={onSubmit} >
       <Form.Header
        title="Personal Information"
        description="personal details of the user"
      />
      <Form.Section>
       
        <TextInput
            id="firstName"
            label="First Name"
            placeholder="Juan"
            type="text"
            name="firstName"
            autoComplete="off"
            required
            value={form.firstName}
            onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
            />
        
         <TextInput
          id="lastName"
          label="Last Name"
          placeholder="Dela Cruz"
          type="text"
          name="lastName"
          autoComplete="off"
          value={form.lastName}
          required
          onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
        />
          <TextInput
          id="email"
          label="Email"
          required
          placeholder=""
          type="email"
          name="email"
          autoComplete="off"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        />
        
      </Form.Section>

      <Form.Header 
        title="Access" 
        description="User account, role and permissions"
        className="mt-5"
        />
      <Form.Section>
        <TextInput
          id="username"
          label="Username"
          required
          placeholder=""
          type="text"
          name="username"
          autoComplete="off"
          value={form.username}
          onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
        />
        <TextInput
          id="password"
          label="Password"
          required
          type="password"
          name="password"
          autoComplete="off"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
        />
        <SelectInputSearch 
          label="Role" 
          id="role" 
          required
          placeholder="Select a role"
          options={roleOptions} 
          isLoading={roleQuery.isLoading} 
          name="role"  
          value={form.roleId}
          onChange={(e) => setForm((prev) => ({ ...prev, roleId: e.target.value }))}
        />
  
       <a href="#" onClick={() => setIsDialogOpen(true)} className="underline sm:col-span-4 relative">View Permissions</a>
       
      </Form.Section>

      <Form.Section>
        <Button
          type="submit"
          className={!isIdle ? "cursor-not-allowed opacity-50" : ""}
        >
          Create User
        </Button>
      </Form.Section>
    </Form>
  );
};

export default CreateUserPage;
