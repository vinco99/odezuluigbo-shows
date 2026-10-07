// Type definition for what you receive from Termii's Send API
export interface TermiiSendResponse {
  pinId: string;
  to: string;
  smsStatus: string;
  message?: string;
}

// Type definition for what you receive from Termii's Verify API
export interface TermiiVerifyResponse {
  pin_id: string;
  verified: boolean | string; // Termii sometimes passes true/false or string confirmation
  msisdn: string;
  remarks?: string;
}

// Custom clean response wrappers for your Next.js Frontend
export interface ApiResponse {
  success: boolean;
  pinId?: string;
  message?: string;
  error?: string;
}
