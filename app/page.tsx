"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import { Header } from "../components/components/header"
import { Sidebar } from "../components/components/sidebar"
import { UserManagement } from "../components/components/user-management"
import { RoleManagement } from "../components/components/role-management"
import { Dashboard } from "../components/components/dashboard"
import { AuditLogs } from "../components/components/audit-logs"
import { GeneralSettings } from "../components/components/general-settings"
import { SecuritySettings } from "../components/components/security-settings"
import { HelpDocumentation } from "../components/components/help-documentation"

export default function RBACDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto bg-background p-6">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "users" && <UserManagement />}
            {activeTab === "roles" && <RoleManagement />}
            {activeTab === "logs" && <AuditLogs />}
            {activeTab === "settings" && <GeneralSettings />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "help" && <HelpDocumentation />}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

