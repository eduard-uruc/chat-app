export const shortenMessage = (message, maxChars = 25) => {
  return message?.length > maxChars
    ? message.substring(0, maxChars) + "..."
    : message
}
