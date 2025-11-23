import { useState, useEffect } from "react";
import axios from "axios";  // <-- import axios
import { Users, UserCheck, UserX, TrendingUp, Package, AlertCircle } from "lucide-react";

export default function AdminStats() {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    fetchStatsData();
  }, []);

  const fetchStatsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Axios API call
      const { data } = await axios.get(`${API_URL}/api/admin/stats`);

      if (data.success) {
        setStats(data.stats);
        setAnalytics(data.analytics);
      } else {
        setError(data.message || "Failed to fetch data");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error fetching admin stats");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-red-600" size={24} />
            <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
          </div>
          <p className="text-red-700">{error}</p>
          <button
            onClick={fetchStatsData}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">System overview and statistics</p>
        </div>

        {/* User Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Users */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold mt-2">{stats?.users.total || 0}</p>
              </div>
              <Users size={40} className="opacity-50" />
            </div>
          </div>

          {/* Verified Users */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Verified Users</p>
                <p className="text-3xl font-bold mt-2">{stats?.users.verified || 0}</p>
              </div>
              <UserCheck size={40} className="opacity-50" />
            </div>
          </div>

          {/* Pending Users */}
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Pending Users</p>
                <p className="text-3xl font-bold mt-2">{stats?.users.pending || 0}</p>
              </div>
              <UserX size={40} className="opacity-50" />
            </div>
          </div>

          {/* Total Materials */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Raw Materials</p>
                <p className="text-3xl font-bold mt-2">{stats?.materials.total || 0}</p>
              </div>
              <Package size={40} className="opacity-50" />
            </div>
          </div>
        </div>

        {/* User Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Roles */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">User Roles Distribution</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">👨‍🌾 Farmers</span>
                  <span className="text-green-600 font-bold">{stats?.users.farmers || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min((stats?.users.farmers || 0) / Math.max(stats?.users.total || 1, 1) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">🏭 Manufacturers</span>
                  <span className="text-blue-600 font-bold">{stats?.users.manufacturers || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min((stats?.users.manufacturers || 0) / Math.max(stats?.users.total || 1, 1) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">👤 Admins</span>
                  <span className="text-purple-600 font-bold">{stats?.users.admins || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min((stats?.users.admins || 0) / Math.max(stats?.users.total || 1, 1) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Material Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Raw Materials Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700 font-medium">✅ Available</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold">
                  {stats?.materials.available || 0}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="text-gray-700 font-medium">⚡ Consumed</span>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full font-bold">
                  {stats?.materials.consumed || 0}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-gray-700 font-medium">❌ Expired</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                  {stats?.materials.expired || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        {analytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quality Distribution */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quality Grade Distribution</h2>
              <div className="space-y-3">
                {analytics.qualityDistribution?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium capitalize">{item._id || "Unknown"}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${Math.min((item.count / Math.max(...analytics.qualityDistribution.map(q => q.count), 1)) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-gray-900 font-bold w-12 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Distribution */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">User Role Distribution</h2>
              <div className="space-y-3">
                {analytics.roleDistribution?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium capitalize">{item._id || "Unknown"}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${Math.min((item.count / Math.max(...analytics.roleDistribution.map(r => r.count), 1)) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-gray-900 font-bold w-12 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Refresh Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={fetchStatsData}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition shadow-md"
          >
            <TrendingUp className="inline mr-2" size={20} />
            Refresh Stats
          </button>
        </div>
      </div>
    </div>
  );
}