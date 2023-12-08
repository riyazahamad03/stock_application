export async function getStockDetails() {
  const response = await fetch("http://localhost:8080/stock");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return resData.items;
}

export async function isSellerAvailable(formData) {
  try {
    const response = await fetch("http://localhost:8080/stock");
    if (!response.ok) {
      throw new Error("Failed to fetch the data");
    }

    const resData = await response.json();
    const category = formData.selectedOption;
    const lowerBound = parseInt(formData.lowerBound);
    const upperBound = parseInt(formData.upperBound);

    for (const item of resData.items) {
      if (
        item.name.toUpperCase() === category.toUpperCase() &&
        parseInt(item.lower) >= lowerBound &&
        parseInt(item.upper) <= upperBound
      ) {
        return item.id;
      }
    }

    return 0;
  } catch (error) {
    console.error("Error:", error);
    return "Error";
  }
}

export async function deleteSeller(stockId) {
  try {
    const response = await fetch(`http://localhost:8080/stock/${stockId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.log("Failed to delete user");
    } else {
      console.log("User deleted successfully");
    }
  } catch (err) {
    console.log("error");
  }
}

export async function setTransactionExecuted(stockId) {
  try {
    const response = await fetch(`http://localhost:8080/stock/${stockId}`, {
      method: "PATCH",
    });

    if (!response.ok) {
      console.log("Failed to update");
    } else {
      console.log("updated !!");
    }
  } catch (err) {
    console.log("error");
  }
}

export async function postData(formData) {
  try {
    const data = {
      name: String(formData.name),
      lower: Number(formData.lower),
      upper: Number(formData.upper),
    };
    const response = await fetch("http://localhost:8080/stock", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);

    if (!response.ok) {
      console.log("Failed to update");
    } else {
      console.log("Updated");
    }
  } catch (err) {
    console.log(err);
  }
}
