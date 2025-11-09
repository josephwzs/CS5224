import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";

interface CaseData {
  title: string;
  description: string;
  risk: string;
  status: string;
  assignee: string;
}

interface CaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit" | "view";
  case_?: any;
  onSave: (data: CaseData) => void;
}

export function CaseDialog({
  open,
  onOpenChange,
  mode,
  case_,
  onSave,
}: CaseDialogProps) {
  const [formData, setFormData] = useState<CaseData>({
    title: "",
    description: "",
    risk: "Medium",
    status: "Open",
    assignee: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (case_) {
      setFormData({
        title: case_.title,
        description: case_.description,
        risk: case_.risk,
        status: case_.status,
        assignee: case_.assignee,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        risk: "Medium",
        status: "Open",
        assignee: "",
      });
    }
  }, [case_, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const isViewMode = mode === "view";

  const handleOpenDetailPage = () => {
    if (case_) {
      navigate(`/cases/${case_.id}`);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Create New Case"
              : mode === "edit"
                ? "Edit Case"
                : "Case Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new risk case to the system"
              : mode === "edit"
                ? "Update the case information"
                : "View case details and information"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {case_ && (
              <div className="space-y-2">
                <Label>Case ID</Label>
                <Input value={case_.id} disabled />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter case title"
                required
                disabled={isViewMode}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter detailed description of the case"
                rows={4}
                required
                disabled={isViewMode}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="risk">Risk Level *</Label>
                <Select
                  value={formData.risk}
                  onValueChange={(value) =>
                    setFormData({ ...formData, risk: value })
                  }
                  disabled={isViewMode}
                >
                  <SelectTrigger id="risk">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                  disabled={isViewMode}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee *</Label>
              <Input
                id="assignee"
                value={formData.assignee}
                onChange={(e) =>
                  setFormData({ ...formData, assignee: e.target.value })
                }
                placeholder="Enter assignee name"
                required
                disabled={isViewMode}
              />
            </div>
            {case_ && (
              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="space-y-2">
                  <Label>Created</Label>
                  <Input value={case_.createdAt} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Last Updated</Label>
                  <Input value={case_.updatedAt} disabled />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            {isViewMode && case_ && (
              <Button
                type="button"
                variant="outline"
                onClick={handleOpenDetailPage}
                className="gap-2 bg-transparent"
              >
                <ExternalLink className="h-4 w-4" />
                Open Detail Page
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {isViewMode ? "Close" : "Cancel"}
            </Button>
            {!isViewMode && (
              <Button type="submit">
                {mode === "create" ? "Create Case" : "Save Changes"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
