import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logout } from "../app/features/auth/authSlice";
import CategoryList from "../pages/CategoryList";

interface ErrorRes {
  responseCode?: number;
  message?: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const wrapperQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result: any = await baseQuery(args, api, extraOptions);
  const errorResponse =
    (result?.data as ErrorRes) || (result?.error as ErrorRes);
  if (
    errorResponse?.responseCode === 401 ||
    errorResponse?.responseCode === 403
  ) {
    api.dispatch(logout());
  }

  if (result?.error?.status === 401 || result?.error?.status === 401)
    api.dispatch(logout());
  if (result?.error?.status === 403 || result?.error?.status === 403)
    api.dispatch(logout());
  if (
    (
      (result?.data as ErrorRes) ||
      (result?.data?.message as ErrorRes) ||
      (result?.error as ErrorRes)
    ).responseCode === 401
  )
    api.dispatch(logout());
  if (
    (
      (result?.data as ErrorRes) ||
      (result?.data?.message as ErrorRes) ||
      (result?.error as ErrorRes)
    ).responseCode === 403
  )
    api.dispatch(logout());

  return result;
};

const mainApi = createApi({
  baseQuery: wrapperQuery,
  tagTypes: ["listingrefetchingafterdelete"],
  endpoints: (build) => {
    return {
      login: build.mutation({
        query: (args) => {
          return {
            url: `/user/login`,
            method: "POST",
            body: args,
          };
        },
      }),
      allListing: build.query<ListingRes, ListingPayload>({
        query: (args) => ({
          url: `/listing/getdata?Page=${args?.Page}&perPage=${args?.perPage}`,
          method: "GET",
        }),
        providesTags: ["listingrefetchingafterdelete"],
      }),
      deleteListing: build.mutation({
        query: (id) => ({
          url: `/listing/deletelisting/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["listingrefetchingafterdelete"],
      }),
      deleteSingleImage: build.mutation({
        query:(args) => ({
          url: `/listing/deleteSingleImage`,
          body: args,
          method: "DELETE"
        })
      }),
      getDataBySearchListing: build.query<SearchListingRes, string>({
        query: (listingname) => ({
          url: `/listing/getdatabysearch?listing_name=${listingname}`,
          method: "GET",
        }),
      }),
      getDataByStatus: build.mutation<
        GetDataByStatusRes,
        GetDataByStatusPayload
      >({
        query: (args) => ({
          url: `/listing/getdatabystatus?status=${args?.status}&page=${args?.Page}&perPage=${args?.perPage}`,
          method: "GET",
        }),
        invalidatesTags: ["listingrefetchingafterdelete"],
      }),
      getDataByclickStatus: build.query<GetDataByClickStatusResponse, void>({
        query: () => ({
          url: "/listing/getdatabyclickstatus",
          method: "GET",
        }),
      }),
      getUserByLogin: build.query<GetDataByUsersLogin, void>({
        query:() => ({
          url: "/user/getUser",
          method: "GET",
        })
      }),      
      categoryLists: build.query<GetDataByCategoryList, { id: string; page: number; limit: number }>({
        query: ({ id, page, limit }) => ({
          url: `/listing/getdatabycategory?category_id=${id}&page=${page}&limit=${limit}`,
          method: "GET",
        }),
      }),
      addListing: build.mutation<dataByPostResponse, any>({
        query: (args) => {
          return {
          url: "/listing/add-listing",
          method: "POST",
          body: args
          }
      },
      }),
      updateListing: build.mutation<dataByPutResponse, any>({
        query: (args) => {
          const { id, body } = args;
          return {
          url: `listing/updateById/${id}`,
          method: "PUT",
          body: body
          }
        }
      }),
      uploadCsv: build.mutation<uploadDataByPostResponse, any>({
        query: (args) => {
          return {
            url: "/listing/upload-csv",
            method: "POST",
            body: args
          }
        }
      }),
    };
  },
});

export const {
  useLoginMutation,
  useAllListingQuery,
  useDeleteListingMutation,
  useGetDataBySearchListingQuery,
  useGetDataByStatusMutation,
  useGetDataByclickStatusQuery,
  useAddListingMutation,
  useUpdateListingMutation,
  useUploadCsvMutation,
  useDeleteSingleImageMutation,
  useGetUserByLoginQuery,
  useCategoryListsQuery
} = mainApi;
export default mainApi;
