"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = [
  {
    question: "How do I create a new user?",
    answer: "To create a new user, navigate to the User Management page and click on the 'Add User' button. Fill in the required information and click 'Save'."
  },
  {
    question: "How do I assign roles to users?",
    answer: "In the User Management page, edit the user you want to assign a role to. In the edit form, you can select the appropriate role from the dropdown menu."
  },
  {
    question: "What are audit logs?",
    answer: "Audit logs keep track of all important actions performed in the system, such as user creations, role modifications, and login attempts. They are crucial for security and compliance purposes."
  },
  {
    question: "How can I enable two-factor authentication?",
    answer: "Two-factor authentication can be enabled in the Security Settings page. Toggle the switch for 'Enable Two-Factor Authentication' and follow the setup instructions."
  },
]

export function HelpDocumentation() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFAQ = faqData.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Help & Documentation</h2>
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search documentation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>Contact Support</Button>
      </div>
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <Accordion type="single" collapsible className="w-full">
          {filteredFAQ.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  )
}

