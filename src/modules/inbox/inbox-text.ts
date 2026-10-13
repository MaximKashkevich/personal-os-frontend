export const inboxContentPreviewLimit = 84;

export function getInboxContentPreview(content: string) {
  if (content.length <= inboxContentPreviewLimit) {
    return content;
  }

  return `${content.slice(0, inboxContentPreviewLimit - 1).trimEnd()}…`;
}
