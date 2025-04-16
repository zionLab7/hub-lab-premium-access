
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
}

const EmptyState = ({ icon, title, description, buttonText, onClick }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-muted mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      {buttonText && onClick && (
        <Button onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
