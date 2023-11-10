import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Role } from "@/contexts/RoleContext"

interface RoleFormProps {
  role?: Role
  onSubmit: (roleData: Omit<Role, 'id'>) => void
  onCancel: () => void
}

const availablePermissions = [
  { id: 'create', label: 'Create' },
  { id: 'read', label: 'Read' },
  { id: 'update', label: 'Update' },
  { id: 'delete', label: 'Delete' },
]

export function RoleForm({ role, onSubmit, onCancel }: RoleFormProps) {
  const [formData, setFormData] = useState<Omit<Role, 'id'>>({
    name: role?.name || '',
    permissions: role?.permissions || [],
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handlePermissionChange = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId)
        : [...prev.permissions, permissionId],
    }))
    setErrors((prev) => ({ ...prev, permissions: '' }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Role name is required'
    }

    if (formData.permissions.length === 0) {
      newErrors.permissions = 'At least one permission must be selected'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    } else {
      toast({
        title: 'Validation Error',
        description: 'Please correct the errors in the form.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{role ? 'Edit Role' : 'Add Role'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Role Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="space-y-2">
              {availablePermissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission.id}
                    checked={formData.permissions.includes(permission.id)}
                    onCheckedChange={() => handlePermissionChange(permission.id)}
                  />
                  <Label htmlFor={permission.id}>{permission.label}</Label>
                </div>
              ))}
            </div>
            {errors.permissions && (
              <p className="text-sm text-red-500">{errors.permissions}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{role ? 'Update' : 'Add'} Role</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

