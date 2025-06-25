export async function sendMsgToAI(message) {
  const res = await fetch("https://ai-chabot-server.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();

  if (!data.reply) {
    return "❌ No reply from server.";
  }

  return data.reply;
}


