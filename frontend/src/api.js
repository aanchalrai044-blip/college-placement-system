// Backend yahi address par chal raha hoga (server.js dekh, PORT=5000)
const BASE_URL = "https://college-placement-system-ax9s.onrender.com/api";


// Generic helper: ek resource (internships/placements/openings) ke saare items laao
export async function getAll(resource) {
  const res = await fetch(`${BASE_URL}/${resource}`);
  return res.json();
}

// Naya item add karo
export async function addItem(resource, data) {
  const res = await fetch(`${BASE_URL}/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Item delete karo
export async function deleteItem(resource, id) {
  const res = await fetch(`${BASE_URL}/${resource}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
