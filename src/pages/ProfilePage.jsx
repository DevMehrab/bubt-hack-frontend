import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function ProfilePage() {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const [profile, setProfile] = useState({
    name: "",
    budget: "",
    dietaryNeeds: "",
  });

  useEffect(() => {
    api.get(`/users/${userId}`).then((res) => setProfile(res.data));
  }, [userId]);

  const handleSave = async () => {
    await api.put(`/users/${userId}`, profile);
    alert("Profile updated!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      <div className="space-y-4">
        <input
          className="w-full p-3 border rounded-lg"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          placeholder="Name"
        />

        <input
          className="w-full p-3 border rounded-lg"
          type="number"
          value={profile.budget}
          onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
          placeholder="Monthly Budget"
        />

        <textarea
          className="w-full p-3 border rounded-lg"
          value={profile.dietaryNeeds}
          onChange={(e) =>
            setProfile({ ...profile, dietaryNeeds: e.target.value })
          }
          placeholder="Dietary Needs"
        ></textarea>

        <button
          onClick={handleSave}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
