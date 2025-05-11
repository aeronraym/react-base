/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Fieldset } from "@headlessui/react";
import { useAuth } from "../../contexts/AuthContext";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the intended destination from state, or default to dashboard
  const from = location.state?.from || "/admin/dashboard";

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const result = await login(username, password);
      
      if (result) {
        // Navigate to the page they tried to access or dashboard
        navigate(from, { replace: true });
      } else {
        setError("Invalid username or password");
        // Open error dialog
        setIsOpen(true);
      }
    } catch (error:any) {
        console.log(error);
        setError("An error occurred during login. Please try again.");
        setIsOpen(true);
    } finally {
        setIsLoading(false);
    }
  };
  if(isLoading) return <div>Loading...</div>
  
  return (
    // Added a wrapper div for full height and width centering
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--background-color)] text-[var(--text-color)]">
      <Modal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        title="Login failed" 
        subtitle="While signing your account, we encounter the following error"
        description={error}  
      />
      
      
      {/* Form is now properly centered while preserving original markup */}
      <form onSubmit={handleSubmit} className="w-full max-w-md px-4">
          <Fieldset className="space-y-4">
              <TextInput label="Username" id="username" onChange={(e) => setUsername(e.target.value)} />
              <TextInput label="Password" id="username" type="password" onChange={(e) => setPassword(e.target.value)} />
              <Button>Sign in</Button>
          </Fieldset>
      </form>
    </div>
  );
}

export default LoginPage;