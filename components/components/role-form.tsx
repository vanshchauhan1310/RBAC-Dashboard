import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface RoleFormProps {
  role: Role | null
  onSubmit: (role: RoleWithoutId) => void
  onCancel: () => void
}

export function RoleForm({ role, onSubmit, onCancel }: RoleFormProps) {
  const [name, setName] = useState(role?.name || "")
  const [permissions, setPermissions] = useState<Permission[]>(
    role?.permissions || [
      { name: "Create", enabled: false },
      { name: "Read", enabled: false },
      { name: "Update", enabled: false },
      { name: "Delete", enabled: false },
    ]
  )

  useEffect(() => {
    if (role) {
      setName(role.name)
      setPermissions(role.permissions)
    }
  }, [role])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, permissions })
  }

  const handlePermissionChange = (permissionName: string) => {
    setPermissions(
      permissions.map((p) =>
        p.name === permissionName ? { ...p, enabled: !p.enabled } : p
      )
    )
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{role ? "Edit Role" : "Add New Role"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Role Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Permissions</Label>
            <div className="space-y-2">
              {permissions.map((permission) => (
                <div key={permission.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission.name}
                    checked={permission.enabled}
                    onCheckedChange={() => handlePermissionChange(permission.name)}
                  />
                  <Label htmlFor={permission.name}>{permission.name}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{role ? "Update" : "Add"} Role</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}



export interface Permission {
  name: string;
  enabled: boolean;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export type RoleWithoutId = Omit<Role, 'id'>;


