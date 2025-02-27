import {
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Loader from "@/components/Shared/Loader/Loader";

interface LoadingContextType {
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Automatically hide loader after a minimum display time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Minimum 1.5 seconds display time

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50">
          <Loader />
        </div>
      )}
      <div className={isLoading ? "hidden" : "block"}>{children}</div>
    </LoadingContext.Provider>
  );
};
