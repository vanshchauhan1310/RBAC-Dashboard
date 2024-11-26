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
import { UserForm } from "./user-form" 
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

const initialUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
]

export function UserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const { toast } = useToast()

  useEffect(() => {
    let result = users
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (roleFilter !== "All") {
      result = result.filter(user => user.role === roleFilter)
    }
    if (statusFilter !== "All") {
      result = result.filter(user => user.status === statusFilter)
    }
    setFilteredUsers(result)
  }, [users, searchTerm, roleFilter, statusFilter])

  const handleEdit = (
user) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id))
    toast({
      title: "User Deleted",
      description: "The user has been successfully removed.",
    })
  }

  const handleSubmit = (userData) => {
    if (editingUser) {
      setUsers(users.map((user) => (user.id === editingUser.id ? { ...userData, id: editingUser.id } : user)))
      toast({
        title: "User Updated",
        description: "The user information has been successfully updated.",
      })
    } else {
      setUsers([...users, { ...userData, id: Date.now().toString() }])
      toast({
        title: "User Added",
        description: "A new user has been successfully added to the system.",
      })
    }
    setIsModalOpen(false)
    setEditingUser(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden sm:table-cell">Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                <TableCell className="hidden sm:table-cell">{user.role}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "Active" ? "success" : "destructive"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      {isModalOpen && (
        <UserForm
          user={editingUser}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingUser(null)
          }}
        />
      )}
    </div>
  )
}

