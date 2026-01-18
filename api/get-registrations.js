export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === "/api/signup" && request.method === "POST") {
      try {
        const data = await request.json();

        // 1. Prepare the SQL Statement matching your 13 columns
        const info = await env.DB.prepare(`
          INSERT INTO users (
            full_name, email, whatsapp, password, role, 
            department, timing, qualification, experience, 
            expected_revenue, proposed_fee
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          data.name,           // From your HTML 'name'
          data.email, 
          data.whatsapp, 
          data.password, 
          data.role || 'student', 
          data.department, 
          data.timing, 
          data.qc || null,     // qualification
          data.ex || null,     // experience
          null,                // expected_revenue
          data.fee || null     // proposed_fee
        ).run();

        return new Response(JSON.stringify({ 
          success: true, 
          message: `Identity Secured in ${data.department} Department.`,
          identity_id: info.meta.last_row_id 
        }), {
          headers: { "Content-Type": "application/json" },
        });

      } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to initialize identity." }), { status: 500 });
      }
    }
    return env.ASSETS.fetch(request);
  }
};
