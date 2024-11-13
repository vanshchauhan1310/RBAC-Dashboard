"use client"

import { useState, useEffect } from "react"
import { PlusIcon, SearchIcon } from 'lucide-react'
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
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const initialRoles = [
  {
    id: "1",
    name: "Admin",
    permissions: [
      { name: "Create", enabled: true },
      { name: "Read", enabled: true },
      { name: "Update", enabled: true },
      { name: "Delete", enabled: true },
    ],
  },
  {
    id: "2",
    name: "Editor",
    permissions: [
      { name: "Create", enabled: true },
      { name: "Read", enabled: true },
      { name: "Update", enabled: true },
      { name: "Delete", enabled: false },
    ],
  },
  {
    id: "3",
    name: "Viewer",
    permissions: [
      { name: "Create", enabled: false },
      { name: "Read", enabled: true },
      { name: "Update", enabled: false },
      { name: "Delete", enabled: false },
    ],
  },
]

export function RoleManagement() {
  const [roles, setRoles] = useState(initialRoles)
  const [filteredRoles, setFilteredRoles] = useState(roles)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const result = roles.filter(role =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredRoles(result)
  }, [roles, searchTerm])

  const handleEdit = (role) => {
    setEditingRole(role)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    setRoles(roles.filter((role) => role.id !== id))
    toast({
      title: "Role Deleted",
      description: "The role has been successfully removed.",
    })
  }


  const handleSubmit = (roleData) => {
    if (editingRole) {
      setRoles(roles.map((role) => (role.id === editingRole.id ? { ...roleData, id: editingRole.id } : role)))
      toast({
        title: "Role Updated",
        description: "The role has been successfully updated.",
      })
    } else {
      setRoles([...roles, { ...roleData, id: Date.now().toString() }])
      toast({
        title: "Role Added",
        description: "A new role has been successfully added to the system.",
      })
    }
    setIsModalOpen(false)
    setEditingRole(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Role Management</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Role
        </Button>
      </div>
      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead className="hidden sm:table-cell">Permissions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {role.permissions.map((permission) => (
                    <Badge
                      key={permission.name}
                      variant={permission.enabled ? "success" : "secondary"}
                      className="mr-1 mb-1"
                    >
                      {permission.name}
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
            setEditingRole(null)
          }}
        />
      )}
    </div>
  )
}

