type MessagePreview = {
  id: String;
  subject: String;
  from: String;
  date: String;
};

export interface IMessagesResponse {
  nextPageToken: String;
  messages: MessagePreview[];
  noMessages?: {};
}
