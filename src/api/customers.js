import supabase from "./supabase";

export async function getCustomers(tailorId) {
  let { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("tailorId", tailorId);

  if (error) {
    throw new Error("customers could not be loaded");
  }
  console.log(data);
  return data;
}

export async function addCustomer(newCustomer) {
  const { data, error } = await supabase
    .from("customers")
    .insert([newCustomer]);

  if (error) {
    throw new Error("customer insertion failed");
  }
}

export async function getMeasurements(customerId) {
  const { data, error } = await supabase
    .from("Measurements")
    .select("id, category, data")
    .eq("customerId", customerId);

  if (error) {
    throw new Error("Measurements not found");
  }
  return data;
}

export async function confirmOrders(allOrders) {
  const { data, error } = await supabase
    .from("orders")
    .insert(allOrders)
    .select();

  if (error) {
    throw new Error("not ordered");
  }
  return data;
}

export async function addMeasurement(measurement) {
  const { data, error } = await supabase.from("Measurements").insert([
    {
      customerId: measurement.customerId,
      category: measurement.category,
      data: [...measurement.data],
      units: measurement.units,
    },
  ]);

  if (error) {
    throw new Error("not ordered");
  }
  return data;
}

export async function validateCredentials({ name, password }) {
  const { data, error } = await supabase
    .from("tailors")
    .select("id, username")
    .eq("username", name)
    .eq("password", password);

  if (error) {
    throw new Error(error.message);
  }

  if (data.length === 0) {
    throw new Error("Invalid credentials");
  }

  return data[0];
}
