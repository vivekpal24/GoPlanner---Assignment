// src/utils/yelpService.js
export const fetchRestaurants = async (location = "Bengaluru") => {
  try {
    const res = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=${location}&categories=restaurants&limit=5`,
      {
        headers: {
          Authorization: `Bearer A6q4di6sVCF78dIM5nVZOjklmRaRzvFp`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch from Yelp API");
    }

    const data = await res.json();
    return data.businesses || [];
  } catch (err) {
    console.error("Yelp API Error:", err);
    return [];
  }
};
