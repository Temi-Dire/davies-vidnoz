import toast from "react-hot-toast";

// Helper function to handle 403 errors
const handleForbiddenError = (auth_token: string | null, reset: () => void) => {
  if (auth_token) {
    toast.error('Please login again');
    reset();
    window.location.reload();
  }
};

export { handleForbiddenError }