"use client"

import { useState } from "react"
import { PlusIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { RoleForm } from "./role-form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { useRoleContext } from "@/contexts/RoleContext"

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export function RoleManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | undefined>(undefined)
  const { toast } = useToast()
  const { roles, addRole, updateRole, deleteRole } = useRoleContext()

  const handleEdit = (role: Role) => {
    setEditingRole(role)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    deleteRole(id)
    toast({
      title: "Role Deleted",
      description: "The role has been successfully removed.",
    })
  }

  const handleSubmit = (roleData: Omit<Role, 'id'>) => {
    if (editingRole) {
      updateRole(editingRole.id, { ...roleData, id: editingRole.id })
      toast({
        title: "Role Updated",
        description: "The role has been successfully updated.",
      })
    } else {
      addRole({ ...roleData, id: Date.now().toString() })
      toast({
        title: "Role Added",
        description: "A new role has been successfully added.",
      })
    }
    setIsModalOpen(false)
    setEditingRole(undefined)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Role Management</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Role
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  {role.permissions.map((permission) => (
                    <Badge key={permission} className="mr-1">
                      {permission}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(role)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(role.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      {isModalOpen && (
        <RoleForm
          role={editingRole}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingRole(undefined)
          }}
        />
      )}
    </div>
  )
}

