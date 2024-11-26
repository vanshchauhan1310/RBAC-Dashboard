"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export function SecuritySettings() {
  const [settings, setSettings] = useState({
    passwordMinLength: 8,
    requireSpecialChar: true,
    requireNumber: true,
    twoFactorAuth: false,
    sessionTimeout: 30,
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: name === "passwordMinLength" || name === "sessionTimeout" ? parseInt(value) : value }))
  }

  const handleSwitchChange = (name: string) => {
    setSettings(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Security settings updated:", settings)
    toast({
      title: "Security Settings Updated",
      description: "Your changes have been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Security Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
          <Input
            id="passwordMinLength"
            name="passwordMinLength"
            type="number"
            min="6"
            max="20"
            value={settings.passwordMinLength}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="requireSpecialChar"
            checked={settings.requireSpecialChar}
            onCheckedChange={() => handleSwitchChange("requireSpecialChar")}
          />
          <Label htmlFor="requireSpecialChar">Require Special Character</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="requireNumber"
            checked={settings.requireNumber}
            onCheckedChange={() => handleSwitchChange("requireNumber")}
          />
          <Label htmlFor="requireNumber">Require Number</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="twoFactorAuth"
            checked={settings.twoFactorAuth}
            onCheckedChange={() => handleSwitchChange("twoFactorAuth")}
          />
          <Label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
          <Input
            id="sessionTimeout"
            name="sessionTimeout"
            type="number"
            min="5"
            max="120"
            value={settings.sessionTimeout}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit">Save Security Settings</Button>
      </form>
    </div>
  )
}

