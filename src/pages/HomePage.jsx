const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1>Welcome to PocketTailer</h1>
      <p>Manage your tailoring services effortlessly with our platform.</p>

      <div className="features">
        <div className="feature-card">
          <h3>Order Management</h3>
          <p>Track and manage all your tailoring orders in one place.</p>
        </div>
        <div className="feature-card">
          <h3>Measurement Library</h3>
          <p>Store and access your clients' measurements easily.</p>
        </div>
        <div className="feature-card">
          <h3>Payment Integration</h3>
          <p>Streamline your payment process with secure integrations.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
