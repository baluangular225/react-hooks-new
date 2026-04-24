import React, { useEffect, useMemo, useState } from "react";
import { useParams } from 'react-router-dom';
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function Userchart({ user: propUser }) {
  const { userId } = useParams();
  const [user, setUser] = useState(propUser || null);

  // if parent passes a user prop, keep local user in sync
  useEffect(() => {
    if (propUser) {
      setUser(propUser);
      return;
    }

    // if no prop, try to fetch by route param userId
    if (userId) {
      const fetchUser = async () => {
        try {
          const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
          const data = await res.json();
          setUser(data);
        } catch (err) {
          console.error('Failed to fetch user for chart', err);
          setUser(null);
        }
      };
      fetchUser();
    }
  }, [propUser, userId]);
  // Fields we want to display (expanded to show full user details)
  const fields = useMemo(() => [
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'website', label: 'Website' },
    { key: 'company', label: 'Company' },
    { key: 'address', label: 'Address' },
  ], []);

  // Build chart data from the provided `user` prop for a PolarArea chart.
  // We'll use the four fields as labels and a single dataset with values derived from the text lengths.
  const chartData = useMemo(() => {
    if (!user) return { labels: [], datasets: [] };

    const values = fields.map(f => {
      let val = '';
      if (f.key === 'address') {
        if (user.address) {
          const { street = '', suite = '', city = '', zipcode = '' } = user.address;
          val = `${street}${street ? ', ' : ''}${suite}${suite ? ', ' : ''}${city}${city ? ', ' : ''}${zipcode}`.trim();
        }
      } else if (f.key === 'company') {
        val = user.company?.name || '';
      } else {
        val = user[f.key] || '';
      }
      const len = String(val).length;
      const scaled = Math.min(100, Math.max(5, Math.round(len * 3)));
      return { raw: val, scaled };
    });

    const colors = ['#1E90FF', '#3CCFDF', '#F6C85F', '#FF6B6B', '#8E44AD', '#2ECC71', '#E67E22'];

    return {
      labels: fields.map(f => f.label),
      datasets: [
        {
          label: 'User fields',
          data: values.map(v => v.scaled),
          backgroundColor: colors,
          borderColor: colors.map(c => '#ffffff'),
          borderWidth: 2,
          rawValues: values.map(v => v.raw),
        }
      ]
    };
  }, [user, fields]);

    const options = useMemo(() => ({
      responsive: true,
      maintainAspectRatio: false,
      startAngle: -Math.PI / 2,
      animation: {
        duration: 1200,
        easing: 'easeOutQuart',
        animateRotate: true,
        animateScale: true,
      },
      plugins: {
        // hide the built-in legend (it creates a vertical stacked list)
        legend: { display: false },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function(context) {
              const ds = context.dataset;
              const idx = context.dataIndex;
              const raw = ds?.rawValues?.[idx] || '';
              const label = context.label || '';
              const short = String(raw).length > 80 ? String(raw).slice(0,80) + '...' : raw;
              return `${label}: ${short}`;
            }
          }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          grid: { color: '#eee' },
          ticks: { display: false }
        }
      }
    }), []);

  if (!user) {
    return <div style={{ width: '100%', height: 300 }}><p style={{textAlign:'center'}}>No user data for chart</p></div>;
  }

  return (
    <div style={{ width: '100%', minHeight: 300 }} className="d-flex align-items-center justify-content-center">
      <div style={{ display: 'flex', gap: 16, alignItems: 'stretch', width: '100%', maxWidth: 900 }}>
        <div style={{ flex: '0 0 560px', height: 320 }}>
          <PolarArea data={chartData} options={options} />
        </div>
        <div style={{ flex: '1 1 320px', padding: 12, border: '1px solid #eee', borderRadius: 6, background: '#fff', height: 320 }}>
          <h6 style={{ marginTop: 0, marginBottom: 8 }}>User Details</h6>
          <ul style={{ paddingLeft: 16, margin: 0 }}>
            <li style={{ marginBottom: 8 }}><strong>Name:</strong> {user.name}</li>
            <li style={{ marginBottom: 8 }}><strong>Username:</strong> {user.username}</li>
            <li style={{ marginBottom: 8 }}><strong>Email:</strong> {user.email}</li>
            <li style={{ marginBottom: 8 }}><strong>Phone:</strong> {user.phone}</li>
            <li style={{ marginBottom: 8 }}><strong>Website:</strong> {user.website}</li>
            <li style={{ marginBottom: 8 }}><strong>Company:</strong> {user.company?.name}</li>
            <li style={{ marginBottom: 8 }}><strong>Address:</strong> {user.address ? `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}` : ''}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
