"use server";

export async function submitContactForm(data: { name: string; email: string; message: string }) {
  try {
    const formData = new FormData();
    
    // WPForms Action & Form ID
    formData.append("action", "wpforms_submit");
    formData.append("wpforms[id]", "20");
    formData.append("wpforms[author]", "0");

    // Field 1: Name (format: first-last)
    const nameParts = data.name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
    formData.append("wpforms[fields][1][first]", firstName);
    formData.append("wpforms[fields][1][last]", lastName);

    // Field 2: Email
    formData.append("wpforms[fields][2]", data.email);

    // Field 3: Message
    formData.append("wpforms[fields][3]", data.message);

    // Extract base URL from GraphQL API URL
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace("/graphql", "") || "http://localhost:8080";
    
    const response = await fetch(`${baseUrl}/wp-admin/admin-ajax.php`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      return { success: true };
    } else {
      console.error("WPForms Error:", result);
      return { success: false, error: "WPForms rejected the submission." };
    }
  } catch (err) {
    console.error("Submission failed:", err);
    return { success: false, error: "Network error." };
  }
}
