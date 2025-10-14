import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Mail, Shield, Trash2 } from "lucide-react";
import { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "pending";
  joinedDate: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@agency.com",
    role: "admin",
    status: "active",
    joinedDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@agency.com",
    role: "editor",
    status: "active",
    joinedDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@agency.com",
    role: "viewer",
    status: "pending",
    joinedDate: "2025-01-10",
  },
];

export function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    email: "",
    role: "viewer" as "admin" | "editor" | "viewer",
  });

  const handleInviteMember = () => {
    if (!newMember.email) return;

    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.email.split("@")[0],
      email: newMember.email,
      role: newMember.role,
      status: "pending",
      joinedDate: new Date().toISOString().split("T")[0],
    };

    setTeamMembers([...teamMembers, member]);
    setNewMember({ email: "", role: "viewer" });
    setIsDialogOpen(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-destructive/10 text-destructive";
      case "editor":
        return "bg-primary/10 text-primary";
      case "viewer":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "admin":
        return "Full access to all features and settings";
      case "editor":
        return "Can create and schedule posts, view analytics";
      case "viewer":
        return "Read-only access to analytics and reports";
      default:
        return "";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Team Members</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your team's access and permissions
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="w-4 h-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  placeholder="colleague@agency.com"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={newMember.role} onValueChange={(v: any) => setNewMember({ ...newMember, role: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Viewer</span>
                        <span className="text-xs text-muted-foreground">
                          Read-only access
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="editor">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Editor</span>
                        <span className="text-xs text-muted-foreground">
                          Can create and schedule posts
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Admin</span>
                        <span className="text-xs text-muted-foreground">
                          Full access
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {getRoleDescription(newMember.role)}
                </p>
              </div>

              <Button onClick={handleInviteMember} className="w-full">
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role Permissions Info */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg space-y-2">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Role Permissions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div>
            <p className="font-medium text-destructive">Admin</p>
            <p className="text-muted-foreground">All permissions + billing</p>
          </div>
          <div>
            <p className="font-medium text-primary">Editor</p>
            <p className="text-muted-foreground">Create, schedule, analytics</p>
          </div>
          <div>
            <p className="font-medium">Viewer</p>
            <p className="text-muted-foreground">View reports only</p>
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="space-y-3">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border rounded-lg hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{member.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-2 truncate">
                  <Mail className="w-3 h-3 flex-shrink-0" />
                  {member.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                  member.role
                )}`}
              >
                {member.role}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  member.status === "active"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {member.status}
              </span>
              {member.role !== "admin" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <p className="text-sm">
          <span className="font-medium">💡 Pro Tip:</span> Editors can help manage your content workflow
          while viewers can access analytics for reporting purposes.
        </p>
      </div>
    </Card>
  );
}
