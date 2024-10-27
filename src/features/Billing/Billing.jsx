import React, { useState } from 'react';
import { Modal, Button, Input, Select, Form, Table } from 'antd';
import './Billing.css';

const { Option } = Select;

const Billing = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [garments, setGarments] = useState([]);
  const [clientName, setClientName] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [previousBills, setPreviousBills] = useState([
    {
      id: 1,
      clientName: 'Alice',
      garments: [
        { type: 'Blouse', quantity: 2, cost: 500 },
        { type: 'Saree', quantity: 1, cost: 700 },
      ],
      totalCost: 1700,
      date: '2024-10-24',
    },
    {
      id: 2,
      clientName: 'Maya',
      garments: [
        { type: 'Dress', quantity: 1, cost: 1000 },
        { type: 'Half Saree', quantity: 2, cost: 1200 },
      ],
      totalCost: 3400,
      date: '2024-10-22',
    },
  ]);

  // Handle opening the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setGarments([]);
    setClientName('');
    setTotalCost(0);
  };

  // Add new garment to the list
  const addGarment = (garment) => {
    setGarments([...garments, garment]);
    setTotalCost(totalCost + garment.cost);
  };

  // Submit the bill
  const handleSubmit = () => {
    const newBill = {
      id: previousBills.length + 1,
      clientName,
      garments,
      totalCost,
      date: new Date().toISOString().split('T')[0], // current date
    };
    setPreviousBills([...previousBills, newBill]);
    handleCancel();
  };

  // Columns for the bills table
  const columns = [
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: 'Garments',
      dataIndex: 'garments',
      key: 'garments',
      render: (garments) =>
        garments.map((g, index) => (
          <div key={index}>
            {g.type} (Qty: {g.quantity}, Cost: ₹{g.cost})
          </div>
        )),
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (totalCost) => `₹${totalCost}`,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div className="container">
        <div className='topbill'>
      <h2>Billing Page</h2>

      {/* New Bill Button */}
      <Button type="primary" onClick={showModal} style={{ marginBottom: '20px',marginLeft:'50px' }}>
        New Bill
      </Button>
      </div>

      {/* Modal for New Bill */}
      <Modal
        title="New Bill"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{width:'400px'}}
      >
        <Form layout="vertical">
          <Form.Item label="Client Name">
            <Input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter client name"
              required
            />
          </Form.Item>

          <GarmentForm addGarment={addGarment} />

          {/* List of added garments */}
          {garments.length > 0 && (
            <div>
              <h3>Added Garments</h3>
              <ul>
                {garments.map((garment, index) => (
                  <li key={index}>
                    {garment.type} (Qty: {garment.quantity}, Cost: ₹{garment.cost}){' '}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Total Cost */}
          <h3>Total Cost: ₹{totalCost}</h3>

          {/* Submit Button */}
          <Button type="primary" onClick={handleSubmit} block>
            Submit Bill
          </Button>
        </Form>
      </Modal>

      {/* Previous Bills Table */}
      <h3>Previous Bills</h3>
      <Table columns={columns} dataSource={previousBills} rowKey="id" />
    </div>
  );
};

// Garment Form Component to Add Garments
const GarmentForm = ({ addGarment }) => {
  const [garmentType, setGarmentType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState(0);

  const handleAddGarment = () => {
    if (garmentType && quantity && cost) {
      const garment = {
        type: garmentType,
        quantity,
        cost: cost * quantity,
      };
      addGarment(garment);
      // Reset form
      setGarmentType('');
      setQuantity(1);
      setCost(0);
    }
  };

  return (
    <>
      <Form.Item label="Garment Type">
        <Select
          value={garmentType}
          onChange={(value) => setGarmentType(value)}
          placeholder="Select garment type"
          required
        >
          <Option value="Blouse">Blouse</Option>
          <Option value="Dress">Dress</Option>
          <Option value="Saree">Saree</Option>
          <Option value="Half Saree">Half Saree</Option>
          {/* Add more garment types as needed */}
        </Select>
      </Form.Item>

      <Form.Item label="Quantity">
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          required
        />
      </Form.Item>

      <Form.Item label="Cost">
        <Input
          type="number"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          placeholder="Enter cost per garment"
          required
        />
      </Form.Item>

      <Button type="dashed" onClick={handleAddGarment} block>
        Add Garment
      </Button>
    </>
  );
};

export default Billing;
