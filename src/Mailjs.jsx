import React, { useState } from "react";
import emailjs from "@emailjs/browser";

// Uses environment variables (set in .env.local)
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_5ivlibu";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_f0qwaau";
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "ew7pwaGQ2ZeQI6dSc";

const Mailjs = () => {
  const [form, setForm] = useState({
    from_name: "",
    visit_type: "",
    client_name: "",
    start_date: "",
    end_date: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function sendEmail(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const useServer = String(process.env.REACT_APP_USE_SERVER_EMAIL || '').toLowerCase() === 'true';
      if (useServer) {
        // Post to backend /api/email (the server will build subject/html)
        const backend = process.env.REACT_APP_AUTH_SERVER || process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const resp = await fetch(`${backend}/api/email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        const data = await resp.json();
        if (data.ok) {
          setStatus({ ok: true, message: 'Email sent successfully.' });
          setForm({ from_name: '', visit_type: '', client_name: '', start_date: '', end_date: '', message: '' });
        } else {
          throw new Error(data.error || 'Server send failed');
        }
      } else {
        // Use emailjs.send to pass an object of template params
        const templateParams = { ...form };
        const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log('EmailJS result', res);
        setStatus({ ok: true, message: 'Email sent successfully.' });
        setForm({ from_name: '', visit_type: '', client_name: '', start_date: '', end_date: '', message: '' });
      }
    } catch (err) {
      console.error('Email send error', err);
      setStatus({ ok: false, message: 'Failed to send email. Try again later.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Contact / Visit Request</h5>
            </div>
            <div className="card-body">
              <form onSubmit={sendEmail}>
                <div className="mb-3">
                  <label htmlFor="from_name" className="form-label">Your name</label>
                  <input id="from_name" className="form-control" type="text" name="from_name" value={form.from_name} onChange={handleChange} placeholder="Full name" required />
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="visit_type" className="form-label">Visit type</label>
                    <input id="visit_type" className="form-control" type="text" name="visit_type" value={form.visit_type} onChange={handleChange} placeholder="e.g. Consultation" required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="client_name" className="form-label">Client</label>
                    <input id="client_name" className="form-control" type="text" name="client_name" value={form.client_name} onChange={handleChange} placeholder="Client or organization" required />
                  </div>
                </div>

                <div className="row g-3 mt-1">
                  <div className="col-12 col-md-6">
                    <label htmlFor="start_date" className="form-label">Start date</label>
                    <input id="start_date" className="form-control" type="date" name="start_date" value={form.start_date} onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="end_date" className="form-label">End date</label>
                    <input id="end_date" className="form-control" type="date" name="end_date" value={form.end_date} onChange={handleChange} required />
                  </div>
                </div>

                <div className="mb-3 mt-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea id="message" className="form-control" name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Any details for the visit" required />
                </div>

                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
                  <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Sending…' : 'Send request'}</button>
                  <div className="mt-2 mt-sm-0">
                    {status && (
                      <div className={`alert ${status.ok ? 'alert-success' : 'alert-danger'} mb-0`} role="alert" style={{ padding: '0.35rem 0.6rem' }}>
                        {status.message}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mailjs;
