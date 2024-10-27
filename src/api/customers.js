import supabase from "./supabase";

export async function getCustomers() {
  let { data, error } = await supabase.from("customers").select("*");

  if (error) {
    console.error("custommers not found");
    throw new Error("customers could not be loaded");
  }

  return data;
}

export async function addCustomer(newCustomer) {
  const { data, error } = await supabase
    .from("customers")
    .insert([newCustomer]);

  if (error) {
    console.error("customer insertion failed");
    throw new Error("customer insertion failed");
  }
}

export async function getMeasurements(customerId) {
  const { data, error } = await supabase
    .from("Measurements")
    .select("id, category, data")
    .eq("customerId", customerId);

  if (error) {
    console.error("Measurements not found");
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
    console.error("not ordered");
    throw new Error("not ordered");
  }
  return data;
}
