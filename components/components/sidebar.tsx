import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserIcon, ShieldCheckIcon, XIcon, LayoutDashboardIcon, SettingsIcon, FileTextIcon, AlertCircleIcon, HelpCircleIcon } from 'lucide-react'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab: string
  setActiveTab: (tab: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function Sidebar({ className, activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden",
          isOpen ? "block" : "hidden"
        )}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out md:sticky md:block",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          className
        )}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <XIcon className="h-6 w-6" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Dashboard
              </h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "dashboard" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("dashboard")
                    setIsOpen(false)
                  }}
                >
                  <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "users" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("users")
                    setIsOpen(false)
                  }}
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  User Management
                </Button>
                <Button
                  variant={activeTab === "roles" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("roles")
                    setIsOpen(false)
                  }}
                >
                  <ShieldCheckIcon className="mr-2 h-4 w-4" />
                  Role Management
                </Button>
                <Button
                  variant={activeTab === "logs" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("logs")
                    setIsOpen(false)
                  }}
                >
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  Audit Logs
                </Button>
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Settings
              </h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("settings")
                    setIsOpen(false)
                  }}
                >
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  General Settings
                </Button>
                <Button
                  variant={activeTab === "security" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("security")
                    setIsOpen(false)
                  }}
                >
                  <AlertCircleIcon className="mr-2 h-4 w-4" />
                  Security
                </Button>
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Support
              </h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "help" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("help")
                    setIsOpen(false)
                  }}
                >
                  <HelpCircleIcon className="mr-2 h-4 w-4" />
                  Help & Documentation
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  )
}

