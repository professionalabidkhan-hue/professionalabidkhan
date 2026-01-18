export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === "/api/signup" && request.method === "POST") {
      try {
        const data = await request.json();

        // [MANDATORY] We must 'await' the result of the database operation
        const query = env.DB.prepare(`
          INSERT INTO users (
            full_name, email, whatsapp, password, role, 
            department, timing, qualification, experience, 
            expected_revenue, proposed_fee
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const result = await query.bind(
          data.name || "Unknown", 
          data.email || null, 
          data.whatsapp || null, 
          data.password || null, 
          data.role || 'student', 
          data.department || 'IT', 
          data.timing || null, 
          data.qc || null, 
          data.ex || null, 
          null, 
          data.fee || null
        ).run();

        // This check confirms if the row actually landed in the table
        if (result.success) {
          console.log(`Successfully wrote ID: ${result.meta.last_row_id}`);
          return new Response(JSON.stringify({ 
            success: true, 
            message: "Identity Secured in Master Core.",
            id: result.meta.last_row_id 
          }), { headers: { "Content-Type": "application/json" } });
        } else {
          throw new Error("Database accepted command but failed to write.");
        }

      } catch (error) {
        console.error("Critical Database Error:", error.message);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
    }
    return env.ASSETS.fetch(request);
  }
};
