import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

// ============= UTILITY FUNCTIONS =============
const money = (amount) => `$${Number(amount).toFixed(2)}`;
const moneyShort = (amount) => {
  if (amount >= 1000000) return `$${(amount/1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount/1000).toFixed(1)}K`;
  return `$${amount}`;
};

// ============= STAT COMPONENT =============
const Stat = ({ icon, label, value, title }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1" title={title}>{value}</p>
      </div>
      <div className="p-3 bg-pink-50 rounded-lg text-pink-600 text-2xl">{icon}</div>
    </div>
  </div>
);

// ============= STATUS COMPONENT =============
const Status = ({ status }) => {
  const colors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Accepted': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'Paid': 'bg-purple-100 text-purple-800',
    'In Progress': 'bg-indigo-100 text-indigo-800'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

// ============= STAR RATING =============
const Stars = ({ value = 0 }) => {
  const full = Math.round(value);
  return (
    <span className="flex gap-0.5 text-yellow-400">
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n}>{n <= full ? '★' : '☆'}</span>
      ))}
    </span>
  );
};

// ============= EMPTY STATE =============
const EmptyState = ({ icon, title, text }) => (
  <div className="text-center py-12">
    <div className="text-5xl text-gray-300 mb-3">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-gray-500 text-sm mt-1">{text}</p>
  </div>
);

// ============= MOCK DATA =============
const mockData = {
  planners: [
    { 
      planner_id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      experience: '5 years', 
      specialization: 'Wedding Decoration', 
      status: 'Approved', 
      bio: 'Expert wedding planner with 5+ years of experience creating dream weddings.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&h=200&q=80' 
    }
  ],
  weddings: [
    { 
      wedding_id: 'W001', 
      client_id: 1, 
      planner_id: 1, 
      package_id: 1, 
      date: '2026-12-20', 
      venue: 'Grand Hotel', 
      budget: 50000, 
      status: 'Pending' 
    },
    { 
      wedding_id: 'W002', 
      client_id: 2, 
      planner_id: 1, 
      package_id: 2, 
      date: '2026-11-15', 
      venue: 'Beach Resort', 
      budget: 35000, 
      status: 'Accepted' 
    },
    { 
      wedding_id: 'W003', 
      client_id: 3, 
      planner_id: 1, 
      package_id: 1, 
      date: '2026-10-05', 
      venue: 'Garden Estate', 
      budget: 45000, 
      status: 'Completed' 
    }
  ],
  clients: [
    { client_id: 1, name: 'Sarah & Mike Johnson' },
    { client_id: 2, name: 'Emily & James Wilson' },
    { client_id: 3, name: 'Anna & David Lee' }
  ],
  packages: [
    { package_id: 1, name: 'Premium Package' },
    { package_id: 2, name: 'Standard Package' }
  ],
  services: [
    { 
      plannerService_id: 's1', 
      planner_id: 1, 
      name: 'Full Wedding Planning', 
      price: 5000, 
      description: 'Complete wedding planning from start to finish' 
    },
    { 
      plannerService_id: 's2', 
      planner_id: 1, 
      name: 'Day-of Coordination', 
      price: 1500, 
      description: 'Professional coordination on your wedding day' 
    }
  ],
  images: [
    { 
      image_id: 'i1', 
      planner_id: 1, 
      image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&h=300&q=80',
      upload_time: '2026-01-15' 
    },
    { 
      image_id: 'i2', 
      planner_id: 1, 
      image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&h=300&q=80',
      upload_time: '2026-01-20' 
    }
  ],
  tasks: [
    { task_id: 't1', wedding_id: 'W001', task_name: 'Venue Booking', status: 'Pending' },
    { task_id: 't2', wedding_id: 'W001', task_name: 'Catering', status: 'In Progress' },
    { task_id: 't3', wedding_id: 'W002', task_name: 'Decoration', status: 'Completed' }
  ],
  payments: [
    { payment_id: 'p1', wedding_id: 'W001', amount: 10000, status: 'Paid' },
    { payment_id: 'p2', wedding_id: 'W002', amount: 5000, status: 'Pending' }
  ],
  feedback: [
    { 
      feedback_id: 'f1', 
      planner_id: 1, 
      client_id: 1, 
      rating: 5, 
      comment: 'Amazing planner! Highly recommended. Made our dream wedding come true!', 
      date: '2026-01-10' 
    },
    { 
      feedback_id: 'f2', 
      planner_id: 1, 
      client_id: 3, 
      rating: 4, 
      comment: 'Great experience overall. Very professional and organized.', 
      date: '2026-01-05' 
    }
  ]
};

