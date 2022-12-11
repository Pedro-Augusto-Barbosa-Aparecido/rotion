export interface Document {
  id: string;
  title: string;
  content?: string;
  parentDocument?: string;
  children?: Document[];
}

/**
 * Requests
 */

export interface SaveDocumentRequest extends Document {}

export interface FetchDocumentRequest {
  id: string;
}

export interface DeleteDocumentRequest {
  id: string;
}

export interface SaveChildDocument {
  parentId: string;
}

/**
 * Responses
 */

export interface FetchAllDocumentsResponse {
  data: Document[];
}

export interface FetchDocumentResponse {
  data: Document;
}

export interface CreateDocumentResponse {
  data: Document;
}
