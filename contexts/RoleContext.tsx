import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

interface RoleContextType {
  roles: Role[];
  addRole: (role: Role) => void;
  updateRole: (id: string, updatedRole: Role) => void;
  deleteRole: (id: string) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRoleContext = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRoleContext must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>([
    { id: '1', name: 'Admin', permissions: ['create', 'read', 'update', 'delete'] },
    { id: '2', name: 'Editor', permissions: ['read', 'update'] },
    { id: '3', name: 'Viewer', permissions: ['read'] },
  ]);

  const addRole = (role: Role) => {
    setRoles((prevRoles) => [...prevRoles, role]);
  };

  const updateRole = (id: string, updatedRole: Role) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => (role.id === id ? updatedRole : role))
    );
  };

  const deleteRole = (id: string) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
  };

  return (
    <RoleContext.Provider value={{ roles, addRole, updateRole, deleteRole }}>
      {children}
    </RoleContext.Provider>
  );
};

