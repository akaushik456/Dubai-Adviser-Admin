interface AuthState { }

interface ListingPayload {
  Page: number;
  perPage: number;
}

interface ListingRes {
  message: string;
  currentTime: number;
  code: Code;
  error: boolean;
  data: ListingResData[];
  token: null;
}

interface ListingResData {
  _id: string;
  category_id: Categoryid;
  listing_name: string;
  listing_page_title: string;
  description: string;
  status: string;
  image: string[];
  room_type: string[];
  social_media: Socialmedia[];
  meta_keyword: string;
  contact_info: Contactinfo[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Contactinfo {
  number: number;
  email: string;
  _id: string;
}

interface Socialmedia {
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp: string;
  _id: string;
}

interface Categoryid {
  _id: string;
  name: string;
}

interface Code {
  posts: any[];
}

interface SearchListingRes {
  message: string;
  currentTime: number;
  code: number;
  error: boolean;
  data: SearchListingData[];
  token: null;
}

interface SearchListingData {
  _id: string;
  category_id: string;
  listing_name: string;
  listing_page_title: string;
  description: string;
  status: string;
  image: string[];
  room_type: string[];
  social_media: Socialmedia[];
  meta_keyword: string;
  contact_info: Contactinfo[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Contactinfo {
  number: number;
  email: string;
  _id: string;
}

interface Socialmedia {
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp: string;
  _id: string;
}

// getdatabystatus
interface GetDataByStatusPayload {
  id?:string;
  category_id?:string;
  status?: string;
  Page?: number;
  perPage?: number;
}

interface GetDataByStatusRes {
  message: string;
  currentTime: number;
  code: number;
  error: boolean;
  data: GetDataByStatusData;
  token: null;
}

interface GetDataByStatusData {
  listing: Listing[];
  totalData: number;
  currentPage: number;
  perPage: number;
  totalPage: number;
  countDetails: CountDetails;
}

interface CountDetails {
  all: number;
  active: number;
  pending: number;
  inactive: number;
  block: number;
}

interface Listing {
  _id: string;
  category_id: Categoryid;
  listing_name: string;
  listing_page_title: string;
  description: string;
  status: string;
  image: string[];
  room_type: string[];
  social_media: Socialmedia[];
  meta_keyword: string;
  contact_info: Contactinfo[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Contactinfo {
  number: number;
  email: string;
  _id: string;
}

interface Socialmedia {
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp: string;
  _id: string;
}

interface Categoryid {
  _id: string;
  name: string;
}

interface ApiErrorResponse {
  message: string;
  code: number;
  error: boolean;
  data: any[];
}

interface GetDataByClickStatusResponse {
  message: string;
  currentTime: number;
  code: number;
  error: boolean;
  data: GetDataByClickStatusData;
  token: null;
}

interface GetDataByClickStatusData {
  status: Status[];
}

interface Status {
  all?: number;
  status: string;
  active?: number;
  pending?: number;
  inactive?: number;
  block?: number;
}

interface dataByPostResponse {
  category_id: string;
  listing_name?: string;
  listing_page_title?: string;
  description?: string;
  room_type?: string[];
  cost?: number;
  status?: string;
  social_media?: Record<string, string>[];
  actual_cost?: number;
  features?: boolean;
  meta_keyword?: string;
  contact_info?: Record<string, string | number>[];
  subCategory_id?:string;
  address?:string;
  map_url?: string;
  meal_type?: string[];
  price_range?: string[];
  michelin_guide?:string[];
  time_of_day?: string[];
  traveler_rating?: number;
  duration?: string;
  menu?: Record<string, string | number>[];
  opening_Hours?: Record<string ,string>[];
}
interface dataByPutResponse{
  category_id: string;
  listing_name?: string;
  listing_page_title?: string;
  description?: string;
  room_type?: string[];
  cost?: number;
  status?: string;
  social_media?: Record<string, string>[];
  actual_cost?: number;
  features?: boolean;
  meta_keyword?: string;
  contact_info?: Record<string, string | number>[];
  subCategory_id?:string;
  address?:string;
  map_url?: string;
  meal_type?: string[];
  price_range?: string[];
  michelin_guide?:string[];
  time_of_day?: string[];
  traveler_rating?: number;
  duration?: string;
  menu?: Record<string, string | number>[];
  opening_Hours?: Record<string ,string>[];
}

interface uploadDataByPostResponse {
  file: Record<string, unknown>;
}

interface GetDataByUsersLogin {
  user_name:string;
  status: Boolean;
  user_type: string;
}
interface GetDataByCategoryList {
  totalData: number;
  totalCount: number;
  data: any;
  category_id: string;
  listing_name?: string;
  listing_page_title?: string;
  description?: string;
  room_type?: string[];
  cost?: number;
  status?: string;
  social_media?: Record<string, string>[];
  actual_cost?: number;
  features?: boolean;
  meta_keyword?: string;
  contact_info?: Record<string, string | number>[];
  subCategory_id?:string;
  address?:string;
  map_url?: string;
  meal_type?: string[];
  price_range?: string[];
  michelin_guide?:string[];
  time_of_day?: string[];
  traveler_rating?: number;
  duration?: string;
  menu?: Record<string, string | number>[];
  opening_Hours?: Record<string ,string>[];
}

