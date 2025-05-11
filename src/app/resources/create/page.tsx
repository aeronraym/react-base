import React, { useState } from "react";
import { toast } from "react-toastify";
import { useApiMutation } from "../../../hooks/api";
import { Form } from "../../../components/Form";
import TextInput from "../../../components/TextInput";
import TextArea from "../../../components/Textarea";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { useAuth } from "../../../contexts/AuthContext";

interface CreateResourceResponse {
    id: string;
}
interface CreateResourceRequest {
    name: string;
    route: string;
    description: string;
    createdBy: string
}


const CreateResourcePage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
     const [form, setForm] = useState<CreateResourceRequest>({
        name: "",
        route: "",
        description: "",
        createdBy: auth.user?.id ?? ""
      });
    
      const { mutateAsync, isIdle, error } = useApiMutation<CreateResourceResponse, CreateResourceRequest>(
        "/resource",
        "POST",
        {
          onSuccess() {
            toast.success("Resource created successfully");
            navigate("/admin/resources"); // Redirect to users page
          },
        
        }
      );

      if(error){
        toast.error(error.title ?? "An error occurred");
        console.log(error);
      }


    const onSubmit = (e: React.FormEvent) => {
        console.log("Form submitted", form);
        e.preventDefault();
        if (isIdle) {
            mutateAsync({ ...form });
        }
    }
    return ( 
        <Form onSubmit={onSubmit} >
           <Form.Header  title="Resources" description="Create a resource with default permissions"  />
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
                <TextInput             
                id="route"
                label="Route"
                placeholder=""
                type="text"
                name="route"
                autoComplete="off"
                required
                value={form.route}
                onChange={(e) => setForm((prev) => ({ ...prev, route: e.target.value }))} 
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
           <Form.Section>
                <Button
                type="submit"
                className={!isIdle ? "cursor-not-allowed opacity-50" : ""}>
                    Create Resource
                </Button>
            </Form.Section>
        </Form>
     );
}
 
export default CreateResourcePage;