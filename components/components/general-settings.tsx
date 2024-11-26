"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export function GeneralSettings() {
  const [settings, setSettings] = useState({
    siteName: "RBAC Dashboard",
    adminEmail: "admin@example.com",
    enableNotifications: true,
    enableAuditLogs: true,
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string) => {
    setSettings(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Settings updated:", settings)
    toast({
      title: "Settings Updated",
      description: "Your changes have been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">General Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="siteName">Site Name</Label>
          <Input
            id="siteName"
            name="siteName"
            value={settings.siteName}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="adminEmail">Admin Email</Label>
          <Input
            id="adminEmail"
            name="adminEmail"
            type="email"
            value={settings.adminEmail}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="enableNotifications"
            checked={settings.enableNotifications}
            onCheckedChange={() => handleSwitchChange("enableNotifications")}
          />
          <Label htmlFor="enableNotifications">Enable Notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="enableAuditLogs"
            checked={settings.enableAuditLogs}
            onCheckedChange={() => handleSwitchChange("enableAuditLogs")}
          />
          <Label htmlFor="enableAuditLogs">Enable Audit Logs</Label>
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  )
}

