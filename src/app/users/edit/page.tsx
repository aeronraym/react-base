import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { Form } from "../../../components/Form";
import { useApiMutation, useFetchQuery } from "../../../hooks/api";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
interface Permission {
  resourceId: string;
  actions: string;
}

interface EditUserRequest {
  userId: string;
  roleId: string;
  updatedBy: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  permissions: Permission[];
}

interface EditUserResponse {
  id: string;
}

const EditUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const auth = useAuth();

  const [form, setForm] = useState<EditUserRequest>({
    updatedBy: auth.user?.id ?? "",
    userId: id ?? "",
    roleId: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    permissions: [],
  });

  const { data, isLoading } = useFetchQuery<EditUserRequest>(id ? `/User/${id}` : null);

  useEffect(() => {
    if (data) {
      setForm({
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        email: data.email ?? "",
        username: data.username ?? "",
        permissions: data.permissions ?? [],
        userId: data.userId ?? "",
        roleId: data.roleId ?? "",
        updatedBy: auth.user?.id ?? ""
      });
    }
  }, [data]);

  const { mutateAsync, isIdle, error } = useApiMutation<EditUserResponse, EditUserRequest>(
    "/role",
    "PUT",
    {
      onSuccess(data) {
        toast.success(`User updated successfully with id ${data.id}`);
        navigate("/admin/users");
      }
    }
  );

  if (error) {
    toast.error(error.title ?? "An error occurred");
    console.log(error);
  }

  // Move loading check here, after all hooks
  if (isLoading) return <div>Loading...</div>;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", form);
    // Check if form is valid before submitting
    if (isIdle) {
      mutateAsync({ ...form });
    }
  };

  return (
    <Form onSubmit={onSubmit} >
      <Form.Header
        title="User Profile"
        description="This information will be displayed publicly so be careful what you share."
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
          placeholder="member@localhost.com"
          type="email"
          name="email"
          autoComplete="off"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        />
        <TextInput
          id="username"
          label="Username"
          required
          placeholder="Juan123"
          type="text"
          name="username"
          autoComplete="off"
          value={form.username}
          onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
        />
      </Form.Section>
      <Form.Section>
        <Button
          type="submit"
          className={!isIdle ? "cursor-not-allowed opacity-50" : ""}
        >
          Update User
        </Button>
      </Form.Section>
    </Form>
  );
};

export default EditUserPage;

// Note: The "unique key" warning is likely from a list rendered in Layout or a component it uses, not from this file.
