import React from "react";
import UserSidebar from "../../components/users/UserSidebar";
import UserTopbar from "../../components/users/UserTopbar";

export default function UserProfile() {
  // ✅ Example static data (for design only, replace with backend fetch later)
  const userData = {
    name: "Rim Thakor",
    email: "user@example.com",
    phone: "+91 9876543210",
    role: "User", // change to "Member" if needed
    membershipId: "GYM12345",
    packageName: "Gold Package",
    joiningDate: "2025-01-15",
    expiryDate: "2026-01-15",
    trainerName: "sanjay patel",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <UserTopbar />

        <main className="p-6">
          <h2 className="text-2xl font-bold text-red-700 mb-6">Your Profile</h2>

          <div className="bg-white p-6 rounded-2xl shadow-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <ProfileField label="Name" value={userData.name} />
              <ProfileField label="Email" value={userData.email} />
              <ProfileField label="Phone" value={userData.phone} />
              <ProfileField
                label="Role"
                value={userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
              />

              {/* Membership Info */}
              <ProfileField label="Membership ID" value={userData.membershipId} />
              <ProfileField label="Package" value={userData.packageName} />
              <ProfileField
                label="Joining Date"
                value={new Date(userData.joiningDate).toLocaleDateString()}
              />
              <ProfileField
                label="Expiry Date"
                value={new Date(userData.expiryDate).toLocaleDateString()}
              />

              {/* Trainer */}
              <ProfileField label="Trainer" value={userData.trainerName} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ✅ Reusable component
function ProfileField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  );
}
