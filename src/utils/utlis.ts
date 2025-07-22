export const sanitizeIframe = (iframe?: string): string => {
  if (!iframe || typeof iframe !== "string") return "";
  const match = iframe.match(/src="([^"]+)"/);
  return match ? match[1] : iframe;
};
