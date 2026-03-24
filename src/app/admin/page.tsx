"use client";

import { useState } from "react";

interface Submission {
  id: number;
  name: string;
  nationality: string;
  phone: string;
  interest: string | null;
  budget: string | null;
  contact: string | null;
  timeline: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/submissions", {
      headers: { "x-admin-password": password },
    });
    if (!res.ok) {
      setError("Wrong password");
      setLoading(false);
      return;
    }
    const json = await res.json();
    setData(json);
    setAuthed(true);
    setLoading(false);
  };

  const refresh = async () => {
    const res = await fetch("/api/submissions", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) setData(await res.json());
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-xl font-bold text-center">Admin Login</h1>
          {error && <p className="mt-3 text-center text-sm text-red-500">{error}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="mt-6 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
          />
          <button
            onClick={login}
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-teal-500 py-3 text-sm font-semibold text-white hover:bg-teal-400 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Submissions ({data.length})</h1>
          <button onClick={refresh} className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-400 transition">
            Refresh
          </button>
        </div>

        {data.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No submissions yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Nationality</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Interest</th>
                  <th className="px-4 py-3">Budget</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Timeline</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((row, i) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3">{row.nationality}</td>
                    <td className="px-4 py-3">{row.phone}</td>
                    <td className="px-4 py-3">{row.interest || "-"}</td>
                    <td className="px-4 py-3">{row.budget || "-"}</td>
                    <td className="px-4 py-3">{row.contact || "-"}</td>
                    <td className="px-4 py-3">{row.timeline || "-"}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                      {new Date(row.created_at).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
