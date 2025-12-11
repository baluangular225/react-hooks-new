import axios from "axios";
import React, { useState } from "react";

const EmailRestAPI = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [visitType, setVisitType] = useState("");
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const serviceId = "service_5ivlibu";
    const templateId = "template_f0qwaau";
    const publicKey = "ew7pwaGQ2ZeQI6dSc";

    const htmlContent = `
      <h2>New Visit Request Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Visit Type:</strong> ${visitType}</p>
      <p><strong>Client Name:</strong> ${clientName}</p>
      <p><strong>Visit Start Date:</strong> ${startDate}</p>
      <p><strong>Visit End Date:</strong> ${endDate}</p>
      <br>
      <p><strong>Message:</strong> ${message}</p>
      <hr>
    `;

    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: name,
        from_email: email,
        visit_type: visitType,
        client_name: clientName,
        start_date: startDate,
        end_date: endDate,
        message: message,
        email_html: htmlContent,
      },
    };

    try {
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );
      console.log("Email sent:", res.data);
      setStatus({ ok: true, message: "Email sent successfully!" });

      // Clear form
      setName("");
      setEmail("");
      setVisitType("");
      setClientName("");
      setStartDate("");
      setEndDate("");
      setMessage("");
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({ ok: false, message: "Failed to send email." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Visit Request Form</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="visitType" className="form-label">Visit Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="visitType"
                      placeholder="e.g., Gold Visit"
                      value={visitType}
                      onChange={(e) => setVisitType(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="clientName" className="form-label">Client Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="clientName"
                      placeholder="Enter client name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="startDate" className="form-label">Visit Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="endDate" className="form-label">Visit End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    placeholder="Enter your message"
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Email"}
                  </button>
                  {status && (
                    <div
                      className={`alert ${status.ok ? "alert-success" : "alert-danger"} mb-0 ms-md-3 mt-2 mt-md-0`}
                      role="alert"
                    >
                      {status.message}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailRestAPI;