// ============= MAIN DASHBOARD =============
export const PlannerDashboard = () => {
  const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
  const [data] = useState(mockData);

  const p = data.planners.find(x => x.planner_id === user.id);
  const mine = data.weddings.filter(w => w.planner_id === user.id);
  const pending = mine.filter(w => w.status === 'Pending').length;
  const accepted = mine.filter(w => w.status === 'Accepted').length;
  const completed = mine.filter(w => w.status === 'Completed').length;
  
  const earn = data.payments
    .filter(p => mine.some(w => w.wedding_id === p.wedding_id) && p.status === 'Paid')
    .reduce((a, p) => a + p.amount, 0);
  
  const reviews = data.feedback.filter(f => f.planner_id === user.id);
  const avg = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : '0.0';
  
  const needsProfile = !p?.bio || !p?.image;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}! 👋</h1>
              {needsProfile ? (
                <p className="text-gray-600 mt-1">
                  Complete your profile with a <Link to="/planner-profile" className="text-pink-600 font-semibold hover:underline">bio and profile picture</Link> to attract more clients.
                </p>
              ) : (
                <p className="text-gray-600 mt-1">Manage your weddings and grow your planning business.</p>
              )}
            </div>
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center min-w-[140px]">
              <p className="text-xs text-gray-500">Your Rating</p>
              <p className="text-2xl font-bold text-gray-900">{avg}</p>
              <Stars value={Number(avg)} />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Stat icon="📆" label="Total Bookings" value={mine.length} />
          <Stat icon="📋" label="Pending Requests" value={pending} />
          <Stat icon="✅" label="Accepted" value={accepted} />
          <Stat icon="📋" label="Completed" value={completed} />
          <Stat icon="💵" label="Total Earnings" value={moneyShort(earn)} title={money(earn)} />
          <Stat icon="⭐" label="Average Rating" value={`${avg} / 5`} />
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Booking Requests</h2>
            {mine.length > 0 && <Link to="/planner-bookings" className="text-pink-600 text-sm font-medium hover:underline">View All →</Link>}
          </div>
          {mine.length > 0 ? (
            <div className="space-y-3">
              {mine.slice(-5).reverse().map(w => {
                const client = data.clients.find(c => c.client_id === w.client_id);
                return (
                  <div key={w.wedding_id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                    <div>
                      <p className="font-medium text-gray-900">{w.wedding_id}</p>
                      <p className="text-sm text-gray-500">{client?.name || 'Unknown Client'} • {w.date}</p>
                    </div>
                    <Status status={w.status} />
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState icon="📆" title="No pending requests" text="You do not have any pending booking requests at the moment." />
          )}
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Reviews</h2>
            {reviews.length > 0 && <Link to="/planner-reviews" className="text-pink-600 text-sm font-medium hover:underline">View All →</Link>}
          </div>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.slice(-3).reverse().map(r => {
                const client = data.clients.find(c => c.client_id === r.client_id);
                return (
                  <div key={r.feedback_id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{client?.name || 'Anonymous'}</span>
                      <span className="text-yellow-400">★</span>
                      <span className="font-medium">{r.rating}</span>
                      <span className="text-xs text-gray-400">• {r.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{r.comment}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState icon="⭐" title="No reviews yet" text="Once you complete bookings, clients can leave feedback." />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

// ============= PROFILE PAGE =============
export const PlannerProfile = () => {
  const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
  const [data, setData] = useState(mockData);
  const p = data.planners.find(x => x.planner_id === user.id);
  const [form, setForm] = useState(p || {});
  const [msg, setMsg] = useState('');

  const update = (key, fn) => {
    setData(prev => ({
      ...prev,
      [key]: typeof fn === 'function' ? fn(prev[key]) : fn
    }));
  };

  const save = (e) => {
    e.preventDefault();
    update('planners', a => a.map(x => x.planner_id === user.id ? { ...x, ...form } : x));
    setMsg('Profile updated successfully! ✅');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={save} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              value={form.name || ''} 
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              value={form.email || ''} 
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <input 
              value={form.experience || ''} 
              onChange={e => setForm({ ...form, experience: e.target.value })}
              placeholder="e.g., 5 years"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <input 
              value={form.specialization || ''} 
              onChange={e => setForm({ ...form, specialization: e.target.value })}
              placeholder="e.g., Wedding Decoration"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
            <input 
              value={form.image || ''} 
              onChange={e => setForm({ ...form, image: e.target.value })}
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea 
              value={form.bio || ''} 
              onChange={e => setForm({ ...form, bio: e.target.value })}
              rows="3"
              placeholder="Tell couples about yourself..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          {msg && <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">{msg}</div>}
          <button type="submit" className="w-full bg-pink-600 text-white py-2.5 rounded-lg font-semibold hover:bg-pink-700 transition">
            Save Changes
          </button>
        </form>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <img 
              src={form.image || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&h=200&q=80'} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">{form.name}</p>
              <p className="text-sm text-gray-600">{form.specialization}</p>
              <p className="text-sm text-gray-500">{form.experience} experience</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-4">{form.bio || 'No bio added yet.'}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Status: <Status status={p?.status || 'Pending'} /></p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// ============= SERVICES PAGE =============
export const PlannerServices = () => {
  const user = { id: 1 };
  const [data, setData] = useState(mockData);
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const mine = data.services.filter(s => s.planner_id === user.id);

  const update = (key, fn) => {
    setData(prev => ({
      ...prev,
      [key]: typeof fn === 'function' ? fn(prev[key]) : fn
    }));
  };

  const add = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    update('services', a => [...a, {
      ...form,
      planner_id: user.id,
      plannerService_id: 's' + Date.now(),
      price: Number(form.price)
    }]);
    setForm({ name: '', price: '', description: '' });
  };

  const del = (id) => update('services', a => a.filter(x => x.plannerService_id !== id));

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Services</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={add} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Add New Service</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
            <input 
              required 
              value={form.name} 
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input 
              required 
              type="number" 
              value={form.price} 
              onChange={e => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              value={form.description} 
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows="2"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button type="submit" className="w-full bg-pink-600 text-white py-2.5 rounded-lg font-semibold hover:bg-pink-700 transition flex items-center justify-center gap-2">
            <span>➕</span> Add Service
          </button>
        </form>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Services ({mine.length})</h2>
          {mine.length > 0 ? (
            <div className="space-y-3">
              {mine.map(s => (
                <div key={s.plannerService_id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{s.name}</p>
                    <p className="text-pink-600 font-bold">{money(s.price)}</p>
                    <p className="text-sm text-gray-500">{s.description}</p>
                  </div>
                  <button onClick={() => del(s.plannerService_id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded text-xl">
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon="💼" title="No services yet" text="Add your first service to attract clients." />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

// ============= GALLERY PAGE =============
export const PlannerGallery = () => {
  const user = { id: 1 };
  const [data, setData] = useState(mockData);
  const [url, setUrl] = useState('');
  const mine = data.images.filter(i => i.planner_id === user.id);

  const update = (key, fn) => {
    setData(prev => ({
      ...prev,
      [key]: typeof fn === 'function' ? fn(prev[key]) : fn
    }));
  };

  const add = (e) => {
    e.preventDefault();
    if (!url) return;
    update('images', a => [...a, {
      image_id: 'i' + Date.now(),
      planner_id: user.id,
      image_url: url,
      upload_time: new Date().toISOString().slice(0, 10)
    }]);
    setUrl('');
  };

  const del = (id) => update('images', a => a.filter(x => x.image_id !== id));

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Image Gallery</h1>
      <form onSubmit={add} className="flex gap-3 mb-6">
        <input 
          placeholder="Paste image URL..." 
          value={url} 
          onChange={e => setUrl(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition flex items-center gap-2">
          <span>➕</span> Add Image
        </button>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mine.map(i => (
          <div key={i.image_id} className="relative group rounded-lg overflow-hidden border border-gray-200">
            <img src={i.image_url} alt="Gallery" className="w-full h-48 object-cover" />
            <button 
              onClick={() => del(i.image_id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition text-xl"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
      {mine.length === 0 && (
        <EmptyState icon="🖼️" title="No images" text="Add images to showcase your work." />
      )}
    </DashboardLayout>
  );
};

// ============= BOOKINGS PAGE =============
export const PlannerBookings = () => {
  const user = { id: 1 };
  const [data, setData] = useState(mockData);
  const mine = data.weddings.filter(w => w.planner_id === user.id);

  const update = (key, fn) => {
    setData(prev => ({
      ...prev,
      [key]: typeof fn === 'function' ? fn(prev[key]) : fn
    }));
  };

  const act = (id, status) => {
    update('weddings', a => a.map(w => w.wedding_id === id ? { ...w, status } : w));
    if (status === 'Accepted') {
      const base = ['Venue Booking', 'Decoration', 'Catering', 'Photography', 'Guest Management'];
      base.forEach((n, i) => {
        update('tasks', a => 
          a.some(t => t.wedding_id === id && t.task_name === n) 
            ? a 
            : [...a, { task_id: 't' + Date.now() + i, wedding_id: id, task_name: n, status: 'Pending' }]
        );
      });
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Wedding Bookings</h1>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {mine.length > 0 ? (
          <div className="space-y-4">
            {mine.map(w => {
              const client = data.clients.find(c => c.client_id === w.client_id);
              const pkg = data.packages.find(p => p.package_id === w.package_id);
              return (
                <div key={w.wedding_id} className="flex flex-wrap justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900">{w.wedding_id}</p>
                    <p className="text-sm text-gray-600">{client?.name || 'Unknown Client'}</p>
                    <p className="text-sm text-gray-500">{pkg?.name || 'No package'} • {w.date} • {w.venue || 'Venue TBD'}</p>
                    <p className="text-sm text-pink-600 font-medium">{money(w.budget)}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <Status status={w.status} />
                    {w.status === 'Pending' && (
                      <>
                        <button onClick={() => act(w.wedding_id, 'Accepted')} className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition flex items-center gap-1">
                          <span>✔️</span> Accept
                        </button>
                        <button onClick={() => act(w.wedding_id, 'Rejected')} className="px-4 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition flex items-center gap-1">
                          <span>❌</span> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState icon="📅" title="No booking requests" text="You don't have any booking requests yet." />
        )}
      </div>
    </DashboardLayout>
  );
};

// ============= TASKS PAGE =============
export const PlannerTasks = () => {
  const user = { id: 1 };
  const [data, setData] = useState(mockData);
  const mine = data.weddings.filter(w => w.planner_id === user.id);
  const [form, setForm] = useState({ wedding_id: mine[0]?.wedding_id || '', task_name: '' });

  const update = (key, fn) => {
    setData(prev => ({
      ...prev,
      [key]: typeof fn === 'function' ? fn(prev[key]) : fn
    }));
  };

  const add = (e) => {
    e.preventDefault();
    if (!form.wedding_id || !form.task_name) return;
    update('tasks', a => [...a, {
      task_id: 't' + Date.now(),
      wedding_id: form.wedding_id,
      task_name: form.task_name,
      status: 'Pending'
    }]);
    setForm({ ...form, task_name: '' });
  };

  const change = (id, status) => update('tasks', a => a.map(t => t.task_id === id ? { ...t, status } : t));
  const del = (id) => update('tasks', a => a.filter(t => t.task_id !== id));

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Track Tasks</h1>
      
      <form onSubmit={add} className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <select 
          value={form.wedding_id} 
          onChange={e => setForm({ ...form, wedding_id: e.target.value })}
          className="flex-1 min-w-[150px] rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          {mine.map(w => (
            <option key={w.wedding_id} value={w.wedding_id}>{w.wedding_id} • {w.venue || 'TBD'}</option>
          ))}
        </select>
        <input 
          placeholder="Task name..." 
          value={form.task_name} 
          onChange={e => setForm({ ...form, task_name: e.target.value })}
          className="flex-1 min-w-[150px] rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition flex items-center gap-2">
          <span>➕</span> Add Task
        </button>
      </form>

      {mine.map(w => {
        const tasks = data.tasks.filter(t => t.wedding_id === w.wedding_id);
        return (
          <div key={w.wedding_id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{w.wedding_id} • {w.venue || 'TBD'}</h2>
            {tasks.length > 0 ? (
              <div className="space-y-2">
                {tasks.map(t => (
                  <div key={t.task_id} className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="flex-1 font-medium text-gray-800">{t.task_name}</span>
                    <select 
                      value={t.status} 
                      onChange={e => change(t.task_id, e.target.value)}
                      className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                    <button onClick={() => del(t.task_id)} className="p-1 text-red-500 hover:bg-red-50 rounded text-xl">
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No tasks added yet.</p>
            )}
          </div>
        );
      })}
    </DashboardLayout>
  );
};

// ============= PAYMENTS PAGE =============
export const PlannerPayments = () => {
  const user = { id: 1 };
  const [data] = useState(mockData);
  const mine = data.weddings.filter(w => w.planner_id === user.id);
  const payments = data.payments.filter(p => mine.some(w => w.wedding_id === p.wedding_id));
  const total = payments.filter(p => p.status === 'Paid').reduce((a, p) => a + p.amount, 0);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Stat icon="💰" label="Total Received" value={moneyShort(total)} title={money(total)} />
        <Stat icon="💳" label="Payment Records" value={payments.length} />
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
        {payments.length > 0 ? (
          <div className="space-y-2">
            {payments.map(p => {
              const wedding = mine.find(w => w.wedding_id === p.wedding_id);
              const client = data.clients.find(c => c.client_id === wedding?.client_id);
              return (
                <div key={p.payment_id} className="flex flex-wrap justify-between items-center p-3 border border-gray-100 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{p.payment_id}</p>
                    <p className="text-sm text-gray-600">{client?.name || 'Unknown'}</p>
                    <p className="text-sm font-bold text-pink-600">{money(p.amount)}</p>
                  </div>
                  <Status status={p.status} />
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState icon="💳" title="No payments" text="No payment records found." />
        )}
      </div>
    </DashboardLayout>
  );
};

// ============= REVIEWS PAGE =============
export const PlannerReviews = () => {
  const user = { id: 1 };
  const [data] = useState(mockData);
  const reviews = data.feedback.filter(f => f.planner_id === user.id);
  const avg = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : '0.0';

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h1>
      {reviews.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <p className="text-3xl font-bold text-gray-900">{avg} ★</p>
          <p className="text-gray-600">{reviews.length} review{reviews.length > 1 ? 's' : ''}</p>
        </div>
      )}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map(r => {
              const client = data.clients.find(c => c.client_id === r.client_id);
              return (
                <div key={r.feedback_id} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{client?.name || 'Anonymous'}</span>
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium">{r.rating}</span>
                    <span className="text-xs text-gray-400">• {r.date}</span>
                  </div>
                  <p className="text-gray-600">{r.comment}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState icon="⭐" title="No reviews yet" text="You haven't received any reviews. Complete bookings to get feedback." />
        )}
      </div>
    </DashboardLayout>
  );
};