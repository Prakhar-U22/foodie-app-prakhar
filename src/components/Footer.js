import React, { useState } from 'react';

export default function Footer() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      setSubmitted(true);
      setFeedback('');
      setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds
    }
  };

  return (
    <footer className="bg-light text-dark py-4">
      <div className="container">
        <div className="row">
          {/* Footer Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-dark text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-dark text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-dark text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Feedback Form */}
          <div className="col-md-4 mb-3">
            <h5>Feedback</h5>
            {submitted ? (
              <p className="text-success">Thank you for your feedback!</p>
            ) : (
              <form onSubmit={handleFeedbackSubmit}>
                <div className="mb-2">
                  <textarea
                    className="form-control"
                    placeholder="Let us know your thoughts..."
                    rows="3"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-sm">
                  Submit
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p>
              Email: <a href="mailto:info@company.com">info@company.com</a>
            </p>
            <p>
              Phone: <a href="tel:+123456789">+123 456 789</a>
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center border-top pt-3">
          <p className="mb-0">© 2024 Company, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
