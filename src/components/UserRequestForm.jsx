import { useState } from 'react';
import { userAPI } from '../config/api';

const UserRequestForm = () => {
  const [formData, setFormData] = useState({
    requestType: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const requestData = {
        userId: user.id,
        ...formData,
      };

      const response = await userAPI.createRequest(requestData);
      
      if (response.data.success) {
        setSuccess('Request sent to admin successfully!');
        setFormData({ requestType: '', message: '' });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h2>Send Request to Admin</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Request Type:</label>
          <select
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">Select request type</option>
            <option value="Assignment Extension">Assignment Extension</option>
            <option value="Grade Review">Grade Review</option>
            <option value="Technical Issue">Technical Issue</option>
            <option value="Account Issue">Account Issue</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Describe your request in detail..."
            style={{ width: '100%', padding: '8px', marginTop: '5px', resize: 'vertical' }}
          />
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ color: 'green', marginBottom: '15px' }}>
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </form>
    </div>
  );
};

export default UserRequestForm;