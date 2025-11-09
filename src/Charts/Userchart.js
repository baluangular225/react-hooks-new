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
  // Fields we want to display
  const fields = useMemo(() => [
    { key: 'name', label: 'Name' },
    { key: 'website', label: 'Website' },
    { key: 'address', label: 'Address' },
    { key: 'city', label: 'City' },
  ], []);

  // Build chart data from the provided `user` prop for a PolarArea chart.
  // We'll use the four fields as labels and a single dataset with values derived from the text lengths.
  const chartData = useMemo(() => {
    if (!user) return { labels: [], datasets: [] };

    const values = fields.map(f => {
      let val = '';
      if (f.key === 'address') {
        val = user.address ? `${user.address.street || ''} ${user.address.suite || ''}`.trim() : '';
      } else if (f.key === 'city') {
        val = user.address ? (user.address.city || '') : '';
      } else {
        val = user[f.key] || '';
      }
      const len = String(val).length;
      // scale to 0-100 range, ensure minimum for visibility
      const scaled = Math.min(100, Math.max(5, Math.round(len * 4)));
      return { raw: val, scaled };
    });

    const colors = ['#1E90FF', '#3CCFDF', '#F6C85F', '#FF6B6B'];

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
        legend: { display: true, position: 'right', labels: { boxWidth: 12, padding: 12 } },
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
      <div style={{ width: '100%', maxWidth: 560, height: 320 }}>
        <PolarArea data={chartData} options={options} />
      </div>
    </div>
  );
}
