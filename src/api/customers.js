export const fetchCustomers = async () => {
  const response = await fetch("http://localhost:8000/customers");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const addCustomer = async (newClient) => {
  const response = await fetch("http://localhost:8000/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newClient),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
