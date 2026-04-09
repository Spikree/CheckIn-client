import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageBreadcrumbsProps {
  currentPage: string;
}

export default function PageBreadcrumbs({ currentPage }: PageBreadcrumbsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 mb-6">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
        onClick={() => navigate(-1)}
        title="Go back"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <h1 className="text-xl font-semibold tracking-tight text-foreground truncate">
        {currentPage}
      </h1>
    </div>
  );
}
