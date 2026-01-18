export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === "/api/signup" && request.method === "POST") {
      try {
        const data = await request.json();

        // 1. Perform the Insert
        const info = await env.DB.prepare(`
          INSERT INTO users (full_name, email, whatsapp, password, role, department, timing, qualification, experience, proposed_fee)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          data.name, data.email, data.whatsapp, data.password, 
          data.role, data.department, data.timing, 
          data.qc || null, data.ex || null, data.fee || null
        ).run();

        // 2. Clear Feedback Logic
        if (info.success) {
          return new Response(JSON.stringify({ 
            success: true, 
            message: "REGISTRATION SUCCESSFUL",
            db_used: "Connected to Active Master Core" 
          }), { headers: { "Content-Type": "application/json" } });
        }

      } catch (err) {
        return new Response(JSON.stringify({ 
          success: false, 
          message: "REGISTRATION FAILED", 
          error: err.message 
        }), { status: 500, headers: { "Content-Type": "application/json" } });
      }
    }
    return env.ASSETS.fetch(request);
  }
};
