const BASE_URL = "/api/images";

// make image
export async function makeImage(combinedPrompt) {
  const token = localStorage.getItem("token");
  return await fetch(`${BASE_URL}/makeimage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: combinedPrompt,
    }),
  });
}

// get all images
export async function getAllImages() {
  const token = localStorage.getItem("token");
  return await fetch(`${BASE_URL}/images`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

// search images
export async function searchImages(prompt) {
  const token = localStorage.getItem("token");
  return await fetch(
    `${BASE_URL}/searchimages?prompt=${encodeURIComponent(prompt)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
}

// get image
export async function getImage(id) {
  const token = localStorage.getItem("token");
  return await fetch(`${BASE_URL}/image/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

// rate image
export async function rateImage(id, newRating) {
  const token = localStorage.getItem("token");
  return await fetch(`${BASE_URL}/rating/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating: newRating }),
  });
}

// delete image
export async function deleteImage(id) {
  const token = localStorage.getItem("token");
  return await fetch(`${BASE_URL}/image/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
