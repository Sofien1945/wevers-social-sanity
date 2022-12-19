export default {
  name: "chat",
  title: "Chat",
  type: "document",
  fields: [
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "messages",
      title: "Messages",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
}
