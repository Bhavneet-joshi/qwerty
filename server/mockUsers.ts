// Mock users for demo purposes
export const mockUsers = [
  {
    id: "demo-client-001",
    email: "client@demo.com",
    firstName: "John",
    lastName: "Smith",
    role: "client" as const,
    profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    panNumber: "ABCDE1234F",
    aadhaarNumber: "123456789012",
    contactNumber: "9876543210",
    address: "123 Business Street, Corporate City, State 12345",
    isActive: true,
  },
  {
    id: "demo-employee-001", 
    email: "employee@demo.com",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "employee" as const,
    profileImageUrl: "https://images.unsplash.com/photo-1494790108755-2616b512c2b4?w=150&h=150&fit=crop&crop=face",
    employeeId: "EMP001",
    panNumber: "FGHIJ5678K",
    aadhaarNumber: "987654321098",
    contactNumber: "9123456789",
    address: "456 Employee Lane, Work Town, State 67890",
    isActive: true,
  },
  {
    id: "demo-admin-001",
    email: "admin@demo.com", 
    firstName: "Michael",
    lastName: "Wilson",
    role: "admin" as const,
    profileImageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    employeeId: "ADM001",
    panNumber: "LMNOP9012Q",
    aadhaarNumber: "456789123456",
    contactNumber: "9988776655", 
    address: "789 Admin Avenue, Management City, State 54321",
    isActive: true,
  }
];

export const mockCredentials = {
  "client@demo.com": "demo123",
  "employee@demo.com": "demo123", 
  "admin@demo.com": "demo123"
};